// ========================================
// SISTEMA DE CATÁLOGO - SOLUCIÓN DEFINITIVA
// ========================================

class CatalogoSystemPHP {
  constructor() {
    this.apiUrl = window.API_URL || "api.php";
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    this.products = [];
    this.categories = [];
    this.industries = [];
    this.init();
  }

  async init() {
    await this.loadProducts();
    await this.loadCategories();
    await this.loadIndustries();
    this.updateCategorySelect();
    this.updateIndustryButtons();
    this.setupProductSearch();
    this.setupIndustryFilters();
    this.renderCartPreview();
    this.updateCartCount();
    console.log("✓ Sistema de catálogo PHP inicializado");
  }

  async loadProducts() {
    try {
      const response = await fetch(`${this.apiUrl}?action=get_products`);
      const data = await response.json();
      if (data.success) {
        this.products = data.data;
        console.log(`✓ Catálogo: ${this.products.length} productos cargados`);
        console.log(
          "📦 IDs en catálogo:",
          this.products.map((p) => `ID:${p.id}`)
        );
      }
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  }

  async loadCategories() {
    try {
      const response = await fetch(`${this.apiUrl}?action=get_categories`);
      const data = await response.json();
      if (data.success) {
        this.categories = data.data;
        console.log(`✓ ${this.categories.length} categorías cargadas`);
      }
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  }

  async loadIndustries() {
    try {
      const response = await fetch(`${this.apiUrl}?action=get_industries`);
      const data = await response.json();
      if (data.success) {
        this.industries = data.data;
        console.log(`✓ ${this.industries.length} industrias cargadas`);
      }
    } catch (error) {
      console.error("Error al cargar industrias:", error);
    }
  }

  updateCategorySelect() {
    const select = document.getElementById("category-filter");
    if (!select) return;

    select.innerHTML = `
      <option value="">Todas las categorías</option>
      ${this.categories
        .map((cat) => `<option value="${cat.key}">${cat.name}</option>`)
        .join("")}
    `;
  }

  updateIndustryButtons() {
    const container = document.getElementById("industry-buttons-container");
    if (!container) return;

    container.innerHTML =
      this.industries
        .map(
          (ind) => `
      <div>
        <button class="uk-button uk-button-default uk-width-1-1 boton-filtro-categoria-industria"
                data-industry="${ind.key}">
          ${ind.icon} ${ind.name}
        </button>
      </div>
    `
        )
        .join("") +
      `
      <div>
        <button class="uk-button uk-button-default uk-width-1-1 boton-filtro-categoria-industria"
                data-industry="todas">
          📦 Todas
        </button>
      </div>
    `;
  }

  setupProductSearch() {
    const form = document.getElementById("product-search-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = document.getElementById("product-search-input").value;
      const category = document.getElementById("category-filter").value;
      this.searchProducts(query, category);
    });
  }

  searchProducts(query, category) {
    const loadingDiv = document.getElementById("product-loading");
    const resultsDiv = document.getElementById("product-results");

    if (!resultsDiv) return;

    resultsDiv.innerHTML = "";
    if (loadingDiv) loadingDiv.classList.remove("uk-hidden");

    setTimeout(() => {
      if (loadingDiv) loadingDiv.classList.add("uk-hidden");

      let filteredProducts = [...this.products];

      if (query) {
        const searchTerm = query.toLowerCase();
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            (product.category &&
              product.category.toLowerCase().includes(searchTerm))
        );
      }

      if (category) {
        filteredProducts = this.filterByCategory(filteredProducts, category);
      }

      if (filteredProducts.length > 0) {
        this.renderProductResults(filteredProducts, resultsDiv);
      } else {
        resultsDiv.innerHTML = `
          <div class="uk-text-center uk-padding">
            <span uk-icon="icon: search; ratio: 3" style="color: #ccc;"></span>
            <p class="uk-text-muted uk-margin-top">
              No se encontraron productos con esos criterios
            </p>
          </div>
        `;
      }
    }, 500);
  }

  filterByCategory(products, category) {
    const categoryObj = this.categories.find((c) => c.key === category);
    if (!categoryObj) return products;

    return products.filter(
      (product) =>
        product.category && product.category.includes(categoryObj.name)
    );
  }

