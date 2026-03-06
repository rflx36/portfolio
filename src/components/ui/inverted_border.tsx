
type CornerPosition = "tl" | "tr" | "bl" | "br";

interface CornerConfig {
  cx: number;
  cy: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface InvertedCornerProps {
  position?: CornerPosition;
  size?: number;
  classNameFill?: string;
  strokeColor?: string;
  strokeWidth?: number;
}



export default function InvertedCorner({
  position = "tl",
  size = 12,
  classNameFill = "#ffffff",
  strokeColor = "#000000",
  strokeWidth = 0
}: InvertedCornerProps) {

  const strokeAppliedWidth = strokeWidth > 0 ? strokeWidth * -0.5 : 0;

  const corners: Record<CornerPosition, CornerConfig> = {
    tl: { cx: size, cy: size, startX: 0, startY: size, endX: size, endY: 0 },
    tr: { cx: 0, cy: size, startX: 0, startY: 0, endX: size, endY: size },
    br: { cx: 0, cy: 0, startX: size, startY: 0, endX: 0, endY: size },
    bl: { cx: size, cy: 0, startX: size, startY: size, endX: 0, endY: 0 },
  };

  const strokes: Record<CornerPosition, CornerConfig> = {
    tl: { cx: size, cy: size, startX: strokeAppliedWidth, startY: size, endX: size, endY: strokeAppliedWidth },
    tr: { cx: strokeAppliedWidth, cy: size, startX: strokeAppliedWidth, startY: strokeAppliedWidth, endX: size, endY: size },
    br: { cx: strokeAppliedWidth, cy: strokeAppliedWidth, startX: size, startY: strokeAppliedWidth, endX: strokeAppliedWidth, endY: size },
    bl: { cx: size, cy: strokeAppliedWidth, startX: size, startY: size, endX: strokeAppliedWidth, endY: strokeAppliedWidth },
  };


  const c: CornerConfig = corners[position];
  const s: CornerConfig = strokes[position];
  const sweep: 0 | 1 = position === "tl" || position === "br" ? 0 : 1;

  const fillPath = `M ${c.startX} ${c.startY} A ${size} ${size} 0 0 ${sweep} ${c.endX} ${c.endY} L ${c.cx} ${c.cy} Z`;

  // Arc-only path for stroke (no fill, just the curve)
  const arcPath = `M ${s.startX} ${s.startY} A ${size} ${size} 0 0 ${sweep} ${s.endX} ${s.endY}`;

  const hasStroke = strokeColor && strokeWidth > 0;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", overflow: "visible" }}
      className={classNameFill}
    >
      {/* Filled concave shape */}
      <path d={fillPath}
        stroke="none"
      />
      {/* Stroke arc drawn on top — only along the curve */}
      {hasStroke && (
        <path
          d={arcPath}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}