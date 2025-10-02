// js/footer.js - Componente de Footer reutilizable
class FooterComponent {
  render() {
    return `
    <footer class="uk-section uk-section-small footer-main">
      <div class="uk-container">
        <div
          class="uk-grid-medium uk-child-width-1-4@m uk-child-width-1-2@s"
          uk-grid
        >
          <div>
            <img
              src="assets/img/coffe-user-logo.svg"
              alt="SurtiEnvases Logo"
              class="uk-margin-small-bottom"
            />
            <p class="uk-text-small uk-text-muted">
              Distribuidora de soluciones en empaque con amplia gama de envases
              en plástico y vidrio.
            </p>
          </div>
          <div>
            <h4 class="footer-title">Enlaces Rápidos</h4>
            <ul class="uk-list uk-list-divider">
              <li>
                <a href="catalogo.html" class="uk-link-muted">Catálogo</a>
              </li>
              <li>
                <a href="productos.html" class="uk-link-muted">Productos</a>
              </li>
              <li>
                <a href="nosotros.html" class="uk-link-muted">Quiénes Somos</a>
              </li>
              <li>
                <a href="contacto.html" class="uk-link-muted">Contacto</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="footer-title">Información</h4>
            <ul class="uk-list uk-list-divider">
              <li>
                <a href="preguntas-frecuentes.html" class="uk-link-muted"
                  >Preguntas Frecuentes</a
                >
              </li>
              <li>
                <a href="novedades.html" class="uk-link-muted">Novedades</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="footer-title">Síguenos</h4>
            <div class="uk-margin-small-top">
              <a
                href="https://www.facebook.com/surtienvasesneiva"
                class="uk-icon-button"
                uk-icon="icon: facebook"
                target="_blank"
              ></a>
              <a
                href="https://www.instagram.com/envases_surtienvases"
                class="uk-icon-button uk-margin-small-left"
                uk-icon="icon: instagram"
                target="_blank"
              ></a>
            </div>
            <div class="uk-margin-top">
              <h4 class="footer-title uk-margin-small-top">Contacto</h4>
              <p class="uk-text-small uk-text-muted">
                <span uk-icon="icon: mail"></span>
                surtienvasesn@gmail.com<br />
                <span uk-icon="icon: location"></span> Neiva, Huila
              </p>
              <p class="uk-text-small uk-text-muted">
                <strong>Sede 1:</strong><br />
                <span uk-icon="icon: location"></span> Calle 10 #2-58<br />
                <span uk-icon="icon: phone"></span> 3163209967<br />
                <span uk-icon="icon: receiver"></span> 8672555
              </p>
              <p class="uk-text-small uk-text-muted">
                <strong>Sede 2:</strong><br />
                <span uk-icon="icon: location"></span> Calle 10 #1G-41<br />
                <span uk-icon="icon: phone"></span> 3153957275<br />
                <span uk-icon="icon: receiver"></span> 8673132
              </p>
              <p class="uk-text-small uk-text-muted">
                <span uk-icon="icon: clock"></span>
                <strong>Horarios:</strong><br />
                Lunes a Viernes: 8:00 AM - 12:00 PM & 2:00 PM - 6:00 PM<br />
                Sábados: 8:30 AM - 2:30 PM (Jornada continua)
              </p>
            </div>
          </div>
        </div>
        <hr class="uk-divider-icon footer-divider" />
        <div class="uk-text-center uk-text-small uk-text-muted">
          <p>© 2025 SurtiEnvases Neiva. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
    `;
  }
}

// Función para inicializar el footer
function initFooter() {
  const footerContainer = document.getElementById("footer-container");
  if (footerContainer) {
    const footer = new FooterComponent();
    footerContainer.innerHTML = footer.render();
  }
}
