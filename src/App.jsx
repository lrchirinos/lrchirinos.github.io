import { useEffect, useState, useMemo, useRef } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

// --- DATOS DEL CV ---
const EXPERIENCE = [
  {
    id: 1,
    role: "Cloud Systems Analyst & RPA Developer",
    company: "Andean Anthracite ACE S.A.",
    period: "2025 - Present",
    desc: "RPA & AI: 80% time reduction using Python/Selenium and Google Gemini AI integration.",
    fullDetails: "Architected a high-scale RPA solution to automate data extraction from government portals (SUNAT/MTC). Implemented Computer Vision and OCR for CAPTCHA resolution and integrated Google Gemini LLM to achieve 95% accuracy in financial data categorization.",
    tags: ["Python", "Selenium", "Gemini AI", "OCR", "SQL"]
  },
  {
    id: 2,
    role: "Full Stack Engineer",
    company: "Freelance Project",
    period: "2025",
    desc: "Full Stack: Scalable web apps with Angular 17+ and NestJS with CI/CD implementation.",
    fullDetails: "Designed and deployed a Single Page Application (SPA) with a modular architecture. Built a RESTful API with NestJS using DTOs for strict validation and managed deployment environments with Docker and cloud services.",
    tags: ["Angular", "NestJS", "TypeScript", "Docker", "PostgreSQL"]
  },
  {
    id: 3,
    role: "IT Automation & Security Specialist",
    company: "Clínica San Antonio",
    period: "2025",
    desc: "Automated TEDEF data validation for SUSALUD and hardened Windows Server infrastructure.",
    fullDetails: "Eliminated manual errors in insurance claim submissions by automating data interoperability protocols. Managed Active Directory policies and established automated backup routines on Windows Server 2019.",
    tags: ["Windows Server", "Automation", "Security", "Active Directory"]
  },
  {
    id: 4,
    role: "Network Security Specialist",
    company: "Novo Resonancia",
    period: "2025",
    desc: "Network Security: Perimeter defense with Fortinet Firewalls and VLAN segmentation.",
    fullDetails: "Ensured medical data integrity (PACS/RIS) by configuring Fortinet Firewall rules and access control lists (ACLs). Optimized network performance through strategic VLAN segmentation.",
    tags: ["Fortinet", "Networking", "VLAN", "Network Security"]
  },
  {
    id: 5,
    role: "Python Developer & Support",
    company: "EsSalud",
    period: "2023",
    desc: "Software & Cloud: Desktop apps with Python/PyQt and private cloud deployment.",
    fullDetails: "Created a specialized desktop tool for asset management and digitization using Python. Deployed and managed private cloud storage solutions with Nextcloud on Ubuntu Linux servers.",
    tags: ["Python", "PyQt", "Linux", "Nextcloud", "Ubuntu"]
  }
];

// --- ICONO CANDADO ---
const LockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

// --- FOTO CON GLOW EN SILUETA ---
// Requiere PNG con fondo transparente para que drop-shadow siga el contorno del cuerpo.
// Si tu foto tiene fondo oscuro, el glow rodeará el rectángulo de la imagen.
function ProfilePhoto({ imgError, setImgError }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        marginBottom: '1.5rem',
        display: 'inline-block',
        cursor: 'default',
        // El filter en el wrapper añade un halo difuso extra detrás de la silueta
        filter: hovered
          ? 'drop-shadow(0 0 40px rgba(63,185,80,0.35))'
          : 'drop-shadow(0 0 20px rgba(88,166,255,0.2))',
        transition: 'filter 0.5s ease'
      }}
    >
      {!imgError ? (
        <img
          src="/profile.png"
          alt="Luis Chirinos"
          onError={() => setImgError(true)}
          style={{
            // Sin borderRadius: la silueta del PNG define el contorno
            // Si tu imagen AUN tiene fondo, agrega borderRadius:'50%' y objectFit:'cover'
            width: hovered ? '215px' : '200px',
            height: 'auto',
            borderRadius: 0,
            objectFit: 'contain',
            display: 'block',
            position: 'relative',
            zIndex: 2,
            // drop-shadow en capas: sigue el contorno exacto de los píxeles del PNG
            // Capa 1: borde ajustado al contorno (blur pequeño, muy intenso)
            // Capa 2: aureola media
            // Capa 3: halo amplio y difuso — da sensación de "luz desde dentro"
            filter: hovered
              ? [
                  'grayscale(0%)',
                  'contrast(1.05)',
                  'drop-shadow(0 0 6px  rgba(63,185,80,1))',
                  'drop-shadow(0 0 18px rgba(63,185,80,0.75))',
                  'drop-shadow(0 0 45px rgba(63,185,80,0.35))'
                ].join(' ')
              : [
                  'grayscale(100%)',
                  'contrast(1.15)',
                  'drop-shadow(0 0 5px  rgba(88,166,255,0.6))',
                  'drop-shadow(0 0 16px rgba(88,166,255,0.25))'
                ].join(' '),
            transition: 'all 0.5s ease'
          }}
        />
      ) : (
        // Fallback si no carga la imagen
        <div style={{
          width: '145px',
          height: '145px',
          borderRadius: '50%',
          background: '#0d1117',
          border: '3px solid #3fb950',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2,
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#3fb950',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          boxShadow: hovered ? '0 0 30px rgba(63,185,80,0.5)' : 'none',
          transition: 'all 0.45s ease'
        }}>
          LC
        </div>
      )}
    </div>
  );
}

