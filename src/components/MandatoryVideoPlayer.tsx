import React, { useEffect, useRef, useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Lock,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Video,
  ShieldAlert,
} from 'lucide-react';

interface MandatoryVideoPlayerProps {
  missionId: string;
  title: string;
  videoUrl: string;
  driveRedirectUrl: string;
  durationHint?: string;
  alreadyWatched: boolean;
  isExerciseCorrect: boolean;
  onVideoEnded: () => void;
}

const formatSeconds = (sec: number): string => {
  if (!Number.isFinite(sec) || sec < 0) return '00:00';
  const mins = Math.floor(sec / 60);
  const secs = Math.floor(sec % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const FALLBACK_PREVIEW_DURATION = 10; // segundos en modo demostración si aún no hay MP4 real en Firebase Storage

export const MandatoryVideoPlayer: React.FC<MandatoryVideoPlayerProps> = ({
  missionId,
  title,
  videoUrl,
  driveRedirectUrl,
  durationHint,
  alreadyWatched,
  isExerciseCorrect,
  onVideoEnded,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const maxWatchedTimeRef = useRef<number>(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [maxWatchedTime, setMaxWatchedTime] = useState(0);
  const [videoCompleted, setVideoCompleted] = useState(alreadyWatched);
  const [cheatWarning, setCheatWarning] = useState<string | null>(null);
  const [isFallbackMode, setIsFallbackMode] = useState(false);

  // Sincronizar cuando cambia la misión o ya fue visto previamente
  useEffect(() => {
    maxWatchedTimeRef.current = 0;
    setCurrentTime(0);
    setMaxWatchedTime(0);
    setDuration(0);
    setIsPlaying(false);
    setCheatWarning(null);
    setIsFallbackMode(false);
    setVideoCompleted(alreadyWatched);
  }, [missionId, videoUrl, alreadyWatched]);

  // Limpiar aviso anti-trampas después de 3.5s
  useEffect(() => {
    if (!cheatWarning) return;
    const timer = setTimeout(() => setCheatWarning(null), 3500);
    return () => clearTimeout(timer);
  }, [cheatWarning]);

  // Motor de reproducción de respaldo (solo cuando el MP4 de Firebase aún no existe en el bucket)
  useEffect(() => {
    if (!isFallbackMode || !isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        const next = Math.min(FALLBACK_PREVIEW_DURATION, prev + 0.25);
        if (next > maxWatchedTimeRef.current) {
          maxWatchedTimeRef.current = next;
          setMaxWatchedTime(next);
        }
        if (next >= FALLBACK_PREVIEW_DURATION) {
          setIsPlaying(false);
          setVideoCompleted(true);
          onVideoEnded();
        }
        return next;
      });
    }, 250);

    return () => clearInterval(interval);
  }, [isFallbackMode, isPlaying, onVideoEnded]);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    setDuration(video.duration || 0);
    if (alreadyWatched && video.duration) {
      maxWatchedTimeRef.current = video.duration;
      setMaxWatchedTime(video.duration);
    }
  };

  // Control estricto anti-adelanto en onTimeUpdate
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    // Si el usuario ya completó el video previamente, puede navegar libremente
    if (alreadyWatched || videoCompleted) {
      setCurrentTime(video.currentTime);
      return;
    }

    // Si intenta avanzar más allá del máximo reproducido legítimamente (+1.5s de margen)
    if (video.currentTime > maxWatchedTimeRef.current + 1.5) {
      video.currentTime = maxWatchedTimeRef.current;
      setCheatWarning('No está permitido adelantar el video explicativo.');
      return;
    }

    if (video.currentTime > maxWatchedTimeRef.current) {
      maxWatchedTimeRef.current = video.currentTime;
      setMaxWatchedTime(video.currentTime);
    }
    setCurrentTime(video.currentTime);
  };

  // Bloqueo adicional si se dispara seeking por teclado o herramientas del navegador
  const handleSeeking = () => {
    const video = videoRef.current;
    if (!video || alreadyWatched || videoCompleted) return;

    if (video.currentTime > maxWatchedTimeRef.current + 0.5) {
      video.currentTime = maxWatchedTimeRef.current;
      setCheatWarning('Adelantar está bloqueado. Debes completar el video sin saltos.');
    }
  };

  // Evitar aceleración > 1x desde consola o atajos
  const handleRateChange = () => {
    const video = videoRef.current;
    if (!video || alreadyWatched || videoCompleted) return;

    if (video.playbackRate > 1) {
      video.playbackRate = 1;
      setCheatWarning('La velocidad de reproducción máxima permitida es 1.0x.');
    }
  };

  const handleEnded = () => {
    const video = videoRef.current;
    const total = video?.duration || duration;
    if (total) {
      maxWatchedTimeRef.current = total;
      setMaxWatchedTime(total);
      setCurrentTime(total);
    }
    setIsPlaying(false);
    setVideoCompleted(true);
    onVideoEnded();
  };

  const handleVideoError = () => {
    // Si la URL placeholder de Firebase Storage aún no tiene un archivo MP4 subido
    setIsFallbackMode(true);
    setDuration(FALLBACK_PREVIEW_DURATION);
    if (alreadyWatched) {
      maxWatchedTimeRef.current = FALLBACK_PREVIEW_DURATION;
      setMaxWatchedTime(FALLBACK_PREVIEW_DURATION);
    }
  };

  const togglePlayPause = () => {
    if (isFallbackMode) {
      if (currentTime >= FALLBACK_PREVIEW_DURATION) {
        setCurrentTime(0);
      }
      setIsPlaying((prev) => !prev);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleRewindTen = () => {
    if (isFallbackMode) {
      setCurrentTime((prev) => Math.max(0, prev - 3));
      return;
    }

    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, video.currentTime - 10);
    setCurrentTime(video.currentTime);
  };

  const toggleMute = () => {
    if (!isFallbackMode && videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
    setIsMuted((prev) => !prev);
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      containerRef.current.requestFullscreen?.().catch(() => {});
    }
  };

  const handleSeekBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const effectiveDuration = isFallbackMode ? FALLBACK_PREVIEW_DURATION : duration;
    if (!effectiveDuration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetTime = clickRatio * effectiveDuration;

    // Solo permite retroceder o ir dentro de lo ya visto legítimamente
    if (!alreadyWatched && !videoCompleted && targetTime > maxWatchedTimeRef.current + 0.25) {
      setCheatWarning('No puedes adelantar a una parte que aún no has visto.');
      return;
    }

    if (isFallbackMode) {
      setCurrentTime(targetTime);
    } else if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  const effectiveDuration = isFallbackMode ? FALLBACK_PREVIEW_DURATION : duration;
  const currentPercent =
    effectiveDuration > 0 ? Math.min(100, (currentTime / effectiveDuration) * 100) : 0;
  const watchedPercent =
    effectiveDuration > 0 ? Math.min(100, (maxWatchedTime / effectiveDuration) * 100) : 0;

  return (
    <div
      ref={containerRef}
      className="bg-[#080d1a] border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl space-y-0 animate-fade-in"
    >
      {/* Video Header */}
      <div className="px-5 py-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0b1122]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <Video className="w-4 h-4 shrink-0" />
            <span>REPRODUCCIÓN OBLIGATORIA · SIN ADELANTO</span>
          </div>
          <h4 className="font-serif font-bold text-base text-white">{title}</h4>
          <p className="text-xs text-slate-400">
            {isExerciseCorrect
              ? 'Respondiste correctamente. Completa este video explicativo para desbloquear la siguiente misión.'
              : 'Revisa este video explicativo completo para reforzar el procedimiento y luego intenta responder correctamente.'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {videoCompleted ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-semibold whitespace-nowrap">
              <CheckCircle2 className="w-4 h-4" />
              Video Completado
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-semibold whitespace-nowrap">
              <Lock className="w-3.5 h-3.5" />
              Requisito Pendiente
            </span>
          )}
        </div>
      </div>

      {/* Video Stage */}
      <div className="relative bg-black aspect-video w-full flex items-center justify-center overflow-hidden select-none">
        {!isFallbackMode ? (
          <video
            ref={videoRef}
            src={videoUrl}
            playsInline
            controls={false}
            controlsList="nodownload noplaybackrate"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onSeeking={handleSeeking}
            onRateChange={handleRateChange}
            onEnded={handleEnded}
            onError={handleVideoError}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onClick={togglePlayPause}
            className="w-full h-full object-contain cursor-pointer"
          />
        ) : (
          <div
            onClick={togglePlayPause}
            className="w-full h-full bg-gradient-to-br from-[#070b18] via-[#121633] to-[#090e1c] flex flex-col items-center justify-center p-6 text-center cursor-pointer relative"
          >
            <div className="max-w-lg space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Vista previa local (archivo MP4 pendiente en Firebase Storage)</span>
              </div>
              <h5 className="font-serif text-xl font-bold text-white">{title}</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Presiona Play para simular la reproducción obligatoria de {FALLBACK_PREVIEW_DURATION} segundos
                con bloqueo estricto de adelanto. Cuando cargues tu archivo real en Firebase Storage, se reproducirá automáticamente aquí.
              </p>
              <div className="text-[11px] font-mono text-slate-400 break-all bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2">
                Origen esperado: {videoUrl}
              </div>
            </div>
          </div>
        )}

        {/* Overlay Play button when paused */}
        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlayPause}
            aria-label="Reproducir video"
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-amber-500/95 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-amber-500/30 transition-transform hover:scale-105 cursor-pointer"
          >
            <Play className="w-7 h-7 fill-slate-950 ml-0.5" />
          </button>
        )}

        {/* Anti-cheat Warning Toast inside video frame */}
        {cheatWarning && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-xl bg-rose-950/95 border border-rose-500/60 text-rose-200 text-xs font-semibold flex items-center gap-2 shadow-xl">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{cheatWarning}</span>
          </div>
        )}
      </div>

      {/* Custom Non-Skippable Control Bar */}
      <div className="p-4 bg-[#0b1122] border-t border-slate-800 space-y-3">
        {/* Progress / Safe-Seek Track */}
        <div className="space-y-1.5">
          <div
            role="slider"
            aria-label="Progreso del video (solo retroceso permitido)"
            aria-valuemin={0}
            aria-valuemax={Math.round(effectiveDuration || 100)}
            aria-valuenow={Math.round(currentTime)}
            tabIndex={0}
            onClick={handleSeekBarClick}
            className="relative h-2.5 w-full bg-slate-900 rounded-full border border-slate-800 cursor-pointer overflow-hidden"
            title="Puedes retroceder a segmentos ya vistos, pero no adelantar"
          >
            {/* Max watched limit bar */}
            <div
              className="absolute inset-y-0 left-0 bg-purple-500/35 transition-all duration-150"
              style={{ width: `${videoCompleted ? 100 : watchedPercent}%` }}
            />
            {/* Current playback position */}
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-150"
              style={{ width: `${currentPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 tabular-nums">
            <span>
              {formatSeconds(currentTime)} /{' '}
              {effectiveDuration > 0 ? formatSeconds(effectiveDuration) : durationHint || '01:40'}
            </span>
            <span>
              {videoCompleted
                ? '100% completado · Navegación libre'
                : `Progreso validado: ${Math.round(watchedPercent)}% (Adelanto bloqueado)`}
            </span>
          </div>
        </div>

        {/* Action Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlayPause}
              className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pausar' : 'Reproducir'}</span>
            </button>

            <button
              type="button"
              onClick={handleRewindTen}
              className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              title="Retroceder para repasar"
            >
              <RotateCcw className="w-3.5 h-3.5 text-purple-300" />
              <span>Retroceder</span>
            </button>

            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={handleFullscreen}
              aria-label="Pantalla completa"
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Endpoint link to redirect to Google Drive video */}
          <a
            href={driveRedirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 text-xs font-medium inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            title="Endpoint de redirección hacia Google Drive"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Enlace externo (Drive)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
