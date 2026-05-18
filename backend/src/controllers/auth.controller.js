const authService = require('../services/auth.service');
const { sendSuccess } = require('../utils/response');

const register = async (req, res, next) => {
  try {
    const data = await authService.register(req.body);
    return sendSuccess(res, {
      statusCode: 201,
      message: 'Register success',
      data,
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);
    return sendSuccess(res, {
      message: 'Login success',
      data,
    });
  } catch (error) {
    return next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await authService.getMe(req.user.userId);
    return sendSuccess(res, {
      message: 'Current user fetched successfully',
      data: { user },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
};
