/**
 * Route path constants for ModalIn application.
 * Centralized route definitions to avoid hardcoded strings.
 */

export const ROUTES = {
  // Public
  LANDING: '/',

  // Auth
  LOGIN: '/login',
  REGISTER: '/register',

  // Onboarding
  ONBOARDING_BUSINESS: '/onboarding/business',
  ONBOARDING_FINANCIAL: '/onboarding/financial',

  // Dashboard (Protected)
  DASHBOARD: '/dashboard',

  // Score
  SCORE: '/score',
  SCORE_HISTORY: '/score/history',
  SCORE_IMPORT: '/score/import',

  // Profile
  PROFILE: '/profile',
};

export default ROUTES;
