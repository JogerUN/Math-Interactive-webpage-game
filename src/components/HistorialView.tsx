import React, { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Crown,
  Award,
  BookOpen,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Video,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { WORLDS_DATA } from '../data/missionsData';
import { MathText } from './MathView';

export const HistorialView: React.FC = () => {
  const { history, profile, resetAllProgress } = useGame();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'mission_complete':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'video_watched':
        return <Video className="w-4 h-4 text-cyan-400" />;
      case 'exercise_submit':
        return <AlertCircle className="w-4 h-4 text-amber-400" />;
      case 'level_up':
        return <Crown className="w-4 h-4 text-amber-400" />;
      case 'badge_unlock':
        return <Award className="w-4 h-4 text-purple-400" />;
      case 'note_added':
        return <BookOpen className="w-4 h-4 text-sky-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
            <Clock className="w-4 h-4" />
            <span>CRONOLOGÍA & AUDITORÍA DE APRENDIZAJE</span>
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-black text-white">
            Historial de Actividades
          </h1>
          <p className="text-slate-400 text-xs md:text-sm mt-1">
            Registro cronológico inmutable de todas las acciones, intentos, recompensas y ascensos de rango.
          </p>
        </div>

        <button
          onClick={() => setShowResetConfirm(true)}
          className="px-4 py-2 bg-slate-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/40 rounded-xl text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reiniciar Progreso</span>
        </button>
      </div>

      {/* Progress Breakdown across the 6 Worlds */}
      <div className="bg-[#090e1c] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-serif font-bold text-base text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-amber-400" />
          Progreso por Reino de Cálculo
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {WORLDS_DATA.map((world) => {
            const completedCount = world.missions.filter((m) =>
              profile.completedMissions.includes(m.id)
            ).length;
            const percent = Math.round((completedCount / world.missions.length) * 100);

            return (
              <div
                key={world.id}
                className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl space-y-2.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white font-serif">{world.realmName}</span>
                  <span className="font-mono text-amber-400 font-semibold tabular-nums">
                    {completedCount} / {world.missions.length} ({percent}%)
                  </span>
                </div>

                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-amber-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Timeline of Events */}
      <div className="bg-[#090e1c] border border-slate-800 rounded-2xl p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-serif font-bold text-base text-white">
            Línea Temporal de Registro
          </h3>
          <span className="text-xs font-mono text-slate-400 tabular-nums">
            {history.length} Eventos Guardados
          </span>
        </div>

        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
          {history.map((event) => (
            <div key={event.id} className="relative flex items-start gap-4 text-xs group">
              {/* Event Marker */}
              <div className="absolute -left-6 mt-0.5 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
                {getActivityIcon(event.type)}
              </div>

              {/* Event Content */}
              <div className="w-full p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl space-y-1 hover:border-slate-700 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-bold text-white text-xs">{event.title}</span>
                  <span className="text-slate-500 font-mono text-[11px]">
                    {new Date(event.timestamp).toLocaleString()}
                  </span>
                </div>

                <div className="text-slate-400 leading-relaxed">
                  <MathText text={event.detail} />
                </div>

                {event.xpGained !== undefined && event.xpGained > 0 && (
                  <div className="text-amber-400 font-mono font-bold text-[11px] pt-1">
                    +{event.xpGained} XP otorgados
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0b1020] border border-rose-500/40 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
              <RotateCcw className="w-5 h-5" />
              <span>¿Reiniciar todo el Progreso?</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Esta acción borrará todas las misiones completadas, puntos de XP, insignias e historial
              guardados en tu navegador. Esta acción no se puede deshacer.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  resetAllProgress();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold cursor-pointer"
              >
                Confirmar y Reiniciar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
