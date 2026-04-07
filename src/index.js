import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";   // 👈 Debe estar aquí
import App from "./App";

// Silenciar errores de extensiones en modo desarrollo
if (process.env.NODE_ENV === "development") {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (typeof args[0] === "string" && args[0].includes("Unchecked runtime.lastError")) return;
    originalConsoleError(...args);
  };
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
