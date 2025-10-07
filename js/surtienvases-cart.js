// ========================================
// SURTIENVASES - CARRITO UNIVERSAL
// Funciona en todas las páginas
// ========================================

class SurtiEnvasesCart {
  constructor() {
    this.whatsappNumber = "573153957275";
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
    this.injectCartHTML();
    this.updateCartCount();
    this.setupEventListeners();
    this.syncWithOtherTabs();
  }

  // ========================================
  // GESTIÓN DE DATOS
  // ========================================
  loadCart() {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch (e) {
      console.error("Error al cargar el carrito:", e);
      return [];
    }
  }

  saveCart(cart) {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (e) {
      console.error("Error al guardar el carrito:", e);
    }
  }

  syncWithOtherTabs() {
    window.addEventListener("storage", (e) => {
      if (e.key === "cart") {
        this.updateCartCount();
        this.renderCart();
      }
    });
  }

  // ========================================
  // INYECCIÓN DE HTML
  // ========================================
  injectCartHTML() {
    if (document.getElementById("cart-floating-container")) {
      return;
    }

    const cartHTML = `
      <!-- Carrito Flotante -->
      <div id="cart-floating-container" class="carrito-flotante">
        <button class="carrito-boton-circular" id="toggle-cart-btn" aria-label="Ver carrito">
          <span uk-icon="icon: cart; ratio: 1.5" style="color: white"></span>
          <span class="carrito-badge-contador" id="cart-count" style="display: none;">0</span>
        </button>
      </div>

      <!-- Modal del Carrito -->
<div id="cart-modal" uk-modal>
  <div class="uk-modal-dialog uk-modal-body" style="position: relative;">
    <button class="boton-cerrar-modal-carrito" type="button" 
            onclick="UIkit.modal('#cart-modal').hide()"
            aria-label="Cerrar carrito"></button>
    <h2 class="uk-modal-title">Carrito de Cotización</h2>
    <div id="cart-items-container"></div>
          <div class="uk-text-center uk-margin-top">
            <button class="uk-button uk-button-primary boton-whatsapp uk-width-1-1" id="send-quote-btn">
              <span uk-icon="whatsapp"></span> Enviar Cotización por WhatsApp
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", cartHTML);
  }

  setupEventListeners() {
    const toggleBtn = document.getElementById("toggle-cart-btn");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => this.toggleCart());
    }

    const sendQuoteBtn = document.getElementById("send-quote-btn");
    if (sendQuoteBtn) {
      sendQuoteBtn.addEventListener("click", () => this.sendQuoteToWhatsApp());
    }

    const navbarQuoteBtn = document.getElementById("navbar-quote-btn");
    if (navbarQuoteBtn) {
      navbarQuoteBtn.addEventListener("click", () => this.toggleCart());
    }
  }

  // ========================================
  // OPERACIONES DEL CARRITO
  // ========================================
  addToCart(product) {
    let cart = this.loadCart();
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        minimumOrder: product.minimumOrder || "Consultar",
        quantity: 1,
      });
    }

    this.saveCart(cart);
    this.updateCartCount();
    this.showNotification(`${product.title} agregado al carrito`, "success");
  }

  removeFromCart(productId) {
    let cart = this.loadCart();
    cart = cart.filter((item) => item.id !== productId);
    this.saveCart(cart);
    this.updateCartCount();
    this.renderCart();
  }

  updateQuantity(productId, change) {
    let cart = this.loadCart();
    const item = cart.find((i) => i.id === productId);

    if (item) {
      item.quantity += change;

      if (item.quantity <= 0) {
        cart = cart.filter((i) => i.id !== productId);
      }

      this.saveCart(cart);
      this.updateCartCount();
      this.renderCart();
    }
  }

  clearCart() {
    this.saveCart([]);
    this.updateCartCount();
    this.renderCart();
  }

  // ========================================
  // UI - RENDERIZADO
  // ========================================
  updateCartCount() {
    const cart = this.loadCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);

    const badges = [
      document.getElementById("cart-count"),
      document.getElementById("cart-count-navbar"),
    ];

    badges.forEach((badge) => {
      if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? "flex" : "none";
      }
    });
  }

  toggleCart() {
    this.renderCart();
    const modal = UIkit.modal("#cart-modal");
    if (modal) {
      modal.show();
    }
  }

  renderCart() {
    const container = document.getElementById("cart-items-container");
    if (!container) return;

    const cart = this.loadCart();

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="uk-text-center uk-padding">
          <span uk-icon="icon: cart; ratio: 3" style="color: #ccc;"></span>
          <p class="uk-text-muted uk-margin-top">El carrito está vacío</p>
          <p class="uk-text-small uk-text-muted">Agrega productos desde nuestro catálogo</p>
        </div>
      `;
      return;
    }

