export type HeroClass = 'mago' | 'caballero' | 'picara' | 'druida';

export interface HeroProfile {
  name: string;
  title: string;
  heroClass: HeroClass;
  level: number;
  xp: number;
  xpToNextLevel: number;
  completedMissions: string[];
  watchedVideos: string[];
  solvedExercisesCount: number;
  correctFirstTryCount: number;
  unlockedWorlds: string[];
  badges: string[];
  soundEnabled: boolean;
  avatarSeed: string;
}

export interface KeyConcept {
  title: string;
  explanation: string;
}

export interface Formula {
  label: string;
  math: string;
  note: string;
}

export interface SolvedStep {
  stepNum: number;
  title: string;
  calculation: string;
  rationale: string;
}

export interface StepByStepExample {
  problem: string;
  context: string;
  steps: SolvedStep[];
  finalAnswer: string;
  tip: string;
}

export type SimulationType =
  | 'secant_tangent'
  | 'limit_lateral'
  | 'critical_points'
  | 'asymptote_explorer'
  | 'continuity_jump'
  | 'optimization_box';

export interface ExerciseOption {
  id: string;
  text: string;
  math?: string;
}

export interface Exercise {
  id: string;
  question: string;
  mathContext?: string;
  type: 'multiple_choice' | 'numeric';
  options?: ExerciseOption[];
  correctAnswer: string;
  tolerance?: number;
  unit?: string;
  hints: string[];
  fullExplanation: string;
}

export interface Mission {
  id: string;
  worldId: string;
  number: number;
  title: string;
  subtitle: string;
  xpReward: number;
  videoTitle?: string;
  videoDuration?: string;
  theory: {
    summary: string;
    keyConcepts: KeyConcept[];
    formulas: Formula[];
    proTip: string;
  };
  stepByStepExample: StepByStepExample;
  simulationType?: SimulationType;
  exercise: Exercise;
}

export interface World {
  id: string;
  number: number;
  title: string;
  realmName: string;
  subtitle: string;
  description: string;
  color: string;
  accentColor: string;
  requiredXp: number;
  image: string;
  missions: Mission[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  category: 'explorador' | 'maestro' | 'bitacora' | 'racha';
  icon: string;
  conditionDescription: string;
  unlockedAt?: string;
}

export interface LogEntry {
  id: string;
  missionId: string;
  missionTitle: string;
  worldId: string;
  worldTitle: string;
  timestamp: string;
  exerciseQuestion: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  attemptsCount: number;
  procedureNotes: string;
  keyLearning: string;
  commonMistakeAvoided: string;
  userPersonalNote?: string;
}

export interface HistoryActivity {
  id: string;
  type: 'mission_complete' | 'exercise_submit' | 'badge_unlock' | 'level_up' | 'note_added' | 'video_watched';
  timestamp: string;
  title: string;
  detail: string;
  xpGained?: number;
}
