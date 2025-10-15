// ========================================
// SISTEMA DE ADMINISTRACIÓN DE CATEGORÍAS - PHP CORREGIDO
// Consume API REST + Actualización en tiempo real
// ========================================

class CategoryAdminPHP {
  constructor() {
    this.apiUrl = window.API_URL || "api.php";
    this.categories = [];
    this.industries = [];
    this.init();
  }

  async init() {
    await this.loadCategories();
    await this.loadIndustries();
    this.setupForms();
    this.renderCategoriesList();
    this.renderIndustriesList();
    console.log("✅ Sistema de administración de categorías inicializado");
  }

  // ========================================
  // CARGAR DATOS DESDE API
  // ========================================

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
  // SETUP FORMULARIOS
  // ========================================

  setupForms() {
    const categoryForm = document.getElementById("admin-category-form");
    if (categoryForm) {
      categoryForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleCategorySubmit();
      });
    }

    const industryForm = document.getElementById("admin-industry-form");
    if (industryForm) {
      industryForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleIndustrySubmit();
      });
    }
    console.log("✅ Formularios configurados");
  }

  // ========================================
  // CREAR CATEGORÍA
  // ========================================

  async handleCategorySubmit() {
    console.log("📝 Procesando nueva categoría...");

    const name = document.getElementById("category-name").value.trim();
    const icon = document.getElementById("category-icon").value.trim() || "📦";

    if (!name) {
      UIkit.notification({
        message: "⚠️ Por favor ingresa un nombre para la categoría",
        status: "warning",
        pos: "top-center",
      });
      return;
    }

    const key = this.generateKey(name);
    console.log("🔑 Key generada:", key);

    try {
      console.log("📤 Enviando categoría a la API...");
      const response = await fetch(`${this.apiUrl}?action=create_category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, key, icon }),
      });

      const data = await response.json();
      console.log("📥 Respuesta de la API:", data);

      if (data.success) {
        UIkit.notification({
          message: "✅ Categoría agregada exitosamente",
          status: "success",
          pos: "top-center",
        });

        // Recargar categorías
        await this.loadCategories();
        this.renderCategoriesList();

        // IMPORTANTE: Actualizar otros sistemas en TIEMPO REAL
        console.log("🔄 Actualizando otros sistemas...");

        if (window.productAdminPHP) {
          await window.productAdminPHP.loadCategories();
          window.productAdminPHP.populateSelects();
          console.log("✅ Admin de productos actualizado");
        }

        if (window.productsSystemPHP) {
          await window.productsSystemPHP.refreshCategories();
          console.log("✅ Página de productos actualizada");
        }

        if (window.catalogoSystemPHP) {
          await window.catalogoSystemPHP.loadCategories();
          window.catalogoSystemPHP.updateCategorySelect();
          console.log("✅ Catálogo actualizado");
        }

        document.getElementById("admin-category-form").reset();
      } else {
        UIkit.notification({
          message: "❌ Error: " + data.error,
          status: "danger",
          pos: "top-center",
        });
      }
    } catch (error) {
      console.error("❌ Error al crear categoría:", error);
      UIkit.notification({
        message: "❌ Error de red: " + error.message,
        status: "danger",
        pos: "top-center",
      });
    }
  }

  // ========================================
  // CREAR INDUSTRIA
  // ========================================

  async handleIndustrySubmit() {
    console.log("📝 Procesando nueva industria...");

    const name = document.getElementById("industry-name").value.trim();
    const icon = document.getElementById("industry-icon").value.trim() || "🏭";

    if (!name) {
      UIkit.notification({
        message: "⚠️ Por favor ingresa un nombre para la industria",
        status: "warning",
        pos: "top-center",
      });
      return;
    }

    const key = this.generateKey(name);
    console.log("🔑 Key generada:", key);

    try {
      console.log("📤 Enviando industria a la API...");
      const response = await fetch(`${this.apiUrl}?action=create_industry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, key, icon }),
      });

      const data = await response.json();
      console.log("📥 Respuesta de la API:", data);

      if (data.success) {
        UIkit.notification({
          message: "✅ Industria agregada exitosamente",
          status: "success",
          pos: "top-center",
        });

        // Recargar industrias
        await this.loadIndustries();
        this.renderIndustriesList();

        // IMPORTANTE: Actualizar otros sistemas en TIEMPO REAL
        console.log("🔄 Actualizando otros sistemas...");

        if (window.productAdminPHP) {
          await window.productAdminPHP.loadIndustries();
          window.productAdminPHP.populateSelects();
          console.log("✅ Admin de productos actualizado");
        }

        if (window.catalogoSystemPHP) {
          await window.catalogoSystemPHP.loadIndustries();
          window.catalogoSystemPHP.updateIndustryButtons();
          console.log("✅ Catálogo actualizado");
        }

        document.getElementById("admin-industry-form").reset();
      } else {
        UIkit.notification({
          message: "❌ Error: " + data.error,
          status: "danger",
          pos: "top-center",
        });
      }
    } catch (error) {
      console.error("❌ Error al crear industria:", error);
      UIkit.notification({
        message: "❌ Error de red: " + error.message,
        status: "danger",
        pos: "top-center",
      });
    }
  }

  // ========================================
  // GENERAR KEY
  // ========================================

  generateKey(name) {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "_");
  }

  // ========================================
  // RENDERIZAR LISTAS
  // ========================================

  renderCategoriesList() {
    const container = document.getElementById("categories-list");
    if (!container) return;

    if (this.categories.length === 0) {
      container.innerHTML =
        '<p class="uk-text-muted uk-text-center">No hay categorías registradas</p>';
      return;
    }

    container.innerHTML = `
      <div class="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l" uk-grid>
        ${this.categories.map((cat) => this.createCategoryCard(cat)).join("")}
      </div>
    `;
    console.log("✅ Lista de categorías renderizada");
  }

  renderIndustriesList() {
    const container = document.getElementById("industries-list");
    if (!container) return;

    if (this.industries.length === 0) {
      container.innerHTML =
        '<p class="uk-text-muted uk-text-center">No hay industrias registradas</p>';
      return;
    }

    container.innerHTML = `
      <div class="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l" uk-grid>
        ${this.industries.map((ind) => this.createIndustryCard(ind)).join("")}
      </div>
    `;
    console.log("✅ Lista de industrias renderizada");
  }

  createCategoryCard(category) {
    return `
      <div>
        <div class="uk-card uk-card-default uk-card-body uk-text-center uk-position-relative contenedor-redondeado">
          <button class="boton-eliminar-categoria" 
                  onclick="categoryAdminPHP.deleteCategory(${category.id})"
                  aria-label="Eliminar categoría">
          </button>
          
          <div class="uk-text-large">${category.icon}</div>
          <h4 class="uk-card-title uk-margin-small-top">${category.name}</h4>
          <p class="uk-text-meta uk-margin-remove">Key: ${category.key}</p>
        </div>
      </div>
    `;
  }

  createIndustryCard(industry) {
    return `
      <div>
        <div class="uk-card uk-card-default uk-card-body uk-text-center uk-position-relative contenedor-redondeado">
          <button class="boton-eliminar-categoria" 
                  onclick="categoryAdminPHP.deleteIndustry(${industry.id})"
                  aria-label="Eliminar industria">
          </button>
          
          <div class="uk-text-large">${industry.icon}</div>
          <h4 class="uk-card-title uk-margin-small-top">${industry.name}</h4>
          <p class="uk-text-meta uk-margin-remove">Key: ${industry.key}</p>
        </div>
      </div>
    `;
  }

  // ========================================
  // ELIMINAR CATEGORÍA
  // ========================================

  deleteCategory(categoryId) {
    console.log("🗑️ Intentando eliminar categoría ID:", categoryId);

    if (!window.confirm("¿Estás seguro de eliminar esta categoría?")) {
      console.log("❌ Eliminación cancelada por el usuario");
      return;
    }

    console.log("⏳ Eliminando categoría...");

    fetch(`${this.apiUrl}?action=delete_category&id=${categoryId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("📥 Respuesta de eliminación:", data);

        if (data.success) {
          UIkit.notification({
            message: "✅ Categoría eliminada exitosamente",
            status: "success",
            pos: "top-center",
          });

          this.loadCategories().then(() => {
            this.renderCategoriesList();

            // IMPORTANTE: Actualizar otros sistemas en TIEMPO REAL
            console.log("🔄 Actualizando otros sistemas tras eliminación...");

            if (window.productAdminPHP) {
              window.productAdminPHP.loadCategories().then(() => {
                window.productAdminPHP.populateSelects();
                console.log("✅ Admin de productos actualizado");
              });
            }

            if (window.productsSystemPHP) {
              window.productsSystemPHP.refreshCategories();
              console.log("✅ Página de productos actualizada");
            }

            if (window.catalogoSystemPHP) {
              window.catalogoSystemPHP.loadCategories().then(() => {
                window.catalogoSystemPHP.updateCategorySelect();
                console.log("✅ Catálogo actualizado");
              });
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

  deleteIndustry(industryId) {
    console.log("🗑️ Intentando eliminar industria ID:", industryId);

    if (!window.confirm("¿Estás seguro de eliminar esta industria?")) {
      console.log("❌ Eliminación cancelada por el usuario");
      return;
    }

    console.log("⏳ Eliminando industria...");

    fetch(`${this.apiUrl}?action=delete_industry&id=${industryId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("📥 Respuesta de eliminación:", data);

        if (data.success) {
          UIkit.notification({
            message: "✅ Industria eliminada exitosamente",
            status: "success",
            pos: "top-center",
          });

          this.loadIndustries().then(() => {
            this.renderIndustriesList();

            // IMPORTANTE: Actualizar otros sistemas en TIEMPO REAL
            console.log("🔄 Actualizando otros sistemas tras eliminación...");

            if (window.productAdminPHP) {
              window.productAdminPHP.loadIndustries().then(() => {
                window.productAdminPHP.populateSelects();
                console.log("✅ Admin de productos actualizado");
              });
            }

            if (window.catalogoSystemPHP) {
              window.catalogoSystemPHP.loadIndustries().then(() => {
                window.catalogoSystemPHP.updateIndustryButtons();
                console.log("✅ Catálogo actualizado");
              });
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

  // ========================================
  // API PÚBLICA
  // ========================================

  getCategories() {
    return this.categories;
  }

  getIndustries() {
    return this.industries;
  }
}

// ========================================
// INICIALIZACIÓN
// ========================================

window.categoryAdminPHP = new CategoryAdminPHP();
console.log("✅ Sistema de administración de categorías PHP inicializado");
