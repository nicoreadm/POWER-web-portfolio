"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import "../styles/Header.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // --- NUEVOS ESTADOS PARA EL TEXTO DINÁMICO ---
  const [headerText, setHeaderText] = useState("POWER !");
  const [isLogoHidden, setIsLogoHidden] = useState(false);

  // Generamos el array de letras basado en el estado actual
  const logoChars = headerText.split("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Control del fondo del header (blur)
      setIsScrolled(scrollY > 50);

      // --- LÓGICA DE APARICIÓN Y CAMBIO DE TEXTO ---
      const revealWrapper = document.querySelector(".reveal-wrapper");

      if (revealWrapper) {
        // Punto exacto donde la cortina amarilla revela la sección de clientes
        const clientsTrigger =
          revealWrapper.offsetTop +
          revealWrapper.offsetHeight -
          window.innerHeight / 1.5;

        // Punto medio de la cortina amarilla (acá cambiamos el texto en silencio)
        const textChangeTrigger =
          revealWrapper.offsetTop + revealWrapper.offsetHeight / 2;

        // 1. Mostrar u ocultar el logo
        if (scrollY >= clientsTrigger) {
          setIsLogoHidden(false); // Mostrar en Clientes
        } else if (scrollY > 10) {
          setIsLogoHidden(true); // Ocultar durante el scroll
        } else {
          setIsLogoHidden(false); // Mostrar en el Home (arriba de todo)
        }

        // 2. Cambiar el texto silenciosamente mientras está oculto
        if (scrollY >= textChangeTrigger) {
          setHeaderText("/ CLIENTES --");
        } else {
          setHeaderText("POWER !");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    setActiveSection(sectionId);
    setIsMenuOpen(false);

    if (sectionId === "clientes") {
      const heroWrapper = document.querySelector(".reveal-wrapper");
      if (heroWrapper) {
        const targetY = heroWrapper.offsetTop + heroWrapper.offsetHeight;
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Work", id: "work" },
    { name: "Clientes", id: "clientes" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        {/* --- LOGO ANIMADO DINÁMICO --- */}
        {/* Usamos isLogoHidden en lugar de isScrolled para ocultarlo */}
        <div className={`logo-container ${isLogoHidden ? "hide-logo" : ""}`}>
          <h1 className="logo-text">
            {logoChars.map((char, index) => (
              <span
                key={index}
                className="logo-char"
                style={{ "--char-index": index }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
        </div>

        {/* --- Controles de la Derecha (Sin Cambios) --- */}
        <div className="controls-container">
          <button className="btn-chat">
            CHATEA CON NICO
            <span className="icon-chat">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </span>
          </button>

          <div className="menu-wrapper">
            <button className="btn-menu" onClick={toggleMenu}>
              <span className="menu-text">{isMenuOpen ? "CLOSE" : "MENU"}</span>
              <span className={`icon-dots ${isMenuOpen ? "vertical" : ""}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <circle cx="7" cy="12" r="2"></circle>
                  <circle cx="17" cy="12" r="2"></circle>
                </svg>
              </span>
            </button>

            <nav className={`dropdown-menu ${isMenuOpen ? "open" : ""}`}>
              <ul>
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={`#${link.id}`}
                      className={
                        activeSection === link.id ? "active-section" : ""
                      }
                      onClick={(e) => handleLinkClick(e, link.id)}
                    >
                      <span className="link-arrow">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
