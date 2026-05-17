import { useState, useRef, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu, ChevronDown, LogOut, User } from 'lucide-react';
import Sidebar from './Sidebar';
import { ROUTES } from '../../constants/routes';

/**
 * DashboardLayout - Layout for authenticated/dashboard pages.
 * Sidebar on the left + top navbar with user dropdown + main content area.
 */
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    // TODO: Clear auth tokens
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFB]">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-zinc-100 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left side: hamburger (mobile) */}
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-xl hover:bg-zinc-100 transition-colors text-zinc-600"
              onClick={() => setSidebarOpen(true)}
              aria-label="Buka menu"
            >
              <Menu size={22} />
            </button>
            {/* Mobile logo */}
            <span className="lg:hidden font-heading font-bold text-lg">
              <span className="bg-gradient-to-tr from-[#0380C2] to-[#5DD8C4] text-transparent bg-clip-text">ModalIN</span>
            </span>
          </div>

          {/* Right side: user dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2.5 py-2 px-3 rounded-xl hover:bg-zinc-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0092B3] to-[#5DD8C4] flex items-center justify-center">
                <span className="text-white text-sm font-semibold">D</span>
              </div>
              <span className="hidden sm:block text-[14px] font-medium text-zinc-700">Dwi Ratna</span>
              <ChevronDown size={16} className={`text-zinc-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl border border-zinc-100 shadow-lg shadow-zinc-200/60 py-1.5 animate-fade-in">
                <div className="px-4 py-2.5 border-b border-zinc-100">
                  <p className="text-[14px] font-semibold text-zinc-900">Dwi Ratna</p>
                  <p className="text-[12px] text-zinc-400">sego tampong mak sus</p>
                </div>
                <button
                  onClick={() => { setDropdownOpen(false); navigate(ROUTES.PROFILE); }}
                  className="flex items-center gap-2.5 w-full px-4 py-2.5 text-[14px] text-zinc-600 hover:bg-zinc-50 transition-colors"
                >
                  <User size={16} />
                  <span>Profil Saya</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 w-full px-4 py-2.5 text-[14px] text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} />
                  <span>Keluar</span>
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-zinc-100 py-6 px-4 sm:px-6 lg:px-8 mt-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[13px] text-zinc-400 text-center sm:text-left">
              &copy; {new Date().getFullYear()} <span className="font-semibold text-zinc-700">ModalIN</span>. Hak Cipta Dilindungi.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-[13px] text-zinc-400 hover:text-[#0092B3] transition-colors">Ketentuan Layanan</a>
              <a href="#" className="text-[13px] text-zinc-400 hover:text-[#0092B3] transition-colors">Kebijakan Privasi</a>
              <a href="#" className="text-[13px] text-zinc-400 hover:text-[#0092B3] transition-colors">Bantuan</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
