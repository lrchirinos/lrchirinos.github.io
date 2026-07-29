import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/* ══════════════════════════════════════════════════════════════════════════════
   MOCK DATA
   ══════════════════════════════════════════════════════════════════════════════ */
const PROPRIETARY_PROJECTS = [
  {
    id: "buscador-sunat",
    title: "Buscador SUNAT",
    subtitle: "Obtener Facturas y detracciones automaticas",
    description: "Herramienta automatizada para realizar consultas de facturas y detracciones de la página sunat de forma masiva y eficiente, utilizando técnicas de web scraping.",
    youtubeId: "upc8rZCJ-7s",
    image: "/buscador_sunat.png",
    obtainUrl: "https://api.whatsapp.com/send?phone=51934654283&text=Quiero%20obtener%20el%20software%20Sunat",
    gallery: [
      { src: "/sunat/login.png", label: "Login" },
      { src: "/sunat/Buscar Facturas.PNG", label: "Buscar Facturas" },
      { src: "/sunat/filtrar por fecha.PNG", label: "Filtrar por Fecha" },
      { src: "/sunat/Buscar detracciones.PNG", label: "Buscar Detracciones" },
      { src: "/sunat/configuracion.PNG", label: "Configuración" },
      { src: "/sunat/metodo de consulta de detracciones.PNG", label: "Método de Consulta de Detracciones" },
    ],
    stats: [
      { label: "Lenguaje Core", value: "Python" },
      { label: "Interfaz Gráfica", value: "Flet" },
      { label: "Técnica", value: "Web Scraping" },
      { label: "Automatización", value: "Selenium WebDriver" },
    ],
  },
  {
    id: "tesellmu",
    title: "TESELLMU",
    subtitle: "Obtener todas tus compras en excel",
    description: "Herramienta automatizada que te ayuda a pasar todas tus compras de temu a excel, esto te ahorra tiempo para que no tengas que copiar miles de pedidos a un excel, el software lo hace de manera automatica y rapida.",
    youtubeId: "gLMvewyLpS0",
    image: "/tesellmu_app.png",
    obtainUrl: "https://api.whatsapp.com/send?phone=51934654283&text=Quiero%20obtener%20el%20software%20tesellmu",
    gallery: [
      { src: "/temu/PANTALLA PRINCIPAL PARA BUSCAR.PNG", label: "Pantalla Principal para Buscar" },
      { src: "/temu/CREAR PERFIL.PNG", label: "Crear Perfil" },
      { src: "/temu/BUSCAR POR RANGO DE FECHA.PNG", label: "Buscar por Rango de Fecha" },
    ],
    stats: [
      { label: "Lenguaje Core", value: "Python" },
      { label: "Interfaz Gráfica", value: "PySide6" },
      { label: "Técnica", value: "Web Scraping" },
      { label: "Automatización", value: "Selenium WebDriver" },
    ],
  },
  {
    id: "notas",
    title: "Notas",
    subtitle: "Aplicación de Notas — Código Abierto",
    description: "Aplicación web de notas con soporte para modo claro y oscuro, autenticación de usuarios y almacenamiento persistente. Proyecto de código abierto disponible en GitHub.",
    youtubeId: null,
    image: "/notas_app.png",
    obtainUrl: "https://github.com/lrchirinos/note-app",
    gallery: [
      { src: "/notas/login.PNG", label: "Login" },
      { src: "/notas/app-light.PNG", label: "Light Mode" },
      { src: "/notas/app-dark.PNG", label: "Dark Mode" },
    ],
    stats: [
      { label: "Frontend", value: "Angular" },
      { label: "Almacenamiento", value: "PostgreSQL" },
      { label: "Categoría", value: "Open Source" },
      { label: "Licencia", value: "MIT" },
    ],
  },
];

/* ══════════════════════════════════════════════════════════════════════════════
   SVG ICONS
   ══════════════════════════════════════════════════════════════════════════════ */
const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

/* ══════════════════════════════════════════════════════════════════════════════
   TECH CORNER OVERLAY — decorative bracket corners on the Data Card
   ══════════════════════════════════════════════════════════════════════════════ */
