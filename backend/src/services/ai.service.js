const axios = require('axios');

const createError = (message, statusCode = 500) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const getAiClient = () => {
  return axios.create({
    baseURL: process.env.AI_SERVICE_URL || 'http://localhost:8000',
    timeout: Number(process.env.AI_SERVICE_TIMEOUT_MS) || 15000,
  });
};

const calculateScoreWithAi = async (payload) => {
  try {
    const response = await getAiClient().post('/predict', payload);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw createError(
        error.response.data?.message || 'AI service returned an error',
        error.response.status >= 500 ? 503 : 502
      );
    }

    if (error.code === 'ECONNABORTED') {
      throw createError('AI service request timed out', 503);
    }

    throw createError('AI service is unavailable', 503);
  }
};

module.exports = {
  calculateScoreWithAi,
};
