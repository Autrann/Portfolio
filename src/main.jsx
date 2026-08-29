import React from 'react';
import { createPortal, createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  Atom,
  BarChart3,
  Blocks,
  BriefcaseBusiness,
  Code2,
  Database,
  ExternalLink,
  FileSpreadsheet,
  GitBranch,
  GraduationCap,
  Mail,
  MapPin,
  Maximize2,
  MonitorPlay,
  Sparkles,
  Table2,
  TerminalSquare,
  X,
} from 'lucide-react';
import './styles.css';

const DataCore = React.lazy(() =>
  import('./visuals/DataCore.jsx').then(({ DataCore: DataCoreComponent }) => ({ default: DataCoreComponent }))
);

const profile = {
  name: 'Luis Autran',
  role: 'Programador & Analista de Datos',
  location: 'Mexico',
  intro:
    'Hola! Pendiente de completar',
  email: 'luis.autran@hotmail.com',
  tools: [
    'React',
    'Laravel',
    'Python',
    'SQL',
    'Power BI',
    'Excel',
    'Pandas',
    'JavaScript',
    'Git',
  ],
  experience: [
    {
      role: 'Data Operations Supervisor',
      company: 'Flecha Amarilla',
      period: '2026 - Actualidad',
      detail:
        '• Análisis de discrepancias entre registros digitales y resultados operativos utilizando Excel y consultas en SQL para detectar anomalías, errores de captura y posibles riesgos financieros. • Automatización de procesos y análisis de datos mediante SQL y Python para la extracción eficiente de información. • Supervisión y mejora continua del flujo de datos y reportes generados por el equipo de analistas. • Diseño y generación de reportes y dashboards en PowerBi para monitoreo operativo y análisis de métricas',
    },
    {
      role: 'Programador Fullstack Jr.',
      company: 'Universidad Autónoma de San Luis Potosí',
      period: '2024 - 2025',
      detail:
        'Gestión y mantenimiento de sistemas web en Laravel y React, entorno de producción mediante Ubuntu Server y manejo de pruebas de APIREST, requests, tokens, debugging y frontend • Responsable del análisis del flujo y comportamiento de usuarios, utilizando Python y Excel para generar reportes • Coordinación con equipos multidisciplinarios bajo metodologías ágiles, dando seguimiento a tareas y control de versiones mediante ClickUp y GitLab. • Elaboración de prototipos y vistas funcionales en Figma',
    },
    {
      role: 'Analista de Aplicaciones y Servidores',
      company: 'Abastecedora Industrial Viesa',
      period: '2023 - 2024',
      detail:
        'Responsable de la implementación y administración de infraestructura Linux de servidores para la gestión de inventarios, clientes y proveedores. • Integración y gestión de bases de datos MySQL con herramientas internas desarrolladas en .NET. • Supervisión del mantenimiento preventivo y correctivo de equipos de cómputo.',
    },
  ],
  education: [
    {
      title: 'Ingeniería en Computación',
      place: 'Universidad Autónoma de San Luis Potosí',
      period: '2020 - 2025',
      detail: 'Formacion en tecnologia, programacion, bases de datos y analisis.',
    },
    {
      title: 'Becario en el Departamento de Desarrollo e Investigación',
      place: 'Universidad Autónoma de San Luis Potosí',
      period: '2023 - 2024',
      detail: 'Especializacion en desarrollo web y analisis de datos.',
    },
    {
      title: 'Participante ICPC',
      place: 'ICPC - International Collegiate Programming Contest',
      period: '2023 - 2024',
      detail: 'Participacion en competencias de programacion y resolucion de problemas.',
    },
    {
      title: 'Certificados Google Careers',
      place: ': Ciberseguridad yRedes y Seguridad Informática',
      period: '2023 - 2024',
      detail: 'Certificaciones en ciberseguridad y seguridad informática, incluyendo fundamentos de redes, protección de datos y gestión de amenazas.',
    },

    
  ],
  projects: [
    {
      name: 'Dashboard de ventas',
      type: 'Data Analytics',
      description:
        'Panel interactivo para monitorear ventas, tendencias, productos clave y rendimiento por periodo.',
      // Agrega la ruta de la imagen, por ejemplo: '/projects/dashboard-ventas.webp'.
      image: null,
      imageAlt: 'Vista previa del dashboard de ventas',
      demoUrl: "www.google.com",
      repoUrl: null,
      technologies: ['Power BI', 'SQL', 'Excel'],
    },
    {
      name: 'Sistema de inventario',
      type: 'Web App',
      description:
        'Aplicacion para registrar movimientos, alertas de stock y reportes descargables.',
      image: null,
      imageAlt: 'Vista previa del sistema de inventario',
      demoUrl: null,
      repoUrl: null,
      technologies: ['React', 'Node', 'SQLite'],
    },
    {
      name: 'Modelo de limpieza de datos',
      type: 'Automation',
      description:
        'Pipeline en Python para normalizar archivos, detectar errores y generar un resumen ejecutivo.',
      image: null,
      imageAlt: 'Vista previa del modelo de limpieza de datos',
      demoUrl: null,
      repoUrl: null,
      technologies: ['Python', 'Pandas', 'Jupyter'],
    },
  ],
};

