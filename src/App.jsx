import { Navbar } from "./components/Navbar";
import { Background } from "./components/Background";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { MachineLearning } from "./components/MachineLearning";



function App() {
  return (
    <div className="relative min-h-screen text-white font-sans overflow-x-hidden scroll-smooth">

      {/* Fondo animado de partículas */}
      <div className="absolute inset-0 -z-10">
        <Background />
      </div>

      {/* Contenido principal */}
      <Navbar />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <section id="machine-learning">
        <MachineLearning />
      </section>

      <Footer />
    </div>
  );
}

export default App;
