// ========================================
// ADMIN PRODUCTOS - CON MODERN IMAGE UPLOADER
// ========================================

class ProductAdminPHP {
  constructor() {
    this.apiUrl = window.API_URL || "api.php";
    this.products = [];
    this.categories = [];
    this.industries = [];
    this.imageUploader = null; // Nuevo uploader
    this.init();
  }

  async init() {
    await this.loadProducts();
    await this.loadCategories();
    await this.loadIndustries();
    this.setupForm();
    this.setupDynamicFields();
    this.setupModernImageUploader(); // ✅ NUEVO
    this.renderProductsList();
    this.populateSelects();
    console.log("✅ Sistema de administración de productos inicializado");
  }

  // ========================================
  // SETUP MODERN IMAGE UPLOADER
  // ========================================
  setupModernImageUploader() {
    console.log("🖼️ Configurando Modern Image Uploader...");

    // Verificar que la clase existe
    if (typeof ModernImageUploader === "undefined") {
      console.error("❌ ModernImageUploader no está cargado");
      return;
    }

    // Crear contenedor si no existe
    const formContainer = document.getElementById("admin-product-form");
    if (!formContainer) return;

    // Buscar el contenedor de imagen o crearlo
    let imageSection = formContainer.querySelector(".image-upload-section");
    if (!imageSection) {
      // Crear sección de imagen antes del botón submit
      const submitSection =
        formContainer.querySelector('[type="submit"]').parentElement;
      imageSection = document.createElement("div");
      imageSection.className =
        "uk-width-1-1 uk-margin-top image-upload-section";
      imageSection.innerHTML = `
        <h3 class="uk-h4">Imagen del Producto</h3>
        <div id="product-image-uploader"></div>
      `;
      submitSection.parentElement.insertBefore(imageSection, submitSection);
    }

    // Inicializar el uploader moderno
    this.imageUploader = new ModernImageUploader({
      entityType: "producto",
      autoCompress: true,
      compressionQuality: 0.85,
      maxWidth: 1200,
      maxHeight: 1200,
      onUploadSuccess: (result) => {
        console.log("✅ Imagen de producto subida:", result.url);
        // El URL ya se guarda automáticamente en #uploaded-image-url
      },
      onUploadError: (error) => {
        console.error("❌ Error al subir imagen:", error);
      },
    });

    this.imageUploader.init("product-image-uploader");
    console.log("✅ Modern Image Uploader configurado para productos");
  }

  // ========================================
  // RESTO DEL CÓDIGO (sin cambios)
  // ========================================

  async loadProducts() {
    try {
      const response = await fetch(`${this.apiUrl}?action=get_products`);
      const data = await response.json();
      if (data.success) {
        this.products = data.data;
        console.log(`✅ ${this.products.length} productos cargados`);
      }
    } catch (error) {
      console.error("❌ Error al cargar productos:", error);
    }
  }

  async loadCategories() {
    try {
      const response = await fetch(`${this.apiUrl}?action=get_categories`);
      const data = await response.json();
      if (data.success) {
        this.categories = data.data;
        console.log(`✅ ${this.categories.length} categorías cargadas`);
      }
    } catch (error) {
      console.error("❌ Error al cargar categorías:", error);
    }
  }

  async loadIndustries() {
    try {
      const response = await fetch(`${this.apiUrl}?action=get_industries`);
      const data = await response.json();
      if (data.success) {
        this.industries = data.data;
        console.log(`✅ ${this.industries.length} industrias cargadas`);
      }
    } catch (error) {
      console.error("❌ Error al cargar industrias:", error);
    }
  }

