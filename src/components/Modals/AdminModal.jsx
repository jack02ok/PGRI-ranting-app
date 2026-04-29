import React, { useState } from 'react';

const AdminModal = ({ isOpen, onClose, onSuccessTagihan, onSuccessSurat }) => {
  const [activeTab, setActiveTab] = useState('tagihan'); // 'tagihan' | 'surat'
  
  // State form tagihan
  const [formData, setFormData] = useState({
    bulan: '',
    nominal: '',
  });

  // State form surat
  const [suratData, setSuratData] = useState({
    jenis: 'Internal',
    nomor: '',
    perihal: '',
    fileName: '',
    fileBase64: ''
  });

  const [status, setStatus] = useState('idle'); // idle, loading, successTagihan, successSurat, error

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (activeTab === 'tagihan') {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setSuratData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSuratData((prev) => ({
          ...prev,
          fileName: file.name,
          fileBase64: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const closeAndReset = () => {
    onClose();
    setTimeout(() => {
      setStatus('idle');
      setActiveTab('tagihan');
      setFormData({bulan: '', nominal: ''});
      setSuratData({jenis: 'Internal', nomor: '', perihal: '', fileName: '', fileBase64: ''});
    }, 500);
  };

  const handleSubmitTagihan = async (e) => {
    e.preventDefault();
    setStatus('loading');
    const SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";

    try {
      if (SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
        setTimeout(() => {
          setStatus('successTagihan');
          if (onSuccessTagihan) onSuccessTagihan(formData.bulan);
          setTimeout(closeAndReset, 3000);
        }, 1500);
        return;
      }

      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'kirim_tagihan', ...formData }),
      });

      const result = await response.json();
      if (result.status === 'success') {
        setStatus('successTagihan');
        if (onSuccessTagihan) onSuccessTagihan(formData.bulan);
        setTimeout(closeAndReset, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Error submitting tagihan", error);
      setStatus('error');
    }
  };

  const handleSubmitSurat = async (e) => {
    e.preventDefault();
    setStatus('loading');
    const SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";

    try {
      if (SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
        setTimeout(() => {
          setStatus('successSurat');
          if (onSuccessSurat) onSuccessSurat(suratData.nomor);
          setTimeout(closeAndReset, 3000);
        }, 1500);
        return;
      }

      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'upload_surat', ...suratData }),
      });

      const result = await response.json();
      if (result.status === 'success') {
        setStatus('successSurat');
        if (onSuccessSurat) onSuccessSurat(suratData.nomor);
        setTimeout(closeAndReset, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Error submitting surat", error);
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden my-8">
        <div className="flex justify-between items-center p-6 border-b border-zinc-200 bg-red-50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-red-700">admin_panel_settings</span>
            <h3 className="font-headline-md text-red-700">Panel Pengurus</h3>
          </div>
          <button onClick={closeAndReset} className="text-secondary hover:text-primary transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        {/* Navigation Tabs */}
        {status === 'idle' && (
          <div className="flex border-b border-zinc-200 bg-zinc-50">
            <button 
              className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider ${activeTab === 'tagihan' ? 'text-red-700 border-b-2 border-red-700 bg-white' : 'text-zinc-500 hover:text-red-700 transition-colors'}`}
              onClick={() => setActiveTab('tagihan')}
            >
              Kirim Tagihan
            </button>
            <button 
              className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider ${activeTab === 'surat' ? 'text-red-700 border-b-2 border-red-700 bg-white' : 'text-zinc-500 hover:text-red-700 transition-colors'}`}
              onClick={() => setActiveTab('surat')}
            >
              Upload Surat
            </button>
          </div>
        )}

        <div className="p-6">
          {status === 'successTagihan' && (
             <div className="text-center py-8">
               <span className="material-symbols-outlined text-6xl text-green-500 mb-4">outgoing_mail</span>
               <h4 className="font-headline-md mb-2">Tagihan Terkirim!</h4>
               <p className="text-secondary font-body-md">Sistem sedang mengirim email pengingat tagihan iuran kepada seluruh anggota yang terdaftar.</p>
             </div>
          )}

          {status === 'successSurat' && (
             <div className="text-center py-8">
               <span className="material-symbols-outlined text-6xl text-green-500 mb-4">cloud_done</span>
               <h4 className="font-headline-md mb-2">Surat Diarsipkan!</h4>
               <p className="text-secondary font-body-md">Surat telah berhasil diunggah ke Google Drive dan dicatat di database.</p>
             </div>
          )}

          {status === 'idle' && activeTab === 'tagihan' && (
            <form onSubmit={handleSubmitTagihan} className="space-y-4">
                <p className="text-sm text-secondary mb-4">Fitur ini akan mengirimkan email notifikasi ke semua anggota yang telah mendaftarkan emailnya pada sistem.</p>

                <div>
                <label className="block text-label-md text-on-surface mb-1">Bulan Tagihan</label>
                <input 
                    type="month" 
                    name="bulan"
                    value={formData.bulan}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                />
                </div>
                <div>
                <label className="block text-label-md text-on-surface mb-1">Nominal Iuran Wajib (Rp)</label>
                <input 
                    type="number" 
                    name="nominal"
                    value={formData.nominal}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="Contoh: 50000"
                />
                </div>

                {status === 'error' && (
                    <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg">
                        Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.
                    </div>
                )}

                <div className="pt-4 mt-6 border-t border-zinc-200 flex justify-end gap-3">
                <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full py-3 bg-red-700 text-white rounded-lg font-label-md hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <span className="material-symbols-outlined text-sm">send</span>
                    Kirim Tagihan
                </button>
                </div>
            </form>
          )}

          {status === 'idle' && activeTab === 'surat' && (
            <form onSubmit={handleSubmitSurat} className="space-y-4">
                <p className="text-sm text-secondary mb-4">Arsipkan surat organisasi ke dalam Google Drive terintegrasi.</p>

                <div>
                <label className="block text-label-md text-on-surface mb-1">Jenis Surat</label>
                <select 
                    name="jenis"
                    value={suratData.jenis}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white"
                >
                    <option value="Internal">Surat Internal (PGRI)</option>
                    <option value="Eksternal">Surat Eksternal (Dinas/Lainnya)</option>
                </select>
                </div>
                
                <div>
                <label className="block text-label-md text-on-surface mb-1">Nomor Surat</label>
                <input 
                    type="text" 
                    name="nomor"
                    value={suratData.nomor}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="Contoh: 001/PGRI/2024"
                />
                </div>

                <div>
                <label className="block text-label-md text-on-surface mb-1">Perihal</label>
                <input 
                    type="text" 
                    name="perihal"
                    value={suratData.perihal}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="Contoh: Undangan Rapat Pleno"
                />
                </div>

                <div>
                <label className="block text-label-md text-on-surface mb-1">File Dokumen (PDF/JPG)</label>
                <input 
                    type="file" 
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    required
                    className="w-full text-sm text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 transition-all"
                />
                </div>

                {status === 'error' && (
                    <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg">
                        Terjadi kesalahan saat mengunggah surat. Silakan coba lagi.
                    </div>
                )}

                <div className="pt-4 mt-6 border-t border-zinc-200 flex justify-end gap-3">
                <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full py-3 bg-red-700 text-white rounded-lg font-label-md hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <span className="material-symbols-outlined text-sm">cloud_upload</span>
                    Unggah & Arsipkan
                </button>
                </div>
            </form>
          )}

          {status === 'loading' && (
             <div className="text-center py-12">
               <span className="material-symbols-outlined animate-spin text-5xl text-primary mb-4">progress_activity</span>
               <p className="text-secondary font-label-md">Sedang memproses...</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminModal;