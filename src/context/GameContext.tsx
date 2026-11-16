import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { HeroProfile, HeroClass, LogEntry, HistoryActivity, Mission } from '../types';
import { WORLDS_DATA } from '../data/missionsData';
import { BADGES_DATA, getLevelForXp } from '../data/badgesData';
import { soundEngine } from '../utils/audio';

interface GameContextType {
  profile: HeroProfile;
  logbook: LogEntry[];
  history: HistoryActivity[];
  currentMission: Mission | null;
  setCurrentMission: (mission: Mission | null) => void;
  activeTab: 'inicio' | 'mapa' | 'misiones' | 'recompensas' | 'bitacora' | 'historial';
  setActiveTab: (tab: 'inicio' | 'mapa' | 'misiones' | 'recompensas' | 'bitacora' | 'historial') => void;
  submitExerciseAnswer: (
    mission: Mission,
    answer: string,
    attemptsCount: number,
    procedureNotes: string,
    personalNote?: string
  ) => { isCorrect: boolean; xpGained: number; leveledUp: boolean; newBadges: string[] };
  updateLogPersonalNote: (logId: string, note: string) => void;
  updateHeroProfile: (name: string, heroClass: HeroClass) => void;
  markVideoWatched: (mission: Mission) => void;
  isMissionCompletedAndWatched: (missionId: string) => boolean;
  isMissionUnlocked: (missionId: string) => boolean;
  toggleSound: () => void;
  resetAllProgress: () => void;
  exportBitacoraJSON: () => void;
  triggerPrintBitacora: () => void;
  unlockedWorldsList: string[];
}

const STORAGE_KEYS = {
  PROFILE: 'mathquest_hero_profile_v2',
  LOGBOOK: 'mathquest_bitacora_v2',
  HISTORY: 'mathquest_history_v2',
};

