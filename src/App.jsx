import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './layouts/MainLayout';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <MainLayout>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
