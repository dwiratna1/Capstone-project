import { useState } from 'react';
import { TrendingUp, Award, Calendar, Upload, CheckCircle2, XCircle, FileSpreadsheet, ArrowUpRight, Sparkles } from 'lucide-react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from 'recharts';

const chartData6 = [
  { month: 'Nov', score: 680 }, { month: 'Des', score: 695 }, { month: 'Jan', score: 712 },
  { month: 'Feb', score: 724 }, { month: 'Mar', score: 737 }, { month: 'Apr', score: 748 },
];
const chartData1 = [
  { month: '1 Apr', score: 737 }, { month: '8 Apr', score: 740 }, { month: '15 Apr', score: 743 },
  { month: '22 Apr', score: 746 }, { month: '29 Apr', score: 748 },
];

const logEntries = [
  { periode: 'Apr 2026', skor: 748, delta: 11, faktor: 'Frekuensi transaksi naik, tagihan konsisten', status: 'Lengkap' },
  { periode: 'Mar 2026', skor: 737, delta: 13, faktor: 'Omzet naik 12%, rating toko meningkat', status: 'Lengkap' },
  { periode: 'Feb 2026', skor: 724, delta: 12, faktor: 'Profil dilengkapi, lama usaha bertambah', status: 'Lengkap' },
  { periode: 'Jan 2026', skor: 712, delta: 17, faktor: 'Bergabung Tokopedia, transaksi digital naik', status: 'Sebagian' },
  { periode: 'Des 2025', skor: 695, delta: 15, faktor: 'Skor pertama setelah onboarding', status: 'Sebagian' },
  { periode: 'Nov 2025', skor: 680, delta: null, faktor: 'Skor awal registrasi', status: 'Sebagian' },
];

const importEntries = [
  { nama: 'Keuangan_jan.xls', tanggal: '01 Feb 2026', periode: 'Jan-Feb 2026', dampak: '+11', status: 'Berhasil', size: '2.4 MB' },
  { nama: 'Omzet_des.xlsx', tanggal: '01 Jan 2026', periode: 'Des 2025', dampak: '+13', status: 'Berhasil', size: '1.8 MB' },
  { nama: 'data_nov.csv', tanggal: '01 Des 2025', periode: 'Nov 2025', dampak: '—', status: 'Gagal', size: '0.9 MB' },
];

