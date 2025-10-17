import "./Footer.css";
import coffeLogo from "../../../assets/img/coffe-user-logo.svg";

const Footer = () => {
  return (
    <footer className="uk-section uk-section-small footer-container">
      <div className="uk-container">
        <div
          className="uk-grid-medium uk-child-width-1-4@m uk-child-width-1-2@s"
          data-uk-grid
        >
          {/* Columna 1: Logo y descripción */}
          <div>
            <img
              src={coffeLogo}
              alt="Logo Chocolate Coffee"
              className="footer-logo uk-margin-small-bottom"
            />
            <p className="uk-text-small footer-text">
              Tu refugio de café de especialidad. Cada taza cuenta una historia,
              cada visita es una experiencia única.
            </p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h4 className="footer-title">Enlaces Rápidos</h4>
            <ul className="uk-list uk-list-divider footer-list">
              <li>
                <a href="/menu" className="uk-link-muted footer-link">
                  Menú
                </a>
              </li>
              <li>
                <a href="/suggest" className="uk-link-muted footer-link">
                  Recomendado
                </a>
              </li>
              <li>
                <a href="/blog" className="uk-link-muted footer-link">
                  Blog
                </a>
              </li>
              <li>
                <a href="/about" className="uk-link-muted footer-link">
                  Nosotros
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Información */}
          <div>
            <h4 className="footer-title">Información</h4>
            <ul className="uk-list uk-list-divider footer-list">
              <li>
                <a href="/api" className="uk-link-muted footer-link">
                  API
                </a>
              </li>
              <li>
                <p className="uk-text-small footer-text uk-margin-remove">
                  Horario: Lun-Vie 7AM-8PM
                </p>
              </li>
              <li>
                <p className="uk-text-small footer-text uk-margin-remove">
                  Sáb-Dom: 8AM-6PM
                </p>
              </li>
            </ul>
          </div>

          {/* Columna 4: Redes y contacto */}
          <div>
            <h4 className="footer-title">Síguenos</h4>
            <div className="uk-margin-small-top footer-social-icons">
              <a
                href="https://www.facebook.com"
                className="uk-icon-button footer-icon-facebook"
                data-uk-icon="icon: facebook"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              ></a>
              <a
                href="https://www.instagram.com"
                className="uk-icon-button uk-margin-small-left footer-icon-instagram"
                data-uk-icon="icon: instagram"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              ></a>
              <a
                href="https://www.youtube.com"
                className="uk-icon-button uk-margin-small-left footer-icon-youtube"
                data-uk-icon="icon: youtube"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              ></a>
              <a
                href="https://www.twitter.com"
                className="uk-icon-button uk-margin-small-left footer-icon-twitter"
                data-uk-icon="icon: twitter"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              ></a>
              <a
                href="https://www.linkedin.com"
                className="uk-icon-button uk-margin-small-left footer-icon-linkedin"
                data-uk-icon="icon: linkedin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              ></a>
            </div>

            <div className="uk-margin-top">
              <h4 className="footer-title uk-margin-small-top">Contacto</h4>
              <p className="uk-text-small footer-text">
                <span
                  data-uk-icon="icon: mail"
                  className="footer-icon-inline"
                ></span>
                chocolate@coffee.com
                <br />
                <span
                  data-uk-icon="icon: location"
                  className="footer-icon-inline"
                ></span>
                Medellín, Colombia
              </p>

              <p className="uk-text-small footer-text">
                <span
                  data-uk-icon="icon: phone"
                  className="footer-icon-inline"
                ></span>
                +57 300 123 4567
                <br />
                <span
                  data-uk-icon="icon: receiver"
                  className="footer-icon-inline"
                ></span>
                604 444 5555
              </p>
            </div>
          </div>
        </div>

        <hr className="uk-divider-icon footer-divisor" />

        <div className="uk-text-center uk-text-small footer-copyright">
          <p>© 2025 Chocolate Coffee. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
