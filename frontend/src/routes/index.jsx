import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

// Layouts
import PublicLayout from '../components/layout/PublicLayout';
import AuthLayout from '../components/layout/AuthLayout';
import DashboardLayout from '../components/layout/DashboardLayout';
import OnboardingLayout from '../components/layout/OnboardingLayout';

// Pages
import LandingPage from '../pages/public/LandingPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import BusinessDataPage from '../pages/onboarding/BusinessDataPage';
import FinancialDataPage from '../pages/onboarding/FinancialDataPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import ScoreExplainabilityPage from '../pages/score/ScoreExplainabilityPage';
import ScoreHistoryPage from '../pages/history/ScoreHistoryPage';
import FinancialImportPage from '../pages/history/FinancialImportPage';
import ProfilePage from '../pages/profile/ProfilePage';

/**
 * Application route configuration.
 * Uses nested routes with layout components for consistent page structure.
 */
const router = createBrowserRouter([
  // Public routes
  {
    element: <PublicLayout />,
    children: [
      { path: ROUTES.LANDING, element: <LandingPage /> },
    ],
  },
  // Auth routes
  {
    element: <AuthLayout />,
    children: [
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.REGISTER, element: <RegisterPage /> },
    ],
  },
  // Onboarding routes
  {
    element: <OnboardingLayout />,
    children: [
      { path: ROUTES.ONBOARDING_BUSINESS, element: <BusinessDataPage /> },
      { path: ROUTES.ONBOARDING_FINANCIAL, element: <FinancialDataPage /> },
    ],
  },
  // Dashboard / protected routes
  {
    element: <DashboardLayout />,
    children: [
      { path: ROUTES.DASHBOARD, element: <DashboardPage /> },
      { path: ROUTES.SCORE, element: <ScoreExplainabilityPage /> },
      { path: ROUTES.SCORE_HISTORY, element: <ScoreHistoryPage /> },
      { path: ROUTES.SCORE_IMPORT, element: <FinancialImportPage /> },
      { path: ROUTES.PROFILE, element: <ProfilePage /> },
    ],
  },
]);

export default router;
