// ========================================
// INICIALIZACIÓN DEL NAVBAR
// Maneja menú hamburguesa, página activa y botones
// ✅ CORREGIDO: Detecta página activa en WordPress
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
    console.log("✅ Navbar inicializado - Página actual:", this.currentPage);
  }

  // ========================================
  // PÁGINA ACTIVA - MEJORADO PARA WORDPRESS
  // ========================================
  getCurrentPage() {
    const path = window.location.pathname;
    const url = window.location.href;

    console.log("🔍 Detectando página actual:");
    console.log("   - pathname:", path);
    console.log("   - href:", url);

    // Detectar páginas de WordPress por diferentes métodos

    // 1. Si estamos en la home
    if (path === "/" || (path.endsWith("/") && path.split("/").length <= 2)) {
      console.log("✅ Detectado: HOME");
      return "home";
    }

    // 2. Buscar en la URL palabras clave de páginas
    const pageKeywords = {
      catalogo: ["catalogo", "catalog"],
      productos: ["productos", "products"],
      novedades: ["novedades", "blog", "news"],
      nosotros: ["nosotros", "about"],
      contacto: ["contacto", "contact"],
      "preguntas-frecuentes": ["preguntas-frecuentes", "faq"],
      admin: ["admin"],
    };

    // Buscar coincidencias
    for (const [page, keywords] of Object.entries(pageKeywords)) {
      for (const keyword of keywords) {
        if (url.toLowerCase().includes(keyword.toLowerCase())) {
          console.log(`✅ Detectado: ${page.toUpperCase()}`);
          return page;
        }
      }
    }

    // 3. Si no encuentra nada, retornar null
    console.log("⚠️ Página no detectada");
    return null;
  }

  setActivePage() {
    // Marcar enlaces activos en navbar desktop
    const navLinks = document.querySelectorAll(
      ".uk-navbar-center .uk-button, .uk-navbar-right .uk-button"
    );

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");

      // Remover clase active de todos
      link.classList.remove("active");

      if (!href || !this.currentPage) return;

      // Comparar la URL del enlace con la página actual
      const linkLower = href.toLowerCase();

      // Caso especial: Home
      if (this.currentPage === "home") {
        if (href === "/" || href.endsWith("/#") || linkLower.includes("home")) {
          link.classList.add("active");
          console.log("✅ Marcado como activo (home):", href);
        }
      } else {
        // Para otras páginas, buscar si la URL contiene el nombre de la página
        if (linkLower.includes(this.currentPage)) {
          link.classList.add("active");
          console.log("✅ Marcado como activo:", href);
        }
      }
    });

    // Marcar enlaces activos en menú móvil
    const mobileLinks = document.querySelectorAll("#burger-menu .uk-button");

    mobileLinks.forEach((link) => {
      const href = link.getAttribute("href");

      // Remover clase active de todos
      link.classList.remove("active");

      if (!href || !this.currentPage) return;

      const linkLower = href.toLowerCase();

      // Caso especial: Home
      if (this.currentPage === "home") {
        if (href === "/" || href.endsWith("/#") || linkLower.includes("home")) {
          link.classList.add("active");
        }
      } else {
        if (linkLower.includes(this.currentPage)) {
          link.classList.add("active");
        }
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
      console.log("✅ Botón navbar-quote-btn configurado");
    }

    // Botón del carrito flotante
    const floatingCartBtn = document.getElementById("floating-cart-btn");
    if (floatingCartBtn) {
      floatingCartBtn.addEventListener("click", () => {
        if (window.surtienvases && window.surtienvases.cart) {
          window.surtienvases.cart.toggleCart();
        }
      });
      console.log("✅ Botón floating-cart-btn configurado");
    } else {
      console.log(
        "⚠️ floating-cart-btn no encontrado (normal en página admin)"
      );
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
      console.log("✅ Botón mobile-cart-btn configurado");
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
