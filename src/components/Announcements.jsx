export default function Announcements() {
  return (
    <section className="bg-surface-container py-xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>campaign</span>
          <h2 className="font-headline-lg text-on-surface">Pusat Pengumuman</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
          {/* Important Alert */}
          <div className="lg:col-span-1 bg-white p-8 rounded-xl border-l-4 border-primary shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <span className="material-symbols-outlined text-8xl">error</span>
            </div>
            <span className="bg-red-100 text-red-700 px-2 py-1 text-[10px] font-bold rounded uppercase tracking-widest mb-4 inline-block">Mendesak</span>
            <h3 className="font-headline-md text-on-surface mb-4">Pemutakhiran Data Anggota (DAPODIK)</h3>
            <p className="font-body-md text-secondary mb-6">Diharapkan seluruh anggota segera melakukan verifikasi data pada portal resmi paling lambat akhir bulan ini.</p>
            <button className="w-full py-3 bg-zinc-900 text-white rounded-lg font-label-md hover:bg-zinc-800 transition-colors">Unduh Panduan</button>
          </div>

          {/* Announcement List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-zinc-200 group hover:border-primary transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-zinc-100 rounded flex flex-col items-center justify-center text-center shrink-0">
                <span className="text-caption font-bold">20</span>
                <span className="text-[10px] text-secondary uppercase">Nov</span>
              </div>
              <div className="flex-grow">
                <h4 className="font-label-md group-hover:text-primary transition-colors">Undangan Rapat Koordinasi Triwulan IV</h4>
                <p className="text-caption text-secondary">Pelaksanaan di Kantor Cabang Dinas Pendidikan Pukul 09:00 WIB.</p>
              </div>
              <span className="material-symbols-outlined text-zinc-400">chevron_right</span>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-zinc-200 group hover:border-primary transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-zinc-100 rounded flex flex-col items-center justify-center text-center shrink-0">
                <span className="text-caption font-bold">18</span>
                <span className="text-[10px] text-secondary uppercase">Nov</span>
              </div>
              <div className="flex-grow">
                <h4 className="font-label-md group-hover:text-primary transition-colors">Informasi Penyaluran Tunjangan Sertifikasi</h4>
                <p className="text-caption text-secondary">Progres pencairan tunjangan triwulan ketiga telah mencapai tahap final.</p>
              </div>
              <span className="material-symbols-outlined text-zinc-400">chevron_right</span>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-zinc-200 group hover:border-primary transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-zinc-100 rounded flex flex-col items-center justify-center text-center shrink-0">
                <span className="text-caption font-bold">12</span>
                <span className="text-[10px] text-secondary uppercase">Nov</span>
              </div>
              <div className="flex-grow">
                <h4 className="font-label-md group-hover:text-primary transition-colors">Pendaftaran Beasiswa Anak Guru Tahap II</h4>
                <p className="text-caption text-secondary">Program kesejahteraan keluarga guru melalui bantuan pendidikan putra-putri.</p>
              </div>
              <span className="material-symbols-outlined text-zinc-400">chevron_right</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
