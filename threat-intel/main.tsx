import React from 'react';
import ReactDOM from 'react-dom/client';
// Componentler bir üst klasörde (../) olduğu için yolu böyle belirtiyoruz
import HoneypotDashboard from '../components/HoneypotDashboard';
import { Icons } from '../components/Icons';

const IntelPage = () => {
  return (
    <div className="min-h-screen bg-cyber-black text-cyber-text font-sans">
      {/* Basit Navbar - Ana Sayfaya Dönüş İçin */}
      <nav className="fixed top-0 w-full z-50 bg-cyber-black/90 backdrop-blur border-b border-cyber-gray">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 cursor-pointer group">
            <Icons.Shield width={24} height={24} />
            <span className="font-mono font-bold text-lg text-white group-hover:text-cyber-green transition-colors">BERKE<span className="text-cyber-green group-hover:text-white transition-colors">BODUR</span></span>
          </a>
          <a href="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-mono text-sm">
            <Icons.ArrowLeft width={16} height={16} /> Ana Sayfaya Dön
          </a>
        </div>
      </nav>

      <main className="pt-24 px-4 max-w-7xl mx-auto pb-20">
        <HoneypotDashboard />
      </main>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <IntelPage />
    </React.StrictMode>
  );
}