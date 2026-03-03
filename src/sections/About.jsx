function About() {
  return (
    <section id="about" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">Get to know me better</p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
        }}>
          <div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              I'm a web developer with a passion for creating clean, efficient,
              and user-friendly applications. I enjoy turning complex problems
              into simple, beautiful solutions.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: '1rem' }}>
              When I'm not coding, you can find me exploring new technologies,
              contributing to open source, or learning something new.
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
          }}>
            {[
              { label: 'Projects', value: '10+' },
              { label: 'Experience', value: '2+ Years' },
              { label: 'Technologies', value: '15+' },
              { label: 'Commits', value: '500+' },
            ].map((stat) => (
              <div key={stat.label} style={{
                textAlign: 'center',
                padding: '1.5rem',
                backgroundColor: 'var(--card-bg)',
                borderRadius: '12px',
                border: '1px solid var(--border)',
              }}>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--accent)', fontWeight: 700 }}>
                  {stat.value}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
