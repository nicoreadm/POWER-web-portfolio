import React, { useState, useEffect, useRef } from "react";
import "../styles/ClientList.css";

const ClientList = () => {
  // SECCIÓN: Rastreo del cursor para el efecto de máscara
  const maskRef = useRef(null);

  useEffect(() => {
    // Manejador para el movimiento del cursor
    const handleMouseMove = (e) => {
      if (maskRef.current) {
        const { clientX, clientY } = e;
        // Actualizamos dinámicamente la posición del degradado radial de la máscara con requestAnimationFrame para suavidad
        requestAnimationFrame(() => {
          maskRef.current.style.cssText = `
            mask-image: radial-gradient(circle at ${clientX}px ${clientY}px, transparent 0px, transparent 150px, black 200px);
            -webkit-mask-image: radial-gradient(circle at ${clientX}px ${clientY}px, transparent 0px, transparent 150px, black 200px);
          `;
        });
      }
    };

    // Añadimos el oyente de eventos a la ventana para rastrear el cursor globalmente
    window.addEventListener("mousemove", handleMouseMove);

    // Limpieza del oyente de eventos
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // SECCIÓN: Datos de las marcas
  const hilera1Marcas = [
    "READ WORKSHOP",
    "POWER!",
    "INMOBILIARIA MORIZZIO",
    "READ WORKSHOP",
    "POWER!",
    "INMOBILIARIA MORIZZIO",
  ];
  const hilera2Marcas = [
    "INMOBILIARIA MORIZZIO",
    "POWER!",
    "READ WORKSHOP",
    "INMOBILIARIA MORIZZIO",
    "POWER!",
    "READ WORKSHOP",
  ];
  const hilera3Marcas = [
    "POWER!",
    "READ WORKSHOP",
    "INMOBILIARIA MORIZZIO",
    "POWER!",
    "READ WORKSHOP",
    "INMOBILIARIA MORIZZIO",
  ];
  const hilera4Marcas = [
    "READ WORKSHOP",
    "POWER!",
    "INMOBILIARIA MORIZZIO",
    "READ WORKSHOP",
    "POWER!",
    "INMOBILIARIA MORIZZIO",
  ];

  const renderMarquesinaHilera = (marcas, numHilera) => {
    return (
      <div className="marquesina-wrapper">
        <div className={`track track-${numHilera}`}>
          <div className="marquesina-contenido">
            {marcas.map((marca, index) => (
              <span key={index} className="marca">
                {marca}
              </span>
            ))}
          </div>
          <div className="marquesina-contenido" aria-hidden="true">
            {marcas.map((marca, index) => (
              <span key={`dup-${index}`} className="marca">
                {marca}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="clientes" className="contenedor-principal">
      {/* CAPA DE EFECTO DE MÁSCARA Y DESENFOQUE */}
      {/* Esta capa está por encima del contenido y su máscara se mueve con el cursor */}
      <div className="reveal-mask" ref={maskRef}></div>

      {/* SECCIÓN DEL ENCABEZADO SUPERIOR */}
      <header className="encabezado-superior">
        <div className="encabezado-izquierda">/ CLIENTES -----</div>
        <div className="encabezado-derecha">KOOKIE +</div>
      </header>

      {/* SECCIÓN DE HILERAS DE MARQUESINAS INDIVIDUALES */}
      <main className="seccion-hileras">
        {renderMarquesinaHilera(hilera1Marcas, 1)}
        {renderMarquesinaHilera(hilera2Marcas, 2)}
        {renderMarquesinaHilera(hilera3Marcas, 3)}
        {renderMarquesinaHilera(hilera4Marcas, 4)}
      </main>
    </div>
  );
};

export default ClientList;
