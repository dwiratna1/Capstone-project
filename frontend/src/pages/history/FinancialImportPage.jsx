import { Upload } from 'lucide-react';

const FinancialImportPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Financial import submitted');
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Import Data Keuangan</h1>
        <p className="text-sm text-text-secondary mt-1">Upload file data keuangan untuk analisis otomatis.</p>
      </div>
      <div className="bg-surface rounded-xl border border-border p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-2 border-dashed border-border rounded-xl p-10 text-center hover:border-primary/40 transition-colors cursor-pointer">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload size={28} className="text-primary" />
            </div>
            <p className="text-sm font-medium text-text-primary mb-1">
              Klik atau drag file ke sini
            </p>
            <p className="text-xs text-text-muted">Format: CSV, XLSX (maks. 5MB)</p>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2.5 rounded-lg transition-all shadow-md shadow-primary/25"
            >
              <Upload size={18} />
              Upload & Proses
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FinancialImportPage;
