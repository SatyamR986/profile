function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      padding: '2rem 0',
      textAlign: 'center',
      borderTop: '1px solid var(--border)',
      color: 'var(--text-secondary)',
      fontSize: '0.9rem',
    }}>
      <div className="container">
        <p>&copy; {year} Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
