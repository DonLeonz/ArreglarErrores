// ========================================
// SISTEMA DE ADMINISTRACIÓN DE CATEGORÍAS - PHP
// Consume API REST
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
  }

  // ========================================
  // CREAR CATEGORÍA
  // ========================================

  async handleCategorySubmit() {
    const name = document.getElementById("category-name").value.trim();
    const icon = document.getElementById("category-icon").value.trim() || "📦";

    if (!name) {
      UIkit.notification({
        message: "Por favor ingresa un nombre para la categoría",
        status: "warning",
        pos: "top-center",
      });
      return;
    }

    const key = this.generateKey(name);

    try {
      const response = await fetch(`${this.apiUrl}?action=create_category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, key, icon }),
      });

      const data = await response.json();

      if (data.success) {
        UIkit.notification({
          message: "Categoría agregada exitosamente",
          status: "success",
          pos: "top-center",
        });

        // Recargar categorías
        await this.loadCategories();
        this.renderCategoriesList();

        // Actualizar otros sistemas
        if (window.productAdminPHP) {
          await window.productAdminPHP.loadCategories();
          window.productAdminPHP.populateSelects();
        }

        document.getElementById("admin-category-form").reset();
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

  // ========================================
  // CREAR INDUSTRIA
  // ========================================

  async handleIndustrySubmit() {
    const name = document.getElementById("industry-name").value.trim();
    const icon = document.getElementById("industry-icon").value.trim() || "🏭";

    if (!name) {
      UIkit.notification({
        message: "Por favor ingresa un nombre para la industria",
        status: "warning",
        pos: "top-center",
      });
      return;
    }

    const key = this.generateKey(name);

    try {
      const response = await fetch(`${this.apiUrl}?action=create_industry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, key, icon }),
      });

      const data = await response.json();

      if (data.success) {
        UIkit.notification({
          message: "Industria agregada exitosamente",
          status: "success",
          pos: "top-center",
        });

        // Recargar industrias
        await this.loadIndustries();
        this.renderIndustriesList();

        // Actualizar otros sistemas
        if (window.productAdminPHP) {
          await window.productAdminPHP.loadIndustries();
          window.productAdminPHP.populateSelects();
        }

        document.getElementById("admin-industry-form").reset();
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

  async deleteCategory(categoryId) {
    const confirmed = await UIkit.modal.confirm(
      "¿Estás seguro de eliminar esta categoría?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${this.apiUrl}?action=delete_category&id=${categoryId}`
      );
      const data = await response.json();

      if (data.success) {
        UIkit.notification({
          message: "Categoría eliminada exitosamente",
          status: "success",
          pos: "top-center",
        });

        await this.loadCategories();
        this.renderCategoriesList();

        // Actualizar otros sistemas
        if (window.productAdminPHP) {
          await window.productAdminPHP.loadCategories();
          window.productAdminPHP.populateSelects();
        }
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

  // ========================================
  // ELIMINAR INDUSTRIA
  // ========================================

  async deleteIndustry(industryId) {
    const confirmed = await UIkit.modal.confirm(
      "¿Estás seguro de eliminar esta industria?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${this.apiUrl}?action=delete_industry&id=${industryId}`
      );
      const data = await response.json();

      if (data.success) {
        UIkit.notification({
          message: "Industria eliminada exitosamente",
          status: "success",
          pos: "top-center",
        });

        await this.loadIndustries();
        this.renderIndustriesList();

        // Actualizar otros sistemas
        if (window.productAdminPHP) {
          await window.productAdminPHP.loadIndustries();
          window.productAdminPHP.populateSelects();
        }
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

// Inicialización
window.categoryAdminPHP = new CategoryAdminPHP();
console.log("✓ Sistema de administración de categorías PHP inicializado");
