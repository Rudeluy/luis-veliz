import { motion } from "framer-motion";

export function About() {
  return (
    <section
      id="about"
      className="py-32 bg-gradient-to-br from-black via-dark to-darker scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
        {/* 🔹 Imagen lateral con animación */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="relative">
            <img
              src="/profile.png"
              alt="Luis Veliz"
              className="w-72 md:w-80 rounded-2xl border-4 border-indigo-200 shadow-[0_0_30px_rgba(191,219,254,0.3)]"
            />
            {/* 🔸 Halo de luz índigo detrás */}
            <div className="absolute inset-0 -z-10 w-full h-full bg-indigo-200/10 blur-3xl rounded-full"></div>
          </div>
        </motion.div>

        {/* 🔹 Bloque de texto con efecto translúcido */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-6 bg-gray-800/60 p-8 rounded-2xl backdrop-blur-md border border-indigo-200 shadow-[0_0_25px_rgba(191,219,254,0.2)]"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-violet-200 mb-4">
            Sobre mí
          </h2>

          <p className="text-indigo-200 leading-relaxed text-lg">
            Soy <span className="text-white font-semibold">Ingeniero Informático</span> con más de 5 años de experiencia en QA manual y funcional.  
            He participado en proyectos de integración de servicios, diseño de matrices de prueba y validación de flujos
            en sistemas backend y frontend.
          </p>

          <p className="text-indigo-200 leading-relaxed text-lg">
            Me motiva el aprendizaje constante, la colaboración en equipos ágiles y la mejora continua de procesos
            utilizando herramientas como <span className="text-cyan-400">Postman</span>, <span className="text-amber-300">Katalon Studio</span>,
            <span className="text-purple-400"> JMeter</span> y <span className="text-blue-400">Azure DevOps</span>.
          </p>

          <p className="text-indigo-300 text-sm italic">
            “La calidad no es un acto, es un hábito.”
          </p>
        </motion.div>
      </div>
    </section>
  );
}
