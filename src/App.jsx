import { ThemeProvider } from "./context/ThemeContext";
import MainLayout from "./layouts/MainLayout";
import SectionReveal from "./components/SectionReveal/SectionReveal";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Contact from "./sections/Contact";
import "./index.css";

function App() {
  return (
    <ThemeProvider>
      <MainLayout>
        <Hero />

        <SectionReveal effect="portal" id="about">
          <About />
        </SectionReveal>

        <div id="projects">
          <Projects />
        </div>

        <SectionReveal effect="glitch" id="skills">
          <Skills />
        </SectionReveal>

        <SectionReveal effect="rise" id="experience">
          <Experience />
        </SectionReveal>

        <div id="education">
          <Education />
        </div>

        <div id="contact">
          <Contact />
        </div>
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
