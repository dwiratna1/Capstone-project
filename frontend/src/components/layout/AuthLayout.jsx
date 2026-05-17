import { Outlet, Link, useLocation } from 'react-router-dom';
import logoModalIn from '../../assets/logo.png';

/**
 * AuthLayout - Layout for authentication pages (Login, Register).
 * Centralized card layout with tabs.
 */
const AuthLayout = () => {
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  const isRegister = location.pathname === '/register';

  return (
    <div className="min-h-screen flex items-center justify-center bg-white sm:bg-zinc-50 p-4">
      <div className="w-full max-w-[480px] bg-white sm:border sm:border-zinc-200 sm:rounded-3xl sm:shadow-sm sm:p-10 p-4">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center">
            <img src={logoModalIn} alt="Logo ModalIn" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
            <h1 className="font-heading font-bold text-2xl sm:text-[28px] tracking-tight -ml-1.5 sm:-ml-2">
              <span className="bg-gradient-to-tr from-[#0380C2] to-[#5DD8C4] text-transparent bg-clip-text">odalIN</span>
            </h1>
          </Link>
        </div>

        {/* Subtitle */}
        <h2 className="text-center text-zinc-900 text-lg sm:text-xl font-medium mb-8">
          Mulai perjalanan finansial usahamu
        </h2>

        {/* Tabs Toggle */}
        <div className="flex w-full rounded-xl border border-zinc-200 overflow-hidden mb-8">
          <Link 
            to="/register" 
            className={`flex-1 py-3.5 text-center text-[15px] font-semibold transition-colors ${
              isRegister 
                ? 'bg-[#0092B3] text-white' 
                : 'bg-white text-zinc-600 hover:bg-zinc-50'
            }`}
          >
            Daftar
          </Link>
          <Link 
            to="/login" 
            className={`flex-1 py-3.5 text-center text-[15px] font-semibold transition-colors ${
              isLogin 
                ? 'bg-[#0092B3] text-white' 
                : 'bg-white text-zinc-600 hover:bg-zinc-50'
            }`}
          >
            Masuk
          </Link>
        </div>

        {/* Render Form */}
        <Outlet />
        
      </div>
    </div>
  );
};

export default AuthLayout;
