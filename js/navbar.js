// js/navbar.js - Componente de Navbar reutilizable
class NavbarComponent {
  constructor() {
    this.currentPage = this.getCurrentPage();
  }

  getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split("/").pop() || "index.html";
    return page;
  }

  isActivePage(pageName) {
    return this.currentPage === pageName ? "active" : "";
  }

  render() {
    return `
    <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
      <nav class="uk-navbar-container uk-navbar-transparent">
        <div class="uk-container uk-width-1-1 background-opaque">
          <div uk-navbar="mode: click" class="uk-flex">
            <div class="uk-navbar-left">
              <div class="uk-navbar-item uk-light">
                <a class="uk-flex uk-link-heading" href="index.html">
                  <img src="assets/img/coffe-user-logo.svg" alt="Logo" />
                  <button
                    class="uk-margin-left uk-text-capitalize uk-text-left uk-text-small uk-button uk-button-link"
                  >
                    <strong>SurtiEnvases</strong>
                  </button>
                </a>
              </div>
            </div>
            <div class="uk-navbar-center uk-visible@l">
              <div class="uk-navbar-item uk-dark">
                <a
                  class="uk-button uk-button-secondary uk-border-rounded ${this.isActivePage(
                    "catalogo.html"
                  )}"
                  href="catalogo.html"
                  >Catálogo</a
                >
              </div>
              <div class="uk-navbar-item uk-light">
                <a
                  class="uk-text-capitalize uk-button uk-button-text uk-light ${this.isActivePage(
                    "productos.html"
                  )}"
                  href="productos.html"
                  >Productos</a
                >
              </div>
              <div class="uk-navbar-item uk-light">
                <a
                  class="uk-text-capitalize uk-button uk-button-text uk-light ${this.isActivePage(
                    "novedades.html"
                  )}"
                  href="novedades.html"
                  >Novedades</a
                >
              </div>
              <div class="uk-navbar-item uk-light">
                <a
                  class="uk-text-capitalize uk-button uk-button-text uk-light ${this.isActivePage(
                    "nosotros.html"
                  )}"
                  href="nosotros.html"
                  >Nosotros</a
                >
              </div>
              <div class="uk-navbar-item uk-light">
                <a
                  class="uk-text-capitalize uk-button uk-button-text uk-light ${this.isActivePage(
                    "contacto.html"
                  )}"
                  href="contacto.html"
                  >Contacto</a
                >
              </div>
              <div class="uk-navbar-item uk-light">
                <a
                  class="uk-text-capitalize uk-button uk-button-text uk-light ${this.isActivePage(
                    "preguntas-frecuentes.html"
                  )}"
                  href="preguntas-frecuentes.html"
                  >FAQ</a
                >
              </div>
            </div>
            <div class="uk-navbar-right uk-visible@l">
              <div class="uk-navbar-item uk-dark">
                <button
                  class="uk-button uk-button-secondary uk-border-rounded"
                  onclick="if(typeof productsSystem !== 'undefined') { productsSystem.toggleCart(); } else if(typeof catalogoSystem !== 'undefined') { UIkit.modal('#cart-modal').show(); }"
                  style="position: relative;"
                >
                  <span uk-icon="cart"></span> Cotizar
                  <span class="cart-badge" id="cart-count-navbar" style="display: none;">0</span>
                </button>
              </div>
            </div>
            <!-- Menú hamburguesa -->
            <div class="uk-hidden@l uk-navbar-right">
              <a
                class="uk-navbar-toggle"
                uk-navbar-toggle-icon="true"
                uk-toggle="target: #burger-menu"
              ></a>
              <div id="burger-menu" uk-offcanvas="overlay: true; flip: true">
                <div class="uk-offcanvas-bar">
                  <button
                    class="uk-offcanvas-close"
                    type="button"
                    uk-close="true"
                  ></button>
                  <div
                    class="uk-flex uk-flex-column uk-grid-row-small uk-margin-medium-top"
                    uk-grid="true"
                  >
                    <div class="uk-flex-left">
                      <a
                        class="uk-button uk-button-secondary uk-border-rounded"
                        href="catalogo.html"
                        ><strong>Catálogo</strong></a
                      >
                    </div>
                    <div class="uk-flex-left uk-margin-small-left">
                      <a
                        class="uk-text-capitalize uk-button uk-button-text uk-light"
                        href="productos.html"
                        >Productos</a
                      >
                    </div>
                    <div class="uk-flex-left uk-margin-small-left">
                      <a
                        class="uk-text-capitalize uk-button uk-button-text uk-light"
                        href="novedades.html"
                        >Novedades</a
                      >
                    </div>
                    <div class="uk-flex-left uk-margin-small-left">
                      <a
                        class="uk-text-capitalize uk-button uk-button-text uk-light"
                        href="nosotros.html"
                        >Nosotros</a
                      >
                    </div>
                    <div class="uk-flex-left uk-margin-small-left">
                      <a
                        class="uk-text-capitalize uk-button uk-button-text uk-light"
                        href="contacto.html"
                        >Contacto</a
                      >
                    </div>
                    <div class="uk-flex-left uk-margin-small-left">
                      <a
                        class="uk-text-capitalize uk-button uk-button-text uk-light"
                        href="preguntas-frecuentes.html"
                        >FAQ</a
                      >
                    </div>
                    <hr class="uk-divider-icon">
                    <div class="uk-flex-left">
                      <button
                        class="uk-button uk-button-secondary uk-border-rounded uk-width-1-1"
                        onclick="if(typeof productsSystem !== 'undefined') { productsSystem.toggleCart(); UIkit.offcanvas('#burger-menu').hide(); } else if(typeof catalogoSystem !== 'undefined') { UIkit.modal('#cart-modal').show(); UIkit.offcanvas('#burger-menu').hide(); }"
                      >
                        <span uk-icon="cart"></span> Ver Carrito
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
    `;
  }
}

// Función para inicializar el navbar
function initNavbar() {
  const navbarContainer = document.getElementById("navbar-container");
  if (navbarContainer) {
    const navbar = new NavbarComponent();
    navbarContainer.innerHTML = navbar.render();
  }
}
