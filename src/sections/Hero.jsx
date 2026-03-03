import Button from '../components/Button/Button';

function Hero() {
  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '5rem',
    }}>
      <div className="container">
        <p style={{ color: 'var(--accent)', fontWeight: 600, marginBottom: '0.5rem' }}>
          Hello, I'm
        </p>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem' }}>
          Your Name
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: 'var(--text-secondary)',
          maxWidth: '550px',
          marginBottom: '2rem',
        }}>
          A passionate developer who loves building modern web applications.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button href="#projects">View Projects</Button>
          <Button href="#contact" variant="outline">Contact Me</Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
