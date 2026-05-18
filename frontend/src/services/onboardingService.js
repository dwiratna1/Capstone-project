import api from './api';

/**
 * Onboarding service for business and financial profile setup.
 */
export const onboardingService = {
  saveBusinessData: async (data) => {
    const response = await api.post('/onboarding/business', data);
    return response.data;
  },

  saveFinancialData: async (data) => {
    const response = await api.post('/onboarding/financial', data);
    return response.data;
  },
};

export default onboardingService;
