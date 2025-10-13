// ========================================
// SISTEMA DE ADMINISTRACIÓN DE PRODUCTOS - PHP
// Consume API REST
// ========================================

class ProductAdminPHP {
  constructor() {
    this.apiUrl = window.API_URL || "api.php";
    this.products = [];
    this.categories = [];
    this.industries = [];
    this.init();
  }

  async init() {
    await this.loadProducts();
    await this.loadCategories();
    await this.loadIndustries();
    this.setupForm();
    this.setupDynamicFields();
    this.renderProductsList();
    this.populateSelects();
  }

  // ========================================
  // CARGAR DATOS DESDE API
  // ========================================

  async loadProducts() {
    try {
      const response = await fetch(`${this.apiUrl}?action=get_products`);
      const data = await response.json();

      if (data.success) {
        this.products = data.data;
        console.log(`✓ ${this.products.length} productos cargados`);
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

  // ========================================
  // POBLAR SELECTS
  // ========================================

  populateSelects() {
    // Poblar select de categorías
    const categorySelect = document.getElementById("product-category");
    if (categorySelect) {
      categorySelect.innerHTML = this.categories
        .map(
          (cat) =>
            `<option value="${cat.name}">${cat.icon} ${cat.name}</option>`
        )
        .join("");
    }

    // Poblar select de industrias
    const industrySelect = document.getElementById("product-industry");
    if (industrySelect) {
      industrySelect.innerHTML = this.industries
        .map(
          (ind) =>
            `<option value="${ind.name}">${ind.icon} ${ind.name}</option>`
        )
        .join("");
    }
  }

  // ========================================
  // SETUP FORMULARIO
  // ========================================

  setupForm() {
    const form = document.getElementById("admin-product-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleProductSubmit();
    });
  }

  setupDynamicFields() {
    const addSpecBtn = document.getElementById("add-specification");
    if (addSpecBtn) {
      addSpecBtn.addEventListener("click", () => {
        this.addSpecificationField();
      });
    }

    const addBenefitBtn = document.getElementById("add-benefit");
    if (addBenefitBtn) {
      addBenefitBtn.addEventListener("click", () => {
        this.addBenefitField();
      });
    }
  }

  addSpecificationField() {
    const container = document.getElementById("specifications-container");
    if (!container) return;

    const fieldDiv = document.createElement("div");
    fieldDiv.className = "uk-margin-small";
    fieldDiv.innerHTML = `
      <div class="uk-inline uk-width-1-1">
        <input class="uk-input specification-input" type="text" 
               placeholder="Ej: Capacidad: 250ml">
        <button type="button" class="uk-button uk-button-small uk-button-danger uk-position-small-right remove-field">
          <span uk-icon="close"></span>
        </button>
      </div>
    `;

    container.appendChild(fieldDiv);

    const removeBtn = fieldDiv.querySelector(".remove-field");
    removeBtn.addEventListener("click", () => {
      fieldDiv.remove();
    });
  }

  addBenefitField() {
    const container = document.getElementById("benefits-container");
    if (!container) return;

    const fieldDiv = document.createElement("div");
    fieldDiv.className = "uk-margin-small";
    fieldDiv.innerHTML = `
      <div class="uk-inline uk-width-1-1">
        <input class="uk-input benefit-input" type="text" 
               placeholder="Ej: Apto para alimentos">
        <button type="button" class="uk-button uk-button-small uk-button-danger uk-position-small-right remove-field">
          <span uk-icon="close"></span>
        </button>
      </div>
    `;

    container.appendChild(fieldDiv);

    const removeBtn = fieldDiv.querySelector(".remove-field");
    removeBtn.addEventListener("click", () => {
      fieldDiv.remove();
    });
  }

  // ========================================
  // CREAR PRODUCTO
  // ========================================

  async handleProductSubmit() {
    const formData = {
      title: document.getElementById("product-title").value.trim(),
      price: document.getElementById("product-price").value.trim(),
      origin: document.getElementById("product-origin").value,
      material: document.getElementById("product-material").value.trim(),
      category: document.getElementById("product-category").value,
      industry: document.getElementById("product-industry").value,
      description: document.getElementById("product-description").value.trim(),
      recommendation: document
        .getElementById("product-recommendation")
        .value.trim(),
      minimumOrder: document
        .getElementById("product-minimum-order")
        .value.trim(),
      certification: document
        .getElementById("product-certification")
        .value.trim(),
      stock: document.getElementById("product-stock").value,
      isPopular: document.getElementById("product-popular").checked,
      specifications: this.getSpecifications(),
      benefits: this.getBenefits(),
      img:
        document.getElementById("product-image").value.trim() ||
        "assets/img/productos/default-product.jpg",
    };

    if (!formData.title || !formData.description) {
      UIkit.notification({
        message:
          "Por favor completa los campos requeridos (título y descripción)",
        status: "warning",
        pos: "top-center",
      });
      return;
    }

    try {
      const response = await fetch(`${this.apiUrl}?action=create_product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        UIkit.notification({
          message: "Producto agregado exitosamente",
          status: "success",
          pos: "top-center",
        });

        // Recargar productos
        await this.loadProducts();
        this.renderProductsList();

        // Limpiar formulario
        document.getElementById("admin-product-form").reset();
        document.getElementById("specifications-container").innerHTML = "";
        document.getElementById("benefits-container").innerHTML = "";

        document
          .getElementById("products-list")
          ?.scrollIntoView({ behavior: "smooth" });
      } else {
        UIkit.notification({
          message: "Error: " + data.error,
          status: "danger",
          pos: "top-center",
        });
      }
    } catch (error) {
      UIkit.notification({
        message: "Error de red: " + error.message,
        status: "danger",
        pos: "top-center",
      });
    }
  }

  getSpecifications() {
    const inputs = document.querySelectorAll(".specification-input");
    return Array.from(inputs)
      .map((input) => input.value.trim())
      .filter((value) => value !== "");
  }

  getBenefits() {
    const inputs = document.querySelectorAll(".benefit-input");
    return Array.from(inputs)
      .map((input) => input.value.trim())
      .filter((value) => value !== "");
  }

  // ========================================
  // RENDERIZAR LISTA DE PRODUCTOS
  // ========================================

  renderProductsList() {
    const container = document.getElementById("products-list");
    if (!container) return;

    if (this.products.length === 0) {
      container.innerHTML = `
        <div class="uk-text-center uk-padding">
          <p class="uk-text-muted">No hay productos registrados</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l" uk-grid>
        ${this.products
          .map((product) => this.createProductCard(product))
          .join("")}
      </div>
    `;
  }

  createProductCard(product) {
    return `
      <div>
        <div class="uk-card uk-card-default uk-card-hover uk-card-body uk-position-relative contenedor-redondeado">
          <button class="boton-eliminar-producto" 
                  onclick="productAdminPHP.deleteProduct(${product.id})"
                  aria-label="Eliminar producto">
          </button>
          
          <div class="uk-card-media-top">
            <img src="${product.img}" alt="${product.title}" 
                 style="height: 150px; object-fit: cover;">
          </div>
          
          <h3 class="uk-card-title uk-text-truncate uk-margin-small-top">
            ${product.title}
          </h3>
          
          <div class="uk-text-meta uk-margin-small">
            <div><strong>Categoría:</strong> ${product.category}</div>
            <div><strong>Industria:</strong> ${product.industry}</div>
            <div><strong>Stock:</strong> ${product.stock}</div>
          </div>
          
          <p class="uk-text-small uk-text-truncate">
            ${product.description}
          </p>
          
          ${product.isPopular ? '<span class="uk-badge">Popular</span>' : ""}
        </div>
      </div>
    `;
  }

  // ========================================
  // ELIMINAR PRODUCTO
  // ========================================

  async deleteProduct(productId) {
    const confirmed = await UIkit.modal.confirm(
      "¿Estás seguro de eliminar este producto?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${this.apiUrl}?action=delete_product&id=${productId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (data.success) {
        UIkit.notification({
          message: "Producto eliminado exitosamente",
          status: "success",
          pos: "top-center",
        });

        // Recargar productos
        await this.loadProducts();
        this.renderProductsList();
      } else {
        UIkit.notification({
          message: "Error: " + data.error,
          status: "danger",
          pos: "top-center",
        });
      }
    } catch (error) {
      UIkit.notification({
        message: "Error de red: " + error.message,
        status: "danger",
        pos: "top-center",
      });
    }
  }
}

// Inicialización
window.productAdminPHP = new ProductAdminPHP();
console.log("✓ Sistema de administración de productos PHP inicializado");
