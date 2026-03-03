function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 text-center border-t footer-border border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-muted text-gray-500 text-sm mb-2">
          Built with React + Vite + Tailwind CSS
        </p>
        <p className="text-muted text-gray-500 text-sm">
          &copy; {year} Satyam Regmi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
