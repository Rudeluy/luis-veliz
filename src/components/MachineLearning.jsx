import React, { useState } from "react";
import "./MachineLearning.css";
import { FaCode } from "react-icons/fa";

export function MachineLearning() {
  // -----------------------------------------
  // Estados: detalles y formularios por tarjeta
  // -----------------------------------------
  const [showDetails, setShowDetails] = useState({
    diabetes: false,
    sentiment: false,
    vision: false,
  });

  const [showForm, setShowForm] = useState({
    diabetes: false,
    sentiment: false,
    vision: false,
  });

  // -----------------------------------------
  // Form / predicciones / validaciones
  // -----------------------------------------
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
    text: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState({ 1: null, 2: null, 3: null });

  // -----------------------------------------
  // Información de proyectos
  // -----------------------------------------
  const projects = [
    {
      id: 1,
      key: "diabetes",
      title: "🩺 Predicción de Riesgo de Diabetes",
      description:
        "Modelo predictivo que estima el riesgo de desarrollar diabetes tipo II a partir de indicadores clínicos y hábitos de salud.",
      objective:
        "El objetivo fue aplicar técnicas de Machine Learning para desarrollar un modelo funcional accesible desde la web, entrenado y desplegado en Render.",
      reflection:
        "Este proyecto me permitió entender todo el ciclo de vida de un modelo, desde la limpieza de datos hasta su consumo en un entorno real.",
      endpoint: "https://pdiabetes-backend.onrender.com/predict",
      repo: "https://github.com/Rudeluy/pdiabetes-backend",
    },
    {
      id: 3,
      key: "sentiment",
      title: "💬 Análisis de Sentimientos",
      description:
        "Clasificador de textos en español que determina si un comentario es positivo o negativo utilizando TF-IDF y Logistic Regression.",
      objective:
        "El objetivo fue aplicar técnicas de NLP para crear un modelo de análisis de sentimientos implementado en Flask y desplegado en Render.",
      reflection:
        "A través de este proyecto aprendí a tratar datos textuales, optimizar modelos livianos y hacerlos interpretables para usuarios finales.",
      endpoint: "https://psentimientos-backend.onrender.com/predict",
      repo: "https://github.com/Rudeluy/psentimientos-backend",
    },
    {
      id: 2,
      key: "vision",
      title: "🧠 Reconsight (Visión por Computador)",
      description:
        "Proyecto experimental que explora el uso de redes neuronales convolucionales (CNN) para reconocimiento de imágenes.",
      objective:
        "El objetivo es aplicar los principios del aprendizaje profundo en visión computacional, explorando cómo los modelos reconocen patrones visuales.",
      reflection:
        "Este trabajo permitió afianzar conceptos de preprocesamiento y arquitectura CNN, con miras a implementar soluciones prácticas más adelante.",
      endpoint: "#",
      repo: "https://github.com/Rudeluy/Reconsight",
    },
  ];

  // -----------------------------------------
  // Validaciones
  // -----------------------------------------
  const ranges = {
    BMI: { min: 10, max: 70, text: "IMC entre 10 y 70" },
    GenHlth: { min: 1, max: 5, text: "1=Muy Mala, 2=Mala, 3=Regular, 4=Buena, 5=Excelente" },
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
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // -----------------------------------------
  // Envío de formularios por proyecto
  // -----------------------------------------
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

  // -----------------------------------------
  // Helpers para toggles
  // -----------------------------------------
  const toggleDetails = (key) =>
    setShowDetails((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleForm = (key) =>
    setShowForm((prev) => ({ ...prev, [key]: !prev[key] }));

  // -----------------------------------------
  // Render
  // -----------------------------------------
  return (
    <section id="machine-learning" className="ml-section">
      {/* Intro */}
      <div className="ml-intro-block">
        <h2>Portafolio de Machine Learning</h2>
        <p>
          Hola, soy <strong>Luis Véliz</strong>, Ingeniero Informático con experiencia en QA
          funcional, automatización de pruebas, análisis de datos y desarrollo de soluciones
          basadas en inteligencia artificial.
        </p>
        <p>
          Este portafolio reúne proyectos desarrollados durante el{" "}
          <strong>curso de Machine Learning impartido por Talento Digital y dictado por Kibernum</strong>.
          Cada proyecto refleja parte del proceso de aprendizaje y cómo se aplican modelos en
          entornos reales.
        </p>
      </div>

      <h2 className="ml-title">Proyectos de Machine Learning</h2>
      <p className="ml-subtitle">Explora los modelos y prueba sus predicciones en tiempo real.</p>

      <div className="ml-cards">
        {/* ======================================================
            PROYECTO 1: DIABETES
        ====================================================== */}
        <div className="ml-card">
          <h3>{projects[0].title}</h3>
          <p>{projects[0].description}</p>

          {/* Botones centrados: detalles y probar */}
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", margin: "12px 0" }}>
            <button
              className="ml-btn-secondary"
              onClick={() => toggleDetails(projects[0].key)}
            >
              {showDetails.diabetes ? "Ocultar detalles" : "Ver más detalles"}
            </button>
            <button
              className="ml-btn"
              onClick={() => toggleForm(projects[0].key)}
            >
              {showForm.diabetes ? "Cerrar" : "Probar modelo"}
            </button>
          </div>

          {/* Detalles */}
          {showDetails.diabetes && (
            <div className="ml-details">
              <p><strong>Objetivo:</strong> {projects[0].objective}</p>
              <p><strong>Reflexión:</strong> {projects[0].reflection}</p>
            </div>
          )}

          {/* Formulario */}
          {showForm.diabetes && (
            <div className="ml-form-container">
              <form onSubmit={(e) => handleSubmit(e, projects[0].endpoint, 1)} className="ml-form">
                <p className="ml-intro">Completa los campos para estimar tu riesgo de diabetes.</p>

                <h4 className="ml-section-subtitle">Datos personales</h4>
                {["Age", "Sex", "Education", "Income"].map((field) => (
                  <label key={field}>
                    {field === "Sex" ? (
                      <>
                        Sexo
                        <select name={field} value={formData[field]} onChange={handleChange}>
                          <option value="">Seleccione...</option>
                          <option value="0">Femenino</option>
                          <option value="1">Masculino</option>
                        </select>
                      </>
                    ) : (
                      <>
                        {field}:
                        <input
                          type="number"
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          placeholder="Ej: 4"
                        />
                      </>
                    )}
                    <small>{ranges[field]?.text}</small>
                    {errors[field] && <p className="ml-error">{errors[field]}</p>}
                  </label>
                ))}

                <h4 className="ml-section-subtitle">Estado general</h4>
                {["BMI", "GenHlth", "MentHlth", "PhysHlth"].map((field) => (
                  <label key={field}>
                    {field}
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

                <h4 className="ml-section-subtitle">Diagnósticos y hábitos</h4>
                {binaryFields.map((field) => (
                  <label key={field}>
                    {field}
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

              {/* Resultado Diabetes */}
              {predictions[1] && (
                <div className="ml-result">
                  <strong>Resultado:</strong>{" "}
                  {predictions[1].riesgo === "Alto" ? "Riesgo Alto ⚠️" : "Riesgo Bajo ✅"}
                  <br />
                  <strong>Probabilidad:</strong>{" "}
                  {Math.round(predictions[1].probabilidad * 100)}%
                </div>
              )}
            </div>
          )}

          <a href={projects[0].repo} target="_blank" rel="noreferrer" className="ml-code-link">
            <FaCode className="ml-code-icon" /> Ver código aquí
          </a>
        </div>

        {/* ======================================================
            PROYECTO 2: SENTIMIENTOS
        ====================================================== */}
        <div className="ml-card">
          <h3>{projects[1].title}</h3>
          <p>{projects[1].description}</p>

          <div style={{ display: "flex", gap: "10px", justifyContent: "center", margin: "12px 0" }}>
            <button
              className="ml-btn-secondary"
              onClick={() => toggleDetails(projects[1].key)}
            >
              {showDetails.sentiment ? "Ocultar detalles" : "Ver más detalles"}
            </button>
            <button
              className="ml-btn"
              onClick={() => toggleForm(projects[1].key)}
            >
              {showForm.sentiment ? "Cerrar" : "Probar modelo"}
            </button>
          </div>

          {showDetails.sentiment && (
            <div className="ml-details">
              <p><strong>Objetivo:</strong> {projects[1].objective}</p>
              <p><strong>Reflexión:</strong> {projects[1].reflection}</p>
            </div>
          )}

          {showForm.sentiment && (
            <div className="ml-form-container">
              <form onSubmit={(e) => handleSubmit(e, projects[1].endpoint, 3)} className="ml-form">
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

              {/* Resultado Sentimientos */}
              {predictions[3] && (
                <div className="ml-result">
                  <strong>Sentimiento:</strong>{" "}
                  {predictions[3].sentimiento === "positivo" ? "Positivo 😊" : "Negativo 😞"}
                  <br />
                  <strong>Probabilidad:</strong>{" "}
                  {Math.round(predictions[3].probabilidad * 100)}%
                </div>
              )}
            </div>
          )}

          <a href={projects[1].repo} target="_blank" rel="noreferrer" className="ml-code-link">
            <FaCode className="ml-code-icon" /> Ver código aquí
          </a>
        </div>

        {/* ======================================================
            PROYECTO 3: RECONSIGHT (Visión)
        ====================================================== */}
        <div className="ml-card">
          <h3>{projects[2].title}</h3>
          <p>{projects[2].description}</p>

          <div style={{ display: "flex", gap: "10px", justifyContent: "center", margin: "12px 0" }}>
            <button
              className="ml-btn-secondary"
              onClick={() => toggleDetails(projects[2].key)}
            >
              {showDetails.vision ? "Ocultar detalles" : "Ver más detalles"}
            </button>
            <button
              className="ml-btn"
              onClick={() => toggleForm(projects[2].key)}
            >
              {showForm.vision ? "Cerrar" : "Probar modelo"}
            </button>
          </div>

          {showDetails.vision && (
            <div className="ml-details">
              <p><strong>Objetivo:</strong> {projects[2].objective}</p>
              <p><strong>Reflexión:</strong> {projects[2].reflection}</p>
            </div>
          )}

          {showForm.vision && (
            <div className="ml-form-container">
              <div className="ml-form">
                <p className="ml-intro">🚧 Este modelo estará disponible próximamente.</p>
              </div>
              <div className="ml-result error">
                <strong>Estado:</strong> <span>En desarrollo.</span>
              </div>
            </div>
          )}

          <a href={projects[2].repo} target="_blank" rel="noreferrer" className="ml-code-link">
            <FaCode className="ml-code-icon" /> Ver código aquí
          </a>
        </div>
      </div>

      {/* Reflexión final */}
      <div className="ml-reflection">
        <h3>Reflexión final</h3>
        <p>
          Este portafolio refleja mi proceso de aprendizaje dentro del curso de Machine Learning.
          Cada proyecto demuestra cómo la curiosidad y la práctica constante permiten convertir
          la teoría en soluciones aplicables. Mantengo un enfoque ordenado, riguroso y orientado a
          la mejora continua, buscando siempre aprender y explorar nuevas áreas de la informática.
        </p>
      </div>
    </section>
  );
}
