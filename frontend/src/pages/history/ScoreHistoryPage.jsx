import { History } from 'lucide-react';

const ScoreHistoryPage = () => {
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Riwayat Skor</h1>
        <p className="text-sm text-text-secondary mt-1">Lihat perkembangan skor kredit Anda dari waktu ke waktu.</p>
      </div>
      <div className="bg-surface rounded-xl border border-border p-8 text-center">
        <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <History size={28} className="text-secondary" />
        </div>
        <h2 className="text-lg font-semibold text-text-primary mb-2">Belum Ada Riwayat</h2>
        <p className="text-sm text-text-muted max-w-md mx-auto">
          Riwayat skor akan muncul di sini setelah Anda melakukan analisis kredit.
        </p>
      </div>
    </div>
  );
};

export default ScoreHistoryPage;
