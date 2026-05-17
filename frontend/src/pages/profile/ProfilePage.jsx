import { UserCircle, Mail, Building2 } from 'lucide-react';

const ProfilePage = () => {
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Profil</h1>
        <p className="text-sm text-text-secondary mt-1">Kelola informasi akun dan bisnis Anda.</p>
      </div>

      <div className="bg-surface rounded-xl border border-border p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <UserCircle size={36} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Nama Pengguna</h2>
            <p className="text-sm text-text-muted">user@example.com</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-background rounded-lg">
            <Mail size={18} className="text-text-muted" />
            <div>
              <p className="text-xs text-text-muted">Email</p>
              <p className="text-sm font-medium text-text-primary">user@example.com</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-background rounded-lg">
            <Building2 size={18} className="text-text-muted" />
            <div>
              <p className="text-xs text-text-muted">Bisnis</p>
              <p className="text-sm font-medium text-text-primary">Belum diisi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
