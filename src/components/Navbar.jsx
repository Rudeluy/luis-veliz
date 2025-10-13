import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  // Detectar la sección activa y el scroll para cambiar fondo
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          current = section.getAttribute("id");
        }
      });
      setActive(current);
      setScrolled(window.scrollY > 80); // activa fondo al hacer scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/40 backdrop-blur-md shadow-md border-b border-gray-800"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex justify-between items-center h-20 px-6">
        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-bold tracking-wider text-indigo-200">
          Luis Veliz
        </h1>

        {/* Menú principal */}
        <ul className="hidden md:flex gap-10 bg-black/30 px-10 py-3 rounded-2xl items-center border border-gray-700 backdrop-blur-md shadow-[0_0_15px_rgba(191,219,254,0.15)]">
          {[
            { id: "home", label: "INICIO" },
            { id: "about", label: "SOBRE MÍ" },
            { id: "skills", label: "HABILIDADES" },
            { id: "projects", label: "PROYECTOS" },
            { id: "contact", label: "CONTACTO" },
          ].map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`text-sm font-semibold tracking-widest uppercase transition-all duration-300 ${
                  active === link.id
                    ? "text-amber-300 drop-shadow-[0_0_6px_rgba(255,195,0,0.8)]"
                    : "text-gray-300 hover:text-amber-300"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Redes sociales */}
        <div className="hidden md:flex gap-4">
          <a
            href="https://github.com/Rudeluy"
            target="_blank"
            rel="noreferrer"
            className="text-gray-300 hover:text-white transition"
          >
            <FaGithub size={22} />
          </a>
          <a
            href="https://www.linkedin.com/in/luis-alfredo-veliz/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-300 hover:text-white transition"
          >
            <FaLinkedin size={22} />
          </a>
        </div>

        {/* Ícono menú móvil */}
        <div className="md:hidden text-gray-300 text-2xl cursor-pointer">
          ☰
        </div>
      </nav>
    </header>
  );
}
