import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const projects = [
  {
    id: 1,
    slug: 'buscador-sunat',
    name: 'Buscador Sunat',
    image: '/buscador_sunat.png',
    category: 'compra',
    badge: 'Compra Disponible',
    badgeColor: '#3fb950',
  },
  {
    id: 2,
    slug: 'tesellmu',
    name: 'Tesellmu',
    image: '/tesellmu_app.png',
    category: 'compra',
    badge: 'Compra Disponible',
    badgeColor: '#3fb950',
  },
  {
    id: 3,
    slug: 'notas',
    name: 'Notas',
    image: '/notas_app.png',
    category: 'opensource',
    badge: 'Código Abierto',
    badgeColor: '#58a6ff',
  },
];

/* ── Componente de tarjeta individual ── */
function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/${project.slug}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 0,
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
        minHeight: '280px',
        boxShadow: isHovered
          ? '0 0 25px rgba(88, 166, 255, 0.4), 0 0 50px rgba(88, 166, 255, 0.15)'
          : '0 4px 20px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* ── z-index: 0 — Imagen como fondo real ── */}
      <img
        src={project.image}
        alt={project.name}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'center',
          padding: '30px',
          boxSizing: 'border-box',
          zIndex: 0,
          transition: 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), filter 0.5s ease',
          transform: isHovered ? 'scale(1.08)' : 'scale(1)',
          filter: isHovered
            ? 'brightness(1.1) contrast(1.05)'
            : 'brightness(0.7) grayscale(20%)',
        }}
      />

      {/* ── z-index: 1 — Capa de gradiente oscuro ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: isHovered
          ? 'linear-gradient(180deg, rgba(13,17,23,0.3) 0%, rgba(13,17,23,0.6) 50%, rgba(13,17,23,0.92) 100%)'
          : 'linear-gradient(180deg, rgba(13,17,23,0.4) 0%, rgba(13,17,23,0.7) 50%, rgba(13,17,23,0.95) 100%)',
        transition: 'background 0.4s ease',
        pointerEvents: 'none',
      }} />

      {/* ── z-index: 2 — Esquinas tech (un solo overlay con gradientes) ── */}
      {(() => {
        const s = isHovered ? 32 : 16; // tamaño de la esquina
        const t = 2; // grosor de la línea
        const tlColor = isHovered ? '#58a6ff' : '#30363d';
        const trColor = isHovered ? '#3fb950' : '#30363d';
        const blColor = isHovered ? '#3fb950' : '#30363d';
        const brColor = isHovered ? '#58a6ff' : '#30363d';
        return (
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            pointerEvents: 'none',
            transition: 'all 0.4s ease',
            background: [
              /* Top-left: horizontal */
              `linear-gradient(${tlColor}, ${tlColor}) 0 0 / ${s}px ${t}px no-repeat`,
              /* Top-left: vertical */
              `linear-gradient(${tlColor}, ${tlColor}) 0 0 / ${t}px ${s}px no-repeat`,
              /* Top-right: horizontal */
              `linear-gradient(${trColor}, ${trColor}) 100% 0 / ${s}px ${t}px no-repeat`,
              /* Top-right: vertical */
              `linear-gradient(${trColor}, ${trColor}) 100% 0 / ${t}px ${s}px no-repeat`,
              /* Bottom-left: horizontal */
              `linear-gradient(${blColor}, ${blColor}) 0 100% / ${s}px ${t}px no-repeat`,
              /* Bottom-left: vertical */
              `linear-gradient(${blColor}, ${blColor}) 0 100% / ${t}px ${s}px no-repeat`,
              /* Bottom-right: horizontal */
              `linear-gradient(${brColor}, ${brColor}) 100% 100% / ${s}px ${t}px no-repeat`,
              /* Bottom-right: vertical */
              `linear-gradient(${brColor}, ${brColor}) 100% 100% / ${t}px ${s}px no-repeat`,
            ].join(', '),
            filter: isHovered ? 'drop-shadow(0 0 6px rgba(88, 166, 255, 0.5))' : 'none',
          }} />
        );
      })()}

      {/* ── z-index: 3 — Contenido (badge + nombre) ── */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '280px',
        boxSizing: 'border-box',
      }}>

        {/* ── Badge de categoría (arriba derecha) ── */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          <span style={{
            fontSize: '0.7rem',
            fontFamily: "'Courier New', monospace",
            color: project.badgeColor,
            border: `1px solid ${project.badgeColor}55`,
            background: `${project.badgeColor}20`,
            backdropFilter: 'blur(6px)',
            padding: '3px 10px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            borderRadius: '2px',
            boxShadow: `0 0 8px ${project.badgeColor}30`,
          }}>
            {project.badge}
          </span>
        </div>

        {/* ── Spacer ── */}
        <div style={{ flex: 1 }} />

        {/* ── Nombre del proyecto (abajo) ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span style={{
            color: '#3fb950',
            fontFamily: "'Courier New', monospace",
            fontSize: '0.8rem',
            opacity: 0.6,
          }}>{'>'}</span>
          <h3 style={{
            margin: 0,
            fontSize: '1.1rem',
            fontFamily: "'Courier New', monospace",
            color: '#fff',
            letterSpacing: '1.5px',
            transition: 'text-shadow 0.3s ease',
            textShadow: isHovered ? '0 0 12px rgba(88, 166, 255, 0.5)' : '0 1px 4px rgba(0,0,0,0.8)',
          }}>
            {project.name}
          </h3>
        </div>
      </div>
    </div>
  );
}

/* ── Componente principal ── */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'todos') return true;
    return p.category === activeFilter;
  });

  const filters = [
    { key: 'todos', label: 'Todos' },
    { key: 'compra', label: 'Compra Disponible' },
    { key: 'opensource', label: 'Open Source' },
  ];

  return (
    <div style={{
      position: 'relative', width: '100%', minHeight: '100vh', color: '#c9d1d9', overflowX: 'hidden', boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', background: '#0d1117',
      paddingTop: '80px'
    }}>

      {/* ── Header con marco tecnológico ── */}
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 'fit-content',
        maxWidth: '90%',
      }}>

        {/* ── Marco superior decorativo ── */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '3px',
          marginBottom: '18px',
        }}>
          {/* Línea gradiente principal */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '10%',
            right: '10%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #58a6ff 20%, #3fb950 50%, #58a6ff 80%, transparent)',
            boxShadow: '0 0 12px rgba(88, 166, 255, 0.5), 0 0 30px rgba(63, 185, 80, 0.2)',
          }} />
          {/* Esquina izquierda */}
          <div style={{
            position: 'absolute',
            top: '-4px',
            left: '8%',
            width: '12px',
            height: '12px',
            borderTop: '2px solid #58a6ff',
            borderLeft: '2px solid #58a6ff',
            boxShadow: '-2px -2px 8px rgba(88, 166, 255, 0.4)',
          }} />
          {/* Esquina derecha */}
          <div style={{
            position: 'absolute',
            top: '-4px',
            right: '8%',
            width: '12px',
            height: '12px',
            borderTop: '2px solid #3fb950',
            borderRight: '2px solid #3fb950',
            boxShadow: '2px -2px 8px rgba(63, 185, 80, 0.4)',
          }} />
          {/* Diamante central */}
          <div style={{
            position: 'absolute',
            top: '-4px',
            left: '50%',
            transform: 'translateX(-50%) rotate(45deg)',
            width: '8px',
            height: '8px',
            background: '#58a6ff',
            boxShadow: '0 0 10px rgba(88, 166, 255, 0.8), 0 0 20px rgba(88, 166, 255, 0.4)',
          }} />
        </div>

        {/* ── Contenedor del título con scanlines ── */}
        <div style={{
          position: 'relative',
          padding: '12px 50px',
          overflow: 'hidden',
        }}>
          {/* Efecto scanline sutil */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(88, 166, 255, 0.03) 2px, rgba(88, 166, 255, 0.03) 4px)',
            pointerEvents: 'none',
          }} />

          {/* Prefijo terminal */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}>
            <span style={{
              fontSize: '0.85rem',
              color: '#3fb950',
              fontFamily: "'Courier New', monospace",
              opacity: 0.7,
              letterSpacing: '2px',
            }}>{'>'}_</span>

            <h1 style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              color: '#fff',
              fontFamily: "'Courier New', monospace",
              margin: 0,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              textShadow: '0 0 20px rgba(88, 166, 255, 0.3), 0 0 40px rgba(88, 166, 255, 0.1)',
              fontWeight: 700,
            }}>
              Proyectos Personales
            </h1>

            <span style={{
              fontSize: '0.85rem',
              color: '#58a6ff',
              fontFamily: "'Courier New', monospace",
              opacity: 0.7,
              letterSpacing: '2px',
            }}>_{'<'}</span>
          </div>
        </div>

        {/* ── Líneas decorativas inferiores del marco ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginTop: '8px',
          width: '70%',
          justifyContent: 'center',
        }}>
          <div style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #30363d)',
          }} />
          <div style={{
            width: '4px',
            height: '4px',
            background: '#58a6ff',
            borderRadius: '50%',
            boxShadow: '0 0 6px rgba(88, 166, 255, 0.6)',
          }} />
          <div style={{
            width: '6px',
            height: '6px',
            background: '#3fb950',
            borderRadius: '50%',
            boxShadow: '0 0 6px rgba(63, 185, 80, 0.6)',
          }} />
          <div style={{
            width: '4px',
            height: '4px',
            background: '#58a6ff',
            borderRadius: '50%',
            boxShadow: '0 0 6px rgba(88, 166, 255, 0.6)',
          }} />
          <div style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(90deg, #30363d, transparent)',
          }} />
        </div>

        {/* ── Descripción ── */}
        <p style={{
          marginTop: '20px',
          fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
          color: '#8b949e',
          fontFamily: "'Courier New', monospace",
          letterSpacing: '1.5px',
          textAlign: 'center',
          fontStyle: 'italic',
          margin: '20px 0 0 0',
        }}>
          <span style={{ color: '#58a6ff' }}></span>
          Colección de proyectos originales — disponibles para ti
          <span style={{ color: '#58a6ff' }}></span>
        </p>

      </div>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── Sección de Filtros + Tarjetas ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        width: isMobile ? '95%' : '90%',
        maxWidth: '1200px',
        marginTop: isMobile ? '40px' : '60px',
        gap: isMobile ? '20px' : '30px',
        alignItems: isMobile ? 'stretch' : 'flex-start',
        paddingBottom: '80px',
      }}>

        {/* ── Panel de filtros (izquierda) ── */}
        <div style={{
          width: isMobile ? '100%' : '180px',
          minWidth: isMobile ? 'unset' : '180px',
          background: 'rgba(13, 17, 23, 0.6)',
          border: '1px solid #21262d',
          borderRadius: '4px',
          padding: '0',
          position: isMobile ? 'relative' : 'sticky',
          top: isMobile ? 'unset' : '100px',
          backdropFilter: 'blur(8px)',
          display: isMobile ? 'flex' : 'block',
          flexWrap: isMobile ? 'wrap' : 'nowrap',
          alignItems: isMobile ? 'center' : 'stretch',
          overflow: 'hidden',
        }}>
          {/* Encabezado del filtro */}
          <div style={{
            padding: isMobile ? '10px 14px' : '14px 16px',
            borderBottom: isMobile ? 'none' : '1px solid #21262d',
            borderRight: isMobile ? '1px solid #21262d' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{
              color: '#58a6ff',
              fontSize: '0.9rem',
            }}>⚙</span>
            <span style={{
              fontFamily: "'Courier New', monospace",
              fontSize: '0.8rem',
              color: '#8b949e',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}>
              Filtros
            </span>
          </div>

          {/* Items de filtro */}
          {filters.map((f) => {
            const isSelected = activeFilter === f.key;
            return (
              <div
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                style={{
                  padding: isMobile ? '10px 14px' : '12px 16px',
                  cursor: 'pointer',
                  fontFamily: "'Courier New', monospace",
                  fontSize: '0.78rem',
                  letterSpacing: '0.5px',
                  color: isSelected ? '#fff' : '#8b949e',
                  background: isSelected ? 'rgba(88, 166, 255, 0.1)' : 'transparent',
                  borderLeft: isMobile ? 'none' : (isSelected ? '2px solid #58a6ff' : '2px solid transparent'),
                  borderBottom: isMobile ? (isSelected ? '2px solid #58a6ff' : '2px solid transparent') : 'none',
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: isSelected
                    ? (f.key === 'opensource' ? '#58a6ff' : f.key === 'compra' ? '#3fb950' : '#58a6ff')
                    : '#30363d',
                  boxShadow: isSelected ? `0 0 6px ${f.key === 'opensource' ? 'rgba(88,166,255,0.6)' : f.key === 'compra' ? 'rgba(63,185,80,0.6)' : 'rgba(88,166,255,0.6)'}` : 'none',
                  transition: 'all 0.25s ease',
                  flexShrink: 0,
                }} />
                {f.label}
              </div>
            );
          })}

          {/* Línea decorativa inferior */}
          {!isMobile && (
            <div style={{
              height: '2px',
              background: 'linear-gradient(90deg, #58a6ff, #3fb950, transparent)',
              margin: '0',
              opacity: 0.4,
            }} />
          )}
        </div>

        {/* ── Grid de tarjetas (derecha) ── */}
        <div style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: isMobile ? '14px' : '24px',
        }}>
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}

          {/* Mensaje cuando no hay resultados */}
          {filteredProjects.length === 0 && (
            <div style={{
              width: '100%',
              textAlign: 'center',
              padding: '60px 20px',
              color: '#484f58',
              fontFamily: "'Courier New', monospace",
              fontSize: '0.9rem',
              letterSpacing: '1px',
            }}>
              {'// No se encontraron proyectos en esta categoría'}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
