import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { experience } from '../data/skills';

function Experience() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['50px', '-50px']);

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
            Journey
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mt-3 leading-tight drop-shadow-lg"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Experience
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-[1px] bg-white/10" />

          <div className="space-y-12">
            {experience.map((job, i) => (
              <motion.div
                key={job.role + job.company}
                initial={{ opacity: 0, x: -40, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative md:pl-20"
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-6 top-2 w-5 h-5 rounded-full border-2 border-accent bg-ink/50 backdrop-blur-sm items-center justify-center z-10">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>

                {/* Card */}
                <div className="glass-card border border-white/10 p-8 rounded-2xl hover:border-accent/30 hover:shadow-lg hover:shadow-accent/10 transition-all duration-400">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                    <div>
                      <h3
                        className="text-xl font-bold text-white"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        {job.role}
                      </h3>
                      <p className="text-accent font-semibold text-sm mt-1">
                        {job.company}
                      </p>
                    </div>
                    <div className="flex flex-col sm:items-end gap-1">
                      <span className="glass-badge inline-block px-3 py-1 text-accent text-xs font-medium tracking-wide rounded-full">
                        {job.period}
                      </span>
                      <span className="text-white/40 text-xs">
                        {job.location}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {job.points.map((point, j) => (
                      <li
                        key={j}
                        className="text-white/60 text-sm leading-relaxed pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-accent/40"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Experience;
