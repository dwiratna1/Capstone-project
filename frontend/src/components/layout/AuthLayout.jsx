import { Outlet } from 'react-router-dom';

/**
 * AuthLayout - Simplified pass-through layout.
 * RegisterPage handles its own card layout, logo, and tab switching.
 */
const AuthLayout = () => {
  return <Outlet />;
};

export default AuthLayout;
