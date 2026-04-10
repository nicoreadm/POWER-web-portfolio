"use client";

// --- IMPORTS ---
import React, { useRef, useEffect, useState } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import Preloader from "./Preloader";
import { ThemeProvider } from "./ThemeContext";

// --- SCROLL CONTROLLER ---
const ScrollController = ({ isLoading }) => {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    if (isLoading) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [lenis, isLoading]);

  return null;
};

// --- MAIN COMPONENT ---
function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- KEYBOARD NAVIGATION LOGIC ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isLoading) {
        if (
          [
            "ArrowUp",
            "ArrowDown",
            "Space",
            "PageDown",
            "PageUp",
            "Home",
            "End",
          ].includes(e.code)
        ) {
          e.preventDefault();
        }
        return;
      }

      const lenis = lenisRef.current?.lenis;
      if (!lenis) return;

      const activeTag = document.activeElement.tagName;
      if (["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(activeTag)) return;

      const arrowScrollAmount = 150;
      const pageScrollAmount = window.innerHeight - 50;
      let targetScroll = null;
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

      if (targetScroll !== null) {
        e.preventDefault();
        lenis.scrollTo(targetScroll, {
          lerp: 0.1,
          duration: 1.2,
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLoading]);

  // --- RENDER ---
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
      <ScrollController isLoading={isLoading} />

      <ThemeProvider>
        <Preloader onComplete={() => setIsLoading(false)} />
        {children}
      </ThemeProvider>
    </ReactLenis>
  );
}

export default SmoothScroll;
