import React from 'react';
import { Volume2, VolumeX, Sparkles, Compass, Swords, Award, BookOpen, Clock } from 'lucide-react';
import { useGame } from '../context/GameContext';

export const Navbar: React.FC = () => {
  const { profile, activeTab, setActiveTab, toggleSound, currentMission } = useGame();

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Compass },
    { id: 'mapa', label: 'Mapa', icon: Compass },
    { id: 'misiones', label: 'Misiones', icon: Swords },
    { id: 'recompensas', label: 'Recompensas', icon: Award },
    { id: 'bitacora', label: 'Mi Bitácora', icon: BookOpen },
    { id: 'historial', label: 'Historial', icon: Clock },
  ] as const;

  return (
    <header className="sticky top-0 z-50 bg-[#060913]/95 backdrop-blur border-b border-slate-800/80 px-4 lg:px-8 py-3 no-print">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Title */}
        <button
          onClick={() => setActiveTab('inicio')}
          className="flex items-center gap-2.5 text-left group cursor-pointer shrink-0"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-950/50">
            <Sparkles className="w-5 h-5 text-slate-950" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-black text-lg md:text-xl tracking-wider bg-gradient-to-r from-amber-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent whitespace-nowrap">
              MATHQUEST
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 hidden sm:inline">
              La Aventura del Cálculo
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-purple-900/40 text-amber-300 border border-purple-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Audio Control */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label={profile.soundEnabled ? 'Silenciar Efectos de Audio' : 'Activar Sonidos RPG'}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-300 border border-slate-800 transition-colors cursor-pointer"
            title={profile.soundEnabled ? 'Sonido activado' : 'Sonido silenciado'}
          >
            {profile.soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Player Mini Badge / CTA */}
          <button
            onClick={() => setActiveTab('recompensas')}
            className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-950/80 to-slate-900 border border-purple-500/40 hover:border-amber-400/60 rounded-lg text-xs transition-all cursor-pointer shadow-sm group"
          >
            <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center font-bold text-[11px] text-amber-300 tabular-nums">
              {profile.level}
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-[10px] text-slate-400 leading-none">Rango</div>
              <div className="font-semibold text-slate-200 text-xs truncate max-w-[110px] group-hover:text-amber-300 transition-colors">
                {profile.title}
              </div>
            </div>
            <span className="font-mono text-amber-400 text-xs font-bold tabular-nums">
              {profile.xp} XP
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Scrolling Nav Bar */}
      <div className="flex md:hidden items-center gap-1.5 overflow-x-auto py-2 border-t border-slate-800/60 mt-2 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isActive
                  ? 'bg-purple-900/60 text-amber-300 border border-purple-500/50'
                  : 'text-slate-400 bg-slate-900/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
