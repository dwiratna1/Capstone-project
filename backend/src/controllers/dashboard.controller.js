const dashboardService = require('../services/dashboard.service');
const { sendSuccess } = require('../utils/response');

const getDashboard = async (req, res, next) => {
  try {
    const data = await dashboardService.getDashboard(req.user.userId);

    return sendSuccess(res, {
      message: 'Dashboard fetched successfully',
      data,
    });
  } catch (error) {
    return next(error);
  }
};

const getDashboardSummary = async (req, res, next) => {
  try {
    const data = await dashboardService.getDashboardSummary(req.user.userId);

    return sendSuccess(res, {
      message: 'Dashboard summary fetched successfully',
      data,
    });
  } catch (error) {
    return next(error);
  }
};

const getDashboardActivities = async (req, res, next) => {
  try {
    const data = await dashboardService.getDashboardActivities(req.user.userId);

    return sendSuccess(res, {
      message: 'Dashboard activities fetched successfully',
      data,
    });
  } catch (error) {
    return next(error);
  }
};

const getDashboardRecommendations = async (req, res, next) => {
  try {
    const data = await dashboardService.getDashboardRecommendations(req.user.userId);

    return sendSuccess(res, {
      message: 'Dashboard recommendations fetched successfully',
      data,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getDashboard,
  getDashboardSummary,
  getDashboardActivities,
  getDashboardRecommendations,
};
