const profileService = require('../services/profile.service');
const { sendSuccess } = require('../utils/response');

const getProfile = async (req, res, next) => {
  try {
    const data = await profileService.getProfile(req.user.userId);

    return sendSuccess(res, {
      message: 'Profile fetched successfully',
      data,
    });
  } catch (error) {
    return next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const data = await profileService.updateProfile(req.user.userId, req.body);

    return sendSuccess(res, {
      message: 'Profile updated successfully',
      data,
    });
  } catch (error) {
    return next(error);
  }
};

const updateBusinessProfile = async (req, res, next) => {
  try {
    const data = await profileService.updateBusinessProfile(req.user.userId, req.body);

    return sendSuccess(res, {
      message: 'Business profile updated successfully',
      data,
    });
  } catch (error) {
    return next(error);
  }
};

const updateFinancialProfile = async (req, res, next) => {
  try {
    const data = await profileService.updateFinancialProfile(req.user.userId, req.body);

    return sendSuccess(res, {
      message: 'Financial profile updated successfully',
      data,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  updateBusinessProfile,
  updateFinancialProfile,
};
