import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

/**
 * FinancialImportPage - Redirects to ScoreHistoryPage which now includes the import tab.
 */
const FinancialImportPage = () => {
  return <Navigate to={ROUTES.SCORE_HISTORY} replace />;
};

export default FinancialImportPage;
