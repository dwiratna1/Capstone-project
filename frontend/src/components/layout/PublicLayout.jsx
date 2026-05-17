import { Outlet } from 'react-router-dom';
import logoModalIn from '../../assets/logo.png';

/**
 * PublicLayout - Layout for public-facing pages (Landing).
 * Simple layout with a minimal header and footer.
 */
const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="w-full bg-white relative z-50 py-4 sm:py-6 border-b border-zinc-100/50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img src={logoModalIn} alt="Logo ModalIn" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
            <h1 className="font-heading font-bold text-2xl sm:text-[28px] tracking-tight -ml-1.5 sm:-ml-2">
              <span className="bg-gradient-to-tr from-[#0380C2] to-[#5DD8C4] text-transparent bg-clip-text">odalIN</span>
            </h1>
          </a>
          
          {/* Navigation */}
          <nav className="flex items-center gap-3 sm:gap-6">
            <a
              href="/login"
              className="text-xs sm:text-[14px] font-semibold text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              Masuk
            </a>
            <a
              href="/register"
              className="text-xs sm:text-[14px] font-semibold text-white bg-[#0092B3] hover:bg-[#007F9E] px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg transition-all"
            >
              Daftar gratis
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-text-muted">
          <p>&copy; {new Date().getFullYear()} ModalIn. Platform Analisis Kelayakan Kredit UMKM.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
