import React, { useState, useMemo } from 'react';

export const LegPathInterpolator: React.FC = () => {
  const [blendValue, setBlendValue] = useState(0);

  const pathData = useMemo(() => {
    // t is 0 at the center, 1 at +100%, and -1 at -100%
    const t = blendValue / 100;

    // --- COORDINATE CONSTANTS ---
    const centerX = 3;      // The vertical axis where the straight line sits
    const maxWidth = 34;    // Total horizontal expansion (37 - 3)
    const topY = 3;
    const bottomY = 119;
    const curveSize = 34;   // Vertical space used by the curve (119 - 85)
    const magicOffset = 15.2223; // Adjusted offset for the control points (18.22 - 3)

    // --- DYNAMIC CALCULATIONS ---
    
    // X-position of the "foot" and "hip" endpoints
    // At 0, this is 3. At 100, it is 37. At -100, it is -31.
    const currentEndX = centerX + (maxWidth * t);

    // Y-positions where the vertical line transitions into curves
    const upperCurveEndY = topY + (curveSize * Math.abs(t));
    const lowerCurveStartY = bottomY - (curveSize * Math.abs(t));

    // --- CONTROL POINTS (Symmetrical) ---
    
    // Top Corner: Moves X first, then Y
    const uCP1x = currentEndX - (magicOffset * t);
    const uCP2y = topY + (magicOffset * Math.abs(t));

    // Bottom Corner: Moves Y first, then X
    const lCP1y = bottomY - (magicOffset * Math.abs(t));
    const lCP2x = centerX + (magicOffset * t);

    return `M${currentEndX} ${topY}
            C${uCP1x} ${topY} ${centerX} ${uCP2y} ${centerX} ${upperCurveEndY}
            V${lowerCurveStartY}
            C${centerX} ${lCP1y} ${lCP2x} ${bottomY} ${currentEndX} ${bottomY}`;
  }, [blendValue]);

  return (
    <div className="flex flex-col gap-6 p-8 max-w-md mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Bi-Directional Blend</span>
            <span className="text-2xl font-black text-gray-900">{blendValue}%</span>
          </div>
          <button 
            onClick={() => setBlendValue(0)}
            className="px-3 py-1 text-xs font-bold bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            RESET
          </button>
        </div>
        
        <input
          type="range"
          min="-100"
          max="100"
          value={blendValue}
          onChange={(e) => setBlendValue(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        
        <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
          <span>Left Bend</span>
          <span>Straight</span>
          <span>Right Bend</span>
        </div>
      </div>

      <div className="flex justify-center items-center bg-slate-50 rounded-2xl py-12 border border-slate-100 min-h-[300px] overflow-visible">
        <svg
          width="120"
          height="240"
          viewBox="-40 0 120 122"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-xl"
        >
          {/* Vertical Axis Guide */}
          <line x1="3" y1="0" x2="3" y2="122" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 2" />
          
          <path
            d={pathData}
            stroke="black"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-75 ease-out"
          />
        </svg>
      </div>

      <div className="bg-slate-900 rounded-xl p-4">
        <code className="text-[10px] text-indigo-300 break-all font-mono leading-relaxed">
          {pathData.replace(/\s+/g, ' ')}
        </code>
      </div>
    </div>
  );
};