  renderProductResults(products, container) {
    container.innerHTML = `
      <h3 class="uk-margin-top uk-modal-title">
        Resultados de búsqueda (${products.length})
      </h3>
      <div class="uk-grid uk-child-width-1-2@s uk-child-width-1-3@m uk-grid-match uk-margin-top" uk-grid>
        ${products.map((product) => this.createProductCard(product)).join("")}
      </div>
    `;
  }

  createProductCard(product) {
    return `
      <div>
        <div class="uk-card uk-card-default uk-card-body uk-text-center card-degradado-morado-borde-naranja">
          <img src="${product.img}" alt="${product.title}"
              class="imagen-producto-altura-120 uk-margin-bottom">
          <h3 class="uk-card-title uk-text-truncate titulo-blanco-sombra">
            ${product.title}
          </h3>
          <p class="uk-text-meta texto-verde-muted">${product.category}</p>
          <p class="uk-text-small texto-blanco">
            ${product.minimumOrder || "Consultar"}
          </p>
          <div class="uk-grid-small uk-child-width-1-2" uk-grid>
            <div>
              <button class="uk-button uk-button-primary boton-whatsapp uk-button-small uk-width-1-1 uk-border-rounded" 
                      onclick="catalogoSystemPHP.addToCart(${product.id})">
                <span uk-icon="cart"></span> Agregar
              </button>
            </div>
            <div>
              <button class="uk-button uk-button-primary boton-whatsapp uk-button-small uk-width-1-1 uk-border-rounded"
                      onclick="catalogoSystemPHP.contactWhatsApp('${encodeURIComponent(
                        product.title
                      )}')">
                <span uk-icon="whatsapp"></span> Consultar
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  setupIndustryFilters() {
    const buttons = document.querySelectorAll(
      ".boton-filtro-categoria-industria"
    );

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const industry = e.currentTarget.dataset.industry;
        this.filterByIndustry(industry);
      });
    });
  }

  filterByIndustry(industry) {
    const resultsDiv = document.getElementById("industry-results");
    if (!resultsDiv) return;

    let filteredProducts = [...this.products];

    if (industry !== "todas") {
      const industryObj = this.industries.find((i) => i.key === industry);
      if (industryObj) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.industry && product.industry.includes(industryObj.name)
        );
      }
    }

    if (filteredProducts.length > 0) {
      resultsDiv.innerHTML = `
        <h3 class="uk-modal-title uk-margin-top">
          Productos recomendados (${filteredProducts.length})
        </h3>
        <div class="uk-grid uk-child-width-1-2@s uk-child-width-1-3@m uk-grid-match" uk-grid>
          ${filteredProducts.map((p) => this.createProductCard(p)).join("")}
        </div>
      `;
    } else {
      resultsDiv.innerHTML = `
        <div class="uk-text-center uk-padding">
          <p class="uk-text-muted">
            No hay productos específicos para esta industria
          </p>
        </div>
      `;
    }
  }

  renderCartPreview() {
    const container = document.getElementById("catalog-cart-items");
    const actionsDiv = document.getElementById("catalog-cart-actions");

    if (!container) return;

    const cart = this.getCart();

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="uk-text-center uk-padding">
          <p class="uk-text-muted">
            El carrito está vacío. Agrega productos desde la búsqueda.
          </p>
        </div>
      `;
      if (actionsDiv) actionsDiv.style.display = "none";
      return;
    }

    if (actionsDiv) actionsDiv.style.display = "block";

