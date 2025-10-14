import React, { useState } from "react";
import "./MachineLearning.css";

export function MachineLearning() {
  const [activeProject, setActiveProject] = useState(null);
  const [formData, setFormData] = useState({
    age: "",
    bmi: "",
    highBP: "",
    highChol: "",
    smoker: "",
    physActivity: "",
    alcohol: "",
    stroke: "",
    diffWalk: "",
    genHealth: "",
    heartDisease: "",
  });

  const [errors, setErrors] = useState({});
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const projects = [
    {
      id: 1,
      title: "Predicción de Riesgo de Diabetes",
      description:
        "Modelo predictivo que estima el nivel de riesgo de diabetes según indicadores de salud.",
      endpoint: "https://pdiabetes-backend.onrender.com/predict",
    },
    {
      id: 2,
      title: "Clasificación de Vinos",
      description:
        "Modelo que determina la calidad de vinos a partir de características químicas.",
      endpoint: "#",
    },
    {
      id: 3,
      title: "Análisis de Sentimientos",
      description:
        "Modelo NLP que identifica emociones positivas o negativas en texto.",
      endpoint: "#",
    },
  ];

  const ranges = {
    age: { min: 18, max: 90, text: "Edad entre 18 y 90 años" },
    bmi: { min: 10, max: 70, text: "IMC entre 10 y 70" },
    genHealth: {
      min: 1,
      max: 5,
      text: "1=Muy Mala, 2=Mala, 3=Regular, 4=Buena, 5=Excelente",
    },
  };

  // ✅ Validaciones
  const validateField = (name, value) => {
    if (
      [
        "highBP",
        "highChol",
        "smoker",
        "physActivity",
        "alcohol",
        "stroke",
        "diffWalk",
        "heartDisease",
      ].includes(name)
    ) {
      if (value !== "0" && value !== "1") {
        return "Debe seleccionar 0 (No) o 1 (Sí)";
      }
      return "";
    }

    if (name === "genHealth") {
      if (value < 1 || value > 5) return "Debe estar entre 1 y 5.";
      return "";
    }

    if (["age", "bmi"].includes(name)) {
      if (!value) return "Campo obligatorio.";
      if (isNaN(value)) return "Debe ingresar un número.";
      if (value < ranges[name].min || value > ranges[name].max) {
        return `Debe estar entre ${ranges[name].min} y ${ranges[name].max}.`;
      }
    }
    return "";
  };

  // ✅ Control de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  // ✅ Envío del formulario al backend
  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();

    // Validación antes de enviar
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setPrediction(null);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          Object.fromEntries(
            Object.entries(formData).map(([k, v]) => [k, Number(v)])
          )
        ),
      });

      const data = await response.json();

      // ✅ Manejo explícito de errores del backend
      if (!response.ok) {
        throw new Error(data.error || "Error en la predicción");
      }

      // ✅ Resultado exitoso
      setPrediction({
        probabilidad: data.probabilidad,
        riesgo: data.riesgo,
      });
    } catch (error) {
      console.error("Error al conectar con el modelo:", error);
      setPrediction({ riesgo: "Error", probabilidad: 0 });
    } finally {
      setLoading(false);
    }
  };

  const allValid =
    Object.values(errors).every((e) => !e) &&
    Object.values(formData).every((v) => v !== "");

  return (
    <section id="machine-learning" className="ml-section">
      <h2 className="ml-title">Proyectos de Machine Learning</h2>
      <p className="ml-subtitle">
        Explora modelos implementados en la nube e interactúa con sus predicciones.
      </p>

      <div className="ml-cards">
        {projects.map((project) => (
          <div key={project.id} className="ml-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>

            <button
              className="ml-btn"
              onClick={() =>
                setActiveProject(activeProject === project.id ? null : project.id)
              }
            >
              {activeProject === project.id ? "Cerrar" : "Ver más"}
            </button>

            {activeProject === project.id && (
              <div className="ml-form-container">
                {project.id === 1 ? (
                  <form
                    onSubmit={(e) => handleSubmit(e, project.endpoint)}
                    className="ml-form"
                  >
                    <p className="ml-intro">
                      Completa los campos según tu estado actual para estimar el
                      nivel de riesgo de diabetes. Los datos son confidenciales y
                      solo se usan para demostración del modelo.
                    </p>

                    {/* Campos numéricos */}
                    <label>
                      Edad:
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Ej: 45"
                      />
                      <small>{ranges.age.text}</small>
                      {errors.age && <p className="ml-error">{errors.age}</p>}
                    </label>

                    <label>
                      IMC:
                      <input
                        type="number"
                        name="bmi"
                        value={formData.bmi}
                        onChange={handleChange}
                        placeholder="Ej: 27.5"
                      />
                      <small>{ranges.bmi.text}</small>
                      {errors.bmi && <p className="ml-error">{errors.bmi}</p>}
                    </label>

                    {/* Campos booleanos */}
                    {[
                      "highBP",
                      "highChol",
                      "smoker",
                      "physActivity",
                      "alcohol",
                      "stroke",
                      "diffWalk",
                      "heartDisease",
                    ].map((field) => (
                      <label key={field}>
                        {field === "highBP"
                          ? "Presión Alta"
                          : field === "highChol"
                          ? "Colesterol Alto"
                          : field === "smoker"
                          ? "Fumador"
                          : field === "physActivity"
                          ? "Actividad Física"
                          : field === "alcohol"
                          ? "Consumo de Alcohol"
                          : field === "stroke"
                          ? "Ha sufrido ACV"
                          : field === "diffWalk"
                          ? "Dificultad para Caminar"
                          : "Enfermedad Cardíaca"}

                        <select
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                        >
                          <option value="">Seleccione...</option>
                          <option value="0">No</option>
                          <option value="1">Sí</option>
                        </select>
                        {errors[field] && (
                          <p className="ml-error">{errors[field]}</p>
                        )}
                      </label>
                    ))}

                    {/* Campo de salud general */}
                    <label>
                      Salud General (1–5):
                      <input
                        type="number"
                        name="genHealth"
                        value={formData.genHealth}
                        onChange={handleChange}
                        placeholder="Ej: 4"
                      />
                      <small>{ranges.genHealth.text}</small>
                      {errors.genHealth && (
                        <p className="ml-error">{errors.genHealth}</p>
                      )}
                    </label>

                    <button type="submit" disabled={!allValid || loading}>
                      {loading ? (
                        <>
                          <span className="ml-spinner"></span> Analizando...
                        </>
                      ) : (
                        "Predecir"
                      )}
                    </button>
                  </form>
                ) : (
                  <p>🚧 Este modelo estará disponible próximamente.</p>
                )}

                {/* Resultado */}
                {prediction && (
                  <div
                    className={`ml-result ${
                      prediction.riesgo === "Alto"
                        ? "positive"
                        : prediction.riesgo === "Error"
                        ? "error"
                        : "negative"
                    }`}
                  >
                    {prediction.riesgo === "Error" ? (
                      <>
                        ⚠️ Error al conectar con el servidor.
                        <br />
                        Intenta nuevamente en unos segundos.
                      </>
                    ) : (
                      <>
                        <strong>Resultado:</strong>{" "}
                        {prediction.riesgo === "Alto"
                          ? "Riesgo Alto ⚠️"
                          : "Riesgo Bajo ✅"}
                        <br />
                        <strong>Probabilidad:</strong>{" "}
                        {Math.round(prediction.probabilidad * 100)}%

                        {/* Barra visual */}
                        <div className="ml-progress">
                          <div
                            className="ml-progress-bar"
                            style={{
                              width: `${Math.min(prediction.probabilidad * 100, 100)}%`,
                            }}
                          ></div>
                        </div>

                        <p className="ml-description">
                          {prediction.riesgo === "Alto"
                            ? "El modelo detecta un nivel alto de riesgo basado en los indicadores ingresados. Se recomienda chequeo médico preventivo."
                            : "El modelo no detecta un riesgo significativo según los indicadores ingresados."}
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
