import { useEffect, useState } from 'react';
import { RefreshCw, Zap, TrendingUp, Clock, Star, Lightbulb, TrendingDown, FileWarning, AlertCircle, Check, Trophy, Sparkles, ArrowUpRight, ArrowDownRight, Target } from 'lucide-react';
import { scoreService } from '../../services/scoreService';

const tagStyles = {
  Capacity: 'text-[#0092B3] bg-[#E6F7FA]',
  Character: 'text-emerald-700 bg-emerald-50',
  Condition: 'text-amber-700 bg-amber-50',
  Capital: 'text-violet-700 bg-violet-50',
  Collateral: 'text-rose-700 bg-rose-50',
};

const filters = [
  { key: 'naik', label: 'Faktor naik' },
  { key: 'menurun', label: 'Faktor menurun' },
  { key: 'rencana', label: 'Rencana aksi' },
];

const factorsNaik = [
  { id: 'f1', icon: RefreshCw, title: 'Frekuensi transaksi digital tinggi', description: '127 transaksi per bulan — jauh diatas rata-rata segmen (85/bulan)', points: 89, progress: 88, tag: 'Capacity', direction: 'naik' },
  { id: 'f2', icon: Zap, title: 'Tagihan listrik konsisten 6 bulan', description: 'Tidak ada keterlambatan pembayaran dalam 6 bulan terakhir', points: 73, progress: 75, tag: 'Character', direction: 'naik' },
  { id: 'f3', icon: TrendingUp, title: 'Omzet stabil dan meningkat', description: 'Tren omzet naik 12% selama 3 bulan berturut-turut', points: 65, progress: 68, tag: 'Capacity', direction: 'naik' },
  { id: 'f4', icon: Clock, title: 'Usaha sudah berjalan 2 tahun', description: 'Durasi operasional menunjukkan ketahanan dan keberlangsungan usaha', points: 54, progress: 58, tag: 'Condition', direction: 'naik' },
  { id: 'f5', icon: Star, title: 'Rating toko Tokopedia 4.8 bintang', description: 'Reputasi digital tinggi dari 230+ ulasan pembeli', points: 41, progress: 45, tag: 'Collateral', direction: 'naik' },
];

const factorsMenurun = [
  { id: 'm1', icon: TrendingDown, title: 'Rasio hutang terhadap pendapatan tinggi', description: 'Beban cicilan bulanan mencapai 45% dari total omzet, melewati batas aman 30%.', points: 23, progress: 45, tag: 'Capital', direction: 'menurun' },
  { id: 'm2', icon: FileWarning, title: 'Data legalitas usaha belum lengkap', description: 'Belum melampirkan NIB dan NPWP perusahaan yang dapat menambah bobot kepercayaan.', points: 15, progress: 35, tag: 'Character', direction: 'menurun' },
  { id: 'm3', icon: Clock, title: 'Keterlambatan pembayaran supplier', description: 'Tercatat 2 kali keterlambatan pembayaran >7 hari dalam 3 bulan terakhir.', points: 12, progress: 25, tag: 'Condition', direction: 'menurun' },
];

const actionPlans = [
  { id: 'a1', number: 1, title: 'Hubungkan akun GoPay atau OVO', description: 'Koneksi e-wallet memungkinkan ModalIn memverifikasi arus kas digitalmu secara real-time.', points: 18, chips: [{ label: 'Mudah, 5 menit', kind: 'easy', check: true }, { label: 'Capacity', kind: 'category' }, { label: 'Prioritas utama', kind: 'priority' }], cta: { label: 'Mulai', variant: 'primary' } },
  { id: 'a2', number: 2, title: 'Daftar koperasi atau asosiasi UMKM setempat', description: 'Keanggotaan resmi di koperasi atau asosiasi UMKM meningkatkan dimensi Collateral.', points: 12, chips: [{ label: 'Sedang, 1-2 minggu', kind: 'medium' }, { label: 'Collateral', kind: 'category' }], cta: { label: 'Info', variant: 'outline' } },
  { id: 'a3', number: 3, title: 'Bayar tagihan air PDAM secara rutin 3 bulan ke depan', description: 'Konsisten pembayaran tagihan utilitas adalah sinyal Character yang kuat.', points: 9, chips: [{ label: 'Mudah, Otomatis', kind: 'easy', check: true }, { label: 'Character', kind: 'category' }], cta: { label: 'Hubungkan', variant: 'outline' } },
  { id: 'a4', number: 4, title: 'Stabilkan pengeluaran bulanan dalam rentang yang konsisten', description: 'Cobalah menjaga pengeluaran dalam rentang 15% dari rata-rata.', points: 12, chips: [{ label: 'Sedang, 2-3 bulan', kind: 'medium' }, { label: 'Capacity', kind: 'category' }], cta: { label: 'Info', variant: 'outline' } },
];

