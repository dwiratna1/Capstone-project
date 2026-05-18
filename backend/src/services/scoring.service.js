const prisma = require('../config/prisma');
const aiService = require('./ai.service');

const DIMENSION_VALUES = new Set(['CHARACTER', 'CAPACITY', 'CONDITION', 'CAPITAL', 'COLLATERAL']);
const IMPACT_TYPE_VALUES = new Set(['POSITIVE', 'NEGATIVE']);
const PRIORITY_VALUES = new Set(['LOW', 'MEDIUM', 'HIGH']);

const createError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const toNumber = (value) => {
  if (value === null || value === undefined) return null;
  return Number(value);
};

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  phone: user.phone,
});

const serializeBusinessProfile = (profile) => {
  if (!profile) return null;

  return {
    id: profile.id,
    businessName: profile.businessName,
    ownerName: profile.ownerName,
    businessType: profile.businessType,
    businessAge: profile.businessAge,
    address: profile.address,
    description: profile.description,
  };
};

const serializeFinancialProfile = (profile) => {
  if (!profile) return null;

  return {
    id: profile.id,
    monthlyRevenue: toNumber(profile.monthlyRevenue),
    monthlyExpense: toNumber(profile.monthlyExpense),
    estimatedAssets: toNumber(profile.estimatedAssets),
    declaredDebt: toNumber(profile.declaredDebt),
    transactionRange: profile.transactionRange,
  };
};

const serializePlatform = (platform) => ({
  id: platform.id,
  provider: platform.provider,
  category: platform.category,
  status: platform.status,
  accountName: platform.accountName,
  accountUrl: platform.accountUrl,
  rating: toNumber(platform.rating),
  metadata: platform.metadata,
  connectedAt: platform.connectedAt,
});

const serializeBreakdown = (breakdown) => {
  if (!breakdown) return null;

  return {
    character: breakdown.character,
    capacity: breakdown.capacity,
    condition: breakdown.condition,
    capital: breakdown.capital,
    collateral: breakdown.collateral,
  };
};

const serializeCreditScore = (score) => {
  if (!score) return null;

  return {
    id: score.id,
    score: score.score,
    category: score.category,
    status: score.status,
    modelVersion: score.modelVersion,
    calculatedAt: score.calculatedAt,
    failedReason: score.failedReason,
    breakdown: serializeBreakdown(score.breakdown),
    factors: score.factors || [],
    recommendations: score.recommendations || [],
    createdAt: score.createdAt,
    updatedAt: score.updatedAt,
  };
};

const assertNumberInRange = (value, min, max, fieldName) => {
  const number = Number(value);
  if (!Number.isFinite(number) || number < min || number > max) {
    throw createError(`AI response field ${fieldName} is invalid`, 502);
  }

  return Math.round(number);
};

const normalizeDimension = (value, fieldName, { optional = false } = {}) => {
  if (!value && optional) return null;
  if (!value) {
    throw createError(`AI response field ${fieldName} is required`, 502);
  }

  const dimension = String(value).trim().toUpperCase();
  if (!DIMENSION_VALUES.has(dimension)) {
    throw createError(`AI response field ${fieldName} is invalid`, 502);
  }

  return dimension;
};

const normalizeImpactType = (value) => {
  const impactType = String(value || '').trim().toUpperCase();
  if (!IMPACT_TYPE_VALUES.has(impactType)) {
    throw createError('AI response field factors[].impactType is invalid', 502);
  }

  return impactType;
};

const normalizePriority = (value) => {
  const priority = String(value || 'MEDIUM').trim().toUpperCase();
  if (!PRIORITY_VALUES.has(priority)) {
    throw createError('AI response field recommendations[].priority is invalid', 502);
  }

  return priority;
};

const validateAiResponse = (response) => {
  if (!response || typeof response !== 'object') {
    throw createError('AI response does not match expected scoring contract', 502);
  }

  if (!response.breakdown || typeof response.breakdown !== 'object') {
    throw createError('AI response field breakdown is required', 502);
  }

  if (!response.category || typeof response.category !== 'string') {
    throw createError('AI response field category is required', 502);
  }

  const breakdown = {
    character: assertNumberInRange(response.breakdown.character, 0, 100, 'breakdown.character'),
    capacity: assertNumberInRange(response.breakdown.capacity, 0, 100, 'breakdown.capacity'),
    condition: assertNumberInRange(response.breakdown.condition, 0, 100, 'breakdown.condition'),
    capital: assertNumberInRange(response.breakdown.capital, 0, 100, 'breakdown.capital'),
    collateral: assertNumberInRange(response.breakdown.collateral, 0, 100, 'breakdown.collateral'),
  };

  const factors = Array.isArray(response.factors)
    ? response.factors.map((factor) => {
        if (!factor?.title) {
          throw createError('AI response field factors[].title is required', 502);
        }

        return {
          dimension: normalizeDimension(factor.dimension, 'factors[].dimension'),
          impactType: normalizeImpactType(factor.impactType),
          title: String(factor.title),
          description: factor.description ? String(factor.description) : null,
          impactPoints: Math.round(Number(factor.impactPoints || 0)),
          weight: factor.weight === undefined || factor.weight === null ? null : Number(factor.weight).toFixed(2),
        };
      })
    : [];

  const recommendations = Array.isArray(response.recommendations)
    ? response.recommendations.map((recommendation) => {
        if (!recommendation?.title) {
          throw createError('AI response field recommendations[].title is required', 502);
        }

        return {
          title: String(recommendation.title),
          description: recommendation.description ? String(recommendation.description) : null,
          dimension: normalizeDimension(recommendation.dimension, 'recommendations[].dimension', { optional: true }),
          priority: normalizePriority(recommendation.priority),
          estimatedPoints:
            recommendation.estimatedPoints === undefined || recommendation.estimatedPoints === null
              ? null
              : Math.round(Number(recommendation.estimatedPoints)),
          actionLabel: recommendation.actionLabel ? String(recommendation.actionLabel) : null,
          metadata: recommendation.metadata || null,
        };
      })
    : [];

  return {
    score: assertNumberInRange(response.score, 0, 1000, 'score'),
    category: response.category.trim(),
    modelVersion: response.modelVersion ? String(response.modelVersion) : null,
    breakdown,
    factors,
    recommendations,
  };
};

const buildInputSnapshot = (user) => ({
  user: {
    id: user.id,
    name: user.name,
  },
  businessProfile: serializeBusinessProfile(user.businessProfile),
  financialProfile: serializeFinancialProfile(user.financialProfile),
  platforms: user.platforms.map(serializePlatform),
});

const getUserForScoring = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      businessProfile: true,
      financialProfile: true,
      platforms: true,
    },
  });

  if (!user) {
    throw createError('User not found', 404);
  }

  if (!user.businessProfile || !user.financialProfile) {
    throw createError('Business and financial onboarding must be completed before scoring', 400);
  }

  return user;
};

const calculateScore = async (userId) => {
  const user = await getUserForScoring(userId);
  const inputSnapshot = buildInputSnapshot(user);

  const pendingScore = await prisma.creditScore.create({
    data: {
      userId,
      status: 'PENDING',
      inputSnapshot,
    },
  });

  try {
    const rawAiResponse = await aiService.calculateScoreWithAi(inputSnapshot);
    const normalized = validateAiResponse(rawAiResponse);

    const updateData = {
      score: normalized.score,
      category: normalized.category,
      status: 'COMPLETED',
      modelVersion: normalized.modelVersion,
      calculatedAt: new Date(),
      rawAiResponse,
      breakdown: {
        create: normalized.breakdown,
      },
    };

    if (normalized.factors.length > 0) {
      updateData.factors = {
        create: normalized.factors,
      };
    }

    if (normalized.recommendations.length > 0) {
      updateData.recommendations = {
        create: normalized.recommendations,
      };
    }

    const completedScore = await prisma.creditScore.update({
      where: { id: pendingScore.id },
      data: updateData,
      include: {
        breakdown: true,
        factors: true,
        recommendations: true,
      },
    });

    return { score: serializeCreditScore(completedScore) };
  } catch (error) {
    await prisma.creditScore.update({
      where: { id: pendingScore.id },
      data: {
        status: 'FAILED',
        failedReason: error.message || 'Score calculation failed',
      },
    });

    throw error;
  }
};

const getCurrentScore = async (userId) => {
  const score = await prisma.creditScore.findFirst({
    where: {
      userId,
      status: 'COMPLETED',
    },
    orderBy: [{ calculatedAt: 'desc' }, { createdAt: 'desc' }],
    include: {
      breakdown: true,
      factors: true,
      recommendations: true,
    },
  });

  if (!score) {
    throw createError('No completed score found', 404);
  }

  return { score: serializeCreditScore(score) };
};

const getScoreHistory = async (userId) => {
  const scores = await prisma.creditScore.findMany({
    where: {
      userId,
      status: 'COMPLETED',
    },
    orderBy: [{ calculatedAt: 'desc' }, { createdAt: 'desc' }],
    take: 20,
    include: {
      breakdown: true,
    },
  });

  return {
    scores: scores.map((score) => ({
      id: score.id,
      score: score.score,
      category: score.category,
      status: score.status,
      modelVersion: score.modelVersion,
      calculatedAt: score.calculatedAt,
      breakdown: serializeBreakdown(score.breakdown),
      createdAt: score.createdAt,
    })),
  };
};

const getExplainability = async (userId) => {
  return getCurrentScore(userId);
};

module.exports = {
  calculateScore,
  getCurrentScore,
  getScoreHistory,
  getExplainability,
};