const hubNodes = [
  {
    id: 'herramientas',
    label: 'Herramientas',
    title: 'Stack tecnico',
    text: 'Python, SQL, React, BI y automatizacion.',
    stat: `${profile.tools.length} skills`,
    position: 'topLeft',
    tone: 'cyan',
    preview: ['Python', 'SQL', 'React'],
  },
  {
    id: 'experiencia',
    label: 'Experiencia Profesional',
    title: 'Software Engineer',
    text: '3 años de experiencia profesional',
    stat: `${profile.experience.length} roles`,
    position: 'topRight',
    tone: 'gold',
    preview: profile.experience.map((item) => item.role),
  },
  {
    id: 'educacion',
    label: 'Educacion',
    title: 'Formacion',
    text: 'Carrera, internships, diplomados y practica.',
    stat: `${profile.education.length} rutas`,
    position: 'bottomLeft',
    tone: 'violet',
    preview: profile.education.map((item) => item.title),
  },
  {
    id: 'proyectos',
    label: 'Proyectos',
    title: 'Laboratorio',
    text: 'Proyectos personales y Freelance.',
    stat: `${profile.projects.length} builds`,
    position: 'bottomRight',
    tone: 'coral',
    preview: profile.projects.map((item) => item.name),
  },
];

const toolIcons = {
  React: Atom,
  Laravel: Blocks,
  Python: TerminalSquare,
  SQL: Database,
  'Power BI': BarChart3,
  Excel: FileSpreadsheet,
  Pandas: Table2,
  JavaScript: Code2,
  Git: GitBranch,
};

function App() {
  React.useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.22 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <Navigation />
      <section className="hero section" id="inicio">
        <div className="heroIntro">

          <h1>{profile.name}</h1>
          <p className="role">{profile.role}</p>
          <p className="intro">{profile.intro}</p>
          <div className="metaLine">
            <span>
              <MapPin size={16} />
              {profile.location}
            </span>
            <span>
              <TerminalSquare size={16} />
              Disponible para proyectos data + web
            </span>
          </div>
        </div>
        <React.Suspense fallback={<div className="dataCore dataCoreHub dataCoreLoading" aria-hidden="true" />}>
          <DataCore nodes={hubNodes} />
        </React.Suspense>
        <div className="heroActions heroActionsFloating">
          <a className="primaryButton" href="#proyectos">
            Ver proyectos
            <ArrowUpRight size={18} />
          </a>
          <a className="ghostButton" href={`mailto:${profile.email}`}>
            <Mail size={18} />
            Contacto
          </a>
        </div>
      </section>

      <SectionHeader
        id="herramientas"
        icon={<Code2 />}
        kicker="Stack principal"
        title="Herramientas con las que trabajo"
        copy="Una mezcla entre desarrollo, analisis y presentacion de informacion."
      />
      <ToolsCarousel tools={profile.tools} />

      <SectionHeader
        id="experiencia"
        icon={<BriefcaseBusiness />}
        kicker=""
        title="Experiencia profesional"
      />
      <Timeline items={profile.experience} />

      <SectionHeader
        id="educacion"
        icon={<GraduationCap />}
        kicker="Formacion"
        title="Educacion, internships y diplomados"
        copy="Bases academicas y aprendizaje practico que sostienen mi perfil profesional."
      />
      <EducationCarousel items={profile.education} />

      <SectionHeader
        id="proyectos"
        icon={<BarChart3 />}
        kicker="Laboratorio personal"
        title="Proyectos"
        copy="Ideas propias para demostrar criterio, curiosidad y capacidad de entregar algo usable."
      />
      <section className="projectGrid showcaseSection" data-reveal>
        {profile.projects.map((project, index) => (
          <ProjectCard project={project} index={index} key={project.name} />
        ))}
      </section>

      <section className="contactBand contactFinal" id="contacto" data-reveal>
        <h2>
          ¿Tienes algun <span>proyecto</span> en mente?
        </h2>
        <p>Estoy siempre abierto a nuevas ofertas, con gusto escribeme</p>
        <a className="primaryButton" href={`mailto:${profile.email}`}>
          <Mail size={18} />
          Mandar mensaje
        </a>
      </section>
    </main>
  );
}

function Navigation() {
  return (
    <nav className="nav">
      <a href="#inicio" className="brand">
        Portfolio Luis Autran
      </a>
      <div className="navLinks">
        <a href="#herramientas">Herramientas</a>
        <a href="#experiencia">Experiencia</a>
        <a href="#educacion">Educacion</a>
        <a href="#proyectos">Proyectos</a>
      </div>
    </nav>
  );
}

