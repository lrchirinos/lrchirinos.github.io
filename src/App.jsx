import { useEffect, useState, useMemo, useRef } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

// ─── DATOS ───────────────────────────────────────────────────────────────────
const EXPERIENCE = [
  { id:1, role:"Cloud Systems Analyst & RPA Developer", company:"Andean Anthracite ACE S.A.", period:"2025 - Present",
    desc:"RPA & AI: 80% time reduction using Python/Selenium and Google Gemini AI integration.",
    fullDetails:"Architected a high-scale RPA solution to automate data extraction from government portals (SUNAT/MTC). Implemented Computer Vision and OCR for CAPTCHA resolution and integrated Google Gemini LLM to achieve 95% accuracy in financial data categorization.",
    tags:["Python","Selenium","Gemini AI","OCR","SQL"] },
  { id:2, role:"Full Stack Engineer", company:"Freelance Project", period:"2025",
    desc:"Full Stack: Scalable web apps with Angular 17+ and NestJS with CI/CD implementation.",
    fullDetails:"Designed and deployed a Single Page Application (SPA) with a modular architecture. Built a RESTful API with NestJS using DTOs for strict validation and managed deployment environments with Docker and cloud services.",
    tags:["Angular","NestJS","TypeScript","Docker","PostgreSQL"] },
  { id:3, role:"IT Automation & Security Specialist", company:"Clínica San Antonio", period:"2025",
    desc:"Automated TEDEF data validation for SUSALUD and hardened Windows Server infrastructure.",
    fullDetails:"Eliminated manual errors in insurance claim submissions by automating data interoperability protocols. Managed Active Directory policies and established automated backup routines on Windows Server 2019.",
    tags:["Windows Server","Automation","Security","Active Directory"] },
  { id:4, role:"Network Security Specialist", company:"Novo Resonancia", period:"2025",
    desc:"Network Security: Perimeter defense with Fortinet Firewalls and VLAN segmentation.",
    fullDetails:"Ensured medical data integrity (PACS/RIS) by configuring Fortinet Firewall rules and access control lists (ACLs). Optimized network performance through strategic VLAN segmentation.",
    tags:["Fortinet","Networking","VLAN","Network Security"] },
  { id:5, role:"Python Developer & Support", company:"EsSalud", period:"2023",
    desc:"Software & Cloud: Desktop apps with Python/PyQt and private cloud deployment.",
    fullDetails:"Created a specialized desktop tool for asset management and digitization using Python. Deployed and managed private cloud storage solutions with Nextcloud on Ubuntu Linux servers.",
    tags:["Python","PyQt","Linux","Nextcloud","Ubuntu"] }
];

const SKILLS = [
  { name:"Python", color:"#3fb950", percent:85, years:"3 years",
    icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    frameworks:["FastAPI","Flet","Qt","Pandas","OCR","Openpyxl","Requests","Gemini","TensorFlow","PyTorch"] },
  { name:"JavaScript", color:"#f0db4f", percent:80, years:"3 years",
    icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    frameworks:["Node.js","Angular","React","Next.js","Vue","Express"] },
  { name:"PHP", color:"#8892be", percent:50, years:"2 years",
    icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    frameworks:["Laravel","Guzzle","Monolog","PHPUnit"] },
  { name:"Dart", color:"#54c5f8", percent:30, years:"1 year",
    icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
    frameworks:["Flutter"] },
  { name:"C++", color:"#00599c", percent:25, years:"1 year",
    icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    frameworks:["GLUT","OpenGL","vector","iostream","memory"] },
  { name:"C#", color:"#9b4f96", percent:25, years:"1 year",
    icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    frameworks:[".NET","ASP.NET","Unity"] },
  { name:"Java", color:"#f89820", percent:20, years:"1 year",
    icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    frameworks:["Spring","Maven"] }
];

const CERTIFICATIONS = [
  { issuer:"Cisco", color:"#1ba0d7", items:[
    { name:"CCNA: Introduction to Networks", year:2023, link:"https://www.credly.com/badges/fa1f2bd9-54fa-46df-9f6c-85a6bd340903" },
    { name:"CCNA: Switching, Routing, and Wireless Essentials", year:2024, link:"https://www.credly.com/badges/3176c362-9629-429b-b313-ff426fd036fd" },
    { name:"CyberOps Associate", year:2024, link:"https://www.credly.com/badges/7fe75c43-2b2c-4df4-a2ff-9581bd4f81c4" },
  ]},
  { issuer:"Google", color:"#4285f4", items:[
    { name:"Foundations of Cybersecurity", year:2025, link:"https://coursera.org/share/32ada43512ea62b86a71489124afce57" },
    { name:"Play It Safe: Manage Security Risks", year:2025, link:"https://coursera.org/share/9ab4f47e218292005b331167d1823c28" },
    { name:"Connect and Protect: Networks and Network Security", year:2025, link:"https://coursera.org/share/810a4ede1aa14fa43da97192eb15fc62" },
    { name:"Tools of the Trade: Linux and SQL", year:2025, link:"https://coursera.org/share/43a7fd16adf9c149026b05080eb69929" },
    { name:"Assets, Threats, and Vulnerabilities", year:2025, link:"https://coursera.org/share/4f0e27030e5e7cf6ce899cd933565354" },
    { name:"Sound the Alarm: Detection and Response", year:2025, link:"https://coursera.org/share/7a78724444ccb59113e9a8ee1b4cb1ea" },
    { name:"Automate Cybersecurity Tasks with Python", year:2025, link:"https://coursera.org/share/3cb23e7fefb05f2e5c1ff467148fa3c4" },
    { name:"Introduction to Generative AI", year:2026, link:"https://coursera.org/share/52dda344cbf5d86019a3c2dcc6196f97" },
  ]}
];

