import { useState } from "react";

export default function TopNavBar({ notifications, onOpenAdmin }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="flex justify-between items-center h-16 px-6 max-w-7xl mx-auto w-full">
        <div className="text-xl font-bold text-red-700 dark:text-red-500 uppercase tracking-tight font-headline-md">
          PGRI Ranting
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a className="text-red-700 dark:text-red-500 border-b-2 border-red-700 font-bold pb-1 font-label-md" href="#">Beranda</a>
          <a className="text-zinc-600 dark:text-zinc-400 hover:text-red-600 transition-colors font-label-md" href="#">Direktori</a>
          <a className="text-zinc-600 dark:text-zinc-400 hover:text-red-600 transition-colors font-label-md" href="#">Pengumuman</a>
          <a className="text-zinc-600 dark:text-zinc-400 hover:text-red-600 transition-colors font-label-md" href="#">Tentang Kami</a>
        </div>
        <div className="flex items-center gap-4 relative">
          
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-2 text-zinc-600 hover:text-primary transition-colors relative flex items-center justify-center"
            >
              <span className="material-symbols-outlined">notifications</span>
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-white"></span>
              )}
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-zinc-200 rounded-xl shadow-xl overflow-hidden">
                <div className="p-3 border-b border-zinc-200 bg-zinc-50">
                  <h3 className="font-label-md text-on-surface">Notifikasi</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-sm text-secondary">
                      Tidak ada notifikasi
                    </div>
                  ) : (
                    notifications.map((notif, index) => (
                      <div key={index} className="p-3 border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                        <p className="text-sm font-medium text-on-surface">{notif.title}</p>
                        <p className="text-xs text-secondary mt-1">{notif.message}</p>
                        <p className="text-[10px] text-zinc-400 mt-1">{notif.time}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={onOpenAdmin}
            className="px-6 py-2 bg-primary-container text-on-primary font-label-md rounded-lg active:opacity-80 transition-all"
          >
            Pengurus
          </button>
        </div>
      </div>
    </nav>
  );
}
