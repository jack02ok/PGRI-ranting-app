export default function LatestActivities() {
  return (
    <section className="py-xl max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-end mb-12">
        <div>
          <div className="h-1 w-12 bg-primary mb-4"></div>
          <h2 className="font-headline-lg text-on-surface">Kegiatan Terbaru</h2>
        </div>
        <button className="text-primary font-label-md flex items-center gap-1 hover:underline">
          Lihat Semua
          <span className="material-symbols-outlined text-sm">open_in_new</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
        {/* Large Feature */}
        <div className="md:col-span-2 group relative h-[500px] rounded-xl overflow-hidden border border-zinc-200">
          <img 
            alt="Workshop Guru" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            data-alt="Group of diverse Indonesian teachers in a bright modern classroom participating in a digital literacy workshop with laptops and focused expressions" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSGrmwrlok4zPL3ybYueS5ikKYI42fqEbYFNgyzNmIfE9KN41gFPBAcZsc8YM6oP73bR68TeDvANgrHcGFn2AeimjYBTOa1fBz5Y-4kK5Ad0o1ipdsMstQAJyy55Ybq99FO7rQB-QEv-vbVW1wBv7irDzyyH5eGX0F51ltgiLa2okuA_EiKuia6ePGm8BRyBXKxWGPLM21KNgUrj3Bb5vMkwbGi9vss0OHkh2f4B3iox11xI0O5Jh3toHwbwNic8Xz2G2OE5U2WIPt"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8">
            <span className="bg-red-700 text-white px-3 py-1 text-xs font-bold rounded mb-4 inline-block">WORKSHOP</span>
            <h3 className="font-headline-md text-white mb-2">Peningkatan Literasi Digital bagi Guru Sekolah Dasar</h3>
            <p className="text-zinc-300 font-body-md line-clamp-2 max-w-xl">Membekali pendidik dengan keahlian teknologi terkini untuk menghadapi tantangan pembelajaran abad 21.</p>
            <div className="mt-4 flex items-center gap-4 text-white/80 text-caption">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">calendar_today</span> 15 Nov 2024</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span> Aula Serbaguna</span>
            </div>
          </div>
        </div>

        {/* Secondary Small */}
        <div className="space-y-lg">
          <div className="group bg-white rounded-xl overflow-hidden border border-zinc-200 shadow-sm transition-shadow hover:shadow-md">
            <div className="h-48 overflow-hidden">
              <img 
                alt="Kegiatan Sosial" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                data-alt="Indonesian teachers in PGRI uniforms distributing food and supplies during a community service event in a rural village" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAc7Csa2pxssMOp7QS0LbdXuwTGjYSuSdl_Dt62mEZ-HTSf4_jH0hGnBQcHNEH7x7pvKhbhC5bvas7Hkgw7IT36jM_NN4IFsvTktnp-Ix7sCGXO_ixQpgAyk3wD4KYJcF_-k8iHg48TdYsOExCCiqe2-81ToPT4YQIlKALZ_u8UpObxn8oRY35KF3zSQzgusea4dVsG68LMZ6rUU9U8Zh7aA2zyIPLxyGRTBYZQHhFB_qCy9li1dwu-aDMaHKj3zIMy2cYSwQDIMuBc"
              />
            </div>
            <div className="p-6">
              <h4 className="font-label-md text-on-surface mb-2 line-clamp-2">Bakti Sosial Guru untuk Masyarakat Terdampak Bencana</h4>
              <p className="text-caption text-secondary line-clamp-2">Aksi nyata kepedulian PGRI Ranting dalam meringankan beban sesama.</p>
            </div>
          </div>

          <div className="group bg-white rounded-xl overflow-hidden border border-zinc-200 shadow-sm transition-shadow hover:shadow-md">
            <div className="h-48 overflow-hidden">
              <img 
                alt="Lomba HUT PGRI" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                data-alt="Joyful Indonesian teachers competing in traditional outdoor games during a festive anniversary celebration in a school courtyard" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuATbH5v4i6kiybrq97dsBUJTFLnbnn5SsvtWfNvKhVJCxaCVqUcwtYTe_04dw_UY-bxLT0HFgqCSr1JO6xrKZC6hXgxrmTwEYGxAV7p-qIG6mU8EO0Cm2U9s9hhdAK09bi2GaXprZ39FRWOKERAAlO3kb7rDKAGZIs-Vm3sa7m7YeuwHOQxALM3zutNDDgZNOWm_F7y822aeqVkaPaWVbahoJbLt4LLI8qUjTzAIl2StLPFmd0sSP0ZBLzFpz9-G7d5Q4dr2SOrJzUE"
              />
            </div>
            <div className="p-6">
              <h4 className="font-label-md text-on-surface mb-2 line-clamp-2">Peringatan HUT PGRI ke-79: Semangat Kolaborasi</h4>
              <p className="text-caption text-secondary line-clamp-2">Rangkaian lomba dan pentas seni mempererat tali silaturahmi antar guru.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
