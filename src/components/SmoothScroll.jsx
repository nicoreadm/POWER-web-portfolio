"use client";
import { useRef, useEffect } from "react";
import { ReactLenis } from "lenis/react";

function SmoothScroll({ children }) {
  // 1. Creamos una referencia para acceder al motor de Lenis
  const lenisRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Obtenemos la instancia actual de Lenis
      const lenis = lenisRef.current?.lenis;
      if (!lenis) return;

      // Seguridad: Si el usuario está escribiendo en un formulario, no hacemos nada
      const activeTag = document.activeElement.tagName;
      if (["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(activeTag)) return;

      // Configuramos cuánto queremos que scrollee cada tecla
      const arrowScrollAmount = 150; // Píxeles por cada toque de flecha
      const pageScrollAmount = window.innerHeight - 50; // Casi toda la pantalla para PageDown/Space

      let targetScroll = null;

      // Usamos lenis.targetScroll (hacia dónde está yendo) en lugar de actualScroll
      // para que si tocás la tecla rápido varias veces, no se trabe y acumule la distancia.
      const currentTarget = lenis.targetScroll;

      switch (e.code) {
        case "ArrowUp":
          targetScroll = currentTarget - arrowScrollAmount;
          break;
        case "ArrowDown":
          targetScroll = currentTarget + arrowScrollAmount;
          break;
        case "Space":
          targetScroll = e.shiftKey
            ? currentTarget - pageScrollAmount
            : currentTarget + pageScrollAmount;
          break;
        case "PageDown":
          targetScroll = currentTarget + pageScrollAmount;
          break;
        case "PageUp":
          targetScroll = currentTarget - pageScrollAmount;
          break;
        case "Home":
          targetScroll = 0;
          break;
        case "End":
          targetScroll = document.body.scrollHeight;
          break;
        default:
          return;
      }

      // Si presionó una tecla de scroll:
      if (targetScroll !== null) {
        e.preventDefault(); // Cancelamos el salto brusco de Windows/Mac

        // Le decimos a Lenis que navegue suavemente hasta el nuevo punto
        lenis.scrollTo(targetScroll, {
          lerp: 0.1, // Nivel de suavizado (igual o similar al de tu rueda)
          duration: 1.2,
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        duration: 1.2,
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;
