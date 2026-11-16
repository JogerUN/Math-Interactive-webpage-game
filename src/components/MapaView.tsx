import React, { useState } from 'react';
import {
  Compass,
  Lock,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  Award,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { WORLDS_DATA } from '../data/missionsData';
import { World, Mission } from '../types';

export const MapaView: React.FC = () => {
  const {
    profile,
    setActiveTab,
    setCurrentMission,
    isMissionUnlocked,
    isMissionCompletedAndWatched,
  } = useGame();
  const [selectedWorld, setSelectedWorld] = useState<World>(WORLDS_DATA[0]);

  const handleSelectMission = (mission: Mission) => {
    if (!isMissionUnlocked(mission.id)) return;
    setCurrentMission(mission);
    setActiveTab('misiones');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
            <Compass className="w-4 h-4" />
            <span>CARTOGRAFÍA DEL CÁLCULO DIFERENCIAL</span>
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-black text-white">
            Mapa de Aventura
          </h1>
          <p className="text-slate-400 text-xs md:text-sm mt-1">
            Explora la senda matemática que conecta los 5 reinos del análisis infinitesimal.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-xl text-xs font-mono shrink-0">
          <span className="text-slate-400">Poder Analítico:</span>
          <span className="text-amber-400 font-bold tabular-nums">{profile.xp} XP</span>
          <span className="text-slate-600">·</span>
          <span className="text-purple-300 font-semibold">{profile.title}</span>
        </div>
      </div>

      {/* Interactive World Map Grid with RPG Waypoints */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Map Nodes */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#080d1a] border border-slate-800/80 rounded-2xl p-5 space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Ruta de Aprendizaje Progresivo
              </span>
              <span className="text-xs text-amber-400 font-medium">
                {WORLDS_DATA.filter((w) => profile.xp >= w.requiredXp && isMissionUnlocked(w.missions[0].id)).length} de 5 Reinos Desbloqueados
              </span>
            </div>

            {/* List of Worlds along the Trail */}
            <div className="space-y-3 relative">
              {WORLDS_DATA.map((world) => {
                const isUnlocked =
                  profile.xp >= world.requiredXp && isMissionUnlocked(world.missions[0].id);
                const isSelected = selectedWorld.id === world.id;
                const completedCount = world.missions.filter((m) =>
                  isMissionCompletedAndWatched(m.id)
                ).length;
                const isCompleted = completedCount === world.missions.length;

                return (
                  <div
                    key={world.id}
                    onClick={() => setSelectedWorld(world)}
                    className={`relative p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-purple-950/40 border-amber-400/80 shadow-lg shadow-purple-950/40'
                        : isUnlocked
                        ? 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700'
                        : 'bg-slate-950/40 border-slate-900 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold font-mono text-sm shrink-0 border ${
                          isCompleted
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                            : isUnlocked
                            ? 'bg-purple-600/20 text-amber-300 border-purple-500/40'
                            : 'bg-slate-900 text-slate-500 border-slate-800'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : isUnlocked ? (
                          <span>0{world.number}</span>
                        ) : (
                          <Lock className="w-4 h-4 text-slate-500" />
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif font-bold text-sm text-white group-hover:text-amber-300">
                            {world.realmName}
                          </h4>
                          {isCompleted && (
                            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded font-mono">
                              Superado
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{world.title}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {isUnlocked ? (
                        <div className="text-right">
                          <div className="text-xs font-mono font-bold text-amber-400 tabular-nums">
                            {completedCount} / {world.missions.length}
                          </div>
                          <div className="text-[10px] text-slate-500">Misiones</div>
                        </div>
                      ) : (
                        <div className="text-right">
                          <div className="text-xs font-mono text-rose-400 tabular-nums">
                            {world.requiredXp} XP
                          </div>
                          <div className="text-[10px] text-slate-500">Requerido</div>
                        </div>
                      )}
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isSelected ? 'text-amber-400 translate-x-1' : 'text-slate-600'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: World Dossier & Missions List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#080d1a] border border-slate-800/80 rounded-2xl overflow-hidden sticky top-20">
            {/* World Image Header */}
            <div className="relative h-44 w-full overflow-hidden bg-slate-950">
              <img
                src={selectedWorld.image}
                alt={selectedWorld.realmName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-[#080d1a]/60 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 bg-black/60 px-2 py-0.5 rounded border border-amber-500/30">
                  Mundo 0{selectedWorld.number}
                </span>
                <h3 className="font-serif font-black text-xl text-white mt-1">
                  {selectedWorld.realmName}
                </h3>
                <p className="text-xs text-purple-200 mt-0.5">{selectedWorld.subtitle}</p>
              </div>
            </div>

            {/* Dossier Body */}
            <div className="p-5 space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedWorld.description}
              </p>

              {/* World Missions List */}
              <div className="space-y-2 pt-2">
                <h5 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  Misiones Disponibles en este Reino:
                </h5>

                <div className="space-y-2">
                  {selectedWorld.missions.map((m) => {
                    const isMCompleted = isMissionCompletedAndWatched(m.id);
                    const isMUnlocked =
                      profile.xp >= selectedWorld.requiredXp && isMissionUnlocked(m.id);

                    return (
                      <div
                        key={m.id}
                        className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                          isMCompleted
                            ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-200'
                            : isMUnlocked
                            ? 'bg-slate-900/70 border-slate-800 hover:border-purple-500/50 text-slate-300'
                            : 'bg-slate-950/40 border-slate-900 opacity-60 text-slate-500'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {isMCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <span className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] font-mono text-slate-400 shrink-0">
                              {m.number}
                            </span>
                          )}
                          <div>
                            <div className="text-xs font-bold text-white line-clamp-1">{m.title}</div>
                            <div className="text-[11px] text-amber-400 font-mono">+{m.xpReward} XP</div>
                          </div>
                        </div>

                        {isMUnlocked ? (
                          <button
                            onClick={() => handleSelectMission(m)}
                            className="px-3 py-1.5 text-xs font-semibold bg-purple-900/60 hover:bg-purple-800 text-purple-200 hover:text-white rounded-lg border border-purple-500/40 transition-colors cursor-pointer shrink-0"
                          >
                            {isMCompleted ? 'Repasar' : 'Comenzar'}
                          </button>
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
