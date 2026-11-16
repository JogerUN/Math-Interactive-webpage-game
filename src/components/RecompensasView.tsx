import React, { useState } from 'react';
import {
  Award,
  Crown,
  Zap,
  Shield,
  Sparkles,
  CheckCircle2,
  Lock,
  Compass,
  BookOpen,
  Target,
  TrendingUp,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { BADGES_DATA, LEVEL_TIERS } from '../data/badgesData';
import { Badge } from '../types';

export const RecompensasView: React.FC = () => {
  const { profile } = useGame();
  const [filterCategory, setFilterCategory] = useState<string>('todos');

  const filteredBadges = BADGES_DATA.filter(
    (b) => filterCategory === 'todos' || b.category === filterCategory
  );

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return Compass;
      case 'Zap':
        return Zap;
      case 'TrendingUp':
        return TrendingUp;
      case 'Target':
        return Target;
      case 'BookOpen':
        return BookOpen;
      case 'Shield':
        return Shield;
      case 'Crown':
        return Crown;
      default:
        return Award;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
            <Award className="w-4 h-4" />
            <span>SALA DE TROFEOS & RANGOS DE MAESTRÍA</span>
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-black text-white">
            Recompensas y Progresión RPG
          </h1>
          <p className="text-slate-400 text-xs md:text-sm mt-1">
            Gana puntos de experiencia (XP), asciende en la jerarquía del cálculo y colecciona insignias legendarias.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-purple-950/40 border border-purple-500/40 px-5 py-2.5 rounded-xl text-xs font-mono shrink-0 shadow-lg shadow-purple-950/20">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/50 flex items-center justify-center font-bold text-amber-300 text-sm">
            {profile.level}
          </div>
          <div>
            <div className="text-slate-400 text-[10px] uppercase">Rango Actual</div>
            <div className="text-white font-bold text-xs">{profile.title}</div>
          </div>
        </div>
      </div>

      {/* Level Tiers Ladder */}
      <div className="bg-[#090e1c] border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif font-bold text-lg text-white">
              Escalafón de Rangos Matemáticos
            </h3>
          </div>
          <span className="text-xs font-mono text-amber-400 font-bold tabular-nums">
            {profile.xp} XP Acumulados
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {LEVEL_TIERS.map((tier) => {
            const isCurrent = profile.level === tier.level;
            const isAchieved = profile.level > tier.level || isCurrent;

            return (
              <div
                key={tier.level}
                className={`p-4 rounded-xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-purple-950/50 border-amber-400 shadow-lg shadow-purple-950/40'
                    : isAchieved
                    ? 'bg-slate-900/70 border-emerald-500/30'
                    : 'bg-slate-950/40 border-slate-900 opacity-60'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      Nivel {tier.level}
                    </span>
                    {isCurrent ? (
                      <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded uppercase font-mono">
                        Rango Actual
                      </span>
                    ) : isAchieved ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-600" />
                    )}
                  </div>

                  <h4 className="font-serif font-bold text-sm text-white">
                    {tier.title}
                  </h4>

                  <div className="text-[11px] font-mono text-slate-400">
                    {tier.minXp} - {tier.maxXp === 99999 ? '∞' : tier.maxXp} XP
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {tier.perks}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges Collection Showcase */}
      <div className="bg-[#090e1c] border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-400" />
            <div>
              <h3 className="font-serif font-bold text-lg text-white">
                Colección de Insignias y Logros
              </h3>
              <p className="text-xs text-slate-400">
                Has desbloqueado {profile.badges.length} de {BADGES_DATA.length} insignias.
              </p>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-medium">
            {['todos', 'explorador', 'maestro', 'bitacora', 'racha'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded capitalize transition-colors cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-purple-900/80 text-amber-300 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredBadges.map((badge) => {
            const isUnlocked = profile.badges.includes(badge.id);
            const Icon = getBadgeIcon(badge.icon);

            return (
              <div
                key={badge.id}
                className={`p-5 rounded-xl border flex flex-col justify-between transition-all ${
                  isUnlocked
                    ? 'bg-gradient-to-b from-purple-950/40 to-slate-900 border-amber-400/70 shadow-lg shadow-purple-950/20'
                    : 'bg-slate-950/60 border-slate-800/80 opacity-60'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center border ${
                        isUnlocked
                          ? 'bg-amber-500/20 text-amber-300 border-amber-400/50 shadow-inner'
                          : 'bg-slate-900 text-slate-600 border-slate-800'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold uppercase ${
                        isUnlocked
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-900 text-slate-500'
                      }`}
                    >
                      {isUnlocked ? 'Desbloqueado' : 'Bloqueado'}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-sm text-white">{badge.title}</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {badge.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 mt-3 text-[11px] font-mono text-slate-400">
                  <span className="text-amber-400 font-semibold">Criterio: </span>
                  {badge.conditionDescription}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
