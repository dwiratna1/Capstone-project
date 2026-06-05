const prisma = require('../config/prisma');

const BUSINESS_AGE_VALUES = new Set([
  'LESS_THAN_1_YEAR',
  'ONE_TO_TWO_YEARS',
  'THREE_TO_FIVE_YEARS',
  'MORE_THAN_5_YEARS',
]);

const TRANSACTION_RANGE_VALUES = new Set([
  'LESS_THAN_10',
  'TEN_TO_FIFTY',
  'FIFTY_TO_TWO_HUNDRED',
  'TWO_HUNDRED_TO_FIVE_HUNDRED',
  'MORE_THAN_FIVE_HUNDRED',
]);

const PLATFORM_PROVIDER_VALUES = new Set([
  'SHOPEE',
  'TOKOPEDIA',
  'GOJEK',
  'GRAB',
  'TIKTOK_SHOP',
  'LAZADA',
  'GOPAY',
  'OVO',
  'DANA',
  'BANK',
  'OFFLINE_STORE',
  'OTHER',
]);

const PLATFORM_CATEGORY_VALUES = new Set(['MARKETPLACE', 'EWALLET', 'BANK', 'OFFLINE', 'OTHER']);

const createError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const normalizeKey = (value) => {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9<>+]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
};

const businessAgeMap = {
  'less than 1 year': 'LESS_THAN_1_YEAR',
  '<1 tahun': 'LESS_THAN_1_YEAR',
  '< 1 tahun': 'LESS_THAN_1_YEAR',
  'kurang dari 1 tahun': 'LESS_THAN_1_YEAR',
  'one to two years': 'ONE_TO_TWO_YEARS',
  '1 2 tahun': 'ONE_TO_TWO_YEARS',
  'three to five years': 'THREE_TO_FIVE_YEARS',
  '3 5 tahun': 'THREE_TO_FIVE_YEARS',
  'more than 5 years': 'MORE_THAN_5_YEARS',
  '>5 tahun': 'MORE_THAN_5_YEARS',
  '> 5 tahun': 'MORE_THAN_5_YEARS',
  'lebih dari 5 tahun': 'MORE_THAN_5_YEARS',
};

const transactionRangeMap = {
  'less than 10': 'LESS_THAN_10',
  '<10 transaksi': 'LESS_THAN_10',
  '< 10 transaksi': 'LESS_THAN_10',
  '0 10 transaksi': 'LESS_THAN_10',
  'ten to fifty': 'TEN_TO_FIFTY',
  '10 50 transaksi': 'TEN_TO_FIFTY',
  'fifty to two hundred': 'FIFTY_TO_TWO_HUNDRED',
  '50 200 transaksi': 'FIFTY_TO_TWO_HUNDRED',
  'two hundred to five hundred': 'TWO_HUNDRED_TO_FIVE_HUNDRED',
  '200 500 transaksi': 'TWO_HUNDRED_TO_FIVE_HUNDRED',
  'more than five hundred': 'MORE_THAN_FIVE_HUNDRED',
  '>500 transaksi': 'MORE_THAN_FIVE_HUNDRED',
  '> 500 transaksi': 'MORE_THAN_FIVE_HUNDRED',
  '500+ transaksi': 'MORE_THAN_FIVE_HUNDRED',
};

const platformMap = {
  shopee: { provider: 'SHOPEE', category: 'MARKETPLACE' },
  tokopedia: { provider: 'TOKOPEDIA', category: 'MARKETPLACE' },
  gojek: { provider: 'GOJEK', category: 'MARKETPLACE' },
  gofood: { provider: 'GOJEK', category: 'MARKETPLACE' },
  grab: { provider: 'GRAB', category: 'MARKETPLACE' },
  grabfood: { provider: 'GRAB', category: 'MARKETPLACE' },
  'tiktok shop': { provider: 'TIKTOK_SHOP', category: 'MARKETPLACE' },
  lazada: { provider: 'LAZADA', category: 'MARKETPLACE' },
  gopay: { provider: 'GOPAY', category: 'EWALLET' },
  ovo: { provider: 'OVO', category: 'EWALLET' },
  dana: { provider: 'DANA', category: 'EWALLET' },
  bank: { provider: 'BANK', category: 'BANK' },
  'bank bca bri mandiri': { provider: 'BANK', category: 'BANK' },
  'offline toko fisik': { provider: 'OFFLINE_STORE', category: 'OFFLINE' },
  'offline store': { provider: 'OFFLINE_STORE', category: 'OFFLINE' },
};

const mapEnum = (value, map, allowedValues, fieldName) => {
  if (!value) {
    throw createError(`${fieldName} is required`, 400);
  }

  const directValue = String(value).trim().toUpperCase();
  if (allowedValues.has(directValue)) {
    return directValue;
  }

  const mappedValue = map[normalizeKey(value)];
  if (!mappedValue) {
    throw createError(`${fieldName} is invalid`, 400);
  }

  return mappedValue;
};

const parseMoney = (value, fieldName, { defaultValue } = {}) => {
  if (value === undefined || value === null || value === '') {
    if (defaultValue !== undefined) return defaultValue;
    throw createError(`${fieldName} is required`, 400);
  }

  if (typeof value === 'number') {
    if (!Number.isFinite(value) || value < 0) {
      throw createError(`${fieldName} must be a valid non-negative number`, 400);
    }

    return value.toFixed(2);
  }

  const normalized = String(value)
    .trim()
    .replace(/rp/gi, '')
    .replace(/\s/g, '')
    .replace(/\./g, '')
    .replace(/,/g, '.');

  const amount = Number(normalized);
  if (!Number.isFinite(amount) || amount < 0) {
    throw createError(`${fieldName} must be a valid non-negative number`, 400);
  }

  return amount.toFixed(2);
};

