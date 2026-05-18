import { Link } from 'react-router-dom';
import { TrendingUp, Sparkles, ArrowUpRight, Wallet, Receipt, Smartphone, ShieldCheck, Target, Trophy, Lightbulb, ChevronRight, Activity, Bell, CheckCircle2, Zap } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';

const trend = [
  { m: 'Nov', s: 680 }, { m: 'Des', s: 695 }, { m: 'Jan', s: 712 },
  { m: 'Feb', s: 724 }, { m: 'Mar', s: 737 }, { m: 'Apr', s: 748 },
];

function HeroSparkline() {
  return (
    <svg viewBox="0 0 220 56" className="w-full h-14">
      <defs>
        <linearGradient id="dashSpark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0092B3" stopOpacity={0.28} />
          <stop offset="100%" stopColor="#0092B3" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d="M0 44 L36 38 L72 32 L108 26 L144 20 L180 14 L220 8 L220 56 L0 56 Z" fill="url(#dashSpark)" />
      <path d="M0 44 L36 38 L72 32 L108 26 L144 20 L180 14 L220 8" stroke="#0092B3" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

const kpis = [
  { icon: Wallet, label: 'Rata-rata omzet', value: 'Rp 8,6jt', delta: '+12%', tone: 'up' },
  { icon: Receipt, label: 'Rasio pengeluaran', value: '60%', delta: 'Target <70%', tone: 'neutral' },
  { icon: Smartphone, label: 'Transaksi digital', value: '120', delta: 'bulan ini', tone: 'neutral' },
  { icon: ShieldCheck, label: 'Tagihan tepat waktu', value: '100%', delta: '4 bln', tone: 'up' },
];

const breakdown = [
  { label: 'Capacity', value: 80, color: '#0092B3', note: 'Kemampuan bayar' },
  { label: 'Character', value: 75, color: '#0092B3', note: 'Histori kredit' },
  { label: 'Condition', value: 68, color: '#00B4D8', note: 'Kondisi usaha' },
  { label: 'Capital', value: 55, color: '#F59E0B', note: 'Modal & aset' },
  { label: 'Collateral', value: 45, color: '#F97316', note: 'Jaminan' },
];

const recs = [
  { n: 1, icon: Smartphone, title: 'Hubungkan e-wallet', desc: 'Sinkronkan GoPay & OVO untuk verifikasi arus kas digital', points: '+18', chip: 'Mudah · 5 menit', cta: 'Hubungkan' },
  { n: 2, icon: Receipt, title: 'Lengkapi tagihan rutin', desc: 'Bukti pembayaran konsisten memperkuat dimensi Character', points: '+9', chip: 'Sedang · 15 menit', cta: 'Mulai' },
  { n: 3, icon: Trophy, title: 'Tambah jaminan opsional', desc: 'Daftarkan aset usaha untuk mengangkat dimensi Collateral', points: '+12', chip: 'Lanjutan', cta: 'Info' },
];

const activityData = [
  { time: '2 jam lalu', icon: TrendingUp, text: 'Skor naik +11 poin', tag: 'Skor', color: '#0092B3' },
  { time: 'Kemarin', icon: CheckCircle2, text: 'Impor 32 transaksi GoPay berhasil', tag: 'Impor', color: '#10B981' },
  { time: '3 hari lalu', icon: Bell, text: 'Pengingat tagihan listrik · Rp 480rb', tag: 'Tagihan', color: '#F59E0B' },
  { time: '5 hari lalu', icon: Sparkles, text: 'Rekomendasi baru tersedia', tag: 'Insight', color: '#0092B3' },
];

const DashboardPage = () => {
  return (
    <>
      {/* HERO */}
      <section className="relative px-6 sm:px-10 lg:px-14 pt-10 pb-12 bg-gradient-to-br from-[#F0FAFC] via-white to-white border-b border-zinc-100 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-[460px] h-[460px] rounded-full bg-[#0092B3]/[0.06] blur-3xl pointer-events-none" />
        <div className="absolute -left-32 top-40 w-[320px] h-[320px] rounded-full bg-[#4FC3DC]/[0.08] blur-3xl pointer-events-none" />
        <div className="relative">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div>
              <p className="font-body text-[11px] uppercase tracking-[0.18em] text-[#0092B3] font-medium">Beranda · Modalin</p>
              <h1 className="font-heading font-bold text-[28px] sm:text-[34px] text-zinc-900 tracking-tight mt-2 leading-tight max-w-2xl">
                Selamat datang, <span className="text-[#0092B3]">Dwi Ratna</span>.
              </h1>
              <p className="font-body text-[13.5px] text-zinc-500 mt-3 max-w-xl leading-relaxed">
                Skor kreditmu dalam performa terbaik bulan ini. Pantau ringkasan, rekomendasi, dan aktivitas terbarumu di satu tempat.
              </p>
            </div>
            <Link to="/score" className="hidden md:inline-flex items-center gap-2 bg-white border border-zinc-200 hover:border-[#0092B3]/40 hover:bg-[#F0FAFC] text-zinc-800 font-medium text-[13px] px-5 py-2.5 rounded-xl transition-all shrink-0">
              Lihat rekomendasi <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          {/* KPI grid */}
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr] gap-6 lg:gap-0 lg:divide-x lg:divide-zinc-200/60">
            <div className="lg:pr-8 col-span-2 lg:col-span-1">
              <div className="flex items-baseline gap-2">
                <span className="font-heading font-bold text-[48px] sm:text-[56px] text-zinc-900 leading-none tracking-tight">748</span>
                <span className="font-body text-[13px] text-zinc-400">/ 1000</span>
              </div>
              <p className="font-body text-[12px] text-zinc-500 mt-2">Skor saat ini · diperbarui 14 Apr 2026</p>
              <div className="mt-4"><HeroSparkline /></div>
            </div>
            {kpis.map((k, i) => {
              const Icon = k.icon;
              const accent = k.tone === 'up' ? 'text-emerald-600' : 'text-[#0092B3]';
              return (
                <div key={i} className="lg:px-8">
                  <div className={`flex items-center gap-2 ${accent}`}>
                    <Icon className="w-4 h-4" />
                    <p className="font-body text-[11px] uppercase tracking-wider font-medium truncate">{k.label}</p>
                  </div>
                  <p className="font-heading font-bold text-[28px] text-zinc-900 leading-none tracking-tight mt-3">{k.value}</p>
                  <p className={`font-body text-[12px] mt-2 ${k.tone === 'up' ? 'text-emerald-600 font-medium' : 'text-zinc-500'}`}>{k.delta}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="px-6 sm:px-8 lg:px-12 py-10">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-8">
          {/* MAIN */}
          <div className="space-y-8 min-w-0">
            {/* Trend + Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
              {/* Trend */}
              <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="font-body text-[11px] tracking-[0.16em] uppercase text-zinc-400 mb-1">Tren skor · 6 bulan</p>
                    <p className="font-heading font-bold text-zinc-900 text-[24px] leading-none tracking-tight">748</p>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-heading font-semibold text-[11px]">
                    <TrendingUp className="w-3 h-3" /> +68
                  </span>
                </div>
                <div style={{ width: '100%', height: 130 }} className="mt-4">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    <AreaChart data={trend} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
                      <defs>
                        <linearGradient id="dashArea" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0092B3" stopOpacity={0.32} />
                          <stop offset="100%" stopColor="#0092B3" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="m" tick={{ fontSize: 10, fill: '#a1a1aa' }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e4e4e7', fontSize: 12 }} />
                      <Area type="monotone" dataKey="s" stroke="#0092B3" strokeWidth={2.5} fill="url(#dashArea)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <Link to="/score/history" className="mt-4 inline-flex items-center gap-1 font-heading font-semibold text-[12px] text-[#0092B3] hover:text-[#00768F]">
                  Lihat riwayat lengkap <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Breakdown 5C */}
              <div className="lg:col-span-3 bg-white border border-zinc-200 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <p className="font-body text-[11px] tracking-[0.16em] uppercase text-zinc-400 mb-1">Komposisi</p>
                    <h3 className="font-heading font-bold text-zinc-900 text-[16px] tracking-tight">Breakdown 5C</h3>
                  </div>
                  <Link to="/score" className="font-heading font-semibold text-[12px] text-[#0092B3] hover:text-[#00768F]">Detail</Link>
                </div>
                <div className="space-y-4">
                  {breakdown.map((b, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-semibold text-zinc-900 text-[13px]">{b.label}</span>
                          <span className="font-body text-[11px] text-zinc-400">· {b.note}</span>
                        </div>
                        <span className="font-heading font-semibold text-zinc-700 text-[12px] tabular-nums">{b.value}<span className="text-zinc-400 font-normal">/100</span></span>
                      </div>
                      <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${b.value}%`, backgroundColor: b.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Rekomendasi */}
            <div>
              <div className="flex items-end justify-between mb-5">
                <div>
                  <p className="font-body text-[11px] tracking-[0.16em] uppercase text-zinc-400 mb-1">Aksi cepat</p>
                  <h3 className="font-heading font-bold text-zinc-900 text-[18px] tracking-tight">Rekomendasi prioritas</h3>
                </div>
                <Link to="/score" className="font-heading font-semibold text-[12px] text-[#0092B3] hover:text-[#00768F] inline-flex items-center gap-1">
                  Lihat semua <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recs.map((r) => {
                  const Icon = r.icon;
                  return (
                    <div key={r.n} className="group relative bg-white border border-zinc-200 hover:border-[#0092B3]/40 hover:shadow-[0_8px_24px_-12px_rgba(0,146,179,0.25)] rounded-2xl p-5 transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-9 h-9 rounded-xl bg-[#E6F7FA] border border-[#0092B3]/15 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-[#0092B3]" />
                        </div>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-heading font-semibold text-[11px]">
                          <Zap className="w-3 h-3" /> {r.points} poin
                        </span>
                      </div>
                      <h4 className="font-heading font-bold text-zinc-900 text-[14px] tracking-tight mb-1.5">{r.title}</h4>
                      <p className="font-body text-[12px] text-zinc-500 leading-relaxed mb-4">{r.desc}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                        <span className="font-body text-[11px] text-zinc-400">{r.chip}</span>
                        <button className="inline-flex items-center gap-1 font-heading font-semibold text-[12px] text-[#0092B3] hover:text-[#00768F]">
                          {r.cta} <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Aktivitas */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-6">
              <div className="flex items-end justify-between mb-5">
                <div>
                  <p className="font-body text-[11px] tracking-[0.16em] uppercase text-zinc-400 mb-1">Linimasa</p>
                  <h3 className="font-heading font-bold text-zinc-900 text-[16px] tracking-tight">Aktivitas terbaru</h3>
                </div>
                <span className="font-body text-[11px] text-zinc-400">Update otomatis</span>
              </div>
              <ol className="relative space-y-5 pl-6 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-zinc-200">
                {activityData.map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <li key={i} className="relative">
                      <span className="absolute -left-[22px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white" style={{ backgroundColor: a.color }} />
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center shrink-0">
                            <Icon className="w-3.5 h-3.5 text-zinc-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-heading font-semibold text-zinc-900 text-[13px] leading-tight">{a.text}</p>
                            <p className="font-body text-[11px] text-zinc-400 mt-1">{a.time} · {a.tag}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* RIGHT RAIL */}
          <aside className="space-y-5 xl:sticky xl:top-6 self-start">
            {/* Target card */}
            <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-[#0092B3] to-[#00768F] text-white">
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4" />
                  <p className="font-body text-[11px] tracking-[0.16em] uppercase text-white/70">Target skor</p>
                </div>
                <p className="font-heading font-bold text-[40px] leading-none tracking-tight">795</p>
                <p className="font-body text-[12px] text-white/75 mt-2 leading-relaxed">
                  Tinggal <span className="font-heading font-semibold text-white">+47 poin</span> untuk mencapai kategori <span className="font-heading font-semibold text-white">Sangat baik</span>
                </p>
                <div className="mt-4 h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: '94%' }} />
                </div>
                <Link to="/score" className="mt-5 inline-flex items-center gap-1.5 bg-white text-[#0092B3] hover:bg-white/95 font-heading font-semibold text-[12px] px-4 py-2 rounded-lg">
                  Lihat rencana <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Insight */}
            <div className="rounded-2xl p-5 bg-white border border-zinc-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-[#E6F7FA] flex items-center justify-center">
                  <Lightbulb className="w-3.5 h-3.5 text-[#0092B3]" />
                </div>
                <p className="font-heading font-semibold text-zinc-900 text-[13px]">Insight minggu ini</p>
              </div>
              <p className="font-body text-[12px] text-zinc-600 leading-relaxed">
                Konsistensi transaksi digital meningkat <span className="font-heading font-semibold text-zinc-900">+24%</span>. Pertahankan ritme ini untuk membuka tier kredit berikutnya.
              </p>
            </div>

            {/* Quick links */}
            <div className="rounded-2xl p-5 bg-[#F8FBFC] border border-[#0092B3]/10">
              <p className="font-body text-[11px] tracking-[0.16em] uppercase text-zinc-400 mb-3">Pintasan</p>
              <div className="space-y-1">
                {[
                  { to: '/score', label: 'Skor & Explainability', icon: Activity },
                  { to: '/score/history', label: 'Riwayat skor', icon: TrendingUp },
                  { to: '/profile', label: 'Profil usaha', icon: ShieldCheck },
                ].map((l, i) => {
                  const Icon = l.icon;
                  return (
                    <Link key={i} to={l.to} className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg hover:bg-white transition-colors group">
                      <span className="flex items-center gap-2.5 min-w-0">
                        <Icon className="w-3.5 h-3.5 text-[#0092B3] shrink-0" />
                        <span className="font-heading font-semibold text-zinc-800 text-[12.5px] truncate">{l.label}</span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-300 group-hover:text-[#0092B3] transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Tip */}
            <div className="rounded-2xl p-5 bg-gradient-to-br from-[#F0FAFC] to-white border border-[#0092B3]/15">
              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-[#0092B3] mt-0.5 shrink-0" />
                <div>
                  <p className="font-heading font-semibold text-zinc-900 text-[12.5px] mb-1">Tip dari Modalin</p>
                  <p className="font-body text-[11.5px] text-zinc-600 leading-relaxed">Update data keuangan setiap minggu agar skor selalu akurat.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export default DashboardPage;
