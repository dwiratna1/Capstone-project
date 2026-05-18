const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');

const SALT_ROUNDS = 12;

const createError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const normalizeEmail = (email) => email.trim().toLowerCase();

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const signToken = (user) => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw createError('JWT_SECRET is not configured', 500);
  }

  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    jwtSecret,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    }
  );
};

const register = async ({ name, email, password, phone }) => {
  if (!name || !email || !password) {
    throw createError('Name, email, and password are required', 400);
  }

  const normalizedName = name.trim();
  const normalizedEmail = normalizeEmail(email);
  const normalizedPhone = phone?.trim() || null;

  if (!normalizedName) {
    throw createError('Name is required', 400);
  }

  if (!validateEmail(normalizedEmail)) {
    throw createError('Email format is invalid', 400);
  }

  if (password.length < 8) {
    throw createError('Password must be at least 8 characters', 400);
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    throw createError('Email is already registered', 409);
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await prisma.user.create({
    data: {
      name: normalizedName,
      email: normalizedEmail,
      phone: normalizedPhone,
      passwordHash,
    },
  });

  return {
    token: signToken(user),
    user: sanitizeUser(user),
  };
};

const login = async ({ email, password }) => {
  if (!email || !password) {
    throw createError('Email and password are required', 400);
  }

  const normalizedEmail = normalizeEmail(email);
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    throw createError('Invalid email or password', 401);
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    throw createError('Invalid email or password', 401);
  }

  return {
    token: signToken(user),
    user: sanitizeUser(user),
  };
};

const getMe = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw createError('User not found', 404);
  }

  return sanitizeUser(user);
};

module.exports = {
  register,
  login,
  getMe,
};
