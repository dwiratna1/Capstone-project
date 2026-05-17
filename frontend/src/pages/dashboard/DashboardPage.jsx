import { useState, useEffect, useRef } from 'react';

/**
 * DashboardPage - Main dashboard view for ModalIN.
 * Displays credit score overview, 5C breakdown, stat cards, and recommendations.
 * Features staggered entrance animations and animated counters.
 */
const DashboardPage = () => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [barsVisible, setBarsVisible] = useState(false);
  const [sectionsVisible, setSectionsVisible] = useState([false, false, false, false, false]);
  const scoreRef = useRef(null);

  // Stagger section reveals
  useEffect(() => {
    const delays = [100, 250, 400, 550, 700];
    delays.forEach((delay, i) => {
      setTimeout(() => {
        setSectionsVisible((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, delay);
    });
  }, []);

  // Animate score counter
  useEffect(() => {
    const target = scoreData.score;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * target));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // Trigger bars animation
  useEffect(() => {
    const timer = setTimeout(() => setBarsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Mock data
  const scoreData = {
    score: 748,
    maxScore: 1000,
    label: 'Cukup baik',
    segment: 'Segmen Kuliner',
    rank: 'Peringkat 43%',
    lastUpdated: '14 Apr 2026',
  };

  const statCards = [
    { label: 'Rata-rata omzet', value: 'Rp 8,6 jt', sub: '12% dari bulan lalu' },
    { label: 'Rasio pengeluaran', value: '60%', sub: 'Target < 70%' },
    { label: 'Transaksi digital', value: '120', sub: 'bulan ini' },
    { label: 'Tagihan tepat waktu', value: '100%', sub: '4 bulan berturut' },
  ];

  const breakdownData = [
    { label: 'Capacity', score: 80, max: 100, color: '#6366F1' },
    { label: 'Character', score: 75, max: 100, color: '#A855F7' },
    { label: 'Condition', score: 68, max: 100, color: '#06B6D4' },
    { label: 'Capital', score: 55, max: 100, color: '#F59E0B' },
    { label: 'Collateral', score: 45, max: 100, color: '#F97316' },
  ];

  const recommendations = [
    {
      title: 'Tambah koneksi e-wallet',
      desc: 'Hubungkan GoPlay atau OVO untuk verifikasi kas digital',
      points: '+18 poin estimasi',
      bgColor: 'bg-[#ECFDF5]',
      borderColor: 'bg-[#34D399]',
      titleColor: 'text-[#065F46]',
      pointsColor: 'text-[#059669]',
    },
    {
      title: 'Lengkapi data tagihan',
      desc: 'Konsisten pembayaran tagihan meningkatkan dimensi Character',
      points: '+9 poin estimasi',
      bgColor: 'bg-[#F5F3FF]',
      borderColor: 'bg-[#A78BFA]',
      titleColor: 'text-[#5B21B6]',
      pointsColor: 'text-[#7C3AED]',
    },
  ];

  // SVG Circle parameters
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const percentage = animatedScore / scoreData.maxScore;
  const strokeDashoffset = circumference * (1 - percentage);

  // Transition helper
  const sectionClass = (index) =>
    `transform transition-all duration-700 ease-out ${
      sectionsVisible[index]
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-6'
    }`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={sectionClass(0)}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-[28px] font-bold text-zinc-900 tracking-tight">
              Selamat Datang, Dwi Ratna!
            </h1>
            <p className="text-[14px] text-zinc-400 mt-1">
              Skor terakhir diperbarui - {scoreData.lastUpdated}
            </p>
          </div>
          <button className="self-start sm:self-auto px-5 py-2.5 rounded-xl border border-zinc-200 text-[14px] font-medium text-zinc-700 hover:bg-zinc-50 hover:shadow-sm transition-all duration-200 whitespace-nowrap">
            Lihat rekomendasi
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className={sectionClass(1)}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-zinc-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <p className="text-[13px] text-zinc-400 mb-2">{stat.label}</p>
              <p className="text-2xl sm:text-[28px] font-bold text-zinc-900 tracking-tight">{stat.value}</p>
              <p className="text-[12px] text-zinc-400 mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Score Ring + Breakdown 5C */}
      <div className={sectionClass(2)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Score Ring Card */}
          <div className="bg-white rounded-2xl border border-zinc-100 p-6 sm:p-8 flex flex-col items-center justify-between">
            <div className="flex flex-col items-center">
              {/* Circular Progress */}
              <div className="relative w-[200px] h-[200px]" ref={scoreRef}>
                <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                  {/* Background circle */}
                  <circle
                    cx="100" cy="100" r={radius}
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="100" cy="100" r={radius}
                    fill="none"
                    stroke="#7B61FF"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
                  />
                </svg>
                {/* Score text inside circle */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[48px] font-bold text-zinc-900 leading-none tabular-nums">{animatedScore}</span>
                  <span className="text-[13px] text-zinc-400 mt-1">dari {scoreData.maxScore}</span>
                </div>
              </div>

              <p className="text-[15px] text-zinc-500 font-medium mt-4">{scoreData.label}</p>
            </div>

            {/* Segment Info */}
            <div className="mt-6 self-start">
              <p className="text-[13px] text-zinc-400">{scoreData.segment}</p>
              <p className="text-[15px] font-semibold text-zinc-900">{scoreData.rank}</p>
            </div>
          </div>

          {/* Breakdown 5C */}
          <div className="bg-white rounded-2xl border border-zinc-100 p-6 sm:p-8">
            <h2 className="text-[17px] font-bold text-zinc-900 mb-6">Breakdown 5C</h2>
            <div className="space-y-5">
              {breakdownData.map((item, i) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[14px] font-medium text-zinc-700">{item.label}</span>
                    <span className="text-[14px] font-medium text-zinc-500 tabular-nums">{item.score}/{item.max}</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: barsVisible ? `${(item.score / item.max) * 100}%` : '0%',
                        backgroundColor: item.color,
                        transition: `width 1s cubic-bezier(0.4, 0, 0.2, 1) ${i * 150}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rekomendasi Prioritas */}
      <div className={sectionClass(3)}>
        <div className="bg-white rounded-2xl border border-zinc-100 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[17px] font-bold text-zinc-900">Rekomendasi prioritas</h2>
            <button className="text-[14px] text-zinc-500 font-medium hover:text-zinc-700 transition-colors">
              Lihat semua
            </button>
          </div>

          <div className="space-y-4">
            {recommendations.map((rec, i) => (
              <div
                key={i}
                className={`flex rounded-2xl overflow-hidden ${rec.bgColor} hover:shadow-sm transition-all duration-300`}
              >
                <div className="flex-1 flex items-center justify-between gap-4 p-4 sm:p-5">
                  <div>
                    <h3 className={`text-[14px] font-semibold ${rec.titleColor} mb-0.5`}>{rec.title}</h3>
                    <p className="text-[13px] text-zinc-500">{rec.desc}</p>
                  </div>
                  <span className={`text-[14px] font-semibold ${rec.pointsColor} whitespace-nowrap`}>{rec.points}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
