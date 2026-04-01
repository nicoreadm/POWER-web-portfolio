"use client";
import React, { useState, useEffect } from "react";
import "../styles/Header.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // La palabra que queremos animar letra por letra
  const logoString = "POWER !";
  const logoChars = logoString.split(""); // Lo separa en ['P','O','W','E','R',' ','!']

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

  const handleLinkClick = (sectionName) => {
    setActiveSection(sectionName);
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        {/* --- LOGO ANIMADO LETRA POR LETRA --- */}
        <div className={`logo-container ${isScrolled ? "hide-logo" : ""}`}>
          <h1 className="logo-text">
            {logoChars.map((char, index) => (
              <span
                key={index}
                className="logo-char"
                // Le pasamos el índice a CSS para calcular el retraso de la animación
                style={{ "--char-index": index }}
              >
                {/* Si es un espacio, forzamos que lo respete con un espacio irrompible */}
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
        </div>

        {/* --- Controles de la Derecha (Se mantiene igual) --- */}
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

            {/* Menú Desplegable (Mantenemos tu código igual) */}
            <nav className={`dropdown-menu ${isMenuOpen ? "open" : ""}`}>
              <ul>
                <li>
                  <a
                    href="#home"
                    className={activeSection === "home" ? "active-section" : ""}
                    onClick={() => handleLinkClick("home")}
                  >
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
                    Studio
                  </a>
                </li>
                <li>
                  <a
                    href="#work"
                    className={activeSection === "work" ? "active-section" : ""}
                    onClick={() => handleLinkClick("work")}
                  >
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
