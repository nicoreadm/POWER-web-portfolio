"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import "../styles/Header.css";

const Header = () => {
  // --- ESTADOS BÁSICOS ---
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // --- ESTADOS PARA TEXTO Y ANIMACIÓN ---
  const [headerText, setHeaderText] = useState("POWER !");
  const [isLogoHidden, setIsLogoHidden] = useState(false);
  const [targetText, setTargetText] = useState("POWER !");

  const logoChars = headerText.split("");

  // --- LÓGICA DE SCROLL Y CÁLCULO DE ZONAS ---
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

          // 1. ZONA CONTACTO
          // Se muestra cuando el footer asoma un 15% (0.85) y se oculta cuando llega a la mitad (0.55)
          if (contactTop <= vh * 0.1) {
            currentTarget = contactTop <= vh * -0.001 ? "" : "CONTACTO";
          }
          // 2. ZONA CLIENTES
          else if (heroBottom <= vh / 2) {
            currentTarget = "CLIENTES ";
          }
          // 3. ZONA WORK
          else if (workTop <= 100) {
            currentTarget = workTop <= -100 ? "" : "MI TRABAJO";
          }
          // 4. TRANSICIÓN HOME -> WORK
          else if (scrollY > 50) {
            currentTarget = "";
          }
          // 5. HOME
          else {
            currentTarget = "POWER !";
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

  // --- ORQUESTADOR DE ANIMACIÓN CSS ---
  useEffect(() => {
    if (targetText === "") {
      setIsLogoHidden(true);
      return;
    }

    if (targetText !== "" && targetText !== headerText) {
      const hideTimeout = setTimeout(() => {
        setIsLogoHidden(true);
      }, 0);

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

  // --- LÓGICA DE MENÚ Y NAVEGACIÓN ---
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

  // --- RENDERIZADO DEL COMPONENTE ---
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
            }`}
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