// ─── ICONOS SVG ───────────────────────────────────────────────────────────────
const LockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

// Icono hoja/documento para Resume
const ResumeIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <line x1="10" y1="9" x2="8" y2="9"/>
  </svg>
);

// Icono usuario para About Me
const UserIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

// Icono ubicación para Location
const LocationIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

// Icono WhatsApp para Contact
const WhatsAppIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const HomeIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const ExternalIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

// ─── MAPA MODAL ───────────────────────────────────────────────────────────────
function MapModal({ onClose }) {
  const mapRef         = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      if (mapInstanceRef.current || !mapRef.current) return;
      const L = window.L;
      const map = L.map(mapRef.current, { center:[-15,-80], zoom:2, zoomControl:true, minZoom:2 });
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution:'© OpenStreetMap © CARTO', subdomains:'abcd', maxZoom:19
      }).addTo(map);
      mapInstanceRef.current = map;

      // Cadena encadenada por moveend: cada flyTo arranca EXACTAMENTE
      // cuando el anterior termina, sin delays arbitrarios.
      //
      // Secuencia:
      //   Init  → zoom 2  América completa  (vista inicial al abrir)
      //   Paso1 → zoom 4  Sudamérica        (moveend del init, tras 400ms)
      //   Paso2 → zoom 6  Perú              (moveend del paso1)
      //   Paso3 → zoom 13 Trujillo          (moveend del paso2)
      //   Final → marcador pulsante         (moveend del paso3)

      let step = 0; // contador para ignorar eventos moveend del usuario

      const flySequence = () => {
        step++;
        if (step === 1) {
          // América → Sudamérica
          map.once('moveend', flySequence);
          map.flyTo([-16, -62], 4, { animate:true, duration:2.0, easeLinearity:0.2 });

        } else if (step === 2) {
          // Sudamérica → Perú
          map.once('moveend', flySequence);
          map.flyTo([-8.8, -76.5], 6, { animate:true, duration:1.8, easeLinearity:0.2 });

        } else if (step === 3) {
          // Perú → Trujillo
          map.once('moveend', flySequence);
          map.flyTo([-8.1116, -79.0288], 13, { animate:true, duration:2.2, easeLinearity:0.18 });

        } else if (step === 4) {
          // Llegamos: colocar marcador pulsante
          const icon = L.divIcon({
            html:`<div style="background:#3fb950;width:16px;height:16px;border-radius:50%;
              border:3px solid #fff;animation:mp 1.5s infinite;
              box-shadow:0 0 0 4px rgba(63,185,80,0.4),0 0 20px rgba(63,185,80,0.6)"></div>
              <style>@keyframes mp{
                0%  {box-shadow:0 0 0 4px rgba(63,185,80,0.4),0 0 20px rgba(63,185,80,0.6)}
                50% {box-shadow:0 0 0 12px rgba(63,185,80,0.05),0 0 35px rgba(63,185,80,0.9)}
                100%{box-shadow:0 0 0 4px rgba(63,185,80,0.4),0 0 20px rgba(63,185,80,0.6)}
              }</style>`,
            className:'', iconAnchor:[8,8]
          });
          L.marker([-8.1116,-79.0288],{icon}).addTo(map)
            .bindPopup(`<div style="font-family:monospace;font-size:13px;line-height:1.8;min-width:160px">
              <strong>📍 Trujillo, Perú</strong><br/>Luis Chirinos<br/>
              <span style="font-size:11px;color:#555">Full Stack & DevSecOps</span></div>`)
            .openPopup();
        }
      };

      // Arranca la secuencia directamente — sin depender de moveend para el primer paso,
      // ya que setView con animate:false no siempre dispara moveend si el mapa ya está ahí.
      setTimeout(flySequence, 600);
    };
    document.head.appendChild(script);
    return () => { if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current = null; } };
  }, []);

  return (
    <div style={{ position:'fixed',inset:0,zIndex:1000,background:'rgba(0,0,0,0.88)',
      display:'flex',alignItems:'center',justifyContent:'center',animation:'fadeIn 0.3s ease' }}
      onClick={e => { if (e.target===e.currentTarget) onClose(); }}>
      <div style={{ width:'90%',maxWidth:'920px',height:'570px',background:'#0d1117',
        borderRadius:'12px',border:'1px solid #30363d',overflow:'hidden',position:'relative',
        boxShadow:'0 0 60px rgba(63,185,80,0.12)' }}>
        <div style={{ position:'absolute',top:0,left:0,right:0,zIndex:999,
          background:'rgba(13,17,23,0.93)',padding:'12px 20px',
          display:'flex',alignItems:'center',justifyContent:'space-between',
          borderBottom:'1px solid #30363d',backdropFilter:'blur(8px)' }}>
          <div style={{ display:'flex',alignItems:'center',gap:'8px',color:'#3fb950',
            fontFamily:'monospace',fontSize:'0.82rem',letterSpacing:'1px' }}>
            <LocationIcon size={14}/> LOCATION: TRUJILLO, PERÚ — South America
          </div>
          <button onClick={onClose}
            style={{ background:'transparent',border:'1px solid #30363d',color:'#8b949e',
              width:'32px',height:'32px',borderRadius:'6px',cursor:'pointer',fontSize:'1rem',
              display:'flex',alignItems:'center',justifyContent:'center',
              fontFamily:'monospace',transition:'all 0.2s' }}
            onMouseOver={e=>{ e.currentTarget.style.borderColor='#ff7b72'; e.currentTarget.style.color='#ff7b72'; }}
            onMouseOut={e=>{ e.currentTarget.style.borderColor='#30363d'; e.currentTarget.style.color='#8b949e'; }}>✕</button>
        </div>
        <div ref={mapRef} style={{ width:'100%',height:'100%',paddingTop:'49px',boxSizing:'border-box' }}/>
      </div>
    </div>
  );
}

