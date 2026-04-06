"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeContext";
import "../styles/Header.css";

// --- DICCIONARIO DE TEMAS ---
const THEMES_CONFIG = {
  heart: {
    id: "heart",
    title: "HEART !",
    gif: "/heart-head.gif",
    sound: "/heart-audio.mp3",
  },
  kantan: {
    id: "kantan",
    title: "KANTAN !",
    gif: "/kantan-head.gif",
    sound: "/kantan-audio.mp3",
  },
  power: {
    id: "power",
    title: "POWER !",
    gif: "/power-head.gif",
    sound: "/power-audio.mp3",
  },
  teto: {
    id: "teto",
    title: "TETO !",
    gif: "/teto-head.gif",
    sound: "/teto-audio.mp3",
  },
  miku: {
    id: "miku",
    title: "MIKU !",
    gif: "/miku-head.gif",
    sound: "/miku-audio.mp3",
  },
  eve: {
    id: "eve",
    title: "EVE !",
    gif: "/eve-head.gif",
    sound: "/eve-audio.mp3",
  },
};

const Header = () => {
  const { theme, changeTheme } = useTheme();
  const currentThemeData = THEMES_CONFIG[theme] || THEMES_CONFIG.heart;

  // --- NUEVO: ESTADO DE MUTE ---
  const [isMuted, setIsMuted] = useState(false);

  // --- REPRODUCTORES DE AUDIO (AHORA RESPETAN EL MUTE) ---
  const audioPlay = (soundPath) => {
    if (isMuted) return; // Si está muteado, salimos de la función
    const audio = new Audio(soundPath);
    audio.volume = 0.2;
    audio.play().catch((e) => console.log("Error: ", e));
  };

  const playHoverSound = () => {
    if (isMuted) return; // Si está muteado, no reproducimos hover
    const hoverAudio = new Audio("/ui-hover.mp3");
    hoverAudio.volume = 0.1;
    hoverAudio.play().catch((e) => console.log("Error hover: ", e));
  };

  const playClickSound = () => {
    if (isMuted) return; // Si está muteado, no reproducimos click
    const clickAudio = new Audio("/ui-click.mp3");
    clickAudio.volume = 0.2;
    clickAudio.play().catch((e) => console.log("Error click: ", e));
  };

  // Función para alternar el sonido
  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Reproducimos un clickcito solo si lo estamos ENCENDIENDO
    if (isMuted) {
      const clickAudio = new Audio("/ui-click.mp3");
      clickAudio.volume = 0.2;
      clickAudio.play().catch((e) => console.log("Error click: ", e));
    }
  };

  // --- RESTO DE TUS ESTADOS ---
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

  // --- EFECTOS DE SCROLL Y LOGO (Mantenidos igual) ---
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
    if (window.scrollY <= 50) setTargetText(currentThemeData.title);
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
    { name: "Inicio", id: "home" },
    { name: "Trabajo", id: "work" },
    { name: "Clientes", id: "clientes" },
    { name: "Contacto", id: "contact" },
  ];

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        {/* LOGO */}
        <div className={`logo-container ${isLogoHidden ? "hide-logo" : ""}`}>
          <h1
            className={`logo-text ${
              headerText === "MI TRABAJO" || headerText === "CONTACTO"
                ? "text-white"
                : ""
            } ${headerText === "EVE !" ? "text-eve-orange " : ""}`}
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
            onMouseEnter={playHoverSound}
            onClick={(e) => {
              playClickSound();
              handleLinkClick(e, chatBtnMode === "chat" ? "contact" : "work");
            }}
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

          {/* 2. MENÚ DE NAVEGACIÓN */}
          <div className="menu-wrapper">
            <button
              className="btn-menu"
              onMouseEnter={playHoverSound}
              onClick={() => {
                playClickSound();
                toggleMenu();
              }}
            >
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
                      onMouseEnter={playHoverSound}
                      onClick={(e) => {
                        playClickSound();
                        handleLinkClick(e, link.id);
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
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* 3. MENÚ DE TEMAS */}
          <div className="menu-wrapper">
            <button
              className="btn-menu"
              onMouseEnter={playHoverSound}
              onClick={() => {
                playClickSound();
                toggleThemeMenu();
              }}
            >
              <span className="menu-text">
                {isThemeMenuOpen ? "CERRAR" : "TEMA"}
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
                      className={`theme-select-btn ${theme === t.id ? "active-section" : ""}`}
                      onMouseEnter={playHoverSound}
                      onClick={() => {
                        audioPlay(t.sound);
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

          {/* 4. NUEVO: BOTÓN DE MUTE */}
          <button
            className="btn-menu mute-btn" // Usamos btn-menu como base para que comparta el estilo
            onMouseEnter={playHoverSound}
            onClick={toggleMute}
            style={{ padding: "0 16px", minWidth: "auto" }} // Ajustes inline para que sea cuadradito/redondo
            title={isMuted ? "Activar Sonido" : "Silenciar"}
          >
            <span className="icon-dots">
              {isMuted ? (
                // Ícono de "Mute" (Altavoz tachado o sin ondas)
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
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <line x1="23" y1="9" x2="17" y2="15"></line>
                  <line x1="17" y1="9" x2="23" y2="15"></line>
                </svg>
              ) : (
                // Ícono de "Volumen Alto"
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
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
              )}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
