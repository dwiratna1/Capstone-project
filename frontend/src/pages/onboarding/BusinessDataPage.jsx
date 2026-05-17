import { useNavigate, Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

/**
 * BusinessDataPage - Onboarding step 1: Business information.
 */
const BusinessDataPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate navigation to step 2
    navigate(ROUTES.ONBOARDING_FINANCIAL);
  };

  const inputClasses = "w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-[15px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#0092B3]/20 focus:border-[#0092B3] transition-colors";
  const labelClasses = "block text-[14px] font-medium text-zinc-900 mb-2";

  return (
    <div className="animate-fade-in w-full">
      {/* Title & Progress Bar */}
      <h1 className="text-2xl sm:text-[28px] font-bold text-zinc-900 mb-5 tracking-tight">
        Langkah 1 dari 2 — Data usaha
      </h1>
      
      <div className="w-full h-1.5 bg-zinc-100 rounded-full mb-10 overflow-hidden">
        <div className="w-1/2 bg-[#0092B3] h-full rounded-full"></div>
      </div>

      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-[17px] font-semibold text-zinc-900 mb-1">Ceritakan usahamu</h2>
        <p className="text-[14px] text-zinc-500">Data ini digunakan untuk membangun profil kredit yang akurat untukmu</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="businessName" className={labelClasses}>
            Nama usaha
          </label>
          <input
            id="businessName"
            type="text"
            placeholder="Contoh: Warung Makan Bu Sari"
            className={inputClasses}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="businessType" className={labelClasses}>
              Jenis usaha
            </label>
            <input
              id="businessType"
              type="text"
              placeholder="Contoh: Kuliner"
              className={inputClasses}
              required
            />
          </div>
          <div>
            <label htmlFor="businessAge" className={labelClasses}>
              Lama berdiri
            </label>
            <input
              id="businessAge"
              type="text"
              placeholder="Contoh: 3 Tahun"
              className={inputClasses}
              required
            />
          </div>
        </div>

        <div>
          <label className={labelClasses}>
            Platform jualan <span className="text-zinc-500 font-normal">(bisa lebih dari satu)</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Gofood / Grabfood" className={inputClasses} />
            <input type="text" placeholder="Tokopedia / Shopee" className={inputClasses} />
            <input type="text" placeholder="WhatsApp / Instagram" className={inputClasses} />
            <input type="text" placeholder="Lainnya" className={inputClasses} />
          </div>
        </div>

        <div>
          <label htmlFor="assetEstimation" className={labelClasses}>
            Estimasi aset usaha (Rp)
          </label>
          <input
            id="assetEstimation"
            type="text"
            placeholder="Contoh: 15.000.000"
            className={inputClasses}
            required
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end items-center gap-3 pt-6">
          <Link
            to={ROUTES.REGISTER}
            className="px-6 py-2.5 rounded-xl border border-zinc-200 text-[15px] text-zinc-700 font-medium hover:bg-zinc-50 transition-colors"
          >
            Kembali
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#0092B3] text-white text-[15px] font-semibold hover:bg-[#007F9E] transition-colors"
          >
            Lanjutkan
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessDataPage;
