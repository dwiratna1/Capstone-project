import { NavLink, useLocation, useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, LineChart, History, User, LogOut, Menu, X } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import logoModalIn from '../../assets/logo.png';

const navItems = [
  { to: ROUTES.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
  { to: ROUTES.SCORE, label: 'Skor & Explainability', icon: LineChart },
  { to: ROUTES.SCORE_HISTORY, label: 'Riwayat Skor', icon: History },
  { to: ROUTES.PROFILE, label: 'Profil', icon: User },
];

/**
 * Sidebar - Dashboard navigation sidebar matching ZIP design.
 * Features: Gradient logo, user chip, nav items, logout.
 * Responsive: hidden on mobile, toggleable via hamburger.
 */
const Sidebar = ({ isOpen, onClose, onOpen }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (confirm('Yakin ingin keluar dari akun Modalin?')) {
      navigate(ROUTES.LOGIN);
    }
  };

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-60 p-2 rounded-xl bg-white border border-zinc-200 shadow-sm"
        onClick={onOpen}
        aria-label="Buka menu"
      >
        <Menu className="w-5 h-5 text-zinc-700" />
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 lg:z-auto h-screen w-[256px] bg-white flex flex-col flex-shrink-0 border-r border-zinc-100 p-5 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Mobile close button */}
        <button
          className="lg:hidden absolute top-4 right-4 p-1.5 rounded-lg hover:bg-zinc-100"
          onClick={onClose}
        >
          <X className="w-5 h-5 text-zinc-500" />
        </button>

        {/* Logo */}
        <div className="mb-7 pl-2">
          <Link to="/" className="flex items-center">
            <img src={logoModalIn} alt="Logo ModalIn" className="w-10 h-10 object-contain" />
            <span className="font-heading font-bold text-[22px] tracking-tight -ml-1.5">
              <span className="bg-gradient-to-tr from-[#0380C2] to-[#5DD8C4] text-transparent bg-clip-text">odalIN</span>
            </span>
          </Link>
        </div>

        {/* User chip */}
        <div className="mb-8 px-2">
          <p className="font-heading font-bold text-[14px] text-zinc-900 leading-tight">
            Dwi Ratna
          </p>
          <p className="font-body text-[12px] text-zinc-500 mt-0.5">
            sego tempong mak sus
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 flex-1">
          {navItems.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] transition-all ${
                  active
                    ? 'bg-[#E6F7FA] text-[#0092B3] font-semibold'
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 font-medium'
                }`}
              >
                <Icon className="w-[18px] h-[18px]" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="pt-4 mt-4 border-t border-zinc-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-zinc-500 hover:text-rose-600 hover:bg-rose-50 transition-all"
          >
            <LogOut className="w-[18px] h-[18px]" />
            Keluar
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
