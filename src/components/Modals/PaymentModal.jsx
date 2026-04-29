import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

const PaymentModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    jenis: 'Iuran Bulanan',
    nominal: '',
    referensi: '',
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const receiptRef = useRef(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateReceiptAndDownload = async () => {
    if (receiptRef.current) {
      try {
        const canvas = await html2canvas(receiptRef.current);
        const dataUrl = canvas.toDataURL("image/jpeg", 1.0);
        const link = document.createElement('a');
        link.download = `Tanda_Terima_${formData.nama.replace(/\s+/g, '_')}_${new Date().getTime()}.jpg`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error("Gagal membuat struk gambar:", err);
      }
    }
  };

  const handleSuccessFlow = () => {
    setStatus('success');
    if (onSuccess) onSuccess(formData.nama);
    
    // Generate struk setelah state update dan komponen struk dirender
    setTimeout(() => {
      generateReceiptAndDownload();
    }, 500);

    setTimeout(() => {
       onClose();
       setStatus('idle');
       setFormData({nama: '', email: '', jenis: 'Iuran Bulanan', nominal: '', referensi: ''});
    }, 4000);
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
          handleSuccessFlow();
        }, 1000);
        return;
      }

      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          action: 'pembayaran',
          ...formData
        }),
      });

      const result = await response.json();
      
      if (result.status === 'success') {
        handleSuccessFlow();
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setStatus('error');
    }
  };

  return (
    <>
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl my-8">
        <div className="flex justify-between items-center p-6 border-b border-zinc-200">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">qr_code_scanner</span>
            <h3 className="font-headline-md text-on-surface">Lapor Pembayaran & QRIS</h3>
          </div>
          <button onClick={onClose} className="text-secondary hover:text-primary transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="p-6">
          {status === 'success' ? (
             <div className="text-center py-8">
               <span className="material-symbols-outlined text-6xl text-green-500 mb-4">task_alt</span>
               <h4 className="font-headline-md mb-2">Laporan Berhasil Terkirim!</h4>
               <p className="text-secondary font-body-md">Terima kasih. Laporan pembayaran Anda akan segera diverifikasi oleh bendahara.</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Kolom QRIS */}
              <div className="flex flex-col items-center justify-center bg-zinc-50 p-4 rounded-xl border border-zinc-200">
                <p className="text-sm text-secondary font-medium mb-4 text-center">Scan QRIS ini menggunakan aplikasi M-Banking atau E-Wallet Anda.</p>
                {/* Placeholder Image for QRIS */}
                <div className="w-48 h-48 bg-white border-2 border-dashed border-zinc-300 rounded-lg flex flex-col items-center justify-center p-2 mb-4">
                   <span className="material-symbols-outlined text-zinc-300 text-6xl mb-2">qr_code_2</span>
                   <span className="text-xs text-zinc-400 text-center uppercase tracking-widest font-bold">QRIS Placeholder</span>
                </div>
                <div className="text-center w-full">
                   <p className="text-xs text-secondary font-medium uppercase tracking-wider mb-1">Penerima</p>
                   <p className="font-bold text-on-surface">PGRI Ranting</p>
                </div>
              </div>

              {/* Kolom Form Laporan */}
              <form onSubmit={handleSubmit} className="space-y-4">
                  <h4 className="font-label-md text-on-surface border-b border-zinc-200 pb-2 mb-4">Konfirmasi Pembayaran</h4>
                  
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1">Nama Penyetor</label>
                    <input 
                        type="text" 
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        placeholder="Nama lengkap Anda"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1">Alamat Email</label>
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        placeholder="Untuk pengiriman tanda terima"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1">Jenis Iuran</label>
                    <select 
                        name="jenis"
                        value={formData.jenis}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white"
                    >
                        <option value="Iuran Bulanan">Iuran Bulanan Wajib</option>
                        <option value="Dana Sosial">Dana Sosial / Duka</option>
                        <option value="Kegiatan Khusus">Iuran Kegiatan Khusus</option>
                        <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1">Nominal (Rp)</label>
                    <input 
                        type="number" 
                        name="nominal"
                        value={formData.nominal}
                        onChange={handleChange}
                        required
                        min="1000"
                        className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        placeholder="Contoh: 50000"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1">No. Referensi / Bukti Trx</label>
                    <input 
                        type="text" 
                        name="referensi"
                        value={formData.referensi}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        placeholder="Masukkan nomor referensi dari bank"
                    />
                  </div>

                  {status === 'error' && (
                      <div className="p-2 bg-red-50 text-red-700 text-xs rounded-lg">
                          Terjadi kesalahan. Silakan coba lagi.
                      </div>
                  )}

                  <div className="pt-4 mt-4">
                    <button 
                        type="submit" 
                        disabled={status === 'loading'}
                        className="w-full py-2 bg-primary text-white rounded-lg font-label-md hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {status === 'loading' ? (
                            <>
                              <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                              Mengirim...
                            </>
                        ) : 'Kirim Laporan Pembayaran'}
                    </button>
                  </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Komponen Struk Tersembunyi untuk di-generate jadi gambar */}
    <div className="absolute top-[-9999px] left-[-9999px]">
      <div ref={receiptRef} className="bg-white p-8 w-[400px] border border-zinc-200">
        <div className="text-center mb-6 border-b border-zinc-200 pb-4">
          <h2 className="font-headline-md text-red-700 font-bold uppercase tracking-tight">PGRI Ranting</h2>
          <p className="text-xs text-secondary mt-1">Tanda Terima Pembayaran Iuran</p>
        </div>
        <div className="space-y-3 font-body-md text-sm">
          <div className="flex justify-between">
            <span className="text-secondary">Waktu</span>
            <span className="font-medium">{new Date().toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Nama Penyetor</span>
            <span className="font-medium text-right">{formData.nama}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Jenis Iuran</span>
            <span className="font-medium text-right">{formData.jenis}</span>
          </div>
          <div className="flex justify-between border-t border-dashed border-zinc-300 pt-3 mt-3">
            <span className="text-secondary font-bold">Nominal</span>
            <span className="font-bold text-lg">Rp {parseInt(formData.nominal || 0).toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-secondary">No. Referensi</span>
            <span className="font-medium font-mono text-right">{formData.referensi}</span>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-zinc-400">
          <p>Terima kasih atas partisipasi Anda.</p>
          <p>Dokumen ini adalah bukti pembayaran yang sah.</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default PaymentModal;
