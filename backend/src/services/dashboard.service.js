const prisma = require('../config/prisma');

const PRIORITY_ORDER = {
  HIGH: 0,
  MEDIUM: 1,
  LOW: 2,
};

const toNumber = (value, fallback = 0) => {
  if (value === null || value === undefined) return fallback;

  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

const roundRatio = (value) => Math.round(value * 100) / 100;

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
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
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
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
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
  };
};

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

const serializeLatestScore = (score) => {
  if (!score) return null;

  return {
    id: score.id,
    score: score.score,
    category: score.category,
    status: score.status,
    modelVersion: score.modelVersion,
    calculatedAt: score.calculatedAt,
    createdAt: score.createdAt,
    updatedAt: score.updatedAt,
  };
};

const serializeTrendScore = (score) => ({
  id: score.id,
  score: score.score,
  category: score.category,
  calculatedAt: score.calculatedAt,
  createdAt: score.createdAt,
});

const serializeRecommendation = (recommendation) => ({
  id: recommendation.id,
  title: recommendation.title,
  description: recommendation.description,
  dimension: recommendation.dimension,
  priority: recommendation.priority,
  status: recommendation.status,
  estimatedPoints: recommendation.estimatedPoints,
  actionLabel: recommendation.actionLabel,
  metadata: recommendation.metadata,
  createdAt: recommendation.createdAt,
  updatedAt: recommendation.updatedAt,
});

