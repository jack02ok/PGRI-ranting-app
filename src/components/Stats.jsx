export default function Stats() {
  return (
    <section className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <div className="text-headline-lg font-bold">450+</div>
          <div className="text-caption opacity-80 uppercase tracking-widest">Anggota Aktif</div>
        </div>
        <div>
          <div className="text-headline-lg font-bold">12</div>
          <div className="text-caption opacity-80 uppercase tracking-widest">Sekolah Binaan</div>
        </div>
        <div>
          <div className="text-headline-lg font-bold">24</div>
          <div className="text-caption opacity-80 uppercase tracking-widest">Program Kerja</div>
        </div>
        <div>
          <div className="text-headline-lg font-bold">100%</div>
          <div className="text-caption opacity-80 uppercase tracking-widest">Solidaritas</div>
        </div>
      </div>
    </section>
  );
}
