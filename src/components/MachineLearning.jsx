import React, { useState } from "react";
import "./MachineLearning.css";
import { FaCode } from "react-icons/fa";

export function MachineLearning() {
  // -----------------------------
  // Estados generales
  // -----------------------------
  const [activeProject, setActiveProject] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);
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

  // -----------------------------
  // Datos de proyectos
  // -----------------------------
  const projects = [
    {
      id: 1,
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

  // -----------------------------
  // Validaciones
  // -----------------------------
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
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  // -----------------------------
  // Envío del formulario
  // -----------------------------
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

  // -----------------------------
  // Render principal
  // -----------------------------
  return (
    <section id="machine-learning" className="ml-section">
      {/* Introducción */}
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

      {/* Listado de proyectos */}
      <h2 className="ml-title">Proyectos de Machine Learning</h2>
      <p className="ml-subtitle">Explora los modelos y prueba sus predicciones en tiempo real.</p>

      <div className="ml-cards">
        {projects.map((project) => (
          <div key={project.id} className="ml-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>

            {/* Botón para ver más detalles */}
            <button
              className="ml-btn-secondary"
              onClick={() =>
                setExpandedProject(expandedProject === project.id ? null : project.id)
              }
            >
              {expandedProject === project.id ? "Ocultar detalles" : "Ver más detalles"}
            </button>

            {/* Bloque de detalles */}
            {expandedProject === project.id && (
              <div className="ml-details">
                <p><strong>Objetivo:</strong> {project.objective}</p>
                <p><strong>Reflexión:</strong> {project.reflection}</p>
              </div>
            )}

            {/* Acciones */}
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

            {/* Formulario dinámico por proyecto */}
            {activeProject === project.id && (
              <div className="ml-form-container">
                {/* 🩺 Diabetes */}
                {project.id === 1 && (
                  <form onSubmit={(e) => handleSubmit(e, project.endpoint, 1)} className="ml-form">
                    <p>Completa los campos para estimar tu riesgo de diabetes.</p>

                    {/* Campos personales */}
                    <h4>Datos personales</h4>
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
                            {field}:{" "}
                            <input
                              type="number"
                              name={field}
                              value={formData[field]}
                              onChange={handleChange}
                            />
                          </>
                        )}
                        <small>{ranges[field]?.text}</small>
                        {errors[field] && <p className="ml-error">{errors[field]}</p>}
                      </label>
                    ))}

                    {/* Campos físicos */}
                    <h4>Estado general</h4>
                    {["BMI", "GenHlth", "MentHlth", "PhysHlth"].map((field) => (
                      <label key={field}>
                        {field}
                        <input
                          type="number"
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                        />
                        <small>{ranges[field]?.text}</small>
                        {errors[field] && <p className="ml-error">{errors[field]}</p>}
                      </label>
                    ))}

                    {/* Hábitos */}
                    <h4>Diagnósticos y hábitos</h4>
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
                      {loading ? "Analizando..." : "Predecir"}
                    </button>
                  </form>
                )}

                {/* 💬 Sentimientos */}
                {project.id === 3 && (
                  <form onSubmit={(e) => handleSubmit(e, project.endpoint, 3)} className="ml-form">
                    <p>Escribe una frase o comentario y analiza el sentimiento.</p>
                    <label>
                      Ingrese su texto:
                      <textarea
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                        placeholder="Ej: Me gusta mucho este sistema"
                        rows="4"
                      />
                      {errors.text && <p className="ml-error">{errors.text}</p>}
                    </label>
                    <button type="submit" disabled={loading}>
                      {loading ? "Analizando..." : "Analizar Sentimiento"}
                    </button>
                  </form>
                )}

                {/* 🧠 Reconsight */}
                {project.id === 2 && (
                  <div className="ml-form">
                    <p>🚧 Este modelo estará disponible próximamente.</p>
                  </div>
                )}

                {/* Resultados */}
                {predictions[project.id] && (
                  <div className="ml-result">
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
