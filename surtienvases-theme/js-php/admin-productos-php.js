// ========================================
// SISTEMA DE ADMINISTRACIÓN DE PRODUCTOS - PHP CORREGIDO
// Consume API REST + Funcionalidad completa de imágenes
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
    this.setupImageUploader();
    this.renderProductsList();
    this.populateSelects();
    console.log("✅ Sistema de administración de productos inicializado");
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
      console.log("✅ Select de categorías poblado");
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
      console.log("✅ Select de industrias poblado");
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

  // ========================================
  // SETUP IMAGE UPLOADER - CORREGIDO
  // ========================================

  setupImageUploader() {
    const uploadBtn = document.getElementById("upload-product-image-btn");
    if (!uploadBtn) {
      console.warn("⚠️ Botón de subir imagen no encontrado");
      return;
    }

    uploadBtn.addEventListener("click", () => {
      console.log("🖼️ Abriendo selector de imágenes...");
      this.openMediaUploader();
    });
    console.log("✅ Uploader de imágenes configurado");
  }

  openMediaUploader() {
    // Crear input file temporal
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) {
        console.log("⚠️ No se seleccionó ningún archivo");
        return;
      }

      console.log("📁 Archivo seleccionado:", file.name);

      // Validar que sea imagen
      if (!file.type.startsWith("image/")) {
        console.error("❌ El archivo no es una imagen");
        UIkit.notification({
          message: "Por favor selecciona un archivo de imagen válido",
          status: "warning",
          pos: "top-center",
        });
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        console.error("❌ Archivo muy grande:", file.size);
        UIkit.notification({
          message: "La imagen no debe superar 5MB",
          status: "warning",
          pos: "top-center",
        });
        return;
      }

      // Mostrar loading
      UIkit.notification({
        message: "⏳ Subiendo imagen...",
        status: "primary",
        pos: "top-center",
        timeout: 2000,
      });

      try {
        console.log("⬆️ Iniciando subida de imagen...");
        const uploadedPath = await this.uploadImage(file);
        console.log("✅ Imagen subida exitosamente:", uploadedPath);

        // Actualizar input con la ruta
        const imageInput = document.getElementById("product-image");
        if (imageInput) {
          imageInput.value = uploadedPath;
          console.log("✅ Input actualizado con la ruta");
        }

        // Mostrar preview
        this.showImagePreview(uploadedPath);

        UIkit.notification({
          message: "✅ Imagen subida exitosamente",
          status: "success",
          pos: "top-center",
        });
      } catch (error) {
        console.error("❌ Error al subir imagen:", error);
        UIkit.notification({
          message: "❌ Error al subir la imagen: " + error.message,
          status: "danger",
          pos: "top-center",
        });
      }
    };

    input.click();
  }

  getNonce() {
    console.log("🔐 Obteniendo nonce de seguridad...");

    // Primero intentar obtener del objeto localizado de WordPress
    if (
      typeof surtienvases_vars !== "undefined" &&
      surtienvases_vars.upload_nonce
    ) {
      console.log("✅ Nonce encontrado en surtienvases_vars");
      return surtienvases_vars.upload_nonce;
    }

    // Fallback: buscar en el DOM
    const nonceInput = document.querySelector('input[name="_wpnonce"]');
    if (nonceInput) {
      console.log("✅ Nonce encontrado en input _wpnonce");
      return nonceInput.value;
    }

    const nonceMeta = document.querySelector('meta[name="csrf-token"]');
    if (nonceMeta) {
      console.log("✅ Nonce encontrado en meta csrf-token");
      return nonceMeta.content;
    }

    console.error("⚠️ No se encontró el nonce de seguridad");
    return "";
  }

  async uploadImage(file) {
    console.log("📤 Preparando FormData para subir imagen...");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("action", "surtienvases_upload_product_image");

    const nonce = this.getNonce();
    if (!nonce) {
      throw new Error(
        "No se pudo obtener el nonce de seguridad. Recarga la página."
      );
    }
    formData.append("nonce", nonce);

    console.log("📤 Enviando imagen al servidor...");

    try {
      const ajaxUrl =
        typeof surtienvases_vars !== "undefined"
          ? surtienvases_vars.ajax_url
          : "/wp-admin/admin-ajax.php";

      console.log("🌐 URL AJAX:", ajaxUrl);

      const response = await fetch(ajaxUrl, {
        method: "POST",
        body: formData,
      });

      console.log("📥 Respuesta recibida del servidor");
      const data = await response.json();
      console.log("📊 Datos de respuesta:", data);

      if (data.success) {
        console.log("✅ Imagen subida correctamente:", data.data.url);
        return data.data.url;
      } else {
        console.error("❌ Error en la respuesta del servidor:", data);
        throw new Error(data.data.message || "Error al subir imagen");
      }
    } catch (error) {
      console.error("❌ Error en uploadImage:", error);
      throw error;
    }
  }

  showImagePreview(imagePath) {
    console.log("🖼️ Mostrando preview de imagen:", imagePath);

    const preview = document.getElementById("product-image-preview");
    const previewImg = document.getElementById("product-image-preview-img");

    if (preview && previewImg) {
      previewImg.src = imagePath;
      preview.classList.remove("uk-hidden");
      console.log("✅ Preview mostrado");
    } else {
      console.warn("⚠️ Elementos de preview no encontrados");
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
    console.log("📝 Procesando formulario de producto...");

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

        // Recargar productos
        await this.loadProducts();
        this.renderProductsList();

        // Actualizar en página de productos si está abierta
        if (window.productsSystemPHP) {
          await window.productsSystemPHP.refreshProducts();
          console.log("✅ Productos actualizados en la página principal");
        }

        // Limpiar formulario
        document.getElementById("admin-product-form").reset();
        document.getElementById("specifications-container").innerHTML = "";
        document.getElementById("benefits-container").innerHTML = "";

        // Ocultar preview de imagen
        const preview = document.getElementById("product-image-preview");
        if (preview) {
          preview.classList.add("uk-hidden");
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

  // ========================================
  // ELIMINAR PRODUCTO
  // ========================================

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

            // Actualizar en página de productos si está abierta
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
