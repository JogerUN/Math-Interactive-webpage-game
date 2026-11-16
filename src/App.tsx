import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Navbar } from './components/Navbar';
import { InicioView } from './components/InicioView';
import { MapaView } from './components/MapaView';
import { MisionesView } from './components/MisionesView';
import { RecompensasView } from './components/RecompensasView';
import { BitacoraView } from './components/BitacoraView';
import { HistorialView } from './components/HistorialView';
import { Footer } from './components/Footer';

const MainContent: React.FC = () => {
  const { activeTab } = useGame();

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {activeTab === 'inicio' && <InicioView />}
      {activeTab === 'mapa' && <MapaView />}
      {activeTab === 'misiones' && <MisionesView />}
      {activeTab === 'recompensas' && <RecompensasView />}
      {activeTab === 'bitacora' && <BitacoraView />}
      {activeTab === 'historial' && <HistorialView />}
    </main>
  );
};

export default function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
        <Navbar />
        <MainContent />
        <Footer />
      </div>
    </GameProvider>
  );
}
