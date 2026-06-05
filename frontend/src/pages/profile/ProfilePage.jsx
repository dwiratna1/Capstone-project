import { useEffect, useState } from "react";
import {
  User,
  MapPin,
  Calendar,
  Camera,
  Sparkles,
  TrendingUp,
  Wallet,
  Store,
  Star,
  Link2,
  CheckCircle2,
  Circle,
  ArrowRight,
  Building2,
  ShoppingBag,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { profileService } from "../../services/profileService";


const tabs = [
  { key: "usaha", label: "Profil usaha" },
  { key: "keuangan", label: "Data keuangan" },
  { key: "platform", label: "Platform" },
  { key: "kelengkapan", label: "Kelengkapan" },
];

const composition = [
  { name: "Data keuangan", value: 38, color: "#10B981" },
  { name: "Platform", value: 28, color: "#0092B3" },
  { name: "Profil", value: 22, color: "#B45309" },
  { name: "Belum terisi", value: 12, color: "#E4E4E7" },
];

function Field({ label, value, helper, readOnly }) {
  return (
    <div>
      <label className="font-body text-[12px] text-zinc-500 font-medium">{label}</label>
      <input
        key={value}
        defaultValue={value}
        readOnly={readOnly}
        className={`mt-1.5 w-full font-body text-[13px] text-zinc-900 px-3.5 py-2.5 rounded-lg border border-zinc-200 focus:outline-none focus:border-[#0092B3] focus:ring-2 focus:ring-[#0092B3]/15 transition-all ${
          readOnly ? "bg-zinc-50 text-zinc-500 cursor-not-allowed" : "bg-white"
        }`}
      />
      {helper && <p className="font-body text-[11px] text-zinc-400 mt-1.5">{helper}</p>}
    </div>
  );
}

function AvatarWithRing({ percent, children }) {
  const size = 108;
  const stroke = 3;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="absolute inset-0 -rotate-90" width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#E6F7FA" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0092B3" />
            <stop offset="100%" stopColor="#4FC3DC" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-[8px] rounded-full overflow-hidden">{children}</div>
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-white shadow-sm border border-zinc-200">
        <span className="font-heading font-bold text-[10.5px] text-[#00768F] leading-none">{percent}%</span>
      </div>
    </div>
  );
}



const platformList = [
  { nama: "GoPay", desc: "Arus kas & saldo harian", initial: "GP", connected: false },
  { nama: "OVO", desc: "Arus kas & saldo harian", initial: "OV", connected: false },
  { nama: "DANA", desc: "Arus kas & saldo harian", initial: "DA", connected: false },
  { nama: "Bank (BCA / BRI / Mandiri)", desc: "Rekening tabungan usaha", initial: "BK", connected: false },
];



const checklist = [
  { title: "Identitas pemilik", desc: "Nama lengkap sudah terisi", done: true },
  { title: "Profil bisnis dasar", desc: "Nama usaha, sektor, lama berjualan, alamat", done: true },
  { title: "Data keuangan dasar", desc: "Omzet, pengeluaran, estimasi aset sudah diisi", done: true },
  { title: "Marketplace terhubung", desc: "Tokopedia sudah terhubung", done: true },
  { title: "E-wallet terhubung", desc: "GoPay, OVO, atau DANA belum terhubung", done: false },
  { title: "Foto profil usaha", desc: "Belum ada foto profil yang diunggah", done: false },
];

const businessAgeLabels = {
  LESS_THAN_1_YEAR: "<1 tahun",
  ONE_TO_TWO_YEARS: "1-2 tahun",
  THREE_TO_FIVE_YEARS: "3-5 tahun",
  MORE_THAN_5_YEARS: ">5 tahun",
};
const formatBusinessId = (id) => {
  if (!id) return "";
  const value = String(id).toUpperCase();
  if (value.length <= 10) return value;
  return `${value.slice(0, 4)}-${value.slice(-4)}`;
};
const transactionRangeSelectValues = {
  LESS_THAN_10: "0-50",
  TEN_TO_FIFTY: "0-50",
  FIFTY_TO_TWO_HUNDRED: "50-200",
  TWO_HUNDRED_TO_FIVE_HUNDRED: "200-500",
  MORE_THAN_FIVE_HUNDRED: "500+",
};

