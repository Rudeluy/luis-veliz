import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export function Contact() {
  return (
    <section
      id="contact"
      className="py-32 bg-gradient-to-br from-dark via-black to-darker scroll-mt-24"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-cyan-400 mb-6"
        >
          Contacto
        </motion.h2>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg"
        >
          ¿Tienes un proyecto o una oportunidad laboral? ¡Hablemos!
        </motion.p>

        {/* Tarjeta Glass de contacto */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="relative bg-black/30 border border-gray-800 rounded-2xl p-10 mx-auto max-w-2xl
                     shadow-[0_0_25px_rgba(255,255,255,0.05)] hover:shadow-[0_0_35px_rgba(255,195,0,0.25)]
                     backdrop-blur-md transition-all duration-500"
        >
          {/* Halo sutil detrás */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-600/10 to-amber-800/20 blur-2xl rounded-2x2" />

          <div className="flex flex-col items-center gap-6">
            <a
              href="mailto:luis.veliz.qa@gmail.com"
              className="inline-flex items-center gap-3 border-2 border-cyan-400 text-cyan-300 px-8 py-3 rounded-full
                         hover:bg-cyan-400 hover:text-black transition font-semibold tracking-wide"
            >
              <FaEnvelope /> Enviar correo
            </a>

            <div className="flex items-center gap-6">
              <a
                href="https://www.linkedin.com/in/luis-alfredo-veliz/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
              <a
                href="https://github.com/Rudeluy"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition"
                aria-label="GitHub"
              >
                <FaGithub size={24} />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
