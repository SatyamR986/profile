function Button({ children, href, variant = 'primary', onClick, ...props }) {
  const base =
    'inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide cursor-pointer transition-all duration-400 text-center relative overflow-hidden uppercase';

  const variants = {
    primary:
      'bg-accent text-white hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5 active:translate-y-0',
    hero:
      'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:shadow-xl hover:-translate-y-1 active:translate-y-0',
    outline:
      'bg-transparent text-white border-2 border-white/30 hover:bg-white/10 hover:border-accent hover:text-accent hover:-translate-y-0.5 active:translate-y-0',
    ghost:
      'bg-transparent text-accent hover:bg-accent/10 px-4 py-2',
  };

  const classes = `${base} ${variants[variant]}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        <span className="relative z-10">{children}</span>
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export default Button;
