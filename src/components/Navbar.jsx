import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Detectar scroll y sección activa
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
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll preciso compensando el header fijo
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const offset = section.offsetTop - 90; // Ajusta según la altura del navbar
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
      setActive(id);
      setMenuOpen(false);
    }
  };

  // 🔹 Enlaces del menú principal
  const links = [
    { id: "home", label: "INICIO" },
    { id: "about", label: "SOBRE MÍ" },
    { id: "skills", label: "HABILIDADES" },
    { id: "projects", label: "PROYECTOS" },
    { id: "machine-learning", label: "MACHINE LEARNING" }, // ✅ Nuevo enlace
    { id: "contact", label: "CONTACTO" },
  ];

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
        <a href="#home" className="flex items-center gap-3">
          <img
            src={`${process.env.PUBLIC_URL}/logoLV.png`}
            alt="Logo Luis Veliz"
            className="w-12 h-12 rounded-full border border-cyan-300 shadow-md hover:scale-105 transition-transform duration-300"
          />
        
        </a>


        {/* Menú principal (desktop) */}
        <ul className="hidden md:flex gap-10 bg-black/30 px-10 py-3 rounded-2xl items-center border border-gray-700 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          {links.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollToSection(link.id)}
                className={`text-sm font-semibold tracking-widest uppercase transition-all duration-300 ${
                  active === link.id
                    ? "text-amber-300 drop-shadow-[0_0_6px_rgba(255,195,0,0.8)]"
                    : "text-gray-300 hover:text-amber-300"
                }`}
              >
                {link.label}
              </button>
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
        <button
          className="md:hidden text-gray-300 text-3xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* 🔹 Menú desplegable móvil */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="md:hidden absolute top-20 left-0 w-full bg-black/90 backdrop-blur-md border-t border-gray-800 py-10 z-40"
          >
            <ul className="flex flex-col items-center gap-8 text-lg">
              {links.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 * i, duration: 0.4 }}
                >
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className={`font-semibold tracking-wide transition-all duration-300 ${
                      active === link.id
                        ? "text-amber-300"
                        : "text-gray-300 hover:text-amber-300"
                    }`}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}

              {/* Redes sociales (móvil) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                className="flex gap-6 mt-6"
              >
                <a
                  href="https://github.com/Rudeluy"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-300 hover:text-white transition"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/luis-alfredo-veliz/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-300 hover:text-white transition"
                >
                  <FaLinkedin size={24} />
                </a>
              </motion.div>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
