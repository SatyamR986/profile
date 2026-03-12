import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import parallaxImg from '../../assets/images/bgimg.png';

function ParallaxBanner({ text, subtext, height = '60vh', overlay = true }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);

  return (
    <div ref={ref} className="relative overflow-hidden" style={{ height }}>
      {/* Parallax image layer */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 -top-[20%] -bottom-[20%]"
      >
        <img
          src={parallaxImg}
          alt=""
          className="w-full h-[140%] object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-ink/60 mix-blend-multiply" />
      )}

      {/* Accent gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-transparent to-accent/10" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8"
      >
        {text && (
          <h3
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {text}
          </h3>
        )}
        {subtext && (
          <p className="text-white/70 text-lg md:text-xl mt-4 max-w-xl tracking-wide">
            {subtext}
          </p>
        )}
      </motion.div>

      {/* Top / bottom fade edges */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-cream to-transparent z-20 parallax-fade-top" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cream to-transparent z-20 parallax-fade-bottom" />
    </div>
  );
}

export default ParallaxBanner;
