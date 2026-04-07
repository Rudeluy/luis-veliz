export function Testimonials() {
  const testimonios = [
    {
      texto:
        "Luis demostró gran compromiso y atención al detalle en todas las fases del proyecto OneView.",
      autor: "Marcela Sánchez",
      cargo: "Líder Scrum, Imagemaker",
    },
    {
      texto:
        "Excelente colaboración y comunicación, aportando mejoras continuas a los procesos QA.",
      autor: "Paula Carvajal",
      cargo: "Jefa de Proyecto, Microdat",
    },
  ];

  return (
    <section
      id="testimonials"
      className="bg-transparent py-24 px-6 md:px-16"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-amber-300 mb-12">Testimonios</h2>

        <div className="space-y-10">
          {testimonios.map((t, index) => (
            <div
              key={index}
              className="bg-gray-800/70 hover:bg-gray-800/80 border border-gray-700 rounded-2xl p-8 
                         shadow-[0_0_20px_rgba(255,195,0,0.15)] transition-all duration-300 backdrop-blur-md"
            >
              <p className="italic text-gray-200 mb-4">“{t.texto}”</p>
              <p className="text-amber-300 font-semibold">
                {t.autor}{" "}
                <span className="text-blue-400 font-normal">– {t.cargo}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
