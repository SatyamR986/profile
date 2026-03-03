function Button({ children, href, variant = 'primary', onClick, ...props }) {
  const baseStyles = {
    display: 'inline-block',
    padding: '0.75rem 1.75rem',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'var(--transition)',
    border: 'none',
    textAlign: 'center',
  };

  const variants = {
    primary: {
      backgroundColor: 'var(--accent)',
      color: '#ffffff',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--accent)',
      border: '2px solid var(--accent)',
    },
  };

  const style = { ...baseStyles, ...variants[variant] };

  if (href) {
    return (
      <a href={href} style={style} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button style={style} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export default Button;
