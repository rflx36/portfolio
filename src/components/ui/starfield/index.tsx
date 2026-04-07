import { useEffect, useRef, useCallback } from "react";

// ─── Configuration ────────────────────────────────────────────────────────────
const CONFIG = {
  FRM_RATE: 1,
  MAX_QUAN: 100,
  MAX_SIZE: 2,
  MIN_SIZE: 1,
  MAX_BLUR: 20,
  MIN_BLUR: 0.1,
  OPC_STAR: 1,
  INN_FADE: 30,
  OUT_FADE: 50,
  RGB_PROB: 5,
  RGB_COLR: [0, 0, 0]     as [number, number, number],
  MAX_COLR: [0, 0, 255]   as [number, number, number],
  MIN_COLR: [0, 100, 0]   as [number, number, number],
  PARALLAX_SPEED: 0.1,   // how much stars shift relative to scroll (0–1)
  LERP_FACTOR:    0.1,   // momentum smoothness — lower = more floaty
} as const;

// ─── Types ────────────────────────────────────────────────────────────────────
interface StarData {
  x: number;
  y: number;
  size: number;
  blur: number;
  opac: number;
  color: [number, number, number];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function randBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function createStar(width: number, height: number): StarData {
  const isColored = Math.random() <= CONFIG.RGB_PROB / 100;

  const color: [number, number, number] = isColored
    ? [
        Math.round(randBetween(CONFIG.MIN_COLR[0], CONFIG.MAX_COLR[0])),
        Math.round(randBetween(CONFIG.MIN_COLR[1], CONFIG.MAX_COLR[1])),
        Math.round(randBetween(CONFIG.MIN_COLR[2], CONFIG.MAX_COLR[2])),
      ]
    : [...CONFIG.RGB_COLR];

  return {
    x:    width  * Math.random(),
    y:    height * Math.random(),
    size: Math.round(randBetween(CONFIG.MIN_SIZE, CONFIG.MAX_SIZE)),
    blur: randBetween(CONFIG.MIN_BLUR, CONFIG.MAX_BLUR),
    opac: CONFIG.OPC_STAR,
    color,
  };
}

function drawStar(ctx: CanvasRenderingContext2D, star: StarData): void {
  const { x, y, size, blur, opac, color } = star;
  const rgba = `rgba(${color[0]},${color[1]},${color[2]},${opac})`;

  ctx.beginPath();
  ctx.arc(x, y, size, 0, 2 * Math.PI);
  ctx.fillStyle   = rgba;
  ctx.shadowColor = rgba;
  ctx.shadowBlur  = blur;
  ctx.fill();
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function StarField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const starsRef     = useRef<StarData[]>([]);
  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  // Parallax state
  const scrollTargetRef  = useRef(0);  // where we want to be
  const scrollCurrentRef = useRef(0);  // smoothed current position
  const rafRef           = useRef<number | null>(null);

  const getCtx = useCallback((): CanvasRenderingContext2D | null => {
    return canvasRef.current?.getContext("2d") ?? null;
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    canvas.width  = container.offsetWidth;
    canvas.height = container.offsetHeight;

    starsRef.current = Array.from({ length: CONFIG.MAX_QUAN }, () =>
      createStar(canvas.width, canvas.height)
    );
  }, []);

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx    = getCtx();
    if (!canvas || !ctx) return;

    // Reset transform before clearing so clearRect covers the full canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply parallax vertical offset
    ctx.setTransform(1, 0, 0, 1, 0, -scrollCurrentRef.current);

    // Cycle: push new star, drop oldest
    starsRef.current.push(createStar(canvas.width, canvas.height));
    starsRef.current.shift();

    const innPrc = (CONFIG.INN_FADE * CONFIG.MAX_QUAN) / 100;
    const outPrc = (CONFIG.OUT_FADE * CONFIG.MAX_QUAN) / 100;

    for (let i = 0; i < starsRef.current.length && i < CONFIG.MAX_QUAN; i++) {
      const star = starsRef.current[i];

      if (i < outPrc) {
        star.opac = (i * CONFIG.OPC_STAR) / outPrc;
      } else if (i > CONFIG.MAX_QUAN - innPrc) {
        star.opac -= (i - (CONFIG.MAX_QUAN - innPrc)) / innPrc;
      }

      drawStar(ctx, star);
      star.opac = CONFIG.OPC_STAR;
    }
  }, [getCtx]);

  // Star animation interval
  useEffect(() => {
    resizeCanvas();

    const observer = new ResizeObserver(resizeCanvas);
    if (containerRef.current) observer.observe(containerRef.current);

    intervalRef.current = setInterval(drawFrame, 1000 / CONFIG.FRM_RATE);

    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [resizeCanvas, drawFrame]);

  // Parallax scroll listener + momentum RAF loop
  useEffect(() => {
    const onScroll = () => {
      scrollTargetRef.current = window.scrollY * CONFIG.PARALLAX_SPEED;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      // Lerp: smoothly close the gap between current and target each frame
      scrollCurrentRef.current +=
        (scrollTargetRef.current - scrollCurrentRef.current) * CONFIG.LERP_FACTOR;

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 bg-bg opacity-50"
    >
        <div className="absolute inset-0 w-1/2 h-full mx-auto bg-bg z-10"/>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}