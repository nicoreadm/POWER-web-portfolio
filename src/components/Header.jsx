"use client";
import React, { useState, useEffect } from "react";
import "../styles/Header.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- estado para rastrear la sección activa ---
  // Inicia en "home" por defecto
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // --- función para manejar el click en los links ---
  const handleLinkClick = (sectionName) => {
    setActiveSection(sectionName); // Guardamos la sección clickeada
    setIsMenuOpen(false); // Cerramos el menú
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        {/* --- Logo --- */}
        <div className={`logo-container ${isScrolled ? "hide-logo" : ""}`}>
          <h1 className="logo-text">POWER !</h1>
        </div>

        {/* --- Controles de la Derecha --- */}
        <div className="controls-container">
          {/* Botón Chat */}
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
            {/* Botón Menú / Close */}
            <button className="btn-menu" onClick={toggleMenu}>
              <span className="menu-text">
                {isMenuOpen ? "CERRAR" : "MENU"}
              </span>
              <span className={`icon-dots ${isMenuOpen ? "vertical" : ""}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <circle cx="7" cy="12" r="2"></circle>
                  <circle cx="17" cy="12" r="2"></circle>
                </svg>
              </span>
            </button>

            {/* --- Menú Desplegable --- */}
            <nav className={`dropdown-menu ${isMenuOpen ? "open" : ""}`}>
              <ul>
                <li>
                  {/* clase condicional active-section si coincide el estado */}
                  <a
                    href="#home"
                    className={activeSection === "home" ? "active-section" : ""}
                    onClick={() => handleLinkClick("home")}
                  >
                    <span className="link-arrow">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#studio"
                    className={
                      activeSection === "studio" ? "active-section" : ""
                    }
                    onClick={() => handleLinkClick("studio")}
                  >
                    <span className="link-arrow">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                    Studio
                  </a>
                </li>
                <li>
                  <a
                    href="#work"
                    className={activeSection === "work" ? "active-section" : ""}
                    onClick={() => handleLinkClick("work")}
                  >
                    <span className="link-arrow">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                    Work
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className={
                      activeSection === "contact" ? "active-section" : ""
                    }
                    onClick={() => handleLinkClick("contact")}
                  >
                    <span className="link-arrow">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