const formatMoneyInput = (value, fallback = "0") => {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return number.toLocaleString("id-ID");
};

const getJoinYear = (value) => {
  if (!value) return "2026";
  return new Date(value).getFullYear();
};

const countByCategory = (platforms, category) => {
  return platforms.filter((platform) => platform.category === category && platform.status === "CONNECTED").length;
};

const ProfilePage = () => {
  const [tab, setTab] = useState("usaha");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let isMounted = true;

    profileService.getProfile()
      .then((response) => {
        if (isMounted) setProfile(response.data);
      })
      .catch(() => {
        if (isMounted) setProfile(null);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const user = profile?.user;
  const businessProfile = profile?.businessProfile;
  const financialProfile = profile?.financialProfile;
  const platforms = profile?.platforms || [];
  const completionPercent = profile?.completion?.percentage ?? 74;
  const remainingPercent = Math.max(0, 100 - completionPercent);
  const marketplaceCount = countByCategory(platforms, "MARKETPLACE");
  const ewalletCount = countByCategory(platforms, "EWALLET");
  const bankCount = countByCategory(platforms, "BANK");
  const displayPlatformList = platformList.map((platform) => {
    const provider = platform.nama.startsWith("GoPay")
      ? "GOPAY"
      : platform.nama.startsWith("OVO")
        ? "OVO"
        : platform.nama.startsWith("DANA")
          ? "DANA"
          : "BANK";

    return {
      ...platform,
      connected: platforms.some((item) => item.provider === provider && item.status === "CONNECTED"),
    };
  });
  const displayChecklist = [
    { title: "Identitas pemilik", desc: "Nama lengkap sudah terisi", done: Boolean(user?.name) },
    { title: "Profil bisnis dasar", desc: "Nama usaha, sektor, lama berjualan, alamat", done: Boolean(businessProfile) },
    { title: "Data keuangan dasar", desc: "Omzet, pengeluaran, estimasi aset sudah diisi", done: Boolean(financialProfile) },
    { title: "Marketplace terhubung", desc: marketplaceCount > 0 ? `${marketplaceCount} marketplace sudah terhubung` : "Marketplace belum terhubung", done: marketplaceCount > 0 },
    { title: "E-wallet terhubung", desc: ewalletCount > 0 ? `${ewalletCount} e-wallet sudah terhubung` : "GoPay, OVO, atau DANA belum terhubung", done: ewalletCount > 0 },
    { title: "Foto profil usaha", desc: "Belum ada foto profil yang diunggah", done: false },
  ];
  const displayComposition = [
    { name: "Data keuangan", value: financialProfile ? 38 : 0, color: "#10B981" },
    { name: "Platform", value: platforms.length > 0 ? 28 : 0, color: "#0092B3" },
    { name: "Profil", value: businessProfile ? 22 : 0, color: "#B45309" },
    { name: "Belum terisi", value: Math.max(0, 100 - completionPercent), color: "#E4E4E7" },
  ];
  const expenseRatio = financialProfile?.monthlyRevenue
    ? Math.round((Number(financialProfile.monthlyExpense || 0) / Number(financialProfile.monthlyRevenue)) * 100)
    : 67;
  const debtRatio = financialProfile?.monthlyRevenue
    ? Math.round((Number(financialProfile.declaredDebt || 0) / Number(financialProfile.monthlyRevenue)) * 100)
    : 0;
  const netIncome = Number(financialProfile?.monthlyRevenue || 8200000) - Number(financialProfile?.monthlyExpense || 5500000);

  return (
    <>
          {/* HERO */}
          <section className="relative px-6 sm:px-10 lg:px-14 pt-10 pb-12 bg-gradient-to-br from-[#F0FAFC] via-white to-white border-b border-zinc-100 overflow-hidden">
            <div className="absolute -right-20 -top-20 w-[420px] h-[420px] rounded-full bg-[#0092B3]/5 blur-3xl pointer-events-none" />

            <div className="relative">
              <p className="font-body text-[11px] uppercase tracking-[0.18em] text-[#0092B3] font-medium">
                Profil
              </p>

              <div className="mt-4 flex items-center gap-7">
                <div className="relative">
                  <AvatarWithRing percent={completionPercent}>
                    <div className="w-full h-full bg-gradient-to-br from-[#E6F7FA] to-[#B8E4ED] flex items-center justify-center">
                      <User className="w-10 h-10 text-[#0092B3]" />
                    </div>
                  </AvatarWithRing>
                  <button className="absolute top-1 right-1 w-7 h-7 rounded-full bg-white border border-zinc-200 shadow-sm flex items-center justify-center hover:border-[#0092B3]/40 z-10">
                    <Camera className="w-3.5 h-3.5 text-zinc-600" />
                  </button>
                </div>

                <div className="min-w-0 flex-1">
                  <h1 className="font-heading font-bold text-[28px] text-zinc-900 tracking-tight leading-tight">
                    {user?.name || "Dwi Ratna"}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-[12.5px] text-zinc-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      Bergabung sejak {getJoinYear(user?.createdAt)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {businessProfile?.address || "Kabupaten Banyuwangi"}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Store className="w-3.5 h-3.5" />
                      {businessProfile?.businessName || "Sego Tempong Mak Sus"}
                    </span>
                  </div>
                  <p className="font-body text-[11.5px] text-zinc-400 mt-3">
                    Profil terisi · lengkapi {remainingPercent}% lagi untuk skor yang lebih akurat
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* TAB NAV */}
          <nav className="px-6 sm:px-10 lg:px-14 border-b border-zinc-100 sticky top-0 bg-white/90 backdrop-blur z-10">
            <div className="flex items-center gap-8 overflow-x-auto">
              {tabs.map((t) => {
                const active = tab === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className={`relative py-4 text-[13px] font-medium whitespace-nowrap transition-colors ${
                      active ? "text-zinc-900" : "text-zinc-400 hover:text-zinc-700"
                    }`}
                  >
                    {t.label}
                    {active && (
                      <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-[#0092B3] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* CONTENT */}
          <div className="px-6 sm:px-10 lg:px-14 py-12">
            {tab === "usaha" && (
              <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-12">
                <section>
                  <h2 className="font-heading font-bold text-[20px] text-zinc-900 tracking-tight">
                    Profil bisnis
                  </h2>
                  <p className="font-body text-[12.5px] text-zinc-500 mt-1">
                    Informasi dasar tentang usahamu yang ditampilkan ke mitra penilai
                  </p>

                  {businessProfile?.imageUrl && (
                    <div className="mt-5">
                      <img
                        src={businessProfile.imageUrl}
                        alt="Foto usaha"
                        className="w-full max-h-64 object-cover rounded-2xl border border-zinc-200"
                      />
                    </div>
                  )}

                  <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <Field
                        label="Id Usaha"
                        value={formatBusinessId(businessProfile?.id) || "12345"}
                        helper="Dibuat otomatis oleh sistem · tidak dapat diubah"
                        readOnly
                      />
                    </div>
                    <Field label="Nama usaha" value={businessProfile?.businessName || "sego tempong mak sus"} />
                    <Field label="Nama pemilik" value={businessProfile?.ownerName || user?.name || "Dwi Ratna"} />
                    <Field label="Jenis usaha" value={businessProfile?.businessType || "Kuliner / F&B"} />
                    <Field label="Lama berdiri" value={businessAgeLabels[businessProfile?.businessAge] || "1-2 tahun"} />
                    <div className="md:col-span-2">
                      <Field label="Alamat usaha" value={businessProfile?.address || "Jl. Nusantara No. 14, Jember, Jawa Timur"} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="font-body text-[12px] text-zinc-500 font-medium">
                        Deskripsi singkat usaha
                      </label>
                      <textarea
                        key={businessProfile?.description}
                        defaultValue={businessProfile?.description || "Warung makan yang menyajikan masakan rumahan Jawa Timur, melayani makan di tempat dan pesan antar sejak 2023."}
                        rows={3}
                        className="mt-1.5 w-full font-body text-[13px] text-zinc-900 px-3.5 py-2.5 rounded-lg border border-zinc-200 focus:outline-none focus:border-[#0092B3] focus:ring-2 focus:ring-[#0092B3]/15 resize-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="mt-7 flex items-center gap-3">
                    <button className="px-5 py-2.5 rounded-lg bg-[#0092B3] text-white font-medium text-[13px] hover:bg-[#00768F] transition-colors">
                      Simpan perubahan
                    </button>
                    <button className="px-5 py-2.5 rounded-lg text-zinc-600 font-medium text-[13px] hover:bg-zinc-50 transition-colors">
                      Batal
                    </button>
                  </div>
                </section>

                {/* Right rail: composition breakdown only — completion ring sudah ada di hero */}
                <aside className="space-y-6 xl:sticky xl:top-20 xl:self-start">
                  <div className="border border-zinc-100 rounded-2xl p-5">
                    <div className="flex items-center gap-2 text-[#00768F]">
                      <Sparkles className="w-4 h-4" />
                      <p className="font-body text-[11px] uppercase tracking-wider font-medium">
                        Komposisi data
                      </p>
                    </div>
                    <p className="font-heading font-semibold text-[14px] text-zinc-900 mt-3 leading-snug">
                      Distribusi data yang sudah kamu lengkapi
                    </p>

                    <div className="mt-5 flex items-center gap-5">
                      <div style={{ width: 120, height: 120 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={composition}
                              dataKey="value"
                              innerRadius={36}
                              outerRadius={58}
                              paddingAngle={2}
                              stroke="none"
                            >
                              {displayComposition.map((entry, i) => (
                                <Cell key={i} fill={entry.color} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <ul className="space-y-2.5 flex-1">
                        {displayComposition.map((c) => (
                          <li key={c.name} className="flex items-center justify-between gap-3 text-[12px]">
                            <span className="flex items-center gap-2 text-zinc-700">
                              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: c.color }} />
                              {c.name}
                            </span>
                            <span className="font-heading font-semibold text-zinc-900">{c.value}%</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-[#E6F7FA] to-[#F0FAFC] border border-[#0092B3]/15 rounded-2xl p-5">
                    <p className="font-heading font-semibold text-[14px] text-zinc-900 leading-snug">
                      Lengkapi {remainingPercent}% sisa untuk skor yang lebih akurat
                    </p>
                    <p className="font-body text-[12px] text-zinc-600 mt-2 leading-relaxed">
                      Profil yang lengkap membantu AI Modalin memberikan rekomendasi pinjaman yang lebih sesuai dengan profil usahamu.
                    </p>
                  </div>
                </aside>
              </div>
            )}

            {tab === "keuangan" && (
              <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-12">
                <section>
                  <h2 className="font-heading font-bold text-[20px] text-zinc-900 tracking-tight">
                    Arus keuangan usaha
                  </h2>
                  <p className="font-body text-[12.5px] text-zinc-500 mt-1">
                    Data ini digunakan untuk menghitung rasio keuangan dan skor kredit
                  </p>

                  <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field
                      label="Rata-rata omzet bulanan (Rp)"
                      value={formatMoneyInput(financialProfile?.monthlyRevenue, "8.200.000")}
                      helper="Total pendapatan masuk per bulan"
                    />
                    <Field
                      label="Estimasi total aset usaha (Rp)"
                      value={formatMoneyInput(financialProfile?.estimatedAssets, "15.000.000")}
                      helper="Rentang Rp1.000 — Rp200.000.000"
                    />
                    <Field
                      label="Rata-rata pengeluaran bulanan (Rp)"
                      value={formatMoneyInput(financialProfile?.monthlyExpense, "5.500.000")}
                      helper="Bahan baku, sewa tempat, gaji karyawan"
                    />
                    <Field
                      label="Total utang yang dideklarasikan (Rp)"
                      value={formatMoneyInput(financialProfile?.declaredDebt, "0")}
                      helper="Total cicilan aktif di tempat lain"
                    />
                    <div className="md:col-span-2">
                      <label className="font-body text-[12px] text-zinc-500 font-medium">
                        Frekuensi transaksi digital per bulan
                      </label>
                      <select
                        key={financialProfile?.transactionRange}
                        defaultValue={transactionRangeSelectValues[financialProfile?.transactionRange] || "50-200"}
                        className="mt-1.5 w-full font-body text-[13px] text-zinc-900 px-3.5 py-2.5 rounded-lg border border-zinc-200 focus:outline-none focus:border-[#0092B3] focus:ring-2 focus:ring-[#0092B3]/15 bg-white transition-all"
                      >
                        <option value="0-50">0 – 50 transaksi</option>
                        <option value="50-200">50 – 200 transaksi</option>
                        <option value="200-500">200 – 500 transaksi</option>
                        <option value="500+">500+ transaksi</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-7 flex items-center gap-3">
                    <button className="px-5 py-2.5 rounded-lg bg-[#0092B3] text-white font-medium text-[13px] hover:bg-[#00768F] transition-colors">
                      Simpan perubahan
                    </button>
                    <button className="px-5 py-2.5 rounded-lg text-zinc-600 font-medium text-[13px] hover:bg-zinc-50 transition-colors">
                      Batal
                    </button>
                  </div>
                </section>

                {/* Right: rasio keuangan */}
                <aside className="space-y-6 xl:sticky xl:top-20 xl:self-start">
                  <div className="bg-gradient-to-br from-[#E6F7FA] to-[#F0FAFC] border border-[#0092B3]/15 rounded-2xl p-5">
                    <div className="flex items-center gap-2 text-[#00768F]">
                      <TrendingUp className="w-4 h-4" />
                      <p className="font-body text-[11px] uppercase tracking-wider font-medium">
                        Rasio keuangan
                      </p>
                    </div>
                    <p className="font-heading font-semibold text-[14px] text-zinc-900 mt-3 leading-snug">
                      Dihitung otomatis berdasarkan data yang kamu masukkan di samping
                    </p>
                  </div>

                  <div className="border border-zinc-100 rounded-2xl p-5">
                    <p className="font-body text-[11px] uppercase tracking-wider font-medium text-zinc-400">
                      Rasio pengeluaran
                    </p>
                    <p className="font-heading font-bold text-[28px] text-zinc-900 leading-none mt-2">{expenseRatio}%</p>
                    <div className="mt-3 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(expenseRatio, 100)}%` }} />
                    </div>
                    <p className="font-body text-[12px] text-emerald-600 mt-2">
                      ✓ Target &lt; 70%
                    </p>
                  </div>

                  <div className="border border-zinc-100 rounded-2xl p-5">
                    <p className="font-body text-[11px] uppercase tracking-wider font-medium text-zinc-400">
                      Estimasi laba bersih
                    </p>
                    <p className="font-heading font-bold text-[28px] text-emerald-600 leading-none mt-2">
                      Rp {(netIncome / 1000000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} jt
                    </p>
                    <p className="font-body text-[12px] text-zinc-500 mt-2">per bulan</p>
                  </div>

                  <div className="border border-zinc-100 rounded-2xl p-5">
                    <p className="font-body text-[11px] uppercase tracking-wider font-medium text-zinc-400">
                      Rasio utang / omzet
                    </p>
                    <p className="font-heading font-bold text-[28px] text-zinc-900 leading-none mt-2">{debtRatio}%</p>
                    <div className="mt-3 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(debtRatio, 100)}%` }} />
                    </div>
                    <p className="font-body text-[12px] text-emerald-600 mt-2">
                      ✓ Ideal &lt; 30%
                    </p>
                  </div>
                </aside>
              </div>
            )}

            {tab === "platform" && (
              <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-12">
                <div className="space-y-12">
                  <section>
                    <div className="flex items-center gap-2 text-[#0092B3]">
                      <ShoppingBag className="w-4 h-4" />
                      <p className="font-body text-[11px] uppercase tracking-[0.18em] font-medium">
                        Marketplace
                      </p>
                    </div>
                    <h2 className="font-heading font-bold text-[20px] text-zinc-900 tracking-tight mt-2">
                      Marketplace & platform jualan
                    </h2>
                    <p className="font-body text-[12.5px] text-zinc-500 mt-1 max-w-xl">
                      Masukkan link toko kamu di masing-masing platform. Link digunakan untuk verifikasi reputasi digital usahamu.
                    </p>

                    <div className="mt-6 border border-zinc-100 rounded-2xl p-5">
                      <div className="flex items-center gap-3 mb-5">
                        <p className="font-body text-[12px] text-zinc-500">
                          Rating toko keseluruhan <span className="text-zinc-400">(0 – 5.0)</span>
                        </p>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4].map((i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                          <Star className="w-4 h-4 fill-amber-200 text-amber-200" />
                        </div>
                        <span className="font-heading font-semibold text-[13px] text-zinc-900">4,5 / 5,0</span>
                        <span className="text-[10px] font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                          Sangat baik
                        </span>
                      </div>

                      <div className="space-y-4">
                        {[
                          { label: "Link toko Shopee", placeholder: "https://shopee.co.id/namatoko", help: "Kosongkan jika tidak memiliki toko Shopee" },
                          { label: "Link toko Tokopedia", placeholder: "https://tokopedia.com/namatoko", help: "Kosongkan jika tidak memiliki toko Tokopedia" },
                          { label: "Link Gojek / GoFood", placeholder: "https://gofood.co.id/namatoko", help: "Kosongkan jika tidak terdaftar di GoFood" },
                        ].map((f) => (
                          <div key={f.label}>
                            <label className="font-body text-[12px] text-zinc-500 font-medium">{f.label}</label>
                            <div className="mt-1.5 relative">
                              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                              <input
                                placeholder={f.placeholder}
                                className="w-full font-body text-[13px] text-zinc-900 pl-9 pr-3.5 py-2.5 rounded-lg border border-zinc-200 focus:outline-none focus:border-[#0092B3] focus:ring-2 focus:ring-[#0092B3]/15 transition-all"
                              />
                            </div>
                            <p className="font-body text-[11px] text-zinc-400 mt-1.5">{f.help}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section>
                    <div className="flex items-center gap-2 text-[#0092B3]">
                      <Wallet className="w-4 h-4" />
                      <p className="font-body text-[11px] uppercase tracking-[0.18em] font-medium">
                        Pembayaran
                      </p>
                    </div>
                    <h2 className="font-heading font-bold text-[20px] text-zinc-900 tracking-tight mt-2">
                      E-wallet & perbankan
                    </h2>
                    <p className="font-body text-[12.5px] text-zinc-500 mt-1 max-w-xl">
                      Data yang diambil otomatis: rata-rata omzet, rasio pengeluaran, stabilitas arus kas, saldo rata-rata.
                    </p>

                    <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <p className="font-body text-[12.5px] text-amber-800">
                        Menghubungkan e-wallet dapat meningkatkan skor hingga <span className="font-semibold">+18 poin</span>
                      </p>
                    </div>

                    <div className="mt-5 space-y-3">
                      {displayPlatformList.map((p) => (
                        <div
                          key={p.nama}
                          className="flex items-center gap-4 p-4 border border-zinc-100 rounded-xl hover:border-zinc-200 hover:shadow-sm transition-all"
                        >
                          <div className="w-10 h-10 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center font-heading font-bold text-[12px] text-zinc-600 flex-shrink-0">
                            {p.initial}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-heading font-semibold text-[13.5px] text-zinc-900">{p.nama}</p>
                            <p className="font-body text-[11.5px] text-zinc-500 mt-0.5">{p.desc}</p>
                          </div>
                          <button className="px-4 py-2 rounded-lg border border-zinc-200 text-[12px] font-medium text-zinc-700 hover:border-[#0092B3]/40 hover:text-[#0092B3] hover:bg-[#F0FAFC]/40 transition-all flex items-center gap-1.5">
                            {p.connected ? "Terhubung" : "Hubungkan Akun"}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <aside className="space-y-6 xl:sticky xl:top-20 xl:self-start">
                  <div className="bg-gradient-to-br from-[#E6F7FA] to-[#F0FAFC] border border-[#0092B3]/15 rounded-2xl p-5">
                    <div className="flex items-center gap-2 text-[#00768F]">
                      <Sparkles className="w-4 h-4" />
                      <p className="font-body text-[11px] uppercase tracking-wider font-medium">
                        Kenapa ini penting?
                      </p>
                    </div>
                    <p className="font-heading font-semibold text-[14px] text-zinc-900 mt-3 leading-snug">
                      Platform yang terhubung membuat AI Modalin punya data nyata, bukan asumsi.
                    </p>
                    <p className="font-body text-[12px] text-zinc-600 mt-2 leading-relaxed">
                      Semakin banyak sumber data terverifikasi, semakin akurat skor dan rekomendasi yang kamu dapatkan.
                    </p>
                  </div>

                  <div className="border border-zinc-100 rounded-2xl p-5">
                    <p className="font-body text-[11px] uppercase tracking-wider font-medium text-zinc-400">
                      Status koneksi
                    </p>
                    <div className="mt-3 space-y-2.5">
                      <div className="flex items-center justify-between text-[12.5px]">
                        <span className="text-zinc-700 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          Marketplace
                        </span>
                        <span className="font-heading font-semibold text-emerald-600">{marketplaceCount} / 3</span>
                      </div>
                      <div className="flex items-center justify-between text-[12.5px]">
                        <span className="text-zinc-700 flex items-center gap-2">
                          <Circle className="w-3.5 h-3.5 text-zinc-300" />
                          E-wallet
                        </span>
                        <span className="font-heading font-semibold text-zinc-400">{ewalletCount} / 3</span>
                      </div>
                      <div className="flex items-center justify-between text-[12.5px]">
                        <span className="text-zinc-700 flex items-center gap-2">
                          <Circle className="w-3.5 h-3.5 text-zinc-300" />
                          Bank
                        </span>
                        <span className="font-heading font-semibold text-zinc-400">{bankCount} / 1</span>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            )}

            {tab === "kelengkapan" && (
              <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-12">
                <section>
                  <h2 className="font-heading font-bold text-[20px] text-zinc-900 tracking-tight">
                    Checklist kelengkapan profil
                  </h2>
                  <p className="font-body text-[12.5px] text-zinc-500 mt-1">
                    Selesaikan item berikut agar skor kreditmu makin akurat
                  </p>

                  {/* Progress */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-body text-[12px] text-zinc-500">Progress</span>
                      <span className="font-heading font-bold text-[18px] text-[#0092B3]">{completionPercent}%</span>
                    </div>
                    <div className="h-2.5 bg-zinc-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#0092B3] to-[#4FC3DC] rounded-full"
                        style={{ width: `${completionPercent}%` }}
                      />
                    </div>
                    <p className="font-body text-[11.5px] text-zinc-400 mt-2">
                      {displayChecklist.filter((item) => item.done).length} dari {displayChecklist.length} item sudah selesai · {displayChecklist.filter((item) => !item.done).length} langkah lagi menuju profil lengkap
                    </p>
                  </div>

                  {/* Items */}
                  <ol className="mt-8 space-y-3">
                    {displayChecklist.map((item, i) => (
                      <li
                        key={i}
                        className={`flex items-center gap-4 p-4 border rounded-xl transition-all ${
                          item.done
                            ? "border-zinc-100 bg-white"
                            : "border-[#0092B3]/20 bg-[#F0FAFC]/40"
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                            item.done ? "bg-emerald-50" : "bg-white border border-[#0092B3]/30"
                          }`}
                        >
                          {item.done ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <Circle className="w-5 h-5 text-[#0092B3]" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-heading font-semibold text-[13.5px] ${item.done ? "text-zinc-900" : "text-zinc-900"}`}>
                            {item.title}
                          </p>
                          <p className="font-body text-[12px] text-zinc-500 mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                        {item.done ? (
                          <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
                            Selesai
                          </span>
                        ) : (
                          <button className="text-[11.5px] font-medium px-3 py-1.5 rounded-full bg-[#0092B3] text-white hover:bg-[#00768F] transition-colors flex items-center gap-1">
                            Lengkapi
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </li>
                    ))}
                  </ol>
                </section>

                <aside className="space-y-6 xl:sticky xl:top-20 xl:self-start">
                  <div className="bg-gradient-to-br from-[#E6F7FA] to-[#F0FAFC] border border-[#0092B3]/15 rounded-2xl p-5">
                    <div className="flex items-center gap-2 text-[#00768F]">
                      <Sparkles className="w-4 h-4" />
                      <p className="font-body text-[11px] uppercase tracking-wider font-medium">
                        {displayChecklist.filter((item) => !item.done).length} langkah lagi
                      </p>
                    </div>
                    <p className="font-heading font-semibold text-[14px] text-zinc-900 mt-3 leading-snug">
                      Selesaikan profil untuk membuka skor yang lebih akurat dan akses ke lebih banyak mitra pinjaman.
                    </p>
                    <button className="mt-4 w-full px-4 py-2.5 rounded-lg bg-white border border-[#0092B3]/30 text-[#00768F] font-medium text-[12.5px] hover:bg-[#0092B3] hover:text-white hover:border-[#0092B3] transition-all flex items-center justify-center gap-1.5">
                      Lengkapi sekarang
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="border border-zinc-100 rounded-2xl p-5">
                    <p className="font-heading font-semibold text-[14px] text-zinc-900">
                      Estimasi kenaikan skor
                    </p>
                    <p className="font-body text-[11.5px] text-zinc-500 mt-1">
                      Jika kamu menyelesaikan 2 item tersisa
                    </p>
                    <p className="font-heading font-bold text-[28px] text-emerald-600 leading-none mt-4">
                      +24 poin
                    </p>
                    <p className="font-body text-[11.5px] text-zinc-400 mt-2">
                      Skor naik dari 748 → ±772
                    </p>
                  </div>

                  <div className="border border-zinc-100 rounded-2xl p-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-[13px] text-zinc-900">
                        Butuh bantuan?
                      </p>
                      <p className="font-body text-[11.5px] text-zinc-500 mt-0.5">
                        Tim Modalin siap memandu via chat
                      </p>
                    </div>
                  </div>
                </aside>
              </div>
            )}
          </div>
    </>
  );
};

export default ProfilePage;