    container.innerHTML = cart
      .map(
        (item) => `
      <div class="carrito-item">
        <div class="uk-grid-small uk-flex-middle" uk-grid>
          <div class="uk-width-expand">
            <h4 class="uk-margin-remove">${item.title}</h4>
            <p class="uk-text-small uk-text-muted uk-margin-remove">
              ${item.minimumOrder}
            </p>
          </div>
          <div class="uk-width-auto">
            <button class="uk-button uk-button-small uk-button-default"
                    onclick="catalogoSystemPHP.updateQuantity(${item.id}, -1)">
              <span uk-icon="minus"></span>
            </button>
            <span class="uk-margin-small-left uk-margin-small-right uk-text-bold">
              ${item.quantity}
            </span>
            <button class="uk-button uk-button-small uk-button-default"
                    onclick="catalogoSystemPHP.updateQuantity(${item.id}, 1)">
              <span uk-icon="plus"></span>
            </button>
          </div>
          <div class="uk-width-auto">
            <button class="uk-button uk-button-small uk-button-danger"
                    onclick="catalogoSystemPHP.removeFromCart(${item.id})">
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
  // MÉTODO CRÍTICO CORREGIDO - IGUAL QUE PRODUCTOS
  // ========================================

  addToCart(productId) {
    console.log(
      "🛒 CATÁLOGO - Agregando ID:",
      productId,
      "tipo:",
      typeof productId
    );
    console.log("📦 Total productos en catálogo:", this.products.length);
    console.log(
      "📦 IDs disponibles:",
      this.products.map((p) => p.id)
    );

    // CRÍTICO: Convertir a número
    const numericId = Number(productId);
    console.log("🔢 ID convertido:", numericId);

    // Buscar con conversión de tipos
    const product = this.products.find((p) => Number(p.id) === numericId);

    if (!product) {
      console.error("❌ PRODUCTO NO ENCONTRADO EN CATÁLOGO");
      console.error("   - ID buscado:", numericId);
      console.error("   - Array productos:", this.products);

      UIkit.notification({
        message: "Error: Producto no encontrado. Recarga la página.",
        status: "danger",
        pos: "top-center",
      });
      return;
    }

    console.log("✅ Producto encontrado en catálogo:", product.title);

    // Verificar sistema de carrito
    if (!window.surtienvases || !window.surtienvases.cart) {
      console.error("❌ Sistema de carrito no disponible");
      UIkit.notification({
        message: "Error: Sistema de carrito no disponible. Recarga la página.",
        status: "danger",
        pos: "top-center",
      });
      return;
    }

    console.log("✅ Sistema de carrito disponible");

    // Preparar datos - IGUAL QUE EN PRODUCTOS
    const productData = {
      id: Number(product.id),
      title: product.title,
      minimumOrder: product.minimumOrder || "Consultar",
      quantity: 1,
    };

    console.log("📦 Datos a enviar:", productData);

    try {
      window.surtienvases.cart.addToCart(productData);
      console.log("✅ Producto agregado desde catálogo");

      // Actualizar preview del carrito en catálogo
      this.renderCartPreview();
      this.updateCartCount();
    } catch (error) {
      console.error("❌ Error al agregar:", error);
      UIkit.notification({
        message: "Error al agregar al carrito: " + error.message,
        status: "danger",
        pos: "top-center",
      });
    }
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(
      (item) => Number(item.id) !== Number(productId)
    );
    this.saveCart();
    this.renderCartPreview();
    this.updateCartCount();
  }

  updateQuantity(productId, change) {
    const item = this.cart.find((i) => Number(i.id) === Number(productId));
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.saveCart();
        this.renderCartPreview();
        this.updateCartCount();
      }
    }
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
    window.dispatchEvent(new Event("cartUpdated"));
  }

  getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  updateCartCount() {
    const cart = this.getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const badges = [
      document.getElementById("cart-count"),
      document.getElementById("cart-count-navbar"),
      document.getElementById("cart-count-floating"),
    ];

    badges.forEach((badge) => {
      if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? "flex" : "none";
      }
    });
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

  sendCartToWhatsApp() {
    const cart = this.getCart();

    if (cart.length === 0) {
      UIkit.notification({
        message: "El carrito está vacío",
        status: "warning",
        pos: "top-center",
      });
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
window.surtienvases.catalogo = new CatalogoSystemPHP();
window.catalogoSystemPHP = window.surtienvases.catalogo;

window.sendCatalogQuote = () => {
  if (window.surtienvases?.catalogo) {
    window.surtienvases.catalogo.sendCartToWhatsApp();
  }
};

console.log("✓ Sistema de catálogo PHP inicializado");