// ─── NAVBAR DESKTOP (top) + MOBILE (bottom app bar) ──────────────────────────
function Navbar({ onLocationClick, onAboutClick, onHomeClick }) {
  const [hov, setHov]         = useState(null);
  const [active, setActive]   = useState(null);
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── DESKTOP TOP NAV ────────────────────────────────────────────────────────
  if (!isMobile) {
    const base = (key, ac='#c9d1d9') => ({
      display:'flex', alignItems:'center', gap:'7px',
      fontFamily:'monospace', letterSpacing:'1px',
      background:'none', border:'none', cursor:'pointer', textDecoration:'none',
      padding:'4px 0', transition:'all 0.25s ease',
      color: hov===key ? ac : '#8b949e',
      fontSize: hov===key ? '0.92rem' : '0.82rem',
      transform: hov===key ? 'scale(1.1)' : 'scale(1)',
      textShadow: hov===key ? `0 0 12px ${ac}66` : 'none',
    });
    return (
      <nav style={{ position:'fixed',top:0,left:0,right:0,zIndex:200,
        background:'rgba(13,17,23,0.72)',backdropFilter:'blur(14px)',
        borderBottom:'1px solid rgba(48,54,61,0.5)' }}>
        <div style={{ display:'flex',justifyContent:'flex-end',alignItems:'center',
          padding:'12px 32px',gap:'28px' }}>
          <button style={base('home','#ffffff')}
            onMouseEnter={()=>setHov('home')} onMouseLeave={()=>setHov(null)}
            onClick={onHomeClick}>
            <HomeIcon size={14}/> Home
          </button>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
            style={base('res','#58a6ff')}
            onMouseEnter={()=>setHov('res')} onMouseLeave={()=>setHov(null)}>
            <ResumeIcon size={14}/> Resume
          </a>
          <button style={base('about','#3fb950')}
            onMouseEnter={()=>setHov('about')} onMouseLeave={()=>setHov(null)}
            onClick={onAboutClick}>
            About Me
          </button>
          <button style={base('loc','#c9d1d9')}
            onMouseEnter={()=>setHov('loc')} onMouseLeave={()=>setHov(null)}
            onClick={onLocationClick}>
            <LocationIcon size={14}/> Trujillo / Perú
          </button>
          <a href="https://web.whatsapp.com/send/?phone=51934654283"
            target="_blank" rel="noopener noreferrer"
            style={base('wa','#25d366')}
            onMouseEnter={()=>setHov('wa')} onMouseLeave={()=>setHov(null)}>
            <WhatsAppIcon size={14}/> WhatsApp
          </a>
        </div>
      </nav>
    );
  }

  // ── MOBILE BOTTOM APP BAR ─────────────────────────────────────────────────
  // 4 columnas simétricas: icono arriba + label abajo
  const mobileItems = [
    {
      key: 'home',
      icon: <HomeIcon size={24}/>,
      label: 'Home',
      activeColor: '#ffffff',
      action: onHomeClick,
    },
    {
      key: 'res',
      icon: <ResumeIcon size={24}/>,
      label: 'Resume',
      activeColor: '#58a6ff',
      action: () => window.open('/resume.pdf', '_blank'),
    },
    {
      key: 'about',
      icon: <UserIcon size={24}/>,
      label: 'About Me',
      activeColor: '#3fb950',
      action: onAboutClick,
    },
    {
      key: 'loc',
      icon: <LocationIcon size={24}/>,
      label: 'Location',
      activeColor: '#c9d1d9',
      action: onLocationClick,
    },
    {
      key: 'wa',
      icon: <WhatsAppIcon size={24}/>,
      label: 'Contact Me',
      activeColor: '#25d366',
      action: () => window.open('https://web.whatsapp.com/send/?phone=51934654283', '_blank'),
    },
  ];

  return (
    // Barra fija en la parte inferior, ocupa 100% del ancho
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 200,
      background: 'rgba(13,17,23,0.96)',
      backdropFilter: 'blur(16px)',
      borderTop: '1px solid rgba(48,54,61,0.6)',
      // Respeta el safe area en iPhones con notch inferior
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)', // 5 columnas iguales
        width: '100%',
      }}>
        {mobileItems.map(item => (
          <button
            key={item.key}
            onClick={() => { setActive(item.key); item.action(); }}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              padding: '10px 4px 8px',
              transition: 'all 0.2s ease',
              // Color activo si fue el último pulsado, gris si no
              color: active === item.key ? item.activeColor : '#6e7681',
            }}
            onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.92)'; }}
            onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            onTouchStart={e => { e.currentTarget.style.transform = 'scale(0.92)'; e.currentTarget.style.color = item.activeColor; }}
            onTouchEnd={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            {/* Icono */}
            <span style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'filter 0.2s',
              filter: active === item.key ? `drop-shadow(0 0 6px ${item.activeColor}88)` : 'none',
            }}>
              {item.icon}
            </span>
            {/* Label */}
            <span style={{
              fontSize: '0.62rem',
              fontFamily: 'monospace',
              letterSpacing: '0.5px',
              lineHeight: 1,
              fontWeight: active === item.key ? 'bold' : 'normal',
              whiteSpace: 'nowrap',
            }}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}

