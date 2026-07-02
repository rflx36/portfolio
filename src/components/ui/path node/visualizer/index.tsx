import { useState, useRef, useCallback, useMemo } from "react";

export interface PathNodeInterface {
    pointPosition: { x: number; y: number };
    startingControlPoint: {
        controlPointX: { type: "additive" | "fixed"; value: number };
        controlPointY: { type: "additive" | "fixed"; value: number };
    };
    endingControlPoint: {
        controlPointX: { type: "additive" | "fixed"; value: number };
        controlPointY: { type: "additive" | "fixed"; value: number };
    };
}

type Position = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
const POSITIONS: Position[] = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

interface TooltipState {
    visible: boolean;
    x: number;
    y: number;
    pointIndex: number;
}

interface DragState {
    isDragging: boolean;
    pointIndex: number;
    dragTarget: "point" | "startCP" | "endCP";
    startMouseX: number;
    startMouseY: number;
    startValue: { x: number; y: number };
}

function resolveCP(
    point: PathNodeInterface,
    cp: PathNodeInterface["startingControlPoint"] | PathNodeInterface["endingControlPoint"]
) {
    return {
        x: cp.controlPointX.type === "additive"
            ? point.pointPosition.x + cp.controlPointX.value
            : cp.controlPointX.value,
        y: cp.controlPointY.type === "additive"
            ? point.pointPosition.y + cp.controlPointY.value
            : cp.controlPointY.value,
    };
}

function buildPath(points: PathNodeInterface[], position: Position, w: number, h: number): string {
    let p = "M";
    switch (position) {
        case "topLeft": p += " 0 0"; break;
        case "topRight": p += ` ${w} 0`; break;
        case "bottomLeft": p += ` 0 ${h}`; break;
        case "bottomRight": p += ` ${w} ${h}`; break;
    }
    points.forEach((pt) => {
        const scp = resolveCP(pt, pt.startingControlPoint);
        const ecp = resolveCP(pt, pt.endingControlPoint);
        p += ` C ${scp.x} ${scp.y} ${ecp.x} ${ecp.y} ${pt.pointPosition.x} ${pt.pointPosition.y}`;
    });
    return p;
}

function convertCPValue(
    point: PathNodeInterface,
    axis: "X" | "Y",
    nextType: "additive" | "fixed",
    currentValue: number
): number {
    const pos = axis === "X" ? point.pointPosition.x : point.pointPosition.y;
    return nextType === "additive" ? currentValue - pos : pos + currentValue;
}

function makeNewPoint(index: number, w: number, h: number): PathNodeInterface {
    const x = Math.round(w * 0.2 + (index * w * 0.25) % (w * 0.8));
    const y = Math.round(h * 0.3 + (index % 2 === 0 ? h * 0.2 : -h * 0.1));
    return {
        pointPosition: { x, y },
        startingControlPoint: {
            controlPointX: { type: "additive", value: -60 },
            controlPointY: { type: "additive", value: -80 },
        },
        endingControlPoint: {
            controlPointX: { type: "additive", value: 60 },
            controlPointY: { type: "additive", value: -60 },
        },
    };
}

function JsonTree({ data, depth = 0 }: { data: unknown; depth?: number }) {
    const pad = depth * 12;
    if (data === null) return <span className="pnv-null">null</span>;
    if (typeof data === "boolean") return <span className="pnv-bool">{String(data)}</span>;
    if (typeof data === "number") return <span className="pnv-num">{data}</span>;
    if (typeof data === "string") return <span className="pnv-str">"{data}"</span>;
    if (Array.isArray(data)) {
        return (
            <span>
                {"["}
                {data.map((v, i) => (
                    <div key={i} style={{ paddingLeft: pad + 12 }}>
                        <JsonTree data={v} depth={depth + 1} />
                        {i < data.length - 1 && ","}
                    </div>
                ))}
                <div style={{ paddingLeft: pad }}>{"]"}</div>
            </span>
        );
    }
    if (typeof data === "object") {
        const entries = Object.entries(data as Record<string, unknown>);
        return (
            <span>
                {"{"}
                {entries.map(([k, v], i) => (
                    <div key={k} style={{ paddingLeft: pad + 12 }}>
                        <span className="pnv-key">{k}</span>
                        <span className="pnv-colon">: </span>
                        <JsonTree data={v} depth={depth + 1} />
                        {i < entries.length - 1 && ","}
                    </div>
                ))}
                <div style={{ paddingLeft: pad }}>{"}"}</div>
            </span>
        );
    }
    return <span>{String(data)}</span>;
}

