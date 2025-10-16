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
    text: "", // campo de sentimientos
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState({ 1: null, 2: null, 3: null });

  // ✅ PROYECTOS (orden y textos actualizados)
  // 1) Diabetes (funcional)
  // 2) Sentimientos (funcional)
  // 3) Reconsight (en desarrollo)
  const projects = [
    {
      id: 1,
      title: "🩺 Predicción de Riesgo de Diabetes",
      description:
        "Modelo predictivo que estima el riesgo de desarrollar diabetes tipo II a partir de indicadores clínicos y hábitos de salud. Entrenado en Google Colab y optimizado para consumo web con Flask, desplegado en Render.",
      endpoint: "https://pdiabetes-backend.onrender.com/predict",
      repo: "https://github.com/Rudeluy/pdiabetes-backend",
    },
    {
      id: 3,
      title: "💬 Análisis de Sentimientos",
      description:
        "Modelo NLP que clasifica textos en español como positivos o negativos usando TF-IDF + Logistic Regression. Implementado como servicio Flask y desplegado en Render.",
      endpoint: "https://psentimientos-backend.onrender.com/predict",
      repo: "https://github.com/Rudeluy/psentimientos-backend",
    },
    {
      id: 2,
      title: "🧠 Reconsight (Visión por Computador)",
      description:
        "Proyecto experimental de visión computacional para reconocimiento y análisis de imágenes con CNN. Actualmente en desarrollo — pronto disponible como servicio web.",
      endpoint: "#", // sin endpoint aún, solo UI y enlace a GitHub
      repo: "https://github.com/Rudeluy/Reconsight",
    },
  ];

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

  const validateField = (name, value) => {
    if (binaryFields.includes(name)) {
      if (value !== "0" && value !== "1") return "Debe seleccionar una opción válida.";
      return "";
    }
    if (ranges[name]) {
      if (value === "") return "Campo obligatorio.";
      if (isNaN(value)) return "Debe ingresar un número.";
      if (value < ranges[name].min || value > ranges[name].max)
        return `Debe estar entre ${ranges[name].min} y ${ranges[name].max}.`;
    }
    if (name === "text") {
      if (!value.trim()) return "Debe ingresar un texto.";
      if (value.length < 5) return "El texto debe tener al menos 5 caracteres.";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e, endpoint, projectId) => {
    e.preventDefault();
    setPredictions((prev) => ({ ...prev, [projectId]: null }));

    const newErrors = {};
    const fieldsToValidate =
      projectId === 3 ? ["text"] : Object.keys(formData).filter((f) => f !== "text");
    fieldsToValidate.forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    // Evita envío si el proyecto no tiene endpoint (Reconsight)
    if (!endpoint || endpoint === "#") {
      setPredictions((prev) => ({
        ...prev,
        [projectId]: { riesgo: "Error", probabilidad: 0 },
      }));
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
            ? { sentimiento: data.sentimiento, probabilidad: data.probabilidad }
            : { probabilidad: data.probabilidad, riesgo: data.riesgo },
      }));
    } catch (error) {
      console.error("Error:", error);
      setPredictions((prev) => ({
        ...prev,
        [projectId]: { riesgo: "Error", probabilidad: 0 },
      }));
    } finally {
      setLoading(false);
    }
  };

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

            <a href={project.repo} target="_blank" rel="noreferrer" className="ml-code-link">
              <FaCode className="ml-code-icon" /> Ver código aquí
            </a>

            {activeProject === project.id && (
              <div className="ml-form-container">
                {/* 🩺 Modelo de Diabetes */}
                {project.id === 1 && (
                  <form onSubmit={(e) => handleSubmit(e, project.endpoint, 1)} className="ml-form">
                    <p className="ml-intro">
                      Completa los campos para estimar tu riesgo de diabetes.
                    </p>

                    {/* Sección 1 - Datos personales */}
                    <h4 className="ml-section-subtitle">Datos personales</h4>
                    {["Age", "Sex", "Education", "Income"].map((field) => (
                      <label key={field}>
                        {field === "Age"
                          ? "Edad (grupo 1–13)"
                          : field === "Sex"
                          ? "Sexo"
                          : field === "Education"
                          ? "Nivel educacional"
                          : "Nivel de ingresos"}
                        {field === "Sex" ? (
                          <select name={field} value={formData[field]} onChange={handleChange}>
                            <option value="">Seleccione...</option>
                            <option value="0">Femenino</option>
                            <option value="1">Masculino</option>
                          </select>
                        ) : (
                          <input
                            type="number"
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            placeholder="Ej: 4"
                          />
                        )}
                        <small>{ranges[field]?.text}</small>
                        {errors[field] && <p className="ml-error">{errors[field]}</p>}
                      </label>
                    ))}

                    {/* Sección 2 - Estado general */}
                    <h4 className="ml-section-subtitle">Estado general</h4>
                    {["BMI", "GenHlth", "MentHlth", "PhysHlth"].map((field) => (
                      <label key={field}>
                        {field === "BMI"
                          ? "IMC"
                          : field === "GenHlth"
                          ? "Salud general (1–5)"
                          : field === "MentHlth"
                          ? "Días de salud mental no óptima"
                          : "Días de salud física no óptima"}
                        <input
                          type="number"
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          placeholder="Ej: 4"
                        />
                        <small>{ranges[field]?.text}</small>
                        {errors[field] && <p className="ml-error">{errors[field]}</p>}
                      </label>
                    ))}

                    {/* Sección 3 - Diagnósticos y hábitos */}
                    <h4 className="ml-section-subtitle">Diagnósticos y hábitos</h4>
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
                    ].map((field) => (
                      <label key={field}>
                        {field === "HighBP"
                          ? "Presión alta"
                          : field === "HighChol"
                          ? "Colesterol alto"
                          : field === "CholCheck"
                          ? "Revisión de colesterol reciente"
                          : field === "Smoker"
                          ? "Fumador"
                          : field === "Stroke"
                          ? "Ha sufrido ACV"
                          : field === "HeartDiseaseorAttack"
                          ? "Enfermedad cardíaca o ataque"
                          : field === "PhysActivity"
                          ? "Actividad física"
                          : field === "Fruits"
                          ? "Consumo de frutas"
                          : field === "Veggies"
                          ? "Consumo de verduras"
                          : field === "HvyAlcoholConsump"
                          ? "Consumo alto de alcohol"
                          : field === "AnyHealthcare"
                          ? "Tiene cobertura médica"
                          : field === "NoDocbcCost"
                          ? "No fue al médico por costo"
                          : "Dificultad para caminar"}
                        <select name={field} value={formData[field]} onChange={handleChange}>
                          <option value="">Seleccione...</option>
                          <option value="0">No</option>
                          <option value="1">Sí</option>
                        </select>
                        {errors[field] && <p className="ml-error">{errors[field]}</p>}
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

                {/* 💬 Modelo Sentimientos */}
                {project.id === 3 && (
                  <form onSubmit={(e) => handleSubmit(e, project.endpoint, 3)} className="ml-form">
                    <p className="ml-intro">
                      Escribe una frase o comentario y el modelo analizará el sentimiento expresado.
                    </p>
                    <label>
                      Ingrese su texto:
                      <textarea
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                        placeholder="Ej: Me gusta mucho este sistema"
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

                {/* 🧠 Reconsight (placeholder en desarrollo) */}
                {project.id === 2 && (
                  <div className="ml-form">
                    <p className="ml-intro">
                      🚧 Este modelo estará disponible próximamente.
                    </p>
                  </div>
                )}

                {/* 🔹 Resultados */}
                {predictions[project.id] && (
                  <div
                    className={`ml-result ${
                      predictions[project.id].riesgo === "Error"
                        ? "error"
                        : predictions[project.id].riesgo === "Alto" ||
                          predictions[project.id].sentimiento === "negativo"
                        ? "positive"
                        : "negative"
                    }`}
                  >
                    {project.id === 3 ? (
                      <>
                        <strong>Sentimiento:</strong>{" "}
                        {predictions[3].sentimiento === "positivo" ? "Positivo 😊" : "Negativo 😞"}
                        <br />
                        <strong>Probabilidad:</strong>{" "}
                        {Math.round(predictions[3].probabilidad * 100)}%
                      </>
                    ) : project.id === 1 ? (
                      <>
                        <strong>Resultado:</strong>{" "}
                        {predictions[1].riesgo === "Alto" ? "Riesgo Alto ⚠️" : "Riesgo Bajo ✅"}
                        <br />
                        <strong>Probabilidad:</strong>{" "}
                        {Math.round(predictions[1].probabilidad * 100)}%
                      </>
                    ) : (
                      <>
                        <strong>Estado:</strong> Aún no disponible.
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
