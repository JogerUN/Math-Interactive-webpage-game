import React, { useState } from 'react';

export const CriticalPointsSimulator: React.FC = () => {
  const [xVal, setXVal] = useState<number>(-1.0);

  // Cubic function: f(x) = 0.3 * x^3 - 0.45 * x^2 - 2.7 * x + 2
  // f'(x) = 0.9 * x^2 - 0.9 * x - 2.7 = 0.9(x^2 - x - 3)
  // Let's use clean numbers:
  // f(x) = (1/3)*x^3 - x^2 - 3x + 4
  // f'(x) = x^2 - 2x - 3 = (x - 3)(x + 1)
  // Local Max at x = -1, Local Min at x = 3
  const f = (x: number) => (1 / 3) * Math.pow(x, 3) - Math.pow(x, 2) - 3 * x + 4;
  const fPrime = (x: number) => Math.pow(x, 2) - 2 * x - 3;
  const fDoublePrime = (x: number) => 2 * x - 2;

  const yVal = f(xVal);
  const slope = fPrime(xVal);
  const concavity = fDoublePrime(xVal);

  const isNearMax = Math.abs(xVal - (-1)) < 0.15;
  const isNearMin = Math.abs(xVal - 3) < 0.15;
  const isNearInflection = Math.abs(xVal - 1) < 0.15;

  const width = 560;
  const height = 280;
  const xMin = -3.2;
  const xMax = 5.2;
  const yMin = -7.5;
  const yMax = 8.5;

  const toSvgX = (x: number) => ((x - xMin) / (xMax - xMin)) * width;
  const toSvgY = (y: number) => height - ((y - yMin) / (yMax - yMin)) * height;

  // Generate curve points
  const points: string[] = [];
  const steps = 80;
  for (let i = 0; i <= steps; i++) {
    const x = xMin + (i / steps) * (xMax - xMin);
    const y = f(x);
    points.push(`${toSvgX(x)},${toSvgY(y)}`);
  }
  const curvePath = `M ${points.join(' L ')}`;

  // Moving tangent line segment centered on current point
  const dx = 1.2;
  const tanX1 = xVal - dx;
  const tanY1 = yVal - slope * dx;
  const tanX2 = xVal + dx;
  const tanY2 = yVal + slope * dx;

  return (
    <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-4 text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div>
          <h4 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
            <span>⛰️ Detector de Relieve:</span> Puntos Críticos y Criterio de la 1ª y 2ª Derivada
          </h4>
          <p className="text-xs text-slate-400">
            Desplaza el explorador a lo largo de la curva para observar el velocímetro de la pendiente f'(x).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setXVal(-1)}
            className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-amber-400 rounded border border-amber-500/30 font-mono transition-colors cursor-pointer"
          >
            Ir a Máximo (x = -1)
          </button>
          <button
            onClick={() => setXVal(3)}
            className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded border border-cyan-500/30 font-mono transition-colors cursor-pointer"
          >
            Ir a Mínimo (x = 3)
          </button>
        </div>
      </div>

      <div className="relative w-full overflow-hidden bg-slate-950/80 rounded-lg border border-slate-800 p-2">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto max-h-[260px]">
          {/* Coordinate axes */}
          <line x1={0} y1={toSvgY(0)} x2={width} y2={toSvgY(0)} stroke="#334155" strokeWidth="1.5" />
          <line x1={toSvgX(0)} y1={0} x2={toSvgX(0)} y2={height} stroke="#334155" strokeWidth="1.5" />

          {/* Critical Point Guide Markers */}
          <circle cx={toSvgX(-1)} cy={toSvgY(f(-1))} r="6" fill="#f59e0b" fillOpacity="0.4" stroke="#f59e0b" strokeDasharray="2,2" />
          <text x={toSvgX(-1) - 30} y={toSvgY(f(-1)) - 10} fill="#f59e0b" fontSize="11" fontWeight="bold">
            Máx (-1, 5.67)
          </text>

          <circle cx={toSvgX(3)} cy={toSvgY(f(3))} r="6" fill="#38bdf8" fillOpacity="0.4" stroke="#38bdf8" strokeDasharray="2,2" />
          <text x={toSvgX(3) - 20} y={toSvgY(f(3)) + 18} fill="#38bdf8" fontSize="11" fontWeight="bold">
            Mín (3, -5.0)
          </text>

          {/* Curve */}
          <path d={curvePath} fill="none" stroke="#818cf8" strokeWidth="2.5" />

          {/* Current Tangent Line */}
          <line
            x1={toSvgX(tanX1)}
            y1={toSvgY(tanY1)}
            x2={toSvgX(tanX2)}
            y2={toSvgY(tanY2)}
            stroke={Math.abs(slope) < 0.2 ? '#10b981' : slope > 0 ? '#38bdf8' : '#f43f5e'}
            strokeWidth="3"
          />

          {/* Current Explorer point */}
          <circle
            cx={toSvgX(xVal)}
            cy={toSvgY(yVal)}
            r="7"
            fill={Math.abs(slope) < 0.2 ? '#10b981' : '#f59e0b'}
            stroke="#0f172a"
            strokeWidth="2.5"
          />
        </svg>
      </div>

      {/* Slider */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-slate-300">Posición del explorador x:</span>
          <span className="tabular-nums font-bold text-amber-400">{xVal.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="-2.8"
          max="4.8"
          step="0.05"
          value={xVal}
          onChange={(e) => setXVal(parseFloat(e.target.value))}
          className="w-full accent-amber-400 cursor-pointer"
        />
      </div>

      {/* Real-time derivative readouts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800">
          <div className="text-slate-400 mb-1">Altura de la Curva:</div>
          <div className="text-sm font-bold text-slate-100 tabular-nums">f(x) = {yVal.toFixed(2)}</div>
        </div>

        <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800">
          <div className="text-slate-400 mb-1">Pendiente 1ª Derivada:</div>
          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-bold tabular-nums ${
                Math.abs(slope) < 0.1 ? 'text-emerald-400' : slope > 0 ? 'text-sky-400' : 'text-rose-400'
              }`}
            >
              f'(x) = {slope.toFixed(2)}
            </span>
            <span className="text-[11px] text-slate-400">
              {Math.abs(slope) < 0.1 ? '(Horizontal 🎯)' : slope > 0 ? '(Creciente ↗)' : '(Decreciente ↘)'}
            </span>
          </div>
        </div>

        <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800">
          <div className="text-slate-400 mb-1">Curvatura 2ª Derivada:</div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-purple-400 tabular-nums">f''(x) = {concavity.toFixed(2)}</span>
            <span className="text-[11px] text-slate-400">
              {concavity > 0 ? '(Cóncava ∪)' : concavity < 0 ? '(Convexa ∩)' : '(Inflexión)'}
            </span>
          </div>
        </div>
      </div>

      {/* Special status highlight */}
      {(isNearMax || isNearMin || isNearInflection) && (
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs flex items-center justify-between text-amber-200">
          <span className="font-semibold">
            {isNearMax
              ? '🎯 ¡Punto Crítico Detectado! f\'(x) = 0 y f\'\'(x) < 0 ⇒ MÁXIMO LOCAL en x = -1'
              : isNearMin
              ? '🎯 ¡Punto Crítico Detectado! f\'(x) = 0 y f\'\'(x) > 0 ⇒ MÍNIMO LOCAL en x = 3'
              : '🌀 ¡Punto de Inflexión Detectado! f\'\'(x) = 0 ⇒ Cambio de concavidad en x = 1'}
          </span>
        </div>
      )}
    </div>
  );
};
