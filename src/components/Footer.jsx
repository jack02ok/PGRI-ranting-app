export default function Footer() {
  return (
    <footer className="bg-zinc-100 dark:bg-zinc-950 w-full py-8 mt-12 border-t border-zinc-200 dark:border-zinc-800">
      <div className="flex flex-col items-center justify-center gap-4 w-full text-center">
        <div className="font-bold text-red-700 font-headline-md">PGRI RANTING</div>
        <div className="flex gap-6">
          <a className="text-zinc-500 dark:text-zinc-400 hover:text-red-600 transition-colors font-label-md uppercase tracking-widest text-xs underline-offset-4 hover:underline" href="#">Kebijakan Privasi</a>
          <a className="text-zinc-500 dark:text-zinc-400 hover:text-red-600 transition-colors font-label-md uppercase tracking-widest text-xs underline-offset-4 hover:underline" href="#">Kontak Kami</a>
          <a className="text-zinc-500 dark:text-zinc-400 hover:text-red-600 transition-colors font-label-md uppercase tracking-widest text-xs underline-offset-4 hover:underline" href="#">Pusat Bantuan</a>
        </div>
        <div className="text-zinc-500 dark:text-zinc-400 font-['Public_Sans'] text-xs uppercase tracking-widest mt-4">
          © 2024 Persatuan Guru Republik Indonesia. Bakti Guru Demi Ibu Pertiwi.
        </div>
      </div>
    </footer>
  );
}
