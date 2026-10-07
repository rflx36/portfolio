import { useEffect, useRef, type ReactNode } from "react";

// 4x4 Bayer matrix -> precomputed dither offsets (ordered dithering = crunchy pixel look)
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const DITHER = Float32Array.from(BAYER, (n) => ((n + 0.5) / 16 - 0.5) * 0.22);

const hash = (x: number, y: number): number => {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
};

// Precomputed value-noise lattice (tiles every 256 cells) so we avoid Math.sin per pixel
const LATTICE = new Float32Array(256 * 256);
for (let y = 0; y < 256; y++) {
  for (let x = 0; x < 256; x++) LATTICE[(y << 8) | x] = hash(x, y);
}

function noise(x: number, y: number): number {
  const xf0 = Math.floor(x);
  const yf0 = Math.floor(y);
  let xf = x - xf0;
  let yf = y - yf0;
  xf = xf * xf * (3 - 2 * xf);
  yf = yf * yf * (3 - 2 * yf);
  const x0 = xf0 & 255;
  const x1 = (x0 + 1) & 255;
  const y0 = (yf0 & 255) << 8;
  const y1 = ((yf0 + 1) & 255) << 8;
  const a = LATTICE[y0 | x0];
  const b = LATTICE[y0 | x1];
  const c = LATTICE[y1 | x0];
  const d = LATTICE[y1 | x1];
  return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
}

function fbm(x: number, y: number): number {
  return noise(x, y) * 0.6 + noise(x * 2.1, y * 2.1) * 0.3 + noise(x * 4.3, y * 4.3) * 0.1;
}

const LITTLE_ENDIAN = new Uint8Array(new Uint32Array([1]).buffer)[0] === 1;

// Pack a hex color into a single 32-bit RGBA value matching platform endianness
const hexToPacked = (hex: string): number => {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return LITTLE_ENDIAN
    ? ((255 << 24) | (b << 16) | (g << 8) | r) >>> 0
    : ((r << 24) | (g << 16) | (b << 8) | 255) >>> 0;
};

/**
 * Mostly-black pixelated shader background with sparse lighter-gray dithered
 * drifts, in the spirit of Undertale / Deltarune backdrops.
 *
 * Props:
 *  - cell:    size of one "pixel" in CSS px (default 8)
 *  - speed:   drift speed multiplier (default 1)
 *  - fps:     frames per second (default 15)
 *  - bg:      base color
 *  - light:   soft gray tone
 *  - dark:    brightest gray tone (used only at the densest peaks)
 *  - density: 0..1, how much gray shows up (default 0.35 = sparse)
 */
export interface PixelBackgroundProps {
  cell?: number;
  speed?: number;
  fps?: number;
  bg?: string;
  light?: string;
  dark?: string;
  density?: number;
  className?: string;
  children?: ReactNode;
}

export default function PixelBackground({
  cell = 8,
  speed = 1,
  fps = 15,
  bg = "#fafafa",
  light = "#e2e2e2",
  dark = "#b4b4b4",
  density = 0.35,
  className = "",
  children,
}: PixelBackgroundProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const pBg = hexToPacked(bg);
    const pLight = hexToPacked(light);
    const pDark = hexToPacked(dark);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cols = 0;
    let rows = 0;
    let img: ImageData = ctx.createImageData(1, 1);
    let px = new Uint32Array(img.data.buffer);
    let raf = 0;
    let visible = true;
    let last = -Infinity;
    const frameMs = 1000 / fps;

    const resize = () => {
      const { width, height } = wrap.getBoundingClientRect();
      cols = Math.max(1, Math.ceil(width / cell));
      rows = Math.max(1, Math.ceil(height / cell));
      canvas.width = cols;
      canvas.height = rows;
      img = ctx.createImageData(cols, rows);
      px = new Uint32Array(img.data.buffer);
    };

    // higher density -> lower threshold -> more gray pixels
    const base = 0.78 - density * 0.3;
    const peak = base + 0.1;

    const draw = (time: number) => {
      const t = time * 0.00006 * speed;
      const tu = t * 6;
      const tv = t * 4;
      const t8 = t * 8;
      let i = 0;
      for (let y = 0; y < rows; y++) {
        const yu = y * 0.5;
        const yRow = (y & 3) << 2;
        for (let x = 0; x < cols; x++, i++) {
          // diagonal drift + a slow wobble, like the scrolling Deltarune dark world
          const u = (x + yu) * 0.045 + tu;
          const v = (y - x * 0.35) * 0.045 - tv + Math.sin(t8 + x * 0.03) * 0.4;
          const value = fbm(u, v) + DITHER[yRow | (x & 3)];
          px[i] = value > peak ? pDark : value > base ? pLight : pBg;
        }
      }
      ctx.putImageData(img, 0, 0);
    };

    const loop = (time: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || time - last < frameMs - 1) return; // throttle to target fps
      last = time;
      draw(time);
    };

    resize();
    if (reduced) draw(40000);
    else raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(40000);
    });
    ro.observe(wrap);

    // Skip work while scrolled out of view
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [cell, speed, fps, bg, light, dark, density]);

  return (
    <div
      ref={wrapRef}
      className={`h-full absolute -z-10 w-full overflow-hidden bg-neutral-950 ${className}`}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ imageRendering: "pixelated" }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}