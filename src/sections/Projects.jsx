import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard/ProjectCard';

function Projects() {
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['50px', '-50px']);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = 420;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden">
      <motion.div style={{ y }} className="max-w-7xl mx-auto px-8">
        {/* Header with nav arrows */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase drop-shadow-sm">
              Portfolio
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-white mt-3 leading-tight drop-shadow-lg"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Selected Works
            </h2>
            <p className="text-white/60 mt-3 max-w-md">
              Dive into my latest projects where creativity meets craftsmanship.
            </p>
          </motion.div>

          {/* Scroll arrows */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex gap-3"
          >
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-accent hover:bg-accent hover:text-white transition-all duration-300 cursor-pointer text-white/70 backdrop-blur-sm"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-accent hover:bg-accent hover:text-white transition-all duration-300 cursor-pointer text-white/70 backdrop-blur-sm"
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-7 overflow-x-auto scrollbar-hide pb-4 -mx-8 px-8 snap-x snap-mandatory"
        >
          {projects.map((project, i) => (
            <div key={project.title} className="min-w-[380px] max-w-[400px] snap-start flex-shrink-0">
              <ProjectCard {...project} index={i} />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Projects;
