"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeContext";
export function Preloader({
  name = "Nicolás Muñoz Read",
  role = "Software Developer",
  tagline = "Salta / Argentina",
  year = "2026",
  onComplete,
}) {
  const { theme } = useTheme(); // Consumimos el contexto (asegura que Preloader esté dentro de ThemeProvider)

  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading");
  const [lineVisible, setLineVisible] = useState(false);
  const [textRevealed, setTextRevealed] = useState(false);

  // Título solicitado
  const brand = "DOSSIER";

  useEffect(() => {
    const lineTimer = setTimeout(() => setLineVisible(true), 100);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const increment =
          prev < 80 ? Math.random() * 3 + 1 : Math.random() * 0.5 + 0.2;
        return Math.min(prev + increment, 100);
      });
    }, 50);

    const textTimer = setTimeout(() => setTextRevealed(true), 400);
    const revealTimer = setTimeout(() => setPhase("reveal"), 3000);

    const exitTimer = setTimeout(() => {
      setPhase("exit");
      if (onComplete) onComplete();
    }, 4000);

    return () => {
      clearTimeout(lineTimer);
      clearTimeout(textTimer);
      clearTimeout(revealTimer);
      clearTimeout(exitTimer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center transition-all duration-700 ease-out ${
        phase === "exit" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        backgroundColor: "#0a0a0a", // Fondo negro forzado siempre
      }}
    >
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 flex items-center gap-3">
        <div
          className={`h-2 w-2 rounded-full transition-all duration-500 ${
            lineVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
          style={{
            backgroundColor: "var(--theme-accent)",
          }}
        />
        <span
          className={`text-xs tracking-[0.3em] text-neutral-400 uppercase transition-all duration-500 delay-200 ${
            lineVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-4"
          }`}
        >
          Portfolio
        </span>
      </div>

      <div className="absolute top-8 right-8">
        <span
          className={`text-xs tracking-[0.2em] text-neutral-400 transition-all duration-500 delay-300 ${
            lineVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {year}
        </span>
      </div>

      {/* Main content */}
      <div className="relative flex flex-col items-center px-6">
        {/* Brand name */}
        <div className="overflow-hidden mb-8">
          <h2
            className={`text-[clamp(2.5rem,10vw,8rem)] font-bold tracking-tighter leading-none transition-all duration-700 ease-out text-center ${
              textRevealed
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
            style={{
              color: "var(--theme-accent)", // Lee el color desde tu CSS
              textShadow: "0 0 30px rgba(255, 255, 255, 0.1)",
            }}
          >
            {brand}
          </h2>
        </div>

        {/* Animated line (Barra de progreso) */}
        <div className="relative w-full max-w-md h-[1px] mb-8">
          <div className="absolute inset-0 bg-neutral-800" />
          <div
            className="absolute left-0 top-0 h-full transition-all duration-1000 ease-out"
            style={{
              width: `${progress}%`,
              backgroundColor: "var(--theme-accent)", // Lee el color desde tu CSS
            }}
          />
        </div>

        {/* Name and role */}
        <div className="text-center space-y-2 mb-6">
          <div className="overflow-hidden">
            <h1
              className={`text-2xl md:text-3xl font-medium tracking-tight text-white transition-all duration-500 delay-500 ${
                textRevealed
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0"
              }`}
            >
              {name}
            </h1>
          </div>
          <div className="overflow-hidden">
            <p
              className={`text-sm md:text-base tracking-[0.2em] uppercase text-neutral-400 transition-all duration-500 delay-700 ${
                textRevealed
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0"
              }`}
            >
              {role}
            </p>
          </div>
        </div>

        {/* Tagline */}
        <div className="overflow-hidden">
          <p
            className={`text-sm text-neutral-400 italic transition-all duration-500 delay-[900ms] ${
              textRevealed
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
          >
            {tagline}
          </p>
        </div>

        {/* Loading percentage */}
        <div
          className={`absolute -bottom-16 left-1/2 -translate-x-1/2 transition-all duration-500 delay-200 ${
            lineVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-xs tracking-[0.3em] text-neutral-400 font-mono">
            {Math.round(progress).toString().padStart(3, "0")}%
          </span>
        </div>
      </div>

      {/* Bottom decorations */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
        <div
          className={`space-y-1 transition-all duration-500 delay-400 ${
            lineVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-xs tracking-[0.2em] text-neutral-400 uppercase">
            Loading
          </p>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse"
                style={{ animationDelay: `${i * 200}ms` }}
              />
            ))}
          </div>
        </div>

        <div
          className={`text-right transition-all duration-500 delay-500 ${
            lineVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-xs tracking-[0.15em] text-neutral-400">
            Scroll to explore
          </p>
        </div>
      </div>

      {/* Reveal overlays */}
      {/* Cortina 1: Toma el color del tema actual */}
      <div
        className={`absolute inset-0 origin-bottom transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          phase === "reveal" || phase === "exit" ? "scale-y-100" : "scale-y-0"
        }`}
        style={{
          backgroundColor: "var(--theme-accent)", // Lee el color desde tu CSS
        }}
      />
      {/* Cortina 2: Negra para descubrir la web */}
      <div
        className={`absolute inset-0 bg-[#0a0a0a] origin-bottom transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] delay-200 ${
          phase === "exit" ? "scale-y-100" : "scale-y-0"
        }`}
      />
    </div>
  );
}

export default Preloader;