function HeroSparkline() {
  return (
    <svg viewBox="0 0 200 60" className="w-full h-14" preserveAspectRatio="none">
      <defs>
        <linearGradient id="heroSpark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0092B3" stopOpacity={0.35} />
          <stop offset="100%" stopColor="#0092B3" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d="M0,45 L40,38 L80,30 L120,22 L160,14 L200,8 L200,60 L0,60 Z" fill="url(#heroSpark)" />
      <path d="M0,45 L40,38 L80,30 L120,22 L160,14 L200,8" stroke="#0092B3" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

const ScoreHistoryPage = () => {
  const [view, setView] = useState('grafik');
  const [range, setRange] = useState('6');
  const data = range === '6' ? chartData6 : chartData1;

  return (
    <>
      {/* HERO */}
      <section className="relative px-6 sm:px-10 lg:px-14 pt-10 pb-12 bg-gradient-to-br from-[#F0FAFC] via-white to-white border-b border-zinc-100 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-[420px] h-[420px] rounded-full bg-[#0092B3]/5 blur-3xl pointer-events-none" />
        <div className="relative">
          <p className="font-body text-[11px] uppercase tracking-[0.18em] text-[#0092B3] font-medium">Riwayat skor</p>
          <h1 className="font-heading font-bold text-[28px] sm:text-[34px] text-zinc-900 tracking-tight mt-2 leading-tight max-w-2xl">
            Skormu naik <span className="text-[#0092B3]">+68 poin</span> dalam 6 bulan terakhir.
          </h1>
          <p className="font-body text-[13.5px] text-zinc-500 mt-3 max-w-xl leading-relaxed">Pantau perkembangan skor kredit, telusuri faktor pendorong, dan tambahkan data keuangan historismu.</p>
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1fr] gap-6 lg:gap-0 lg:divide-x lg:divide-zinc-200/60">
            <div className="lg:pr-8 col-span-2 lg:col-span-1">
              <div className="flex items-baseline gap-2">
                <span className="font-heading font-bold text-[48px] sm:text-[56px] text-zinc-900 leading-none tracking-tight">748</span>
                <span className="font-body text-[13px] text-zinc-400">/ 1000</span>
              </div>
              <p className="font-body text-[12px] text-zinc-500 mt-2">Skor saat ini · diperbarui 12 Apr 2026</p>
              <div className="mt-4"><HeroSparkline /></div>
            </div>
            <div className="lg:px-8">
              <div className="flex items-center gap-2 text-emerald-600"><TrendingUp className="w-4 h-4" /><p className="font-body text-[11px] uppercase tracking-wider font-medium">Kenaikan 6 bulan</p></div>
              <p className="font-heading font-bold text-[30px] text-emerald-600 leading-none mt-3">+68</p>
              <p className="font-body text-[12px] text-zinc-500 mt-2">Nov 2025 — Apr 2026</p>
            </div>
            <div className="lg:px-8">
              <div className="flex items-center gap-2 text-zinc-700"><Calendar className="w-4 h-4" /><p className="font-body text-[11px] uppercase tracking-wider font-medium">Rata-rata</p></div>
              <p className="font-heading font-bold text-[30px] text-zinc-900 leading-none mt-3">+11<span className="font-body text-[14px] text-zinc-400 font-normal"> /bln</span></p>
              <p className="font-body text-[12px] text-zinc-500 mt-2">Konsisten 6 bulan beruntun</p>
            </div>
            <div className="lg:px-8">
              <div className="flex items-center gap-2 text-[#0092B3]"><Award className="w-4 h-4" /><p className="font-body text-[11px] uppercase tracking-wider font-medium">Peringkat segmen</p></div>
              <p className="font-heading font-bold text-[30px] text-zinc-900 leading-none mt-3">42<span className="font-body text-[14px] text-zinc-400 font-normal">%</span></p>
              <p className="font-body text-[12px] text-zinc-500 mt-2">Top 42% di segmen Kuliner</p>
            </div>
          </div>
        </div>
      </section>

      {/* TAB NAV */}
      <nav className="px-6 sm:px-10 lg:px-14 border-b border-zinc-100 sticky top-0 bg-white/90 backdrop-blur z-10">
        <div className="flex items-center gap-8">
          {[{ k: 'grafik', l: 'Grafik skor' }, { k: 'impor', l: 'Impor riwayat keuangan' }].map((t) => (
            <button key={t.k} onClick={() => setView(t.k)} className={`relative py-4 text-[13px] font-medium transition-colors ${view === t.k ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-700'}`}>
              {t.l}
              {view === t.k && <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-[#0092B3] rounded-full" />}
            </button>
          ))}
        </div>
      </nav>

      {/* CONTENT */}
      <div className="px-6 sm:px-10 lg:px-14 py-12">
        {view === 'grafik' ? (
          <div className="grid grid-cols-1 xl:grid-cols-[1.7fr_1fr] gap-12">
            <div className="space-y-12">
              {/* Chart */}
              <section>
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-6 gap-4">
                  <div>
                    <h2 className="font-heading font-bold text-[20px] text-zinc-900 tracking-tight">Tren skor</h2>
                    <p className="font-body text-[12.5px] text-zinc-500 mt-1">{range === '6' ? '6 bulan terakhir · Nov 2025 — Apr 2026' : '30 hari terakhir · April 2026'}</p>
                  </div>
                  <div className="inline-flex items-center bg-zinc-100/70 rounded-lg p-0.5">
                    {['6', '1'].map((r) => (
                      <button key={r} onClick={() => setRange(r)} className={`px-3 py-1.5 rounded-md text-[11px] font-medium transition-all ${range === r ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}>
                        {r === '6' ? '6 bulan' : '1 bulan'}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ width: '100%', height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0092B3" stopOpacity={0.25} />
                          <stop offset="100%" stopColor="#0092B3" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="#F4F4F5" vertical={false} />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#A1A1AA' }} axisLine={false} tickLine={false} />
                      <YAxis domain={[600, 800]} tick={{ fontSize: 11, fill: '#A1A1AA' }} axisLine={false} tickLine={false} ticks={[600, 650, 700, 750, 800]} />
                      <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E4E4E7', fontSize: 12 }} />
                      <Area type="monotone" dataKey="score" stroke="#0092B3" strokeWidth={2.5} fill="url(#scoreFill)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </section>
              {/* Timeline */}
              <section>
                <h2 className="font-heading font-bold text-[20px] text-zinc-900 tracking-tight mb-1">Linimasa perubahan</h2>
                <p className="font-body text-[12.5px] text-zinc-500 mb-7">Setiap titik adalah perubahan skor bulanan beserta faktor pendorongnya</p>
                <ol className="relative pl-6 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-zinc-200">
                  {logEntries.map((entry, i) => (
                    <li key={i} className="relative pb-7 last:pb-0">
                      <span className={`absolute -left-[22px] top-1.5 w-[14px] h-[14px] rounded-full border-2 border-white ring-1 ${entry.delta && entry.delta > 0 ? 'bg-[#0092B3] ring-[#0092B3]/40' : 'bg-zinc-300 ring-zinc-200'}`} />
                      <div className="flex items-baseline justify-between gap-4 flex-wrap">
                        <div className="flex items-baseline gap-3">
                          <p className="font-heading font-semibold text-[14px] text-zinc-900">{entry.periode}</p>
                          <span className="font-heading font-bold text-[13px] text-zinc-900">{entry.skor}</span>
                          {entry.delta !== null ? (
                            <span className="font-heading font-semibold text-[12px] text-emerald-600">+{entry.delta} poin</span>
                          ) : (
                            <span className="font-body text-[11px] text-zinc-400 italic">skor awal</span>
                          )}
                        </div>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${entry.status === 'Lengkap' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{entry.status}</span>
                      </div>
                      <p className="font-body text-[12.5px] text-zinc-500 mt-1.5 leading-relaxed">{entry.faktor}</p>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
            {/* Right rail */}
            <aside className="space-y-6 xl:sticky xl:top-20 xl:self-start">
              <div className="bg-gradient-to-br from-[#E6F7FA] to-[#F0FAFC] border border-[#0092B3]/15 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-[#00768F]"><Sparkles className="w-4 h-4" /><p className="font-body text-[11px] uppercase tracking-wider font-medium">Insight bulan ini</p></div>
                <p className="font-heading font-semibold text-[14px] text-zinc-900 mt-3 leading-snug">Frekuensi transaksi digital dan ketepatan tagihan adalah dua pendorong utama kenaikan skor di bulan April.</p>
                <p className="font-body text-[12px] text-zinc-600 mt-2 leading-relaxed">Pertahankan ritme ini agar skor terus naik konsisten +10 poin per bulan.</p>
              </div>
              <div className="border border-zinc-100 rounded-2xl p-5">
                <p className="font-body text-[11px] uppercase tracking-wider font-medium text-zinc-400">Skor tertinggi</p>
                <p className="font-heading font-bold text-[26px] text-zinc-900 leading-none mt-2">748</p>
                <p className="font-body text-[12px] text-zinc-500 mt-1.5">April 2026 · skor saat ini</p>
              </div>
              <div className="border border-zinc-100 rounded-2xl p-5">
                <p className="font-body text-[11px] uppercase tracking-wider font-medium text-zinc-400">Skor awal</p>
                <p className="font-heading font-bold text-[26px] text-zinc-900 leading-none mt-2">680</p>
                <p className="font-body text-[12px] text-zinc-500 mt-1.5">November 2025 · saat registrasi</p>
              </div>
            </aside>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-12">
            {/* Upload */}
            <section>
              <div className="flex items-center gap-2 text-[#0092B3]"><Sparkles className="w-4 h-4" /><p className="font-body text-[11px] uppercase tracking-[0.18em] font-medium">Unggah data</p></div>
              <h2 className="font-heading font-bold text-[24px] text-zinc-900 tracking-tight mt-2 leading-tight">Bantu AI Modalin mengenalmu lebih dalam.</h2>
              <p className="font-body text-[13px] text-zinc-500 mt-2 max-w-md leading-relaxed">Data historis yang lebih lengkap menghasilkan skor lebih akurat dan rekomendasi yang lebih personal.</p>
              <div className="mt-8 relative border-2 border-dashed border-zinc-200 rounded-2xl py-16 sm:py-20 px-6 flex flex-col items-center justify-center text-center bg-gradient-to-br from-zinc-50/60 to-white hover:border-[#0092B3]/40 hover:bg-[#F0FAFC]/40 transition-all cursor-pointer group">
                <div className="w-14 h-14 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center mb-5 shadow-sm group-hover:border-[#0092B3]/40 group-hover:shadow-md transition-all">
                  <Upload className="w-6 h-6 text-[#0092B3]" />
                </div>
                <p className="font-heading font-semibold text-[15px] text-zinc-900">Seret file kesini atau <span className="text-[#0092B3] underline underline-offset-4">pilih dari komputer</span></p>
                <p className="font-body text-[12px] text-zinc-400 mt-2">Format .xlsx · .xls · .csv  ·  Maks 10 MB per file</p>
                <div className="flex items-center gap-4 mt-7 text-[11px] text-zinc-400">
                  <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Enkripsi end-to-end</span>
                  <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#0092B3]" />Otomatis diproses</span>
                </div>
              </div>
              <p className="font-body text-[11.5px] text-zinc-400 mt-4 leading-relaxed max-w-md">File kamu hanya digunakan untuk perhitungan skor kredit Modalin dan tidak akan dibagikan ke pihak ketiga.</p>
            </section>
            {/* Import history */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-heading font-bold text-[18px] text-zinc-900 tracking-tight">Riwayat impor</h2>
                <button className="text-[12px] text-[#0092B3] font-medium flex items-center gap-1 hover:underline">Lihat semua <ArrowUpRight className="w-3.5 h-3.5" /></button>
              </div>
              <div className="space-y-3">
                {importEntries.map((entry, i) => {
                  const ok = entry.status === 'Berhasil';
                  return (
                    <div key={i} className="bg-white border border-zinc-100 rounded-2xl p-4 hover:border-zinc-200 hover:shadow-sm transition-all">
                      <div className="flex items-start gap-4">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${ok ? 'bg-emerald-50' : 'bg-rose-50'}`}>
                          <FileSpreadsheet className={`w-5 h-5 ${ok ? 'text-emerald-600' : 'text-rose-500'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-heading font-semibold text-[13px] text-zinc-900 truncate">{entry.nama}</p>
                            {ok ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700"><CheckCircle2 className="w-3 h-3" />Berhasil</span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-rose-600"><XCircle className="w-3 h-3" />Gagal</span>
                            )}
                          </div>
                          <p className="font-body text-[11.5px] text-zinc-400 mt-1">{entry.tanggal}  ·  {entry.periode}  ·  {entry.size}</p>
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-50">
                            <span className="font-body text-[11px] text-zinc-500">Dampak skor</span>
                            <span className={`font-heading font-semibold text-[13px] ${ok ? 'text-emerald-600' : 'text-zinc-400'}`}>{entry.dampak}{ok && ' poin'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}
      </div>
    </>
  );
};

export default ScoreHistoryPage;
