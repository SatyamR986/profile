import { Parallax } from 'react-scroll-parallax';
import Button from '../components/Button/Button';

function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-20 overflow-hidden relative"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Parallax speed={-20} className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-10" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-10" />
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-10" />
        </Parallax>
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full">
        <Parallax speed={-5}>
          <p className="text-primary font-semibold text-lg mb-2">Hello, I'm</p>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4">
            Satyam Regmi
          </h1>
          <p className="text-muted text-gray-500 text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
            WordPress Developer & Frontend Engineer crafting responsive,
            user-friendly web experiences with React, Vite, and modern tools.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Button href="#projects">View Projects</Button>
            <Button href="#contact" variant="outline">Contact Me</Button>
          </div>
        </Parallax>
      </div>
    </section>
  );
}

export default Hero;
