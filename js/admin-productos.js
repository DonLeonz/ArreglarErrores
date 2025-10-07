// ========================================
// SISTEMA DE ADMINISTRACIÓN DE PRODUCTOS
// Crear, editar y eliminar productos
// ========================================

class ProductAdmin {
  constructor() {
    this.products = this.loadProducts();
    this.nextId = this.getNextId();
    this.init();
  }

  loadProducts() {
    try {
      const stored = localStorage.getItem("allProducts");
      if (stored) {
        // Si hay productos en localStorage, usar esos
        return JSON.parse(stored);
      } else {
        // Si no, cargar los por defecto y guardarlos
        const defaultProducts = window.productItems || [];
        this.saveProducts(defaultProducts);
        return defaultProducts;
      }
    } catch (e) {
      console.error("Error al cargar productos:", e);
      return window.productItems || [];
    }
  }

  getNextId() {
    const maxId = this.products.reduce((max, p) => Math.max(max, p.id), 0);
    return maxId + 1;
  }

  saveProducts(productsToSave = null) {
    try {
      const products = productsToSave || this.products;
      // Guardar TODOS los productos en localStorage
      localStorage.setItem("allProducts", JSON.stringify(products));

      // Actualizar window.productItems para otros sistemas
      window.productItems = products;

      // Notificar a otros sistemas
      if (window.productsSystem) {
        window.productsSystem.products = products;
        window.productsSystem.renderProducts();
      }
      if (window.catalogoSystem) {
        window.catalogoSystem.products = products;
      }
    } catch (e) {
      console.error("Error al guardar productos:", e);
    }
  }

  init() {
    this.setupForm();
    this.setupImagePreview();
    this.renderProductsList();
  }

  setupForm() {
    const form = document.getElementById("admin-product-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleProductSubmit();
    });

    this.setupDynamicFields();
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

  setupImagePreview() {
    const imageInput = document.getElementById("product-image");
    const preview = document.getElementById("image-preview");

    if (!imageInput || !preview) return;

    imageInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          preview.innerHTML = `
            <img src="${event.target.result}" alt="Preview" class="uk-border-rounded" 
                 style="max-width: 200px; max-height: 200px;">
          `;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  handleProductSubmit() {
    const formData = {
      id: this.nextId++,
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
      img: this.getImageUrl(),
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

    this.products.push(formData);
    this.saveProducts();
    this.renderProductsList();

    document.getElementById("admin-product-form").reset();
    document.getElementById("image-preview").innerHTML = "";
    document.getElementById("specifications-container").innerHTML = "";
    document.getElementById("benefits-container").innerHTML = "";

    UIkit.notification({
      message: "Producto agregado exitosamente",
      status: "success",
      pos: "top-center",
    });

    document
      .getElementById("products-list")
      ?.scrollIntoView({ behavior: "smooth" });
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

  getImageUrl() {
    const imageInput = document.getElementById("product-image");
    if (imageInput.files && imageInput.files[0]) {
      return URL.createObjectURL(imageInput.files[0]);
    }
    return "assets/img/productos/default-product.jpg";
  }

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
                  onclick="productAdmin.deleteProduct(${product.id})"
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

  deleteProduct(productId) {
    UIkit.modal.confirm("¿Estás seguro de eliminar este producto?").then(
      () => {
        this.products = this.products.filter((p) => p.id !== productId);
        this.saveProducts();
        this.renderProductsList();

        UIkit.notification({
          message: "Producto eliminado exitosamente",
          status: "success",
          pos: "top-center",
        });
      },
      () => {
        // Cancelado
      }
    );
  }
}

// Inicialización
window.productAdmin = new ProductAdmin();
console.log("✓ Sistema de administración de productos inicializado");
