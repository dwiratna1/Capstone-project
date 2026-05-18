import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, BarChart2, Bell, ArrowUpRight, TrendingUp, Sparkles, ShieldCheck, CheckCircle2, Quote, Zap, Users, Wallet, Lightbulb } from 'lucide-react';
import logoModalIn from '../../assets/logo.png';

/** Scroll-reveal wrapper — adds class when element enters viewport */
function AnimateIn({ children, animation = 'anim-fade-up', delay = '', className = '', threshold = 0.15 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={`${visible ? `${animation} ${delay}` : 'anim-hidden'} ${className}`}>
      {children}
    </div>
  );
}

function HeroSparkline() {
  return (
    <svg viewBox="0 0 240 64" className="w-full h-16">
      <defs>
        <linearGradient id="landSpark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0092B3" stopOpacity={0.3} />
          <stop offset="100%" stopColor="#0092B3" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d="M0 50 L40 44 L80 36 L120 30 L160 22 L200 14 L240 8 L240 64 L0 64 Z" fill="url(#landSpark)" />
      <path d="M0 50 L40 44 L80 36 L120 30 L160 22 L200 14 L240 8" stroke="#0092B3" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

const features = [
  { icon: Clock, title: 'Skor dalam menit', desc: 'AI Modalin memproses data digitalmu dan menghasilkan skor kredit dalam hitungan detik — bukan minggu.' },
  { icon: BarChart2, title: 'Skor yang bisa ditingkatkan', desc: 'Lihat faktor apa yang memengaruhi skor dan langkah konkret untuk memperbaikinya, satu per satu.' },
  { icon: Bell, title: 'Peringatan dini', desc: 'Deteksi anomali arus kas sebelum kerugian membesar dengan monitoring real-time yang adaptif.' },
];

const framework = [
  { pct: '30%', label: 'Capacity', note: 'Omzet & stabilitas arus kas', color: '#0092B3' },
  { pct: '25%', label: 'Character', note: 'Konsistensi tagihan & lama usaha', color: '#00B4D8' },
  { pct: '20%', label: 'Condition', note: 'Jenis usaha & aktivitas marketplace', color: '#4FC3DC' },
  { pct: '15%', label: 'Capital', note: 'Estimasi aset & saldo e-wallet', color: '#F59E0B' },
  { pct: '10%', label: 'Collateral', note: 'Reputasi digital & koperasi', color: '#F97316' },
];

const stats = [
  { value: '12.000+', label: 'UMKM aktif', icon: Users },
  { value: 'Rp 48M', label: 'Total tersalurkan', icon: Wallet },
  { value: '92%', label: 'Approval rate', icon: ShieldCheck },
  { value: '< 2 mnt', label: 'Rata-rata penilaian', icon: Zap },
];

const steps = [
  { n: '01', title: 'Daftar & hubungkan data', desc: 'Sinkronkan marketplace, e-wallet, dan tagihan rutin dalam hitungan menit.' },
  { n: '02', title: 'Dapatkan skor 5C', desc: 'Modalin menilai 5 dimensi kelayakan dan menampilkan skor transparan.' },
  { n: '03', title: 'Tingkatkan & ajukan', desc: 'Ikuti rekomendasi konkret untuk naikkan skor, lalu ajukan ke partner finansial.' },
];

const testimonials = [
  { quote: 'Skorku naik 87 poin dalam 3 bulan setelah ikut rekomendasi Modalin. Akhirnya dapat modal kerja dari koperasi.', name: 'Ratih A.', role: 'Pemilik · Sambal Bu Ratih, Yogyakarta' },
  { quote: 'Transparan banget. Aku bisa lihat kenapa skorku segini, bukan cuma angka misterius dari bank.', name: 'Bayu P.', role: 'Owner · Kopi Tegalan, Bandung' },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white font-body text-zinc-900 overflow-x-hidden">
      {/* NAV */}
      <nav className="sticky top-0 z-30 bg-white/85 backdrop-blur border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between py-5">
          <Link to="/" className="flex items-center">
            <img src={logoModalIn} alt="Logo ModalIn" className="w-10 h-10 object-contain" />
            <span className="font-heading font-bold text-[22px] tracking-tight -ml-1.5">
              <span className="bg-gradient-to-tr from-[#0380C2] to-[#5DD8C4] text-transparent bg-clip-text">odalIN</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#fitur" className="font-medium text-[13px] text-zinc-600 hover:text-zinc-900">Fitur</a>
            <a href="#framework" className="font-medium text-[13px] text-zinc-600 hover:text-zinc-900">Framework 5C</a>
            <a href="#cerita" className="font-medium text-[13px] text-zinc-600 hover:text-zinc-900">Cerita UMKM</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden sm:inline-flex font-medium text-[13px] text-zinc-600 hover:text-zinc-900 px-3 py-2">Masuk</Link>
            <Link to="/register" className="bg-[#0092B3] hover:bg-[#00768F] text-white font-medium text-[13px] px-5 py-2.5 rounded-xl transition-colors inline-flex items-center gap-1.5">
              Daftar gratis <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-zinc-100 bg-gradient-to-br from-[#F0FAFC] via-white to-white">
        <div className="absolute -right-32 -top-32 w-[560px] h-[560px] rounded-full bg-[#0092B3]/[0.07] blur-3xl pointer-events-none" />
        <div className="absolute -left-40 top-60 w-[420px] h-[420px] rounded-full bg-[#4FC3DC]/[0.08] blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-14 items-center">
            <div>
              <AnimateIn animation="anim-fade-up">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#0092B3]/15 text-[#0092B3] font-body text-[11px] uppercase tracking-[0.16em] font-medium">
                  <Sparkles className="w-3 h-3" /> Skor kredit untuk UMKM
                </span>
              </AnimateIn>
              <AnimateIn animation="anim-fade-up" delay="anim-delay-100">
                <h1 className="font-heading font-bold text-[32px] sm:text-[44px] lg:text-[56px] leading-[1.08] tracking-tight text-zinc-900 mt-6">
                  Kredit layak untuk UMKM <span className="text-[#0092B3]">tanpa riwayat bank</span>.
                </h1>
              </AnimateIn>
              <AnimateIn animation="anim-fade-up" delay="anim-delay-200">
                <p className="font-body text-[14px] sm:text-[15.5px] text-zinc-600 mt-6 leading-relaxed max-w-xl">
                  Modalin menilai kelayakan usahamu dari data digital yang sudah kamu punya — omzet, tagihan, transaksi. Transparan, adil, dan bisa ditingkatkan.
                </p>
              </AnimateIn>
              <AnimateIn animation="anim-fade-up" delay="anim-delay-300">
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Link to="/register" className="inline-flex items-center gap-2 bg-[#0092B3] hover:bg-[#00768F] text-white font-semibold text-[13.5px] px-7 py-3.5 rounded-xl transition-colors shadow-[0_12px_28px_-12px_rgba(0,146,179,0.5)]">
                    Mulai sekarang <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <a href="#fitur" className="inline-flex items-center gap-2 bg-white border border-zinc-200 hover:border-zinc-300 text-zinc-800 font-semibold text-[13.5px] px-7 py-3.5 rounded-xl transition-colors">
                    Pelajari lebih lanjut
                  </a>
                </div>
              </AnimateIn>
              <AnimateIn animation="anim-fade-in" delay="anim-delay-500">
                <div className="mt-10 flex items-center gap-5 text-zinc-500">
                  <div className="flex -space-x-2">
                    {['#0092B3', '#4FC3DC', '#00768F', '#F59E0B'].map((c, i) => (
                      <div key={i} className="w-7 h-7 rounded-full border-2 border-white" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <p className="font-body text-[12.5px]">Dipercaya <span className="font-heading font-semibold text-zinc-900">12.000+ UMKM</span> di seluruh Indonesia</p>
                </div>
              </AnimateIn>
            </div>
            {/* Hero preview card */}
            <AnimateIn animation="anim-slide-right" delay="anim-delay-300" className="relative hidden lg:block">
              <div className="absolute -inset-6 bg-gradient-to-br from-[#0092B3]/10 via-transparent to-[#4FC3DC]/10 rounded-[32px] blur-2xl" />
              <div className="relative bg-white border border-zinc-200 rounded-3xl p-7 shadow-[0_24px_60px_-24px_rgba(0,146,179,0.25)]">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <p className="font-body text-[11px] uppercase tracking-[0.16em] text-zinc-400 font-medium">Skor kredit kamu</p>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="font-heading font-bold text-[56px] text-zinc-900 leading-none tracking-tight">748</span>
                      <span className="font-body text-[13px] text-zinc-400">/ 1000</span>
                    </div>
                    <p className="font-heading font-semibold text-[13px] text-[#0092B3] mt-2">Cukup baik · Tier 3</p>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-heading font-semibold text-[11px]">
                    <TrendingUp className="w-3 h-3" /> +68
                  </span>
                </div>
                <HeroSparkline />
                <div className="mt-5 pt-5 border-t border-zinc-100 grid grid-cols-3 gap-3">
                  {[{ l: 'Capacity', v: 80 }, { l: 'Character', v: 75 }, { l: 'Condition', v: 68 }].map((b, i) => (
                    <div key={i}>
                      <p className="font-body text-[10.5px] text-zinc-400 mb-1.5">{b.l}</p>
                      <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#0092B3] rounded-full" style={{ width: `${b.v}%` }} />
                      </div>
                      <p className="font-heading font-semibold text-zinc-700 text-[11px] mt-1.5">{b.v}/100</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-start gap-2.5 p-3 rounded-xl bg-[#F0FAFC] border border-[#0092B3]/10">
                  <Lightbulb className="w-4 h-4 text-[#0092B3] shrink-0 mt-0.5" />
                  <p className="font-body text-[11.5px] text-zinc-600 leading-relaxed">
                    Hubungkan e-wallet untuk <span className="font-heading font-semibold text-zinc-900">+18 poin</span> instan
                  </p>
                </div>
              </div>
            </AnimateIn>
          </div>
          {/* Stat strip */}
          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-zinc-200/60">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className={i === 0 ? 'lg:pr-8' : 'lg:px-8'}>
                  <div className="flex items-center gap-2 text-[#0092B3]">
                    <Icon className="w-4 h-4" />
                    <p className="font-body text-[11px] uppercase tracking-wider font-medium">{s.label}</p>
                  </div>
                  <p className="font-heading font-bold text-[30px] text-zinc-900 leading-none tracking-tight mt-3">{s.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="fitur" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
        <AnimateIn>
          <div className="max-w-2xl">
            <p className="font-body text-[11px] uppercase tracking-[0.18em] text-[#0092B3] font-medium">Kenapa Modalin</p>
            <h2 className="font-heading font-bold text-[22px] sm:text-[28px] lg:text-[36px] text-zinc-900 tracking-tight mt-3 leading-tight">Penilaian yang adil, transparan, dan bisa kamu kendalikan.</h2>
          </div>
        </AnimateIn>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <AnimateIn key={i} animation="anim-scale-in" delay={`anim-delay-${(i + 1) * 100}`}>
                <div className="group relative bg-white border border-zinc-200 hover:border-[#0092B3]/40 hover:shadow-[0_16px_40px_-20px_rgba(0,146,179,0.3)] rounded-2xl p-7 transition-all h-full">
                  <div className="w-11 h-11 rounded-xl bg-[#E6F7FA] border border-[#0092B3]/15 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-[#0092B3]" />
                  </div>
                  <h3 className="font-heading font-bold text-[16px] text-zinc-900 tracking-tight mb-2">{f.title}</h3>
                  <p className="font-body text-[13.5px] leading-relaxed text-zinc-600">{f.desc}</p>
                  <div className="mt-5 inline-flex items-center gap-1 font-heading font-semibold text-[12px] text-[#0092B3] opacity-0 group-hover:opacity-100 transition-opacity">
                    Selengkapnya <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative border-y border-zinc-100 bg-gradient-to-br from-[#F0FAFC]/60 via-white to-white">
        <div className="absolute right-0 top-0 w-[420px] h-[420px] rounded-full bg-[#0092B3]/[0.05] blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
          <AnimateIn>
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14">
              <div className="max-w-xl">
                <p className="font-body text-[11px] uppercase tracking-[0.18em] text-[#0092B3] font-medium">Cara kerja</p>
                <h2 className="font-heading font-bold text-[22px] sm:text-[28px] lg:text-[36px] text-zinc-900 tracking-tight mt-3 leading-tight">Tiga langkah, satu skor yang bisa kamu pertanggungjawabkan.</h2>
              </div>
              <Link to="/register" className="inline-flex items-center gap-1.5 font-heading font-semibold text-[13px] text-[#0092B3] hover:text-[#00768F]">
                Mulai onboarding <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimateIn>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <AnimateIn key={s.n} animation="anim-fade-up" delay={`anim-delay-${(i + 1) * 100}`}>
                <li className="relative bg-white border border-zinc-200 rounded-2xl p-7 h-full">
                  <span className="font-heading font-bold text-[44px] text-[#0092B3]/15 leading-none tracking-tight">{s.n}</span>
                  <h3 className="font-heading font-bold text-[16px] text-zinc-900 tracking-tight mt-3 mb-2">{s.title}</h3>
                  <p className="font-body text-[13px] leading-relaxed text-zinc-600">{s.desc}</p>
                </li>
              </AnimateIn>
            ))}
          </ol>
        </div>
      </section>

      {/* FRAMEWORK 5C */}
      <section id="framework" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-start">
          <AnimateIn className="lg:sticky lg:top-24">
            <p className="font-body text-[11px] uppercase tracking-[0.18em] text-[#0092B3] font-medium">Framework</p>
            <h2 className="font-heading font-bold text-[22px] sm:text-[28px] lg:text-[36px] text-zinc-900 tracking-tight mt-3 leading-tight">Penilaian 5C Modalin.</h2>
            <p className="font-body text-[13.5px] text-zinc-600 mt-4 leading-relaxed">Lima dimensi standar industri keuangan, diadaptasi untuk UMKM digital. Setiap dimensi punya bobot eksplisit sehingga kamu tahu persis di mana harus berinvestasi.</p>
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F0FAFC] border border-[#0092B3]/10 text-[#0092B3]">
              <ShieldCheck className="w-4 h-4" />
              <span className="font-heading font-semibold text-[12px]">100% bobot, tidak ada angka tersembunyi</span>
            </div>
          </AnimateIn>
          <div className="space-y-3">
            {framework.map((f, i) => (
              <AnimateIn key={i} animation="anim-fade-up" delay={`anim-delay-${(i + 1) * 100}`}>
                <div className="flex items-center gap-5 bg-white border border-zinc-200 rounded-2xl p-5 hover:border-[#0092B3]/30 transition-colors">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${f.color}14`, border: `1px solid ${f.color}30` }}>
                  <span className="font-heading font-bold text-[16px]" style={{ color: f.color }}>{f.pct}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading font-bold text-zinc-900 text-[15px] tracking-tight">{f.label}</h4>
                  <p className="font-body text-[12.5px] text-zinc-500 mt-1">{f.note}</p>
                </div>
                <div className="hidden sm:block w-32">
                  <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: f.pct, backgroundColor: f.color }} />
                  </div>
                </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="cerita" className="relative border-t border-zinc-100 bg-gradient-to-br from-white via-[#F0FAFC]/40 to-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
          <AnimateIn>
            <div className="max-w-2xl mb-14">
              <p className="font-body text-[11px] uppercase tracking-[0.18em] text-[#0092B3] font-medium">Cerita UMKM</p>
              <h2 className="font-heading font-bold text-[22px] sm:text-[28px] lg:text-[36px] text-zinc-900 tracking-tight mt-3 leading-tight">Mereka yang skornya naik bersama Modalin.</h2>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <AnimateIn key={i} animation="anim-scale-in" delay={`anim-delay-${(i + 1) * 200}`}>
                <div className="bg-white border border-zinc-200 rounded-2xl p-8 h-full">
                  <Quote className="w-6 h-6 text-[#0092B3]/30" />
                <p className="font-body text-[15px] text-zinc-800 leading-relaxed mt-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 pt-6 border-t border-zinc-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0092B3] to-[#4FC3DC] flex items-center justify-center font-heading font-bold text-white text-[14px]">{t.name.charAt(0)}</div>
                  <div>
                    <p className="font-heading font-semibold text-zinc-900 text-[13px]">{t.name}</p>
                    <p className="font-body text-[11.5px] text-zinc-500">{t.role}</p>
                  </div>
                </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
        <AnimateIn animation="anim-scale-in">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0092B3] to-[#00768F] p-8 sm:p-12 lg:p-16 text-white">
            <div className="absolute -right-20 -top-20 w-[360px] h-[360px] rounded-full bg-[#4FC3DC]/25 blur-3xl pointer-events-none" />
            <div className="absolute -left-10 bottom-0 w-[260px] h-[260px] rounded-full bg-[#005A6E]/40 blur-3xl pointer-events-none" />
          <div className="relative grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 items-center">
            <div>
              <p className="font-body text-[11px] uppercase tracking-[0.18em] text-white/70 font-medium">Mulai gratis</p>
              <h3 className="font-heading font-bold text-[22px] sm:text-[28px] lg:text-[36px] tracking-tight leading-[1.1] mt-3">Skor pertamamu hanya 2 menit lagi.</h3>
              <p className="font-body text-[14px] text-white/80 mt-4 max-w-lg leading-relaxed">Tanpa kartu kredit, tanpa rekening bank. Cukup hubungkan satu marketplace atau e-wallet untuk memulai.</p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link to="/register" className="inline-flex items-center gap-2 bg-white text-[#0092B3] hover:bg-white/95 font-semibold text-[13.5px] px-7 py-3.5 rounded-xl transition-colors">
                  Daftar gratis <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link to="/login" className="inline-flex items-center gap-2 bg-transparent border border-white/30 hover:bg-white/10 text-white font-semibold text-[13.5px] px-7 py-3.5 rounded-xl transition-colors">
                  Sudah punya akun
                </Link>
              </div>
            </div>
            <ul className="space-y-3">
              {['Gratis selamanya untuk skor dasar', 'Rekomendasi konkret tiap minggu', 'Data terenkripsi, kamu pegang kendali'].map((t, i) => (
                <li key={i} className="flex items-start gap-3 bg-white/10 border border-white/15 rounded-xl px-4 py-3 backdrop-blur-sm">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <span className="font-body text-[13px] text-white/95">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          </div>
        </AnimateIn>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-heading font-bold text-[18px] tracking-tight">
              <span className="text-[#0092B3]">Modal</span><span className="text-zinc-900">in</span>
            </span>
            <span className="font-body text-[11.5px] text-zinc-400">© 2026 · Skor kredit untuk UMKM Indonesia</span>
          </div>
          <div className="flex items-center gap-6 text-zinc-500 font-body text-[12px]">
            <a href="#" className="hover:text-zinc-900">Privasi</a>
            <a href="#" className="hover:text-zinc-900">Syarat</a>
            <a href="#" className="hover:text-zinc-900">Kontak</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
