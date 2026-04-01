"use client";
import React, { useState, useEffect, useRef } from "react";
import "../styles/HeroSection.css"; // Ajustá la ruta según tu proyecto

const HeroSection = () => {
  const [transformX, setTransformX] = useState(0);
  // Referencia al contenedor gigante para saber cuándo estamos scrolleando por él
  const trackRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current) return;

      // Medidas necesarias para el cálculo
      const trackTop = trackRef.current.offsetTop;
      const trackHeight = trackRef.current.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Comprobamos si el usuario está scrolleando DENTRO de nuestra sección gigante
      if (
        scrollY >= trackTop &&
        scrollY <= trackTop + trackHeight - windowHeight
      ) {
        // Calculamos cuánto scrolleó *solo dentro* de esta sección
        const scrollInside = scrollY - trackTop;

        // Movemos el texto hacia la IZQUIERDA (por eso el negativo)
        // para que vaya revelando "SOFTWARE DEVELOPER".
        // Multiplicador (ej: 1.2): si le subís el número, el texto va más rápido.
        setTransformX(-scrollInside * 1.2);
      } else if (scrollY < trackTop) {
        // Si estamos arriba del componente, nos aseguramos que esté en 0
        setTransformX(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Ejecutamos una vez al cargar por si recarga a mitad de página

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // ESTE es el contenedor alto (el que "demora" el scroll de la página)
    <section className="hero-track" ref={trackRef}>
      {/* ESTA es la pantalla amarilla que se queda "pegada" */}
      <div className="hero-sticky">
        {/* Contenedor del texto en movimiento */}
        <div
          className="marquee-container"
          style={{ transform: `translateX(${transformX}px)` }}
        >
          {/* Arranca limpio, sin cortes */}
          <h1 className="massive-text">SOFTWARE DEVELOPER</h1>

          {/* Pongo un segundo texto por si el usuario tiene monitor ultra-ancho, 
              le di un estilo de "contorno" para que quede más fachero, 
              pero podés ponerlo normal si preferís. */}
          <h1 className="massive-text outline">SOFTWARE DEVELOPER</h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