function SegmentToggle<T extends string>({
    options, value, onChange,
}: { options: readonly T[]; value: T; onChange: (v: T) => void }) {
    return (
        <div className="pnv-seg">
            {options.map((o) => (
                <button key={o} className={`pnv-seg-btn ${value === o ? "active" : ""}`} onClick={() => onChange(o)}>
                    {o}
                </button>
            ))}
        </div>
    );
}

// function NumberInput({ label, value, min, max, onChange }: {
//     label: string; value: number; min?: number; max?: number; onChange: (v: number) => void;
// }) {
//     return (
//         <div className="pnv-field">
//             <div className="pnv-label">{label}</div>
//             <input
//                 className="pnv-input" type="number" value={value} min={min} max={max}
//                 onChange={(e) => {
//                     const v = parseInt(e.target.value);
//                     onChange(Math.max(min ?? -Infinity, Math.min(max ?? Infinity, v)));
//                 }}
//             />
//         </div>
//     );
// }

function PillToggle({ label, value, onChange }: {
    label: string; value: "additive" | "fixed"; onChange: (v: "additive" | "fixed") => void;
}) {
    return (
        <div className="pnv-pill-row">
            <span className="pnv-pill-label">{label}</span>
            <button
                className={`pnv-pill ${value === "additive" ? "add" : "fix"}`}
                onClick={() => onChange(value === "additive" ? "fixed" : "additive")}
            >
                {value}
            </button>
        </div>
    );
}

const DEFAULT_POINTS: PathNodeInterface[] = [
    {
        pointPosition: { x: 340, y: 210 },
        startingControlPoint: {
            controlPointX: { type: "additive", value: -80 },
            controlPointY: { type: "additive", value: -100 },
        },
        endingControlPoint: {
            controlPointX: { type: "additive", value: 80 },
            controlPointY: { type: "additive", value: -70 },
        },
    },
];