// ─── FOTO ─────────────────────────────────────────────────────────────────────
function ProfilePhoto({ imgError, setImgError }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ position:'relative',marginBottom:'1.5rem',display:'inline-block',
        filter: hov?'drop-shadow(0 0 40px rgba(63,185,80,0.35))':'drop-shadow(0 0 20px rgba(88,166,255,0.2))',
        transition:'filter 0.5s ease',cursor:'default' }}>
      {!imgError ? (
        <img src="/profile.png" alt="Luis Chirinos" onError={()=>setImgError(true)}
          style={{ width:hov?'215px':'200px',height:'auto',borderRadius:0,objectFit:'contain',
            display:'block',position:'relative',zIndex:2,
            filter: hov
              ?'grayscale(0%) contrast(1.05) drop-shadow(0 0 6px rgba(63,185,80,1)) drop-shadow(0 0 18px rgba(63,185,80,0.75)) drop-shadow(0 0 45px rgba(63,185,80,0.35))'
              :'grayscale(100%) contrast(1.15) drop-shadow(0 0 5px rgba(88,166,255,0.6)) drop-shadow(0 0 16px rgba(88,166,255,0.25))',
            transition:'all 0.5s ease' }}/>
      ) : (
        <div style={{ width:'145px',height:'145px',borderRadius:'50%',background:'#0d1117',
          border:'3px solid #3fb950',display:'flex',alignItems:'center',justifyContent:'center',
          fontSize:'2.5rem',fontWeight:'bold',color:'#3fb950',
          transform:hov?'scale(1.08)':'scale(1)',
          boxShadow:hov?'0 0 30px rgba(63,185,80,0.5)':'none',transition:'all 0.45s ease' }}>LC</div>
      )}
    </div>
  );
}

// ─── TERMINAL ─────────────────────────────────────────────────────────────────
function TerminalLog({ lines, done }) {
  const [cur, setCur] = useState(true);
  useEffect(()=>{ const t=setInterval(()=>setCur(p=>!p),530); return ()=>clearInterval(t); },[]);
  return (
    <div style={{ marginTop:'30px',background:'rgba(0,0,0,0.85)',padding:'18px 20px',borderRadius:'6px',
      fontFamily:'monospace',textAlign:'left',width:'90%',maxWidth:'520px',border:'1px solid #30363d',
      minHeight:'110px',color:'#3fb950',boxShadow:'0 0 20px rgba(63,185,80,0.08)' }}>
      <pre style={{ margin:0,whiteSpace:'pre-wrap',lineHeight:1.7 }}>
        {lines.join('\n')}
        {done?`\n[OK] FILES UNLOCKED — ${EXPERIENCE.length} records found.`:(cur?'█':' ')}
      </pre>
    </div>
  );
}

