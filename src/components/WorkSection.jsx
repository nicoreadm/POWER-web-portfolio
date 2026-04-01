"use client";
import React, { useState } from "react";
import Link from "next/link"; // Usamos Link de Next.js
import "../styles/WorkSection.css"; // Ajustá la ruta

const WorkSection = () => {
  // --- ESTADO PARA EL DESPLIEGUE ---
  // Guardamos el ID del proyecto que está actualmente expandido
  const [expandedProjectId, setExpandedProjectId] = useState(null);

  // --- DATOS DE LOS PROYECTOS (Actualizados con detalles) ---
  const projects = [
    {
      id: "01",
      name: "MORIZZIO",
      role: "Real Estate App",
      image: "/morizzio-preview.jpg", // Asegurate de tener esta foto en /public
      technologies: [
        "Next.js",
        "Prisma",
        "PostgreSQL",
        "Google Maps API",
        "Docker",
      ],
      details:
        "Diseño y desarrollo de una plataforma completa para el sector inmobiliario de lujo. Incluye panel de control para agentes, rastreo de propiedades en tiempo real y sistema de autenticación avanzada.",
      liveUrl: "https://morizzio.vercel.app",
    },
    {
      id: "02",
      name: "EMPRETIENDA DARK",
      role: "Open Source CSS Theme",
      image: "/empretienda-preview.jpg",
      technologies: ["JavaScript", "CSS3 (SCSS)", "Themes", "UX/UI"],
      details:
        "Primer y único tema oscuro para Empretienda. Desarrollado con enfoque en el usuario y la legibilidad en pantallas AMOLED. Código libre para la comunidad.",
      liveUrl: "https://github.com/nicolashofid/empretienda-dark",
    },
    {
      id: "03",
      name: "AUTH SYSTEM",
      role: "Authentication System",
      image: "/auth-preview.jpg",
      technologies: ["Next.js", "MySQL", "JWT", "Security", "Middleware"],
      details:
        "Sistema de autenticación robusto y escalable. Incluye Middlewares de seguridad, manejo de Refresh Tokens y persistencia de sesión con MySQL.",
      liveUrl: "https://auth-system-project.com",
    },
  ];

  // Función para alternar (toggle) el despliegue de un proyecto
  const toggleProject = (projectId) => {
    // Si hacés clic en el que ya está expandido, se colapsa.
    // Si hacés clic en otro, se colapsa el actual y se expande el nuevo.
    setExpandedProjectId(expandedProjectId === projectId ? null : projectId);
  };

  return (
    <section className="work-section" id="work">
      <div className="work-header">
        <h2 className="work-title">/ SELECTED WORK</h2>
      </div>

      <div className="work-list">
        {projects.map((project, index) => {
          const isExpanded = expandedProjectId === project.id;

          return (
            <div
              key={project.id}
              className={`work-row ${isExpanded ? "expanded" : ""}`}
              onClick={() => toggleProject(project.id)}
            >
              {/* --- PARTE SUPERIOR (Visible Siempre) --- */}
              <div className="row-header">
                <div className="work-info">
                  <span className="work-id">{project.id}</span>
                  <h3 className="work-name">{project.name}</h3>
                </div>
                {/* El rol se fada y sube un poquito cuando se expande el resto */}
                <span className={`work-role ${isExpanded ? "is-faded" : ""}`}>
                  {project.role}
                </span>
              </div>

              {/* --- DETALLES DESPLEGABLES (Ocultos por defecto) --- */}
              {/* Esta es la cortina suave que se abre hacia abajo */}
              <div className="row-details">
                <div className="detail-inner-content">
                  {/* Imagen Estática Grande */}
                  <div className="detail-image-wrapper">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="detail-image"
                    />
                  </div>

                  {/* Información Detallada */}
                  <div className="detail-info-wrapper">
                    <div className="detail-text-content">
                      <h4 className="detail-section-title">/ EL ROL /</h4>
                      <p className="detail-description">{project.details}</p>
                    </div>

                    <div className="detail-tech-content">
                      <h4 className="detail-section-title">/ TECNOLOGÍAS /</h4>
                      {/* Generamos tags amarillos para las tecnologías */}
                      <div className="tech-tags-grid">
                        {project.technologies.map((tech, tIndex) => (
                          <span key={tIndex} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* --- EL BOTÓN BRUTALISTA DE IR AL SITIO (Nueva Flecha Animada) --- */}
                    {/* Interceptamos el clic para que no se colapse la fila al hacer clic en el botón */}
                    <div
                      className="detail-actions"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        className="btn-live-site"
                      >
                        <span>IR AL SITIO REAL</span>
                        {/* Esta es la flecha animada que ya tenías en el header, pero más gruesa */}
                        <span className="btn-arrow">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WorkSection;
