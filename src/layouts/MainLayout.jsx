import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import bgVideo from '../assets/images/bg-night.mp4';

function MainLayout({ children }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Slow parallax shift on the background
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  // ── Scene colour-grading ──
  const hueRotate = useTransform(
    scrollYProgress,
    [0, 0.12, 0.28, 0.44, 0.60, 0.76, 0.92, 1],
    [0, 15, -20, 35, -10, 25, -15, 0]
  );
  const saturate = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [1, 1.25, 0.8, 1.2, 1]
  );
  const bgBrightness = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [0.55, 0.45, 0.55, 0.42, 0.38]
  );
  const bgFilter = useMotionTemplate`hue-rotate(${hueRotate}deg) saturate(${saturate}) brightness(${bgBrightness})`;

  // ── Coloured scene overlays (cross-fade per section) ──
  const blueOpacity = useTransform(scrollYProgress, [0.1, 0.22, 0.35, 0.45], [0, 0.18, 0.18, 0]);
  const purpleOpacity = useTransform(scrollYProgress, [0.28, 0.38, 0.52, 0.62], [0, 0.14, 0.14, 0]);
  const tealOpacity = useTransform(scrollYProgress, [0.50, 0.60, 0.74, 0.84], [0, 0.14, 0.14, 0]);
  const amberOpacity = useTransform(scrollYProgress, [0.72, 0.82, 0.94, 1], [0, 0.18, 0.18, 0.1]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative text-white"
    >
      {/* ── Fixed full-screen background ── */}
      <div className="fixed inset-0 -z-30 overflow-hidden">
        <motion.div className="absolute inset-0">
          <motion.div
            style={{ y: bgY, scale: bgScale, filter: bgFilter }}
            className="w-full h-full"
          >
            <video
              src={bgVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        {/* ── Overlays ── */}
        <div className="absolute inset-0 bg-ink/40" />

        <motion.div
          style={{ opacity: blueOpacity }}
          className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-blue-500/20 to-transparent"
        />
        <motion.div
          style={{ opacity: purpleOpacity }}
          className="absolute inset-0 bg-gradient-to-tl from-purple-600/40 via-fuchsia-500/20 to-transparent"
        />
        <motion.div
          style={{ opacity: tealOpacity }}
          className="absolute inset-0 bg-gradient-to-br from-teal-500/30 via-emerald-500/20 to-transparent"
        />
        <motion.div
          style={{ opacity: amberOpacity }}
          className="absolute inset-0 bg-gradient-to-tl from-amber-500/30 via-orange-400/20 to-transparent"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-ink/30 via-transparent to-accent/10" />
      </div>

      {/* ── Grain texture overlay ── */}
      <div className="grain-overlay" />

      {/* ── Content ── */}
      <Navbar />
      <main className="relative z-10">{children}</main>
      <div className="section-divider max-w-7xl mx-auto relative z-10" />
      <Footer />
    </div>
  );
}

export default MainLayout;
