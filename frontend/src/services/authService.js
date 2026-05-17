import api from './api';

/**
 * Authentication service placeholder.
 * Functions use the configured Axios instance for networking calls.
 */

export const authService = {
  /**
   * Register a new user.
   * @param {Object} data - { name, email, password }
   * @returns {Promise} API response
   */
  register: async (data) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  /**
   * Login user.
   * @param {Object} credentials - { email, password }
   * @returns {Promise} API response with token
   */
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  /**
   * Logout user - clear token from storage.
   */
  logout: async () => {
    localStorage.removeItem('modalin_token');
  },

  /**
   * Get current user profile.
   * @returns {Promise} API response with user data
   */
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export default authService;
