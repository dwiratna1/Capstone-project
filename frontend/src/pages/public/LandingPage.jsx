import { Clock, BarChart2, Bell } from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';

const LandingPage = () => {
  return (
    <div className="font-body text-zinc-900 w-full overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Hero Section */}
        <ScrollReveal delay={100}>
          <section className="bg-[#128AB2] rounded-[24px] md:rounded-[32px] p-6 sm:p-10 md:p-16 lg:p-20 mt-4 shadow-sm relative overflow-hidden">
            <div className="max-w-3xl relative z-10">
              <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-white leading-[1.2] md:leading-[1.1] mb-4 md:mb-6 tracking-tight">
                Kredit layak untuk UMKM tanpa riwayat bank
              </h1>
              <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-8 md:mb-10 max-w-2xl font-medium">
                ModalIN menilai kelayakan usahamu dari data digital yang sudah kamu punya — omzet, tagihan, transaksi. Transparan, adil, dan bisa ditingkatkan.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <a
                  href="/register"
                  className="w-full sm:w-auto bg-white text-[#128AB2] font-semibold px-6 sm:px-8 py-3.5 rounded-xl transition-all hover:bg-zinc-50 text-center text-sm md:text-base"
                >
                  Mulai sekarang
                </a>
                <a
                  href="#features"
                  className="w-full sm:w-auto bg-transparent border border-white/40 hover:bg-white/10 text-white font-semibold px-6 sm:px-8 py-3.5 rounded-xl transition-all text-center text-sm md:text-base"
                >
                  Pelajari lebih lanjut
                </a>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            
            {/* Feature 1 */}
            <ScrollReveal delay={200}>
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-5 md:mb-6">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-heading font-bold text-lg md:text-xl text-zinc-900 mb-2 md:mb-3">
                  Skor dalam menit
                </h3>
                <p className="text-sm md:text-[15px] text-zinc-600 leading-relaxed font-medium">
                  AI kami memproses data digitalmu dan menghasilkan skor kredit dalam hitungan detik.
                </p>
              </div>
            </ScrollReveal>

            {/* Feature 2 */}
            <ScrollReveal delay={400}>
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-5 md:mb-6">
                  <BarChart2 className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-heading font-bold text-lg md:text-xl text-zinc-900 mb-2 md:mb-3">
                  Skor yang bisa ditingkatkan
                </h3>
                <p className="text-sm md:text-[15px] text-zinc-600 leading-relaxed font-medium">
                  Lihat faktor apa yang mempengaruhi skor dan langkah konkret untuk memperbaikinya.
                </p>
              </div>
            </ScrollReveal>

            {/* Feature 3 */}
            <ScrollReveal delay={600}>
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-5 md:mb-6">
                  <Bell className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="font-heading font-bold text-lg md:text-xl text-zinc-900 mb-2 md:mb-3">
                  Peringatan dini
                </h3>
                <p className="text-sm md:text-[15px] text-zinc-600 leading-relaxed font-medium">
                  Deteksi anomali arus kas sebelum kerugian terlanjur besar dengan monitoring real-time.
                </p>
              </div>
            </ScrollReveal>

          </div>
        </section>

        {/* 5C Framework Section */}
        <section className="pb-16 md:pb-24">
          <ScrollReveal delay={100}>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#1E1E1E] mb-6 sm:mb-8 text-left">
              Framework penilaian 5C ModalIN
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* Character */}
            <ScrollReveal delay={200} className="h-full">
              <div className="bg-[#F4EAFF] rounded-2xl p-6 flex flex-col items-center justify-center text-center h-full">
                <h3 className="font-heading font-bold text-[28px] leading-none text-[#6B21A8] mb-1">25%</h3>
                <p className="font-medium text-[15px] text-[#6B21A8] mb-2">Character</p>
                <p className="text-[11px] sm:text-[12px] text-[#9333EA] font-medium px-2">Konsistensi tagihan & lama usaha</p>
              </div>
            </ScrollReveal>

            {/* Capacity */}
            <ScrollReveal delay={300} className="h-full">
              <div className="bg-[#DDFCE6] rounded-2xl p-6 flex flex-col items-center justify-center text-center h-full">
                <h3 className="font-heading font-bold text-[28px] leading-none text-[#166534] mb-1">30%</h3>
                <p className="font-medium text-[15px] text-[#166534] mb-2">Capacity</p>
                <p className="text-[11px] sm:text-[12px] text-[#15803D] font-medium px-2">Omzet & stabilitas arus kas</p>
              </div>
            </ScrollReveal>

            {/* Condition */}
            <ScrollReveal delay={400} className="h-full">
              <div className="bg-[#F5E6D3] rounded-2xl p-6 flex flex-col items-center justify-center text-center h-full">
                <h3 className="font-heading font-bold text-[28px] leading-none text-[#5D4037] mb-1">20%</h3>
                <p className="font-medium text-[15px] text-[#5D4037] mb-2">Condition</p>
                <p className="text-[11px] sm:text-[12px] text-[#8B5A2B] font-medium px-2">Jenis usaha & aktivitas marketplace</p>
              </div>
            </ScrollReveal>

            {/* Capital */}
            <ScrollReveal delay={500} className="h-full">
              <div className="bg-[#FCEFD8] rounded-2xl p-6 flex flex-col items-center justify-center text-center h-full">
                <h3 className="font-heading font-bold text-[28px] leading-none text-[#9A3412] mb-1">15%</h3>
                <p className="font-medium text-[15px] text-[#9A3412] mb-2">Capital</p>
                <p className="text-[11px] sm:text-[12px] text-[#C2410C] font-medium px-2">Estimasi aset & saldo e-wallet</p>
              </div>
            </ScrollReveal>

            {/* Collateral */}
            <ScrollReveal delay={600} className="h-full">
              <div className="bg-[#E2E8FF] rounded-2xl p-6 flex flex-col items-center justify-center text-center h-full">
                <h3 className="font-heading font-bold text-[28px] leading-none text-[#312E81] mb-1">10%</h3>
                <p className="font-medium text-[15px] text-[#312E81] mb-2">Collateral</p>
                <p className="text-[11px] sm:text-[12px] text-[#4338CA] font-medium px-2">Reputasi digital & koperasi</p>
              </div>
            </ScrollReveal>

          </div>
        </section>

        {/* Bottom CTA */}
        <ScrollReveal delay={200}>
          <section className="py-12 md:py-16 text-center max-w-2xl mx-auto">
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-zinc-900 mb-6 md:mb-8 leading-snug">
              Bergabung dengan 12.000+ UMKM<br className="hidden sm:block" />
              yang sudah mendapatkan akses modal dengan ModalIN
            </h2>
            <a
              href="/register"
              className="inline-block w-full sm:w-auto bg-[#0092B3] hover:bg-[#007F9E] text-white font-semibold px-6 sm:px-8 py-3.5 rounded-xl transition-all text-sm md:text-base"
            >
              Daftar gratis sekarang
            </a>
          </section>
        </ScrollReveal>

      </div>
    </div>
  );
};

export default LandingPage;
