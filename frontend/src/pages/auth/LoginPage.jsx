import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Loader2 } from 'lucide-react';
import { ROUTES } from '../../constants/routes';

/**
 * LoginPage - User login form.
 */
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [errorField, setErrorField] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const clearError = () => {
    if (errorMsg) {
      setErrorMsg('');
      setErrorField('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearError();
    
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    // UX Validation: Custom human-friendly messages instead of native browser popups
    if (!email) {
      setErrorField('email');
      setErrorMsg('Oops, alamat email belum diisi nih.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorField('email');
      setErrorMsg('Format emailnya kurang tepat. Pastikan ada tanda @ dan domainnya (contoh: usahamu@email.com).');
      return;
    }

    if (!password) {
      setErrorField('password');
      setErrorMsg('Password-nya jangan sampai kelupaan diisi ya.');
      return;
    }

    setIsLoading(true);

    // Simulasi proses login & validasi (Mockup)
    setTimeout(() => {
      setIsLoading(false);
      
      // Skenario Mockup:
      // Jika email mengandung kata "baru", asumsikan ini user baru yang belum onboarding
      if (email.includes('baru')) {
        navigate(ROUTES.ONBOARDING_BUSINESS);
      } else {
        // Jika user lama, langsung masuk dashboard
        navigate(ROUTES.DASHBOARD);
      }
    }, 1200);
  };

  return (
    <div className="animate-fade-in w-full">
      {/* Custom Error Alert */}
      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-fade-in">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
          <p className="text-[14px] text-red-800 font-medium leading-relaxed">{errorMsg}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-[15px] font-medium text-zinc-900 mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="email@usahamu.com"
            onChange={clearError}
            className={`w-full px-4 py-3.5 bg-white border rounded-xl text-[15px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#0092B3]/20 focus:border-[#0092B3] transition-colors ${errorField === 'email' ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-zinc-200'}`}
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-[15px] font-medium text-zinc-900 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Min. 8 karakter"
              onChange={clearError}
              className={`w-full px-4 py-3.5 bg-white border rounded-xl text-[15px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#0092B3]/20 focus:border-[#0092B3] transition-colors ${errorField === 'password' ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-zinc-200'}`}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-zinc-500 hover:text-zinc-700 transition-colors"
              aria-label="Toggle password visibility"
              disabled={isLoading}
            >
              {showPassword ? 'Sembunyikan' : 'Lihat'}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-[#0092B3] hover:bg-[#007F9E] disabled:bg-[#0092B3]/70 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all duration-200 mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Memproses...</span>
            </>
          ) : (
            'Masuk'
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