// ─── SKILL BAR ────────────────────────────────────────────────────────────────
function SkillBar({ skill }) {
  const [animated,setAnimated] = useState(false);
  const ref = useRef(null);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting) setAnimated(true); },{threshold:0.3});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);
  return (
    <div ref={ref} style={{ marginBottom:'28px' }}>
      <div style={{ display:'flex',alignItems:'center',gap:'12px',marginBottom:'10px' }}>
        <img src={skill.icon} alt={skill.name} width="28" height="28" style={{ filter:'drop-shadow(0 0 4px rgba(255,255,255,0.15))' }}/>
        <span style={{ color:skill.color,fontFamily:'monospace',fontWeight:'bold',fontSize:'1rem' }}>{skill.name}</span>
        <span style={{ color:'#8b949e',fontFamily:'monospace',fontSize:'0.78rem',marginLeft:'auto' }}>{skill.years}</span>
        <span style={{ color:skill.color,fontFamily:'monospace',fontSize:'0.82rem',minWidth:'38px',textAlign:'right' }}>{skill.percent}%</span>
      </div>
      <div style={{ background:'#21262d',borderRadius:'4px',height:'6px',overflow:'hidden' }}>
        <div style={{ height:'100%',borderRadius:'4px',
          background:`linear-gradient(to right,${skill.color}99,${skill.color})`,
          width:animated?`${skill.percent}%`:'0%',
          transition:'width 1.2s cubic-bezier(0.25,0.8,0.25,1)',
          boxShadow:`0 0 8px ${skill.color}55` }}/>
      </div>
      <div style={{ display:'flex',flexWrap:'wrap',gap:'6px',marginTop:'10px' }}>
        {skill.frameworks.map(fw=>(
          <span key={fw} style={{ background:'rgba(48,54,61,0.55)',color:'#8b949e',padding:'2px 10px',
            borderRadius:'20px',fontSize:'0.7rem',fontFamily:'monospace',
            border:`1px solid ${skill.color}2e`,transition:'all 0.2s',cursor:'default' }}
            onMouseOver={e=>{ e.currentTarget.style.color=skill.color; e.currentTarget.style.borderColor=skill.color; }}
            onMouseOut={e=>{ e.currentTarget.style.color='#8b949e'; e.currentTarget.style.borderColor=`${skill.color}2e`; }}>
            {fw}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── ABOUT SECTION ────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section style={{ position:'relative',zIndex:10,padding:'100px 0 80px',width:'100%',boxSizing:'border-box' }}>
      <div style={{ maxWidth:'900px',margin:'0 auto',padding:'0 40px',boxSizing:'border-box' }}>

        <div style={{ marginBottom:'70px' }}>
          <h3 style={{ fontSize:'1.6rem',color:'#fff',margin:'0 0 28px',fontFamily:'monospace' }}>
            <span style={{ color:'#3fb950' }}>./</span> ABOUT_ME
          </h3>
          <div style={{ background:'rgba(13,17,23,0.75)',border:'1px solid #30363d',
            borderLeft:'3px solid #3fb950',borderRadius:'8px',padding:'30px',
            lineHeight:'1.9',color:'#c9d1d9',fontSize:'0.94rem' }}>
            <p style={{ margin:'0 0 18px' }}>Hello, I'm <span style={{ color:'#58a6ff',fontWeight:'bold' }}>Luis Rolando Chirinos Hualcas</span>. My passion for technology began in childhood, creating games in GameMaker. I didn't know I was programming; I only knew that I loved creating. At 25, that same intrinsic curiosity is the driving force behind my continued learning and deconstruction of systems to understand how they work.</p>
            <p style={{ margin:'0 0 18px' }}>I entered the <span style={{ color:'#3fb950' }}>National University of Trujillo in 5th place</span>, where I graduated with a degree in Computer Science. There, I built a solid foundation: from using complex algorithms and geometry for computer graphics to low-level programming. I learned hardware architectures with logic gates, programmed in assembly language with the EMU8086, and designed physical memory registers connected to seven-segment displays.</p>
            <p style={{ margin:'0 0 18px' }}>My learning didn't stop at university. I delved deeper into <span style={{ color:'#3fb950' }}>Python</span>, which is my favorite language; whenever I see a problem, I design an algorithm in Python to solve it. To protect what I build, I earned a <span style={{ color:'#4285f4' }}>Google Cybersecurity certification</span>, applying vulnerability mitigation tactics. I also mastered cloud deployment and security with AWS and GCP.</p>
            <p style={{ margin:0 }}>Today, I don't just write software; I orchestrate solutions. I use <span style={{ color:'#58a6ff' }}>AI agents (Gemini, ChatGPT, Claude)</span> as high-performance assistants. By delegating mechanical writing and syntax checking, I focus on what truly matters: architecture, logical debugging, and prompt engineering to create robust and secure systems in record time.</p>
          </div>
        </div>

        <div style={{ marginBottom:'70px' }}>
          <h3 style={{ fontSize:'1.6rem',color:'#fff',margin:'0 0 28px',fontFamily:'monospace' }}>
            <span style={{ color:'#3fb950' }}>./</span> LANGUAGES
          </h3>
          {SKILLS.map(s=><SkillBar key={s.name} skill={s}/>)}
        </div>

        <div style={{ marginBottom:'70px' }}>
          <h3 style={{ fontSize:'1.6rem',color:'#fff',margin:'0 0 28px',fontFamily:'monospace' }}>
            <span style={{ color:'#3fb950' }}>./</span> EDUCATION
          </h3>
          <a href="https://www.unitru.edu.pe/" target="_blank" rel="noopener noreferrer" style={{ textDecoration:'none' }}>
            <div style={{ background:'rgba(13,17,23,0.75)',border:'1px solid #30363d',borderRadius:'8px',
              padding:'24px 28px',transition:'all 0.3s ease',cursor:'pointer' }}
              onMouseOver={e=>{ e.currentTarget.style.borderColor='#58a6ff'; e.currentTarget.style.transform='translateX(6px)'; }}
              onMouseOut={e=>{ e.currentTarget.style.borderColor='#30363d'; e.currentTarget.style.transform='translateX(0)'; }}>
              <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start' }}>
                <div>
                  <p style={{ color:'#58a6ff',fontFamily:'monospace',fontSize:'0.75rem',margin:'0 0 6px',letterSpacing:'1px' }}>UNIVERSIDAD NACIONAL DE TRUJILLO</p>
                  <h4 style={{ color:'#fff',margin:'0 0 6px',fontSize:'1.1rem' }}>Bachelor's Degree in Computer Science</h4>
                  <p style={{ color:'#8b949e',margin:0,fontFamily:'monospace',fontSize:'0.82rem' }}>2019 — 2024 · Trujillo, Perú</p>
                </div>
                <span style={{ color:'#58a6ff',marginTop:'4px' }}><ExternalIcon/></span>
              </div>
            </div>
          </a>
        </div>

        <div>
          <h3 style={{ fontSize:'1.6rem',color:'#fff',margin:'0 0 28px',fontFamily:'monospace' }}>
            <span style={{ color:'#3fb950' }}>./</span> CERTIFICATIONS
          </h3>
          {CERTIFICATIONS.map(group=>(
            <div key={group.issuer} style={{ marginBottom:'40px' }}>
              <p style={{ color:group.color,fontFamily:'monospace',fontSize:'0.82rem',letterSpacing:'2px',
                margin:'0 0 14px',borderBottom:`1px solid ${group.color}33`,paddingBottom:'8px' }}>
                ▸ {group.issuer.toUpperCase()}
              </p>
              <div style={{ display:'flex',flexDirection:'column',gap:'10px' }}>
                {group.items.map(cert=>(
                  <div key={cert.name} style={{ background:'rgba(13,17,23,0.65)',border:'1px solid #30363d',
                    borderRadius:'8px',padding:'15px 20px',display:'flex',
                    justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',
                    gap:'12px',transition:'border-color 0.2s' }}
                    onMouseOver={e=>e.currentTarget.style.borderColor=group.color}
                    onMouseOut={e=>e.currentTarget.style.borderColor='#30363d'}>
                    <div>
                      <p style={{ color:'#c9d1d9',margin:'0 0 4px',fontSize:'0.88rem' }}>{cert.name}</p>
                      <p style={{ color:'#8b949e',margin:0,fontFamily:'monospace',fontSize:'0.73rem' }}>{cert.year}</p>
                    </div>
                    <a href={cert.link} target="_blank" rel="noopener noreferrer"
                      style={{ display:'flex',alignItems:'center',gap:'6px',background:'transparent',
                        border:`1px solid ${group.color}`,color:group.color,padding:'6px 14px',
                        borderRadius:'4px',fontFamily:'monospace',fontSize:'0.73rem',letterSpacing:'1px',
                        textDecoration:'none',whiteSpace:'nowrap',transition:'all 0.2s ease' }}
                      onMouseOver={e=>{ e.currentTarget.style.background=group.color; e.currentTarget.style.color='#0d1117'; }}
                      onMouseOut={e=>{ e.currentTarget.style.background='transparent'; e.currentTarget.style.color=group.color; }}>
                      <ExternalIcon/> View Certificate
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [init,setInit]                       = useState(false);
  const [activeSection,setActiveSection]     = useState('hero'); // 'hero' | 'about' | 'experience'
  const [typingLines,setTypingLines]         = useState([]);
  const [terminalDone,setTerminalDone]       = useState(false);
  const [showTerminal,setShowTerminal]       = useState(false);
  const [selectedProject,setSelectedProject] = useState(null);
  const [imgError,setImgError]               = useState(false);
  const [showMap,setShowMap]                 = useState(false);
  const [isMobile,setIsMobile]               = useState(false);

  const experienceRef = useRef(null);
  const aboutRef      = useRef(null);

  useEffect(()=>{
    initParticlesEngine(async e=>{ await loadSlim(e); }).then(()=>setInit(true));
  },[]);

  // Detectar móvil también en App para ajustar padding inferior del contenido
  useEffect(()=>{
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  },[]);

  const particlesOptions = useMemo(()=>({
    background:{ color:{ value:"#0d1117" } }, fpsLimit:60,
    interactivity:{ events:{ onClick:{enable:true,mode:"repulse"}, onHover:{enable:true,mode:"grab"} },
      modes:{ repulse:{distance:200,duration:0.4}, grab:{distance:140,links:{opacity:1}} } },
    particles:{ color:{value:"#58a6ff"},
      links:{color:"#58a6ff",distance:150,enable:true,opacity:0.2,width:1},
      move:{enable:true,speed:1}, number:{density:{enable:true,area:800},value:60},
      opacity:{value:0.5}, size:{value:{min:1,max:3}} },
    detectRetina:true,
  }),[]);

  const handleDecrypt = () => {
    if (showTerminal) return;
    setActiveSection('experience');
    setTypingLines([]); setTerminalDone(false); setShowTerminal(true);
    let i=0;
    const steps=["> Connecting to secure server...","> Verifying handshake...","> Access Granted.","> Decrypting project files..."];
    const iv=setInterval(()=>{
      if(i<steps.length){ setTypingLines(p=>[...p,steps[i]]); i++; }
      else{ clearInterval(iv);
        setTimeout(()=>{ setTerminalDone(true);
          setTimeout(()=>{
            setShowTerminal(false);
            setTimeout(()=>experienceRef.current?.scrollIntoView({behavior:'smooth'}),100);
          },900);
        },400);
      }
    },600);
  };

  const handleHome = () => {
    // Resetea todo al estado inicial
    setActiveSection('hero');
    setShowTerminal(false);
    setTypingLines([]);
    setTerminalDone(false);
    setSelectedProject(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAboutMe = () => {
    setActiveSection('about');
    setShowTerminal(false);
    setTimeout(()=>aboutRef.current?.scrollIntoView({behavior:'smooth'}),100);
  };

  // VISTA DETALLE
  if (selectedProject) return (
    <div style={{ position:'relative',zIndex:10,minHeight:'100vh',
      // En móvil dejamos espacio para la bottom bar (≈65px)
      padding: isMobile ? '40px 20px 80px' : '60px 40px',
      color:'#c9d1d9',animation:'fadeIn 0.5s',background:'#0d1117',display:'flex',
      flexDirection:'column',alignItems:'center',justifyContent:'center',boxSizing:'border-box' }}>
      <div style={{ width:'100%',maxWidth:'800px' }}>
        <div className="glass-panel" style={{ padding: isMobile?'24px':'40px',borderRadius:'12px',
          borderTop:'4px solid #3fb950',background:'rgba(13,17,23,0.9)',position:'relative' }}>
          <button onClick={()=>setSelectedProject(null)}
            style={{ position:'absolute',top:'16px',right:'16px',background:'transparent',
              border:'1px solid #30363d',color:'#8b949e',width:'36px',height:'36px',
              borderRadius:'6px',cursor:'pointer',fontSize:'1.1rem',display:'flex',
              alignItems:'center',justifyContent:'center',transition:'all 0.2s',fontFamily:'monospace' }}
            onMouseOver={e=>{ e.currentTarget.style.borderColor='#ff7b72'; e.currentTarget.style.color='#ff7b72'; e.currentTarget.style.background='rgba(255,123,114,0.1)'; }}
            onMouseOut={e=>{ e.currentTarget.style.borderColor='#30363d'; e.currentTarget.style.color='#8b949e'; e.currentTarget.style.background='transparent'; }}>✕</button>
          <h1 style={{ fontSize: isMobile?'1.6rem':'2.5rem',margin:'0 0 10px',color:'#fff',paddingRight:'50px' }}>{selectedProject.role}</h1>
          <h2 style={{ color:'#58a6ff',marginBottom:'30px',fontSize: isMobile?'1rem':'1.5rem' }}>@{selectedProject.company} | {selectedProject.period}</h2>
          <div style={{ background:'#000',padding:'20px',borderRadius:'8px',fontFamily:'monospace',marginBottom:'30px',border:'1px solid #30363d' }}>
            <p style={{ color:'#8b949e',margin:'0 0 10px' }}>// OPERATION DETAILS</p>
            <p style={{ color:'#fff',lineHeight:'1.8',margin:0 }}>{selectedProject.fullDetails}</p>
          </div>
          <h3 style={{ margin:'0 0 15px' }}>Tech Stack Deployed:</h3>
          <div style={{ display:'flex',gap:'10px',flexWrap:'wrap' }}>
            {selectedProject.tags.map(t=>(
              <span key={t} style={{ background:'#238636',color:'#fff',padding:'5px 15px',borderRadius:'20px',fontSize:'0.9rem' }}>{t}</span>
            ))}
          </div>
          <div style={{ marginTop:'20px',borderTop:'1px dashed #30363d',paddingTop:'15px',fontSize:'0.8rem',color:'#3fb950' }}>
            System Access Level: Admin &gt;&gt; Encrypted Connection
          </div>
        </div>
      </div>
      {/* Bottom nav también en detalle */}
      <Navbar onLocationClick={()=>setShowMap(true)} onAboutClick={handleAboutMe} onHomeClick={handleHome}/>
      {showMap && <MapModal onClose={()=>setShowMap(false)}/>}
    </div>
  );

  // VISTA PRINCIPAL
  return (
    <div style={{ position:'relative',width:'100%',minHeight:'100vh',color:'#c9d1d9',overflowX:'hidden',boxSizing:'border-box' }}>

      <Navbar onLocationClick={()=>setShowMap(true)} onAboutClick={handleAboutMe} onHomeClick={handleHome}/>
      {showMap && <MapModal onClose={()=>setShowMap(false)}/>}

      {init && <Particles id="tsparticles" options={particlesOptions}
        style={{ position:'fixed',top:0,left:0,width:'100%',height:'100%',zIndex:0 }}/>}

      {/* HERO — en móvil dejamos paddingBottom para que la bottom bar no tape el contenido */}
      <section style={{ position:'relative',zIndex:10,height:'100vh',width:'100%',
        display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',
        textAlign:'center',
        paddingTop: isMobile ? '0' : '60px',         // compensa top navbar en desktop
        paddingBottom: isMobile ? '72px' : '0',       // compensa bottom navbar en móvil
        paddingLeft:'20px', paddingRight:'20px',
        boxSizing:'border-box' }}>

        <ProfilePhoto imgError={imgError} setImgError={setImgError}/>

        <h1 style={{ fontSize:'clamp(2.2rem,6vw,5rem)',margin:'0',lineHeight:'1.1',fontWeight:900,
          letterSpacing:'-2px',color:'#ffffff',textShadow:'0 0 20px rgba(0,0,0,0.5)' }}>
          LUIS CHIRINOS
        </h1>
        <h2 style={{ fontSize:'clamp(0.9rem,3vw,1.8rem)',margin:'15px 0 0',fontWeight:'400',letterSpacing:'2px',
          background:'linear-gradient(to right,#58a6ff,#3fb950)',WebkitBackgroundClip:'text',
          backgroundClip:'text',color:'transparent',display:'inline-block' }}>
          FULL STACK & DEVSECOPS
        </h2>

        {activeSection === 'experience' && showTerminal && <TerminalLog lines={typingLines} done={terminalDone}/>}

        {activeSection === 'hero' && !showTerminal && (
          <div style={{ display:'flex',gap:'12px',marginTop:'36px',flexWrap:'wrap',justifyContent:'center' }}>
            <button onClick={handleDecrypt}
              style={{ padding: isMobile?'12px 24px':'15px 32px',fontSize: isMobile?'0.9rem':'1rem',
                background:'transparent',border:'2px solid #3fb950',color:'#3fb950',borderRadius:'4px',
                cursor:'pointer',fontWeight:'bold',letterSpacing:'1px',
                boxShadow:'0 0 15px rgba(63,185,80,0.2)',transition:'all 0.3s ease' }}
              onMouseOver={e=>{ e.target.style.background='#3fb950'; e.target.style.color='#0d1117'; }}
              onMouseOut={e=>{ e.target.style.background='transparent'; e.target.style.color='#3fb950'; }}>
              View Experience
            </button>
            <button title="Coming soon"
              style={{ padding: isMobile?'12px 24px':'15px 32px',fontSize: isMobile?'0.9rem':'1rem',
                background:'transparent',border:'2px solid #58a6ff',color:'#58a6ff',borderRadius:'4px',
                cursor:'not-allowed',fontWeight:'bold',letterSpacing:'1px',opacity:0.5 }}>
              View Projects
            </button>
          </div>
        )}
      </section>

      {/* ABOUT */}
      {activeSection === 'about' && (
        <div ref={aboutRef} style={{ paddingBottom: isMobile ? '72px' : '0' }}>
          <AboutSection/>
        </div>
      )}

      {/* EXPERIENCE GRID */}
      {activeSection === 'experience' && !showTerminal && (
        <section ref={experienceRef} style={{ position:'relative',zIndex:10,
          padding: isMobile ? '60px 0 80px' : '80px 0',
          width:'100%',boxSizing:'border-box',minHeight:'100vh' }}>
          <div style={{ maxWidth:'1200px',margin:'0 auto',
            padding: isMobile ? '0 16px' : '0 40px',boxSizing:'border-box' }}>
            <h3 style={{ borderBottom:'1px solid #30363d',paddingBottom:'20px',
              fontSize: isMobile?'1.4rem':'2rem',color:'#fff',margin:'0 0 40px' }}>
              <span style={{ color:'#3fb950' }}>./</span> DECLASSIFIED_FILES
            </h3>
            <div style={{ display:'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit,minmax(300px,1fr))',
              gap:'20px',alignItems:'stretch' }}>
              {EXPERIENCE.map((exp,index)=>(
                <div key={exp.id} className="project-card" onClick={()=>setSelectedProject(exp)}
                  style={{ animation:`slideUp 0.6s ease forwards ${index*0.2}s`,opacity:0,
                    transform:'translateY(50px)',background:'rgba(13,17,23,0.8)',
                    padding: isMobile?'20px':'25px',borderRadius:'8px',border:'1px solid #30363d',
                    cursor:'pointer',transition:'transform 0.2s',display:'flex',flexDirection:'column' }}
                  onMouseOver={e=>{ e.currentTarget.style.borderColor='#58a6ff'; e.currentTarget.style.transform='translateY(-5px)'; }}
                  onMouseOut={e=>{ e.currentTarget.style.borderColor='#30363d'; e.currentTarget.style.transform='translateY(0)'; }}>
                  <div style={{ display:'flex',justifyContent:'space-between',marginBottom:'15px' }}>
                    <div style={{ background:'#30363d',color:'#fff',padding:'2px 8px',borderRadius:'4px',fontSize:'0.7rem' }}>CONFIDENTIAL</div>
                    <div style={{ color:'#8b949e' }}><LockIcon/></div>
                  </div>
                  <div style={{ flex:1 }}>
                    <h4 style={{ fontSize: isMobile?'1.1rem':'1.4rem',color:'#fff',margin:'0 0 5px' }}>{exp.role}</h4>
                    <p style={{ color:'#58a6ff',fontSize:'0.9rem',marginBottom:'15px' }}>@{exp.company}</p>
                    <p style={{ fontSize:'0.9rem',color:'#8b949e',lineHeight:'1.5',margin:0 }}>{exp.desc}</p>
                  </div>
                  <div style={{ marginTop:'20px',borderTop:'1px dashed #30363d',paddingTop:'15px',fontSize:'0.8rem',color:'#3fb950' }}>
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