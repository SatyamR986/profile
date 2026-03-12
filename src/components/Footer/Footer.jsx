import { motion } from "framer-motion";

function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { label: "GitHub", href: "https://github.com/SatyamR986" },
    {
      label: "Email",
      href: "https://mail.google.com/mail/?view=cm&to=sregmi986@gmail.com",
    },
  ];

  return (
    <footer className="py-16 border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Logo / Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="#hero"
              className="text-3xl font-bold text-white tracking-tight hover:text-accent transition-colors duration-300"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              SR<span className="text-accent">.</span>
            </a>
            <p className="text-white/50 text-sm mt-2 max-w-xs">
              Crafting modern web experiences with attention to detail.
            </p>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-6"
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-white/50 text-sm font-medium hover:text-accent transition-colors duration-300 uppercase tracking-wider"
              >
                {s.label}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-white/40 text-xs tracking-wide">
            &copy; {year} Satyam Regmi. All rights reserved.
          </p>
          <p className="text-white/40 text-xs tracking-wide">
            Built with React + Vite + Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