// --- TERMINAL CON CURSOR PARPADEANTE Y LÍNEA [OK] FINAL ---
function TerminalLog({ lines, done }) {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor(p => !p), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <div style={{
      marginTop: '30px',
      background: 'rgba(0,0,0,0.85)',
      padding: '18px 20px',
      borderRadius: '6px',
      fontFamily: 'monospace',
      textAlign: 'left',
      width: '90%',
      maxWidth: '520px',
      border: '1px solid #30363d',
      minHeight: '110px',
      color: '#3fb950',
      boxShadow: '0 0 20px rgba(63,185,80,0.08)'
    }}>
      <pre style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
        {/* Líneas que van apareciendo una a una */}
        {lines.join('\n')}
        {/* Línea [OK] — aparece cuando terminaron todos los pasos */}
        {done
          ? `\n[OK] FILES UNLOCKED — ${EXPERIENCE.length} records found.`
          : (showCursor ? '█' : ' ')
        }
      </pre>
    </div>
  );
}

// --- APP PRINCIPAL ---
export default function App() {
  const [init, setInit]                 = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [typingLines, setTypingLines]   = useState([]);
  const [terminalDone, setTerminalDone] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [imgError, setImgError]         = useState(false);

  const projectsRef = useRef(null);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const particlesOptions = useMemo(() => ({
    background: { color: { value: "#0d1117" } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "repulse" },
        onHover: { enable: true, mode: "grab" },
      },
      modes: {
        repulse: { distance: 200, duration: 0.4 },
        grab: { distance: 140, links: { opacity: 1 } }
      },
    },
    particles: {
      color: { value: "#58a6ff" },
      links: { color: "#58a6ff", distance: 150, enable: true, opacity: 0.2, width: 1 },
      move: { enable: true, speed: 1 },
      number: { density: { enable: true, area: 800 }, value: 60 },
      opacity: { value: 0.5 },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  }), []);

  const handleDecrypt = () => {
    if (showProjects || showTerminal) return;

    const steps = [
      "> Connecting to secure server...",
      "> Verifying handshake...",
      "> Access Granted.",
      "> Decrypting project files..."
    ];

    setTypingLines([]);
    setTerminalDone(false);
    setShowTerminal(true);

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        setTypingLines(prev => [...prev, steps[stepIndex]]);
        stepIndex++;
      } else {
        clearInterval(interval);
        // Mostramos [OK] 400ms después del último paso
        setTimeout(() => {
          setTerminalDone(true);
          // Revelamos las tarjetas 900ms después del [OK]
          setTimeout(() => {
            setShowProjects(true);
            setTimeout(() => {
              projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }, 900);
        }, 400);
      }
    }, 600);
  };

  // ─── VISTA DETALLE ───────────────────────────────────────────────────────────
  if (selectedProject) {
    return (
      <div style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        padding: '60px 40px',
        color: '#c9d1d9',
        animation: 'fadeIn 0.5s',
        background: '#0d1117',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box'
      }}>
        <div style={{ width: '100%', maxWidth: '800px' }}>
          <div className="glass-panel" style={{
            padding: '40px',
            borderRadius: '12px',
            borderTop: '4px solid #3fb950',
            background: 'rgba(13, 17, 23, 0.9)',
            position: 'relative'
          }}>

            {/* ✕ CERRAR */}
            <button
              onClick={() => setSelectedProject(null)}
              title="Return to grid"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: '1px solid #30363d',
                color: '#8b949e',
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                lineHeight: 1,
                fontFamily: 'monospace'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#ff7b72';
                e.currentTarget.style.color = '#ff7b72';
                e.currentTarget.style.background = 'rgba(255,123,114,0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#30363d';
                e.currentTarget.style.color = '#8b949e';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              ✕
            </button>

            <h1 style={{ fontSize: '2.5rem', margin: '0 0 10px', color: '#fff', paddingRight: '50px' }}>
              {selectedProject.role}
            </h1>
            <h2 style={{ color: '#58a6ff', marginBottom: '30px' }}>
              @{selectedProject.company} | {selectedProject.period}
            </h2>

            <div style={{
              background: '#000', padding: '20px', borderRadius: '8px',
              fontFamily: 'monospace', marginBottom: '30px', border: '1px solid #30363d'
            }}>
              <p style={{ color: '#8b949e', margin: '0 0 10px' }}>// OPERATION DETAILS</p>
              <p style={{ color: '#fff', lineHeight: '1.8', margin: 0 }}>{selectedProject.fullDetails}</p>
            </div>

            <h3 style={{ margin: '0 0 15px' }}>Tech Stack Deployed:</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {selectedProject.tags.map(tag => (
                <span key={tag} style={{
                  background: '#238636', color: '#fff',
                  padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem'
                }}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{
              marginTop: '20px', borderTop: '1px dashed #30363d',
              paddingTop: '15px', fontSize: '0.8rem', color: '#3fb950'
            }}>
              System Access Level: Admin &gt;&gt; Encrypted Connection
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── VISTA PRINCIPAL ─────────────────────────────────────────────────────────
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      color: '#c9d1d9',
      overflowX: 'hidden',
      boxSizing: 'border-box'
    }}>

      {/* PARTÍCULAS */}
      {init && (
        <Particles
          id="tsparticles"
          options={particlesOptions}
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
        />
      )}

      {/* HERO */}
      <section style={{
        position: 'relative',
        zIndex: 10,
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px',
        boxSizing: 'border-box'
      }}>

        {/* FOTO — sin círculo, glow en silueta */}
        <ProfilePhoto imgError={imgError} setImgError={setImgError} />

        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          margin: '0',
          lineHeight: '1.1',
          fontWeight: 900,
          letterSpacing: '-2px',
          color: '#ffffff',
          textShadow: '0 0 20px rgba(0,0,0,0.5)'
        }}>
          LUIS CHIRINOS
        </h1>

        <h2 style={{
          fontSize: 'clamp(1rem, 3vw, 1.8rem)',
          margin: '15px 0 0',
          fontWeight: '400',
          letterSpacing: '2px',
          background: 'linear-gradient(to right, #58a6ff, #3fb950)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          display: 'inline-block'
        }}>
          FULL STACK & DEVSECOPS
        </h2>

        {/* TERMINAL */}
        {showTerminal && (
          <TerminalLog lines={typingLines} done={terminalDone} />
        )}

        {/* BOTÓN — desaparece al iniciar terminal */}
        {!showTerminal && (
          <button
            onClick={handleDecrypt}
            style={{
              marginTop: '40px', padding: '15px 40px', fontSize: '1.1rem',
              background: 'transparent', border: '2px solid #58a6ff', color: '#58a6ff',
              borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', letterSpacing: '1px',
              boxShadow: '0 0 15px rgba(88,166,255,0.2)', transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#58a6ff';
              e.target.style.color = '#0d1117';
              e.target.style.boxShadow = '0 0 30px rgba(88,166,255,0.6)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#58a6ff';
              e.target.style.boxShadow = '0 0 15px rgba(88,166,255,0.2)';
            }}
          >
            Ver Proyectos
          </button>
        )}
      </section>

      {/* GRID DE PROYECTOS */}
      {showProjects && (
        <section ref={projectsRef} style={{
          position: 'relative',
          zIndex: 10,
          padding: '80px 0',
          width: '100%',
          boxSizing: 'border-box',
          minHeight: '100vh'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 40px',
            boxSizing: 'border-box'
          }}>
            <h3 style={{
              borderBottom: '1px solid #30363d',
              paddingBottom: '20px',
              fontSize: '2rem',
              color: '#fff',
              margin: '0 0 40px'
            }}>
              <span style={{ color: '#3fb950' }}>./</span> DECLASSIFIED_FILES
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
              alignItems: 'stretch'
            }}>
              {EXPERIENCE.map((exp, index) => (
                <div
                  key={exp.id}
                  className="project-card"
                  onClick={() => setSelectedProject(exp)}
                  style={{
                    animation: `slideUp 0.6s ease forwards ${index * 0.2}s`,
                    opacity: 0,
                    transform: 'translateY(50px)',
                    background: 'rgba(13, 17, 23, 0.8)',
                    padding: '25px',
                    borderRadius: '8px',
                    border: '1px solid #30363d',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = '#58a6ff';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = '#30363d';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* HEADER */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                    <div style={{ background: '#30363d', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem' }}>CONFIDENTIAL</div>
                    <div style={{ color: '#8b949e' }}><LockIcon /></div>
                  </div>

                  {/* CUERPO — flex:1 empuja el footer al fondo */}
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '1.4rem', color: '#fff', margin: '0 0 5px' }}>{exp.role}</h4>
                    <p style={{ color: '#58a6ff', fontSize: '0.9rem', marginBottom: '15px' }}>@{exp.company}</p>
                    <p style={{ fontSize: '0.9rem', color: '#8b949e', lineHeight: '1.5', margin: 0 }}>{exp.desc}</p>
                  </div>

                  {/* FOOTER — siempre al fondo */}
                  <div style={{
                    marginTop: '20px',
                    borderTop: '1px dashed #30363d',
                    paddingTop: '15px',
                    fontSize: '0.8rem',
                    color: '#3fb950'
                  }}>
                    Click to decrypt details &gt;&gt;
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}