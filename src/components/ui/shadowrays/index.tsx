import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export interface ShadowRaysProps {
  /** Ray slant in degrees. */
  slant?: number;
  /** How many shafts fit across the frame. Higher = thinner, more numerous rays. */
  density?: number;
  /** Separation between light and shade. */
  contrast?: number;
  /** Chromatic aberration strength (1 unit = 0.1% of the frame width). */
  aberration?: number;
  /** Grain amount, 0–1. */
  noise?: number;
  /** Drift speed multiplier. 0 freezes the rays. */
  speed?: number;
  /**
   * Fill behind the rays. Transparent by default, so the rays sit over whatever is behind the component.
   * A hex value also paints the wrapper and is used as the reference colour for the aberration fringes.
   */
  background?: string;
  /** Colour of the shaded shafts. */
  shadow?: string;
  /** Colour of the sunlit shafts. */
  highlight?: string;
  /** Cap on devicePixelRatio, to keep large screens cheap. */
  maxDpr?: number;
  /** Frame rate cap. The animation is drawn at most this many times per second. */
  maxFps?: number;
  /**
   * Extra resolution multiplier on top of the DPR (0.25–1). The rays are soft, so 0.75 is
   * nearly indistinguishable and cuts pixel work by ~44%.
   */
  renderScale?: number;
  /**
   * Seed for the ray pattern. The same seed always gives the same layout; change it for a different one.
   * Accepts any number (fractions included). 0 is the default layout.
   */
  seed?: number;
  className?: string;
  style?: CSSProperties;
  /** Hero content, rendered above the rays. */
  children?: ReactNode;
}

const VERT = "attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }";

const FRAG = /* glsl */ `
precision highp float;
uniform vec2 uRes, uRot;          // uRot = (cos, sin) of the slant, computed on the CPU
uniform vec2 uSeed;               // domain offset derived from the seed prop, computed on the CPU
uniform float uTime, uFreq, uContrast, uCA, uGrain;
uniform vec3 uBG, uSH, uHI;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0)), c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
// Low-frequency helper fields only need 3 octaves.
float fbm3(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 3; i++) { v += a * vnoise(p); p = p * 2.03 + vec2(17.1, 9.7); a *= 0.5; }
  return v;
}
// The ray pattern itself keeps 4 octaves for crisp edges.
float fbm4(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * vnoise(p); p = p * 2.03 + vec2(17.1, 9.7); a *= 0.5; }
  return v;
}

// Signed ray value for one channel: > 0 is a sunlit shaft, < 0 is a shaded one.
// warp / gain / mask are shared between channels, so only the 4-octave fbm runs per channel.
float chan(vec2 q, float k, float warp, float gain, float mask) {
  float n = fbm4(vec2(q.x * k + warp + uTime * 0.05 + uSeed.x, q.y * 0.35 - uTime * 0.04 + uSeed.y));
  return clamp((n - 0.47) * gain, -1.0, 1.0) * mask;
}

// How much of a shaft (shaded if f < 0, sunlit if f > 0) covers this pixel. Grain breaks the edges up.
float cover(float f, float g) {
  float m = smoothstep(0.0, 1.0, abs(f));
  if (uGrain <= 0.0) return m;
  float k = f > 0.0 ? (1.0 - g) * 1.7 : g * 1.7;
  return clamp(m * mix(1.0, k, uGrain), 0.0, 1.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float asp = uRes.x / uRes.y;

  vec2 p = (uv - 0.5) * vec2(asp, 1.0);
  vec2 q = vec2(uRot.x * p.x - uRot.y * p.y, uRot.y * p.x + uRot.x * p.y);

  // Everything that varies slowly across the frame is evaluated once per pixel, not once per channel.
  float k = uFreq / (1.0 + (1.0 - uv.y) * 0.35);
  float warp = fbm3(vec2(q.x * 0.8 + uSeed.y, q.y * 0.6 + uTime * 0.03 + uSeed.x)) * 1.2;
  float big = 0.55 + fbm3(vec2(q.x * 0.7 - uTime * 0.02 + uSeed.x, 3.0 + uSeed.y));
  float gain = 2.0 * big * uContrast;
  float mask = mix(0.25, 1.0, smoothstep(0.0, 1.0, uv.y));

  float fr, fg, fb;
  fg = chan(q, k, warp, gain, mask);
  if (uCA > 0.0) {
    // Chromatic aberration: shift the sample point per channel, stronger toward the edges.
    float ca = uCA * (0.4 + length(uv - 0.5) * 1.2);
    vec2 off = vec2(ca * asp, ca * 0.25);
    vec2 dq = vec2(uRot.x * off.x - uRot.y * off.y, uRot.y * off.x + uRot.x * off.y);
    fr = chan(q + dq, k, warp, gain, mask);
    fb = chan(q - dq, k, warp, gain, mask);
  } else {
    fr = fg; fb = fg;
  }

  float g = uGrain > 0.0 ? hash(gl_FragCoord.xy + floor(uTime * 8.0) * 7.31 + uSeed) : 0.0;
  float ar = cover(fr, g), ag = cover(fg, g), ab = cover(fb, g);

  // Premultiplied alpha: pixels with no ray stay fully transparent. Alpha is the strongest channel's
  // coverage; a channel with less coverage is topped up with the reference background so the colour
  // fringes keep their tint instead of turning dark.
  float A = max(ar, max(ag, ab));
  vec3 P = vec3(
    (fr > 0.0 ? uHI.r : uSH.r) * ar + (A - ar) * uBG.r,
    (fg > 0.0 ? uHI.g : uSH.g) * ag + (A - ag) * uBG.g,
    (fb > 0.0 ? uHI.b : uSH.b) * ab + (A - ab) * uBG.b
  );
  gl_FragColor = vec4(P, A);
}`;

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.trim().replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h, 16);
  if (Number.isNaN(n) || h.length !== 6) return [0.77, 0.77, 0.77];
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

