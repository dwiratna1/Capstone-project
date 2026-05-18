import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import CustomSelect from "../../components/ui/CustomSelect";

const BusinessDataPage = () => {
  const navigate = useNavigate();
  const [platforms, setPlatforms] = useState(["Shopee", "Gojek", "Tokopedia", ""]);
  const [jenisUsaha, setJenisUsaha] = useState("Kuliner / F&B");
  const [lamaBerdiri, setLamaBerdiri] = useState("<1 tahun");

  const setPlatform = (i, val) => {
    setPlatforms((p) => p.map((x, idx) => (idx === i ? val : x)));
  };

  const handleNext = (e) => {
    e.preventDefault();
    navigate(ROUTES.ONBOARDING_FINANCIAL);
  };

  return (
    <div className="w-full">
      {/* Step header */}
      <div className="mb-8">
        <h1 className="font-heading font-semibold text-2xl text-zinc-900 inline-block">
          Langkah 1 dari 2 — Data usaha
        </h1>
        {/* Progress bar */}
        <div className="mt-5 h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#0092B3] rounded-full transition-all duration-500 ease-out" 
            style={{ width: '50%' }}
          />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="font-heading font-semibold text-lg text-zinc-900">Ceritakan usahamu</h2>
        <p className="text-sm text-zinc-500 mt-1">
          Data ini digunakan untuk membangun profil kredit yang akurat untukmu
        </p>
      </div>

      <form onSubmit={handleNext} className="space-y-5">
        {/* Nama usaha */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-zinc-800">Nama usaha <span className="text-red-500">*</span></label>
          <input
            type="text"
            placeholder="Contoh: Warung Makan Bu Sari"
            className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-[#0092B3] focus:ring-1 focus:ring-[#0092B3] outline-none transition-all text-sm placeholder:text-zinc-400"
            required
          />
        </div>

        {/* Jenis & Lama */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-zinc-800">Jenis usaha <span className="text-red-500">*</span></label>
            <CustomSelect
              value={jenisUsaha}
              onChange={setJenisUsaha}
              options={["Kuliner / F&B", "Fashion", "Kerajinan", "Jasa", "Retail", "Lainnya"]}
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-zinc-800">Lama berdiri <span className="text-red-500">*</span></label>
            <CustomSelect
              value={lamaBerdiri}
              onChange={setLamaBerdiri}
              options={["<1 tahun", "1–2 tahun", "3–5 tahun", ">5 tahun"]}
            />
          </div>
        </div>

        {/* Platform jualan */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-zinc-800">
            Platform jualan <span className="text-zinc-500 font-normal">(bisa lebih dari satu)</span> <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {platforms.map((val, i) => (
              <CustomSelect
                key={i}
                value={val}
                onChange={(newVal) => setPlatform(i, newVal)}
                placeholder="Lainnya..."
                options={[
                  "Shopee",
                  "Tokopedia",
                  "Gojek",
                  "Grab",
                  "TikTok Shop",
                  "Lazada",
                  "Offline / Toko fisik"
                ]}
              />
            ))}
          </div>
        </div>

        {/* Estimasi aset */}
        <div className="space-y-1.5 pt-2">
          <label className="block text-sm font-medium text-zinc-800">Estimasi aset usaha (Rp) <span className="text-red-500">*</span></label>
          <input
            type="text"
            placeholder="Contoh: 15.000.000"
            className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 focus:border-[#0092B3] focus:ring-1 focus:ring-[#0092B3] outline-none transition-all text-sm placeholder:text-zinc-400"
            required
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 rounded-lg border border-zinc-300 bg-white text-zinc-700 font-medium text-sm hover:bg-zinc-50 transition-colors"
          >
            Kembali
          </button>
          <button
            type="submit"
            className="px-8 py-2.5 rounded-lg bg-[#0092B3] hover:bg-[#007F9E] text-white font-medium text-sm transition-colors shadow-sm"
          >
            Lanjutkan
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessDataPage;
