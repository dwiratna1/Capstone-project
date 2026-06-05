const prisma = require('../config/prisma');
const onboardingService = require('./onboarding.service');

const toNumber = (value, fallback = 0) => {
  if (value === null || value === undefined) return fallback;

  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

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
    imageUrl: profile.imageUrl,
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

const serializePlatform = (platform) => ({
  id: platform.id,
  provider: platform.provider,
  category: platform.category,
  status: platform.status,
  accountName: platform.accountName,
  accountUrl: platform.accountUrl,
  rating: platform.rating === null || platform.rating === undefined ? null : toNumber(platform.rating),
  metadata: platform.metadata,
  connectedAt: platform.connectedAt,
  createdAt: platform.createdAt,
  updatedAt: platform.updatedAt,
});

const buildCompletion = ({ businessProfile, financialProfile, platforms, completedScoreCount }) => {
  const completion = {
    hasBusinessProfile: Boolean(businessProfile),
    hasFinancialProfile: Boolean(financialProfile),
    hasConnectedPlatform: platforms.some((platform) => platform.status === 'CONNECTED'),
    hasCompletedScore: completedScoreCount > 0,
  };

  return {
    ...completion,
    percentage: Object.values(completion).filter(Boolean).length * 25,
  };
};

const createError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const ensureUserExists = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!user) {
    throw createError('User not found', 404);
  }
};

const getProfileData = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      businessProfile: true,
      financialProfile: true,
      platforms: {
        orderBy: [{ category: 'asc' }, { provider: 'asc' }],
      },
      _count: {
        select: {
          creditScores: {
            where: { status: 'COMPLETED' },
          },
        },
      },
    },
  });

  if (!user) {
    throw createError('User not found', 404);
  }

  const platforms = user.platforms.map(serializePlatform);

  return {
    user: sanitizeUser(user),
    businessProfile: serializeBusinessProfile(user.businessProfile),
    financialProfile: serializeFinancialProfile(user.financialProfile),
    platforms,
    completion: buildCompletion({
      businessProfile: user.businessProfile,
      financialProfile: user.financialProfile,
      platforms,
      completedScoreCount: user._count.creditScores,
    }),
  };
};

const getProfile = async (userId) => {
  return getProfileData(userId);
};

const updateProfile = async (userId, payload) => {
  const allowedData = {};

  if (payload.name !== undefined) {
    const name = String(payload.name).trim();
    if (!name) {
      throw createError('name cannot be empty', 400);
    }
    allowedData.name = name;
  }

  if (payload.phone !== undefined) {
    const phone = String(payload.phone).trim();
    allowedData.phone = phone || null;
  }

  if (Object.keys(allowedData).length === 0) {
    throw createError('At least one editable profile field is required', 400);
  }

  await ensureUserExists(userId);

  await prisma.user.update({
    where: { id: userId },
    data: allowedData,
  });

  return getProfileData(userId);
};

const updateBusinessProfile = async (userId, payload) => {
  await onboardingService.saveBusinessData(userId, payload);
  return getProfileData(userId);
};

const updateBusinessImage = async (userId, imageUrl) => {
  await ensureUserExists(userId);

  const businessProfile = await prisma.businessProfile.findUnique({
    where: { userId },
  });

  if (!businessProfile) {
    throw createError('Business profile not found', 404);
  }

  await prisma.businessProfile.update({
    where: { userId },
    data: { imageUrl },
  });

  return getProfileData(userId);
};

const updateFinancialProfile = async (userId, payload) => {
  await ensureUserExists(userId);
  await onboardingService.saveFinancialData(userId, payload);
  return getProfileData(userId);
};

module.exports = {
  getProfile,
  updateProfile,
  updateBusinessProfile,
  updateBusinessImage,
  updateFinancialProfile,
};
