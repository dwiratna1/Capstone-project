import { useNavigate, Link } from 'react-router-dom';
import { ImageUp } from 'lucide-react';
import { ROUTES } from '../../constants/routes';

/**
 * FinancialDataPage - Onboarding step 2: Financial information.
 */
const FinancialDataPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate finishing onboarding and going to dashboard
    navigate(ROUTES.DASHBOARD);
  };

  const inputClasses = "w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-[15px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#0092B3]/20 focus:border-[#0092B3] transition-colors";
  const labelClasses = "block text-[14px] font-medium text-zinc-900 mb-2";
  const hintClasses = "block text-[12px] text-zinc-500 mt-2";

  return (
    <div className="animate-fade-in w-full">
      {/* Title & Progress Bar */}
      <h1 className="text-2xl sm:text-[28px] font-bold text-zinc-900 mb-5 tracking-tight">
        Langkah 2 dari 2 — Data keuangan
      </h1>
      
      <div className="w-full h-1.5 bg-zinc-100 rounded-full mb-8 overflow-hidden">
        <div className="w-full bg-[#0092B3] h-full rounded-full"></div>
      </div>

      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-[17px] font-semibold text-zinc-900 mb-1">Data keuangan usahamu</h2>
        <p className="text-[14px] text-zinc-500">Semakin lengkap data yang kamu berikan, semakin akurat skor kredit yang dihasilkan</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="revenue" className={labelClasses}>
              Rata-rata omzet bulanan (Rp) <span className="text-red-500">*</span>
            </label>
            <input
              id="revenue"
              type="text"
              placeholder="8.000.000"
              className={inputClasses}
              required
            />
            <span className={hintClasses}>*Range ideal: Rp5.000.000 - Rp150.000.000 (Fintech menyasar Unbanked UMKM)</span>
          </div>
          <div>
            <label htmlFor="expense" className={labelClasses}>
              Rata-rata pengeluaran bulanan (Rp) <span className="text-red-500">*</span>
            </label>
            <input
              id="expense"
              type="text"
              placeholder="5.500.000"
              className={inputClasses}
              required
            />
            <span className={hintClasses}>*Termasuk biaya bahan baku, sewa tempat, dan gaji karyawan.</span>
          </div>
        </div>

        <div>
          <label htmlFor="transactions" className={labelClasses}>
            Rata-rata Transaksi per bulan <span className="text-red-500">*</span>
          </label>
          <input
            id="transactions"
            type="text"
            className={inputClasses}
            required
          />
          <span className={hintClasses}>*Estimasi total transaksi tunai dan non tunai per bulan.</span>
        </div>

        <div>
          <label htmlFor="debt" className={labelClasses}>
            Total utang yang dideklarasikan (Rp) <span className="text-red-500">*</span>
          </label>
          <input
            id="debt"
            type="text"
            placeholder="0 jika tidak ada"
            className={inputClasses}
            required
          />
          <span className={hintClasses}>*Range ideal: Rp1.000.000 - Rp100.000.000 (Rasio utang harus masuk akal terhadap omzet)</span>
        </div>

        {/* Rating Toko Upload */}
        <div>
          <div className="flex items-center mb-1">
            <label className="text-[14px] font-medium text-zinc-900">Rating toko</label>
            <span className="ml-2 bg-[#E6F6F8] text-[#0092B3] px-2.5 py-0.5 rounded-full text-[12px] font-medium">opsional</span>
          </div>
          <p className="text-[13px] text-zinc-500 mb-3">Bukti rating toko di Google Maps, Tokopedia, atau Shopee</p>
          
          <div className="border border-dashed border-zinc-300 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-50 transition-colors group">
            <ImageUp className="w-6 h-6 text-[#0092B3] mb-2 group-hover:-translate-y-1 transition-transform" />
            <p className="text-[#0092B3] text-[14px] font-medium mb-1">Unggah gambar rating toko di sini</p>
            <p className="text-zinc-400 text-[12px]">JPG, PNG · Maks. 5 MB</p>
          </div>
        </div>

        {/* Optional Account Link Banner */}
        <div className="bg-[#F2F9FA] rounded-xl p-4 sm:p-5 mt-2 border border-[#E6F4F5]">
          <h3 className="text-[#0092B3] font-semibold text-[14px] mb-1">Opsional: hubungkan akun digitalmu</h3>
          <p className="text-zinc-600 text-[13px] leading-relaxed">
            Koneksi ke GoPay, OVO, atau QRIS dapat meningkatkan akurasi skor hingga +15 poin
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-center sm:justify-center items-center gap-4 pt-6">
          <Link
            to={ROUTES.ONBOARDING_BUSINESS}
            className="w-[140px] text-center px-6 py-3 rounded-xl border border-zinc-200 text-[15px] text-zinc-700 font-medium hover:bg-zinc-50 transition-colors"
          >
            Kembali
          </Link>
          <button
            type="submit"
            className="w-[140px] px-6 py-3 rounded-xl bg-[#0092B3] text-white text-[15px] font-semibold hover:bg-[#007F9E] transition-colors"
          >
            Daftar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FinancialDataPage;
