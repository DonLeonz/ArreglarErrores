// ========================================
// SISTEMA DE PRODUCTOS - SOLUCIÓN DEFINITIVA
// ========================================

class ProductsSystemPHP {
  constructor() {
    this.apiUrl = window.API_URL || "api.php";
    this.products = [];
    this.categories = [];
    this.currentCategory = "todos";
    this.init();
  }

  async init() {
    await this.loadProducts();
    await this.loadCategories();
    this.updateCategoryButtons();
    this.renderProducts();
    this.setupCategoryFilters();
    console.log("✓ Sistema de productos inicializado");
  }

  async loadProducts() {
    try {
      const response = await fetch(`${this.apiUrl}?action=get_products`);
      const data = await response.json();

      if (data.success) {
        this.products = data.data;
        console.log(`✓ ${this.products.length} productos cargados`);
        console.log(
          "📦 Productos en memoria:",
          this.products.map((p) => `ID:${p.id} - ${p.title}`)
        );
      } else {
        console.error("Error al cargar productos:", data.error);
        this.products = [];
      }
    } catch (error) {
      console.error("Error de red:", error);
      this.products = [];
    }
  }

  async loadCategories() {
    try {
      const response = await fetch(`${this.apiUrl}?action=get_categories`);
      const data = await response.json();

      if (data.success) {
        this.categories = data.data;
        console.log(`✓ ${this.categories.length} categorías cargadas`);
      } else {
        console.error("Error al cargar categorías:", data.error);
        this.categories = [];
      }
    } catch (error) {
      console.error("Error de red:", error);
      this.categories = [];
    }
  }

  updateCategoryButtons() {
    const container =
      document.querySelector("[data-category]")?.parentElement?.parentElement;
    if (!container) {
      console.warn("⚠ No se encontró el contenedor de botones de categoría");
      return;
    }

    let buttonsHTML = `
      <div>
        <button
          class="uk-button uk-button-default uk-width-1-1 boton-filtro-categoria-industria ${
            this.currentCategory === "todos" ? "active" : ""
          }"
          data-category="todos">
          📦 Todos
        </button>
      </div>
    `;

    this.categories.forEach((cat) => {
      const displayName = cat.name.replace("Envases ", "");

      buttonsHTML += `
        <div>
          <button
            class="uk-button uk-button-default uk-width-1-1 boton-filtro-categoria-industria ${
              this.currentCategory === cat.key ? "active" : ""
            }"
            data-category="${cat.key}">
            ${cat.icon} ${displayName}
          </button>
        </div>
      `;
    });

    container.innerHTML = buttonsHTML;
    console.log(
      `✓ Botones actualizados: ${this.categories.length + 1} botones`
    );
  }

