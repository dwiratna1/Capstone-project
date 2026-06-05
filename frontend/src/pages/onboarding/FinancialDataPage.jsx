import { useState } from "react";
import { ImageUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import CustomSelect from "../../components/ui/CustomSelect";
import { onboardingService } from "../../services/onboardingService";
import { profileService } from "../../services/profileService";
import { scoreService } from "../../services/scoreService";

const formatMoneyInput = (value) => {
  if (value === null || value === undefined) return "";
  const digits = String(value).replace(/\D/g, "");
  if (!digits) return "";
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const normalizeMoneyValue = (value) => {
  if (value === null || value === undefined) return "";
  return String(value).replace(/\./g, "").replace(/,/g, ".").replace(/[^0-9.-]/g, "");
};

const InputField = ({ label, placeholder, hint, required = true, optional = false, value, onChange, type = "text" }) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-medium text-zinc-800">
      {label} {required && <span className="text-red-500">*</span>}
      {optional && <span className="ml-2 align-middle inline-block text-xs px-2 py-0.5 rounded-md bg-[#E6F7EA] text-[#0092B3] font-medium">opsional</span>}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-[#0092B3] focus:ring-1 focus:ring-[#0092B3] outline-none transition-all text-sm placeholder:text-zinc-400"
      required={required}
    />
    {hint && <p className="text-xs text-zinc-500">{hint}</p>}
  </div>
);

const FinancialDataPage = () => {
  const navigate = useNavigate();
  const [transaksi, setTransaksi] = useState("<10 transaksi");
  const [monthlyRevenue, setMonthlyRevenue] = useState("");
  const [monthlyExpense, setMonthlyExpense] = useState("");
  const [declaredDebt, setDeclaredDebt] = useState("");
  const [storeImageFile, setStoreImageFile] = useState(null);
  const [storeImagePreview, setStoreImagePreview] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formatMoneyInput = (value) => {
    if (value === null || value === undefined) return "";
    const digits = String(value).replace(/\D/g, "");
    if (!digits) return "";
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const normalizeMoneyValue = (value) => {
    if (value === null || value === undefined) return "";
    return String(value).replace(/\./g, "").replace(/,/g, ".").replace(/[^0-9.-]/g, "");
  };

  const handleChangeMoney = (setter) => (e) => {
    setter(formatMoneyInput(e.target.value));
  };

  const handleImageChange = (e) => {
    setErrorMessage("");
    const file = e.target.files?.[0];
    if (!file) {
      setStoreImageFile(null);
      setStoreImagePreview("");
      return;
    }

    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
      setErrorMessage('Hanya file JPG atau PNG yang diperbolehkan.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Ukuran file maksimal 5 MB.');
      return;
    }

    setStoreImageFile(file);
    setStoreImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      if (storeImageFile) {
        setIsUploadingImage(true);
        const formData = new FormData();
        formData.append('image', storeImageFile);
        try {
          await profileService.uploadBusinessImage(formData);
        } finally {
          setIsUploadingImage(false);
        }
      }

      await onboardingService.saveFinancialData({
        monthlyRevenue: normalizeMoneyValue(monthlyRevenue),
        monthlyExpense: normalizeMoneyValue(monthlyExpense),
        estimatedAssets: sessionStorage.getItem("modalin_estimated_assets") || "0",
        declaredDebt: normalizeMoneyValue(declaredDebt),
        transactionRange: transaksi,
      });

      try {
        await scoreService.submitForScoring();
      } catch (scoreError) {
        // Score calculation may fail if the AI service is unavailable;
        // proceed to dashboard so the user can continue using the app.
        console.warn('Skor kredit gagal dihitung:', scoreError);
      }

      sessionStorage.removeItem("modalin_estimated_assets");
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Gagal menyimpan data keuangan. Coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Step header */}
      <div className="mb-8">
        <h1 className="font-heading font-semibold text-2xl sm:text-3xl text-zinc-900 inline-block">
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
            type="text"
            value={monthlyRevenue}
            onChange={handleChangeMoney(setMonthlyRevenue)}
            hint="*Range ideal: Rp5.000.000 – Rp150.000.000 (Fintech menyasar Unbanked UMKM)"
          />
          <InputField
            label="Rata-rata pengeluaran bulanan (Rp)"
            placeholder="5.500.000"
            type="text"
            value={monthlyExpense}
            onChange={handleChangeMoney(setMonthlyExpense)}
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
          type="text"
          value={declaredDebt}
          onChange={handleChangeMoney(setDeclaredDebt)}
          hint="*Range ideal: Rp1.000.000 – Rp100.000.000 (Rasio utang harus masuk akal terhadap omzet)"
        />

        {/* Rating toko - upload */}
        <div className="space-y-2 pt-2">
          <label className="block text-sm font-medium text-zinc-800">
            Rating toko <span className="ml-2 align-middle inline-block text-xs px-2 py-0.5 rounded-md bg-[#E6F7FA] text-[#0092B3] font-medium">opsional</span>
          </label>
          <p className="text-xs text-zinc-500">Bukti rating toko di Google Maps, Tokopedia, atau Shopee</p>
          <label className="block w-full border-2 border-dashed border-zinc-200 rounded-xl bg-zinc-50/60 hover:bg-[#F0F9FB] hover:border-[#0092B3]/30 transition-all p-5 cursor-pointer">
            <div className="min-h-[180px] flex flex-col items-center justify-center gap-3 text-center">
              {storeImagePreview ? (
                <>
                  <img src={storeImagePreview} alt="Preview rating toko" className="max-h-48 w-full object-cover rounded-xl" />
                  <p className="text-sm text-zinc-700 font-medium">Ganti gambar rating toko</p>
                </>
              ) : (
                <>
                  <ImageUp className="w-7 h-7 text-[#0092B3]" />
                  <p className="text-sm text-[#0092B3] font-medium">Unggah gambar rating toko di sini</p>
                  <p className="text-xs text-zinc-400">JPG, PNG · Maks. 5 MB</p>
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
          {isUploadingImage && <p className="text-xs text-[#0092B3]">Mengunggah gambar...</p>}
        </div>

        {/* Info box opsional */}
        <div className="rounded-xl bg-[#E6F7FA]/60 border border-[#0092B3]/20 p-4">
          <p className="text-sm font-semibold text-[#0092B3]">Opsional: hubungkan akun digitalmu</p>
          <p className="text-sm text-zinc-600 mt-1">
            Koneksi ke GoPay, OVO, atau QRIS dapat meningkatkan akurasi skor hingga +15 poin
          </p>
        </div>

        {errorMessage && (
          <p className="text-sm text-red-600">
            {errorMessage}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col items-stretch gap-3 pt-6 sm:flex-row sm:items-center sm:justify-center">
          <button
            type="button"
            onClick={() => navigate(ROUTES.ONBOARDING_BUSINESS)}
            className="w-full sm:w-auto px-8 py-2.5 rounded-lg border border-zinc-300 bg-white text-zinc-700 font-medium text-sm hover:bg-zinc-50 transition-colors"
          >
            Kembali
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-10 py-2.5 rounded-lg bg-[#0092B3] hover:bg-[#007F9E] text-white font-medium text-sm transition-colors shadow-sm"
          >
            {isSubmitting ? "Menyimpan..." : "Daftar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FinancialDataPage;
