import { motion } from 'framer-motion';

function ProjectCard({ title, description, tags, liveUrl, repoUrl, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group glass-card border border-white/10 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-2 transition-all duration-500 flex flex-col hover:border-accent/30"
    >
      {/* Gradient accent bar */}
      <div className="h-1 bg-gradient-to-r from-accent via-highlight to-accent/40" />

      <div className="p-7 flex flex-col flex-1">
        {/* Number + Title */}
        <div className="flex items-start gap-3 mb-3">
          <span className="text-accent/40 text-sm font-mono mt-1">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3
            className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-300"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {title}
          </h3>
        </div>

        <p className="text-white/60 text-sm leading-relaxed mb-5 flex-1">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="glass-badge px-3 py-1 text-accent rounded-full text-xs font-medium tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-5 mt-auto pt-4 border-t border-white/10">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="text-accent font-medium text-sm hover:underline flex items-center gap-1 group/link"
            >
              Live Demo
              <svg className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-white/50 font-medium text-sm hover:text-accent hover:underline flex items-center gap-1 transition-colors"
            >
              Source
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