// Maps a seed to a stable offset in noise space. Seed 0 maps to (0, 0), the original layout.
// Offsets stay within 0–64 so the shader's hash keeps its precision.
function seedOffset(seed: number): [number, number] {
  if (!seed || !Number.isFinite(seed)) return [0, 0];
  const fract = (x: number) => x - Math.floor(x);
  return [fract(Math.sin(seed * 127.1 + 1.7) * 43758.5453) * 64, fract(Math.sin(seed * 311.7 + 9.3) * 43758.5453) * 64];
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("ShadowRays shader error:", gl.getShaderInfoLog(shader));
  }
  return shader;
}

export default function ShadowRays({
  slant = -30,
  density = 3,
  contrast = 1,
  aberration = 30,
  noise = 0,
  speed = 1.2,
  background = "transparent",
  shadow = "#a69f9f",
  highlight = "#fcf8f0",
  maxDpr = 1.5,
  maxFps = 15,
  renderScale = 0.75,
  seed =250,
  className = "",
  style,
  children,
}: ShadowRaysProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Latest props live in a ref so the render loop never restarts when they change.
  const propsRef = useRef({
    slant, density, contrast, aberration, noise, speed, background, shadow, highlight, maxDpr, maxFps, renderScale, seed,
  });
  propsRef.current = {
    slant, density, contrast, aberration, noise, speed, background, shadow, highlight, maxDpr, maxFps, renderScale, seed,
  };

  // Set by the prop-change effect below; the render loop reads these.
  const uniformsDirty = useRef(true);
  const sizeDirty = useRef(true);
  const syncRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: true,
      premultipliedAlpha: true,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
      preserveDrawingBuffer: false,
    });
    if (!gl) return; // nothing is drawn; the wrapper simply stays transparent
    gl.clearColor(0, 0, 0, 0);
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(prog, name);
    const U = {
      res: u("uRes"), rot: u("uRot"), seed: u("uSeed"), time: u("uTime"), freq: u("uFreq"), contrast: u("uContrast"),
      ca: u("uCA"), grain: u("uGrain"), bg: u("uBG"), sh: u("uSH"), hi: u("uHI"),
    };

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motion.matches;

    let clock = 4; // seconds of "ray time", advanced by speed so changing speed never jumps
    let lastFrame = performance.now();
    let raf = 0;
    let visible = true;

    // Uploaded only when a prop changed or the canvas was resized, never per frame.
    const uploadStatic = () => {
      const p = propsRef.current;
      if (sizeDirty.current) {
        sizeDirty.current = false;
        const dpr = Math.min(window.devicePixelRatio || 1, p.maxDpr) * Math.min(Math.max(p.renderScale, 0.25), 1);
        const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
        const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
          gl.viewport(0, 0, w, h);
        }
        gl.uniform2f(U.res, canvas.width, canvas.height);
      }
      if (uniformsDirty.current) {
        uniformsDirty.current = false;
        const rad = (p.slant * Math.PI) / 180;
        gl.uniform2f(U.rot, Math.cos(rad), Math.sin(rad));
        gl.uniform2fv(U.seed, seedOffset(p.seed));
        gl.uniform1f(U.freq, p.density);
        gl.uniform1f(U.contrast, p.contrast);
        gl.uniform1f(U.ca, p.aberration / 1000);
        gl.uniform1f(U.grain, p.noise);
        gl.uniform3fv(U.bg, hexToRgb(p.background));
        gl.uniform3fv(U.sh, hexToRgb(p.shadow));
        gl.uniform3fv(U.hi, hexToRgb(p.highlight));
      }
    };

    const render = () => {
      uploadStatic();
      gl.uniform1f(U.time, clock);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const minDt = 1000 / Math.max(1, propsRef.current.maxFps);
      const elapsed = now - lastFrame;
      if (elapsed < minDt - 1) return; // under the cap: skip this vsync, draw on a later one
      lastFrame = now - (elapsed % minDt); // keep pacing steady instead of drifting
      clock += Math.min(elapsed / 1000, 0.1) * propsRef.current.speed;
      render();
    };

    const animating = () => !reducedMotion && visible && propsRef.current.speed > 0;
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    // Starts or stops the loop to match the current state; when idle, draws a single still frame.
    const sync = () => {
      if (animating()) {
        if (!raf) {
          lastFrame = performance.now();
          raf = requestAnimationFrame(tick);
        }
      } else {
        stop();
        if (visible) render();
      }
    };
    syncRef.current = sync;

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(canvas);

    // Size is measured here, not in the frame loop, to avoid forced layout reads every frame.
    const ro = new ResizeObserver(() => {
      sizeDirty.current = true;
      if (!raf && visible) render(); // when idle there is no loop to pick the change up
    });
    ro.observe(canvas);

    const onMotion = () => {
      reducedMotion = motion.matches;
      sync();
    };
    motion.addEventListener("change", onMotion);

    sync();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      motion.removeEventListener("change", onMotion);
      syncRef.current = null;
      gl.deleteBuffer(buffer);
      gl.deleteProgram(prog);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  // Flag changed props for upload, and redraw once if the loop is idle (frozen or reduced motion).
  useEffect(() => {
    uniformsDirty.current = true;
    sizeDirty.current = true;
    syncRef.current?.();
  }, [slant, density, contrast, aberration, noise, speed, background, shadow, highlight, maxDpr, renderScale, seed]);

  return (
    <div
      className={`overflow-hidden absolute opacity-0 animate-[fadeIn_3s_cubic-bezier(0.130,0.835,0.130,0.830)_forwards] inset-0 z-10 ${className}`}
      style={{ backgroundColor: background, ...style }}
    >
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
      {children}
    </div>
  );
}