import { NavLink, useLocation } from 'react-router-dom';
import { SIDEBAR_MENU } from '../../constants/sidebarMenu';
import logoModalIn from '../../assets/logo.png';

/**
 * Sidebar - Dashboard navigation sidebar.
 * Visible on desktop (lg+), hidden on mobile.
 * Matches the Figma design with ModalIN logo, user info, and nav items.
 */
const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 lg:z-auto h-screen w-[260px] bg-white border-r border-zinc-100 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="px-6 pt-8 pb-2">
          <a href="/dashboard" className="flex items-center">
            <img src={logoModalIn} alt="Logo ModalIn" className="w-10 h-10 object-contain" />
            <span className="font-heading font-bold text-[22px] tracking-tight -ml-1.5">
              <span className="bg-gradient-to-tr from-[#0380C2] to-[#5DD8C4] text-transparent bg-clip-text">odalIN</span>
            </span>
          </a>
        </div>

        {/* User Info */}
        <div className="px-6 pt-4 pb-6">
          <p className="text-[15px] font-semibold text-zinc-900">Dwi Ratna</p>
          <p className="text-[13px] text-zinc-400">sego tampong mak sus</p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 space-y-1">
          {SIDEBAR_MENU.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#E8F8FA] text-[#0092B3]'
                    : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                }`}
              >
                <Icon
                  size={20}
                  className={isActive ? 'text-[#0092B3]' : 'text-zinc-400'}
                />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