const parseRating = (value) => {
  if (value === undefined || value === null || value === '') return null;

  const rating = typeof value === 'number' ? value : Number(String(value).trim().replace(',', '.'));
  if (!Number.isFinite(rating) || rating < 0 || rating > 5) {
    throw createError('rating must be between 0 and 5', 400);
  }

  return rating.toFixed(2);
};

const normalizePlatform = (platform) => {
  const rawName = typeof platform === 'string' ? platform : platform?.provider || platform?.name || platform?.label;
  if (!rawName || !String(rawName).trim()) return null;

  const mapped = platformMap[normalizeKey(rawName)];
  const directProvider = String(rawName).trim().toUpperCase();
  const provider = mapped?.provider || directProvider;
  const rawCategory = mapped?.category || platform?.category || 'OTHER';
  const category = String(rawCategory).trim().toUpperCase();

  if (!PLATFORM_PROVIDER_VALUES.has(provider)) {
    throw createError(`platform provider ${rawName} is invalid`, 400);
  }

  if (!PLATFORM_CATEGORY_VALUES.has(category)) {
    throw createError(`platform category ${rawCategory} is invalid`, 400);
  }

  return {
    provider,
    category,
    accountName: typeof platform === 'object' ? platform.accountName || platform.name || null : null,
    accountUrl: typeof platform === 'object' ? platform.accountUrl || platform.url || null : null,
    rating: typeof platform === 'object' ? parseRating(platform.rating) : null,
    metadata: typeof platform === 'object' ? platform.metadata || null : null,
  };
};

const saveBusinessData = async (userId, payload) => {
  const { businessName, ownerName, businessType, businessAge, address, description, imageUrl, platforms = [] } = payload;

  if (!businessName || !businessType || !businessAge) {
    throw createError('businessName, businessType, and businessAge are required', 400);
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw createError('User not found', 404);
  }

  const normalizedBusinessName = businessName.trim();
  const normalizedBusinessType = businessType.trim();
  const normalizedOwnerName = ownerName?.trim() || user.name;
  const normalizedBusinessAge = mapEnum(
    businessAge,
    businessAgeMap,
    BUSINESS_AGE_VALUES,
    'businessAge'
  );
  const normalizedPlatforms = Array.isArray(platforms)
    ? platforms.map(normalizePlatform).filter(Boolean)
    : [];

  return prisma.$transaction(async (tx) => {
    const businessProfile = await tx.businessProfile.upsert({
      where: { userId },
      create: {
        userId,
        businessName: normalizedBusinessName,
        ownerName: normalizedOwnerName,
        businessType: normalizedBusinessType,
        businessAge: normalizedBusinessAge,
        address: address?.trim() || null,
        description: description?.trim() || null,
        imageUrl: imageUrl || null,
      },
      update: {
        businessName: normalizedBusinessName,
        ownerName: normalizedOwnerName,
        businessType: normalizedBusinessType,
        businessAge: normalizedBusinessAge,
        address: address?.trim() || null,
        description: description?.trim() || null,
        ...(imageUrl !== undefined ? { imageUrl } : {}),
      },
    });

    const savedPlatforms = [];
    for (const platform of normalizedPlatforms) {
      const savedPlatform = await tx.connectedPlatform.upsert({
        where: {
          userId_provider: {
            userId,
            provider: platform.provider,
          },
        },
        create: {
          userId,
          provider: platform.provider,
          category: platform.category,
          status: 'CONNECTED',
          accountName: platform.accountName,
          accountUrl: platform.accountUrl,
          rating: platform.rating,
          metadata: platform.metadata,
          connectedAt: new Date(),
        },
        update: {
          category: platform.category,
          status: 'CONNECTED',
          accountName: platform.accountName,
          accountUrl: platform.accountUrl,
          rating: platform.rating,
          metadata: platform.metadata,
          connectedAt: new Date(),
        },
      });
      savedPlatforms.push(savedPlatform);
    }

    return { businessProfile, platforms: savedPlatforms };
  });
};

const saveFinancialData = async (userId, payload) => {
  const { monthlyRevenue, monthlyExpense, estimatedAssets, declaredDebt, transactionRange } = payload;

  if (!transactionRange) {
    throw createError('transactionRange is required', 400);
  }

  const data = {
    monthlyRevenue: parseMoney(monthlyRevenue, 'monthlyRevenue'),
    monthlyExpense: parseMoney(monthlyExpense, 'monthlyExpense'),
    estimatedAssets: parseMoney(estimatedAssets, 'estimatedAssets'),
    declaredDebt: parseMoney(declaredDebt, 'declaredDebt', { defaultValue: '0.00' }),
    transactionRange: mapEnum(
      transactionRange,
      transactionRangeMap,
      TRANSACTION_RANGE_VALUES,
      'transactionRange'
    ),
  };

  const financialProfile = await prisma.financialProfile.upsert({
    where: { userId },
    create: {
      userId,
      ...data,
    },
    update: data,
  });

  return { financialProfile };
};

module.exports = {
  saveBusinessData,
  saveFinancialData,
};
