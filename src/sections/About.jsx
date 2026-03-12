import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['60px', '-60px']);
  const statsY = useTransform(scrollYProgress, [0, 1], ['80px', '-40px']);

  const highlights = [
    { label: 'Projects', value: '5+', icon: '◆' },
    { label: 'Years Exp.', value: '2+', icon: '◇' },
    { label: 'Technologies', value: '10+', icon: '○' },
    { label: 'Companies', value: '2', icon: '△' },
  ];

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase drop-shadow-sm">
            About
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mt-3 leading-tight drop-shadow-lg"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            More about me
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Text content — parallax layer */}
          <motion.div style={{ y }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="glass-section p-8 rounded-2xl"
            >
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                I'm a WordPress developer and frontend engineer with hands-on
                experience building responsive, visually polished websites. I work
                with React, Vite, and Redux Toolkit — focusing on clean UI and
                seamless API integration.
              </p>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                Comfortable working in team environments and delivering reliable
                solutions within deadlines. Passionate about writing clean,
                maintainable code and creating digital experiences that feel
                effortless.
              </p>

              {/* Signature */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-highlight flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-accent/20" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  S
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Satyam Regmi</p>
                  <p className="text-white/50 text-xs">Frontend Developer, Kathmandu</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats grid — different parallax speed */}
          <motion.div style={{ y: statsY }} className="grid grid-cols-2 gap-5">
            {highlights.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="glass-card p-6 rounded-2xl hover:border-accent/30 hover:shadow-lg hover:shadow-accent/10 transition-all duration-400 group border border-white/10"
              >
                <span className="text-accent/50 text-lg group-hover:text-accent transition-colors duration-300">
                  {stat.icon}
                </span>
                <h3
                  className="text-3xl font-bold text-white mt-3"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {stat.value}
                </h3>
                <p className="text-white/50 text-sm mt-1 tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
