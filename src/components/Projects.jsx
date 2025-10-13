import { motion } from "framer-motion";

export function Projects() {
  const projects = [
    {
      name: "Descarga de Certificados RRVV",
      tech: ["React", "Tailwind", "API REST"],
      desc: "Implementación del flujo de descarga con validación backend y decodificación en formato base64.",
      color: "from-indigo-500 to-purple-600",
    },
    {
      name: "Listado de Liquidaciones Mutuaria",
      tech: ["Next.js", "Azure DevOps"],
      desc: "Visualización dinámica con integración de servicios backend y filtrado inteligente por RUT.",
      color: "from-indigo-500 to-purple-600",
    },
    {
      name: "Sistema de QA OneView",
      tech: ["JMeter", "Postman"],
      desc: "Diseño de matrices de prueba y validación de integraciones multi-LOB en ambientes QA.",
      color: "from-indigo-500 to-purple-600",
    },
  ];

  return (
    <section
      id="projects"
      className="py-32 bg-gradient-to-br from-dark via-black to-darker scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
        {/* 🔹 Título */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-cyan-400 mb-16"
        >
          Proyectos Destacados
        </motion.h2>

        {/* 🔹 Grid de tarjetas */}
        <div className="grid md:grid-cols-3 gap-10">
          {projects.map((p, index) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative bg-black/30 border border-gray-800 rounded-2xl p-8 text-left overflow-hidden group hover:-translate-y-2 transition-all duration-500 shadow-[0_0_25px_rgba(255,255,255,0.05)] hover:shadow-[0_0_35px_rgba(236,72,153,0.3)]"
            >
              {/* Halo dinámico */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${p.color} blur-2xl`}
              ></div>

              {/* Contenido */}
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">
                  {p.name}
                </h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {p.desc}
                </p>

                {/* Etiquetas tecnológicas */}
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs border border-cyan-400 text-cyan-400 px-2 py-1 rounded-md bg-black/40"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
