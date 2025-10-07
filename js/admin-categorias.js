// ========================================
// SISTEMA DE ADMINISTRACIÓN DE CATEGORÍAS
// Crear categorías dinámicas para catálogo y productos
// ========================================

class CategoryAdmin {
  constructor() {
    this.categories = this.loadCategories();
    this.industries = this.loadIndustries();
    this.init();
  }

  loadCategories() {
  /**
   * Carga categorías dinámicas para catálogo y productos.
   * Combina categorías predefinidas con categorías personalizadas guardadas en localStorage.
   * @returns {Array} Un array de objetos con formato {id, name, key, icon, isDeletable}
   */
    try {
      const stored = localStorage.getItem("allCategories");
      if (stored) {
        return JSON.parse(stored);
      } else {
        // Categorías predefinidas
        const defaults = [
          { id: 1, name: "Envases de Vidrio", key: "vidrio", icon: "🫙" },
          { id: 2, name: "Envases Plásticos", key: "plastico", icon: "🧴" },
          { id: 3, name: "Tapas y Complementos", key: "tapas", icon: "🔧" },
          { id: 4, name: "Envases Cosméticos", key: "cosmetico", icon: "💄" },
          { id: 5, name: "Envases Farmacéuticos", key: "farmaceutico", icon: "💊" },
          { id: 6, name: "Envases Industriales", key: "industrial", icon: "🏗️" }
        ];
        this.saveCategories(defaults);
        return defaults;
      }
    } catch (e) {
      console.error("Error al cargar categorías:", e);
      return [];
    }
  }

  loadIndustries() {
    try {
      const stored = localStorage.getItem("allIndustries");
      if (stored) {
        return JSON.parse(stored);
      } else {
        // Industrias predefinidas
        const defaults = [
          { id: 1, name: "Alimentos", key: "alimentos", icon: "🍽️" },
          { id: 2, name: "Bebidas", key: "bebidas", icon: "🥤" },
          { id: 3, name: "Cosmética", key: "cosmetica", icon: "💄" },
          { id: 4, name: "Farmacéutica", key: "farmaceutica", icon: "💊" },
          { id: 5, name: "Químicos", key: "quimicos", icon: "⚗️" },
          { id: 6, name: "Limpieza", key: "limpieza", icon: "🧹" },
          { id: 7, name: "Industrial", key: "industrial", icon: "🏗️" }
        ];
        this.saveIndustries(defaults);
        return defaults;
      }
    } catch (e) {
      console.error("Error al cargar industrias:", e);
      return [];
    }
  }

  saveCategories(categoriesToSave = null) {
    try {
      const categories = categoriesToSave || this.categories;
      localStorage.setItem("allCategories", JSON.stringify(categories));
      this.updateSystemCategories();
    } catch (e) {
      console.error("Error al guardar categorías:", e);
    }
  }

  saveIndustries(industriesToSave = null) {
    try {
      const industries = industriesToSave || this.industries;
      localStorage.setItem("allIndustries", JSON.stringify(industries));
      this.updateSystemIndustries();
    } catch (e) {
      console.error("Error al guardar industrias:", e);
    }
  }

  updateSystemCategories() {
    this.updateCategorySelects();
    
    if (window.catalogoSystem) {
      this.updateCatalogFilters();
    }
    
    if (window.productsSystem) {
      this.updateProductFilters();
    }
  }

  updateSystemIndustries() {
    this.updateIndustrySelects();
    
    if (window.catalogoSystem) {
      this.updateCatalogIndustryFilters();
    }
  }

  init() {
    this.setupForms();
    this.renderCategoriesList();
    this.renderIndustriesList();
    this.updateSystemCategories();
    this.updateSystemIndustries();
  }

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

  handleCategorySubmit() {
    const name = document.getElementById("category-name").value.trim();
    const icon = document.getElementById("category-icon").value.trim() || "📦";

    if (!name) {
      UIkit.notification({
        message: "Por favor ingresa un nombre para la categoría",
        status: "warning",
        pos: "top-center"
      });
      return;
    }

    const key = this.generateKey(name);

    if (this.categories.find(c => c.key === key)) {
      UIkit.notification({
        message: "Ya existe una categoría con ese nombre",
        status: "warning",
        pos: "top-center"
      });
      return;
    }

    const maxId = this.categories.reduce((max, c) => Math.max(max, c.id), 0);
    const newCategory = {
      id: maxId + 1,
      name: name,
      key: key,
      icon: icon
    };

    this.categories.push(newCategory);
    this.saveCategories();
    this.renderCategoriesList();

    document.getElementById("admin-category-form").reset();

    UIkit.notification({
      message: "Categoría agregada exitosamente",
      status: "success",
      pos: "top-center"
    });
  }

  handleIndustrySubmit() {
    const name = document.getElementById("industry-name").value.trim();
    const icon = document.getElementById("industry-icon").value.trim() || "🏭";

    if (!name) {
      UIkit.notification({
        message: "Por favor ingresa un nombre para la industria",
        status: "warning",
        pos: "top-center"
      });
      return;
    }

    const key = this.generateKey(name);

    if (this.industries.find(i => i.key === key)) {
      UIkit.notification({
        message: "Ya existe una industria con ese nombre",
        status: "warning",
        pos: "top-center"
      });
      return;
    }

    const maxId = this.industries.reduce((max, i) => Math.max(max, i.id), 0);
    const newIndustry = {
      id: maxId + 1,
      name: name,
      key: key,
      icon: icon
    };

    this.industries.push(newIndustry);
    this.saveIndustries();
    this.renderIndustriesList();

    document.getElementById("admin-industry-form").reset();

    UIkit.notification({
      message: "Industria agregada exitosamente",
      status: "success",
      pos: "top-center"
    });
  }

