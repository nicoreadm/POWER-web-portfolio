"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import "../styles/Header.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [headerText, setHeaderText] = useState("POWER !");
  const [isLogoHidden, setIsLogoHidden] = useState(false);
  const [targetText, setTargetText] = useState("POWER !");

  // --- NUEVO: ESTADO PARA EL BOTÓN DINÁMICO ---
  // Modos: "chat" (manda a contacto) | "work" (manda a work)
  const [chatBtnMode, setChatBtnMode] = useState("chat");

  const logoChars = headerText.split("");

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

          let currentTarget = "POWER !";

          // Lógica de Título y Modo de Botón
          if (contactTop <= vh * 0.9) {
            currentTarget = contactTop <= vh * -0.001 ? "" : "CONTACTO";
            setChatBtnMode("work"); // Cambia a "Ver mi trabajo" en el footer
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
            currentTarget = "POWER !";
            setChatBtnMode("chat");
          }
          setTargetText(currentTarget);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Orquestador de animación de letras (Logo)
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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
    { name: "Contact", id: "contact" },
  ];

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        {/* LOGO */}
        <div className={`logo-container ${isLogoHidden ? "hide-logo" : ""}`}>
          <h1
            className={`logo-text ${headerText === "MI TRABAJO" || headerText === "CONTACTO" ? "text-white" : ""}`}
          >
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

        {/* CONTROLES */}
        <div className="controls-container">
          <button
            className="btn-chat-dynamic"
            onClick={(e) =>
              handleLinkClick(e, chatBtnMode === "chat" ? "contact" : "work")
            }
          >
            {/* Contenedor con overflow hidden */}
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