function TechCorners({ hovered }) {
  const s = hovered ? 28 : 14;
  const t = 2;
  const c1 = hovered ? '#58a6ff' : '#30363d';
  const c2 = hovered ? '#3fb950' : '#30363d';
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
      transition: 'all 0.4s ease',
      background: [
        `linear-gradient(${c1}, ${c1}) 0 0 / ${s}px ${t}px no-repeat`,
        `linear-gradient(${c1}, ${c1}) 0 0 / ${t}px ${s}px no-repeat`,
        `linear-gradient(${c2}, ${c2}) 100% 0 / ${s}px ${t}px no-repeat`,
        `linear-gradient(${c2}, ${c2}) 100% 0 / ${t}px ${s}px no-repeat`,
        `linear-gradient(${c2}, ${c2}) 0 100% / ${s}px ${t}px no-repeat`,
        `linear-gradient(${c2}, ${c2}) 0 100% / ${t}px ${s}px no-repeat`,
        `linear-gradient(${c1}, ${c1}) 100% 100% / ${s}px ${t}px no-repeat`,
        `linear-gradient(${c1}, ${c1}) 100% 100% / ${t}px ${s}px no-repeat`,
      ].join(', '),
      filter: hovered ? 'drop-shadow(0 0 6px rgba(88,166,255,0.5))' : 'none',
    }} />
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   NOT FOUND VIEW
   ══════════════════════════════════════════════════════════════════════════════ */
function NotFoundView() {
  const [hov, setHov] = useState(false);
  return (
    <div style={{
      minHeight: '100vh', background: '#0d1117', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      color: '#c9d1d9', fontFamily: "'Courier New', monospace", padding: '40px 20px',
      boxSizing: 'border-box',
    }}>
      <div style={{
        fontSize: '5rem', fontWeight: 900, color: '#ff7b72',
        textShadow: '0 0 40px rgba(255,123,114,0.3)', marginBottom: '10px',
        letterSpacing: '-2px',
      }}>404</div>
      <p style={{
        color: '#8b949e', fontSize: '1rem', letterSpacing: '2px',
        textTransform: 'uppercase', marginBottom: '40px',
      }}>
        {'>'} Proyecto no encontrado en la base de datos
      </p>
      <Link
        to="/projects"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          color: hov ? '#0d1117' : '#58a6ff',
          background: hov ? '#58a6ff' : 'transparent',
          border: '1px solid #58a6ff', padding: '12px 28px',
          fontFamily: "'Courier New', monospace", fontSize: '0.85rem',
          letterSpacing: '1.5px', textDecoration: 'none', borderRadius: '4px',
          transition: 'all 0.3s ease',
          boxShadow: hov ? '0 0 20px rgba(88,166,255,0.4)' : 'none',
        }}
      >
        <ArrowLeftIcon /> VER PROYECTOS
      </Link>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   PRODUCT DETAIL PAGE
   ══════════════════════════════════════════════════════════════════════════════ */
