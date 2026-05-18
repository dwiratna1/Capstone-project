import api from './api';

/**
 * Profile service placeholder.
 * Functions for user profile management.
 */

export const profileService = {
  /**
   * Get user profile details.
   * @returns {Promise} User profile data
   */
  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  },

  /**
   * Update user profile.
   * @param {Object} data - Updated profile fields
   * @returns {Promise} Updated profile data
   */
  updateProfile: async (data) => {
    const response = await api.put('/profile', data);
    return response.data;
  },

  /**
   * Update business information.
   * @param {Object} data - Business info fields
   * @returns {Promise} Updated business data
   */
  updateBusinessInfo: async (data) => {
    const response = await api.put('/profile/business', data);
    return response.data;
  },

  /**
   * Update financial information.
   * @param {Object} data - Financial info fields
   * @returns {Promise} Updated profile data
   */
  updateFinancialInfo: async (data) => {
    const response = await api.put('/profile/financial', data);
    return response.data;
  },
};

export default profileService;
