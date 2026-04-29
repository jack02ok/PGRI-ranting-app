import { useState } from 'react';
import TopNavBar from './components/TopNavBar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import LatestActivities from './components/LatestActivities';
import Announcements from './components/Announcements';
import CTA from './components/CTA';
import Footer from './components/Footer';
import RegistrationModal from './components/Modals/RegistrationModal';
import PaymentModal from './components/Modals/PaymentModal';
import AdminModal from './components/Modals/AdminModal';

function App() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const addNotification = (title, message) => {
    const newNotif = {
      title,
      message,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };
    setNotifications([newNotif, ...notifications]);
  };

  return (
    <>
      <TopNavBar 
        notifications={notifications} 
        onOpenAdmin={() => setIsAdminOpen(true)} 
      />
      <main className="pt-16">
        <Hero />
        <Stats />
        <LatestActivities />
        <Announcements />
        <CTA 
          onOpenRegistration={() => setIsRegistrationOpen(true)} 
          onOpenPayment={() => setIsPaymentOpen(true)} 
        />
      </main>
      <Footer />
      
      <RegistrationModal 
        isOpen={isRegistrationOpen} 
        onClose={() => setIsRegistrationOpen(false)} 
      />
      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        onSuccess={(nama) => addNotification("Pembayaran Berhasil", `Tanda terima untuk ${nama} telah dikirim ke email dan laporan sedang diproses.`)}
      />
      <AdminModal 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        onSuccessTagihan={(bulan) => addNotification("Tagihan Terkirim", `Sistem telah memproses instruksi tagihan untuk bulan ${bulan}.`)}
        onSuccessSurat={(nomor) => addNotification("Surat Diarsipkan", `Dokumen dengan nomor ${nomor} telah disimpan ke Google Drive.`)}
      />
    </>
  );
}

export default App;
