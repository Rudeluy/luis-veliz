import { motion } from "framer-motion";

export function Hero() {
  return (
    <section
      id="home"
      className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-dark via-black to-darker scroll-mt-24"
    >
      {/* 🔹 Círculo decorativo difuminado detrás del texto */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>

      {/* 🔹 Contenido principal con animación */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 px-4"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-amber-200 text-sm md:text-base uppercase tracking-[0.3em] mb-3"
        >
          QA Functional Engineer | Explorador de Nuevas Tecnologías
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
        >
          Luis Véliz S.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg"
        >
          Ingeniero Informático con sólida experiencia en QA funcional, análisis de sistemas y validación de
          servicios backend y frontend. Enfocado en el aprendizaje continuo, la exploración de nuevas áreas
          tecnológicas y el desarrollo de soluciones que integren calidad, innovación y eficiencia.
        </motion.p>

        {/* 🔹 Botones de acción */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex gap-6 justify-center"
        >
          <a
            href="#projects"
            className="border-2 border-amber-200 text-amber-200 px-8 py-3 rounded-full hover:bg-amber-500 hover:text-black transition font-semibold tracking-wide"
          >
            Ver Proyectos
          </a>
          <a
            href="#contact"
            className="border-2 border-cyan-400 text-cyan-400 px-8 py-3 rounded-full hover:bg-cyan-400 hover:text-black transition font-semibold tracking-wide"
          >
            Contacto
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
