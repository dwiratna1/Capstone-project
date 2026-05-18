import { useState } from "react";
import { ImageUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import CustomSelect from "../../components/ui/CustomSelect";

const FinancialDataPage = () => {
  const navigate = useNavigate();
  const [transaksi, setTransaksi] = useState("<10 transaksi");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(ROUTES.DASHBOARD);
  };

  const InputField = ({ label, placeholder, hint, required = true, optional = false }) => (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-zinc-800">
        {label} {required && <span className="text-red-500">*</span>}
        {optional && <span className="ml-2 align-middle inline-block text-xs px-2 py-0.5 rounded-md bg-[#E6F7FA] text-[#0092B3] font-medium">opsional</span>}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-[#0092B3] focus:ring-1 focus:ring-[#0092B3] outline-none transition-all text-sm placeholder:text-zinc-400"
      />
      {hint && <p className="text-xs text-zinc-500">{hint}</p>}
    </div>
  );

  return (
    <div className="w-full">
      {/* Step header */}
      <div className="mb-8">
        <h1 className="font-heading font-semibold text-2xl text-zinc-900 inline-block">
          Langkah 2 dari 2 — Data keuangan
        </h1>
        {/* Progress bar */}
        <div className="mt-5 h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#0092B3] rounded-full transition-all duration-500 ease-out" 
            style={{ width: '100%' }}
          />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="font-heading font-semibold text-lg text-zinc-900">Data keuangan usahamu</h2>
        <p className="text-sm text-zinc-500 mt-1">
          Semakin lengkap data yang kamu berikan, semakin akurat skor kredit yang dihasilkan
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Omzet & Pengeluaran */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Rata-rata omzet bulanan (Rp)"
            placeholder="8.000.000"
            hint="*Range ideal: Rp5.000.000 – Rp150.000.000 (Fintech menyasar Unbanked UMKM)"
          />
          <InputField
            label="Rata-rata pengeluaran bulanan (Rp)"
            placeholder="5.500.000"
            hint="*Termasuk biaya bahan baku, sewa tempat, dan gaji karyawan."
          />
        </div>

        {/* Transaksi per bulan */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-zinc-800">
            Rata-rata Transaksi per bulan <span className="text-red-500">*</span>
          </label>
          <CustomSelect
            value={transaksi}
            onChange={setTransaksi}
            options={[
              "<10 transaksi",
              "10–50 transaksi",
              "50–200 transaksi",
              "200–500 transaksi",
              ">500 transaksi"
            ]}
          />
          <p className="text-xs text-zinc-500">*Estimasi total transaksi tunai dan non tunai per bulan.</p>
        </div>

        {/* Total utang */}
        <InputField
          label="Total utang yang dideklarasikan (Rp)"
          placeholder="0 jika tidak ada"
          hint="*Range ideal: Rp1.000.000 – Rp100.000.000 (Rasio utang harus masuk akal terhadap omzet)"
        />

        {/* Rating toko - upload */}
        <div className="space-y-2 pt-2">
          <label className="block text-sm font-medium text-zinc-800">
            Rating toko <span className="ml-2 align-middle inline-block text-xs px-2 py-0.5 rounded-md bg-[#E6F7FA] text-[#0092B3] font-medium">opsional</span>
          </label>
          <p className="text-xs text-zinc-500">Bukti rating toko di Google Maps, Tokopedia, atau Shopee</p>
          <div className="w-full border-2 border-dashed border-zinc-200 rounded-xl bg-zinc-50/60 hover:bg-[#F0F9FB] hover:border-[#0092B3]/30 transition-all p-8 flex flex-col items-center justify-center cursor-pointer group">
            <ImageUp className="w-7 h-7 text-[#0092B3] mb-3" />
            <p className="text-sm text-[#0092B3] font-medium text-center">Unggah gambar rating toko di sini</p>
            <p className="text-xs text-zinc-400 text-center mt-1">JPG, PNG · Maks. 5 MB</p>
          </div>
        </div>

        {/* Info box opsional */}
        <div className="rounded-xl bg-[#E6F7FA]/60 border border-[#0092B3]/20 p-4">
          <p className="text-sm font-semibold text-[#0092B3]">Opsional: hubungkan akun digitalmu</p>
          <p className="text-sm text-zinc-600 mt-1">
            Koneksi ke GoPay, OVO, atau QRIS dapat meningkatkan akurasi skor hingga +15 poin
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4 pt-6">
          <button
            type="button"
            onClick={() => navigate(ROUTES.ONBOARDING_BUSINESS)}
            className="px-8 py-2.5 rounded-lg border border-zinc-300 bg-white text-zinc-700 font-medium text-sm hover:bg-zinc-50 transition-colors"
          >
            Kembali
          </button>
          <button
            type="submit"
            className="px-10 py-2.5 rounded-lg bg-[#0092B3] hover:bg-[#007F9E] text-white font-medium text-sm transition-colors shadow-sm"
          >
            Daftar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FinancialDataPage;
