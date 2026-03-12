import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { skills } from '../data/skills';

function Skills() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['40px', '-40px']);

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden">
      <motion.div style={{ y }} className="max-w-7xl mx-auto px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase drop-shadow-sm">
            Expertise
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mt-3 leading-tight drop-shadow-lg"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Skills & Tools
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-card p-8 rounded-2xl hover:border-accent/30 hover:shadow-lg hover:shadow-accent/10 transition-all duration-400 group border border-white/10"
            >
              <span className="text-accent/40 text-sm font-mono group-hover:text-accent/70 transition-colors duration-300">
                {String(i + 1).padStart(2, '0')}
              </span>

              <h3
                className="text-xl font-bold text-white mt-3 mb-6"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-2.5">
                {category.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-white/5 rounded-full text-sm font-medium text-white/70 hover:bg-accent hover:text-white transition-all duration-300 cursor-default border border-white/10 hover:border-accent"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marquee of skills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 overflow-hidden relative"
        >
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-ink/40 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-ink/40 to-transparent z-10" />
          <div className="flex animate-marquee whitespace-nowrap">
            {[...skills.flatMap(s => s.items), ...skills.flatMap(s => s.items)].map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="mx-6 text-white/15 text-lg font-semibold tracking-wide uppercase"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Skills;
