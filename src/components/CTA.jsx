export default function CTA({ onOpenRegistration, onOpenPayment }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-xl">
      <div className="bg-primary-container rounded-3xl p-12 text-center text-white relative overflow-hidden">
        {/* Batik Divider Decoration */}
        <div className="absolute top-0 left-0 w-full h-2 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff, #fff 10px, transparent 10px, transparent 20px)" }}></div>
        <div className="relative z-10">
          <h2 className="font-headline-lg mb-4">Mari Berkarya Bersama PGRI</h2>
          <p className="font-body-md opacity-90 mb-8 max-w-2xl mx-auto">Bergabunglah dengan ribuan pendidik lainnya untuk memajukan pendidikan nasional dan memperjuangkan hak-hak guru Indonesia.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={onOpenRegistration}
              className="bg-white text-primary px-8 py-3 rounded-lg font-bold font-label-md hover:bg-zinc-100 transition-colors shadow-lg"
            >
              Daftar Anggota Baru
            </button>
            <button 
              onClick={onOpenPayment}
              className="bg-primary text-white border border-white/20 px-8 py-3 rounded-lg font-bold font-label-md hover:bg-red-800 transition-colors"
            >
              Lapor Iuran
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 opacity-10 transform translate-x-1/4 translate-y-1/4">
          <span className="material-symbols-outlined text-[200px]">history_edu</span>
        </div>
      </div>
    </section>
  );
}