  setupCategoryFilters() {
    const buttons = document.querySelectorAll(
      ".boton-filtro-categoria-industria"
    );

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
      if (!product.category) return false;

      const productCat = product.category.toLowerCase();
      const selectedCategory = this.categories.find(
        (c) => c.key === this.currentCategory
      );

      if (selectedCategory) {
        return (
          productCat.includes(selectedCategory.name.toLowerCase()) ||
          productCat.includes(selectedCategory.key.toLowerCase())
        );
      }

      return false;
    });
  }

  renderProducts() {
    const productsGrid = document.getElementById("products-grid");
    if (!productsGrid) return;

    const filteredProducts = this.filterProducts();

    if (filteredProducts.length === 0) {
      productsGrid.innerHTML = `
        <div class="uk-width-1-1 uk-text-center uk-padding">
          <p class="uk-text-lead texto-negro">
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
        <div class="uk-card uk-card-default uk-card-hover uk-flex uk-flex-column uk-height-1-1 card-degradado-morado-borde-naranja">
          
          <div class="uk-flex uk-flex-middle uk-flex-wrap uk-child-width-expand@m uk-grid-small" data-uk-grid>
            <div class="uk-flex uk-flex-center uk-width-1-3@s uk-width-1-4@m">
              <div class="uk-border-circle uk-overflow-hidden imagen-circular-100">
                <img src="${item.img}" alt="${
      item.title
    }" class="uk-cover imagen-cover">
              </div>
            </div>
            
            <div class="flex-grow-1">
              <h3 class="uk-card-title uk-margin-remove-bottom titulo-blanco-sombra">
                ${item.title}
              </h3>
              
              <div class="margen-superior-pequeno">
                <span class="badge-origen-pequeno">${item.industry}</span>
                ${
                  item.stock === "Disponible"
                    ? `<span class="badge-stock-disponible">
                        <svg class="badge-icono" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                        En Stock
                      </span>`
                    : ""
                }
              </div>
              
              <p class="margen-superior-pequeno texto-verde-muted">
                ${item.description}
              </p>
            </div>
          </div>
          
          <div class="uk-text-center uk-padding-small uk-grid-small" uk-grid>
            <div class="uk-width-1-2@s">
              <button class="uk-button uk-button-default boton-outline-verde-borde-naranja uk-width-1-1 uk-border-rounded"
                      onclick="productsSystemPHP.showModal(${index})">
                Ver Detalles
              </button>
            </div>
            <div class="uk-width-1-2@s">
              <button class="uk-button uk-button-primary boton-whatsapp uk-width-1-1 uk-border-rounded"
                      onclick="productsSystemPHP.addToCart(${item.id})">
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
        <div class="uk-modal-dialog uk-modal-body uk-light modal-degradado-morado">
          
          <button class="boton-cerrar-modal-producto" type="button" 
                  onclick="UIkit.modal('#modal-${index}').hide()"
                  aria-label="Cerrar modal"></button>
          
          <div class="uk-grid-collapse" data-uk-grid>
            <div class="uk-width-1-3@m uk-width-1-1@s">
              <div class="uk-padding uk-flex uk-flex-center">
                <div class="uk-border-circle uk-overflow-hidden imagen-circular-300">
                  <img src="${item.img}" alt="${
      item.title
    }" class="uk-cover imagen-cover">
                </div>
              </div>
            </div>
            
            <div class="uk-width-2-3@m uk-width-1-1@s padding-grande">
              <h2 class="uk-modal-title">${item.title}</h2>
              
              <div class="uk-margin-medium-top">
                <h3 class="titulo-verde-sombra">Especificaciones:</h3>
                <ul class="uk-list uk-list-bullet texto-blanco">
                  ${(item.specifications || [])
                    .map((spec) => `<li>${spec}</li>`)
                    .join("")}
                </ul>
              </div>
              
              <div class="uk-margin-medium-top">
                <h3 class="titulo-verde-sombra">Características:</h3>
                <p class="texto-blanco">
                  ${item.recommendation || "Información no disponible."}
                </p>
              </div>

              <div class="uk-margin-medium-top">
                <h3 class="titulo-verde-sombra">Pedido Mínimo:</h3>
                <p class="texto-blanco">
                  ${item.minimumOrder || "Consultar disponibilidad"}
                </p>
              </div>
              
              <div class="uk-margin-medium-top contenedor-badges">
                <span class="badge-material-producto">
                  <svg class="badge-icono" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"/>
                  </svg>
                  ${item.material}
                </span>
                <span class="badge-certificacion-producto">
                  <svg class="badge-icono" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  ${item.certification}
                </span>
              </div>

              <div class="uk-margin-large-top uk-text-center uk-grid-small" uk-grid>
                <div class="uk-width-1-2@s">
                  <button class="uk-button uk-button-primary boton-whatsapp uk-width-1-1 uk-border-rounded" 
                          onclick="productsSystemPHP.addToCartAndClose(${
                            item.id
                          }, ${index})">
                    <span uk-icon="cart"></span> Agregar al Carrito
                  </button>
                </div>
                <div class="uk-width-1-2@s">
                  <button class="uk-button uk-button-primary boton-whatsapp uk-width-1-1 uk-border-rounded"
                          onclick="productsSystemPHP.contactWhatsApp('${encodeURIComponent(
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
  // MÉTODO CRÍTICO CORREGIDO
  // ========================================

  showModal(index) {
    const modal = UIkit.modal(document.getElementById(`modal-${index}`));
    if (modal) modal.show();
  }

  addToCart(productId) {
    console.log(
      "🛒 INICIO addToCart - ID recibido:",
      productId,
      "tipo:",
      typeof productId
    );
    console.log("📊 Total productos en memoria:", this.products.length);
    console.log(
      "📦 IDs disponibles:",
      this.products.map((p) => p.id)
    );

    // CRÍTICO: Convertir a número si viene como string
    const numericId = Number(productId);
    console.log("🔢 ID convertido a número:", numericId);

    // Buscar con conversión de tipos
    const product = this.products.find((p) => Number(p.id) === numericId);

    if (!product) {
      console.error("❌ PRODUCTO NO ENCONTRADO");
      console.error("   - ID buscado:", numericId);
      console.error(
        "   - IDs en array:",
        this.products.map((p) => p.id)
      );
      console.error("   - Array completo:", this.products);

      UIkit.notification({
        message: "Error: Producto no encontrado. Recarga la página.",
        status: "danger",
        pos: "top-center",
      });
      return;
    }

    console.log("✅ Producto encontrado:", product.title);

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

    // Preparar datos del producto
    const productData = {
      id: Number(product.id), // ASEGURAR que sea número
      title: product.title,
      minimumOrder: product.minimumOrder || "Consultar",
      quantity: 1,
    };

    console.log("📦 Datos a enviar al carrito:", productData);

    try {
      window.surtienvases.cart.addToCart(productData);
      console.log("✅ Producto agregado exitosamente al carrito");
    } catch (error) {
      console.error("❌ Error al agregar al carrito:", error);
      UIkit.notification({
        message: "Error al agregar al carrito: " + error.message,
        status: "danger",
        pos: "top-center",
      });
    }
  }

  addToCartAndClose(productId, modalIndex) {
    this.addToCart(productId);
    UIkit.modal(`#modal-${modalIndex}`).hide();
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

  async refreshCategories() {
    console.log("🔄 Actualizando categorías...");
    await this.loadCategories();
    this.updateCategoryButtons();
    this.setupCategoryFilters();
    console.log("✓ Categorías actualizadas");
  }

  async refreshProducts() {
    console.log("🔄 Actualizando productos...");
    await this.loadProducts();
    this.renderProducts();
    console.log("✓ Productos actualizados");
  }
}

// ========================================
// INICIALIZACIÓN
// ========================================

window.surtienvases = window.surtienvases || {};
window.surtienvases.products = new ProductsSystemPHP();
window.productsSystemPHP = window.surtienvases.products;

console.log("✓ Sistema de productos PHP inicializado");