function SectionHeader({ id, icon, kicker, title, copy }) {
  return (
    <section className="sectionHeader" id={id} data-reveal>
      <div className="headerIcon">{icon}</div>
      <div>
        <p>{kicker}</p>
        <h2>{title}</h2>
        <span>{copy}</span>
      </div>
    </section>
  );
}

function ToolCard({ tool, index }) {
  const Icon = toolIcons[tool] || Code2;

  return (
    <article className="toolCard spotlightCard" style={{ '--delay': `${index * 70}ms` }}>
      <div className="toolIcon">
        <Icon size={26} />
      </div>
      <span>{tool}</span>
      <small>{getToolLabel(tool)}</small>
    </article>
  );
}

function ToolsCarousel({ tools }) {
  const duplicatedTools = [...tools, ...tools];

  return (
    <section className="toolCarousel" aria-label="Herramientas y tecnologias">
      <div className="toolCarouselTrack">
        {duplicatedTools.map((tool, index) => (
          <ToolCard tool={tool} index={index} key={`${tool}-${index}`} />
        ))}
      </div>
    </section>
  );
}

function getToolLabel(tool) {
  const labels = {
    React: 'Interfaces',
    Laravel: 'Backend',
    Python: 'Automatizacion',
    SQL: 'Datos',
    'Power BI': 'Dashboards',
    Excel: 'Analisis',
    Pandas: 'DataFrames',
    JavaScript: 'Web',
    Git: 'Versionado',
  };

  return labels[tool] || 'Herramienta';
}

function Timeline({ items, compact = false }) {
  return (
    <section className={compact ? 'timeline compact showcaseSection' : 'timeline showcaseSection'} data-reveal>
      {items.map((item, index) => (
        <article
          className="timelineItem spotlightCard"
          key={`${item.title || item.role}-${item.period}`}
          style={{ '--delay': `${index * 90}ms` }}
        >
          <time>{item.period}</time>
          <div>
            <h3>{item.role || item.title}</h3>
            <strong>{item.company || item.place}</strong>
            <p>{item.detail}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

function EducationCarousel({ items }) {
  const carouselItems = [...items, ...items];

  return (
    <section className="educationCarousel showcaseSection" data-reveal>
      <div className="carouselViewport">
        <div className="carouselTrack">
        {carouselItems.map((item, index) => (
          <article
            className="educationCard spotlightCard"
            key={`${item.title}-${item.period}-${index}`}
            style={{ '--delay': `${index * 80}ms` }}
            aria-hidden={index >= items.length}
          >
            <time>{item.period}</time>
            <div>
              <h3>{item.title}</h3>
              <strong>{item.place}</strong>
              <p>{item.detail}</p>
            </div>
          </article>
        ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const hasImage = Boolean(project.image);
  const technologies = project.technologies || [];
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isPreviewOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsPreviewOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isPreviewOpen]);

  return (
    <article className="projectCard spotlightCard" style={{ '--index': index }}>
      <div className="projectPreview">
        {hasImage ? (
          <img src={project.image} alt={project.imageAlt || `Preview de ${project.name}`} />
        ) : (
          <div className="generatedPreview projectPreviewPlaceholder" role="img" aria-label={`Agrega una imagen de preview para ${project.name}`}>
            <span />
            <span />
            <span />
            <i />
          </div>
        )}
        <button
          className="projectPreviewAction"
          type="button"
          aria-label={`Ver preview ampliado de ${project.name}`}
          onClick={() => setIsPreviewOpen(true)}
        >
          <Maximize2 size={16} />
          Ver
        </button>
      </div>
      <div className="projectContent">
        <span className="projectType">{project.type}</span>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
      </div>
      <div className="projectTechnologies" aria-label={`Tecnologias usadas en ${project.name}`}>
        <span className="projectTechnologiesLabel">Tecnologias</span>
        <div className="stackList">
          {technologies.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
      {(project.demoUrl || project.repoUrl) && (
        <div className="projectActions">
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noreferrer">
              <MonitorPlay size={16} />
              Ver demo
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noreferrer">
              <ExternalLink size={16} />
              Ver codigo
            </a>
          )}
        </div>
      )}
      {isPreviewOpen && createPortal(
        <div className="previewModal" role="dialog" aria-modal="true" aria-label={`Preview de ${project.name}`} onClick={() => setIsPreviewOpen(false)}>
          <div className="previewModalContent" onClick={(event) => event.stopPropagation()}>
            <button className="previewModalClose" type="button" aria-label="Cerrar preview" onClick={() => setIsPreviewOpen(false)}>
              <X size={20} />
            </button>
            {hasImage ? (
              <img src={project.image} alt={project.imageAlt || `Preview de ${project.name}`} />
            ) : (
              <div className="generatedPreview previewModalPlaceholder" role="img" aria-label={`Preview de ${project.name}`}>
                <span />
                <span />
                <span />
                <i />
              </div>
            )}
            <p>{project.name}</p>
          </div>
        </div>,
        document.body
      )}
    </article>
  );
}

createRoot(document.getElementById('root')).render(<App />);
