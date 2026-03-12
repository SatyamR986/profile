import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ── Rolling digit counter ── */
function Digit({ place, target }) {
  const digit = Math.floor(target / place) % 10;
  return (
    <span
      className="inline-block relative overflow-hidden"
      style={{ width: "0.62em", height: "1.15em", verticalAlign: "bottom" }}
    >
      <motion.span
        className="absolute inset-x-0 flex flex-col items-center"
        initial={{ y: "0%" }}
        whileInView={{ y: `${-digit * 10}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} style={{ height: "1.15em", lineHeight: "1.15em" }}>
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

function CountUp({ value, suffix = "" }) {
  const num = parseInt(value, 10);
  const digits = String(num).length;
  return (
    <>
      {Array.from({ length: digits }, (_, i) => (
        <Digit key={i} place={Math.pow(10, digits - 1 - i)} target={num} />
      ))}
      {suffix && <span className="text-accent">{suffix}</span>}
    </>
  );
}

/* ── Stat card with animated ring ── */
function StatRing({ stat, index }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const gradId = `ringGrad-${index}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: 0.15 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      <div className="relative rounded-2xl p-5 border border-white/[0.06] bg-white/[0.03] backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-accent/30 hover:bg-white/[0.06] hover:shadow-[0_8px_40px_-12px_rgba(201,169,110,0.15)]">
        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-accent/8 rounded-full blur-2xl" />
        </div>

        <div className="relative flex items-center gap-4">
          {/* SVG ring */}
          <div className="relative shrink-0">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              className="transform -rotate-90"
            >
              <circle
                cx="32"
                cy="32"
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="2.5"
              />
              <motion.circle
                cx="32"
                cy="32"
                r={radius}
                fill="none"
                stroke={`url(#${gradId})`}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                whileInView={{
                  strokeDashoffset: circumference * (1 - stat.fill),
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.6,
                  delay: 0.3 + index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
              <defs>
                <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-accent)" />
                  <stop offset="100%" stopColor="var(--color-highlight)" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-accent/60 text-sm group-hover:text-accent transition-colors duration-300">
              {stat.icon}
            </span>
          </div>

          <div>
            <h3
              className="text-3xl font-bold text-white leading-none tracking-tight"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              <CountUp value={stat.num} suffix={stat.suffix} />
            </h3>
            <p className="text-white/40 text-xs mt-1.5 tracking-wide font-medium group-hover:text-white/60 transition-colors duration-300">
              {stat.label}
            </p>
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="mt-4 h-[2px] rounded-full bg-white/[0.05] overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent/60 to-highlight/40"
            initial={{ width: "0%" }}
            whileInView={{ width: `${stat.fill * 100}%` }}
            viewport={{ once: true }}
            transition={{
              duration: 1.4,
              delay: 0.4 + index * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["60px", "-60px"]);
  const statsY = useTransform(scrollYProgress, [0, 1], ["80px", "-40px"]);

  const highlights = [
    { label: "Completed Projects", num: "5", suffix: "+", icon: "◆", fill: 1 },
    { label: "Years Experience", num: "2", suffix: "", icon: "◇", fill: 1 },
    { label: "Companies Worked", num: "2", suffix: "", icon: "△", fill: 1 },
  ];

  const focus = [
    {
      title: "UI Engineering",
      desc: "Pixel-perfect interfaces with motion & micro-interactions",
      color: "from-accent/20 to-accent/5",
    },
    {
      title: "Performance",
      desc: "Optimised bundles, lazy loading & smooth 60fps animations",
      color: "from-highlight/20 to-highlight/5",
    },
    {
      title: "Design Systems",
      desc: "Reusable component libraries with consistent design tokens",
      color: "from-accent/15 to-highlight/5",
    },
  ];

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase drop-shadow-sm">
            About
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mt-3 leading-tight drop-shadow-lg"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            More about me
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* ─── Left: Bio card ─── */}
          <motion.div style={{ y }} className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative rounded-2xl p-8 md:p-10 border border-white/[0.06] bg-white/[0.03] backdrop-blur-md overflow-hidden"
            >
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-20 h-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-accent/50 to-transparent" />
                <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-accent/50 to-transparent" />
              </div>
              <div className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-accent/30 to-transparent" />
                <div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-t from-accent/30 to-transparent" />
              </div>

              {/* Ambient glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/[0.04] rounded-full blur-3xl pointer-events-none" />

              <p className="text-white/80 text-lg leading-relaxed mb-6">
                I'm a frontend developer specializing in building responsive,
                user-centered websites and web applications. I translate design
                concepts into clean, performant interfaces using HTML, CSS,
                JavaScript, and React, focusing on both usability and visual
                polish.
              </p>

              <p className="text-white/80 text-lg leading-relaxed mb-8">
                Experienced with tools like React, Vite, Redux Toolkit, and
                Figma, I create scalable, dynamic frontends and seamless user
                experiences. Comfortable collaborating in team environments, I
                prioritize writing clean, maintainable code that makes digital
                products intuitive and effortless to use.
              </p>

              {/* Focus areas */}
              <div className="grid sm:grid-cols-3 gap-3 mb-8">
                {focus.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    className={`rounded-xl p-4 bg-gradient-to-br ${item.color} border border-white/[0.05]`}
                  >
                    <h4 className="text-white/90 text-sm font-semibold mb-1">
                      {item.title}
                    </h4>
                    <p className="text-white/40 text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Signature */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/[0.06]">
                <div
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-highlight flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-accent/20"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  S
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    Satyam Regmi
                  </p>
                  <p className="text-white/40 text-xs tracking-wide">
                    Frontend Developer, Kathmandu
                  </p>
                </div>
                <div className="ml-auto hidden sm:flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400/80 text-xs font-medium">
                    Available
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ─── Right: Stats ─── */}
          <motion.div
            style={{ y: statsY }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4"
          >
            {highlights.map((stat, i) => (
              <StatRing key={stat.label} stat={stat} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