    container.innerHTML = cart
      .map(
        (item) => `
      <div class="carrito-item">
        <div class="uk-grid-small uk-flex-middle" uk-grid>
          <div class="uk-width-expand">
            <h4 class="uk-margin-remove">${item.title}</h4>
            <p class="uk-text-small uk-text-muted uk-margin-remove">
              Pedido mínimo: ${item.minimumOrder}
            </p>
          </div>
          <div class="uk-width-auto">
            <button class="uk-button uk-button-small uk-button-default" 
                    onclick="window.surtienvases.cart.updateQuantity(${item.id}, -1)">
              <span uk-icon="minus"></span>
            </button>
            <span class="uk-margin-small-left uk-margin-small-right uk-text-bold">
              ${item.quantity}
            </span>
            <button class="uk-button uk-button-small uk-button-default" 
                    onclick="window.surtienvases.cart.updateQuantity(${item.id}, 1)">
              <span uk-icon="plus"></span>
            </button>
          </div>
          <div class="uk-width-auto">
            <button class="uk-button uk-button-small uk-button-danger" 
                    onclick="window.surtienvases.cart.removeFromCart(${item.id})">
              <span uk-icon="trash"></span>
            </button>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  // ========================================
  // WHATSAPP
  // ========================================
  sendQuoteToWhatsApp() {
    const cart = this.loadCart();

    if (cart.length === 0) {
      this.showNotification("El carrito está vacío", "warning");
      return;
    }

    let message =
      "¡Hola! Me gustaría solicitar una cotización para los siguientes productos:\n\n";

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.title}\n`;
      message += `   Cantidad: ${item.quantity}\n`;
      message += `   Pedido mínimo: ${item.minimumOrder}\n\n`;
    });

    message += `Total de items: ${cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    )}\n\n`;
    message += "Quedo atento a su respuesta. ¡Gracias!";

    const whatsappUrl = `https://wa.me/${
      this.whatsappNumber
    }?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    this.showNotification("Redirigiendo a WhatsApp...", "success");
  }

  // ========================================
  // NOTIFICACIONES
  // ========================================
  showNotification(message, status = "primary") {
    if (typeof UIkit !== "undefined") {
      UIkit.notification({
        message: message,
        status: status,
        pos: "top-center",
        timeout: 2000,
      });
    } else {
      console.log(`[${status}] ${message}`);
    }
  }

  // ========================================
  // API PÚBLICA
  // ========================================
  getCart() {
    return this.loadCart();
  }

  getCartCount() {
    const cart = this.loadCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  }
}

// ========================================
// INICIALIZACIÓN GLOBAL
// ========================================
window.surtienvases = window.surtienvases || {};
window.surtienvases.cart = new SurtiEnvasesCart();

// Funciones globales para compatibilidad
window.toggleCart = () => window.surtienvases.cart.toggleCart();
window.sendCartToWhatsApp = () =>
  window.surtienvases.cart.sendQuoteToWhatsApp();

console.log("✓ SurtiEnvases - Sistema de carrito inicializado");
