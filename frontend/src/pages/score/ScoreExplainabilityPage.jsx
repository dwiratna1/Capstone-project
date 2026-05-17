import { useState, useEffect } from 'react';
import { Zap, TrendingUp, TrendingDown, Clock, Star, RefreshCw, Lightbulb, FileWarning, AlertCircle, Trophy } from 'lucide-react';

/**
 * ScoreExplainabilityPage - Explains the credit score with 5C breakdown.
 * Tab-based view: Naik, Menurun, Rencana Aksi.
 */
const ScoreExplainabilityPage = () => {
  const [activeTab, setActiveTab] = useState('aksi'); // Default to 'aksi' as shown in the latest user screenshot
  const [animatedScore, setAnimatedScore] = useState(0);
  const [barsVisible, setBarsVisible] = useState(false);

  const scoreData = {
    score: 748,
    maxScore: 1000,
    label: 'Cukup baik',
    date: '12 Apr 2026',
    segment: 'Segmen Kuliner',
    potentialGain: 47,
  };

  // Score counter animation
  useEffect(() => {
    const target = scoreData.score;
    const duration = 1400;
    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    const timer = setTimeout(() => requestAnimationFrame(animate), 300);
    return () => clearTimeout(timer);
  }, []);

  // Bars animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setBarsVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: 'naik', label: 'Naik' },
    { id: 'menurun', label: 'Menurun' },
    { id: 'aksi', label: 'Rencana Aksi' },
  ];

  const naikFactors = [
    {
      icon: RefreshCw,
      title: 'Frekuensi transaksi digital tinggi',
      desc: '127 transaksi per bulan — jauh diatas rata-rata segmen (85/bulan)',
      points: '+89 poin',
      category: 'Capacity',
      barPercent: 89,
    },
    {
      icon: Zap,
      title: 'Tagihan listrik konsisten 6 bulan',
      desc: 'Tidak ada keterlambatan pembayaran dalam 6 bulan terakhir',
      points: '+73 poin',
      category: 'Character',
      barPercent: 73,
    },
    {
      icon: TrendingUp,
      title: 'Omzet stabil dan meningkat',
      desc: 'Tren omzet naik 12% selama 3 bulan berturut-turut',
      points: '+65 poin',
      category: 'Capacity',
      barPercent: 65,
    },
    {
      icon: Clock,
      title: 'Usaha sudah berjalan 2 tahun',
      desc: 'Durasi operasional menunjukkan ketahanan dan keberlangsungan usaha',
      points: '+54 poin',
      category: 'Condition',
      barPercent: 54,
    },
    {
      icon: Star,
      title: 'Rating toko Tokopedia 4.8 bintang',
      desc: 'Reputasi digital tinggi dari 230+ ulasan pembeli',
      points: '+41 poin',
      category: 'Collateral',
      barPercent: 41,
    },
  ];

  const menurunFactors = [
    {
      icon: TrendingDown,
      title: 'Rasio utang terhadap pendapatan tinggi',
      desc: 'Beban cicilan bulanan mencapai 45% dari total omzet, melewati batas aman 30%.',
      points: '-23 poin',
      category: 'Capital',
      barPercent: 45,
    },
    {
      icon: FileWarning,
      title: 'Data legalitas usaha belum lengkap',
      desc: 'Belum melampirkan NIB dan NPWP perusahaan yang dapat menambah bobot kepercayaan.',
      points: '-15 poin',
      category: 'Character',
      barPercent: 30,
    },
    {
      icon: Clock,
      title: 'Keterlambatan pembayaran supplier',
      desc: 'Tercatat 2 kali keterlambatan pembayaran >7 hari dalam 3 bulan terakhir.',
      points: '-12 poin',
      category: 'Condition',
      barPercent: 25,
    },
  ];

  // Specific Action factors matching the newly provided figma screenshot 100%
  const aksiFactorsList = [
    {
      rank: '1',
      title: 'Hubungkan akun GoPay atau OVO',
      desc: 'Koneksi e-wallet memungkinkan ModalIn memverifikasi arus kas digitalmu secara real-time. Ini adalah langkah tunggal dengan dampak terbesar untuk skormu saat ini.',
      tags: [
        { text: '✓ Mudah, 5 menit', type: 'easy' },
        { text: 'Capacity', type: 'category' },
        { text: 'Prioritas utama', type: 'priority' },
      ],
      points: '+18 poin',
      buttonText: 'Mulai',
      buttonType: 'primary',
    },
    {
      rank: '2',
      title: 'Daftar koperasi atau asosiasi UMKM setempat',
      desc: 'Keanggotaan resmi di koperasi atau asosiasi UMKM seperti HIPMI atau IWAPI meningkatkan dimensi Collateral. ModalIn dapat membantu mencarikan koperasi terdekat.',
      tags: [
        { text: 'Sedang, 1-2 minggu', type: 'medium' },
        { text: 'Collateral', type: 'category' },
      ],
      points: '+12 poin',
      buttonText: 'info',
      buttonType: 'outline',
    },
    {
      rank: '2',
      title: 'Bayar tagihan air PDAM secara rutin 3 bulan ke depan',
      desc: 'Konsisten pembayaran tagihan utilitas adalah sinyal Character yang kuat. Hubungkan tagihan air ke ModalIn agar terlacak secara otomatis.',
      tags: [
        { text: '✓ Mudah, Otomatis', type: 'easy' },
        { text: 'Character', type: 'category' },
      ],
      points: '+9 poin',
      buttonText: 'Hubungkan',
      buttonType: 'outline',
    },
    {
      rank: '2',
      title: 'Stabilkan pengeluaran bulanan dalam rentang yang konsisten',
      desc: 'Cobalah menjaga pengeluaran dalam rentang 15% dari rata-rata. Variasi yang rendah menunjukkan kemampuan mengelola keuangan dengan baik kepada calon pemberi pinjaman.',
      tags: [
        { text: 'Sedang, 2-3 bulan', type: 'medium' },
        { text: 'Capacity', type: 'category' },
      ],
      points: '+12 poin',
      buttonText: 'info',
      buttonType: 'outline',
    },
  ];

  const currentFactors = activeTab === 'naik' ? naikFactors : activeTab === 'menurun' ? menurunFactors : [];

  const tabDescriptions = {
    naik: 'Faktor-faktor berikut berkontribusi positif terhadap skor kreditmu. Pertahanan dan tingkatkan agar skor terus naik.',
    menurun: 'Faktor-faktor berikut merupakan area yang perlu diperbaiki untuk meningkatkan skor kreditmu. Segera ambil tindakan pencegahan.',
    aksi: 'Langkah-langkah konkret yang bisa kamu lakukan untuk meningkatkan skor, diurutkan dari dampak terbesar.',
  };

  // SVG Circle
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - animatedScore / scoreData.maxScore);

  // Dynamic 5C Badges style matching Figma perfectly
  const getCategoryStyle = (category) => {
    switch (category.toLowerCase()) {
      case 'capacity':
        return 'bg-[#E0F2FE] text-[#0369A1]';
      case 'character':
        return 'bg-[#E6F7ED] text-[#15803D]';
      case 'condition':
        return 'bg-[#FEF3C7] text-[#D97706]';
      case 'collateral':
        return 'bg-[#FEE2E2] text-[#B91C1C]';
      case 'capital':
        return 'bg-[#F3E8FF] text-[#7E22CE]';
      default:
        return 'bg-zinc-100 text-zinc-600';
    }
  };

  const getTagStyle = (tag) => {
    if (tag.type === 'easy') return 'bg-[#EBF9F4] text-[#10B981]';
    if (tag.type === 'medium') return 'bg-[#FFF7ED] text-[#D97706]';
    if (tag.type === 'priority') return 'bg-[#FFF7ED] text-[#EA580C]';
    if (tag.type === 'category') return getCategoryStyle(tag.text);
    return 'bg-zinc-100 text-zinc-600';
  };

  return (
    <div className="space-y-6">

      {/* Score Hero Card */}
      <div className="bg-white rounded-2xl border border-zinc-100 p-6 sm:p-8 animate-fade-in">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
          {/* Left: Score Ring + Label */}
          <div className="flex flex-col items-center shrink-0">
            <div className="relative w-[160px] h-[160px]">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 170 170">
                <circle cx="85" cy="85" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="10" strokeLinecap="round" />
                <circle cx="85" cy="85" r={radius} fill="none" stroke="#7B61FF" strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                  style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[42px] font-bold text-zinc-900 leading-none tabular-nums">{animatedScore}</span>
                <span className="text-[12px] text-zinc-400 mt-0.5">dari {scoreData.maxScore}</span>
              </div>
            </div>
            <p className="text-[14px] text-zinc-500 font-medium mt-3">{scoreData.label}</p>
          </div>

          {/* Center: Info */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-[24px] sm:text-[28px] font-bold text-zinc-900 tracking-tight leading-tight">
              Mengapa skormu<br className="hidden sm:block" /> {scoreData.score}?
            </h1>
            <p className="text-[13px] text-zinc-400 mt-3">Diperbaharui {scoreData.date}.</p>
            <p className="text-[13px] text-zinc-400">{scoreData.segment}</p>
          </div>

          {/* Right: Potential Gain — separated by left border */}
          <div className="shrink-0 text-center lg:text-left lg:border-l lg:border-zinc-100 lg:pl-10">
            <p className="text-[13px] text-zinc-400 mb-1">Potensi kenaikan</p>
            <p className="text-[36px] font-bold text-[#10B981] leading-none tracking-tight">+ {scoreData.potentialGain} poin</p>
            <p className="text-[12px] text-zinc-400 mt-2">Jika semua aksi dijalankan</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: '150ms' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setBarsVisible(false); setTimeout(() => setBarsVisible(true), 100); }}
            className={`px-5 py-2 rounded-full text-[14px] font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-[#6366F1] text-white shadow-sm'
                : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Description */}
      <p className="text-[14px] text-zinc-500 animate-fade-in" style={{ animationDelay: '200ms' }}>
        {tabDescriptions[activeTab]}
      </p>

      {/* Factor Cards / Action Cards depending on active tab */}
      {activeTab === 'aksi' ? (
        <div className="space-y-3">
          {aksiFactorsList.map((factor, i) => (
            <div
              key={`aksi-${i}`}
              className="bg-white rounded-2xl border border-zinc-100 flex items-center overflow-hidden hover:shadow-sm transition-all duration-300"
              style={{
                opacity: barsVisible ? 1 : 0,
                transform: barsVisible ? 'translateY(0)' : 'translateY(12px)',
                transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${i * 100}ms`,
              }}
            >
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6">
                {/* Left rank badge + Main content */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  {/* Circle Rank Badge */}
                  <div className="w-9 h-9 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[14px] font-bold text-[#6366F1]">{factor.rank}</span>
                  </div>

                  {/* Text + Tags list */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <h3 className="text-[15px] font-bold text-zinc-800 leading-snug">{factor.title}</h3>
                    <p className="text-[13px] text-zinc-400 leading-relaxed">{factor.desc}</p>
                    
                    {/* Tags row */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {factor.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={`text-[11px] font-semibold py-1 px-2.5 rounded-lg ${getTagStyle(tag)}`}
                        >
                          {tag.text}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Points + Button */}
                <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-50">
                  <div className="text-right">
                    <span className="text-[18px] font-bold text-[#10B981] block leading-none">{factor.points}</span>
                    <span className="text-[11px] text-zinc-400 mt-1 block">estimasi</span>
                  </div>
                  
                  {factor.buttonType === 'primary' ? (
                    <button className="bg-[#6366F1] text-white hover:bg-[#4F46E5] px-5 py-1.5 rounded-full text-[12px] font-bold transition-all shadow-sm">
                      {factor.buttonText}
                    </button>
                  ) : (
                    <button className="bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50 px-5 py-1.5 rounded-full text-[12px] font-medium transition-all">
                      {factor.buttonText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {currentFactors.map((factor, i) => {
            const Icon = factor.icon;
            const isNegative = factor.points.startsWith('-');
            return (
              <div
                key={`${activeTab}-${i}`}
                className="bg-white rounded-2xl border border-zinc-100 flex items-center overflow-hidden hover:shadow-sm transition-all duration-300"
                style={{
                  opacity: barsVisible ? 1 : 0,
                  transform: barsVisible ? 'translateY(0)' : 'translateY(12px)',
                  transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${i * 100}ms`,
                }}
              >
                <div className="flex-1 flex items-center gap-4 p-5 sm:p-6">
                  {/* Icon */}
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                    isNegative ? 'bg-[#FEF2F2]' : 'bg-[#E6F7ED]'
                  }`}>
                    <Icon size={20} className={isNegative ? 'text-[#EF4444]' : 'text-[#10B981]'} />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-semibold text-zinc-800">{factor.title}</h3>
                    <p className="text-[13px] text-zinc-400 mt-0.5">{factor.desc}</p>
                  </div>

                  {/* Bar + Points + Category — fixed-width columns */}
                  <div className="hidden sm:flex items-center gap-4 shrink-0">
                    {/* Mini Progress Bar */}
                    <div className="w-[120px] h-[8px] bg-[#F3F4F6] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: barsVisible ? `${factor.barPercent}%` : '0%',
                          backgroundColor: isNegative ? '#F43F5E' : '#10B981',
                          transition: `width 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${i * 100 + 200}ms`,
                        }}
                      />
                    </div>

                    {/* Points */}
                    <span className={`w-[70px] text-right text-[14px] font-semibold tabular-nums ${
                      isNegative ? 'text-[#F43F5E]' : 'text-[#10B981]'
                    }`}>
                      {factor.points}
                    </span>

                    {/* Category Badge — filled pill */}
                    <span className={`w-[90px] text-center text-[12px] font-semibold py-1 px-3 rounded-xl ${
                      getCategoryStyle(factor.category)
                    }`}>
                      {factor.category}
                    </span>
                  </div>
                </div>
            </div>
            );
          })}
        </div>
      )}

      {/* Bottom Tip / Trophy Target Card dynamically themed based on active tab */}
      {activeTab === 'aksi' ? (
        <div className="bg-[#F5F3FF] border border-[#DDD6FE] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0">
              <Trophy size={20} className="text-[#6366F1]" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-[#3730A3]">Jika semua langkah dilakukan, skor bisa mencapai 795 dalam 3 bulan</p>
              <p className="text-[12px] text-[#6366F1] mt-0.5">Skor 795 membuka akses ke produk pinjaman lebih luas dari mitra ModalIn — termasuk KUR digital hingga Rp50 juta</p>
            </div>
          </div>
          <div className="shrink-0 text-left sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-indigo-100 flex sm:flex-col justify-between sm:justify-center items-center sm:items-end">
            <span className="text-[11px] text-[#8B5CF6] uppercase font-bold tracking-wider">target skor</span>
            <span className="text-[32px] font-bold text-[#6366F1] leading-none mt-1">795</span>
          </div>
        </div>
      ) : (
        <div className={`rounded-2xl p-5 flex items-center gap-3 animate-fade-in border transition-all duration-300 ${
          activeTab === 'menurun'
            ? 'bg-[#FFF5F5] border-[#FEE2E2] text-[#991B1B]'
            : 'bg-[#EBF9F4] border-[#D1FAE5] text-zinc-600'
        }`} style={{ animationDelay: '400ms' }}>
          {activeTab === 'menurun' ? (
            <AlertCircle size={20} className="text-[#EF4444] shrink-0" />
          ) : (
            <Lightbulb size={20} className="text-[#10B981] shrink-0" />
          )}
          <p className="text-[13px] leading-relaxed">
            {activeTab === 'menurun'
              ? 'Menjaga rasio utang di bawah 30% dan membayar tepat waktu adalah langkah krusial untuk memperbaiki skor yang menurun.'
              : 'Pertahankan konsistensi transaksi dan tagihan. Semakin stabil pola keuanganmu, semakin cepat skor naik setiap bulan.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ScoreExplainabilityPage;
