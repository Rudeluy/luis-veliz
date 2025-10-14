import React, { useState } from "react";
import "./MachineLearning.css";

export function MachineLearning() {
  const [activeProject, setActiveProject] = useState(null);
  const [formData, setFormData] = useState({
    HighBP: "",
    HighChol: "",
    CholCheck: "",
    BMI: "",
    Smoker: "",
    Stroke: "",
    HeartDiseaseorAttack: "",
    PhysActivity: "",
    Fruits: "",
    Veggies: "",
    HvyAlcoholConsump: "",
    AnyHealthcare: "",
    NoDocbcCost: "",
    GenHlth: "",
    MentHlth: "",
    PhysHlth: "",
    DiffWalk: "",
    Sex: "",
    Age: "",
    Education: "",
    Income: "",
  });

  const [errors, setErrors] = useState({});
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Todos los proyectos (restaurados)
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

  // ✅ Rangos de valores aceptables
  const ranges = {
    BMI: { min: 10, max: 70, text: "IMC entre 10 y 70" },
    GenHlth: {
      min: 1,
      max: 5,
      text: "1=Muy Mala, 2=Mala, 3=Regular, 4=Buena, 5=Excelente",
    },
    MentHlth: { min: 0, max: 30, text: "Días de salud mental no óptima (0–30)" },
    PhysHlth: { min: 0, max: 30, text: "Días de salud física no óptima (0–30)" },
    Age: { min: 1, max: 13, text: "Grupo de edad entre 1 y 13" },
    Education: { min: 1, max: 6, text: "Nivel educacional (1–6)" },
    Income: { min: 1, max: 8, text: "Nivel de ingresos (1–8)" },
  };

  // ✅ Validaciones
  const validateField = (name, value) => {
    const binaryFields = [
      "HighBP",
      "HighChol",
      "CholCheck",
      "Smoker",
      "Stroke",
      "HeartDiseaseorAttack",
      "PhysActivity",
      "Fruits",
      "Veggies",
      "HvyAlcoholConsump",
      "AnyHealthcare",
      "NoDocbcCost",
      "DiffWalk",
      "Sex",
    ];

    if (binaryFields.includes(name)) {
      if (value !== "0" && value !== "1") {
        return "Debe seleccionar 0 (No) o 1 (Sí)";
      }
      return "";
    }

    if (ranges[name]) {
      if (value === "") return "Campo obligatorio.";
      if (isNaN(value)) return "Debe ingresar un número.";
      if (value < ranges[name].min || value > ranges[name].max) {
        return `Debe estar entre ${ranges[name].min} y ${ranges[name].max}.`;
      }
    }

    return "";
  };

  // ✅ Manejo de cambios
  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  // ✅ Envío de formulario
  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();

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

      if (!response.ok) {
        throw new Error(data.error || "Error en la predicción");
      }

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

            {/* 🔹 Solo el proyecto 1 tiene formulario funcional */}
            {activeProject === project.id && (
              <div className="ml-form-container">
                {project.id === 1 ? (
                  <>
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
                      {[
                        "BMI",
                        "GenHlth",
                        "MentHlth",
                        "PhysHlth",
                        "Age",
                        "Education",
                        "Income",
                      ].map((field) => (
                        <label key={field}>
                          {field === "BMI"
                            ? "IMC"
                            : field === "GenHlth"
                            ? "Salud General (1–5)"
                            : field === "MentHlth"
                            ? "Días de salud mental no óptima"
                            : field === "PhysHlth"
                            ? "Días de salud física no óptima"
                            : field === "Age"
                            ? "Grupo de Edad"
                            : field === "Education"
                            ? "Nivel Educacional"
                            : "Nivel de Ingresos"}

                          <input
                            type="number"
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            placeholder={
                              field === "BMI"
                                ? "Ej: 27.5"
                                : field === "GenHlth"
                                ? "Ej: 4"
                                : "Ej: 1"
                            }
                          />
                          <small>{ranges[field]?.text}</small>
                          {errors[field] && (
                            <p className="ml-error">{errors[field]}</p>
                          )}
                        </label>
                      ))}

                      {/* Campos binarios */}
                      {[
                        "HighBP",
                        "HighChol",
                        "CholCheck",
                        "Smoker",
                        "Stroke",
                        "HeartDiseaseorAttack",
                        "PhysActivity",
                        "Fruits",
                        "Veggies",
                        "HvyAlcoholConsump",
                        "AnyHealthcare",
                        "NoDocbcCost",
                        "DiffWalk",
                        "Sex",
                      ].map((field) => (
                        <label key={field}>
                          {field === "HighBP"
                            ? "Presión Alta"
                            : field === "HighChol"
                            ? "Colesterol Alto"
                            : field === "CholCheck"
                            ? "Revisión de Colesterol"
                            : field === "Smoker"
                            ? "Fumador"
                            : field === "Stroke"
                            ? "Ha sufrido ACV"
                            : field === "HeartDiseaseorAttack"
                            ? "Enfermedad Cardíaca o Ataque"
                            : field === "PhysActivity"
                            ? "Actividad Física"
                            : field === "Fruits"
                            ? "Consumo de Frutas"
                            : field === "Veggies"
                            ? "Consumo de Verduras"
                            : field === "HvyAlcoholConsump"
                            ? "Consumo Alto de Alcohol"
                            : field === "AnyHealthcare"
                            ? "Tiene Cobertura Médica"
                            : field === "NoDocbcCost"
                            ? "No fue al médico por costo"
                            : field === "DiffWalk"
                            ? "Dificultad para Caminar"
                            : "Sexo (0 = Femenino, 1 = Masculino)"}

                          <select
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                          >
                            <option value="">Seleccione...</option>
                            {field === "Sex" ? (
                              <>
                                <option value="0">Femenino</option>
                                <option value="1">Masculino</option>
                              </>
                            ) : (
                              <>
                                <option value="0">No</option>
                                <option value="1">Sí</option>
                              </>
                            )}
                          </select>
                          {errors[field] && (
                            <p className="ml-error">{errors[field]}</p>
                          )}
                        </label>
                      ))}

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
                            <div className="ml-progress">
                              <div
                                className="ml-progress-bar"
                                style={{
                                  width: `${Math.min(
                                    prediction.probabilidad * 100,
                                    100
                                  )}%`,
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
                  </>
                ) : (
                  <p>🚧 Este modelo estará disponible próximamente.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
