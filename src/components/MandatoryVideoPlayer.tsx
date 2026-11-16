import React, { useEffect, useRef, useState, useId } from 'react';
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
  youtubeId?: string; // ID o URL de YouTube
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

// Extrae ID de YouTube si el usuario coloca una URL completa o el ID directo
const extractYoutubeId = (input?: string): string => {
  if (!input) return '';
  const trimmed = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : '';
};

// Declaración global para la API de YouTube IFrame
declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

const FALLBACK_PREVIEW_DURATION = 10; // Segundos de prueba si aún no se ha colocado un video de YouTube real

export const MandatoryVideoPlayer: React.FC<MandatoryVideoPlayerProps> = ({
  missionId,
  title,
  youtubeId: propYoutubeId,
  durationHint,
  alreadyWatched,
  isExerciseCorrect,
  onVideoEnded,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const maxWatchedTimeRef = useRef<number>(0);
  const ytPlayerRef = useRef<any>(null);
  const ytIframeId = useId().replace(/:/g, '_') + '_yt_player';

  const cleanYtId = extractYoutubeId(propYoutubeId);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [maxWatchedTime, setMaxWatchedTime] = useState(0);
  const [videoCompleted, setVideoCompleted] = useState(alreadyWatched);
  const [cheatWarning, setCheatWarning] = useState<string | null>(null);
  const [isFallbackMode, setIsFallbackMode] = useState(!cleanYtId);

  // Sincronizar cuando cambia de misión
  useEffect(() => {
    maxWatchedTimeRef.current = 0;
    setCurrentTime(0);
    setMaxWatchedTime(0);
    setDuration(0);
    setIsPlaying(false);
    setCheatWarning(null);
    setIsFallbackMode(!cleanYtId);
    setVideoCompleted(alreadyWatched);
  }, [missionId, cleanYtId, alreadyWatched]);

  // Limpiar aviso anti-trampas
  useEffect(() => {
    if (!cheatWarning) return;
    const timer = setTimeout(() => setCheatWarning(null), 3500);
    return () => clearTimeout(timer);
  }, [cheatWarning]);

  // Fallback timer (cuando aún no se ha asignado un ID de YouTube real)
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

  // Cargar YouTube IFrame API
  useEffect(() => {
    if (!cleanYtId) return;

    let pollInterval: NodeJS.Timeout | null = null;

    const initializeYT = () => {
      if (!window.YT || !window.YT.Player) return;

      if (ytPlayerRef.current) {
        try {
          ytPlayerRef.current.destroy();
        } catch {
          // ignore
        }
      }

      ytPlayerRef.current = new window.YT.Player(ytIframeId, {
        videoId: cleanYtId,
        playerVars: {
          autoplay: 0,
          controls: 0, // Desactiva los controles nativos para que no puedan adelantar
          disablekb: 1, // Desactiva teclas de avance rápido
          modestbranding: 1,
          rel: 0,
          fs: 0,
        },
        events: {
          onReady: (event: any) => {
            const d = event.target.getDuration() || 0;
            setDuration(d);
            if (alreadyWatched && d) {
              maxWatchedTimeRef.current = d;
              setMaxWatchedTime(d);
            }
          },
          onStateChange: (event: any) => {
            // YT.PlayerState.PLAYING = 1, PAUSED = 2, ENDED = 0
            if (event.data === 1) {
              setIsPlaying(true);
            } else if (event.data === 2) {
              setIsPlaying(false);
            } else if (event.data === 0) {
              setIsPlaying(false);
              setVideoCompleted(true);
              onVideoEnded();
            }
          },
        },
      });

      // Bucle de monitoreo anti-adelanto con la API de YouTube
      pollInterval = setInterval(() => {
        if (!ytPlayerRef.current || typeof ytPlayerRef.current.getCurrentTime !== 'function') return;

        try {
          const curr = ytPlayerRef.current.getCurrentTime() || 0;
          const dur = ytPlayerRef.current.getDuration() || duration;
          if (dur && duration !== dur) setDuration(dur);

          // Si el usuario intenta adelantar más allá de lo visto legalmente (+1.5s de buffer)
          if (!alreadyWatched && !videoCompleted && curr > maxWatchedTimeRef.current + 1.5) {
            ytPlayerRef.current.seekTo(maxWatchedTimeRef.current, true);
            setCheatWarning('Adelantar el video está bloqueado. Debes verlo completo.');
            return;
          }

          if (curr > maxWatchedTimeRef.current) {
            maxWatchedTimeRef.current = curr;
            setMaxWatchedTime(curr);
          }
          setCurrentTime(curr);
        } catch {
          // Player no listo aún
        }
      }, 300);
    };

    if (window.YT && window.YT.Player) {
      initializeYT();
    } else {
      if (!document.getElementById('youtube-iframe-api-tag')) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api-tag';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
      }
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initializeYT();
      };
    }

    return () => {
      if (pollInterval) clearInterval(pollInterval);
      if (ytPlayerRef.current) {
        try {
          ytPlayerRef.current.destroy();
        } catch {}
      }
    };
  }, [cleanYtId, missionId, alreadyWatched, videoCompleted, onVideoEnded, ytIframeId]);

  const togglePlayPause = () => {
    if (isFallbackMode) {
      if (currentTime >= FALLBACK_PREVIEW_DURATION) {
        setCurrentTime(0);
      }
      setIsPlaying((prev) => !prev);
      return;
    }

    if (!ytPlayerRef.current) return;
    try {
      if (isPlaying) {
        ytPlayerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        ytPlayerRef.current.playVideo();
        setIsPlaying(true);
      }
    } catch {
      // ignore
    }
  };

  const handleRewindTen = () => {
    if (isFallbackMode) {
      setCurrentTime((prev) => Math.max(0, prev - 3));
      return;
    }

    if (!ytPlayerRef.current) return;
    try {
      const curr = ytPlayerRef.current.getCurrentTime() || 0;
      const target = Math.max(0, curr - 10);
      ytPlayerRef.current.seekTo(target, true);
      setCurrentTime(target);
    } catch {}
  };

  const toggleMute = () => {
    if (cleanYtId && ytPlayerRef.current) {
      try {
        if (isMuted) {
          ytPlayerRef.current.unMute();
        } else {
          ytPlayerRef.current.mute();
        }
      } catch {}
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

    if (!alreadyWatched && !videoCompleted && targetTime > maxWatchedTimeRef.current + 0.5) {
      setCheatWarning('No puedes adelantar a una parte que aún no has visto.');
      return;
    }

    if (isFallbackMode) {
      setCurrentTime(targetTime);
    } else if (ytPlayerRef.current) {
      try {
        ytPlayerRef.current.seekTo(targetTime, true);
        setCurrentTime(targetTime);
      } catch {}
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
              : 'Revisa este video explicativo completo para reforzar el procedimiento y luego vuelve a intentarlo.'}
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
        {cleanYtId ? (
          <div className="w-full h-full relative pointer-events-none">
            {/* El iframe de YouTube se inserta aquí; pointer-events-none evita clics directos que salten el control */}
            <div id={ytIframeId} className="w-full h-full" />
          </div>
        ) : (
          <div
            onClick={togglePlayPause}
            className="w-full h-full bg-gradient-to-br from-[#070b18] via-[#121633] to-[#090e1c] flex flex-col items-center justify-center p-6 text-center cursor-pointer relative"
          >
            <div className="max-w-lg space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Modo Demostración (ID de YouTube pendiente de asignar)</span>
              </div>
              <h5 className="font-serif text-xl font-bold text-white">{title}</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Presiona Play para simular la reproducción de {FALLBACK_PREVIEW_DURATION} segundos con bloqueo anti-adelanto.
                Cuando agregues tu ID o enlace de YouTube en <code className="text-amber-400">src/data/videoLinks.ts</code>, se reproducirá aquí automáticamente.
              </p>
            </div>
          </div>
        )}

        {/* Botón flotante Play/Pausa sobre el video */}
        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlayPause}
            aria-label="Reproducir video"
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-amber-500/95 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-amber-500/30 transition-transform hover:scale-105 cursor-pointer z-10"
          >
            <Play className="w-7 h-7 fill-slate-950 ml-0.5" />
          </button>
        )}

        {/* Cheat Warning Toast */}
        {cheatWarning && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-xl bg-rose-950/95 border border-rose-500/60 text-rose-200 text-xs font-semibold flex items-center gap-2 shadow-xl">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{cheatWarning}</span>
          </div>
        )}
      </div>

      {/* Barra de Controles Personalizada Anti-Adelanto */}
      <div className="p-4 bg-[#0b1122] border-t border-slate-800 space-y-3">
        {/* Track de Progreso */}
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
            {/* Límite máximo visto */}
            <div
              className="absolute inset-y-0 left-0 bg-purple-500/35 transition-all duration-150"
              style={{ width: `${videoCompleted ? 100 : watchedPercent}%` }}
            />
            {/* Posición actual */}
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

        {/* Botones de acción */}
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
              title="Retroceder 10 segundos"
            >
              <RotateCcw className="w-3.5 h-3.5 text-purple-300" />
              <span>Retroceder 10s</span>
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

          {/* Enlace externo opcional a YouTube si el usuario quiere abrirlo directamente */}
          {cleanYtId && (
            <a
              href={`https://www.youtube.com/watch?v=${cleanYtId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-red-400 border border-slate-700 text-xs font-medium inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Ver en YouTube</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
