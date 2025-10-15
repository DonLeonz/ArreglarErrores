// ========================================
// SURTIENVASES - CARRITO UNIVERSAL
// ✅ BADGE MÓVIL AGREGADO
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
    console.log("🛒 Iniciando setup del carrito...");
    this.injectCartHTML();
    this.injectWhatsAppHTML();
    this.updateCartCount();
    this.setupEventListeners();
    this.syncWithOtherTabs();
    console.log("✅ Setup del carrito completado");
  }

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
      this.updateCartCount();
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

  injectCartHTML() {
    if (document.getElementById("cart-modal")) {
      console.log("⚠️ Modal de carrito ya existe");
      return;
    }

    const cartHTML = `
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
    console.log("✅ Modal de carrito inyectado");
  }

  injectWhatsAppHTML() {
    if (document.querySelector(".whatsapp-flotante")) {
      console.log("✅ WhatsApp ya existe, no se inyecta");
      return;
    }

    const whatsappHTML = `
      <a href="https://wa.me/${this.whatsappNumber}" class="whatsapp-flotante" target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp">
        <div class="whatsapp-boton-circular">
          <span uk-icon="icon: whatsapp; ratio: 1.5" class="texto-blanco"></span>
        </div>
      </a>
    `;

    document.body.insertAdjacentHTML("beforeend", whatsappHTML);
    console.log("✅ WhatsApp flotante inyectado");
  }

  setupEventListeners() {
    console.log("🔌 Configurando event listeners...");

    const sendQuoteBtn = document.getElementById("send-quote-btn");
    if (sendQuoteBtn) {
      sendQuoteBtn.addEventListener("click", () => this.sendQuoteToWhatsApp());
      console.log("✅ Listener de enviar cotización configurado");
    }

    const navbarQuoteBtn = document.getElementById("navbar-quote-btn");
    if (navbarQuoteBtn) {
      navbarQuoteBtn.addEventListener("click", () => {
        console.log("🖱️ Click en navbar-quote-btn");
        this.toggleCart();
      });
      console.log("✅ Listener de navbar-quote-btn configurado");
    }

    const floatingCartBtn = document.getElementById("floating-cart-btn");
    if (floatingCartBtn) {
      floatingCartBtn.addEventListener("click", () => {
        console.log("🖱️ Click en floating-cart-btn");
        this.toggleCart();
      });
      console.log("✅ Listener de floating-cart-btn configurado");
    } else {
      console.warn("⚠️ floating-cart-btn NO encontrado");
    }

    console.log("✅ Event listeners configurados");
  }

  addToCart(product) {
    console.log("📥 addToCart llamado con:", product);

    let cart = this.loadCart();

    if (!product.id || !product.title) {
      console.error("❌ Producto inválido:", product);
      return;
    }

    const existingItem = cart.find(
      (item) => Number(item.id) === Number(product.id)
    );

    if (existingItem) {
      existingItem.quantity += 1;
      console.log("✅ Cantidad actualizada del producto existente");
    } else {
      cart.push({
        id: Number(product.id),
        title: product.title,
        minimumOrder: product.minimumOrder || "Consultar",
        quantity: product.quantity || 1,
      });
      console.log("✅ Nuevo producto agregado al carrito");
    }

    this.saveCart(cart);
    this.showNotification(`${product.title} agregado al carrito`, "success");
    console.log("✅ Carrito guardado, contador actualizado");
  }

  removeFromCart(productId) {
    console.log("🗑️ Eliminando producto ID:", productId);
    let cart = this.loadCart();
    cart = cart.filter((item) => Number(item.id) !== Number(productId));
    this.saveCart(cart);
    this.renderCart();
    console.log("✅ Producto eliminado");
  }

  updateQuantity(productId, change) {
    console.log("🔢 Actualizando cantidad - ID:", productId, "Cambio:", change);

    let cart = this.loadCart();
    const item = cart.find((i) => Number(i.id) === Number(productId));

    if (item) {
      item.quantity += change;
      console.log("📊 Nueva cantidad:", item.quantity);

      if (item.quantity <= 0) {
        console.log("🗑️ Cantidad <= 0, eliminando item...");
        cart = cart.filter((i) => Number(i.id) !== Number(productId));
      }

      this.saveCart(cart);
      this.renderCart();
      console.log("✅ Cantidad actualizada");
    } else {
      console.warn("⚠️ Item no encontrado en carrito");
    }
  }

  clearCart() {
    this.saveCart([]);
    this.renderCart();
  }

  // ✅ MEJORADO: Actualiza también badge móvil
  updateCartCount() {
    const cart = this.loadCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);

    console.log("🔢 Actualizando contador del carrito:", count);

    const badges = [
      document.getElementById("cart-count"),
      document.getElementById("cart-count-navbar"),
      document.getElementById("cart-count-floating"),
      document.getElementById("cart-count-mobile"), // ✅ AGREGADO
    ];

    badges.forEach((badge) => {
      if (badge) {
        badge.textContent = count;
        if (count > 0) {
          badge.style.display = "flex";
          badge.classList.remove("uk-hidden");
        } else {
          badge.style.display = "none";
          badge.classList.add("uk-hidden");
        }
      }
    });
  }

  toggleCart() {
    console.log("🔄 toggleCart llamado");

    const modal = document.getElementById("cart-modal");
    if (!modal) {
      console.error("❌ Modal #cart-modal NO encontrado en el DOM");
      return;
    }

    console.log("✅ Modal encontrado, renderizando carrito...");
    this.renderCart();

    console.log("📂 Intentando abrir modal con UIkit...");
    try {
      const uikitModal = UIkit.modal("#cart-modal");
      if (uikitModal) {
        uikitModal.show();
        console.log("✅ Modal abierto exitosamente");
      } else {
        console.error("❌ UIkit.modal devolvió null");
      }
    } catch (error) {
      console.error("❌ Error al abrir modal:", error);
    }
  }

  renderCart() {
    const container = document.getElementById("cart-items-container");
    if (!container) {
      console.warn("⚠️ Contenedor cart-items-container no encontrado");
      return;
    }

    const cart = this.loadCart();
    console.log("🛒 Renderizando carrito con", cart.length, "items");

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

    console.log("✅ Carrito renderizado");
  }

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

window.toggleCart = () => window.surtienvases.cart.toggleCart();
window.sendCartToWhatsApp = () =>
  window.surtienvases.cart.sendQuoteToWhatsApp();

console.log("✓ SurtiEnvases - Sistema de carrito inicializado");
