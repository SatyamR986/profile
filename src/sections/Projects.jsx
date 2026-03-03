import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard/ProjectCard';

function Projects() {
  return (
    <section id="projects" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">Some things I've built</p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
        }}>
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
