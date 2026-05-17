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
  submitForScoring: async (data) => {
    const response = await api.post('/score/analyze', data);
    return response.data;
  },

  /**
   * Get latest score result with explainability.
   * @returns {Promise} Score details and 5C breakdown
   */
  getLatestScore: async () => {
    const response = await api.get('/score/latest');
    return response.data;
  },

  /**
   * Get score history.
   * @returns {Promise} List of historical scores
   */
  getScoreHistory: async () => {
    const response = await api.get('/score/history');
    return response.data;
  },

  /**
   * Import financial data from file.
   * @param {FormData} formData - File upload data
   * @returns {Promise} Import result
   */
  importFinancialData: async (formData) => {
    const response = await api.post('/score/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};

export default scoreService;
