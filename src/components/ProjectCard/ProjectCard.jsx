function ProjectCard({ title, description, tags, image, liveUrl, repoUrl }) {
  return (
    <div style={{
      backgroundColor: 'var(--card-bg)',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow)',
      transition: 'transform var(--transition)',
    }}>
      {image && (
        <div style={{ overflow: 'hidden', height: '200px' }}>
          <img
            src={image}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem' }}>
          {description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: '0.25rem 0.75rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '20px',
                fontSize: '0.8rem',
                color: 'var(--accent)',
                fontWeight: 500,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', fontWeight: 500 }}>
              Live Demo ↗
            </a>
          )}
          {repoUrl && (
            <a href={repoUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
              Source Code ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
