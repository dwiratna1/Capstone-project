import api from './api';

/**
 * Score service placeholder.
 * Functions for credit score analysis and history.
 */

export const scoreService = {
  /**
   * Submit data for credit scoring.
   * @param {Object} data - Business and financial data
   * @returns {Promise} Scoring result
   */
  submitForScoring: async () => {
    const response = await api.post('/scores/calculate');
    return response.data;
  },

  /**
   * Get latest score result with explainability.
   * @returns {Promise} Score details and 5C breakdown
   */
  getLatestScore: async () => {
    const response = await api.get('/scores/current');
    return response.data;
  },

  /**
   * Get score history.
   * @returns {Promise} List of historical scores
   */
  getScoreHistory: async () => {
    const response = await api.get('/scores/history');
    return response.data;
  },

  /**
   * Get latest score explainability data.
   * @returns {Promise} Score details, factors, and recommendations
   */
  getExplainability: async () => {
    const response = await api.get('/scores/explainability');
    return response.data;
  },

  /**
   * Import financial data from file.
   * @param {FormData} formData - File upload data
   * @returns {Promise} Import result
   */
  importFinancialData: async () => {
    throw new Error('Financial import endpoint is not available yet.');
  },
};

export default scoreService;
