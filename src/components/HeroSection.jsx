"use client";
import React, { useState, useEffect, useRef } from "react";
// Acordate de importar tus iconos
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiPhp,
  SiMysql,
  SiGithub,
  SiHtml5,
  SiCss,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import "../styles/HeroSection.css";

const HeroSection = () => {
  const [transformX, setTransformX] = useState(0);

  // Referencias seguras para React
  const trackRef = useRef(null);
  const infoSectionRef = useRef(null); // <-- NUEVA REFERENCIA

  // --- 1. Lógica de Sticky Scroll ---
  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current) return;
      const trackTop = trackRef.current.offsetTop;
      const trackHeight = trackRef.current.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (
        scrollY >= trackTop &&
        scrollY <= trackTop + trackHeight - windowHeight
      ) {
        const scrollInside = scrollY - trackTop;
        setTransformX(-scrollInside * 1.0);
      } else if (scrollY < trackTop) {
        setTransformX(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- 2. Lógica de Scroll Reveal CORREGIDA ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Hacemos que la animación se dispare solo una vez
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Se activa cuando asoma un 10% del elemento
        rootMargin: "0px 0px -50px 0px", // Margen de seguridad para que la animación empiece un poquito antes
      },
    );

    // Ahora buscamos los elementos DENTRO de la referencia, asegurando que existen
    if (infoSectionRef.current) {
      const hiddenElements =
        infoSectionRef.current.querySelectorAll(".reveal-on-scroll");
      hiddenElements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []); // Array vacío para que corra solo al montar el componente

  // --- 3. Datos del Stack ---
  const techStack = [
    { name: "React", icon: <SiReact /> },
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "JavaScript", icon: <SiJavascript /> },
    { name: "TypeScript", icon: <SiTypescript /> },
    { name: "Python", icon: <SiPython /> },
    { name: "PHP", icon: <SiPhp /> },
    { name: "MySQL", icon: <SiMysql /> },
    { name: "GitHub", icon: <SiGithub /> },
    { name: "APIs", icon: <TbApi /> },
    { name: "HTML", icon: <SiHtml5 /> },
    { name: "CSS", icon: <SiCss /> },
  ];

  return (
    <>
      <section id="home" className="hero-track" ref={trackRef}>
        <div className="hero-sticky cinema-layout">
          <div className="cinema-border top"></div>
          <div className="cinema-video-container">
            <video
              className="hero-background-video"
              autoPlay
              loop
              muted
              playsInline
              src="/background-video.mp4"
            />
            <div className="video-filter-overlay"></div>
            <div
              className="marquee-container"
              style={{ transform: `translateX(${transformX}px)` }}
            >
              <h1 className="massive-text">SOFTWARE DEVELOPER</h1>
              <h1 className="massive-text outline">SOFTWARE DEVELOPER</h1>
            </div>
          </div>
          <div className="cinema-border bottom"></div>
        </div>
      </section>

      {/* --- LE AGREGAMOS EL REF A LA SECCIÓN --- */}
      <section className="info-section" ref={infoSectionRef}>
        <div className="info-grid">
          <div
            className="info-column reveal-on-scroll"
            style={{ transitionDelay: "0s" }}
          >
            <h3 className="info-title">/ FRONTEND</h3>
            <p className="info-text">
              Creación de interfaces dinámicas, rápidas y escalables. Enfoque
              centrado en el usuario utilizando{" "}
              <strong>React, Next.js, TypeScript y JavaScript moderno</strong>{" "}
              para experiencias fluidas en el navegador.
            </p>
          </div>
          <div
            className="info-column reveal-on-scroll"
            style={{ transitionDelay: "0.1s" }}
          >
            <h3 className="info-title">/ BACKEND & DATA</h3>
            <p className="info-text">
              Arquitecturas robustas y seguras. Diseño e implementación de{" "}
              <strong>
                APIs RESTful, Python, PHP y bases de datos relacionales como
                MySQL
              </strong>{" "}
              para soportar la lógica de negocio.
            </p>
          </div>
          <div
            className="info-column reveal-on-scroll"
            style={{ transitionDelay: "0.2s" }}
          >
            <h3 className="info-title">/ SOFT SKILLS</h3>
            <p className="info-text">
              La tecnología necesita comunicación. Alta capacidad de resolución
              de problemas complejos, trabajo en equipo, adaptabilidad y
              mentalidad de aprendizaje continuo.
            </p>
          </div>
          <div
            className="info-column reveal-on-scroll"
            style={{ transitionDelay: "0.3s" }}
          >
            <h3 className="info-title">/ WORKFLOW</h3>
            <p className="info-text">
              Código limpio y colaborativo. Dominio de{" "}
              <strong>HTML, CSS y control de versiones con GitHub</strong> para
              asegurar integraciones continuas y despliegues sin fricciones.
            </p>
          </div>
        </div>

        <div
          className="stack-container reveal-on-scroll"
          style={{ transitionDelay: "0.4s" }}
        >
          <h3 className="info-title">/ TECH STACK & TOOLS</h3>

          <div className="stack-grid">
            {techStack.map((tech, index) => (
              <div key={index} className="tech-wrapper">
                <span className="tech-icon">{tech.icon}</span>
                <span className="tech-item">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
