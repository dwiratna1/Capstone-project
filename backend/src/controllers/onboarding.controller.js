const onboardingService = require('../services/onboarding.service');
const { sendSuccess } = require('../utils/response');

const saveBusinessData = async (req, res, next) => {
  try {
    const data = await onboardingService.saveBusinessData(req.user.userId, req.body);
    return sendSuccess(res, {
      message: 'Business onboarding saved successfully',
      data,
    });
  } catch (error) {
    return next(error);
  }
};

const saveFinancialData = async (req, res, next) => {
  try {
    const data = await onboardingService.saveFinancialData(req.user.userId, req.body);
    return sendSuccess(res, {
      message: 'Financial onboarding saved successfully',
      data,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  saveBusinessData,
  saveFinancialData,
};
