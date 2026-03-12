import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '../components/Button/Button';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['40px', '-40px']);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden">
      <motion.div style={{ y }} className="max-w-7xl mx-auto px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left side — CTA text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase drop-shadow-sm">
              Contact
            </span>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-3 leading-tight drop-shadow-lg"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Let's work
              <br />
              <span className="text-accent drop-shadow-[0_2px_10px_rgba(201,169,110,0.3)]">together.</span>
            </h2>
            <p className="text-white/60 text-lg mt-6 max-w-sm leading-relaxed">
              Have a project in mind or just want to say hello?
              I'd love to hear from you.
            </p>

            {/* Quick contact info */}
            <div className="mt-10 space-y-4">
              <a
                href="mailto:hello@satyamregmi.com"
                className="flex items-center gap-3 text-white/50 hover:text-accent transition-colors duration-300 group"
              >
                <span className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300 backdrop-blur-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <span className="text-sm">hello@satyamregmi.com</span>
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-white/50 hover:text-accent transition-colors duration-300 group"
              >
                <span className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300 backdrop-blur-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  </svg>
                </span>
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>
          </motion.div>

          {/* Right side — Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="glass-section p-8 rounded-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-white/80 text-xs font-semibold tracking-wider uppercase mb-2 block">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="glass-input w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all duration-300 placeholder:text-white/30 backdrop-blur-sm"
                  />
                </div>

                <div>
                  <label className="text-white/80 text-xs font-semibold tracking-wider uppercase mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="glass-input w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all duration-300 placeholder:text-white/30 backdrop-blur-sm"
                  />
                </div>

                <div>
                  <label className="text-white/80 text-xs font-semibold tracking-wider uppercase mb-2 block">
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="glass-input w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all duration-300 resize-y placeholder:text-white/30 backdrop-blur-sm"
                  />
                </div>

                <Button type="submit" variant="primary">
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default Contact;