  generateKey(name) {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "_");
  }

  renderCategoriesList() {
    const container = document.getElementById("categories-list");
    if (!container) return;

    if (this.categories.length === 0) {
      container.innerHTML = '<p class="uk-text-muted uk-text-center">No hay categorías registradas</p>';
      return;
    }

    container.innerHTML = `
      <div class="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l" uk-grid>
        ${this.categories.map(cat => this.createCategoryCard(cat)).join("")}
      </div>
    `;
  }

  renderIndustriesList() {
    const container = document.getElementById("industries-list");
    if (!container) return;

    if (this.industries.length === 0) {
      container.innerHTML = '<p class="uk-text-muted uk-text-center">No hay industrias registradas</p>';
      return;
    }

    container.innerHTML = `
      <div class="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l" uk-grid>
        ${this.industries.map(ind => this.createIndustryCard(ind)).join("")}
      </div>
    `;
  }

  createCategoryCard(category) {
    return `
      <div>
        <div class="uk-card uk-card-default uk-card-body uk-text-center uk-position-relative contenedor-redondeado">
          <button class="boton-eliminar-categoria" 
                  onclick="categoryAdmin.deleteCategory(${category.id})"
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
                  onclick="categoryAdmin.deleteIndustry(${industry.id})"
                  aria-label="Eliminar industria">
          </button>
          
          <div class="uk-text-large">${industry.icon}</div>
          <h4 class="uk-card-title uk-margin-small-top">${industry.name}</h4>
          <p class="uk-text-meta uk-margin-remove">Key: ${industry.key}</p>
        </div>
      </div>
    `;
  }

  deleteCategory(categoryId) {
    UIkit.modal.confirm("¿Estás seguro de eliminar esta categoría?").then(
      () => {
        this.categories = this.categories.filter(c => c.id !== categoryId);
        this.saveCategories();
        this.renderCategoriesList();

        UIkit.notification({
          message: "Categoría eliminada exitosamente",
          status: "success",
          pos: "top-center"
        });
      },
      () => {}
    );
  }

  deleteIndustry(industryId) {
    UIkit.modal.confirm("¿Estás seguro de eliminar esta industria?").then(
      () => {
        this.industries = this.industries.filter(i => i.id !== industryId);
        this.saveIndustries();
        this.renderIndustriesList();

        UIkit.notification({
          message: "Industria eliminada exitosamente",
          status: "success",
          pos: "top-center"
        });
      },
      () => {}
    );
  }

  updateCategorySelects() {
    const selects = document.querySelectorAll('select[id*="category"]');
    selects.forEach(select => {
      if (select.id === "category-filter") {
        const currentValue = select.value;
        select.innerHTML = `
          <option value="">Todas las categorías</option>
          ${this.categories.map(cat => 
            `<option value="${cat.key}">${cat.name}</option>`
          ).join("")}
        `;
        select.value = currentValue;
      } else if (select.id === "product-category") {
        const currentValue = select.value;
        select.innerHTML = this.categories.map(cat => 
          `<option value="${cat.name}">${cat.icon} ${cat.name}</option>`
        ).join("");
        select.value = currentValue;
      }
    });
  }

  updateIndustrySelects() {
    const selects = document.querySelectorAll('select[id*="industry"]');
    selects.forEach(select => {
      const currentValue = select.value;
      select.innerHTML = this.industries.map(ind => 
        `<option value="${ind.name}">${ind.icon} ${ind.name}</option>`
      ).join("");
      select.value = currentValue;
    });
  }

  updateCatalogFilters() {
    const filterSelect = document.getElementById("category-filter");
    if (filterSelect) {
      this.updateCategorySelects();
    }
  }

  updateCatalogIndustryFilters() {
    const container = document.querySelector('[data-industry]')?.parentElement?.parentElement;
    if (!container) return;

    container.innerHTML = this.industries.map(ind => `
      <div>
        <button class="uk-button uk-button-default uk-width-1-1 boton-filtro-categoria-industria"
                data-industry="${ind.key}">
          ${ind.icon} ${ind.name}
        </button>
      </div>
    `).join("") + `
      <div>
        <button class="uk-button uk-button-default uk-width-1-1 boton-filtro-categoria-industria"
                data-industry="todas">
          📦 Todas
        </button>
      </div>
    `;

    if (window.catalogoSystem) {
      window.catalogoSystem.setupIndustryFilters();
    }
  }

  updateProductFilters() {
    const container = document.querySelector('[data-category]')?.parentElement?.parentElement;
    if (!container) return;

    const allButton = `
      <div>
        <button class="uk-button uk-button-default uk-width-1-1 boton-filtro-categoria-industria active"
                data-category="todos">
          📦 Todos
        </button>
      </div>
    `;

    const categoryButtons = this.categories
      .filter(cat => ["vidrio", "plastico", "farmaceutico"].includes(cat.key))
      .map(cat => `
        <div>
          <button class="uk-button uk-button-default uk-width-1-1 boton-filtro-categoria-industria"
                  data-category="${cat.key}">
            ${cat.icon} ${cat.name.replace("Envases ", "")}
          </button>
        </div>
      `).join("");

    const complementsButton = `
      <div>
        <button class="uk-button uk-button-default uk-width-1-1 boton-filtro-categoria-industria"
                data-category="complementos">
          🔧 Complementos
        </button>
      </div>
    `;

    container.innerHTML = allButton + categoryButtons + complementsButton;

    if (window.productsSystem) {
      window.productsSystem.setupCategoryFilters();
    }
  }

  getCategories() {
    return this.categories;
  }

  getIndustries() {
    return this.industries;
  }
}

// Inicialización
window.categoryAdmin = new CategoryAdmin();
console.log("✓ Sistema de administración de categorías inicializado");