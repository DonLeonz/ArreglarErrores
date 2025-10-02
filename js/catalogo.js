// Sistema de Catálogo con Carrito Integrado
class CatalogoSystem {
  constructor() {
    // Compartir el mismo carrito con productos.html
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    this.init();
  }

  init() {
    this.setupProductSearch();
    this.setupIndustryFilters();
    this.renderCart();
  }

  setupProductSearch() {
    const form = document.getElementById("product-search-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const query = document.getElementById("product-search-input").value;
        const category = document.getElementById("category-filter").value;
        this.searchProducts(query, category);
      });
    }
  }

  setupIndustryFilters() {
    const buttons = document.querySelectorAll(".industry-filter");
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const industry = e.target.dataset.industry;
        this.filterByIndustry(industry);
      });
    });
  }

  searchProducts(query, category) {
    const loadingDiv = document.getElementById("product-loading");
    const resultsDiv = document.getElementById("product-results");

    // Reset states
    resultsDiv.innerHTML = "";
    loadingDiv.classList.remove("uk-hidden");

    // Simular búsqueda
    setTimeout(() => {
      loadingDiv.classList.add("uk-hidden");

      let filteredProducts = [...productItems];

      // Filtrar por query
      if (query) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.title.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );
      }

      // Filtrar por categoría
      if (category) {
        filteredProducts = filteredProducts.filter((product) => {
          if (category === "vidrio") return product.category.includes("Vidrio");
          if (category === "plastico")
            return product.category.includes("Plásticos");
          if (category === "tapas") return product.category.includes("Tapas");
          if (category === "cosmetico")
            return product.category.includes("Cosmét");
          if (category === "farmaceutico")
            return product.category.includes("Farmacéut");
          if (category === "industrial")
            return product.category.includes("Industrial");
          return true;
        });
      }

      if (filteredProducts.length > 0) {
        this.renderProductResults(filteredProducts);
      } else {
        resultsDiv.innerHTML =
          '<p class="uk-text-center uk-text-muted">No se encontraron productos con esos criterios</p>';
      }
    }, 500);
  }

  filterByIndustry(industry) {
    const resultsDiv = document.getElementById("industry-results");

    let filteredProducts = [...productItems];

    if (industry !== "todas") {
      const industryMap = {
        alimentos: "Alimentos",
        bebidas: "Bebidas",
        cosmetica: "Cosmética",
        farmaceutica: "Farmacéutica",
        quimicos: "Químicos",
        limpieza: "Limpieza",
        industrial: "Industrial",
      };

      filteredProducts = filteredProducts.filter(
        (product) =>
          product.industry && product.industry.includes(industryMap[industry])
      );
    }

    if (filteredProducts.length > 0) {
      resultsDiv.innerHTML = `
                <h3>Productos recomendados para tu industria:</h3>
                <div class="uk-grid uk-child-width-1-2@s uk-child-width-1-3@m uk-grid-match" uk-grid="true">
                    ${this.renderProductCards(filteredProducts)}
                </div>
            `;
    } else {
      resultsDiv.innerHTML =
        '<p class="uk-text-center uk-text-muted">No hay productos específicos para esta industria</p>';
    }
  }

  renderProductResults(products) {
    const resultsDiv = document.getElementById("product-results");

    resultsDiv.innerHTML = `
            <div class="uk-grid uk-child-width-1-2@s uk-child-width-1-3@m uk-grid-match uk-margin-top" uk-grid="true">
                ${this.renderProductCards(products)}
            </div>
        `;
  }

  renderProductCards(products) {
    return products
      .map(
        (product) => `
            <div>
                <div class="uk-card uk-card-default uk-card-body uk-text-center">
                    <img src="${product.img}" alt="${product.title}"
                        class="product-image-medium uk-margin-bottom">
                    <h3 class="uk-card-title uk-text-truncate">${
                      product.title
                    }</h3>
                    <p class="uk-text-meta">${product.category}</p>
                    <p class="uk-text-small">${
                      product.minimumOrder || "Consultar"
                    }</p>
                    <div class="uk-grid-small uk-child-width-1-2" uk-grid>
                        <div>
                            <button class="uk-button uk-button-primary uk-button-small uk-width-1-1" 
                                    onclick="catalogoSystem.addToCart(${
                                      product.id
                                    })">
                                <span uk-icon="cart"></span> Agregar
                            </button>
                        </div>
                        <div>
                            <a href="https://wa.me/573153957275?text=Hola,%20me%20interesa:%20${encodeURIComponent(
                              product.title
                            )}" 
                               target="_blank" 
                               class="uk-button uk-button-secondary uk-button-small uk-width-1-1">
                                <span uk-icon="whatsapp"></span> Consultar
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `
      )
      .join("");
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
    this.renderCart();

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

  renderCart() {
    const container = document.getElementById("catalog-cart-items");
    const actionsDiv = document.getElementById("catalog-cart-actions");

    if (!container) return;

    if (this.cart.length === 0) {
      container.innerHTML =
        '<p class="uk-text-center uk-text-muted">El carrito está vacío. Agrega productos desde la búsqueda.</p>';
      if (actionsDiv) actionsDiv.style.display = "none";
      return;
    }

    if (actionsDiv) actionsDiv.style.display = "block";

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
                        <button class="uk-button uk-button-small uk-button-default" onclick="catalogoSystem.updateQuantity(${item.id}, -1)">-</button>
                        <span class="uk-margin-small-left uk-margin-small-right">${item.quantity}</span>
                        <button class="uk-button uk-button-small uk-button-default" onclick="catalogoSystem.updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <div class="uk-width-auto">
                        <button class="uk-button uk-button-small uk-button-danger" onclick="catalogoSystem.removeFromCart(${item.id})">
                            <span uk-icon="trash"></span>
                        </button>
                    </div>
                </div>
            </div>
        `
      )
      .join("");
  }

  sendCartToWhatsApp() {
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

    UIkit.notification({
      message: "Redirigiendo a WhatsApp...",
      status: "success",
      pos: "top-center",
      timeout: 2000,
    });
  }
}

// Inicializar el sistema de catálogo
const catalogoSystem = new CatalogoSystem();
