import { motion } from "framer-motion";

export function Experience() {
  const experiences = [
    {
      company: "Imagemaker / MetLife",
      role: "Analista Funcional QA",
      period: "2023 - Actualidad",
      description:
        "Validación de servicios REST, diseño de matrices de pruebas, control de errores y certificación de historias de usuario en Azure DevOps. Uso de Postman, Katalon Studio y SQL Server.",
    },
    {
      company: "Microdat",
      role: "Analista QA / Desarrollador",
      period: "2019 - 2023",
      description:
        "Desarrollo de pruebas automatizadas con Katalon, soporte técnico y validación de aplicaciones internas. Trabajo con JasperReports, Git y metodologías Scrum.",
    },
  ];

  return (
    <section id="experience" className="bg-gray-800 py-20 px-6 md:px-16">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold mb-12 text-indigo-400 text-center">Experiencia</h2>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-pink-600/10 transition">
        <h3 className="text-2xl font-semibold text-purple-300 mb-2">Analista Funcional QA</h3>
        <p className="text-gray-400 mb-2">Imagemaker / MetLife · 2023 - Actualidad</p>
        <p className="text-gray-300 leading-relaxed">
          Validación de servicios REST, diseño de matrices de pruebas, control de errores y certificación
          de historias de usuario en Azure DevOps. Uso de Postman, Katalon Studio y SQL Server.
        </p>
      </div>

      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-indigo-600/10 transition">
        <h3 className="text-2xl font-semibold text-purple-300 mb-2">Analista QA / Desarrollador</h3>
        <p className="text-gray-400 mb-2">Microdat · 2019 - 2023</p>
        <p className="text-gray-300 leading-relaxed">
          Desarrollo de pruebas automatizadas con Katalon, soporte técnico y validación de aplicaciones internas.
          Trabajo con JasperReports, Git y metodologías Scrum.
        </p>
      </div>
    </div>
  </div>
</section>

  );
}
