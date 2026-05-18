import api from './api';

/**
 * Dashboard service placeholder.
 * Functions for fetching dashboard-related data.
 */

export const dashboardService = {
  /**
   * Get complete dashboard data.
   * @returns {Promise} Dashboard data
   */
  getDashboard: async () => {
    const response = await api.get('/dashboard');
    return response.data;
  },

  /**
   * Get dashboard summary data.
   * @returns {Promise} Dashboard overview data
   */
  getSummary: async () => {
    const response = await api.get('/dashboard/summary');
    return response.data;
  },

  /**
   * Get recent activities.
   * @returns {Promise} List of recent activities
   */
  getRecentActivities: async () => {
    const response = await api.get('/dashboard/activities');
    return response.data;
  },

  /**
   * Get recommendations.
   * @returns {Promise} List of recommendations
   */
  getRecommendations: async () => {
    const response = await api.get('/dashboard/recommendations');
    return response.data;
  },
};

export default dashboardService;
