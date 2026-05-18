import { Outlet } from 'react-router-dom';

/**
 * PublicLayout - Simplified layout for public-facing pages.
 * Landing page includes its own navbar and footer.
 */
const PublicLayout = () => {
  return <Outlet />;
};

export default PublicLayout;
