import { skills } from '../data/skills';

function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <p className="section-subtitle">Technologies I work with</p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
        }}>
          {skills.map((category) => (
            <div key={category.title} style={{
              padding: '2rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '12px',
              border: '1px solid var(--border)',
            }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--accent)' }}>
                {category.title}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {category.items.map((skill) => (
                  <span key={skill} style={{
                    padding: '0.4rem 1rem',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
