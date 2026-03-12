import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function ProjectCard({
  title,
  description,
  tags,
  liveUrl,
  repoUrl,
  image,
  type,
  index = 0,
}) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  // Mouse-tracking for 3D tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  // Spotlight glow follows cursor
  const spotlightX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), {
    stiffness: 200,
    damping: 25,
  });
  const spotlightY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), {
    stiffness: 200,
    damping: 25,
  });

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-md transition-[border-color,box-shadow] duration-500 hover:border-accent/25 hover:shadow-[0_20px_70px_-15px_rgba(201,169,110,0.12)] flex flex-col h-full"
      >
        {/* ─── Animated border gradient ─── */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ padding: "1px" }}
        >
          <div
            className="absolute inset-[-1px] rounded-2xl animate-[spin_4s_linear_infinite]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, rgba(201,169,110,0.3), transparent, rgba(201,169,110,0.15), transparent)",
            }}
          />
        </div>

        {/* ─── Spotlight glow that follows cursor ─── */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [spotlightX, spotlightY],
              ([x, y]) =>
                `radial-gradient(350px circle at ${x}% ${y}%, rgba(201,169,110,0.08), transparent 70%)`,
            ),
          }}
        />

        {/* ─── Image area ─── */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-white/[0.04] to-white/[0.01]">
          {image ? (
            <motion.img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              animate={{ scale: hovered ? 1.06 : 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <motion.div
                className="w-14 h-14 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center"
                animate={{ rotate: hovered ? 6 : 0, scale: hovered ? 1.05 : 1 }}
                transition={{ duration: 0.4 }}
              >
                <svg
                  className="w-6 h-6 text-white/20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
                  />
                </svg>
              </motion.div>
              <span className="text-white/15 text-xs font-medium tracking-wider uppercase">
                Screenshot coming soon
              </span>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/50 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

          {/* Shine sweep on hover */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/[0.07] to-transparent skew-x-[-20deg]" />
          </div>

          {/* Type badge */}
          {type && (
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-accent/15 text-accent border border-accent/20 backdrop-blur-md"
            >
              {type}
            </motion.span>
          )}

          {/* Project number */}
          <span
            className="absolute top-4 right-4 text-white/[0.06] text-5xl font-bold leading-none pointer-events-none z-20 group-hover:text-white/[0.1] transition-colors duration-500"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* ─── Content ─── */}
        <div className="p-6 md:p-7 flex flex-col flex-1 relative z-10">
          {/* Accent line */}
          <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

          <motion.h3
            className="text-lg font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          >
            {title}
          </motion.h3>

          <motion.p
            className="text-white/45 text-sm leading-relaxed mb-5 flex-1"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          >
            {description}
          </motion.p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {tags.map((tag, ti) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.35,
                  delay: 0.35 + index * 0.08 + ti * 0.05,
                }}
                className="px-3 py-1 rounded-full text-[11px] font-medium tracking-wide bg-white/[0.04] text-white/50 border border-white/[0.06] group-hover:border-accent/20 group-hover:text-white/70 transition-all duration-300"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3 mt-auto pt-5 border-t border-white/[0.06]">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wide uppercase bg-accent/10 text-accent border border-accent/20 hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 group/btn"
              >
                Live Demo
                <svg
                  className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 17L17 7M17 7H7M17 7v10"
                  />
                </svg>
              </a>
            )}
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wide uppercase text-white/40 border border-white/[0.08] hover:border-accent/30 hover:text-accent transition-all duration-300 group/btn"
              >
                Source
                <svg
                  className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 17L17 7M17 7H7M17 7v10"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Corner glow accents */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0">
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-accent/[0.06] rounded-full blur-3xl" />
          <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-accent/[0.04] rounded-full blur-2xl" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProjectCard;
