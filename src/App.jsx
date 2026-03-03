import { ParallaxProvider } from 'react-scroll-parallax';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './layouts/MainLayout';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Contact from './sections/Contact';
import './index.css';

function App() {
  return (
    <ParallaxProvider>
      <ThemeProvider>
        <MainLayout>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Contact />
        </MainLayout>
      </ThemeProvider>
    </ParallaxProvider>
  );
}

export default App;
