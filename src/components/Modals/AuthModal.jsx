import { useState } from 'react';

export default function AuthModal({ isOpen, onClose, onSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const msgUint8 = new TextEncoder().encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      // Pre-computed SHA-256 hash for 'admin123'
      const expectedHash = '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9';

      if (hashHex === expectedHash) {
        onSuccess();
        setPassword('');
      } else {
        setError('Password salah.');
      }
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan pada sistem.');
    } finally {
      setLoading(false);
    }
  };

  const closeAndReset = () => {
    setPassword('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-zinc-200 bg-red-50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-red-700">lock</span>
            <h3 className="font-headline-md text-red-700">Autentikasi</h3>
          </div>
          <button onClick={closeAndReset} className="text-secondary hover:text-primary transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-secondary mb-4">Silakan masukkan kata sandi untuk mengakses Panel Pengurus.</p>

            <div>
              <label className="block text-label-md text-on-surface mb-1">Kata Sandi</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                placeholder="Masukkan kata sandi"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg">
                {error}
              </div>
            )}

            <div className="pt-4 mt-6 border-t border-zinc-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeAndReset}
                className="px-4 py-2 text-zinc-600 font-label-md hover:bg-zinc-100 rounded-lg transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading || !password}
                className="px-6 py-2 bg-red-700 text-white rounded-lg font-label-md hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? 'Memeriksa...' : 'Masuk'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