const sortRecommendationsByPriority = (recommendations) => {
  return [...recommendations].sort((a, b) => {
    const priorityDiff = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    if (priorityDiff !== 0) return priorityDiff;

    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
};

const buildSummary = ({ financialProfile, latestScore, connectedPlatformCount, completedScoreCount }) => {
  const monthlyRevenue = toNumber(financialProfile?.monthlyRevenue);
  const monthlyExpense = toNumber(financialProfile?.monthlyExpense);
  const declaredDebt = toNumber(financialProfile?.declaredDebt);

  return {
    currentScore: latestScore?.score ?? 0,
    scoreCategory: latestScore?.category ?? null,
    scoreUpdatedAt: latestScore?.calculatedAt ?? null,
    monthlyRevenue,
    monthlyExpense,
    expenseRatio: monthlyRevenue > 0 ? roundRatio((monthlyExpense / monthlyRevenue) * 100) : 0,
    declaredDebt,
    debtToRevenueRatio: monthlyRevenue > 0 ? roundRatio((declaredDebt / monthlyRevenue) * 100) : 0,
    connectedPlatformCount,
    completedScoreCount,
  };
};

const buildCompletion = ({ businessProfile, financialProfile, connectedPlatformCount, latestScore }) => {
  const completion = {
    hasBusinessProfile: Boolean(businessProfile),
    hasFinancialProfile: Boolean(financialProfile),
    hasConnectedPlatform: connectedPlatformCount > 0,
    hasCompletedScore: Boolean(latestScore),
  };

  const completedItems = Object.values(completion).filter(Boolean).length;

  return {
    ...completion,
    percentage: completedItems * 25,
  };
};

const buildActivities = ({ businessProfile, financialProfile, connectedPlatforms, latestScore, recommendations }) => {
  const activities = [];

  if (latestScore) {
    activities.push({
      id: `score-${latestScore.id}`,
      type: 'SCORE_CALCULATED',
      title: 'Skor kredit diperbarui',
      description: `Skor terbaru kamu adalah ${latestScore.score} (${latestScore.category}).`,
      occurredAt: latestScore.calculatedAt || latestScore.createdAt,
    });
  }

  if (businessProfile) {
    activities.push({
      id: `business-${businessProfile.id}`,
      type: 'BUSINESS_PROFILE_SAVED',
      title: 'Profil usaha tersimpan',
      description: `Data usaha ${businessProfile.businessName} sudah tersimpan.`,
      occurredAt: businessProfile.updatedAt || businessProfile.createdAt,
    });
  }

  if (financialProfile) {
    activities.push({
      id: `financial-${financialProfile.id}`,
      type: 'FINANCIAL_PROFILE_SAVED',
      title: 'Data keuangan tersimpan',
      description: 'Data omzet, pengeluaran, aset, dan transaksi sudah tersimpan.',
      occurredAt: financialProfile.updatedAt || financialProfile.createdAt,
    });
  }

  if (connectedPlatforms.length > 0) {
    activities.push({
      id: 'platforms-connected',
      type: 'PLATFORM_CONNECTED',
      title: 'Platform usaha terhubung',
      description: `${connectedPlatforms.length} platform dummy berstatus connected.`,
      occurredAt: connectedPlatforms[0].connectedAt || connectedPlatforms[0].updatedAt || connectedPlatforms[0].createdAt,
    });
  }

  if (recommendations.length > 0) {
    activities.push({
      id: `recommendations-${latestScore.id}`,
      type: 'RECOMMENDATION_CREATED',
      title: 'Rekomendasi peningkatan skor tersedia',
      description: `${recommendations.length} rekomendasi siap ditindaklanjuti.`,
      occurredAt: recommendations[0].createdAt,
    });
  }

  return activities.sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime());
};

const getDashboardData = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      businessProfile: true,
      financialProfile: true,
      platforms: {
        orderBy: [{ connectedAt: 'desc' }, { updatedAt: 'desc' }],
      },
      creditScores: {
        where: { status: 'COMPLETED' },
        orderBy: [{ calculatedAt: 'desc' }, { createdAt: 'desc' }],
        take: 20,
        include: {
          breakdown: true,
          recommendations: true,
        },
      },
    },
  });

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  const completedScores = user.creditScores;
  const latestScore = completedScores[0] || null;
  const connectedPlatforms = user.platforms.filter((platform) => platform.status === 'CONNECTED');
  const recommendations = latestScore ? sortRecommendationsByPriority(latestScore.recommendations).map(serializeRecommendation) : [];
  const scoreTrend = completedScores.slice(0, 6).reverse().map(serializeTrendScore);

  const summary = buildSummary({
    financialProfile: user.financialProfile,
    latestScore,
    connectedPlatformCount: connectedPlatforms.length,
    completedScoreCount: completedScores.length,
  });

  const completion = buildCompletion({
    businessProfile: user.businessProfile,
    financialProfile: user.financialProfile,
    connectedPlatformCount: connectedPlatforms.length,
    latestScore,
  });

  const activities = buildActivities({
    businessProfile: user.businessProfile,
    financialProfile: user.financialProfile,
    connectedPlatforms,
    latestScore,
    recommendations,
  });

  return {
    user: sanitizeUser(user),
    businessProfile: serializeBusinessProfile(user.businessProfile),
    financialProfile: serializeFinancialProfile(user.financialProfile),
    summary,
    latestScore: serializeLatestScore(latestScore),
    breakdown: serializeBreakdown(latestScore?.breakdown),
    scoreTrend,
    recommendations,
    activities,
    completion,
  };
};

const getDashboard = async (userId) => {
  return getDashboardData(userId);
};

const getDashboardSummary = async (userId) => {
  const dashboard = await getDashboardData(userId);

  return {
    summary: dashboard.summary,
    completion: dashboard.completion,
    latestScore: dashboard.latestScore,
    breakdown: dashboard.breakdown,
  };
};

const getDashboardActivities = async (userId) => {
  const dashboard = await getDashboardData(userId);

  return {
    activities: dashboard.activities,
  };
};

const getDashboardRecommendations = async (userId) => {
  const dashboard = await getDashboardData(userId);

  return {
    recommendations: dashboard.recommendations,
  };
};

module.exports = {
  getDashboard,
  getDashboardSummary,
  getDashboardActivities,
  getDashboardRecommendations,
};
