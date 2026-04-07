import { motion } from "framer-motion";

export function Skills() {
  const skills = [
    {
      title: "QA & Testing",
      desc: "Diseño de matrices de prueba, validación de APIs y control de errores en entornos frontend y backend.",
      color: "from-indigo-500 to-cyan-600",
    },
    {
      title: "Automatización",
      desc: "Uso de herramientas como Katalon, Postman y JMeter para optimizar flujos y generar pruebas eficientes.",
      color: "from-indigo-500 to-cyan-600",
    },
    {
      title: "Gestión Ágil",
      desc: "Trazabilidad y certificación de historias de usuario en Azure DevOps dentro de equipos Scrum.",
      color: "from-indigo-500 to-cyan-600",
    },
  ];

  return (
    <section
      id="skills"
      className="py-32 bg-gradient-to-br from-darker via-dark to-black scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
        {/* 🔹 Título animado */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-cyan-400 mb-14"
        >
          Habilidades Técnicas
        </motion.h2>

        {/* 🔹 Tarjetas de habilidades */}
        <div className="grid md:grid-cols-3 gap-10">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative bg-black/30 border border-gray-800 rounded-2xl p-8 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_35px_rgba(236,72,153,0.3)] hover:-translate-y-2 transition-all duration-500 group overflow-hidden`}
            >
              {/* 🔸 Halo animado detrás */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${skill.color} blur-2xl`}
              ></div>

              {/* 🔹 Contenido */}
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-3 text-cyan-300">
                  {skill.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {skill.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
