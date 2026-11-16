import React from 'react';
import { Sparkles, BookOpen } from 'lucide-react';
import { useGame } from '../context/GameContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useGame();

  return (
    <footer className="border-t border-slate-800/80 bg-[#060913] py-8 px-4 text-xs text-slate-500 no-print">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-gradient-to-br from-amber-500 to-purple-600 flex items-center justify-center text-slate-950 font-bold text-[10px]">
            ∫
          </div>
          <span className="font-serif font-bold text-slate-300">
            MathQuest: La Aventura del Cálculo
          </span>
          <span>·</span>
          <span>Bitácora Académica de Cálculo Diferencial</span>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <button
            onClick={() => setActiveTab('inicio')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Inicio
          </button>
          <button
            onClick={() => setActiveTab('mapa')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Mapa de Mundos
          </button>
          <button
            onClick={() => setActiveTab('misiones')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Misiones
          </button>
          <button
            onClick={() => setActiveTab('bitacora')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Mi Bitácora
          </button>
        </div>
      </div>
    </footer>
  );
};