const initialProfile: HeroProfile = {
  name: 'Guardián del Cálculo',
  title: 'Aprendiz de Descartes',
  heroClass: 'mago',
  level: 1,
  xp: 0,
  xpToNextLevel: 250,
  completedMissions: [],
  watchedVideos: [],
  solvedExercisesCount: 0,
  correctFirstTryCount: 0,
  unlockedWorlds: ['continuidad_punto'],
  badges: [],
  soundEnabled: true,
  avatarSeed: 'math_hero_1',
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<HeroProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initialProfile,
          ...parsed,
          completedMissions: Array.isArray(parsed.completedMissions) ? parsed.completedMissions : [],
          watchedVideos: Array.isArray(parsed.watchedVideos) ? parsed.watchedVideos : [],
          badges: Array.isArray(parsed.badges) ? parsed.badges : [],
        };
      }
    } catch {
      // Fallback
    }
    return initialProfile;
  });

  const [logbook, setLogbook] = useState<LogEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LOGBOOK);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return [];
  });

  const [history, setHistory] = useState<HistoryActivity[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return [
      {
        id: 'init-1',
        type: 'level_up',
        timestamp: new Date().toISOString(),
        title: 'Comienzo de la Aventura',
        detail: 'Iniciaste tu viaje en MathQuest con rango de Aprendiz de Descartes.',
        xpGained: 0,
      },
    ];
  });

  const [activeTab, setActiveTab] = useState<'inicio' | 'mapa' | 'misiones' | 'recompensas' | 'bitacora' | 'historial'>('inicio');
  const [currentMission, setCurrentMission] = useState<Mission | null>(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LOGBOOK, JSON.stringify(logbook));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [logbook]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [history]);

  // Keep audio engine mute state synced
  useEffect(() => {
    soundEngine.setMuted(!profile.soundEnabled);
  }, [profile.soundEnabled]);

  const toggleSound = () => {
    setProfile((prev) => {
      const nextSound = !prev.soundEnabled;
      soundEngine.setMuted(!nextSound);
      if (nextSound) soundEngine.play('click');
      return { ...prev, soundEnabled: nextSound };
    });
  };

  const updateHeroProfile = (name: string, heroClass: HeroClass) => {
    setProfile((prev) => ({
      ...prev,
      name: name.trim() || 'Guardián del Cálculo',
      heroClass,
    }));
    soundEngine.play('click');
  };

  // Determine unlocked worlds based on XP
  const unlockedWorldsList = WORLDS_DATA.filter((w) => profile.xp >= w.requiredXp).map((w) => w.id);

  const isMissionCompletedAndWatched = (missionId: string) => {
    return (
      profile.completedMissions.includes(missionId) &&
      profile.watchedVideos.includes(missionId)
    );
  };

  const isMissionUnlocked = (missionId: string) => {
    const orderedMissions = WORLDS_DATA.flatMap((w) =>
      w.missions.map((m) => ({ mission: m, worldRequiredXp: w.requiredXp }))
    );
    const idx = orderedMissions.findIndex((item) => item.mission.id === missionId);
    if (idx === -1) return false;
    if (idx === 0) return true;

    const current = orderedMissions[idx];
    const previous = orderedMissions[idx - 1];
    return (
      profile.xp >= current.worldRequiredXp &&
      isMissionCompletedAndWatched(previous.mission.id)
    );
  };

  const markVideoWatched = (mission: Mission) => {
    setProfile((prev) => {
      if (prev.watchedVideos.includes(mission.id)) return prev;
      return {
        ...prev,
        watchedVideos: [...prev.watchedVideos, mission.id],
      };
    });

    setHistory((prev) => {
      const alreadyLogged = prev.some(
        (h) => h.type === 'video_watched' && h.detail.includes(mission.id)
      );
      if (alreadyLogged) return prev;
      return [
        {
          id: 'hist-vid-' + Date.now(),
          type: 'video_watched',
          timestamp: new Date().toISOString(),
          title: `Video Completado: ${mission.title}`,
          detail: `Reproducción completa verificada para la misión (${mission.id}).`,
        },
        ...prev,
      ];
    });
    soundEngine.play('badge');
  };

  const submitExerciseAnswer = (
    mission: Mission,
    userAnswer: string,
    attemptsCount: number,
    procedureNotes: string,
    personalNote?: string
  ) => {
    const ex = mission.exercise;
    let isCorrect = false;

    if (ex.type === 'multiple_choice') {
      isCorrect = userAnswer.trim().toLowerCase() === ex.correctAnswer.trim().toLowerCase();
    } else {
      const userNum = parseFloat(userAnswer.replace(',', '.'));
      const targetNum = parseFloat(ex.correctAnswer);
      const tol = ex.tolerance ?? 0.05;
      isCorrect = !isNaN(userNum) && Math.abs(userNum - targetNum) <= tol;
    }

    const world = WORLDS_DATA.find((w) => w.id === mission.worldId);
    const worldTitle = world ? world.realmName : 'Reino del Cálculo';

    if (!isCorrect) {
      soundEngine.play('wrong');

      const failedHistoryItem: HistoryActivity = {
        id: 'hist-' + Date.now(),
        type: 'exercise_submit',
        timestamp: new Date().toISOString(),
        title: `Intento en ${mission.title}`,
        detail: `Respuesta enviada: "${userAnswer}". Procedimiento no converge aún.`,
      };
      setHistory((prev) => [failedHistoryItem, ...prev]);

      return { isCorrect: false, xpGained: 0, leveledUp: false, newBadges: [] };
    }

    // Is Correct!
    const alreadyCompleted = profile.completedMissions.includes(mission.id);
    const xpGained = alreadyCompleted ? Math.round(mission.xpReward * 0.25) : mission.xpReward;
    const newTotalXp = profile.xp + xpGained;

    const currentLevelInfo = getLevelForXp(profile.xp);
    const newLevelInfo = getLevelForXp(newTotalXp);
    const leveledUp = newLevelInfo.level > currentLevelInfo.level;

    const updatedCompletedMissions = alreadyCompleted
      ? profile.completedMissions
      : [...profile.completedMissions, mission.id];

    const isFirstTry = attemptsCount === 1;
    const newFirstTryCount = isFirstTry ? profile.correctFirstTryCount + 1 : profile.correctFirstTryCount;

    // Check Badges
    const newBadges: string[] = [];
    const checkBadge = (badgeId: string, condition: boolean) => {
      if (condition && !profile.badges.includes(badgeId) && !newBadges.includes(badgeId)) {
        newBadges.push(badgeId);
      }
    };

    checkBadge('first_step', true);
    checkBadge('continuity_master', mission.id === 'cont-3');
    checkBadge('tangent_master', mission.id === 'der-def-1' || mission.id === 'der-def-3');
    checkBadge('quotient_rule', mission.id === 'reg-2');
    checkBadge('chain_implicit', mission.id === 'cad-3');
    checkBadge('log_differentiation', mission.id === 'inv-3');
    checkBadge('first_try_streak', newFirstTryCount >= 3);
    checkBadge(
      'grand_archmage',
      WORLDS_DATA.every((w) => w.missions.some((m) => updatedCompletedMissions.includes(m.id)))
    );

    // Audio and Confetti
    if (leveledUp) {
      soundEngine.play('levelUp');
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#8b5cf6', '#3b82f6', '#10b981'],
      });
    } else {
      soundEngine.play('correct');
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#10b981', '#38bdf8', '#fbbf24'],
      });
    }

    if (newBadges.length > 0) {
      setTimeout(() => soundEngine.play('badge'), 400);
    }

    // Save Log Entry in Bitácora
    const newLogEntry: LogEntry = {
      id: 'log-' + Date.now(),
      missionId: mission.id,
      missionTitle: mission.title,
      worldId: mission.worldId,
      worldTitle,
      timestamp: new Date().toISOString(),
      exerciseQuestion: mission.exercise.question,
      userAnswer:
        mission.exercise.type === 'multiple_choice' && mission.exercise.options
          ? (mission.exercise.options.find((o) => o.id === userAnswer)?.text || `Opción ${userAnswer.toUpperCase()}`)
          : userAnswer,
      correctAnswer: mission.exercise.correctAnswer,
      isCorrect: true,
      attemptsCount,
      procedureNotes:
        procedureNotes.trim() ||
        `Aplicación rigurosa del método: ${mission.stepByStepExample.steps.map((s) => s.title).join(' → ')}.`,
      keyLearning: mission.theory.summary,
      commonMistakeAvoided: mission.stepByStepExample.tip,
      userPersonalNote: personalNote?.trim() || undefined,
    };

    setLogbook((prev) => [newLogEntry, ...prev]);

    // Save Activities in History
    const newHistoryItems: HistoryActivity[] = [
      {
        id: 'hist-' + Date.now(),
        type: 'mission_complete',
        timestamp: new Date().toISOString(),
        title: `Misión Superada: ${mission.title}`,
        detail: `Respuesta correcta obtenida en ${attemptsCount} ${attemptsCount === 1 ? 'intento' : 'intentos'}.`,
        xpGained,
      },
    ];

    if (leveledUp) {
      newHistoryItems.push({
        id: 'hist-lvl-' + Date.now(),
        type: 'level_up',
        timestamp: new Date().toISOString(),
        title: `¡Ascenso de Rango: Nivel ${newLevelInfo.level}!`,
        detail: `Has alcanzado el título de "${newLevelInfo.title}".`,
      });
    }

    newBadges.forEach((bId) => {
      const bObj = BADGES_DATA.find((b) => b.id === bId);
      newHistoryItems.push({
        id: 'hist-bdg-' + bId + '-' + Date.now(),
        type: 'badge_unlock',
        timestamp: new Date().toISOString(),
        title: `Insignia Desbloqueada: ${bObj?.title || bId}`,
        detail: bObj?.description || 'Logro alcanzado en la aventura.',
      });
    });

    setHistory((prev) => [...newHistoryItems, ...prev]);

    // Update Profile
    setProfile((prev) => ({
      ...prev,
      xp: newTotalXp,
      level: newLevelInfo.level,
      title: newLevelInfo.title,
      xpToNextLevel: newLevelInfo.nextLevelXp,
      completedMissions: updatedCompletedMissions,
      solvedExercisesCount: prev.solvedExercisesCount + 1,
      correctFirstTryCount: newFirstTryCount,
      badges: [...prev.badges, ...newBadges],
    }));

    return { isCorrect: true, xpGained, leveledUp, newBadges };
  };

  const updateLogPersonalNote = (logId: string, note: string) => {
    setLogbook((prev) =>
      prev.map((entry) => (entry.id === logId ? { ...entry, userPersonalNote: note } : entry))
    );
    soundEngine.play('click');

    // Check if bitacora scholar badge is earned
    const entriesWithNotes = logbook.filter((l) => (l.id === logId ? !!note : !!l.userPersonalNote)).length;
    if (entriesWithNotes >= 2 && !profile.badges.includes('bitacora_scholar')) {
      setProfile((p) => ({ ...p, badges: [...p.badges, 'bitacora_scholar'] }));
      soundEngine.play('badge');
      setHistory((h) => [
        {
          id: 'hist-scholar-' + Date.now(),
          type: 'badge_unlock',
          timestamp: new Date().toISOString(),
          title: 'Insignia Desbloqueada: Cronista Riguroso',
          detail: 'Has incorporado notas personales activas en tu bitácora académica.',
        },
        ...h,
      ]);
    }
  };

  const resetAllProgress = () => {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.LOGBOOK);
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    setProfile(initialProfile);
    setLogbook([]);
    setHistory([
      {
        id: 'reset-' + Date.now(),
        type: 'level_up',
        timestamp: new Date().toISOString(),
        title: 'Aventura Reiniciada',
        detail: 'Se restablecieron todas las marcas y bitácoras.',
      },
    ]);
    soundEngine.play('click');
  };

  const exportBitacoraJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(
        JSON.stringify(
          {
            estudiante: profile.name,
            clase: profile.heroClass,
            rango: profile.title,
            nivel: profile.level,
            xp: profile.xp,
            fechaExportacion: new Date().toLocaleString(),
            bitacora: logbook,
          },
          null,
          2
        )
      );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Bitacora_MathQuest_${profile.name.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const triggerPrintBitacora = () => {
    window.print();
  };

  return (
    <GameContext.Provider
      value={{
        profile,
        logbook,
        history,
        currentMission,
        setCurrentMission,
        activeTab,
        setActiveTab,
        submitExerciseAnswer,
        updateLogPersonalNote,
        updateHeroProfile,
        markVideoWatched,
        isMissionCompletedAndWatched,
        isMissionUnlocked,
        toggleSound,
        resetAllProgress,
        exportBitacoraJSON,
        triggerPrintBitacora,
        unlockedWorldsList,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within a GameProvider');
  return ctx;
};
