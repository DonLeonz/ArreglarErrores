// ========================================
// INICIALIZACIÓN DEL NAVBAR
// Maneja menú hamburguesa, página activa y botones
// ========================================

class NavbarInit {
  constructor() {
    this.currentPage = this.getCurrentPage();
    this.init();
  }

  init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.setActivePage();
    this.setupCartButtons();
    this.setupMobileMenu();
    console.log("✓ Navbar inicializado");
  }

  // ========================================
  // PÁGINA ACTIVA
  // ========================================
  getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split("/").pop() || "index.php";
    return page;
  }

  setActivePage() {
    // Marcar enlaces activos en navbar desktop
    const navLinks = document.querySelectorAll(
      ".uk-navbar-center .uk-button-text, .uk-navbar-center .uk-button-secondary"
    );

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === this.currentPage) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Marcar enlaces activos en menú móvil
    const mobileLinks = document.querySelectorAll("#burger-menu .uk-button");
    mobileLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === this.currentPage) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  // ========================================
  // BOTONES DEL CARRITO
  // ========================================
  setupCartButtons() {
    // Botón cotizar en navbar desktop
    const navbarQuoteBtn = document.getElementById("navbar-quote-btn");
    if (navbarQuoteBtn) {
      navbarQuoteBtn.addEventListener("click", () => {
        if (window.surtienvases && window.surtienvases.cart) {
          window.surtienvases.cart.toggleCart();
        }
      });
    }

    // Botón del carrito en menú móvil
    const mobileCartBtn = document.getElementById("mobile-cart-btn");
    if (mobileCartBtn) {
      mobileCartBtn.addEventListener("click", () => {
        if (window.surtienvases && window.surtienvases.cart) {
          window.surtienvases.cart.toggleCart();
        }
        // Cerrar el menú móvil
        UIkit.offcanvas("#burger-menu").hide();
      });
    }
  }

  // ========================================
  // MENÚ MÓVIL
  // ========================================
  setupMobileMenu() {
    const burgerMenu = document.getElementById("burger-menu");
    if (!burgerMenu) return;

    // Cerrar menú cuando se hace clic en un enlace
    const menuLinks = burgerMenu.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        // Pequeño delay para que la navegación se complete
        setTimeout(() => {
          UIkit.offcanvas("#burger-menu").hide();
        }, 100);
      });
    });
  }
}

// ========================================
// INICIALIZACIÓN AUTOMÁTICA
// ========================================
window.surtienvases = window.surtienvases || {};
window.surtienvases.navbar = new NavbarInit();
