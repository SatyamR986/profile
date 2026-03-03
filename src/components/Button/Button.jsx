function Button({ children, href, variant = 'primary', onClick, ...props }) {
  const base =
    'inline-block px-7 py-3 rounded-lg font-semibold text-base cursor-pointer transition-all duration-300 text-center';

  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary-hover hover:shadow-lg hover:-translate-y-0.5',
    outline:
      'bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white hover:-translate-y-0.5',
  };

  const classes = `${base} ${variants[variant]}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export default Button;
