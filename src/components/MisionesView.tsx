import React, { useState, useEffect } from 'react';
import {
  Swords,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Sparkles,
  ChevronRight,
  Send,
  FileText,
  Lock,
  ArrowRight,
  Video,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { WORLDS_DATA } from '../data/missionsData';
import { Mission } from '../types';
import { SecantTangentSimulator } from './simulators/SecantTangentSimulator';
import { LimitLateralSimulator } from './simulators/LimitLateralSimulator';
import { CriticalPointsSimulator } from './simulators/CriticalPointsSimulator';
import { AsymptoteExplorerSimulator } from './simulators/AsymptoteExplorerSimulator';
import { MathBlock, MathText } from './MathView';
import { MandatoryVideoPlayer } from './MandatoryVideoPlayer';

export const MisionesView: React.FC = () => {
  const {
    profile,
    currentMission,
    setCurrentMission,
    submitExerciseAnswer,
    markVideoWatched,
    isMissionUnlocked,
    isMissionCompletedAndWatched,
    setActiveTab,
  } = useGame();

  // Selected world & mission
  const [selectedWorldId, setSelectedWorldId] = useState<string>(
    currentMission ? currentMission.worldId : WORLDS_DATA[0].id
  );
  const activeWorld = WORLDS_DATA.find((w) => w.id === selectedWorldId) || WORLDS_DATA[0];

  const [activeMission, setActiveMission] = useState<Mission>(
    currentMission || activeWorld.missions[0]
  );

  // Sync when currentMission changes from outside
  useEffect(() => {
    if (currentMission) {
      setSelectedWorldId(currentMission.worldId);
      setActiveMission(currentMission);
    }
  }, [currentMission]);

  // Exercise interaction state
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);
  const [hintsUnlocked, setHintsUnlocked] = useState<number>(0);
  const [hasSubmittedAnswer, setHasSubmittedAnswer] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{
    status: 'idle' | 'success' | 'error';
    message: string;
    xpGained?: number;
    newBadges?: string[];
  }>({ status: 'idle', message: '' });

  // Optional student notes during exercise
  const [studentProcedure, setStudentProcedure] = useState<string>('');
  const [studentReflection, setStudentReflection] = useState<string>('');

  // Reset exercise states when switching missions
  useEffect(() => {
    setUserAnswer('');
    setAttempts(0);
    setHintsUnlocked(0);
    setHasSubmittedAnswer(false);
    setFeedback({ status: 'idle', message: '' });
    setStudentProcedure('');
    setStudentReflection('');
  }, [activeMission.id]);

  const isCompleted = profile.completedMissions.includes(activeMission.id);
  const isVideoWatched = profile.watchedVideos.includes(activeMission.id);
  const canAdvanceToNext = isCompleted && isVideoWatched;
  const shouldShowVideo = hasSubmittedAnswer || isCompleted || isVideoWatched;

  // Locate next sequential mission across all worlds
  const orderedMissions = WORLDS_DATA.flatMap((w) => w.missions);
  const currentFlatIndex = orderedMissions.findIndex((m) => m.id === activeMission.id);
  const nextMission =
    currentFlatIndex >= 0 && currentFlatIndex < orderedMissions.length - 1
      ? orderedMissions[currentFlatIndex + 1]
      : null;

  const handleVerifyAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    const currentAttempts = attempts + 1;
    setAttempts(currentAttempts);
    setHasSubmittedAnswer(true);

    const result = submitExerciseAnswer(
      activeMission,
      userAnswer,
      currentAttempts,
      studentProcedure,
      studentReflection
    );

    if (result.isCorrect) {
      setFeedback({
        status: 'success',
        message: `¡Respuesta Correcta! Has demostrado rigurosidad analítica. Ganaste +${result.xpGained} XP.`,
        xpGained: result.xpGained,
        newBadges: result.newBadges,
      });
    } else {
      setFeedback({
        status: 'error',
        message:
          'El resultado no coincide con la solución exacta. Revisa el video explicativo obligatorio y vuelve a intentarlo.',
      });
    }
  };

  const handleAdvanceMission = () => {
    if (!canAdvanceToNext || !nextMission) return;
    setSelectedWorldId(nextMission.worldId);
    setActiveMission(nextMission);
    setCurrentMission(nextMission);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUnlockHint = () => {
    if (hintsUnlocked < activeMission.exercise.hints.length) {
      setHintsUnlocked((prev) => prev + 1);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Selector Bar: World and Mission Tabs */}
      <div className="space-y-3 bg-[#080d1a] border border-slate-800 p-4 rounded-2xl">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span className="uppercase tracking-wider">Selecciona Reino del Cálculo:</span>
          <span>{WORLDS_DATA.filter((w) => profile.xp >= w.requiredXp).length} Reinos Disponibles</span>
        </div>

        {/* Worlds buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {WORLDS_DATA.map((world) => {
            const firstMissionUnlocked = isMissionUnlocked(world.missions[0].id);
            const isUnlocked = profile.xp >= world.requiredXp && firstMissionUnlocked;
            const isSelected = selectedWorldId === world.id;

            return (
              <button
                key={world.id}
                disabled={!isUnlocked}
                onClick={() => {
                  if (!isUnlocked) return;
                  setSelectedWorldId(world.id);
                  const accessibleMission =
                    world.missions.find((m) => isMissionUnlocked(m.id) && !isMissionCompletedAndWatched(m.id)) ||
                    world.missions[0];
                  setActiveMission(accessibleMission);
                  setCurrentMission(accessibleMission);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all shrink-0 border ${
                  isSelected
                    ? 'bg-purple-900/60 border-amber-400 text-white shadow-md cursor-pointer'
                    : isUnlocked
                    ? 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800 cursor-pointer'
                    : 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-60 cursor-not-allowed'
                }`}
              >
                {!isUnlocked && <Lock className="w-3 h-3 text-slate-600" />}
                <span>0{world.number}. {world.realmName}</span>
              </button>
            );
          })}
        </div>

        {/* Missions in current world */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80 overflow-x-auto scrollbar-none">
          {activeWorld.missions.map((m) => {
            const isMUnlocked = isMissionUnlocked(m.id);
            const isMFullyPassed = isMissionCompletedAndWatched(m.id);
            const isSelected = activeMission.id === m.id;

            return (
              <button
                key={m.id}
                disabled={!isMUnlocked}
                onClick={() => {
                  if (!isMUnlocked) return;
                  setActiveMission(m);
                  setCurrentMission(m);
                }}
                title={
                  !isMUnlocked
                    ? 'Responde bien la misión anterior y mira su video completo para desbloquear'
                    : m.title
                }
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-all shrink-0 border ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-semibold cursor-pointer'
                    : isMFullyPassed
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400 cursor-pointer'
                    : isMUnlocked
                    ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer'
                    : 'bg-slate-950/60 border-slate-900 text-slate-600 opacity-60 cursor-not-allowed'
                }`}
              >
                {isMFullyPassed ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : !isMUnlocked ? (
                  <Lock className="w-3 h-3 text-slate-600" />
                ) : null}
                <span>{m.title.split(':')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Mission Header */}
      <div className="bg-[#090e1c] border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <span className="bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded">
                {activeWorld.realmName}
              </span>
              <span>·</span>
              <span className="text-purple-300">
                <MathText text={activeMission.subtitle} />
              </span>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-black text-white">
              {activeMission.title}
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {isCompleted ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Misión Completada</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl text-xs font-mono font-bold">
                <Sparkles className="w-4 h-4" />
                <span>+{activeMission.xpReward} XP Recompensa</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4 Pillars of the Mission: Theory, Formulas, Step Example, Simulator & Challenge */}
      <div className="space-y-8">
        {/* Pillar 1: Theoretical Foundation & Key Concepts */}
        <div className="bg-[#0b1020] border border-slate-800/90 rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <h3 className="font-serif font-bold text-lg text-white">
              1. Fundamento Teórico & Conceptos Clave
            </h3>
          </div>

          <div className="text-sm text-slate-300 leading-relaxed">
            <MathText text={activeMission.theory.summary} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeMission.theory.keyConcepts.map((concept, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-xl space-y-1.5"
              >
                <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <MathText text={concept.title} />
                </div>
                <div className="text-xs text-slate-400 leading-relaxed">
                  <MathText text={concept.explanation} />
                </div>
              </div>
            ))}
          </div>

          {/* Formulas Display */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              Fórmulas y Teoremas Fundamentales:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeMission.theory.formulas.map((form, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-purple-950/20 border border-purple-500/30 rounded-xl space-y-2"
                >
                  <div className="text-xs font-semibold text-purple-300">{form.label}</div>
                  <div className="p-3 bg-slate-950/80 rounded-lg border border-purple-500/20 text-center text-sm font-bold text-amber-300 tracking-wide overflow-x-auto">
                    <MathBlock math={form.math} />
                  </div>
                  <div className="text-[11px] text-slate-400">
                    <MathText text={form.note} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tip */}
          <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200 flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-300">Consejo del Archimago: </span>
              <MathText text={activeMission.theory.proTip} />
            </div>
          </div>
        </div>

        {/* Pillar 2: Solved Step-by-Step Example */}
        <div className="bg-[#0b1020] border border-slate-800/90 rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h3 className="font-serif font-bold text-lg text-white">
              2. Ejemplo Resuelto Paso a Paso
            </h3>
          </div>

          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
            <div className="text-xs font-mono uppercase text-cyan-400 font-bold">Problema Modelo:</div>
            <div className="text-sm font-semibold text-white">
              <MathText text={activeMission.stepByStepExample.problem} />
            </div>
            <div className="text-xs text-slate-400">
              <MathText text={activeMission.stepByStepExample.context} />
            </div>
          </div>

          {/* Steps List */}
          <div className="space-y-3">
            {activeMission.stepByStepExample.steps.map((step) => (
              <div
                key={step.stepNum}
                className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                    {step.stepNum}
                  </span>
                  <span className="text-xs font-bold text-slate-200">
                    <MathText text={step.title} />
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 text-xs text-cyan-300 overflow-x-auto">
                  <MathBlock math={step.calculation} />
                </div>

                <div className="text-xs text-slate-400 pl-8">
                  <MathText text={step.rationale} />
                </div>
              </div>
            ))}
          </div>

          {/* Final Answer of Example */}
          <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div>
              <span className="font-bold text-emerald-400">Resultado Final: </span>
              <span className="text-white font-semibold">
                <MathText text={activeMission.stepByStepExample.finalAnswer} />
              </span>
            </div>
            <div className="text-slate-400 italic">
              <MathText text={activeMission.stepByStepExample.tip} />
            </div>
          </div>
        </div>

        {/* Pillar 3: Interactive Simulation Sandbox */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif font-bold text-lg text-white">
              3. Laboratorio Gráfico Interactivo
            </h3>
          </div>

          {activeMission.simulationType === 'secant_tangent' ? (
            <SecantTangentSimulator />
          ) : activeMission.simulationType === 'limit_lateral' ? (
            <LimitLateralSimulator />
          ) : activeMission.simulationType === 'critical_points' ? (
            <CriticalPointsSimulator />
          ) : (
            <AsymptoteExplorerSimulator />
          )}
        </div>

        {/* Pillar 4: The Interactive Quest Challenge */}
        <div className="bg-[#0b1020] border-2 border-purple-500/40 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Swords className="w-5 h-5 text-amber-400" />
              <h3 className="font-serif font-bold text-lg text-white">
                4. Desafío Práctico Interactivo
              </h3>
            </div>
            <div className="text-xs font-mono text-slate-400">
              Intentos realizados: <span className="text-amber-400 font-bold tabular-nums">{attempts}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold text-white">
              <MathText text={activeMission.exercise.question} />
            </div>

            {activeMission.exercise.mathContext && (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center text-base font-bold text-purple-300 overflow-x-auto">
                <MathBlock math={activeMission.exercise.mathContext} />
              </div>
            )}
          </div>

          {/* Exercise Form */}
          <form onSubmit={handleVerifyAnswer} className="space-y-4">
            {activeMission.exercise.type === 'multiple_choice' && activeMission.exercise.options ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeMission.exercise.options.map((opt) => {
                  const isSelected = userAnswer === opt.id;
                  return (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => setUserAnswer(opt.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-purple-950/70 border-amber-400 text-white shadow-md'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-xs uppercase shrink-0 ${
                            isSelected
                              ? 'bg-amber-400 text-slate-950'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                        >
                          {opt.id}
                        </span>
                        <span className="text-xs font-semibold">
                          <MathText text={opt.text} />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">
                  Introduce tu respuesta numérica:
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Ejemplo: 4 o 1.5"
                    className="max-w-xs px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-amber-400"
                  />
                  {activeMission.exercise.unit && (
                    <span className="text-xs font-mono text-slate-400">
                      {activeMission.exercise.unit}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Optional student procedure & personal notes to feed directly into the Bitácora */}
            <div className="pt-2 border-t border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                  Registro de Procedimiento para tu Bitácora (Opcional):
                </span>
              </div>
              <textarea
                value={studentProcedure}
                onChange={(e) => setStudentProcedure(e.target.value)}
                placeholder="Anota tu procedimiento o fórmula utilizada para archivarlo en tu Bitácora Académica..."
                rows={2}
                className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-purple-400 resize-none font-mono"
              />

              <input
                type="text"
                value={studentReflection}
                onChange={(e) => setStudentReflection(e.target.value)}
                placeholder="Reflexión o error que aprendiste a evitar en este ejercicio..."
                className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-purple-400 font-mono"
              />
            </div>

            {/* Action Buttons & Hints Trigger */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={!userAnswer.trim()}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-40"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Verificar Respuesta</span>
                </button>

                <button
                  type="button"
                  onClick={handleUnlockHint}
                  disabled={hintsUnlocked >= activeMission.exercise.hints.length}
                  className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>
                    {hintsUnlocked === 0
                      ? 'Solicitar Pista'
                      : `Pista Siguiente (${hintsUnlocked}/${activeMission.exercise.hints.length})`}
                  </span>
                </button>
              </div>

              {isCompleted && (
                <button
                  type="button"
                  onClick={() => setActiveTab('bitacora')}
                  className="text-xs text-purple-300 hover:text-amber-300 font-medium cursor-pointer"
                >
                  Ver este ejercicio en Mi Bitácora →
                </button>
              )}
            </div>
          </form>

          {/* Feedback Display */}
          {feedback.status === 'success' && (
            <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-emerald-200 space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-400">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>{feedback.message}</span>
              </div>
              <div className="text-xs text-slate-300 leading-relaxed pt-1">
                <MathText text={activeMission.exercise.fullExplanation} />
              </div>
            </div>
          )}

          {feedback.status === 'error' && (
            <div className="p-4 bg-rose-950/40 border border-rose-500/40 rounded-xl text-rose-200 space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-bold text-sm text-rose-400">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{feedback.message}</span>
              </div>
              <p className="text-xs text-slate-400">
                Puedes desbloquear una pista de apoyo o revisar el ejemplo resuelto paso a paso arriba.
              </p>
            </div>
          )}

          {/* Progressive Hints Box */}
          {hintsUnlocked > 0 && (
            <div className="p-4 bg-slate-950 border border-amber-500/30 rounded-xl space-y-2.5 animate-fade-in">
              <div className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" />
                <span>Pistas de Apoyo Desbloqueadas:</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                {activeMission.exercise.hints.slice(0, hintsUnlocked).map((hint, i) => (
                  <li key={i} className="leading-relaxed">
                    <span className="font-semibold text-amber-300 font-mono">Pista {i + 1}: </span>
                    <MathText text={hint} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Mandatory Video Triggered After Answer (Correct OR Incorrect) */}
          {shouldShowVideo && (
            <div className="pt-4 border-t border-slate-800 space-y-5">
              <MandatoryVideoPlayer
                missionId={activeMission.id}
                title={activeMission.videoTitle || `Explicación de ${activeMission.title}`}
                videoUrl={activeMission.videoUrl}
                driveRedirectUrl={VIDEO_LINKS_MAP[activeMission.id]?.driveUrl || `/api/videos/${activeMission.id}/redirect`}
                durationHint={activeMission.videoDuration}
                alreadyWatched={isVideoWatched}
                isExerciseCorrect={isCompleted}
                onVideoEnded={() => markVideoWatched(activeMission)}
              />

              {/* Mission Progression Gate (Locked until BOTH correct answer AND video onEnded) */}
              <div className="p-5 bg-slate-950/90 border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Requisitos para avanzar a la siguiente misión:
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs">
                    <span
                      className={`inline-flex items-center gap-1.5 font-semibold ${
                        isCompleted ? 'text-emerald-400' : 'text-amber-300'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 shrink-0" />
                      )}
                      <span>1. Respuesta correcta en el ejercicio</span>
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 font-semibold ${
                        isVideoWatched ? 'text-emerald-400' : 'text-amber-300'
                      }`}
                    >
                      {isVideoWatched ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                      ) : (
                        <Video className="w-3.5 h-3.5 shrink-0" />
                      )}
                      <span>2. Video visto en su totalidad</span>
                    </span>
                  </div>
                </div>

                {nextMission ? (
                  <button
                    type="button"
                    disabled={!canAdvanceToNext}
                    onClick={handleAdvanceMission}
                    className={`px-5 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all whitespace-nowrap shrink-0 ${
                      canAdvanceToNext
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 cursor-pointer'
                        : 'bg-slate-900 border border-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {canAdvanceToNext ? (
                      <>
                        <span>Avanzar a la Siguiente Misión</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Siguiente Misión Bloqueada</span>
                      </>
                    )}
                  </button>
                ) : canAdvanceToNext ? (
                  <div className="px-4 py-2.5 rounded-xl bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>¡Has completado todas las misiones de MathQuest!</span>
                  </div>
                ) : (
                  <div className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 text-xs font-semibold flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Completa ambos requisitos para finalizar</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
