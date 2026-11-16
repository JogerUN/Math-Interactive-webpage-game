import React, { useState } from 'react';

interface Props {
  className?: string;
}

export const SecantTangentSimulator: React.FC<Props> = ({ className = '' }) => {
  const [x0, setX0] = useState<number>(1.0);
  const [h, setH] = useState<number>(1.5);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Parabola f(x) = 0.5 * x^2
  const f = (x: number) => 0.4 * x * x;
  const fPrime = (x: number) => 0.8 * x;

  const y0 = f(x0);
  const x1 = x0 + h;
  const y1 = f(x1);

  // Slopes
  const mSecant = (y1 - y0) / (h !== 0 ? h : 0.0001);
  const mTangent = fPrime(x0);
  const error = Math.abs(mSecant - mTangent);

  // Canvas bounds: x from -3 to 4, y from -1 to 7
  const xMin = -2.5;
  const xMax = 4.5;
  const yMin = -0.5;
  const yMax = 7.5;

  const width = 560;
  const height = 300;

  const toSvgX = (x: number) => ((x - xMin) / (xMax - xMin)) * width;
  const toSvgY = (y: number) => height - ((y - yMin) / (yMax - yMin)) * height;

  // Generate curve path
  const curvePoints: string[] = [];
  const steps = 60;
  for (let i = 0; i <= steps; i++) {
    const x = xMin + (i / steps) * (xMax - xMin);
    const y = f(x);
    curvePoints.push(`${toSvgX(x)},${toSvgY(y)}`);
  }
  const curvePath = `M ${curvePoints.join(' L ')}`;

  // Secant line extended across visible domain
  const secLineXA = xMin;
  const secLineYA = y0 + mSecant * (secLineXA - x0);
  const secLineXB = xMax;
  const secLineYB = y0 + mSecant * (secLineXB - x0);

  // Tangent line extended
  const tanLineXA = xMin;
  const tanLineYA = y0 + mTangent * (tanLineXA - x0);
  const tanLineXB = xMax;
  const tanLineYB = y0 + mTangent * (tanLineXB - x0);

  const handleAnimateCollapse = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    let currentH = h;
    const interval = setInterval(() => {
      currentH *= 0.75;
      if (currentH < 0.05) {
        setH(0.02);
        clearInterval(interval);
        setIsAnimating(false);
      } else {
        setH(Number(currentH.toFixed(3)));
      }
    }, 70);
  };

  return (
    <div className={`p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-4 text-slate-200 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div>
          <h4 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
            <span>⚔️ Laboratorio Visual:</span> Colapso de la Secante a la Tangente
          </h4>
          <p className="text-xs text-slate-400">
            Observa cómo la recta secante (azul) converge en la recta tangente dorada cuando h → 0.
          </p>
        </div>
        <button
          onClick={handleAnimateCollapse}
          disabled={isAnimating}
          className="px-3 py-1.5 text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
        >
          {isAnimating ? 'Colapsando...' : 'Animar h → 0'}
        </button>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full overflow-hidden bg-slate-950/80 rounded-lg border border-slate-800 flex items-center justify-center p-2">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto max-h-[280px]">
          {/* Grid lines */}
          {[-2, -1, 0, 1, 2, 3, 4].map((gridX) => (
            <line
              key={`gx-${gridX}`}
              x1={toSvgX(gridX)}
              y1={0}
              x2={toSvgX(gridX)}
              y2={height}
              stroke="#1e293b"
              strokeDasharray="2,2"
            />
          ))}
          {[0, 2, 4, 6].map((gridY) => (
            <line
              key={`gy-${gridY}`}
              x1={0}
              y1={toSvgY(gridY)}
              x2={width}
              y2={toSvgY(gridY)}
              stroke="#1e293b"
              strokeDasharray="2,2"
            />
          ))}

          {/* Axes */}
          <line x1={0} y1={toSvgY(0)} x2={width} y2={toSvgY(0)} stroke="#475569" strokeWidth="1.5" />
          <line x1={toSvgX(0)} y1={0} x2={toSvgX(0)} y2={height} stroke="#475569" strokeWidth="1.5" />

          {/* Tangent line (Target gold) */}
          <line
            x1={toSvgX(tanLineXA)}
            y1={toSvgY(tanLineYA)}
            x2={toSvgX(tanLineXB)}
            y2={toSvgY(tanLineYB)}
            stroke="#fbbf24"
            strokeWidth="2.5"
            strokeDasharray="4,3"
            opacity="0.85"
          />

          {/* Secant line (Dynamic blue) */}
          <line
            x1={toSvgX(secLineXA)}
            y1={toSvgY(secLineYA)}
            x2={toSvgX(secLineXB)}
            y2={toSvgY(secLineYB)}
            stroke="#38bdf8"
            strokeWidth="2"
            opacity="0.95"
          />

          {/* Function curve */}
          <path d={curvePath} fill="none" stroke="#a855f7" strokeWidth="3" />

          {/* Point P (x0, f(x0)) */}
          <circle cx={toSvgX(x0)} cy={toSvgY(y0)} r="6" fill="#fbbf24" stroke="#0f172a" strokeWidth="2" />
          <text x={toSvgX(x0) - 16} y={toSvgY(y0) - 10} fill="#fbbf24" fontSize="12" fontWeight="bold">
            P({x0.toFixed(1)}, {y0.toFixed(1)})
          </text>

          {/* Point Q (x0+h, f(x0+h)) */}
          <circle cx={toSvgX(x1)} cy={toSvgY(y1)} r="6" fill="#38bdf8" stroke="#0f172a" strokeWidth="2" />
          <text x={toSvgX(x1) + 8} y={toSvgY(y1) + 4} fill="#38bdf8" fontSize="12" fontWeight="bold">
            Q({x1.toFixed(1)}, {y1.toFixed(1)})
          </text>

          {/* Delta x bar */}
          <line
            x1={toSvgX(x0)}
            y1={toSvgY(y0)}
            x2={toSvgX(x1)}
            y2={toSvgY(y0)}
            stroke="#94a3b8"
            strokeDasharray="2,2"
          />
          {/* Delta y bar */}
          <line
            x1={toSvgX(x1)}
            y1={toSvgY(y0)}
            x2={toSvgX(x1)}
            y2={toSvgY(y1)}
            stroke="#94a3b8"
            strokeDasharray="2,2"
          />
        </svg>
      </div>

      {/* Sliders and Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-amber-400">Punto de tangencia x₀:</span>
              <span className="tabular-nums font-semibold">{x0.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="-1.5"
              max="2.5"
              step="0.1"
              value={x0}
              onChange={(e) => setX0(parseFloat(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-cyan-400">Incremento h (h → 0):</span>
              <span className="tabular-nums font-semibold">{h.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.02"
              max="2.5"
              step="0.02"
              value={h}
              onChange={(e) => setH(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Real-time Math Output */}
        <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 flex flex-col justify-between text-xs font-mono space-y-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <span className="text-cyan-400">m Secante = Δy / h:</span>
            <span className="tabular-nums font-bold text-cyan-300">{mSecant.toFixed(3)}</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <span className="text-amber-400">m Tangente = f'(x₀):</span>
            <span className="tabular-nums font-bold text-amber-300">{mTangent.toFixed(3)}</span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-slate-400">Diferencia |m_sec - m_tan|:</span>
            <span className={`tabular-nums font-semibold ${error < 0.05 ? 'text-emerald-400' : 'text-slate-300'}`}>
              {error.toFixed(4)} {error < 0.05 ? '✓ (¡Convergencia!)' : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
