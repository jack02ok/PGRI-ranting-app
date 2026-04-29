export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="absolute inset-0 batik-pattern"></div>
      <div className="max-w-7xl mx-auto px-6 py-xl grid md:grid-cols-12 gap-lg items-center relative z-10">
        <div className="md:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-700 rounded-full mb-6">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
            <span className="text-caption font-bold uppercase tracking-wider">Sambutan Ketua Ranting</span>
          </div>
          <h1 className="font-headline-xl text-on-surface mb-6 leading-tight">
            Mewujudkan Guru yang <span className="text-primary">Profesional, Sejahtera</span>, dan Bermartabat.
          </h1>
          <p className="font-body-lg text-secondary mb-8 max-w-2xl">
            "Pendidikan adalah senjata paling mematikan di dunia, karena dengan pendidikan, Anda dapat mengubah dunia. Melalui wadah PGRI, mari kita bersatu demi kemajuan pendidikan Indonesia."
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-primary-container text-on-primary px-8 py-4 rounded-lg font-label-md flex items-center justify-center gap-2 shadow-lg shadow-red-900/20 active:scale-95 transition-all">
              Profil Organisasi
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <button className="border-2 border-secondary text-secondary px-8 py-4 rounded-lg font-label-md hover:bg-secondary/5 transition-colors">
              Visi & Misi
            </button>
          </div>
        </div>
        <div className="md:col-span-5 relative">
          <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl border-8 border-white relative z-10">
            <img 
              alt="Ketua PGRI Ranting" 
              className="w-full h-full object-cover" 
              data-alt="Dignified middle-aged Indonesian educator in official batik uniform smiling warmly in a formal office setting with soft natural light" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSAtpr6A3N2PoKYnyhTbLofn0eA52GCdmpD7qwFR7bCVZYX4O4AMhKgoy3IV0KX5uo4KXmkk9iE8-mzdhOIBnjC_1W9EDzZOgGS1pieuKQi2lz8cbQeyKn0tH4EYNfKAgYMmo0UGxV3HdDTRp7WUgzZX2rBgmzC3uuzWOmFegHBf1JMKAfQofFG5h1eIu2m4RzmgToaZmUuhKrH0mK2EinysA9mh0i7eJRFo4IWLUXbVv_o5o4zvR2nRnbU1maoQPzcy6HIrvE550e"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-primary p-6 rounded-xl text-white shadow-xl z-20 max-w-[240px]">
            <p className="font-headline-md leading-none mb-1">Drs. M. Wahid</p>
            <p className="font-caption opacity-80 uppercase tracking-widest">Ketua PGRI Ranting</p>
          </div>
          <div className="absolute top-1/2 -left-12 w-24 h-24 bg-primary-fixed-dim rounded-full blur-3xl opacity-30"></div>
        </div>
      </div>
    </section>
  );
}
