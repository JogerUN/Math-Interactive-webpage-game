import React, { useState } from 'react';
import {
  Compass,
  Swords,
  Award,
  BookOpen,
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
  CheckCircle2,
  Lock,
  UserCheck,
  Edit3,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { WORLDS_DATA } from '../data/missionsData';
import { BADGES_DATA } from '../data/badgesData';
import { HeroClass } from '../types';

export const InicioView: React.FC = () => {
  const {
    profile,
    setActiveTab,
    setCurrentMission,
    updateHeroProfile,
    isMissionCompletedAndWatched,
    isMissionUnlocked,
    logbook,
  } = useGame();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempName, setTempName] = useState(profile.name);
  const [tempClass, setTempClass] = useState<HeroClass>(profile.heroClass);

  const totalMissions = WORLDS_DATA.reduce((acc, w) => acc + w.missions.length, 0);
  const completedCount = profile.completedMissions.length;
  const progressPercent = Math.round((completedCount / totalMissions) * 100);

  // Find next uncompleted or unwatched mission
  const nextMission = (() => {
    for (const world of WORLDS_DATA) {
      for (const m of world.missions) {
        if (!isMissionCompletedAndWatched(m.id)) {
          return { mission: m, world };
        }
      }
    }
    return null;
  })();

  const classDescriptions: Record<HeroClass, { name: string; desc: string; icon: string }> = {
    mago: {
      name: 'Mago Analítico',
      desc: 'Canaliza teoremas abstractos y doblega indeterminaciones infinitesimales con precisión algebraica.',
      icon: '🧙‍♂️',
    },
    caballero: {
      name: 'Caballero del Teorema',
      desc: 'Blindado ante divisiones por cero, defiende la continuidad con el escudo de Bolzano.',
      icon: '🛡️',
    },
    picara: {
      name: 'Pícara de las Curvas',
      desc: 'Ágil y certera para cazar puntos críticos y trazar rectas tangentes en ángulos imposibles.',
      icon: '🗡️',
    },
    druida: {
      name: 'Druida de la Razón de Cambio',
      desc: 'Sincronizado con los ritmos de crecimiento natural, optimiza áreas y recursos con sabiduría.',
      icon: '🌿',
    },
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateHeroProfile(tempName, tempClass);
    setIsEditingProfile(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-[#090d19]">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_mathquest_banner_1794159181651.jpg"
            alt="MathQuest Paisaje Fantástico de Cálculo"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity filter brightness-90 hover:opacity-50 transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060913] via-transparent to-purple-950/20" />
        </div>

        <div className="relative z-10 p-6 md:p-10 lg:p-12 max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>BITÁCORA ACADÉMICA INTERACTIVA & RPG</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            MATHQUEST
            <span className="block text-xl sm:text-2xl md:text-3xl font-sans font-bold bg-gradient-to-r from-amber-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent mt-1">
              La Aventura del Cálculo Diferencial
            </span>
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
            Conquista los 5 reinos matemáticos: desde el Valle de la Continuidad hasta la Montaña de las Inversas y Logaritmos.
            Aprende la teoría rigurosa, resuelve ejemplos paso a paso, experimenta con simuladores visuales y documenta
            tu aprendizaje en la bitácora académica.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                if (nextMission) {
                  setCurrentMission(nextMission.mission);
                  setActiveTab('misiones');
                } else {
                  setActiveTab('mapa');
                }
              }}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-sm flex items-center gap-2.5 shadow-lg shadow-amber-500/20 transition-all cursor-pointer group"
            >
              <Swords className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
              <span>{completedCount === 0 ? 'Comenzar la Aventura' : 'Continuar Misión'}</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActiveTab('mapa')}
              className="px-5 py-3 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Compass className="w-4 h-4 text-purple-400" />
              <span>Explorar los 5 Mundos</span>
            </button>

            <button
              onClick={() => setActiveTab('bitacora')}
              className="px-5 py-3 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Abrir Mi Bitácora</span>
            </button>
          </div>
        </div>
      </div>

      {/* Player Profile & Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hero Character Card */}
        <div className="bg-[#0b1020] border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{classDescriptions[profile.heroClass].icon}</span>
                <div>
                  <h3 className="font-bold text-white text-base leading-snug">{profile.name}</h3>
                  <div className="text-xs text-purple-300 font-medium">{profile.title}</div>
                </div>
              </div>

              <button
                onClick={() => {
                  setTempName(profile.name);
                  setTempClass(profile.heroClass);
                  setIsEditingProfile(true);
                }}
                className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-amber-300 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                title="Personalizar Héroe"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Editar</span>
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {classDescriptions[profile.heroClass].desc}
            </p>

            {/* Level & XP Progression */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-amber-400 font-bold flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  Nivel {profile.level}
                </span>
                <span className="text-slate-400 tabular-nums">
                  {profile.xp} / {profile.xpToNextLevel} XP
                </span>
              </div>

              <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-purple-500 to-amber-400 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(8, (profile.xp / (profile.xpToNextLevel || 250)) * 100)
                    )}%`,
                  }}
                />
              </div>

              <div className="text-[11px] text-slate-400 flex justify-between">
                <span>Faltan {Math.max(0, profile.xpToNextLevel - profile.xp)} XP para el siguiente rango</span>
                <button
                  onClick={() => setActiveTab('recompensas')}
                  className="text-amber-400 hover:underline cursor-pointer"
                >
                  Ver Rangos →
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between text-xs text-slate-400">
            <span>Insignias: <b className="text-amber-400 tabular-nums">{profile.badges.length} / {BADGES_DATA.length}</b></span>
            <span>Clase: <b className="text-purple-300">{classDescriptions[profile.heroClass].name}</b></span>
          </div>
        </div>

        {/* 4 Quantitative Metrics */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#0b1020] border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-white tabular-nums">
                {completedCount} <span className="text-xs text-slate-500 font-normal">/ {totalMissions}</span>
              </div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Misiones Superadas</div>
            </div>
            <div className="text-[11px] text-emerald-400 mt-2 font-mono tabular-nums">
              {progressPercent}% completado
            </div>
          </div>

          <div className="bg-[#0b1020] border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-2">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-white tabular-nums">
                {profile.xp}
              </div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Puntos de XP</div>
            </div>
            <div className="text-[11px] text-amber-400 mt-2 font-mono">
              Rango: {profile.title}
            </div>
          </div>

          <div className="bg-[#0b1020] border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-2">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-white tabular-nums">
                {logbook.length}
              </div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Registros en Bitácora</div>
            </div>
            <div className="text-[11px] text-purple-400 mt-2 font-mono">
              {logbook.filter((l) => !!l.userPersonalNote).length} con notas propias
            </div>
          </div>

          <div className="bg-[#0b1020] border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-2">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-white tabular-nums">
                {profile.correctFirstTryCount}
              </div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Aciertos al 1er Intento</div>
            </div>
            <div className="text-[11px] text-sky-400 mt-2 font-mono">
              {profile.solvedExercisesCount > 0
                ? `${Math.round((profile.correctFirstTryCount / profile.solvedExercisesCount) * 100)}% de precisión`
                : 'Sin intentos aún'}
            </div>
          </div>
        </div>
      </div>

      {/* The 5 Worlds Overview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-400" />
              Los 5 Reinos del Cálculo
            </h2>
            <p className="text-xs text-slate-400">
              Explora cada territorio temático y domina sus misiones analíticas.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('mapa')}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
          >
            <span>Ver Mapa Completo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WORLDS_DATA.map((world) => {
            const isUnlocked =
              profile.xp >= world.requiredXp && isMissionUnlocked(world.missions[0].id);
            const worldMissions = world.missions;
            const worldCompletedCount = worldMissions.filter((m) =>
              isMissionCompletedAndWatched(m.id)
            ).length;
            const worldCompleted = worldCompletedCount === worldMissions.length;

            return (
              <div
                key={world.id}
                onClick={() => {
                  if (isUnlocked) {
                    const m =
                      world.missions.find(
                        (x) => isMissionUnlocked(x.id) && !isMissionCompletedAndWatched(x.id)
                      ) || world.missions[0];
                    setCurrentMission(m);
                    setActiveTab('misiones');
                  }
                }}
                className={`group rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                  isUnlocked
                    ? 'bg-[#090e1c] border-slate-800 hover:border-purple-500/60 hover:shadow-xl hover:shadow-purple-950/30 cursor-pointer'
                    : 'bg-slate-950/60 border-slate-900 opacity-70 cursor-not-allowed'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono tracking-wider uppercase text-slate-400">
                      Mundo 0{world.number}
                    </span>
                    {isUnlocked ? (
                      worldCompleted ? (
                        <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Conquistado
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-amber-400">
                          {worldCompletedCount} / {worldMissions.length} Misiones
                        </span>
                      )
                    ) : (
                      <span className="text-[11px] font-mono text-rose-400 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Requiere {world.requiredXp} XP
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-lg text-white group-hover:text-amber-300 transition-colors">
                      {world.realmName}
                    </h3>
                    <p className="text-xs text-purple-300 font-medium mt-0.5">{world.title}</p>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {world.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between text-xs font-semibold">
                  {isUnlocked ? (
                    <>
                      <span className="text-slate-400 group-hover:text-slate-200">
                        {worldCompleted ? 'Repasar contenido' : 'Entrar a misiones'}
                      </span>
                      <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                    </>
                  ) : (
                    <span className="text-slate-500 font-mono text-[11px]">
                      Gana {world.requiredXp - profile.xp} XP para desbloquear
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Profile Edit Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0b1020] border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-amber-400" />
                Personalizar Héroe
              </h3>
              <button
                onClick={() => setIsEditingProfile(false)}
                className="text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                Cerrar ✕
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Nombre o Alias del Estudiante:
                </label>
                <input
                  type="text"
                  maxLength={25}
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                  placeholder="Tu nombre o apodo"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Selecciona tu Clase de Héroe RPG:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(classDescriptions) as HeroClass[]).map((cKey) => {
                    const c = classDescriptions[cKey];
                    const isSelected = tempClass === cKey;
                    return (
                      <button
                        type="button"
                        key={cKey}
                        onClick={() => setTempClass(cKey)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-purple-950/60 border-amber-400 text-white'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="text-xl mb-1">{c.icon}</div>
                        <div className="text-xs font-bold text-white">{c.name}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{c.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-lg cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg shadow cursor-pointer transition-colors"
                >
                  Guardar Héroe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
