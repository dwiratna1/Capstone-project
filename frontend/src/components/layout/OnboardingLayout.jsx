import { Outlet, Link } from 'react-router-dom';
import logoModalIn from '../../assets/logo.png';

/**
 * OnboardingLayout - Centered card layout for onboarding steps.
 * Provides the shared wrapper with Modalin logo.
 */
const OnboardingLayout = () => {
  return (
    <div className="min-h-screen bg-[#F4F4F5] flex flex-col items-center justify-center p-4 md:p-8 font-body text-zinc-900">
      <div className="w-full max-w-[760px] bg-white rounded-[32px] shadow-sm border border-zinc-200/60 p-8 sm:p-12">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center">
            <img src={logoModalIn} alt="Logo ModalIn" className="w-10 h-10 object-contain" />
            <span className="font-heading font-bold text-[22px] tracking-tight -ml-1.5">
              <span className="bg-gradient-to-tr from-[#0380C2] to-[#5DD8C4] text-transparent bg-clip-text">odalIN</span>
            </span>
          </Link>
        </div>

        {/* Render Step Form */}
        <Outlet />
      </div>
    </div>
  );
};

export default OnboardingLayout;
