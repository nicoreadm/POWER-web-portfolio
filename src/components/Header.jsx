"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeContext"; // Ajusta la ruta si es necesario
import "../styles/Header.css";

// --- DICCIONARIO DE TEMAS ---
const THEMES_CONFIG = {
  heart: {
    id: "heart",
    title: "HEART !",
    gif: "/heart-head.gif", // Reemplaza con la ruta real de tu gif
  },
  power: {
    id: "power",
    title: "POWER !",
    gif: "/power-head.gif",
  },
  gyro: {
    id: "gyro",
    title: "GO GO ZEPPELI!",
    gif: "/gyro-head.gif", // Reemplaza con la ruta real
  },
  teto: {
    id: "teto",
    title: "KASANE TETO",
    gif: "/teto-head.gif", // Reemplaza con la ruta real
  },
};

const Header = () => {
  const { theme, changeTheme } = useTheme();

  const currentThemeData = THEMES_CONFIG[theme] || THEMES_CONFIG.heart;

  const [isScrolled, setIsScrolled] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const [activeSection, setActiveSection] = useState("home");

  const [headerText, setHeaderText] = useState(currentThemeData.title);
  const [isLogoHidden, setIsLogoHidden] = useState(false);
  const [targetText, setTargetText] = useState(currentThemeData.title);

  const [chatBtnMode, setChatBtnMode] = useState("chat");

  const logoChars = headerText.split("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsThemeMenuOpen(false);
  };

  const toggleThemeMenu = () => {
    setIsThemeMenuOpen(!isThemeMenuOpen);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    let rafId;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        setIsScrolled(scrollY > 50);

        const heroWrapper = document.querySelector(".reveal-wrapper");
        const workSection = document.getElementById("work");
        const contactSection = document.getElementById("contact");

        if (heroWrapper && workSection) {
          const heroBottom = heroWrapper.getBoundingClientRect().bottom;
          const workTop = workSection.getBoundingClientRect().top;
          const contactTop = contactSection
            ? contactSection.getBoundingClientRect().top
            : Infinity;
          const vh = window.innerHeight;

          let currentTarget = currentThemeData.title;

          if (contactTop <= vh * 0.9) {
            currentTarget = contactTop <= vh * -0.001 ? "" : "CONTACTO";
            setChatBtnMode("work");
          } else if (heroBottom <= vh / 2) {
            currentTarget = "CLIENTES ";
            setChatBtnMode("chat");
          } else if (workTop <= 100) {
            currentTarget = workTop <= -100 ? "" : "MI TRABAJO";
            setChatBtnMode("chat");
          } else if (scrollY > 50) {
            currentTarget = "";
            setChatBtnMode("chat");
          } else {
            currentTarget = currentThemeData.title;
            setChatBtnMode("chat");
          }
          setTargetText(currentTarget);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    if (window.scrollY <= 50) {
      setTargetText(currentThemeData.title);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [theme, currentThemeData.title]);

  useEffect(() => {
    if (targetText === "") {
      setIsLogoHidden(true);
      return;
    }
    if (targetText !== "" && targetText !== headerText) {
      const hideTimeout = setTimeout(() => setIsLogoHidden(true), 0);
      const swapTimeout = setTimeout(() => {
        setHeaderText(targetText);
        setIsLogoHidden(false);
      }, 400);
      return () => {
        clearTimeout(hideTimeout);
        clearTimeout(swapTimeout);
      };
    }
    if (targetText !== "" && targetText === headerText && isLogoHidden) {
      setIsLogoHidden(false);
    }
  }, [targetText, headerText, isLogoHidden]);

  const handleLinkClick = (e, sectionId) => {
    if (e) e.preventDefault();
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
    { name: "Contacto", id: "contact" },
  ];

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        {/* LOGO CONTAINER CON GIF DINÁMICO */}
        <div className={`logo-container ${isLogoHidden ? "hide-logo" : ""}`}>
          <h1
            className={`logo-text ${
              // Aquí está el cambio: Se aplica la clase .text-white siempre que el texto sea MI TRABAJO o CONTACTO
              headerText === "MI TRABAJO" || headerText === "CONTACTO"
                ? "text-white"
                : ""
            }`}
          >
            {headerText === currentThemeData.title && (
              <span
                className="logo-char power-gif-container"
                style={{ "--char-index": 0 }}
              >
                <img
                  src={currentThemeData.gif}
                  alt={currentThemeData.id}
                  className="power-gif-circle"
                />
              </span>
            )}

            {logoChars.map((char, index) => (
              <span
                key={index}
                className="logo-char"
                style={{
                  "--char-index":
                    headerText === currentThemeData.title ? index + 1 : index,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
        </div>

        {/* CONTROLES */}
        <div className="controls-container">
          {/* 1. BOTÓN DINÁMICO (CHATEA/TRABAJO) */}
          <button
            className="btn-chat-dynamic"
            onClick={(e) =>
              handleLinkClick(e, chatBtnMode === "chat" ? "contact" : "work")
            }
          >
            <div className="roll-visual-area">
              <div className={`roll-container ${chatBtnMode}`}>
                <span className="roll-text">CHATEA CON NICO</span>
                <span className="roll-text">VER MI TRABAJO</span>
              </div>
            </div>
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
                {chatBtnMode === "chat" ? (
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                ) : (
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                )}
              </svg>
            </span>
          </button>

          {/* 2. MENÚ ORIGINAL DE NAVEGACIÓN */}
          <div className="menu-wrapper">
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

          {/* 3. MENÚ DE TEMAS */}
          <div className="menu-wrapper">
            <button className="btn-menu" onClick={toggleThemeMenu}>
              <span className="menu-text">
                {isThemeMenuOpen ? "CLOSE" : "TEMA"}
              </span>
              <span
                className={`icon-dots ${isThemeMenuOpen ? "vertical" : ""}`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5"></circle>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
                </svg>
              </span>
            </button>

            <nav className={`dropdown-menu ${isThemeMenuOpen ? "open" : ""}`}>
              <ul>
                {Object.values(THEMES_CONFIG).map((t) => (
                  <li key={t.id}>
                    <button
                      /* La clase active-section se activa si el tema es el actual */
                      className={`theme-select-btn ${theme === t.id ? "active-section" : ""}`}
                      onClick={() => {
                        changeTheme(t.id);
                        setIsThemeMenuOpen(false);
                      }}
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
                      {t.id.toUpperCase()}
                    </button>
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
