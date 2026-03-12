import { useRef } from "react";
import { motion } from "framer-motion";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard/ProjectCard";

function Projects() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase drop-shadow-sm">
            Portfolio
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mt-3 leading-tight drop-shadow-lg"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Selected Works
          </h2>
          <p className="text-white/60 mt-3 max-w-md">
            Dive into my latest projects where creativity meets craftsmanship.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-3 gap-7">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