  populateSelects() {
    const categorySelect = document.getElementById("product-category");
    if (categorySelect) {
      categorySelect.innerHTML = this.categories
        .map(
          (cat) =>
            `<option value="${cat.name}">${cat.icon} ${cat.name}</option>`
        )
        .join("");
      console.log("✅ Select de categorías poblado");
    }

    const industrySelect = document.getElementById("product-industry");
    if (industrySelect) {
      industrySelect.innerHTML = this.industries
        .map(
          (ind) =>
            `<option value="${ind.name}">${ind.icon} ${ind.name}</option>`
        )
        .join("");
      console.log("✅ Select de industrias poblado");
    }
  }

  setupForm() {
    const form = document.getElementById("admin-product-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleProductSubmit();
    });
    console.log("✅ Formulario de productos configurado");
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
    console.log("✅ Campos dinámicos configurados");
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

  async handleProductSubmit() {
    console.log("📝 Procesando formulario de producto...");

    // Obtener URL de imagen del uploader moderno
    const imageUrlInput = document.getElementById("uploaded-image-url");
    const imageUrl = imageUrlInput
      ? imageUrlInput.value
      : "assets/img/productos/default-product.jpg";

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
      img: imageUrl, // ✅ Usar la URL del nuevo uploader
    };

    console.log("📊 Datos del producto:", formData);

    if (!formData.title || !formData.description) {
      UIkit.notification({
        message:
          "⚠️ Por favor completa los campos requeridos (título y descripción)",
        status: "warning",
        pos: "top-center",
      });
      return;
    }

    try {
      console.log("📤 Enviando producto a la API...");
      const response = await fetch(`${this.apiUrl}?action=create_product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("📥 Respuesta de la API:", data);

      if (data.success) {
        UIkit.notification({
          message: "✅ Producto agregado exitosamente",
          status: "success",
          pos: "top-center",
        });

        await this.loadProducts();
        this.renderProductsList();

        if (window.productsSystemPHP) {
          await window.productsSystemPHP.refreshProducts();
          console.log("✅ Productos actualizados en la página principal");
        }

        document.getElementById("admin-product-form").reset();
        document.getElementById("specifications-container").innerHTML = "";
        document.getElementById("benefits-container").innerHTML = "";

        // ✅ Reset del uploader moderno
        if (this.imageUploader) {
          const container = document.getElementById("product-image-uploader");
          this.imageUploader.reset(container);
        }

        document
          .getElementById("products-list")
          ?.scrollIntoView({ behavior: "smooth" });
      } else {
        UIkit.notification({
          message: "❌ Error: " + data.error,
          status: "danger",
          pos: "top-center",
        });
      }
    } catch (error) {
      console.error("❌ Error al crear producto:", error);
      UIkit.notification({
        message: "❌ Error de red: " + error.message,
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
    console.log("✅ Lista de productos renderizada");
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

  deleteProduct(productId) {
    console.log("🗑️ Intentando eliminar producto ID:", productId);

    if (!window.confirm("¿Estás seguro de eliminar este producto?")) {
      console.log("❌ Eliminación cancelada por el usuario");
      return;
    }

    console.log("⏳ Eliminando producto...");

    fetch(`${this.apiUrl}?action=delete_product&id=${productId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("📥 Respuesta de eliminación:", data);

        if (data.success) {
          UIkit.notification({
            message: "✅ Producto eliminado exitosamente",
            status: "success",
            pos: "top-center",
          });

          this.loadProducts().then(() => {
            this.renderProductsList();

            if (window.productsSystemPHP) {
              window.productsSystemPHP.refreshProducts();
              console.log("✅ Productos actualizados en la página principal");
            }
          });
        } else {
          UIkit.notification({
            message: "❌ Error: " + data.error,
            status: "danger",
            pos: "top-center",
          });
        }
      })
      .catch((error) => {
        console.error("❌ Error al eliminar:", error);
        UIkit.notification({
          message: "❌ Error de red: " + error.message,
          status: "danger",
          pos: "top-center",
        });
      });
  }
}

// ========================================
// INICIALIZACIÓN
// ========================================
window.productAdminPHP = new ProductAdminPHP();
console.log("✅ Sistema de administración de productos PHP inicializado");
