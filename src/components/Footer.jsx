import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="premium-footer" id="contact">
      <div className="footer-container">
        {/* --- SECCIÓN SUPERIOR: TÍTULO GIGANTE --- */}
        <div className="footer-top">
          <h2 className="footer-title">
            HABLEMOS<span>.</span>
          </h2>
          <p className="footer-subtitle">
            ¿Tienes un proyecto en mente? Hagámoslo realidad.
          </p>
        </div>

        {/* --- SECCIÓN INFERIOR: LINKS DE CONTACTO --- */}
        <div className="footer-bottom">
          <div className="contact-group">
            <h4 className="group-label">CONTACTO DIRECTO</h4>
            <a
              href="mailto:nicolasmunozread@gmail.com"
              className="roll-link"
              data-text="nicolasmunozread@gmail.com"
            >
              <span>Escríbeme al mail</span>
            </a>
            <a
              href="tel:+5493874673694"
              className="roll-link"
              data-text="+54 9 387 467-3694"
            >
              <span>O enviame un whatsapp</span>
            </a>

            {/* --- NUEVO: BOTÓN DE DESCARGA DE CV --- */}
            {/* Asegúrate de que la ruta al href sea la correcta hacia tu archivo PDF en public/ */}
            <a
              href="/nicolas-read-cv.pdf" // Reemplaza con el nombre de tu PDF
              download="Nicolas_Amaro_Muñoz_Read_CV.pdf" // Nombre con el que se descargará el archivo
              className="roll-link cv-link"
              data-text="DESCARGAR PDF"
            >
              <span>DESCARGAR CV</span>
            </a>
          </div>

          <div className="contact-group socials">
            <h4 className="group-label">REDES & CHAT</h4>
            <div className="social-links-wrapper">
              <a
                href="https://github.com/nicoreadm"
                target="_blank"
                rel="noreferrer"
                className="roll-link"
                data-text="@nicoreadm "
              >
                <span>
                  GITHUB &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/nicolás-read-4640b0352/"
                target="_blank"
                rel="noreferrer"
                className="roll-link"
                data-text="@Nicolás Read"
              >
                <span>
                  LINKEDIN
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;
                </span>
              </a>
              <a
                href="https://www.instagram.com/read.workshop/"
                target="_blank"
                rel="noreferrer"
                className="roll-link"
                data-text="@READ.WORKSHOP"
              >
                <span>
                  INSTAGRAM
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* --- COPYRIGHT --- */}
        <div className="footer-copy">
          <p>© {new Date().getFullYear()} NICO. ALL RIGHTS RESERVED.</p>
          <p>
            DESIGNED BY:{" "}
            <strong>
              <a href="https://github.com/nicoreadm">NICOLAS READ</a>
            </strong>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
