import { LayoutGrid, TrendingUp, Clock, User } from 'lucide-react';
import { ROUTES } from './routes';

/**
 * Sidebar menu configuration for DashboardLayout.
 * Each item defines a label, icon component, and route path.
 */
export const SIDEBAR_MENU = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutGrid,
    path: ROUTES.DASHBOARD,
  },
  {
    id: 'score',
    label: 'Skor & Explainability',
    icon: TrendingUp,
    path: ROUTES.SCORE,
  },
  {
    id: 'history',
    label: 'Riwayat Skor',
    icon: Clock,
    path: ROUTES.SCORE_HISTORY,
  },
  {
    id: 'profile',
    label: 'Profil',
    icon: User,
    path: ROUTES.PROFILE,
  },
];

export default SIDEBAR_MENU;