export default function ProductDetail() {
  const { id } = useParams();
  const project = PROPRIETARY_PROJECTS.find((p) => p.id === id);
  const [isMobile, setIsMobile] = useState(false);
  const [backHov, setBackHov] = useState(false);
  const [cardHov, setCardHov] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [playHov, setPlayHov] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const touchStartX = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ── 404 ── */
  if (!project) return <NotFoundView />;

  const hasVideo = project.youtubeId;
  const youtubeUrl = hasVideo
    ? `https://www.youtube.com/embed/${project.youtubeId}?rel=0&modestbranding=1&controls=1`
    : null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          minHeight: '100vh',
          background: '#0d1117',
          color: '#c9d1d9',
          overflowX: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        {/* ─────────────────────────────────────────────────────────────────────
            BOTÓN CROSS-SELLING — Arriba izquierda
            ───────────────────────────────────────────────────────────────────── */}
        <div style={{
          padding: isMobile ? '20px 16px' : '28px 40px',
        }}>
          <Link
            to="/projects"
            onMouseEnter={() => setBackHov(true)}
            onMouseLeave={() => setBackHov(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: backHov ? '#58a6ff' : '#8b949e',
              fontFamily: "'Courier New', monospace",
              fontSize: '0.8rem',
              letterSpacing: '1.5px',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'all 0.3s ease',
              textShadow: backHov ? '0 0 12px rgba(88,166,255,0.4)' : 'none',
            }}
          >
            <ArrowLeftIcon /> VER MÁS PROYECTOS
          </Link>
        </div>

        {/* ─────────────────────────────────────────────────────────────────────
            HERO VIDEO — YouTube Autoplay (16:9) — Solo si el proyecto tiene video
            ───────────────────────────────────────────────────────────────────── */}
        {hasVideo && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              width: isMobile ? '95%' : '85%',
              maxWidth: '1100px',
              margin: '0 auto 50px',
            }}
          >
            {/* Marco decorativo alrededor del video */}
            <div style={{
              position: 'relative',
              border: '1px solid #21262d',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 40px rgba(0,0,0,0.5), 0 0 80px rgba(88,166,255,0.06)',
            }}>
              {/* Barra superior tipo terminal */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                background: 'rgba(22,27,34,0.95)',
                borderBottom: '1px solid #21262d',
              }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff7b72' }} />
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#d29922' }} />
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#3fb950' }} />
                <span style={{
                  marginLeft: '12px',
                  fontFamily: "'Courier New', monospace",
                  fontSize: '0.7rem',
                  color: '#484f58',
                  letterSpacing: '1px',
                }}>
                  SOFTWARE // {project.title}
                </span>
              </div>

              {/* Contenedor responsivo 16:9 */}
              <div style={{
                position: 'relative',
                paddingBottom: '56.25%',
                height: 0,
                overflow: 'hidden',
                background: '#000',
              }}>
                {videoPlaying ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&rel=0&modestbranding=1&controls=1`}
                    title={`${project.title} — Demo`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none',
                    }}
                  />
                ) : (
                  <div
                    onClick={() => setVideoPlaying(true)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      cursor: 'pointer',
                    }}
                  >
                    {/* YouTube thumbnail */}
                    <img
                      src={`https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`}
                      alt={`${project.title} preview`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: playHov ? 'brightness(0.6)' : 'brightness(0.45)',
                        transition: 'filter 0.4s ease',
                      }}
                    />

                    {/* Custom play button */}
                    <div
                      onMouseEnter={() => setPlayHov(true)}
                      onMouseLeave={() => setPlayHov(false)}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: playHov
                          ? 'translate(-50%, -50%) scale(1.12)'
                          : 'translate(-50%, -50%) scale(1)',
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: playHov
                          ? 'rgba(88, 166, 255, 0.95)'
                          : 'rgba(88, 166, 255, 0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)',
                        boxShadow: playHov
                          ? '0 0 40px rgba(88, 166, 255, 0.7), 0 0 80px rgba(88, 166, 255, 0.3), inset 0 0 20px rgba(255,255,255,0.15)'
                          : '0 0 25px rgba(88, 166, 255, 0.4), 0 0 50px rgba(88, 166, 255, 0.15)',
                        border: '2px solid rgba(255,255,255,0.25)',
                      }}
                    >
                      {/* Play triangle */}
                      <svg width="30" height="34" viewBox="0 0 30 34" fill="none">
                        <path
                          d="M28 17L2 32V2L28 17Z"
                          fill="#fff"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    {/* Pulsing ring animation */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      border: '2px solid rgba(88, 166, 255, 0.4)',
                      animation: 'playPulse 2s ease-out infinite',
                      pointerEvents: 'none',
                    }} />

                    {/* Label */}
                    <span style={{
                      position: 'absolute',
                      bottom: isMobile ? '12px' : '20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontFamily: "'Courier New', monospace",
                      fontSize: '0.72rem',
                      color: 'rgba(255,255,255,0.6)',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      pointerEvents: 'none',
                      textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                    }}>
                      ▶ Reproducir video
                    </span>

                    <style>{`
                      @keyframes playPulse {
                        0%   { width: 80px; height: 80px; opacity: 0.6; }
                        100% { width: 140px; height: 140px; opacity: 0; }
                      }
                    `}</style>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            SEPARADOR — entre Video y Ficha Técnica
            ═══════════════════════════════════════════════════════════════════ */}
        {hasVideo && (
          <div style={{
            width: isMobile ? '95%' : '85%',
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 0 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}>
            <div style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #30363d 30%, #58a6ff 100%)',
            }} />
            <div style={{
              width: '6px',
              height: '6px',
              background: '#58a6ff',
              borderRadius: '50%',
              boxShadow: '0 0 8px rgba(88, 166, 255, 0.6)',
            }} />
            <div style={{
              width: '8px',
              height: '8px',
              transform: 'rotate(45deg)',
              background: '#3fb950',
              boxShadow: '0 0 10px rgba(63, 185, 80, 0.6)',
            }} />
            <div style={{
              width: '6px',
              height: '6px',
              background: '#58a6ff',
              borderRadius: '50%',
              boxShadow: '0 0 8px rgba(88, 166, 255, 0.6)',
            }} />
            <div style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(90deg, #58a6ff 0%, #30363d 70%, transparent)',
            }} />
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────────────
            HERO SPLIT LAYOUT — Imagen + Descripción
            ───────────────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            width: isMobile ? '95%' : '85%',
            maxWidth: '1100px',
            margin: '0 auto',
            paddingBottom: '20px',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '20px' : '40px',
            alignItems: isMobile ? 'center' : 'stretch',
          }}
        >
          {/* ── Columna Izquierda: Imagen ── */}
          <div style={{
            flex: isMobile ? 'unset' : '0 0 40%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: isMobile ? '180px' : '280px',
            background: 'rgba(13,17,23,0.6)',
            border: '1px solid #21262d',
            borderRadius: '8px',
            overflow: 'hidden',
            position: 'relative',
            width: isMobile ? '100%' : 'auto',
          }}>
            {/* Subtle scanline effect */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(88,166,255,0.015) 2px, rgba(88,166,255,0.015) 4px)',
              pointerEvents: 'none', zIndex: 1,
            }} />
            <motion.img
              layoutId={`img-${project.id}`}
              src={project.image}
              alt={project.title}
              style={{
                width: isMobile ? '55%' : '65%',
                maxHeight: isMobile ? '160px' : '240px',
                objectFit: 'contain',
                objectPosition: 'center',
                position: 'relative',
                zIndex: 2,
                filter: 'drop-shadow(0 0 20px rgba(88,166,255,0.15))',
              }}
            />
          </div>

          {/* ── Columna Derecha: Descripción ── */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '20px',
          }}>
            {/* Título */}
            <div>
              <h1 style={{
                margin: '0 0 8px',
                fontSize: isMobile ? '1.6rem' : '2.4rem',
                fontFamily: "'Courier New', monospace",
                color: '#fff',
                letterSpacing: '2px',
                fontWeight: 800,
                textShadow: '0 0 20px rgba(255,255,255,0.08)',
              }}>
                {project.title}
              </h1>
              <p style={{
                margin: 0,
                fontSize: isMobile ? '0.85rem' : '1.05rem',
                fontFamily: "'Courier New', monospace",
                color: '#3fb950',
                letterSpacing: '1.5px',
                textShadow: '0 0 12px rgba(63,185,80,0.3)',
              }}>
                {'>'} {project.subtitle}
              </p>
            </div>

            {/* Descripción del proyecto */}
            <div style={{
              background: 'rgba(13,17,23,0.75)',
              border: '1px solid #21262d',
              borderLeft: '3px solid #3fb950',
              borderRadius: '8px',
              padding: isMobile ? '16px' : '24px',
            }}>
              <p style={{
                margin: 0,
                fontSize: isMobile ? '0.85rem' : '0.95rem',
                fontFamily: "'Courier New', monospace",
                color: '#c9d1d9',
                lineHeight: '1.8',
                letterSpacing: '0.5px',
              }}>
                {project.description}
              </p>
            </div>

            {/* Línea decorativa inferior */}
            <div style={{
              height: '2px',
              background: 'linear-gradient(90deg, #58a6ff, #3fb950, transparent)',
              opacity: 0.4,
              borderRadius: '1px',
            }} />
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════════
            SEPARADOR — entre Ficha Técnica y Galería
            ═══════════════════════════════════════════════════════════════════ */}
        <div style={{
          width: isMobile ? '95%' : '85%',
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '20px 0',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
        }}>
          <div style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #30363d 30%, #58a6ff 100%)',
          }} />
          <div style={{
            width: '6px',
            height: '6px',
            background: '#58a6ff',
            borderRadius: '50%',
            boxShadow: '0 0 8px rgba(88, 166, 255, 0.6)',
          }} />
          <div style={{
            width: '8px',
            height: '8px',
            transform: 'rotate(45deg)',
            background: '#3fb950',
            boxShadow: '0 0 10px rgba(63, 185, 80, 0.6)',
          }} />
          <div style={{
            width: '6px',
            height: '6px',
            background: '#58a6ff',
            borderRadius: '50%',
            boxShadow: '0 0 8px rgba(88, 166, 255, 0.6)',
          }} />
          <div style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(90deg, #58a6ff 0%, #30363d 70%, transparent)',
          }} />
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            GALERÍA
            ═══════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            width: isMobile ? '95%' : '85%',
            maxWidth: '1100px',
            margin: '0 auto',
            paddingBottom: '20px',
          }}
        >
          {/* Subtítulo Galería */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '24px',
          }}>
            <span style={{
              color: '#3fb950',
              fontFamily: "'Courier New', monospace",
              fontSize: '0.85rem',
              opacity: 0.7,
            }}>{'>'}</span>
            <h2 style={{
              margin: 0,
              fontSize: isMobile ? '1.3rem' : '1.6rem',
              fontFamily: "'Courier New', monospace",
              color: '#fff',
              letterSpacing: '2px',
              fontWeight: 700,
              textShadow: '0 0 15px rgba(88, 166, 255, 0.2)',
            }}>
              Galería
            </h2>
            <div style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(90deg, #30363d 0%, transparent 100%)',
              marginLeft: '12px',
            }} />
          </div>

          {/* Grid de galería */}
          {project.gallery && project.gallery.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: isMobile ? '10px' : '16px',
            }}>
              {project.gallery.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    border: '1px solid #21262d',
                    cursor: 'pointer',
                    aspectRatio: '16 / 10',
                    background: '#0d1117',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#58a6ff';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(88,166,255,0.15)';
                    e.currentTarget.querySelector('img').style.transform = 'scale(1.05)';
                    e.currentTarget.querySelector('img').style.filter = 'brightness(1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#21262d';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                    e.currentTarget.querySelector('img').style.filter = 'brightness(0.8)';
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      filter: 'brightness(0.8)',
                      transition: 'all 0.4s ease',
                    }}
                  />
                  {/* Label overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '8px 12px',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                    pointerEvents: 'none',
                  }}>
                    <span style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: '0.68rem',
                      color: 'rgba(255,255,255,0.7)',
                      letterSpacing: '1px',
                    }}>
                      {img.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              minHeight: '200px',
              border: '1px dashed #21262d',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(13, 17, 23, 0.4)',
            }}>
              <span style={{
                fontFamily: "'Courier New', monospace",
                fontSize: '0.8rem',
                color: '#484f58',
                letterSpacing: '1.5px',
              }}>
                {'// Galería de imágenes — próximamente'}
              </span>
            </div>
          )}
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════════
            SEPARADOR — entre Galería y Descripción
            ═══════════════════════════════════════════════════════════════════ */}
        <div style={{
          width: isMobile ? '95%' : '85%',
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '20px 0',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
        }}>
          <div style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #30363d 30%, #58a6ff 100%)',
          }} />
          <div style={{
            width: '6px',
            height: '6px',
            background: '#58a6ff',
            borderRadius: '50%',
            boxShadow: '0 0 8px rgba(88, 166, 255, 0.6)',
          }} />
          <div style={{
            width: '8px',
            height: '8px',
            transform: 'rotate(45deg)',
            background: '#3fb950',
            boxShadow: '0 0 10px rgba(63, 185, 80, 0.6)',
          }} />
          <div style={{
            width: '6px',
            height: '6px',
            background: '#58a6ff',
            borderRadius: '50%',
            boxShadow: '0 0 8px rgba(88, 166, 255, 0.6)',
          }} />
          <div style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(90deg, #58a6ff 0%, #30363d 70%, transparent)',
          }} />
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            FICHA TÉCNICA
            ═══════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{
            width: isMobile ? '95%' : '85%',
            maxWidth: '1100px',
            margin: '0 auto',
            paddingBottom: '100px',
          }}
        >
          {/* Subtítulo Ficha Técnica */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '24px',
          }}>
            <span style={{
              color: '#3fb950',
              fontFamily: "'Courier New', monospace",
              fontSize: '0.85rem',
              opacity: 0.7,
            }}>{'>'}</span>
            <h2 style={{
              margin: 0,
              fontSize: isMobile ? '1.3rem' : '1.6rem',
              fontFamily: "'Courier New', monospace",
              color: '#fff',
              letterSpacing: '2px',
              fontWeight: 700,
              textShadow: '0 0 15px rgba(88, 166, 255, 0.2)',
            }}>
              Ficha Técnica
            </h2>
            <div style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(90deg, #30363d 0%, transparent 100%)',
              marginLeft: '12px',
            }} />
          </div>

          {/* Data Card */}
          <div
            onMouseEnter={() => setCardHov(true)}
            onMouseLeave={() => setCardHov(false)}
            style={{
              position: 'relative',
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid #21262d',
              borderRadius: '8px',
              padding: isMobile ? '20px' : '28px',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              borderColor: cardHov ? '#30363d' : '#21262d',
              boxShadow: cardHov
                ? '0 0 30px rgba(88,166,255,0.08), inset 0 0 30px rgba(88,166,255,0.02)'
                : 'none',
            }}
          >
            <TechCorners hovered={cardHov} />

            {/* Header del Data Card */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px',
              paddingBottom: '12px',
              borderBottom: '1px solid #21262d',
            }}>
              <span style={{
                color: '#58a6ff',
                fontSize: '0.75rem',
                fontFamily: "'Courier New', monospace",
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}>
                ⚙ Ficha Técnica
              </span>
            </div>

            {/* Grid de Stats 2x2 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '16px' : '20px',
            }}>
              {project.stats.map((stat) => (
                <div key={stat.label}>
                  <p style={{
                    margin: '0 0 4px',
                    fontSize: '0.7rem',
                    fontFamily: "'Courier New', monospace",
                    color: '#8b949e',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                  }}>
                    {stat.label}
                  </p>
                  <p style={{
                    margin: 0,
                    fontSize: '0.95rem',
                    fontFamily: "'Courier New', monospace",
                    color: '#fff',
                    fontWeight: 600,
                  }}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════════════
          BOTÓN FLOTANTE — "Obtener" siempre visible
          ═══════════════════════════════════════════════════════════════════════ */}
      {isMobile ? (
        /* ── MÓVIL: barra completa fija abajo ── */
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '12px 16px',
          paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))',
          background: 'rgba(13, 17, 23, 0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(63, 185, 80, 0.2)',
          boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.5), 0 -2px 20px rgba(63, 185, 80, 0.08)',
        }}>
          <button
            onClick={() => project.obtainUrl && window.open(project.obtainUrl, '_blank')}
            style={{
              width: '100%',
              padding: '14px 0',
              background: 'linear-gradient(135deg, #238636 0%, #2ea043 50%, #3fb950 100%)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              fontFamily: "'Courier New', monospace",
              fontSize: '1rem',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(63, 185, 80, 0.35), 0 4px 15px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Obtener
          </button>
        </div>
      ) : (
        /* ── DESKTOP: botón flotante esquina inferior derecha ── */
        <button
          onClick={() => project.obtainUrl && window.open(project.obtainUrl, '_blank')}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.06)';
            e.currentTarget.style.boxShadow = '0 0 35px rgba(63, 185, 80, 0.5), 0 0 60px rgba(63, 185, 80, 0.2), 0 8px 25px rgba(0, 0, 0, 0.4)';
            e.currentTarget.style.background = 'linear-gradient(135deg, #2ea043 0%, #3fb950 50%, #56d364 100%)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 0 25px rgba(63, 185, 80, 0.35), 0 0 50px rgba(63, 185, 80, 0.1), 0 6px 20px rgba(0, 0, 0, 0.35)';
            e.currentTarget.style.background = 'linear-gradient(135deg, #238636 0%, #2ea043 50%, #3fb950 100%)';
          }}
          style={{
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            zIndex: 100,
            padding: '16px 36px',
            background: 'linear-gradient(135deg, #238636 0%, #2ea043 50%, #3fb950 100%)',
            border: '1px solid rgba(63, 185, 80, 0.3)',
            borderRadius: '50px',
            color: '#fff',
            fontFamily: "'Courier New', monospace",
            fontSize: '0.95rem',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            boxShadow: '0 0 25px rgba(63, 185, 80, 0.35), 0 0 50px rgba(63, 185, 80, 0.1), 0 6px 20px rgba(0, 0, 0, 0.35)',
            transition: 'all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            animation: 'floatBtn 3s ease-in-out infinite',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Obtener
        </button>
      )}

      {/* Animación de flotación para desktop */}
      <style>{`
        @keyframes floatBtn {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════════════
          LIGHTBOX — Visor de galería a pantalla completa
          ═══════════════════════════════════════════════════════════════════════ */}
      {lightboxIndex !== null && project.gallery && project.gallery.length > 0 && (() => {
        const gallery = project.gallery;
        const currentImg = gallery[lightboxIndex];
        const hasPrev = lightboxIndex > 0;
        const hasNext = lightboxIndex < gallery.length - 1;

        const goPrev = (e) => { e.stopPropagation(); if (hasPrev) setLightboxIndex(lightboxIndex - 1); };
        const goNext = (e) => { e.stopPropagation(); if (hasNext) setLightboxIndex(lightboxIndex + 1); };

        // Keyboard handler
        const handleKey = (e) => {
          if (e.key === 'ArrowLeft' && hasPrev) setLightboxIndex(lightboxIndex - 1);
          if (e.key === 'ArrowRight' && hasNext) setLightboxIndex(lightboxIndex + 1);
          if (e.key === 'Escape') setLightboxIndex(null);
        };

        return (
          <div
            tabIndex={0}
            ref={(el) => el && el.focus()}
            onKeyDown={handleKey}
            onClick={() => setLightboxIndex(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              background: 'rgba(0, 0, 0, 0.92)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'fadeIn 0.25s ease',
              outline: 'none',
            }}
          >
            {/* Close button */}
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
              style={{
                position: 'absolute',
                top: isMobile ? '12px' : '20px',
                right: isMobile ? '12px' : '20px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#c9d1d9',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'monospace',
                transition: 'all 0.2s',
                zIndex: 1001,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,123,114,0.2)'; e.currentTarget.style.borderColor = '#ff7b72'; e.currentTarget.style.color = '#ff7b72'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#c9d1d9'; }}
            >✕</button>

            {/* Image counter */}
            <div style={{
              position: 'absolute',
              top: isMobile ? '16px' : '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: "'Courier New', monospace",
              fontSize: '0.75rem',
              color: '#8b949e',
              letterSpacing: '2px',
              zIndex: 1001,
            }}>
              {lightboxIndex + 1} / {gallery.length}
            </div>

            {/* Image label */}
            <div style={{
              position: 'absolute',
              bottom: isMobile ? '20px' : '30px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: "'Courier New', monospace",
              fontSize: '0.8rem',
              color: '#c9d1d9',
              letterSpacing: '1.5px',
              zIndex: 1001,
              textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            }}>
              {currentImg.label}
            </div>

            {/* Previous button (desktop) */}
            {!isMobile && hasPrev && (
              <button
                onClick={goPrev}
                style={{
                  position: 'absolute',
                  left: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#c9d1d9',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.25s',
                  zIndex: 1001,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(88,166,255,0.15)'; e.currentTarget.style.borderColor = '#58a6ff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}

            {/* Next button (desktop) */}
            {!isMobile && hasNext && (
              <button
                onClick={goNext}
                style={{
                  position: 'absolute',
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#c9d1d9',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.25s',
                  zIndex: 1001,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(88,166,255,0.15)'; e.currentTarget.style.borderColor = '#58a6ff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}

            {/* Main image (click stops propagation, swipe on mobile) */}
            <img
              src={currentImg.src}
              alt={currentImg.label}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                if (touchStartX.current === null) return;
                const diff = e.changedTouches[0].clientX - touchStartX.current;
                if (Math.abs(diff) > 50) {
                  if (diff < 0 && hasNext) setLightboxIndex(lightboxIndex + 1);
                  if (diff > 0 && hasPrev) setLightboxIndex(lightboxIndex - 1);
                }
                touchStartX.current = null;
              }}
              style={{
                maxWidth: isMobile ? '95%' : '80%',
                maxHeight: isMobile ? '75vh' : '80vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 0 60px rgba(0,0,0,0.6)',
                animation: 'fadeIn 0.2s ease',
                userSelect: 'none',
              }}
            />
          </div>
        );
      })()}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

    </AnimatePresence>
  );
}