const chipStyles = {
  easy: 'bg-emerald-50 text-emerald-700',
  medium: 'bg-amber-50 text-amber-700',
  auto: 'bg-emerald-50 text-emerald-700',
  priority: 'bg-orange-50 text-orange-600',
  category: 'bg-[#E6F7FA] text-[#0092B3]',
};

const dimensionLabels = {
  CHARACTER: 'Character',
  CAPACITY: 'Capacity',
  CONDITION: 'Condition',
  CAPITAL: 'Capital',
  COLLATERAL: 'Collateral',
};

const getScoreDate = (value) => {
  if (!value) return '12 Apr 2026';
  return new Date(value).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const buildApiFactors = (factors, direction) => {
  if (!Array.isArray(factors) || factors.length === 0) {
    return direction === 'menurun' ? factorsMenurun : factorsNaik;
  }

  const impactType = direction === 'menurun' ? 'NEGATIVE' : 'POSITIVE';
  const iconPool = direction === 'menurun' ? [TrendingDown, FileWarning, Clock] : [RefreshCw, Zap, TrendingUp, Clock, Star];
  const mappedFactors = factors
    .filter((factor) => factor.impactType === impactType)
    .map((factor, index) => ({
      id: factor.id || `${direction}-${index}`,
      icon: iconPool[index % iconPool.length],
      title: factor.title,
      description: factor.description || 'Faktor dari hasil analisis skor kreditmu.',
      points: Math.abs(factor.impactPoints || 0),
      progress: Math.min(100, Math.abs(factor.impactPoints || 0)),
      tag: dimensionLabels[factor.dimension] || 'Capacity',
      direction,
    }));

  return mappedFactors.length > 0 ? mappedFactors : direction === 'menurun' ? factorsMenurun : factorsNaik;
};

const buildApiRecommendations = (recommendations) => {
  if (!Array.isArray(recommendations) || recommendations.length === 0) return actionPlans;

  return recommendations.map((recommendation, index) => ({
    id: recommendation.id || `api-action-${index}`,
    number: index + 1,
    title: recommendation.title,
    description: recommendation.description || 'Rekomendasi dari hasil analisis skor kreditmu.',
    points: recommendation.estimatedPoints || 0,
    chips: [
      { label: recommendation.priority || 'MEDIUM', kind: recommendation.priority === 'HIGH' ? 'priority' : 'medium' },
      { label: dimensionLabels[recommendation.dimension] || 'Capacity', kind: 'category' },
    ],
    cta: { label: recommendation.actionLabel || 'Mulai', variant: index === 0 ? 'primary' : 'outline' },
  }));
};

function HeroScoreRing({ score = 748 }) {
  const r = 50;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 1000) * c;
  return (
    <div className="relative w-[110px] h-[110px] sm:w-[130px] sm:h-[130px]">
      <svg className="w-full h-full -rotate-90">
        <circle cx="50%" cy="50%" r={r} stroke="#E6F7FA" strokeWidth="8" fill="none" />
        <circle cx="50%" cy="50%" r={r} stroke="url(#scoreRingGrad)" strokeWidth="8" fill="none" strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" />
        <defs>
          <linearGradient id="scoreRingGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0092B3" />
            <stop offset="100%" stopColor="#4FC3DC" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-heading font-bold text-zinc-900 text-[28px] sm:text-[34px] leading-none">{score}</span>
        <span className="font-body text-[10px] text-zinc-400 mt-1">dari 1000</span>
      </div>
    </div>
  );
}

