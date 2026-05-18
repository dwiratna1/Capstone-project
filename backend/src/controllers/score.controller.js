const scoringService = require('../services/scoring.service');
const { sendSuccess } = require('../utils/response');

const getCurrentScore = async (req, res, next) => {
  try {
    const data = await scoringService.getCurrentScore(req.user.userId);
    return sendSuccess(res, {
      message: 'Current score fetched successfully',
      data,
    });
  } catch (error) {
    return next(error);
  }
};

const getScoreHistory = async (req, res, next) => {
  try {
    const data = await scoringService.getScoreHistory(req.user.userId);
    return sendSuccess(res, {
      message: 'Score history fetched successfully',
      data,
    });
  } catch (error) {
    return next(error);
  }
};

const getExplainability = async (req, res, next) => {
  try {
    const data = await scoringService.getExplainability(req.user.userId);
    return sendSuccess(res, {
      message: 'Score explainability fetched successfully',
      data,
    });
  } catch (error) {
    return next(error);
  }
};

const calculateScore = async (req, res, next) => {
  try {
    const data = await scoringService.calculateScore(req.user.userId);
    return sendSuccess(res, {
      statusCode: 201,
      message: 'Score calculated successfully',
      data,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getCurrentScore,
  getScoreHistory,
  getExplainability,
  calculateScore,
};
