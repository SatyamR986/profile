import { motion } from 'framer-motion';
import { education } from '../data/skills';

function Education() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase drop-shadow-sm">
            Background
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mt-3 leading-tight drop-shadow-lg"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Education
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {education.map((edu, i) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card border border-white/10 p-8 rounded-2xl hover:border-accent/30 hover:shadow-lg hover:shadow-accent/10 transition-all duration-400 group relative overflow-hidden"
            >
              {/* Accent corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-bl-full group-hover:bg-accent/15 transition-colors duration-400" />

              <span className="text-accent/40 text-sm font-mono group-hover:text-accent/70 transition-colors duration-300">
                {edu.year}
              </span>

              <h3
                className="text-xl font-bold text-white mt-3"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {edu.degree}
              </h3>

              <p className="text-accent font-semibold text-sm mt-2">
                {edu.institution}
              </p>

              <p className="text-white/50 text-sm mt-2 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {edu.location}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
