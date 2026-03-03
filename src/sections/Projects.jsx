import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard/ProjectCard';

function Projects() {
  return (
    <section id="projects" className="py-20 bg-alt bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-2">Projects</h2>
        <p className="text-muted text-gray-500 mb-10">Some things I've built</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
