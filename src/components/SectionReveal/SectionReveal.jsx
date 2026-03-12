import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useSpring } from 'framer-motion';

/* ── Interpolation helper for complex keyframe curves ── */
function interp(t, stops, values) {
  if (t <= stops[0]) return values[0];
  if (t >= stops[stops.length - 1]) return values[values.length - 1];
  for (let i = 0; i < stops.length - 1; i++) {
    if (t <= stops[i + 1]) {
      const local = (t - stops[i]) / (stops[i + 1] - stops[i]);
      return values[i] + (values[i + 1] - values[i]) * local;
    }
  }
  return values[values.length - 1];
}

/* ═══════════════════════════════════════════════════════════════
   1 ▸ DIMENSIONAL TEAR
   Reality splits down the centre with bright energy, chromatic
   aberration, desaturation→colour pop, overexposed flash fade-in.
   ═══════════════════════════════════════════════════════════════ */
function DimensionalTear({ progress, children }) {
  const s = useSpring(progress, { stiffness: 120, damping: 28 });

  // Vertical slit widening into full reveal
  const leftInset  = useTransform(s, [0, 0.12, 0.42], [49.8, 28, 0]);
  const rightInset = useTransform(s, [0, 0.12, 0.42], [49.8, 28, 0]);
  const topInset   = useTransform(s, [0, 0.20, 0.42], [8, 2, 0]);
  const botInset   = useTransform(s, [0, 0.20, 0.42], [8, 2, 0]);
  const clipPath   = useMotionTemplate`inset(${topInset}% ${rightInset}% ${botInset}% ${leftInset}%)`;

  // Overexposed flash → normal
  const brightness = useTransform(s, [0, 0.10, 0.35], [5, 1.6, 1]);
  const contrast   = useTransform(s, [0, 0.15, 0.38], [2.2, 1.15, 1]);
  const saturate   = useTransform(s, [0, 0.20, 0.42], [0, 0.6, 1]);
  const blur       = useTransform(s, [0, 0.18, 0.42], [18, 3, 0]);
  const filter     = useMotionTemplate`blur(${blur}px) brightness(${brightness}) contrast(${contrast}) saturate(${saturate})`;

  const contentScale = useTransform(s, [0, 0.30, 0.45], [1.25, 1.04, 1]);
  const exitOp       = useTransform(s, [0.84, 1], [1, 0]);
  const exitScale    = useTransform(s, [0.84, 1], [1, 0.88]);

  // Energy glow slit
  const glowOp    = useTransform(s, [0, 0.08, 0.22, 0.48], [0, 1, 0.5, 0]);
  const glowWidth = useTransform(s, [0, 0.08, 0.42], [1, 160, 0]);

  // Chromatic aberration
  const chromaX  = useTransform(s, [0, 0.08, 0.28, 0.42], [0, 12, 4, 0]);
  const chromaNX = useTransform(chromaX, (v) => -v);
  const chromaOp = useTransform(s, [0, 0.06, 0.28, 0.42], [0, 0.55, 0.12, 0]);

  return (
    <motion.div style={{ opacity: exitOp, scale: exitScale }} className="relative overflow-hidden">
      {/* Energy slit glow */}
      <motion.div
        style={{ opacity: glowOp, width: useMotionTemplate`${glowWidth}px` }}
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        aria-hidden
      >
        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/50 to-transparent blur-2xl" />
      </motion.div>

      {/* Red channel */}
      <motion.div style={{ x: chromaX, opacity: chromaOp }} className="absolute inset-0 pointer-events-none z-10 mix-blend-lighten" aria-hidden>
        <div className="w-full h-full bg-red-500/25" />
      </motion.div>
      {/* Cyan channel */}
      <motion.div style={{ x: chromaNX, opacity: chromaOp }} className="absolute inset-0 pointer-events-none z-10 mix-blend-lighten" aria-hidden>
        <div className="w-full h-full bg-cyan-400/25" />
      </motion.div>

      <motion.div style={{ clipPath, filter, scale: contentScale }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   2 ▸ LIQUID DISSOLVE
   Organic, dripping polygon reveal — the top edge undulates
   with multiple sine waves while a liquid sheen follows it.
   ═══════════════════════════════════════════════════════════════ */
function LiquidDissolve({ progress, children }) {
  // Build a wavy polygon that descends
  const clipPath = useTransform(progress, (p) => {
    const t = Math.min(p / 0.45, 1);                    // 0→1 during reveal
    const base = 105 - 115 * t;                          // 105%→ -10%
    const amp  = 18 * Math.pow(1 - t, 1.5);             // wave shrinks
    const pts = [];
    for (let i = 0; i <= 10; i++) {
      const x = i * 10;
      const phase = i * 0.9 + t * 8;                    // scrolling phases
      const y = base + Math.sin(phase) * amp + Math.cos(phase * 1.7) * (amp * 0.4);
      pts.push(`${x}% ${Math.max(y, 0)}%`);
    }
    pts.push('100% 100%', '0% 100%');
    return `polygon(${pts.join(', ')})`;
  });

  const y      = useTransform(progress, [0, 0.45], ['50px', '0px']);
  const blur   = useTransform(progress, [0, 0.30, 0.45], [10, 2, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;
  const exitOp = useTransform(progress, [0.85, 1], [1, 0]);

  // Liquid sheen along the drip edge
  const sheenTop = useTransform(progress, (p) => {
    const t = Math.min(p / 0.45, 1);
    return `${105 - 115 * t}%`;
  });
  const sheenOp = useTransform(progress, [0, 0.04, 0.38, 0.50], [0, 0.8, 0.3, 0]);

  return (
    <motion.div style={{ opacity: exitOp }} className="relative">
      {/* Sheen / highlight along the drip edge */}
      <motion.div
        style={{ top: sheenTop, opacity: sheenOp }}
        className="absolute left-0 right-0 h-28 z-50 pointer-events-none -translate-y-14"
        aria-hidden
      >
        <div className="w-full h-full bg-gradient-to-b from-white/25 via-accent/20 to-transparent blur-lg" />
      </motion.div>

      <motion.div style={{ clipPath, filter, y }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   3 ▸ PRISM REFRACT
   Content refracts through a glass prism — rainbow edge bleed,
   hue-shift, multiple colour-offset ghost layers, perspective tilt.
   ═══════════════════════════════════════════════════════════════ */
function PrismRefract({ progress, children }) {
  const s = useSpring(progress, { stiffness: 100, damping: 26 });

  const scale   = useTransform(s, [0, 0.40, 0.85, 1], [0.55, 1, 1, 0.84]);
  const opacity = useTransform(s, [0, 0.12, 0.40, 0.85, 1], [0, 0.5, 1, 1, 0]);
  const blur    = useTransform(s, [0, 0.22, 0.40], [24, 3, 0]);
  const hue     = useTransform(s, [0, 0.18, 0.40], [120, 35, 0]);
  const filter  = useMotionTemplate`blur(${blur}px) hue-rotate(${hue}deg)`;

  // 3D perspective wobble
  const rotateY = useTransform(s, [0, 0.18, 0.40], [-10, 3, 0]);
  const rotateX = useTransform(s, [0, 0.18, 0.40], [6, -2, 0]);

  // Refracted ghost offset layers
  const gh1x = useTransform(s, [0, 0.14, 0.40], [35, 10, 0]);
  const gh1y = useTransform(s, [0, 0.14, 0.40], [-24, -6, 0]);
  const gh2x = useTransform(s, [0, 0.14, 0.40], [-30, -8, 0]);
  const gh2y = useTransform(s, [0, 0.14, 0.40], [18, 4, 0]);
  const ghOp = useTransform(s, [0, 0.06, 0.24, 0.42], [0, 0.45, 0.15, 0]);

  // Rainbow spectrum band
  const rainbowOp = useTransform(s, [0, 0.08, 0.28, 0.44], [0, 0.9, 0.25, 0]);

  return (
    <div style={{ perspective: '1200px' }} className="relative">
      {/* Ghost layer — rose */}
      <motion.div style={{ x: gh1x, y: gh1y, opacity: ghOp, scale: 1.03 }} className="absolute inset-0 pointer-events-none z-10 mix-blend-screen" aria-hidden>
        <div className="w-full h-full bg-gradient-to-br from-rose-500/35 via-transparent to-transparent" />
      </motion.div>
      {/* Ghost layer — cyan */}
      <motion.div style={{ x: gh2x, y: gh2y, opacity: ghOp, scale: 0.97 }} className="absolute inset-0 pointer-events-none z-10 mix-blend-screen" aria-hidden>
        <div className="w-full h-full bg-gradient-to-tl from-cyan-400/35 via-transparent to-transparent" />
      </motion.div>

      {/* Rainbow spectrum band */}
      <motion.div style={{ opacity: rainbowOp }} className="absolute inset-0 pointer-events-none z-20 mix-blend-screen" aria-hidden>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,0,0,.12), rgba(255,165,0,.12), rgba(255,255,0,.12), rgba(0,255,0,.12), rgba(0,127,255,.12), rgba(139,0,255,.12))' }} />
      </motion.div>

      <motion.div style={{ scale, opacity, filter, rotateY, rotateX }}>
        {children}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   4 ▸ HORIZON BLADE
   A blade of light sweeps top→bottom, revealing content behind
   it. Initial white flash, ambient glow trail, letter-box bars.
   ═══════════════════════════════════════════════════════════════ */
function HorizonBlade({ progress, children }) {
  const bladePos   = useTransform(progress, [0, 0.45], [-5, 105]);
  const revealBot  = useTransform(progress, [0, 0.45], [100, 0]);
  const clipPath   = useMotionTemplate`inset(0% 0% ${revealBot}% 0%)`;
  const y          = useTransform(progress, [0, 0.45], ['30px', '0px']);
  const exitOp     = useTransform(progress, [0.85, 1], [1, 0]);

  // Blade glow
  const bladeOp = useTransform(progress, [0, 0.04, 0.40, 0.50], [0, 1, 0.9, 0]);

  // Brief filter
  const blur   = useTransform(progress, [0, 0.35, 0.45], [5, 1, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  // Opening flash
  const flashOp = useTransform(progress, [0, 0.04, 0.08, 0.14], [0, 0.9, 0.35, 0]);

  // Letterbox bars that peel away
  const barH = useTransform(progress, [0, 0.10, 0.40], [14, 6, 0]);

  return (
    <motion.div style={{ opacity: exitOp }} className="relative overflow-hidden">
      {/* Flash */}
      <motion.div style={{ opacity: flashOp }} className="absolute inset-0 z-50 pointer-events-none bg-white/40" aria-hidden />

      {/* Letterbox bars */}
      <motion.div style={{ height: useMotionTemplate`${barH}%` }} className="absolute top-0 left-0 right-0 z-40 pointer-events-none bg-black/70 backdrop-blur-sm" aria-hidden />
      <motion.div style={{ height: useMotionTemplate`${barH}%` }} className="absolute bottom-0 left-0 right-0 z-40 pointer-events-none bg-black/70 backdrop-blur-sm" aria-hidden />

      {/* Sweeping blade */}
      <motion.div
        style={{ top: useMotionTemplate`${bladePos}%`, opacity: bladeOp }}
        className="absolute left-0 right-0 h-1 z-40 pointer-events-none -translate-y-1/2"
        aria-hidden
      >
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent" />
        <div className="w-full h-20 bg-gradient-to-t from-accent/40 to-transparent -mt-20 blur-sm" />
        <div className="w-full h-28 bg-gradient-to-b from-accent/25 to-transparent blur-lg" />
        <div className="absolute -top-40 left-0 right-0 h-80 bg-gradient-to-b from-transparent via-accent/8 to-transparent blur-2xl" />
      </motion.div>

      <motion.div style={{ clipPath, filter, y }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   5 ▸ DIMENSIONAL FOLD
   3D origami — the section folds out from a centre crease with
   lighting that shifts as the panel rotates. Perspective-heavy.
   ═══════════════════════════════════════════════════════════════ */
function DimensionalFold({ progress, children }) {
  const s = useSpring(progress, { stiffness: 90, damping: 24 });

  const foldAngle = useTransform(s, [0, 0.42], [-85, 0]);
  const foldOp    = useTransform(s, [0, 0.10, 0.42, 0.85, 1], [0, 0.55, 1, 1, 0]);
  const foldScale = useTransform(s, [0, 0.42, 0.85, 1], [0.72, 1, 1, 0.86]);

  // Light changes as panel unfolds
  const brightness = useTransform(s, [0, 0.18, 0.42], [0.25, 0.7, 1]);
  const filter     = useMotionTemplate`brightness(${brightness})`;

  // Shadow underside
  const shadowOp = useTransform(s, [0, 0.14, 0.42], [0.85, 0.4, 0]);

  // Crease highlight
  const creaseOp = useTransform(s, [0, 0.08, 0.32, 0.46], [0, 1, 0.45, 0]);

  // Reflection glare that wipes across the surface
  const glareX  = useTransform(s, [0, 0.42], [-100, 120]);
  const glareOp = useTransform(s, [0, 0.10, 0.30, 0.42], [0, 0.5, 0.3, 0]);

  return (
    <div style={{ perspective: '1600px' }} className="relative">
      {/* Centre crease glow */}
      <motion.div style={{ opacity: creaseOp }} className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] z-50 pointer-events-none" aria-hidden>
        <div className="w-full h-full bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
        <div className="w-full h-12 bg-gradient-to-b from-transparent via-accent/15 to-transparent -mt-6 blur-xl" />
      </motion.div>

      {/* Shadow */}
      <motion.div style={{ opacity: shadowOp }} className="absolute inset-0 z-30 pointer-events-none" aria-hidden>
        <div className="w-full h-1/2 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="w-full h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
      </motion.div>

      {/* Glare wipe */}
      <motion.div style={{ x: useMotionTemplate`${glareX}%`, opacity: glareOp }} className="absolute inset-0 z-40 pointer-events-none" aria-hidden>
        <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent blur-lg" />
      </motion.div>

      <motion.div style={{ rotateX: foldAngle, transformOrigin: 'center bottom', opacity: foldOp, scale: foldScale, filter }}>
        {children}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   6 ▸ WARP TUNNEL
   Content hurtles toward viewer from deep space — barrel stretch,
   radial conic speed-lines, tunnel vignette, overexposure.
   ═══════════════════════════════════════════════════════════════ */
function WarpTunnel({ progress, children }) {
  const s = useSpring(progress, { stiffness: 80, damping: 22 });

  const scale      = useTransform(s, [0, 0.10, 0.42, 0.85, 1], [0.02, 0.25, 1, 1, 0.78]);
  const translateZ = useTransform(s, [0, 0.42], [-2500, 0]);
  const opacity    = useTransform(s, [0, 0.05, 0.42, 0.85, 1], [0, 0.08, 1, 1, 0]);

  const blur       = useTransform(s, [0, 0.14, 0.30, 0.42], [50, 22, 4, 0]);
  const brightness = useTransform(s, [0, 0.08, 0.28, 0.42], [6, 2.5, 1.15, 1]);
  const filter     = useMotionTemplate`blur(${blur}px) brightness(${brightness})`;

  // Barrel distortion (stretch Y, squash X initially, then normalize)
  const scaleX = useTransform(s, [0, 0.15, 0.35, 0.42], [0.25, 0.65, 1.06, 1]);
  const scaleY = useTransform(s, [0, 0.15, 0.35, 0.42], [2.5, 1.4, 0.97, 1]);

  // Radial speed streaks
  const streakOp    = useTransform(s, [0, 0.06, 0.28, 0.42], [0, 0.75, 0.18, 0]);
  const streakScale = useTransform(s, [0, 0.08, 0.42], [3.5, 2, 1]);

  // Tunnel vignette
  const vigOp = useTransform(s, [0, 0.08, 0.32, 0.45], [0, 0.92, 0.3, 0]);

  return (
    <div style={{ perspective: '800px' }} className="relative overflow-hidden">
      {/* Radial speed-lines */}
      <motion.div style={{ opacity: streakOp, scale: streakScale }} className="absolute inset-0 z-50 pointer-events-none" aria-hidden>
        <div className="absolute inset-0" style={{
          background: 'repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(201,169,110,0.18) 0.4deg, transparent 0.8deg, transparent 5deg)',
        }} />
      </motion.div>

      {/* Tunnel vignette */}
      <motion.div style={{ opacity: vigOp }} className="absolute inset-0 z-40 pointer-events-none" aria-hidden>
        <div className="w-full h-full" style={{
          background: 'radial-gradient(ellipse at center, transparent 15%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.92) 100%)',
        }} />
      </motion.div>

      <motion.div style={{ scale, translateZ, opacity, filter, scaleX, scaleY }}>
        {children}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN WRAPPER — maps effect name → component
   ═══════════════════════════════════════════════════════ */
const EFFECTS = {
  portal:  DimensionalTear,
  tear:    DimensionalTear,
  tilt:    DimensionalFold,
  fold:    DimensionalFold,
  glitch:  PrismRefract,
  prism:   PrismRefract,
  rise:    HorizonBlade,
  blade:   HorizonBlade,
  zoom:    WarpTunnel,
  warp:    WarpTunnel,
  vortex:  LiquidDissolve,
  liquid:  LiquidDissolve,
};

function SectionReveal({ children, effect = 'portal', id }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const EffectComponent = EFFECTS[effect] || DimensionalTear;

  return (
    <div ref={ref} id={id}>
      <EffectComponent progress={scrollYProgress}>
        {children}
      </EffectComponent>
    </div>
  );
}

export default SectionReveal;
