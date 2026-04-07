import { motion } from "framer-motion";

export function Goals() {
  const goals = [
    { title: "Corto plazo", text: "Fortalecer habilidades en automatización de pruebas y herramientas QA modernas." },
    { title: "Mediano plazo", text: "Evolucionar hacia QA Automation Engineer o Data QA Specialist." },
    { title: "Largo plazo", text: "Liderar un equipo de QA enfocado en innovación y calidad basada en IA." },
  ];

  return (
    <section id="goals" className="bg-gray-800 py-20 px-6 md:px-16">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-12 text-pink-400">Proyección Profesional</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-pink-500/10 transition">
          <h3 className="text-2xl font-semibold text-purple-300 mb-2">Corto plazo</h3>
          <p className="text-gray-300 leading-relaxed">
            Fortalecer habilidades en automatización de pruebas y herramientas QA modernas.
          </p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-indigo-500/10 transition">
          <h3 className="text-2xl font-semibold text-purple-300 mb-2">Mediano plazo</h3>
          <p className="text-gray-300 leading-relaxed">
            Evolucionar hacia QA Automation Engineer o Data QA Specialist.
          </p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-indigo-500/10 transition">
          <h3 className="text-2xl font-semibold text-purple-300 mb-2">Largo plazo</h3>
          <p className="text-gray-300 leading-relaxed">
            Liderar un equipo de QA enfocado en innovación y calidad basada en IA.
          </p>
        </div>
      </div>
    </div>
  </section>
  );
}
