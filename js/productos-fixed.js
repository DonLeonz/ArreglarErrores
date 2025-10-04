// ========================================
// SISTEMA DE PRODUCTOS - VERSIÓN MEJORADA
// Con badges rediseñados y botones de cerrar funcionales
// ========================================

class ProductsSystem {
  constructor() {
    this.products = window.productItems || [];
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    this.currentCategory = "todos";
    this.init();
  }

  init() {
    this.renderProducts();
    this.setupCategoryFilters();
    this.updateCartCount();
  }

  // ========================================
  // FILTROS
  // ========================================
  setupCategoryFilters() {
    const buttons = document.querySelectorAll(".category-button");

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        buttons.forEach((b) => b.classList.remove("active"));
        e.currentTarget.classList.add("active");

        const category = e.currentTarget.dataset.category;
        this.currentCategory = category;
        this.renderProducts();
      });
    });
  }

  filterProducts() {
    if (this.currentCategory === "todos") {
      return this.products;
    }

    return this.products.filter((product) => {
      const cat = this.currentCategory.toLowerCase();
      const productCat = product.category.toLowerCase();

      if (cat === "vidrio") return productCat.includes("vidrio");
      if (cat === "plastico")
        return (
          productCat.includes("plástico") || productCat.includes("plastico")
        );
      if (cat === "farmaceutico")
        return (
          productCat.includes("farmacéut") || productCat.includes("farmaceut")
        );
      if (cat === "complementos") {
        return (
          productCat.includes("tapas") || productCat.includes("complemento")
        );
      }

      return true;
    });
  }

  // ========================================
  // RENDERIZADO
  // ========================================
  renderProducts() {
    const productsGrid = document.getElementById("products-grid");
    if (!productsGrid) return;

    const filteredProducts = this.filterProducts();

    if (filteredProducts.length === 0) {
      productsGrid.innerHTML = `
        <div class="uk-width-1-1 uk-text-center uk-padding">
          <p class="uk-text-lead coffee-text-white">
            No se encontraron productos en esta categoría
          </p>
        </div>
      `;
      return;
    }

    productsGrid.innerHTML = filteredProducts
      .map((item, index) => this.createProductCard(item, index))
      .join("");
  }

  createProductCard(item, index) {
    return `
      <div>
        <div class="uk-card uk-card-default uk-card-hover uk-flex uk-flex-column uk-height-1-1 coffee-card-dark">
          
          <div class="uk-flex uk-flex-middle uk-flex-wrap uk-child-width-expand@m uk-grid-small" data-uk-grid>
            <!-- Imagen -->
            <div class="uk-flex uk-flex-center uk-width-1-3@s uk-width-1-4@m">
              <div class="uk-border-circle uk-overflow-hidden coffee-image-circle">
                <img src="${item.img}" alt="${
      item.title
    }" class="uk-cover coffee-image-cover">
              </div>
            </div>
            
            <!-- Información básica -->
            <div class="coffee-flex-grow">
              <h3 class="uk-card-title uk-margin-remove-bottom coffee-title-white">
                ${item.title}
              </h3>
              
              <div class="coffee-margin-small-top">
                <span class="coffee-menu-origin">${item.industry}</span>
                ${
                  item.stock === "Disponible"
                    ? `<span class="product-stock-badge">
                        <svg class="badge-icon" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                        En Stock
                      </span>`
                    : ""
                }
              </div>
              
              <p class="coffee-margin-small-top coffee-text-white-muted">
                ${item.description}
              </p>
            </div>
          </div>
          
          <!-- Botones -->
          <div class="uk-text-center uk-padding-small uk-grid-small" uk-grid>
            <div class="uk-width-1-2@s">
              <button class="uk-button uk-button-default coffee-button-outline uk-width-1-1 uk-border-rounded"
                      onclick="productsSystem.showModal(${index})">
                Ver Detalles
              </button>
            </div>
            <div class="uk-width-1-2@s">
              <button class="uk-button uk-button-primary whatsapp-button uk-width-1-1 uk-border-rounded"
                      onclick="productsSystem.addToCart(${item.id})">
                <span uk-icon="cart"></span> Agregar
              </button>
            </div>
          </div>
        </div>
        
        ${this.createProductModal(item, index)}
      </div>
    `;
  }

  createProductModal(item, index) {
    return `
      <div id="modal-${index}" class="uk-modal-container uk-modal" data-uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-light coffee-modal-dark">
          
          <!-- Botón de cerrar mejorado -->
          <button class="product-modal-close" type="button" 
                  onclick="UIkit.modal('#modal-${index}').hide()"
                  aria-label="Cerrar modal"></button>
          
          <div class="uk-grid-collapse" data-uk-grid>
            <div class="uk-width-1-3@m uk-width-1-1@s">
              <div class="uk-padding uk-flex uk-flex-center">
                <div class="uk-border-circle uk-overflow-hidden coffee-image-circle-large">
                  <img src="${item.img}" alt="${
      item.title
    }" class="uk-cover coffee-image-cover">
                </div>
              </div>
            </div>
            
            <div class="uk-width-2-3@m uk-width-1-1@s coffee-padding-large">
              <h2 class="uk-modal-title">
                ${item.title}
              </h2>
              
              <div class="uk-margin-medium-top">
                <h3 class="coffee-title-gold">Especificaciones:</h3>
                <ul class="uk-list uk-list-bullet coffee-text-white">
                  ${(item.specifications || [])
                    .map((spec) => `<li>${spec}</li>`)
                    .join("")}
                </ul>
              </div>
              
              <div class="uk-margin-medium-top">
                <h3 class="coffee-title-gold">Características:</h3>
                <p class="coffee-text-white">
                  ${item.recommendation || "Información no disponible."}
                </p>
              </div>

              <div class="uk-margin-medium-top">
                <h3 class="coffee-title-gold">Pedido Mínimo:</h3>
                <p class="coffee-text-white">
                  ${item.minimumOrder || "Consultar disponibilidad"}
                </p>
              </div>
              
              <div class="uk-margin-medium-top product-badges-container">
                <span class="product-material-badge">
                  <svg class="badge-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"/>
                    <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z"/>
                    <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z"/>
                  </svg>
                  ${item.material}
                </span>
                <span class="product-cert-badge">
                  <svg class="badge-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  ${item.certification}
                </span>
              </div>

              <div class="uk-margin-large-top uk-text-center uk-grid-small" uk-grid>
                <div class="uk-width-1-2@s">
                  <button class="uk-button uk-button-primary whatsapp-button uk-width-1-1 uk-border-rounded" 
                          onclick="productsSystem.addToCart(${
                            item.id
                          }); UIkit.modal('#modal-${index}').hide();">
                    <span uk-icon="cart"></span> Agregar al Carrito
                  </button>
                </div>
                <div class="uk-width-1-2@s">
                  <button class="uk-button uk-button-primary whatsapp-button uk-width-1-1 uk-border-rounded"
                          onclick="productsSystem.contactWhatsApp('${encodeURIComponent(
                            item.title
                          )}')">
                    <span uk-icon="whatsapp"></span> Consultar Directo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ========================================
  // ACCIONES
  // ========================================
  showModal(index) {
    const modal = UIkit.modal(document.getElementById(`modal-${index}`));
    if (modal) modal.show();
  }

  addToCart(productId) {
    const product = this.products.find((p) => p.id === productId);
    if (!product) return;

    const existingItem = this.cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({
        id: product.id,
        title: product.title,
        minimumOrder: product.minimumOrder || "Consultar",
        quantity: 1,
      });
    }

    this.saveCart();
    this.updateCartCount();

    UIkit.notification({
      message: `${product.title} agregado al carrito`,
      status: "success",
      pos: "top-center",
      timeout: 2000,
    });
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter((item) => item.id !== productId);
    this.saveCart();
    this.updateCartCount();
    this.renderCart();
  }

  updateQuantity(productId, change) {
    const item = this.cart.find((i) => i.id === productId);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
      }
    }
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  updateCartCount() {
    const count = this.cart.reduce((total, item) => total + item.quantity, 0);

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
    UIkit.modal("#cart-modal").show();
  }

  renderCart() {
    const container = document.getElementById("cart-items-container");
    if (!container) return;

    if (this.cart.length === 0) {
      container.innerHTML =
        '<p class="uk-text-center uk-text-muted">El carrito está vacío</p>';
      return;
    }

    container.innerHTML = this.cart
      .map(
        (item) => `
        <div class="cart-item">
          <div class="uk-grid-small uk-flex-middle" uk-grid>
            <div class="uk-width-expand">
              <h4 class="uk-margin-remove">${item.title}</h4>
              <p class="uk-text-small uk-text-muted uk-margin-remove">${item.minimumOrder}</p>
            </div>
            <div class="uk-width-auto">
              <button class="uk-button uk-button-small uk-button-default" 
                      onclick="productsSystem.updateQuantity(${item.id}, -1)">
                <span uk-icon="minus"></span>
              </button>
              <span class="uk-margin-small-left uk-margin-small-right">${item.quantity}</span>
              <button class="uk-button uk-button-small uk-button-default" 
                      onclick="productsSystem.updateQuantity(${item.id}, 1)">
                <span uk-icon="plus"></span>
              </button>
            </div>
            <div class="uk-width-auto">
              <button class="uk-button uk-button-small uk-button-danger" 
                      onclick="productsSystem.removeFromCart(${item.id})">
                <span uk-icon="trash"></span>
              </button>
            </div>
          </div>
        </div>
      `
      )
      .join("");
  }

  contactWhatsApp(productTitle) {
    const message = `Hola, me interesa el producto: ${decodeURIComponent(
      productTitle
    )}`;
    const whatsappUrl = `https://wa.me/573153957275?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  }

  sendQuoteToWhatsApp() {
    if (this.cart.length === 0) {
      UIkit.notification({
        message: "El carrito está vacío",
        status: "warning",
        pos: "top-center",
      });
      return;
    }

    let message =
      "¡Hola! Me gustaría solicitar una cotización para los siguientes productos:\n\n";

    this.cart.forEach((item, index) => {
      message += `${index + 1}. ${item.title}\n`;
      message += `   Cantidad: ${item.quantity}\n`;
      message += `   Pedido mínimo: ${item.minimumOrder}\n\n`;
    });

    message += `Total de items: ${this.cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    )}\n\n`;
    message += "Quedo atento a su respuesta. ¡Gracias!";

    const whatsappUrl = `https://wa.me/573153957275?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");

    UIkit.notification({
      message: "Redirigiendo a WhatsApp...",
      status: "success",
      pos: "top-center",
      timeout: 2000,
    });
  }
}

// ========================================
// INICIALIZACIÓN
// ========================================
window.surtienvases = window.surtienvases || {};
window.surtienvases.products = new ProductsSystem();

// Alias global para compatibilidad
window.productsSystem = window.surtienvases.products;

console.log("✓ Sistema de productos inicializado con estilos mejorados");
