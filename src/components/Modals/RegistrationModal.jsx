import React, { useState } from 'react';

const RegistrationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nama: '',
    nip: '',
    npa: '',
    unit_kerja: '',
    role: 'Anggota',
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    // NOTE: Replace this URL with your actual Google Apps Script Web App URL
    const SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE"; 

    try {
      // If no URL is set, we just simulate a success for now.
      if (SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
        setTimeout(() => {
          setStatus('success');
          setTimeout(() => {
             onClose();
             setStatus('idle');
             setFormData({nama: '', nip: '', npa: '', unit_kerja: '', role: 'Anggota'});
          }, 2000);
        }, 1000);
        return;
      }

      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        // Google Apps Script requires body to be stringified JSON
        body: JSON.stringify({
          action: 'pendaftaran',
          ...formData
        }),
      });

      const result = await response.json();
      
      if (result.status === 'success') {
        setStatus('success');
        setTimeout(() => {
            onClose();
            setStatus('idle');
            setFormData({nama: '', nip: '', npa: '', unit_kerja: '', role: 'Anggota'});
        }, 2000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-zinc-200">
          <h3 className="font-headline-md text-on-surface">Pendaftaran Anggota Baru</h3>
          <button onClick={onClose} className="text-secondary hover:text-primary transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="p-6">
          {status === 'success' ? (
             <div className="text-center py-8">
               <span className="material-symbols-outlined text-6xl text-green-500 mb-4">check_circle</span>
               <h4 className="font-headline-md mb-2">Pendaftaran Berhasil!</h4>
               <p className="text-secondary font-body-md">Terima kasih telah mendaftar. Data Anda telah kami terima.</p>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                <label className="block text-label-md text-on-surface mb-1">Nama (dengan Gelar)</label>
                <input 
                    type="text" 
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="Masukkan nama lengkap beserta gelar"
                />
                </div>
                <div>
                <label className="block text-label-md text-on-surface mb-1">NIP</label>
                <input 
                    type="text" 
                    name="nip"
                    value={formData.nip}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="Masukkan NIP"
                />
                </div>
                <div>
                <label className="block text-label-md text-on-surface mb-1">NPA (Nomor Anggota)</label>
                <input 
                    type="text" 
                    name="npa"
                    value={formData.npa}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="Masukkan Nomor Anggota (opsional)"
                />
                </div>
                <div>
                <label className="block text-label-md text-on-surface mb-1">Unit Kerja</label>
                <input 
                    type="text" 
                    name="unit_kerja"
                    value={formData.unit_kerja}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="Contoh: SD NEGERI NEGLASARI"
                />
                </div>
                <div>
                <label className="block text-label-md text-on-surface mb-1">Role / Peran</label>
                <select 
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white"
                >
                    <option value="Anggota">Anggota</option>
                    <option value="Pengurus">Pengurus</option>
                </select>
                </div>

                {status === 'error' && (
                    <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg">
                        Terjadi kesalahan saat mengirim data. Silakan coba lagi.
                    </div>
                )}

                <div className="pt-4 mt-6 border-t border-zinc-200 flex justify-end gap-3">
                <button 
                    type="button" 
                    onClick={onClose}
                    className="px-6 py-2 border border-zinc-300 rounded-lg font-label-md text-secondary hover:bg-zinc-50 transition-colors"
                >
                    Batal
                </button>
                <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="px-6 py-2 bg-primary text-white rounded-lg font-label-md hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {status === 'loading' ? (
                        <>
                           <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                           Mengirim...
                        </>
                    ) : 'Kirim Pendaftaran'}
                </button>
                </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