const ScoreExplainabilityPage = () => {
  const [activeFilter, setActiveFilter] = useState('naik');
  const [scoreData, setScoreData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    scoreService.getExplainability()
      .then((response) => {
        if (isMounted) setScoreData(response.data.score);
      })
      .catch(() => {
        if (isMounted) setScoreData(null);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const currentScore = scoreData?.score || 748;
  const currentCategory = scoreData?.category || 'Cukup baik';
  const updatedAt = getScoreDate(scoreData?.calculatedAt);
  const positiveFactors = buildApiFactors(scoreData?.factors, 'naik');
  const negativeFactors = buildApiFactors(scoreData?.factors, 'menurun');
  const displayActionPlans = buildApiRecommendations(scoreData?.recommendations);
  const currentFactors = activeFilter === 'menurun' ? negativeFactors : activeFilter === 'naik' ? positiveFactors : [];
  const potentialIncrease = displayActionPlans.reduce((total, plan) => total + Number(plan.points || 0), 0);

  return (
    <>
      {/* HERO */}
      <section className="relative px-6 sm:px-10 lg:px-14 pt-10 pb-12 bg-gradient-to-br from-[#F0FAFC] via-white to-white border-b border-zinc-100 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-[420px] h-[420px] rounded-full bg-[#0092B3]/5 blur-3xl pointer-events-none" />
        <div className="relative">
          <p className="font-body text-[11px] uppercase tracking-[0.18em] text-[#0092B3] font-medium">Skor & Explainability</p>
          <h1 className="font-heading font-bold text-[28px] sm:text-[34px] text-zinc-900 tracking-tight mt-2 leading-tight max-w-2xl">
            Mengapa skormu <span className="text-[#0092B3]">{currentScore}</span>?
          </h1>
          <p className="font-body text-[13.5px] text-zinc-500 mt-3 max-w-xl leading-relaxed">
            Telusuri faktor yang mendorong dan menurunkan skor kreditmu, serta rencana aksi konkret untuk meningkatkannya.
          </p>
          {/* KPI grid */}
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1fr] gap-6 lg:gap-0 lg:divide-x lg:divide-zinc-200/60">
            <div className="lg:pr-8 flex items-center gap-5 col-span-2 lg:col-span-1">
              <HeroScoreRing score={currentScore} />
              <div>
                <p className="font-body text-[11px] uppercase tracking-wider text-zinc-400 font-medium">Skor saat ini</p>
                <p className="font-heading font-semibold text-[14px] text-zinc-900 mt-1.5">{currentCategory}</p>
                <p className="font-body text-[11.5px] text-zinc-500 mt-1">Diperbarui {updatedAt}</p>
              </div>
            </div>
            <div className="lg:px-8">
              <div className="flex items-center gap-2 text-emerald-600">
                <TrendingUp className="w-4 h-4" />
                <p className="font-body text-[11px] uppercase tracking-wider font-medium">Potensi kenaikan</p>
              </div>
              <p className="font-heading font-bold text-[30px] text-emerald-600 leading-none mt-3">+{potentialIncrease || 47}</p>
              <p className="font-body text-[12px] text-zinc-500 mt-2">Jika semua aksi dijalankan</p>
            </div>
            <div className="lg:px-8">
              <div className="flex items-center gap-2 text-[#0092B3]">
                <ArrowUpRight className="w-4 h-4" />
                <p className="font-body text-[11px] uppercase tracking-wider font-medium">Faktor naik</p>
              </div>
              <p className="font-heading font-bold text-[30px] text-zinc-900 leading-none mt-3">{positiveFactors.length}</p>
              <p className="font-body text-[12px] text-zinc-500 mt-2">Berkontribusi positif</p>
            </div>
            <div className="lg:px-8">
              <div className="flex items-center gap-2 text-rose-600">
                <ArrowDownRight className="w-4 h-4" />
                <p className="font-body text-[11px] uppercase tracking-wider font-medium">Faktor menurun</p>
              </div>
              <p className="font-heading font-bold text-[30px] text-zinc-900 leading-none mt-3">{negativeFactors.length}</p>
              <p className="font-body text-[12px] text-zinc-500 mt-2">Perlu diperbaiki</p>
            </div>
          </div>
        </div>
      </section>

      {/* TAB NAV */}
      <nav className="px-6 sm:px-10 lg:px-14 border-b border-zinc-100 sticky top-0 bg-white/90 backdrop-blur z-10">
        <div className="flex items-center gap-8 overflow-x-auto">
          {filters.map((f) => {
            const active = activeFilter === f.key;
            return (
              <button key={f.key} onClick={() => setActiveFilter(f.key)} className={`relative py-4 text-[13px] font-medium whitespace-nowrap transition-colors ${active ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-700'}`}>
                {f.label}
                {active && <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-[#0092B3] rounded-full" />}
              </button>
            );
          })}
        </div>
      </nav>

      {/* CONTENT */}
      <div className="px-6 sm:px-10 lg:px-14 py-12">
        {activeFilter !== 'rencana' ? (
          <div className="grid grid-cols-1 xl:grid-cols-[1.7fr_1fr] gap-12">
            <section>
              <h2 className="font-heading font-bold text-[20px] text-zinc-900 tracking-tight">
                {activeFilter === 'naik' ? 'Faktor yang mendorong skor naik' : 'Faktor yang menurunkan skor'}
              </h2>
              <p className="font-body text-[12.5px] text-zinc-500 mt-1 max-w-xl">
                {activeFilter === 'naik' ? 'Pertahankan dan tingkatkan faktor berikut agar skor terus naik konsisten.' : 'Area-area berikut perlu diperbaiki untuk meningkatkan skor kreditmu.'}
              </p>
              <ol className="mt-8 relative pl-6 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-zinc-200">
                {currentFactors.map((factor) => {
                  const Icon = factor.icon;
                  const isMenurun = factor.direction === 'menurun';
                  return (
                    <li key={factor.id} className="relative pb-8 last:pb-0">
                      <span className={`absolute -left-[22px] top-1.5 w-[14px] h-[14px] rounded-full border-2 border-white ring-1 ${isMenurun ? 'bg-rose-500 ring-rose-200' : 'bg-[#0092B3] ring-[#0092B3]/40'}`} />
                      <div className="flex items-start gap-4">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${isMenurun ? 'bg-rose-50' : 'bg-emerald-50'}`}>
                          <Icon className={`w-5 h-5 ${isMenurun ? 'text-rose-600' : 'text-emerald-600'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 flex-wrap">
                            <h3 className="font-heading font-semibold text-[14px] text-zinc-900 leading-snug">{factor.title}</h3>
                            <span className={`font-heading font-bold text-[14px] whitespace-nowrap ${isMenurun ? 'text-rose-600' : 'text-emerald-600'}`}>
                              {isMenurun ? '−' : '+'}{factor.points} poin
                            </span>
                          </div>
                          <p className="font-body text-[12.5px] text-zinc-500 mt-1.5 leading-relaxed">{factor.description}</p>
                          <div className="mt-3 flex items-center gap-3">
                            <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden max-w-xs">
                              <div className={`h-full rounded-full ${isMenurun ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${factor.progress}%` }} />
                            </div>
                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${tagStyles[factor.tag]}`}>{factor.tag}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
            <aside className="space-y-6 xl:sticky xl:top-20 xl:self-start">
              <div className="bg-gradient-to-br from-[#E6F7FA] to-[#F0FAFC] border border-[#0092B3]/15 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-[#00768F]">
                  {activeFilter === 'naik' ? <Lightbulb className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  <p className="font-body text-[11px] uppercase tracking-wider font-medium">Insight</p>
                </div>
                <p className="font-heading font-semibold text-[14px] text-zinc-900 mt-3 leading-snug">
                  {activeFilter === 'naik' ? 'Frekuensi transaksi digital dan ketepatan tagihan adalah dua kontributor utama skormu.' : 'Rasio hutang dan kelengkapan dokumen legalitas adalah dua prioritas perbaikan utama.'}
                </p>
                <p className="font-body text-[12px] text-zinc-600 mt-2 leading-relaxed">
                  {activeFilter === 'naik' ? 'Pertahankan ritme ini agar skor terus naik konsisten +10 poin per bulan.' : 'Memperbaiki dua faktor ini berpotensi menambah +35 poin dalam 2-3 bulan.'}
                </p>
              </div>
              <div className="border border-zinc-100 rounded-2xl p-5">
                <p className="font-body text-[11px] uppercase tracking-wider font-medium text-zinc-400">Total dampak</p>
                <p className={`font-heading font-bold text-[28px] leading-none mt-2 ${activeFilter === 'naik' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {activeFilter === 'naik' ? '+322' : '−50'} <span className="font-body text-[14px] text-zinc-400 font-normal">poin</span>
                </p>
                <p className="font-body text-[12px] text-zinc-500 mt-2">
                  Akumulasi {activeFilter === 'naik' ? currentFactors.length + ' faktor positif' : currentFactors.length + ' faktor negatif'}
                </p>
              </div>
              <div className="border border-zinc-100 rounded-2xl p-5">
                <p className="font-body text-[11px] uppercase tracking-wider font-medium text-zinc-400">Dimensi paling kuat</p>
                <p className="font-heading font-bold text-[18px] text-zinc-900 leading-none mt-2">{activeFilter === 'naik' ? 'Capacity' : 'Capital'}</p>
                <p className="font-body text-[12px] text-zinc-500 mt-2 leading-relaxed">
                  {activeFilter === 'naik' ? 'Kemampuan finansial dan transaksi konsisten.' : 'Struktur modal dan rasio hutang perlu perhatian.'}
                </p>
              </div>
            </aside>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-[1.7fr_1fr] gap-12">
            <section>
              <h2 className="font-heading font-bold text-[20px] text-zinc-900 tracking-tight">Rencana aksi prioritas</h2>
              <p className="font-body text-[12.5px] text-zinc-500 mt-1 max-w-xl">Langkah-langkah konkret yang bisa kamu lakukan untuk meningkatkan skor.</p>
              <div className="mt-8 space-y-4">
                {displayActionPlans.map((plan) => (
                  <div key={plan.id} className="bg-white border border-zinc-100 rounded-2xl p-5 hover:border-zinc-200 hover:shadow-sm transition-all flex flex-col sm:flex-row items-start gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#E6F7FA] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="font-heading font-bold text-[13px] text-[#0092B3]">{plan.number}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold text-[14px] text-zinc-900 leading-snug">{plan.title}</h3>
                      <p className="font-body text-[12.5px] text-zinc-500 mt-1.5 leading-relaxed">{plan.description}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-3.5">
                        {plan.chips.map((chip, i) => (
                          <span key={i} className={`inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full ${chipStyles[chip.kind]}`}>
                            {chip.check && <Check className="w-3 h-3" strokeWidth={3} />}
                            {chip.label}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0 pl-2">
                      <div className="text-right">
                        <p className="font-heading font-bold text-[18px] text-emerald-600 leading-none">+{plan.points} poin</p>
                        <p className="font-body text-[11px] text-zinc-400 mt-1">estimasi</p>
                      </div>
                      <button className={`mt-1 px-4 py-1.5 rounded-full text-[12px] font-medium transition-all ${plan.cta.variant === 'primary' ? 'bg-[#0092B3] text-white hover:bg-[#00768F] shadow-sm' : 'bg-white text-zinc-700 border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'}`}>
                        {plan.cta.label}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <aside className="space-y-6 xl:sticky xl:top-20 xl:self-start">
              <div className="bg-gradient-to-br from-[#E6F7FA] to-[#F0FAFC] border border-[#0092B3]/15 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-[#00768F]">
                  <Trophy className="w-4 h-4" />
                  <p className="font-body text-[11px] uppercase tracking-wider font-medium">Target skor</p>
                </div>
                <p className="font-heading font-bold text-[42px] text-[#00768F] leading-none mt-4">{Math.min(1000, currentScore + (potentialIncrease || 47))}</p>
                <p className="font-heading font-semibold text-[14px] text-zinc-900 mt-3 leading-snug">Jika semua langkah dilakukan, skor bisa mencapai 795 dalam 3 bulan.</p>
                <p className="font-body text-[12px] text-zinc-600 mt-2 leading-relaxed">Skor 795 membuka akses ke produk pinjaman lebih luas dari mitra ModalIn.</p>
              </div>
              <div className="border border-zinc-100 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-zinc-700">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  <p className="font-body text-[11px] uppercase tracking-wider font-medium text-zinc-400">Potensi total</p>
                </div>
                <p className="font-heading font-bold text-[28px] text-emerald-600 leading-none mt-3">+{potentialIncrease || 47} poin</p>
                <p className="font-body text-[12px] text-zinc-500 mt-2">Dari {displayActionPlans.length} rencana aksi</p>
              </div>
              <div className="border border-zinc-100 rounded-2xl p-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E6F7FA] flex items-center justify-center">
                  <Target className="w-5 h-5 text-[#0092B3]" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-[13px] text-zinc-900">Mulai dari yang termudah</p>
                  <p className="font-body text-[11.5px] text-zinc-500 mt-0.5">Aksi #1 cuma butuh 5 menit</p>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </>
  );
};

export default ScoreExplainabilityPage;
