import { motion } from "framer-motion";

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-500"
    >
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-bold mb-4"
      >
        Luis Alfredo Véliz Sánchez
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="text-xl md:text-2xl max-w-2xl text-gray-100"
      >
        Ingeniero Informático | QA Functional Engineer | Data Enthusiast
      </motion.p>

      <div className="mt-6 flex gap-4">
        <a
          href="https://github.com/Rudeluy"
          target="_blank"
          rel="noreferrer"
          className="bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-lg transition"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/luis-alfredo-veliz/"
          target="_blank"
          rel="noreferrer"
          className="bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-lg transition"
        >
          LinkedIn
        </a>
      </div>
    </section>
  );
}
