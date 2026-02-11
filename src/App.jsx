import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

function App() {
  const [init, setInit] = useState(false);

  // Inicializa el motor de partículas una sola vez
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  return (
    <>
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={{
            background: {
              color: { value: "#0d1117" }, // Fondo oscuro estilo GitHub
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: { enable: true, mode: "push" },
                onHover: { enable: true, mode: "repulse" }, // Efecto "Antigravity" al pasar el mouse
                resize: true,
              },
              modes: {
                push: { quantity: 4 },
                repulse: { distance: 200, duration: 0.4 },
              },
            },
            particles: {
              color: { value: "#ffffff" },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: false,
                speed: 2,
                straight: false,
              },
              number: {
                density: { enable: true, area: 800 },
                value: 80,
              },
              opacity: { value: 0.5 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 5 } },
            },
            detectRetina: true,
          }}
          style={{ position: "absolute", zIndex: -1, top: 0, left: 0 }}
        />
      )}
      
      {/* AQUÍ VA TU CONTENIDO (Encima de las partículas) */}
      <div style={{ position: "relative", zIndex: 10, color: "white", textAlign: "center", paddingTop: "20vh" }}>
        <h1 style={{ fontSize: "4rem", margin: 0 }}>LUIS CHIRINOS</h1>
        <h2 style={{ color: "#58a6ff" }}>Full Stack Engineer & DevSecOps</h2>
        <button style={{ padding: "15px 30px", fontSize: "1.2rem", marginTop: "20px", cursor: "pointer" }}>
          Ver Proyectos
        </button>
      </div>
    </>
  );
}

export default App;