import { motion } from "framer-motion";

function Contact() {
  const contactMethods = [
    {
      title: "Email",
      value: "sregmi986@gmail.com",
      href: "https://mail.google.com/mail/?view=cm&to=sregmi986@gmail.com",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Instagram",
      value: "@_waytoblue",
      href: "https://www.instagram.com/_waytoblue/",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      title: "Location",
      value: "Maitidevi, Kathmandu",
      href: "https://maps.app.goo.gl/SqUvDAnubvtAGTzg9",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase drop-shadow-sm">
            Contact
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-3 leading-tight drop-shadow-lg"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Let's work{" "}
            <span className="text-accent drop-shadow-[0_2px_10px_rgba(201,169,110,0.3)]">
              together.
            </span>
          </h2>
          <p className="text-white/50 text-lg mt-5 max-w-lg mx-auto leading-relaxed">
            Have a project in mind or just want to say hello? Reach out through
            any of the channels below.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {contactMethods.map((method, i) => {
            const Tag = method.href ? "a" : "div";
            const linkProps = method.href
              ? { href: method.href, target: "_blank", rel: "noreferrer" }
              : {};

            return (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Tag
                  {...linkProps}
                  className={`block rounded-2xl p-7 border border-white/[0.06] bg-white/[0.03] backdrop-blur-md text-center transition-all duration-400 group ${
                    method.href
                      ? "hover:border-accent/30 hover:bg-white/[0.06] hover:shadow-[0_8px_40px_-12px_rgba(201,169,110,0.12)] cursor-pointer"
                      : ""
                  }`}
                >
                  <div className="w-12 h-12 mx-auto rounded-xl border border-white/[0.08] bg-white/[0.04] flex items-center justify-center text-white/40 group-hover:text-accent group-hover:border-accent/20 transition-all duration-300 mb-4">
                    {method.icon}
                  </div>
                  <h3
                    className="text-white font-semibold text-sm mb-1"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {method.title}
                  </h3>
                  <p className="text-white/40 text-xs tracking-wide group-hover:text-white/60 transition-colors duration-300">
                    {method.value}
                  </p>
                  {method.href && (
                    <div className="mt-4 flex items-center justify-center gap-1 text-accent/50 text-[11px] font-medium uppercase tracking-wider group-hover:text-accent transition-colors duration-300">
                      <span>
                        {method.title === "Email"
                          ? "Send mail"
                          : method.title === "Location"
                            ? "Open map"
                            : "Visit"}
                      </span>
                      <svg
                        className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
                    </div>
                  )}
                </Tag>
              </motion.div>
            );
          })}
        </div>

        {/* CTA bottom */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16"
        ></motion.div>
      </div>
    </section>
  );
}

export default Contact;
