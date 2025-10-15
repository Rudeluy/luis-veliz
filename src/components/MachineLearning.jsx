import React, { useState } from "react";
import "./MachineLearning.css";
import { FaCode } from "react-icons/fa";

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
    text: "", // Campo para análisis de sentimientos
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // 🔹 Estado independiente de predicciones
  const [predictions, setPredictions] = useState({
    1: null, // Diabetes
    2: null, // Vinos
    3: null, // Sentimientos
  });

  // 🔹 Lista de proyectos
  const projects = [
    {
      id: 1,
      title: "Predicción de Riesgo de Diabetes",
      description:
        "Modelo predictivo que estima el nivel de riesgo de diabetes según indicadores de salud.",
      endpoint: "https://pdiabetes-backend.onrender.com/predict",
      repo: "https://github.com/Rudeluy/pdiabetes-backend",
    },
    {
      id: 2,
      title: "Clasificación de Vinos",
      description:
        "Modelo que determina la calidad de vinos a partir de características químicas.",
      endpoint: "#",
      repo: "https://github.com/Rudeluy/proyecto-vinos",
    },
    {
      id: 3,
      title: "Análisis de Sentimientos",
      description:
        "Modelo NLP que identifica emociones positivas o negativas en texto.",
      endpoint: "https://psentimientos-backend.onrender.com/predict",
      repo: "https://github.com/Rudeluy/psentimientos-backend",
    },
  ];

  // ✅ Rango de valores para el modelo de diabetes
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

    // Validación binaria
    if (binaryFields.includes(name)) {
      if (value !== "0" && value !== "1") return "Debe seleccionar 0 (No) o 1 (Sí)";
      return "";
    }

    // Validación de rangos
    if (ranges[name]) {
      if (value === "") return "Campo obligatorio.";
      if (isNaN(value)) return "Debe ingresar un número.";
      if (value < ranges[name].min || value > ranges[name].max)
        return `Debe estar entre ${ranges[name].min} y ${ranges[name].max}.`;
    }

    // Validación del texto para el modelo de sentimientos
    if (name === "text") {
      if (!value.trim()) return "Debe ingresar un texto.";
      if (value.length < 5) return "El texto debe tener al menos 5 caracteres.";
      if (value.split(" ").length < 2)
        return "Debe escribir una frase completa (mínimo 2 palabras).";
      if (!/[a-zA-ZáéíóúñÁÉÍÓÚÑ]/.test(value))
        return "Debe contener palabras con significado (no solo símbolos o números).";
    }

    return "";
  };

  // ✅ Control de cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  // ✅ Envío de formulario
  const handleSubmit = async (e, endpoint, projectId) => {
    e.preventDefault();
    setPredictions((prev) => ({ ...prev, [projectId]: null }));

    const newErrors = {};
    if (projectId === 3) {
      const error = validateField("text", formData.text);
      if (error) newErrors.text = error;
    } else {
      Object.keys(formData).forEach((key) => {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      });
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const body =
        projectId === 3
          ? JSON.stringify({ text: formData.text })
          : JSON.stringify(
              Object.fromEntries(
                Object.entries(formData).map(([k, v]) => [k, Number(v)])
              )
            );

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Error en la predicción");

      setPredictions((prev) => ({
        ...prev,
        [projectId]:
          projectId === 3
            ? {
                sentimiento: data.sentimiento,
                probabilidad: data.probabilidad,
              }
            : {
                probabilidad: data.probabilidad,
                riesgo: data.riesgo,
              },
      }));
    } catch (error) {
      console.error("Error al conectar con el modelo:", error);
      setPredictions((prev) => ({
        ...prev,
        [projectId]: { riesgo: "Error", probabilidad: 0 },
      }));
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Render del componente
  // ==========================
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
              {activeProject === project.id ? "Cerrar" : "Probar modelo"}
            </button>

            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="ml-code-link"
            >
              <FaCode className="ml-code-icon" /> Ver código aquí
            </a>

            {/* 🔹 Formulario dinámico */}
            {activeProject === project.id && (
              <div className="ml-form-container">
                {/* 🩺 Modelo de Diabetes */}
                {project.id === 1 && (
                  <form
                    onSubmit={(e) => handleSubmit(e, project.endpoint, 1)}
                    className="ml-form"
                  >
                    <p className="ml-intro">
                      Completa los campos según tu estado actual para estimar el
                      nivel de riesgo de diabetes.
                    </p>

                    {["BMI", "GenHlth", "MentHlth", "PhysHlth", "Age", "Education", "Income"].map(
                      (field) => (
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
                            placeholder="Ej: 4"
                          />
                          <small>{ranges[field]?.text}</small>
                          {errors[field] && (
                            <p className="ml-error">{errors[field]}</p>
                          )}
                        </label>
                      )
                    )}

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
                          : field === "Smoker"
                          ? "Fumador"
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

                    <button type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          <span className="ml-spinner"></span> Analizando...
                        </>
                      ) : (
                        "Predecir"
                      )}
                    </button>
                  </form>
                )}

                {/* 🍷 Modelo Vinos */}
                {project.id === 2 && (
                  <div className="ml-form">
                    <p className="ml-intro">
                      🚧 Este modelo estará disponible próximamente.
                    </p>
                  </div>
                )}

                {/* 💬 Modelo Sentimientos */}
                {project.id === 3 && (
                  <form
                    onSubmit={(e) => handleSubmit(e, project.endpoint, 3)}
                    className="ml-form"
                  >
                    <p className="ml-intro">
                      Escribe una opinión o comentario y el modelo detectará si el
                      sentimiento expresado es positivo o negativo.
                    </p>

                    <label>
                      Ingrese su texto:
                      <textarea
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                        placeholder="Ejemplo: Me encanta cómo funciona esta aplicación"
                        rows="4"
                        style={{
                          width: "100%",
                          resize: "vertical",
                          padding: "0.8rem",
                          borderRadius: "8px",
                          border: "1px solid #444",
                          background: "#1e1e1e",
                          color: "#fff",
                          fontSize: "0.95rem",
                        }}
                      />
                      {errors.text && <p className="ml-error">{errors.text}</p>}
                    </label>

                    <button type="submit" disabled={!formData.text || loading}>
                      {loading ? (
                        <>
                          <span className="ml-spinner"></span> Analizando...
                        </>
                      ) : (
                        "Analizar Sentimiento"
                      )}
                    </button>
                  </form>
                )}

                {/* 🔹 Resultados independientes */}
                {predictions[project.id] && (
                  <div
                    className={`ml-result ${
                      predictions[project.id].riesgo === "Error"
                        ? "error"
                        : predictions[project.id].sentimiento === "positivo"
                        ? "negative"
                        : predictions[project.id].sentimiento === "negativo"
                        ? "positive"
                        : predictions[project.id].riesgo === "Alto"
                        ? "positive"
                        : "negative"
                    }`}
                  >
                    {project.id === 3 ? (
                      <>
                        <strong>Sentimiento:</strong>{" "}
                        {predictions[3].sentimiento === "positivo"
                          ? "Positivo 😊"
                          : "Negativo 😞"}
                        <br />
                        <strong>Probabilidad:</strong>{" "}
                        {Math.round(predictions[3].probabilidad * 100)}%
                      </>
                    ) : project.id === 1 ? (
                      <>
                        <strong>Resultado:</strong>{" "}
                        {predictions[1].riesgo === "Alto"
                          ? "Riesgo Alto ⚠️"
                          : "Riesgo Bajo ✅"}
                        <br />
                        <strong>Probabilidad:</strong>{" "}
                        {Math.round(predictions[1].probabilidad * 100)}%
                      </>
                    ) : (
                      <p>🚧 Este modelo estará disponible próximamente.</p>
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
