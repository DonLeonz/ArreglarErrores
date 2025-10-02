// Sistema de Productos con Carrito
class ProductsSystem {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    this.currentCategory = "todos";
    this.init();
  }

  init() {
    this.renderProducts();
    this.setupCategoryFilters();
    this.updateCartCount();
  }

  setupCategoryFilters() {
    const buttons = document.querySelectorAll(".category-button");
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        // Remover active de todos
        buttons.forEach((b) => b.classList.remove("active"));
        // Agregar active al clickeado
        e.target.classList.add("active");

        const category = e.target.dataset.category;
        this.currentCategory = category;
        this.renderProducts();
      });
    });
  }

  filterProducts() {
    if (this.currentCategory === "todos") {
      return productItems;
    }

    return productItems.filter((product) => {
      const cat = this.currentCategory.toLowerCase();
      const productCat = product.category.toLowerCase();

      if (cat === "vidrio") return productCat.includes("vidrio");
      if (cat === "plastico") return productCat.includes("plástico");
      if (cat === "farmaceutico") return productCat.includes("farmacéut");
      if (cat === "complementos")
        return (
          productCat.includes("tapas") || productCat.includes("complemento")
        );

      return true;
    });
  }

  renderProducts() {
    const productsGrid = document.getElementById("products-grid");
    if (!productsGrid) return;

    const filteredProducts = this.filterProducts();

    productsGrid.innerHTML = filteredProducts
      .map(
        (item, index) => `
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
                                <span class="coffee-menu-origin">
                                    ${item.industry}
                                </span>
                                ${
                                  item.stock === "Disponible"
                                    ? `
                                    <span class="uk-badge product-stock-available">
                                        ✓ En Stock
                                    </span>
                                `
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
                            <button class="uk-button uk-button-default coffee-button-outline uk-width-1-1"
                                onclick="productsSystem.showModal(${index})">
                                Ver Detalles
                            </button>
                        </div>
                        <div class="uk-width-1-2@s">
                            <button class="uk-button uk-button-primary whatsapp-button uk-width-1-1"
                                onclick="productsSystem.addToCart(${item.id})">
                                <span uk-icon="cart"></span> Agregar
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Modal para este producto -->
                <div id="modal-${index}" class="uk-modal-container uk-modal" data-uk-modal>
                    <div class="uk-modal-dialog uk-modal-body uk-light coffee-modal-dark">
                        
                        <button class="uk-modal-close-default" type="button" data-uk-close></button>
                        
                        <div class="uk-grid-collapse" data-uk-grid>
                            <!-- Columna de imagen en modal -->
                            <div class="uk-width-1-3@m uk-width-1-1@s">
                                <div class="uk-padding uk-flex uk-flex-center">
                                    <div class="uk-border-circle uk-overflow-hidden coffee-image-circle-large">
                                        <img src="${item.img}" alt="${
          item.title
        }" class="uk-cover coffee-image-cover">
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Columna de contenido en modal -->
                            <div class="uk-width-2-3@m uk-width-1-1@s coffee-padding-large">
                                <h2 class="uk-modal-title coffee-title-gold-border">
                                    ${item.title}
                                </h2>
                                
                                <div class="uk-margin-medium-top">
                                    <h3 class="coffee-modal-ingredients-title">
                                        Especificaciones:
                                    </h3>
                                    <ul class="uk-list uk-list-bullet coffee-modal-ingredients-list">
                                        ${(item.specifications || [])
                                          .map((spec) => `<li>${spec}</li>`)
                                          .join("")}
                                    </ul>
                                </div>
                                
                                <div class="uk-margin-medium-top">
                                    <h3 class="coffee-modal-ingredients-title">
                                        Características:
                                    </h3>
                                    <p class="coffee-modal-preparation-text">
                                        ${
                                          item.recommendation ||
                                          "Información no disponible."
                                        }
                                    </p>
                                </div>

                                <div class="uk-margin-medium-top">
                                    <h3 class="coffee-modal-ingredients-title">
                                        Pedido Mínimo:
                                    </h3>
                                    <p class="coffee-modal-preparation-text">
                                        ${
                                          item.minimumOrder ||
                                          "Consultar disponibilidad"
                                        }
                                    </p>
                                </div>
                                
                                <div class="uk-margin-medium-top">
                                    <div class="uk-grid-small" data-uk-grid>
                                        <div>
                                            <span class="uk-label coffee-label-transparent">
                                                Material: ${item.material}
                                            </span>
                                        </div>
                                        <div>
                                            <span class="uk-label coffee-label-transparent">
                                                ${item.certification}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="uk-margin-large-top uk-text-center uk-grid-small" uk-grid>
                                    <div class="uk-width-1-2@s">
                                        <button class="uk-button uk-button-primary whatsapp-button uk-width-1-1" 
                                                onclick="productsSystem.addToCart(${
                                                  item.id
                                                }); UIkit.modal('#modal-${index}').hide();">
                                            <span uk-icon="cart"></span> Agregar al Carrito
                                        </button>
                                    </div>
                                    <div class="uk-width-1-2@s">
                                        <a href="https://wa.me/573153957275?text=Hola,%20me%20interesa%20el%20producto:%20${encodeURIComponent(
                                          item.title
                                        )}" 
                                           target="_blank" 
                                           class="uk-button uk-button-secondary uk-width-1-1">
                                            <span uk-icon="whatsapp"></span> Consultar Directo
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
      )
      .join("");
  }

  showModal(index) {
    const modal = UIkit.modal(document.getElementById(`modal-${index}`));
    if (modal) modal.show();
  }

  addToCart(productId) {
    const product = productItems.find((p) => p.id === productId);
    if (!product) return;

    const existingItem = this.cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({
        id: product.id,
        title: product.title,
        minimumOrder: product.minimumOrder,
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
        this.renderCart();
      }
    }
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  updateCartCount() {
    const count = this.cart.reduce((total, item) => total + item.quantity, 0);
    const badge = document.getElementById("cart-count");
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? "flex" : "none";
    }
  }

  toggleCart() {
    this.renderCart();
    UIkit.modal("#cart-modal").show();
  }

  renderCart() {
    const container = document.getElementById("cart-items");
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
                        <button class="uk-button uk-button-small uk-button-default" onclick="productsSystem.updateQuantity(${item.id}, -1)">-</button>
                        <span class="uk-margin-small-left uk-margin-small-right">${item.quantity}</span>
                        <button class="uk-button uk-button-small uk-button-default" onclick="productsSystem.updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <div class="uk-width-auto">
                        <button class="uk-button uk-button-small uk-button-danger" onclick="productsSystem.removeFromCart(${item.id})">
                            <span uk-icon="trash"></span>
                        </button>
                    </div>
                </div>
            </div>
        `
      )
      .join("");
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

    this.cart.forEach((item) => {
      message += `• ${item.title}\n  Cantidad: ${item.quantity}\n  Pedido mínimo: ${item.minimumOrder}\n\n`;
    });

    message += "Quedo atento a su respuesta. ¡Gracias!";

    const whatsappUrl = `https://wa.me/573153957275?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");

    // Limpiar carrito después de enviar
    this.cart = [];
    this.saveCart();
    this.updateCartCount();
    UIkit.modal("#cart-modal").hide();
  }
}

// Inicializar el sistema de productos
const productsSystem = new ProductsSystem();
