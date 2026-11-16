import React, { useState } from 'react';

export const LimitLateralSimulator: React.FC = () => {
  const [scenario, setScenario] = useState<'jump' | 'removable' | 'continuous'>('jump');
  const [deltaLeft, setDeltaLeft] = useState<number>(0.5);
  const [deltaRight, setDeltaRight] = useState<number>(0.5);

  const c = 2.0;
  const xLeft = c - deltaLeft;
  const xRight = c + deltaRight;

  // Define functions based on scenario
  // Jump: x < 2 => x + 1 (eval at 2: 3); x >= 2 => -x + 6 (eval at 2: 4)
  // Removable: (x^2 - 4)/(x - 2) = x + 2 (lim is 4, hole at (2,4), f(2) = 1)
  // Continuous: x^2 - 2x + 3 (at 2 is 3)
  const evalFunc = (x: number): number => {
    if (scenario === 'jump') {
      return x < 2 ? x + 1 : -0.5 * x + 4;
    } else if (scenario === 'removable') {
      return x + 2;
    } else {
      return 0.5 * x * x - x + 3;
    }
  };

  const yLeft = evalFunc(xLeft);
  const yRight = evalFunc(xRight);

  const limLeftExpected = scenario === 'jump' ? 3.0 : scenario === 'removable' ? 4.0 : 3.0;
  const limRightExpected = scenario === 'jump' ? 3.0 : scenario === 'removable' ? 4.0 : 3.0; // in jump: -0.5(2)+4 = 3. Wait, let's make jump noticeable: -0.5(2)+4 = 3? Wait! If -0.5(2)+4 = 3, then it's continuous! Let's make right branch 0.5*x + 4 => 5.0!
  const actualRightLim = scenario === 'jump' ? 5.0 : scenario === 'removable' ? 4.0 : 3.0;

  const width = 560;
  const height = 280;
  const xMin = 0;
  const xMax = 4;
  const yMin = 0;
  const yMax = 7;

  const toSvgX = (x: number) => ((x - xMin) / (xMax - xMin)) * width;
  const toSvgY = (y: number) => height - ((y - yMin) / (yMax - yMin)) * height;

  return (
    <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-4 text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div>
          <h4 className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
            <span>🔬 Laboratorio de Límites:</span> Aproximación Lateral y Convergencia
          </h4>
          <p className="text-xs text-slate-400">
            Compara el comportamiento del límite por izquierda (x → c⁻) y por derecha (x → c⁺).
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-medium">
          <button
            onClick={() => setScenario('jump')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              scenario === 'jump' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Salto Finito
          </button>
          <button
            onClick={() => setScenario('removable')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              scenario === 'removable' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Agujero Evitable
          </button>
          <button
            onClick={() => setScenario('continuous')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              scenario === 'continuous' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Continuo
          </button>
        </div>
      </div>

      <div className="relative w-full overflow-hidden bg-slate-950/80 rounded-lg border border-slate-800 p-2">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto max-h-[250px]">
          {/* Target c vertical line */}
          <line
            x1={toSvgX(c)}
            y1={0}
            x2={toSvgX(c)}
            y2={height}
            stroke="#64748b"
            strokeDasharray="3,3"
            strokeWidth="1.5"
          />
          <text x={toSvgX(c) + 6} y={18} fill="#94a3b8" fontSize="11" fontFamily="monospace">
            c = 2.0
          </text>

          {/* Left curve branch */}
          {scenario === 'jump' ? (
            <>
              <line
                x1={toSvgX(0)}
                y1={toSvgY(1)}
                x2={toSvgX(1.98)}
                y2={toSvgY(2.98)}
                stroke="#38bdf8"
                strokeWidth="2.5"
              />
              <circle cx={toSvgX(2)} cy={toSvgY(3)} r="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />

              {/* Right branch */}
              <line
                x1={toSvgX(2)}
                y1={toSvgY(5)}
                x2={toSvgX(4)}
                y2={toSvgY(6)}
                stroke="#a855f7"
                strokeWidth="2.5"
              />
              <circle cx={toSvgX(2)} cy={toSvgY(5)} r="5" fill="#a855f7" />
            </>
          ) : scenario === 'removable' ? (
            <>
              <line
                x1={toSvgX(0)}
                y1={toSvgY(2)}
                x2={toSvgX(4)}
                y2={toSvgY(6)}
                stroke="#38bdf8"
                strokeWidth="2.5"
              />
              {/* Hole at (2, 4) */}
              <circle cx={toSvgX(2)} cy={toSvgY(4)} r="6" fill="#060913" stroke="#f59e0b" strokeWidth="2.5" />
              {/* Redefined isolated point at (2, 2) */}
              <circle cx={toSvgX(2)} cy={toSvgY(2)} r="5" fill="#f59e0b" />
              <text x={toSvgX(2) + 8} y={toSvgY(2) + 4} fill="#f59e0b" fontSize="10">
                f(2) = 2.0
              </text>
            </>
          ) : (
            <path
              d={`M ${toSvgX(0)},${toSvgY(3)} Q ${toSvgX(2)},${toSvgY(2.5)} ${toSvgX(4)},${toSvgY(5)}`}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
            />
          )}

          {/* Left Probe Point */}
          <circle cx={toSvgX(xLeft)} cy={toSvgY(yLeft)} r="5" fill="#38bdf8" />
          <line
            x1={toSvgX(xLeft)}
            y1={toSvgY(0)}
            x2={toSvgX(xLeft)}
            y2={toSvgY(yLeft)}
            stroke="#38bdf8"
            strokeDasharray="2,2"
            opacity="0.6"
          />

          {/* Right Probe Point */}
          <circle
            cx={toSvgX(xRight)}
            cy={toSvgY(scenario === 'jump' ? 4 + 0.5 * xRight : yRight)}
            r="5"
            fill="#a855f7"
          />
          <line
            x1={toSvgX(xRight)}
            y1={toSvgY(0)}
            x2={toSvgX(xRight)}
            y2={toSvgY(scenario === 'jump' ? 4 + 0.5 * xRight : yRight)}
            stroke="#a855f7"
            strokeDasharray="2,2"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
        <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 space-y-2">
          <div className="flex justify-between text-cyan-400">
            <span>Sonda Izquierda: x = {xLeft.toFixed(3)}</span>
            <span>f(x) ≈ {yLeft.toFixed(3)}</span>
          </div>
          <input
            type="range"
            min="0.01"
            max="1.5"
            step="0.01"
            value={deltaLeft}
            onChange={(e) => setDeltaLeft(parseFloat(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
          <div className="text-[11px] text-slate-400">
            Límite lateral izquierdo lim x→2⁻ f(x) = <span className="text-cyan-300 font-bold">{limLeftExpected.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 space-y-2">
          <div className="flex justify-between text-purple-400">
            <span>Sonda Derecha: x = {xRight.toFixed(3)}</span>
            <span>f(x) ≈ {(scenario === 'jump' ? 4 + 0.5 * xRight : yRight).toFixed(3)}</span>
          </div>
          <input
            type="range"
            min="0.01"
            max="1.5"
            step="0.01"
            value={deltaRight}
            onChange={(e) => setDeltaRight(parseFloat(e.target.value))}
            className="w-full accent-purple-400 cursor-pointer"
          />
          <div className="text-[11px] text-slate-400">
            Límite lateral derecho lim x→2⁺ f(x) = <span className="text-purple-300 font-bold">{actualRightLim.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="p-2.5 rounded-lg border text-xs flex items-center justify-between font-mono bg-slate-950/80 border-slate-800">
        <div>
          <span className="text-slate-400">Estado del Límite Bilateral: </span>
          {scenario === 'jump' ? (
            <span className="text-rose-400 font-bold">NO EXISTE (L⁻ ≠ L⁺, Salto = 2.0)</span>
          ) : (
            <span className="text-emerald-400 font-bold">EXISTE (L⁻ = L⁺ = {limLeftExpected.toFixed(2)})</span>
          )}
        </div>
        <div className="text-slate-400">
          {scenario === 'jump'
            ? 'Discontinuidad de Salto Finito'
            : scenario === 'removable'
            ? 'Discontinuidad Evitable (Agujero)'
            : 'Función Continua'}
        </div>
      </div>
    </div>
  );
};
