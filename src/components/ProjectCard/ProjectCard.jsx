function ProjectCard({ title, description, tags, liveUrl, repoUrl }) {
  return (
    <div className="card bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted text-gray-500 text-sm leading-relaxed mb-4 flex-1">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-indigo-50 text-primary rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-4 mt-auto">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="text-primary font-medium text-sm hover:underline"
            >
              Live Demo ↗
            </a>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-muted text-gray-500 font-medium text-sm hover:underline"
            >
              Source Code ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
