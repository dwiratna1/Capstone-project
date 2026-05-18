import RegisterPage from './RegisterPage';

/**
 * LoginPage - Renders the shared auth component with masuk tab active.
 * The RegisterPage component auto-detects the route path to set the active tab.
 */
const LoginPage = () => {
  return <RegisterPage />;
};

export default LoginPage;
