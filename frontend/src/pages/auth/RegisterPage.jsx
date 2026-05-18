import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { authService } from "../../services/authService";
import logoModalIn from '../../assets/logo.png';

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.pathname === ROUTES.LOGIN ? "masuk" : "daftar"
  );
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (field) => (e) => {
    setFormData((current) => ({
      ...current,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const payload =
        activeTab === "daftar"
          ? {
              name: formData.name,
              phone: formData.phone,
              email: formData.email,
              password: formData.password,
            }
          : {
              email: formData.email,
              password: formData.password,
            };

      const response = activeTab === "daftar"
        ? await authService.register(payload)
        : await authService.login(payload);

      localStorage.setItem("modalin_token", response.data.token);
      navigate(activeTab === "daftar" ? ROUTES.ONBOARDING_BUSINESS : ROUTES.DASHBOARD);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Gagal memproses request. Coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-4 font-body text-zinc-900">
      
      <div className="bg-white w-full max-w-[480px] rounded-2xl shadow-sm border border-zinc-200 p-8 sm:p-10">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center">
            <img src={logoModalIn} alt="Logo ModalIn" className="w-10 h-10 object-contain" />
            <span className="font-heading font-bold text-[22px] tracking-tight -ml-1.5">
              <span className="bg-gradient-to-tr from-[#0380C2] to-[#5DD8C4] text-transparent bg-clip-text">odalIN</span>
            </span>
          </Link>
        </div>

        {/* Title */}
        <h2 className="text-center font-heading font-medium text-lg text-zinc-800 mb-8">
          Mulai perjalanan finansial usahamu
        </h2>

        {/* Tabs */}
        <div className="flex w-full mb-8 rounded-lg overflow-hidden border border-zinc-300">
          <button
            type="button"
            onClick={() => { setActiveTab("daftar"); navigate(ROUTES.REGISTER); }}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
              activeTab === "daftar"
                ? "bg-[#0092B3] text-white"
                : "bg-white text-zinc-600 hover:bg-zinc-50"
            }`}
          >
            Daftar
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab("masuk"); navigate(ROUTES.LOGIN); }}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
              activeTab === "masuk"
                ? "bg-[#0092B3] text-white"
                : "bg-white text-zinc-600 hover:bg-zinc-50"
            }`}
          >
            Masuk
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {activeTab === "daftar" && (
            <>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-zinc-800">Nama lengkap</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Dwi Ratna"
                  value={formData.name}
                  onChange={handleChange("name")}
                  className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-[#0092B3] focus:ring-1 focus:ring-[#0092B3] outline-none transition-all text-sm placeholder:text-zinc-400"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-zinc-800">Nomor HP</label>
                <input 
                  type="tel" 
                  placeholder="+62 8xx xxxx xxxx"
                  value={formData.phone}
                  onChange={handleChange("phone")}
                  className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-[#0092B3] focus:ring-1 focus:ring-[#0092B3] outline-none transition-all text-sm placeholder:text-zinc-400"
                  required
                />
              </div>
            </>
          )}

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-zinc-800">Email</label>
            <input 
              type="email" 
              placeholder="email@usahamu.com"
              value={formData.email}
              onChange={handleChange("email")}
              className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-[#0092B3] focus:ring-1 focus:ring-[#0092B3] outline-none transition-all text-sm placeholder:text-zinc-400"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-zinc-800">Password</label>
            <input 
              type="password" 
              placeholder="Min. 8 karakter"
              value={formData.password}
              onChange={handleChange("password")}
              className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-[#0092B3] focus:ring-1 focus:ring-[#0092B3] outline-none transition-all text-sm placeholder:text-zinc-400"
              required
              minLength={8}
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-red-600">
              {errorMessage}
            </p>
          )}

          <div className="pt-4">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0092B3] hover:bg-[#007F9E] text-white font-medium py-3 rounded-lg transition-colors text-sm"
            >
              {isSubmitting ? "Memproses..." : activeTab === "daftar" ? "Daftar & lanjutkan" : "Masuk"}
            </button>
          </div>

          {activeTab === "daftar" && (
            <p className="text-center text-[11px] text-zinc-500 mt-4">
              Dengan mendaftar, kamu menyetujui Syarat & Ketentuan ModalIn
            </p>
          )}
        </form>

      </div>
    </div>
  );
}

export default RegisterPage;
