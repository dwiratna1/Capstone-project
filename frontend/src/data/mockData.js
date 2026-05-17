/**
 * Mock data for dashboard, scoring, recommendations, and score history.
 * Used as placeholder data until backend API is connected.
 */

export const mockDashboardSummary = {
  creditScore: 72,
  totalAnalyses: 3,
  scoreTrend: '+5',
  financialRecords: 12,
};

export const mockFiveCScores = {
  character: { score: 80, label: 'Baik', color: '#10B981' },
  capacity: { score: 65, label: 'Cukup', color: '#F59E0B' },
  capital: { score: 70, label: 'Baik', color: '#10B981' },
  collateral: { score: 55, label: 'Kurang', color: '#EF4444' },
  condition: { score: 78, label: 'Baik', color: '#10B981' },
};

export const mockRecommendations = [
  {
    id: 1,
    title: 'Tingkatkan Aset Jaminan',
    description: 'Pertimbangkan untuk menambah aset jaminan agar skor Collateral meningkat.',
    priority: 'high',
  },
  {
    id: 2,
    title: 'Jaga Konsistensi Pendapatan',
    description: 'Pertahankan tren pendapatan positif dalam 3 bulan terakhir.',
    priority: 'medium',
  },
  {
    id: 3,
    title: 'Lengkapi Dokumen Bisnis',
    description: 'Siapkan SIUP, TDP, dan laporan keuangan terbaru.',
    priority: 'low',
  },
];

export const mockScoreHistory = [
  { id: 1, date: '2025-05-01', score: 65, status: 'Cukup' },
  { id: 2, date: '2025-04-01', score: 60, status: 'Kurang' },
  { id: 3, date: '2025-03-01', score: 58, status: 'Kurang' },
];
