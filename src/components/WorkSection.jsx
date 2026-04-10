"use client";
import React, { useState } from "react";
import Link from "next/link";
import "../styles/WorkSection.css";

const WorkSection = () => {
  const [expandedProjectId, setExpandedProjectId] = useState(null);

  const projects = [
    {
      id: "01",
      name: "MORIZZIO",
      role: "Real Estate App",
      image: "/morizzio-preview.jpg",
      technologies: [
        "Next.js",
        "Prisma",
        "PostgreSQL",
        "Google Maps API",
        "Docker",
      ],
      details:
        "Diseño y desarrollo de una plataforma completa para el sector inmobiliario de lujo. Incluye panel de control para agentes, rastreo de propiedades en tiempo real y sistema de autenticación avanzada.",
      liveUrl: "https://morizziopropiedades.com",
      typeUrl: "IR AL SITIO REAL",
    },
    {
      id: "02",
      name: "DOSSIER PORTFOLIO",
      role: "Personal Portfolio",
      image: "/portfolio-preview.jpg",
      technologies: [
        "Next.js",
        "JavaScript",
        "CSS",
        "React",
        "Vercel BLOB Storage",
      ],
      details:
        "DOSSIER es un portfolio interactivo de alto rendimiento construido con Next.js (App Router) y React. Demuestra dominio en el desarrollo frontend moderno mediante la implementación de un sistema de temas dinámicos (Context API), manipulación de estado complejo, scroll suavizado customizado y animaciones inmersivas, manteniendo un enfoque estricto en la arquitectura del código y la experiencia de usuario (UX).",
      liveUrl: "https://github.com/nicoreadm/POWER-web-portfolio",
      typeUrl: "IR A GITHUB",
    },
    {
      id: "03",
      name: "EMPRETIENDA DARK",
      role: "Open Source CSS Theme",
      image: "/empretienda-preview.jpg",
      technologies: ["JavaScript", "CSS3 (SCSS)", "Themes", "UX/UI"],
      details:
        "Primer y único tema oscuro para Empretienda. Desarrollado con enfoque en el usuario y la legibilidad en pantallas AMOLED. Código libre para la comunidad.",
      liveUrl: "https://github.com/nicoreadm/Empretienda-Dark-Mode-CSS",
      typeUrl: "IR A GITHUB",
    },
  ];

  const toggleProject = (projectId) => {
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
              <div className="row-header">
                <div className="work-info">
                  <span className="work-id">{project.id}</span>
                  <h3 className="work-name">{project.name}</h3>
                </div>
                <span className={`work-role ${isExpanded ? "is-faded" : ""}`}>
                  {project.role}
                </span>
              </div>

              <div className="row-details">
                <div className="detail-inner-content">
                  <div className="detail-image-wrapper">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="detail-image"
                    />
                  </div>

                  <div className="detail-info-wrapper">
                    <div className="detail-text-content">
                      <h4 className="detail-section-title">
                        /¿De qué se trata?/
                      </h4>
                      <p className="detail-description">{project.details}</p>
                    </div>

                    <div className="detail-tech-content">
                      <h4 className="detail-section-title">/ TECNOLOGÍAS /</h4>
                      <div className="tech-tags-grid">
                        {project.technologies.map((tech, tIndex) => (
                          <span key={tIndex} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div
                      className="detail-actions"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        className="btn-live-site"
                      >
                        <span>{project.typeUrl}</span>
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