export default function PathNodeVisualizer() {
    const [width, setWidth] = useState(700);
    const [height, setHeight] = useState(420);
    const [minWidth, setMinWidth] = useState(100);
    const [maxWidth, setMaxWidth] = useState(1400);
    const [minHeight, setMinHeight] = useState(100);
    const [maxHeight, setMaxHeight] = useState(900);
    const [position, setPosition] = useState<Position>("topLeft");
    const [points, setPoints] = useState<PathNodeInterface[]>(DEFAULT_POINTS);
    const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
    const [copied, setCopied] = useState(false);

    const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, x: 0, y: 0, pointIndex: 0 });

    const dragRef = useRef<DragState | null>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    const pathD = useMemo(() => buildPath(points, position, width, height), [points, position, width, height]);

    const getSVGCoords = useCallback((clientX: number, clientY: number) => {
        if (!svgRef.current) return { x: 0, y: 0 };
        const rect = svgRef.current.getBoundingClientRect();
        return {
            x: ((clientX - rect.left) / rect.width) * width,
            y: ((clientY - rect.top) / rect.height) * height,
        };
    }, [width, height]);

    const onMouseDown = useCallback((e: React.MouseEvent, pointIndex: number, dragTarget: "point" | "startCP" | "endCP") => {
        e.stopPropagation();
        const pt = points[pointIndex];
        const startValue =
            dragTarget === "point" ? { ...pt.pointPosition } :
                dragTarget === "startCP" ? resolveCP(pt, pt.startingControlPoint) :
                    resolveCP(pt, pt.endingControlPoint);
        dragRef.current = { isDragging: true, pointIndex, dragTarget, startMouseX: e.clientX, startMouseY: e.clientY, startValue };
        setTooltip((t) => ({ ...t, visible: false }));
    }, [points]);

    const onMouseMove = useCallback((e: React.MouseEvent) => {
        const drag = dragRef.current;
        if (!drag?.isDragging) return;
        const cur = getSVGCoords(e.clientX, e.clientY);
        const orig = getSVGCoords(drag.startMouseX, drag.startMouseY);
        const dx = cur.x - orig.x;
        const dy = cur.y - orig.y;
        setPoints((prev) =>
            prev.map((p, i) => {
                if (i !== drag.pointIndex) return p;
                const clone: PathNodeInterface = JSON.parse(JSON.stringify(p));
                if (drag.dragTarget === "point") {
                    clone.pointPosition.x = Math.round(drag.startValue.x + dx);
                    clone.pointPosition.y = Math.round(drag.startValue.y + dy);
                } else {
                    const cpKey = drag.dragTarget === "startCP" ? "startingControlPoint" : "endingControlPoint";
                    const cp = clone[cpKey];
                    const absX = Math.round(drag.startValue.x + dx);
                    const absY = Math.round(drag.startValue.y + dy);
                    cp.controlPointX.value = cp.controlPointX.type === "additive" ? absX - clone.pointPosition.x : absX;
                    cp.controlPointY.value = cp.controlPointY.type === "additive" ? absY - clone.pointPosition.y : absY;
                }
                return clone;
            })
        );
    }, [getSVGCoords]);

    const onMouseUp = useCallback(() => { dragRef.current = null; }, []);

    const showTooltip = useCallback((e: React.MouseEvent, pointIndex: number) => {
        if (dragRef.current?.isDragging) return;
        const rect = (e.currentTarget as SVGElement).closest(".pnv-canvas-area")?.getBoundingClientRect();
        if (!rect) return;
        setTooltip({ visible: true, x: e.clientX - rect.left + 14, y: e.clientY - rect.top - 8, pointIndex });
    }, []);

    const hideTooltip = useCallback(() => {
        if (!dragRef.current?.isDragging) setTooltip((t) => ({ ...t, visible: false }));
    }, []);

    const toggleCPType = useCallback((
        pointIndex: number,
        cpKey: "startingControlPoint" | "endingControlPoint",
        axis: "X" | "Y",
        nextType: "additive" | "fixed"
    ) => {
        setPoints((prev) =>
            prev.map((p, i) => {
                if (i !== pointIndex) return p;
                const clone: PathNodeInterface = JSON.parse(JSON.stringify(p));
                const cp = clone[cpKey];
                const axisKey = axis === "X" ? "controlPointX" : "controlPointY";
                cp[axisKey].value = convertCPValue(clone, axis, nextType, cp[axisKey].value);
                cp[axisKey].type = nextType;
                return clone;
            })
        );
    }, []);

    const handleAddPoint = useCallback(() => {
        setPoints((prev) => {
            const newPt = makeNewPoint(prev.length, width, height);
            return [...prev, newPt];
        });
    }, [width, height]);

    const handleRemovePoint = useCallback(() => {
        setPoints((prev) => {
            if (prev.length <= 1) return prev;
            const next = prev.slice(0, -1);
            setSelectedPoint((sel) => (sel !== null && sel >= next.length ? next.length - 1 : sel));
            return next;
        });
    }, []);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(JSON.stringify(points, null, 2)).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        });
    }, [points]);

    const selPt = selectedPoint !== null ? points[selectedPoint] : null;

    const startDot = {
        cx: position.includes("Right") ? width : 0,
        cy: position.includes("bottom") ? height : 0,
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Syne:wght@700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .pnv-root {
          font-family: 'JetBrains Mono', monospace;
          background: #080a0e;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem 1.5rem 3rem;
          color: #c8d6e5;
        }
        .pnv-title {
          font-family: 'Syne', sans-serif;
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #4fc3f7;
          margin-bottom: 1.25rem;
          opacity: 0.8;
        }

        .pnv-layout {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .pnv-panel {
          width: 214px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .pnv-section {
          background: #0d1117;
          border: 1px solid #1a2535;
          border-radius: 6px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }
        .pnv-section-title {
          font-family: 'Syne', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #4fc3f755;
          padding-bottom: 7px;
          border-bottom: 1px solid #151d29;
        }
        .pnv-field { display: flex; flex-direction: column; gap: 4px; }
        .pnv-label { font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: #3d5468; }

        .pnv-seg {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 3px;
          background: #060810;
          border: 1px solid #1a2535;
          border-radius: 5px;
          padding: 3px;
        }
        .pnv-seg-btn {
          padding: 4px 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          border: none;
          border-radius: 3px;
          background: transparent;
          color: #3d5468;
          cursor: pointer;
          transition: background 0.12s, color 0.12s;
          white-space: nowrap;
        }
        .pnv-seg-btn.active { background: #162032; color: #4fc3f7; }
        .pnv-seg-btn:hover:not(.active) { color: #6a94b0; }

        .pnv-input {
          width: 100%;
          background: #060810;
          border: 1px solid #1a2535;
          border-radius: 4px;
          padding: 5px 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #c8d6e5;
          outline: none;
          transition: border-color 0.15s;
        }
        .pnv-input:focus { border-color: #2563eb55; }
        .pnv-input::-webkit-inner-spin-button { opacity: 0.35; }

        .pnv-ptabs { display: flex; gap: 4px; flex-wrap: wrap; }
        .pnv-ptab {
          padding: 3px 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          border: 1px solid #1a2535;
          border-radius: 3px;
          background: transparent;
          color: #3d5468;
          cursor: pointer;
          transition: all 0.12s;
        }
        .pnv-ptab.active { background: #0e2038; border-color: #2563eb44; color: #4fc3f7; }
        .pnv-ptab:hover:not(.active) { color: #6a94b0; border-color: #253545; }

        .pnv-pill-row { display: flex; align-items: center; justify-content: space-between; gap: 6px; }
        .pnv-pill-label { font-size: 9px; letter-spacing: 0.08em; color: #3d5468; flex-shrink: 0; }
        .pnv-pill {
          font-family: 'JetBrains Mono', monospace;
          font-size: 8px;
          padding: 2px 8px;
          border-radius: 99px;
          border: 1px solid;
          cursor: pointer;
          transition: all 0.14s;
          letter-spacing: 0.05em;
        }
        .pnv-pill.add { background: #0b1c0d; border-color: #22c55e44; color: #4ade80; }
        .pnv-pill.fix { background: #17091f; border-color: #a855f744; color: #c084fc; }
        .pnv-pill:hover { filter: brightness(1.3); }

        .pnv-cp-group-title {
          font-size: 8px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #253545;
          padding-top: 2px;
        }

        .pnv-point-controls {
          display: flex;
          gap: 4px;
        }
        .pnv-pt-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 5px 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.06em;
          border-radius: 4px;
          border: 1px solid;
          cursor: pointer;
          transition: all 0.15s;
        }
        .pnv-pt-btn.add-pt {
          background: #0b1c0d;
          border-color: #22c55e44;
          color: #4ade8099;
        }
        .pnv-pt-btn.add-pt:hover {
          background: #0f2612;
          border-color: #22c55e88;
          color: #4ade80;
        }
        .pnv-pt-btn.rem-pt {
          background: #1a0a0a;
          border-color: #ef444444;
          color: #f8717199;
        }
        .pnv-pt-btn.rem-pt:hover:not(:disabled) {
          background: #200d0d;
          border-color: #ef444488;
          color: #f87171;
        }
        .pnv-pt-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .pnv-range {
          width: 100%;
          accent-color: #4fc3f7;
          cursor: pointer;
          height: 3px;
        }

        .pnv-minmax-row {
          display: flex;
          gap: 6px;
          margin-top: 2px;
        }
        .pnv-minmax-field {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 4px;
          background: #060810;
          border: 1px solid #1a2535;
          border-radius: 4px;
          padding: 3px 6px;
        }
        .pnv-minmax-label {
          font-size: 8px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #253545;
          flex-shrink: 0;
        }
        .pnv-minmax-input {
          flex: 1;
          min-width: 0;
          background: transparent;
          border: none;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: #c8d6e5;
          outline: none;
        }
        .pnv-minmax-input::-webkit-inner-spin-button { opacity: 0.3; }

        .pnv-copy-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          width: 100%;
          padding: 6px 10px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.08em;
          background: #060d16;
          border: 1px solid #1a2f45;
          border-radius: 4px;
          color: #4fc3f799;
          cursor: pointer;
          transition: all 0.15s;
        }
        .pnv-copy-btn:hover { border-color: #2563eb66; color: #4fc3f7; background: #0a1825; }
        .pnv-copy-btn.ok    { border-color: #22c55e55; color: #4ade80; background: #0b1c0d; }
        .pnv-copy-icon { font-size: 10px; }

        .pnv-canvas-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex-shrink: 0;
          width: 700px;
        }

        .pnv-canvas-viewport {
          width: 700px;
          height: 420px;
          overflow: hidden;
          border-radius: 6px;
          border: 1px solid #1a2535;
          box-shadow: 0 0 0 1px #10192444, 0 20px 50px -10px #000a;
          flex-shrink: 0;
        }

        .pnv-canvas-area {
          position: relative;
          background: transparent;
          overflow: visible;
        }
        .pnv-svg { display: block; cursor: crosshair; border-radius: 5px; }

        .pnv-tooltip {
          position: absolute;
          pointer-events: none;
          background: #090c12ee;
          border: 1px solid #1e3a5f66;
          border-radius: 6px;
          padding: 10px 14px;
          font-size: 10.5px;
          line-height: 1.75;
          white-space: pre;
          z-index: 100;
          min-width: 265px;
          box-shadow: 0 10px 40px #0009;
          opacity: 0;
          transform: translateY(5px);
          transition: opacity 0.13s, transform 0.13s;
        }
        .pnv-tooltip.visible { opacity: 1; transform: translateY(0); }
        .pnv-tooltip-hdr {
          font-family: 'Syne', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #4fc3f7;
          margin-bottom: 6px;
          padding-bottom: 6px;
          border-bottom: 1px solid #1a2f45;
        }

        .pnv-info-row {
          display: flex;
          gap: 8px;
          width: 100%;
        }
        .pnv-info-card {
          background: #0d1117;
          border: 1px solid #1a2535;
          border-radius: 6px;
          padding: 12px 14px;
          flex: 1;
          min-width: 0;
        }
        .pnv-info-card-title {
          font-family: 'Syne', sans-serif;
          font-size: 8.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #4fc3f755;
          margin-bottom: 8px;
          padding-bottom: 6px;
          border-bottom: 1px solid #151d29;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .pnv-info-card-badge {
          background: #162032;
          border-radius: 3px;
          padding: 1px 6px;
          font-size: 8px;
          color: #4fc3f7aa;
          letter-spacing: 0.06em;
        }
        .pnv-info-scroll {
          overflow-x: auto;
          max-height: 180px;
          overflow-y: auto;
          font-size: 10px;
          line-height: 1.7;
        }
        .pnv-info-scroll::-webkit-scrollbar { width: 4px; height: 4px; }
        .pnv-info-scroll::-webkit-scrollbar-track { background: transparent; }
        .pnv-info-scroll::-webkit-scrollbar-thumb { background: #1a2535; border-radius: 2px; }

        .pnv-key   { color: #79c0ff; }
        .pnv-str   { color: #a5d6ff; }
        .pnv-num   { color: #f0883e; }
        .pnv-bool  { color: #ff7b72; }
        .pnv-null  { color: #8b949e; }
        .pnv-colon { color: #3d5468; }

        .pnv-hint {
          margin-top: 10px;
          font-size: 9px;
          letter-spacing: 0.06em;
          color: #1e2d3d;
          text-align: center;
        }
        .pnv-hint b { color: #253545; font-weight: 400; }

        .pnv-anchor { cursor: grab; } .pnv-anchor:active { cursor: grabbing; }
        .pnv-handle { cursor: grab; } .pnv-handle:active { cursor: grabbing; }
      `}</style>

            <div className="pnv-root">
                <div className="pnv-title">PathNode Visualizer</div>

                <div className="pnv-layout">

                    {/* ── LEFT PANEL ── */}
                    <div className="pnv-panel">

                        <div className="pnv-section">
                            <div className="pnv-section-title">Canvas</div>

                            <div className="pnv-field">
                                <div className="pnv-label">Width — {width}px</div>
                                <input
                                    className="pnv-range" type="range"
                                    min={minWidth} max={maxWidth} value={width}
                                    onChange={(e) => setWidth(Math.max(minWidth, Math.min(maxWidth, parseInt(e.target.value))))}
                                />
                                <div className="pnv-minmax-row flex flex-col">
                                    <div className="pnv-minmax-field">
                                        <span className="pnv-minmax-label">min</span>
                                        <input className="pnv-minmax-input" type="number" value={minWidth}
                                            onChange={(e) => {
                                                setMinWidth(parseInt(e.target.value))

                                            }} />
                                    </div>
                                    <div className="pnv-minmax-field">
                                        <span className="pnv-minmax-label">max</span>
                                        <input className="pnv-minmax-input" type="number" value={maxWidth}
                                            onChange={(e) => {
                                                setMaxWidth(parseInt(e.target.value))
                                                
                                            }} />
                                    </div>
                                </div>
                            </div>

                            <div className="pnv-field">
                                <div className="pnv-label">Height — {height}px</div>
                                <input
                                    className="pnv-range" type="range"
                                    min={minHeight} max={maxHeight} value={height}
                                    onChange={(e) => setHeight(Math.max(minHeight, Math.min(maxHeight, parseInt(e.target.value))))}
                                />
                                <div className="pnv-minmax-row flex flex-col">
                                    <div className="pnv-minmax-field">
                                        <span className="pnv-minmax-label">min</span>
                                        <input className="pnv-minmax-input" type="number" value={minHeight}
                                            onChange={(e) => {
                                                setMinHeight(parseInt(e.target.value))
                                            }} />
                                    </div>
                                    <div className="pnv-minmax-field">
                                        <span className="pnv-minmax-label">max</span>
                                        <input className="pnv-minmax-input" type="number" value={maxHeight}
                                            onChange={(e) => {
                                                setMaxHeight(parseInt(e.target.value))
                                            }} />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="pnv-section">
                            <div className="pnv-section-title">Starting Point</div>
                            <SegmentToggle options={POSITIONS} value={position} onChange={setPosition} />
                        </div>

                        <div className="pnv-section">
                            <div className="pnv-section-title">Control Point Types</div>

                            {/* Add / Remove buttons */}
                            <div className="pnv-point-controls">
                                <button className="pnv-pt-btn add-pt" onClick={handleAddPoint}>
                                    + add point
                                </button>
                                <button
                                    className="pnv-pt-btn rem-pt"
                                    onClick={handleRemovePoint}
                                    disabled={points.length <= 1}
                                >
                                    − remove
                                </button>
                            </div>

                            <div className="pnv-ptabs">
                                {points.map((_, i) => (
                                    <button
                                        key={i}
                                        className={`pnv-ptab ${selectedPoint === i ? "active" : ""}`}
                                        onClick={() => setSelectedPoint(selectedPoint === i ? null : i)}
                                    >[{i}]</button>
                                ))}
                            </div>

                            {selPt !== null && selectedPoint !== null ? (
                                <>
                                    <div className="pnv-cp-group-title">Starting CP</div>
                                    <PillToggle label="X axis" value={selPt.startingControlPoint.controlPointX.type}
                                        onChange={(v) => toggleCPType(selectedPoint, "startingControlPoint", "X", v)} />
                                    <PillToggle label="Y axis" value={selPt.startingControlPoint.controlPointY.type}
                                        onChange={(v) => toggleCPType(selectedPoint, "startingControlPoint", "Y", v)} />
                                    <div className="pnv-cp-group-title">Ending CP</div>
                                    <PillToggle label="X axis" value={selPt.endingControlPoint.controlPointX.type}
                                        onChange={(v) => toggleCPType(selectedPoint, "endingControlPoint", "X", v)} />
                                    <PillToggle label="Y axis" value={selPt.endingControlPoint.controlPointY.type}
                                        onChange={(v) => toggleCPType(selectedPoint, "endingControlPoint", "Y", v)} />
                                </>
                            ) : (
                                <div style={{ fontSize: 9, color: "#253545", lineHeight: 1.6 }}>
                                    Select a point to toggle its control point axes.
                                </div>
                            )}

                            <div style={{ paddingTop: 4, borderTop: "1px solid #151d29" }}>
                                <div className="pnv-label" style={{ marginBottom: 6 }}>Object Structure</div>
                                <button className={`pnv-copy-btn ${copied ? "ok" : ""}`} onClick={handleCopy}>
                                    <span className="pnv-copy-icon">{copied ? "✓" : "⎘"}</span>
                                    {copied ? "copied!" : "copy points[]"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── CANVAS COLUMN ── */}
                    <div className="pnv-canvas-col">

                        <div className="pnv-canvas-viewport">
                            <div className="pnv-canvas-area" style={{ width, height }}>
                                <svg
                                    ref={svgRef}
                                    className="pnv-svg"
                                    width={width}
                                    height={height}
                                    viewBox={`0 0 ${width} ${height}`}
                                    onMouseMove={onMouseMove}
                                    onMouseUp={onMouseUp}
                                    onMouseLeave={onMouseUp}
                                >
                                    <defs>
                                        <pattern id="pnv-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#131c28" strokeWidth="1" />
                                        </pattern>
                                        <clipPath id="pnv-clip">
                                            <rect width={width} height={height} rx="5" ry="5" />
                                        </clipPath>
                                    </defs>

                                    <rect width={width} height={height} fill="url(#pnv-grid)" clipPath="url(#pnv-clip)" />

                                    <circle cx={startDot.cx} cy={startDot.cy} r={5}
                                        fill="#f59e0b18" stroke="#f59e0b" strokeWidth={1.5} />
                                    <text
                                        x={startDot.cx + (startDot.cx === 0 ? 10 : -10)}
                                        y={startDot.cy + (startDot.cy === 0 ? 15 : -8)}
                                        fill="#f59e0b66" fontSize={8}
                                        fontFamily="JetBrains Mono, monospace"
                                        textAnchor={startDot.cx === 0 ? "start" : "end"}
                                        style={{ userSelect: "none" }}
                                    >
                                        {position}
                                    </text>

                                    <path d={pathD} fill="none" stroke="#4fc3f7" strokeWidth={2.5}
                                        strokeLinecap="round" strokeLinejoin="round" />

                                    {points.map((point, i) => {
                                        const scp = resolveCP(point, point.startingControlPoint);
                                        const ecp = resolveCP(point, point.endingControlPoint);
                                        const sel = selectedPoint === i;
                                        const scpColor = point.startingControlPoint.controlPointX.type === "additive" ? "#22c55e" : "#a855f7";
                                        const ecpColor = point.endingControlPoint.controlPointX.type === "additive" ? "#22c55e" : "#a855f7";
                                        const prevX = i === 0 ? startDot.cx : points[i - 1].pointPosition.x;
                                        const prevY = i === 0 ? startDot.cy : points[i - 1].pointPosition.y;
                                        return (
                                            <g key={i}>
                                                <line x1={prevX} y1={prevY} x2={scp.x} y2={scp.y}
                                                    stroke={scpColor} strokeWidth={1} strokeDasharray="3 3" opacity={0.4} />
                                                <line x1={point.pointPosition.x} y1={point.pointPosition.y} x2={ecp.x} y2={ecp.y}
                                                    stroke={ecpColor} strokeWidth={1} strokeDasharray="3 3" opacity={0.4} />

                                                <circle className="pnv-handle" cx={scp.x} cy={scp.y} r={5}
                                                    fill="#0a0d12" stroke={scpColor} strokeWidth={1.5}
                                                    onMouseDown={(e) => onMouseDown(e, i, "startCP")} />
                                                <circle className="pnv-handle" cx={ecp.x} cy={ecp.y} r={5}
                                                    fill="#0a0d12" stroke={ecpColor} strokeWidth={1.5}
                                                    onMouseDown={(e) => onMouseDown(e, i, "endCP")} />

                                                <circle className="pnv-anchor"
                                                    cx={point.pointPosition.x} cy={point.pointPosition.y}
                                                    r={sel ? 9 : 7}
                                                    fill={sel ? "#4fc3f718" : "#4fc3f70c"}
                                                    stroke={sel ? "#4fc3f7" : "#4fc3f788"}
                                                    strokeWidth={sel ? 2.5 : 1.8}
                                                    onMouseDown={(e) => onMouseDown(e, i, "point")}
                                                    onMouseEnter={(e) => showTooltip(e, i)}
                                                    onMouseLeave={hideTooltip}
                                                    onMouseMove={(e) => showTooltip(e, i)}
                                                    onClick={() => setSelectedPoint(selectedPoint === i ? null : i)}
                                                />
                                                <text
                                                    x={point.pointPosition.x + 11} y={point.pointPosition.y - 11}
                                                    fill={sel ? "#4fc3f7aa" : "#4fc3f744"}
                                                    fontSize={9} fontFamily="JetBrains Mono, monospace"
                                                    style={{ pointerEvents: "none", userSelect: "none" }}
                                                >[{i}]</text>
                                            </g>
                                        );
                                    })}
                                </svg>

                                <div className={`pnv-tooltip ${tooltip.visible ? "visible" : ""}`}
                                    style={{ left: tooltip.x, top: tooltip.y }}>
                                    <div className="pnv-tooltip-hdr">
                                        Point [{tooltip.pointIndex}] — PathNodeInterface
                                    </div>
                                    <JsonTree data={points[tooltip.pointIndex]} />
                                </div>
                            </div>
                        </div>

                        {/* ── INFO ROW ── */}
                        <div className="pnv-info-row">
                            <div className="pnv-info-card">
                                <div className="pnv-info-card-title">
                                    <span>All Points</span>
                                    <span className="pnv-info-card-badge">{points.length} nodes</span>
                                </div>
                                <div className="pnv-info-scroll">
                                    <JsonTree data={points} />
                                </div>
                            </div>

                            <div className="pnv-info-card">
                                <div className="pnv-info-card-title">
                                    <span>{selectedPoint !== null ? `Point [${selectedPoint}]` : "Selected Point"}</span>
                                    {selectedPoint !== null && (
                                        <span className="pnv-info-card-badge">
                                            {points[selectedPoint].pointPosition.x}, {points[selectedPoint].pointPosition.y}
                                        </span>
                                    )}
                                </div>
                                <div className="pnv-info-scroll">
                                    {selectedPoint !== null ? (
                                        <JsonTree data={points[selectedPoint]} />
                                    ) : (
                                        <span style={{ fontSize: 9, color: "#253545" }}>Click an anchor to inspect</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pnv-hint">
                    <b>●</b> drag anchors &nbsp;·&nbsp;
                    <b>◇</b> drag <span style={{ color: "#22c55e55" }}>green</span>/<span style={{ color: "#a855f755" }}>purple</span> handles &nbsp;·&nbsp;
                    hover for tooltip &nbsp;·&nbsp; click to select
                </div>
            </div>
        </>
    );
}