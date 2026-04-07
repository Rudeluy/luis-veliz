import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export function Background() {
  const particlesInit = useCallback(async (engine) => {
       await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback((container) => {
    if (container?.canvas?.element) {
      container.canvas.element.style.position = "fixed";
      container.canvas.element.style.top = "0";
      container.canvas.element.style.left = "0";
      container.canvas.element.style.width = "100vw";
      container.canvas.element.style.height = "100vh";
      container.canvas.element.style.zIndex = "0";
      container.canvas.element.style.pointerEvents = "none";
    }
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: { color: { value: "transparent" } },
        fullScreen: { enable: true, zIndex: 0 },
        detectRetina: true,
        fpsLimit: 60,
        particles: {
          number: { value: 120, density: { enable: true, area: 800 } },
          color: { value: ["#12c4b5ff", "#0c6e51ff", "#16865bff"] },
          shape: { type: "circle" },
          opacity: {
            value: 0.8,
            random: true,
            animation: { enable: true, speed: 1, minimumValue: 0.3 },
          },
          size: {
            value: { min: 1, max: 3 },
            animation: { enable: true, speed: 3, minimumValue: 0.5 },
          },
          links: {
            enable: true,
            distance: 150,
            color: "#086338d3",
            opacity: 0.5,
            width: 1.2,
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            outModes: { default: "out" },
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            repulse: { distance: 120, duration: 0.4 },
            push: { quantity: 3 },
          },
        },
      }}
    />
  );
}
