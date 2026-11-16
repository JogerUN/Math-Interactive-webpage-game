import { Badge } from '../types';

export const BADGES_DATA: Badge[] = [
  {
    id: 'first_step',
    title: 'Primer Paso del Héroe',
    description: 'Completa tu primera misión y haz tu primer registro en la bitácora.',
    category: 'explorador',
    icon: 'Compass',
    conditionDescription: 'Supera cualquier misión del juego.',
  },
  {
    id: 'continuity_master',
    title: 'Maestro de la Continuidad',
    description: 'Calcula con éxito el parámetro k para garantizar la continuidad global.',
    category: 'maestro',
    icon: 'Shield',
    conditionDescription: 'Supera la Misión 3 del Valle de la Continuidad en un Punto.',
  },
  {
    id: 'tangent_master',
    title: 'Ojo de la Tangente y Velocidad',
    description: 'Traza la recta tangente geométrica y calcula razones de cambio cinemáticas.',
    category: 'maestro',
    icon: 'TrendingUp',
    conditionDescription: 'Supera misiones en el Cañón de la Derivada por Definición.',
  },
  {
    id: 'quotient_rule',
    title: 'Artífice del Cociente y Potencias',
    description: 'Aplica rigurosamente la regla del cociente y derivadas trigonométricas.',
    category: 'maestro',
    icon: 'Zap',
    conditionDescription: 'Supera la Misión 2 del Abismo de las Reglas de Derivación.',
  },
  {
    id: 'chain_implicit',
    title: 'Eslabón de la Cadena e Implícita',
    description: 'Doblega funciones compuestas anidadas y despeja dy/dx por derivación implícita.',
    category: 'maestro',
    icon: 'Target',
    conditionDescription: 'Supera misiones en las Torres de la Regla de la Cadena.',
  },
  {
    id: 'log_differentiation',
    title: 'Alquimista de Inversas y Logaritmos',
    description: 'Domina las trigonométricas inversas y la derivación logarítmica de f(x)ᵍ⁽ˣ⁾.',
    category: 'maestro',
    icon: 'Crown',
    conditionDescription: 'Supera la Misión 3 de la Montaña de Inversas y Logaritmos.',
  },
  {
    id: 'bitacora_scholar',
    title: 'Cronista Riguroso',
    description: 'Añade notas y reflexiones personales en al menos 2 registros de tu bitácora.',
    category: 'bitacora',
    icon: 'BookOpen',
    conditionDescription: 'Guarda anotaciones académicas personales en la Bitácora.',
  },
  {
    id: 'first_try_streak',
    title: 'Racha Impecable',
    description: 'Resuelve 3 ejercicios correctamente al primer intento.',
    category: 'racha',
    icon: 'Award',
    conditionDescription: 'Consigue 3 aciertos directos sin fallos.',
  },
  {
    id: 'grand_archmage',
    title: 'Archimago de los 5 Reinos',
    description: 'Conquista misiones en los 5 reinos del análisis infinitesimal.',
    category: 'maestro',
    icon: 'Crown',
    conditionDescription: 'Completa al menos una misión de cada uno de los 5 mundos.',
  },
];

export interface LevelTier {
  level: number;
  title: string;
  minXp: number;
  maxXp: number;
  perks: string;
}

export const LEVEL_TIERS: LevelTier[] = [
  {
    level: 1,
    title: 'Aprendiz de Descartes',
    minXp: 0,
    maxXp: 250,
    perks: 'Desbloquea el Valle de la Continuidad en un Punto y la Bitácora.',
  },
  {
    level: 2,
    title: 'Explorador de Tangentes',
    minXp: 250,
    maxXp: 550,
    perks: 'Acceso al Cañón de la Derivada por Definición, Tangentes y Velocidad.',
  },
  {
    level: 3,
    title: 'Maestro de Reglas Operativas',
    minXp: 550,
    maxXp: 900,
    perks: 'Desbloquea el Abismo de las Reglas de Derivación (Producto y Cociente).',
  },
  {
    level: 4,
    title: 'Centinela de la Cadena',
    minXp: 900,
    maxXp: 1300,
    perks: 'Acceso a las Torres de la Regla de la Cadena y Derivación Implícita.',
  },
  {
    level: 5,
    title: 'Conquistador de Logaritmos',
    minXp: 1300,
    maxXp: 1800,
    perks: 'Conquista la Montaña de las Inversas, Exponenciales y Logaritmos.',
  },
  {
    level: 6,
    title: 'Archimago del Cálculo',
    minXp: 1800,
    maxXp: 99999,
    perks: 'Rango supremo: Dominio completo de los 5 reinos del cálculo diferencial.',
  },
];

export function getLevelForXp(xp: number): { level: number; title: string; nextLevelXp: number; currentTier: LevelTier } {
  for (let i = LEVEL_TIERS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_TIERS[i].minXp) {
      const next = LEVEL_TIERS[i + 1] ? LEVEL_TIERS[i + 1].minXp : LEVEL_TIERS[i].maxXp;
      return {
        level: LEVEL_TIERS[i].level,
        title: LEVEL_TIERS[i].title,
        nextLevelXp: next,
        currentTier: LEVEL_TIERS[i],
      };
    }
  }
  return {
    level: 1,
    title: LEVEL_TIERS[0].title,
    nextLevelXp: LEVEL_TIERS[1].minXp,
    currentTier: LEVEL_TIERS[0],
  };
}
