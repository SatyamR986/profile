import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '../components/Button/Button';
import profileImg from '../assets/images/Profile.jpg';

/* ── Split text into characters for stagger animation ── */
function SplitText({ children, className, style, delay = 0 }) {
  const text = typeof children === 'string' ? children : '';
  return (
    <span className={className} style={{ ...style, display: 'inline-block' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 80, rotateX: 90, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.035,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: 'inline-block', transformOrigin: 'bottom' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const decorY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const decorScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="min-h-screen flex items-center relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-8 w-full pt-32 pb-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left content */}
          <motion.div
            style={{ y: contentY, opacity: contentOpacity }}
            className="lg:col-span-7 order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-1.5 rounded-full glass-badge text-white/90 text-xs font-semibold tracking-wider uppercase">
                Available for work
              </span>
            </motion.div>

            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight text-white mb-6 drop-shadow-lg"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <SplitText delay={0.2}>Creative</SplitText>
              <br />
              <span className="text-accent drop-shadow-[0_2px_10px_rgba(201,169,110,0.4)]">
                <SplitText delay={0.55}>Frontend</SplitText>
              </span>
              <br />
              <SplitText delay={0.9}>Developer</SplitText>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/70 text-lg md:text-xl max-w-md leading-relaxed mb-10"
            >
              Crafting responsive, pixel-perfect digital experiences with modern tools and creative flair.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: 1.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-4 flex-wrap"
            >
              <Button href="#projects" variant="hero">
                View Projects
              </Button>
              <Button href="#contact" variant="outline">
                Get in Touch
              </Button>
            </motion.div>
          </motion.div>

          {/* Right side — decorative ring */}
          <motion.div
            style={{ y: decorY, scale: decorScale }}
            className="lg:col-span-5 flex items-center justify-center relative mt-10 lg:mt-0 order-1 lg:order-2"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.3, rotate: 90, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80"
            >
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/10 animate-[spin_25s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-white/10" />
              <div className="absolute inset-8 rounded-full glass-card" />

              <div className="absolute inset-8 rounded-full overflow-hidden">
                <img
                  src={profileImg}
                  alt="Satyam Regmi"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -top-3 left-1/2 w-3 h-3 rounded-full bg-accent animate-pulse-glow" />
              <div className="absolute top-1/2 -right-3 w-2 h-2 rounded-full bg-highlight animate-pulse-glow animation-delay-400" />
              <div className="absolute -bottom-3 left-1/3 w-2.5 h-2.5 rounded-full bg-accent/60 animate-pulse-glow animation-delay-800" />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-[1px] h-8 bg-white/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-accent animate-[scroll_1.5s_ease-in-out_infinite]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
