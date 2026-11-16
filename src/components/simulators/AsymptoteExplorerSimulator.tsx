import React, { useState } from 'react';

export const AsymptoteExplorerSimulator: React.FC = () => {
  const [probeX, setProbeX] = useState<number>(3.5);

  // f(x) = (2x + 1) / (x - 2)
  // VA at x = 2
  // HA at y = 2
  const f = (x: number): number | null => {
    if (Math.abs(x - 2) < 0.05) return null;
    return (2 * x + 1) / (x - 2);
  };

  const probeY = f(probeX);

  const width = 560;
  const height = 280;
  const xMin = -6;
  const xMax = 10;
  const yMin = -8;
  const yMax = 12;

  const toSvgX = (x: number) => ((x - xMin) / (xMax - xMin)) * width;
  const toSvgY = (y: number) => height - ((y - yMin) / (yMax - yMin)) * height;

  // Left branch (x < 2)
  const leftBranchPoints: string[] = [];
  for (let x = xMin; x <= 1.85; x += 0.15) {
    const y = (2 * x + 1) / (x - 2);
    if (y >= yMin && y <= yMax) {
      leftBranchPoints.push(`${toSvgX(x)},${toSvgY(y)}`);
    }
  }

  // Right branch (x > 2)
  const rightBranchPoints: string[] = [];
  for (let x = 2.15; x <= xMax; x += 0.15) {
    const y = (2 * x + 1) / (x - 2);
    if (y >= yMin && y <= yMax) {
      rightBranchPoints.push(`${toSvgX(x)},${toSvgY(y)}`);
    }
  }

  return (
    <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-4 text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div>
          <h4 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
            <span>🏛️ Observatorio Asintótico:</span> f(x) = (2x + 1) / (x - 2)
          </h4>
          <p className="text-xs text-slate-400">
            Observa el comportamiento infinito alrededor del polo vertical y en los horizontes asintóticos.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setProbeX(2.2)}
            className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-rose-400 rounded border border-rose-500/30 font-mono transition-colors cursor-pointer"
          >
            Cerca del Polo (x → 2⁺)
          </button>
          <button
            onClick={() => setProbeX(9.5)}
            className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded border border-cyan-500/30 font-mono transition-colors cursor-pointer"
          >
            Al Infinito (x → ∞)
          </button>
        </div>
      </div>

      <div className="relative w-full overflow-hidden bg-slate-950/80 rounded-lg border border-slate-800 p-2">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto max-h-[260px]">
          {/* Axes */}
          <line x1={0} y1={toSvgY(0)} x2={width} y2={toSvgY(0)} stroke="#334155" strokeWidth="1.5" />
          <line x1={toSvgX(0)} y1={0} x2={toSvgX(0)} y2={height} stroke="#334155" strokeWidth="1.5" />

          {/* Horizontal Asymptote y = 2 (Cyan dashed) */}
          <line
            x1={0}
            y1={toSvgY(2)}
            x2={width}
            y2={toSvgY(2)}
            stroke="#38bdf8"
            strokeDasharray="4,4"
            strokeWidth="2"
          />
          <text x={12} y={toSvgY(2) - 8} fill="#38bdf8" fontSize="11" fontWeight="bold">
            Asíntota Horizontal: y = 2
          </text>

          {/* Vertical Asymptote x = 2 (Rose dashed) */}
          <line
            x1={toSvgX(2)}
            y1={0}
            x2={toSvgX(2)}
            y2={height}
            stroke="#f43f5e"
            strokeDasharray="4,4"
            strokeWidth="2"
          />
          <text x={toSvgX(2) + 8} y={30} fill="#f43f5e" fontSize="11" fontWeight="bold">
            Asíntota Vertical: x = 2
          </text>

          {/* Left curve branch */}
          {leftBranchPoints.length > 0 && (
            <path d={`M ${leftBranchPoints.join(' L ')}`} fill="none" stroke="#a855f7" strokeWidth="2.5" />
          )}

          {/* Right curve branch */}
          {rightBranchPoints.length > 0 && (
            <path d={`M ${rightBranchPoints.join(' L ')}`} fill="none" stroke="#a855f7" strokeWidth="2.5" />
          )}

          {/* Probe marker */}
          {probeY !== null && probeY >= yMin && probeY <= yMax && (
            <>
              <line
                x1={toSvgX(probeX)}
                y1={toSvgY(0)}
                x2={toSvgX(probeX)}
                y2={toSvgY(probeY)}
                stroke="#fbbf24"
                strokeDasharray="2,2"
              />
              <circle cx={toSvgX(probeX)} cy={toSvgY(probeY)} r="6" fill="#fbbf24" stroke="#0f172a" strokeWidth="2" />
            </>
          )}
        </svg>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-slate-300">Posición de x:</span>
          <span className="tabular-nums font-bold text-amber-400">{probeX.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="-5.5"
          max="9.5"
          step="0.1"
          value={probeX}
          onChange={(e) => setProbeX(parseFloat(e.target.value))}
          className="w-full accent-amber-400 cursor-pointer"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
        <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800">
          <span className="text-slate-400">Coordenada Actual: </span>
          <span className="font-bold text-amber-400">
            ({probeX.toFixed(2)}, {probeY !== null ? probeY.toFixed(2) : 'Indefinido'})
          </span>
        </div>
        <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800">
          <span className="text-slate-400">Distancia al límite horizontal y=2: </span>
          <span className="font-bold text-cyan-400">
            {probeY !== null ? Math.abs(probeY - 2).toFixed(3) : '∞'}
          </span>
        </div>
      </div>
    </div>
  );
};
