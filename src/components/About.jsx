import { motion } from "framer-motion";

export function About() {
  return (
    <section
      id="about"
      className="relative z-10 py-32 bg-gradient-to-br from-black via-dark to-darker scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-16">
        {/* 🔹 Parte superior: foto + texto principal */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Imagen lateral */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative">
              <img
                src={`${process.env.PUBLIC_URL}/profile.png`}
                alt="Luis Véliz"
                className="w-72 md:w-80 rounded-2xl border-4 border-indigo-200 shadow-[0_0_30px_rgba(191,219,254,0.3)]"
              />
              <div className="absolute inset-0 -z-10 w-full h-full bg-indigo-200/10 blur-3xl rounded-full"></div>
            </div>
          </motion.div>

          {/* Texto principal */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6 bg-gray-800/60 p-8 rounded-2xl backdrop-blur-md border border-indigo-200 shadow-[0_0_25px_rgba(191,219,254,0.2)]"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-violet-200 mb-2">
              Sobre mí
            </h2>
            <p className="text-indigo-300 text-sm mb-2">
              Creciendo entre calidad, datos y aprendizaje continuo.
            </p>

            <p className="text-indigo-200 leading-relaxed text-lg">
              Soy <span className="text-white font-semibold">Ingeniero Informático</span> con experiencia como{" "}
              <span className="text-white font-semibold">QA funcional</span> y{" "}
              <span className="text-white font-semibold">analista</span>, validando servicios backend y frontend.
              Me caracterizo por el <span className="text-white font-semibold">orden</span>, la{" "}
              <span className="text-white font-semibold">rigurosidad</span> y la{" "}
              <span className="text-white font-semibold">documentación clara</span>.
            </p>

            <p className="text-indigo-200 leading-relaxed text-lg">
              Actualmente amplío mi perfil en <span className="text-purple-300">programación</span> y{" "}
              <span className="text-purple-300">Machine Learning</span> a través del curso{" "}
              <span className="text-white font-semibold">Talento Digital dictado por Kibernum</span>,
              explorando también <span className="text-blue-300">automatización</span>,{" "}
              <span className="text-blue-300">análisis de datos</span> y nuevas tecnologías.
            </p>

            <p className="text-indigo-300 text-sm italic">
              “La calidad no es un acto, es un hábito.”
            </p>
          </motion.div>
        </div>

        {/* 🔹 Parte inferior: bloques de habilidades */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Bloque QA */}
          <div className="bg-gray-800/70 rounded-xl p-6 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <h3 className="text-amber-200 font-semibold mb-3 text-lg">
              Herramientas de QA
            </h3>
            <ul className="list-disc list-inside text-indigo-200/90 leading-relaxed text-sm">
              <li>Postman — validación de APIs</li>
              <li>JMeter — pruebas de carga</li>
              <li>Katalon Studio — automatización</li>
              <li>Azure DevOps — gestión de pruebas</li>
              <li>Git y Chrome DevTools</li>
            </ul>
          </div>

          {/* Bloque Diseño */}
          <div className="bg-gray-800/70 rounded-xl p-6 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <h3 className="text-amber-200 font-semibold mb-3 text-lg">
              Diseño & Prototipado
            </h3>
            <ul className="list-disc list-inside text-indigo-200/90 leading-relaxed text-sm">
              <li>Figma, Canva — diseño UI/UX</li>
              <li>Photoshop — edición visual</li>
              <li>Blender — modelado 3D</li>
              <li>Moho Studio — animación</li>
            </ul>
          </div>

          {/* Bloque Estilo de trabajo */}
          <div className="bg-gray-800/70 rounded-xl p-6 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <h3 className="text-amber-200 font-semibold mb-3 text-lg">
              Cómo trabajo
            </h3>
            <ul className="list-disc list-inside text-indigo-200/90 leading-relaxed text-sm">
              <li>Rigurosidad y trazabilidad en pruebas y evidencias.</li>
              <li>Comunicación clara y lenguaje simple.</li>
              <li>IA como apoyo en documentación y prototipado.</li>
              <li>Mejora continua y visión integral del proceso.</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
