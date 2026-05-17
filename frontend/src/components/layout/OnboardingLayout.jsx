import { Outlet, Link } from 'react-router-dom';
import logoModalIn from '../../assets/logo.png';

/**
 * OnboardingLayout - Layout for onboarding steps.
 * Centralized card layout similar to Auth, but wider for complex forms.
 */
const OnboardingLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white sm:bg-zinc-50 p-4 py-12">
      <div className="w-full max-w-[700px] bg-white sm:border sm:border-zinc-200 sm:rounded-3xl sm:shadow-sm sm:p-10 p-4">
        
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center">
            <img src={logoModalIn} alt="Logo ModalIn" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
            <h1 className="font-heading font-bold text-2xl sm:text-[28px] tracking-tight -ml-1.5 sm:-ml-2">
              <span className="bg-gradient-to-tr from-[#0380C2] to-[#5DD8C4] text-transparent bg-clip-text">odalIN</span>
            </h1>
          </Link>
        </div>

        {/* Render Form */}
        <Outlet />
        
      </div>
    </div>
  );
};

export default OnboardingLayout;
