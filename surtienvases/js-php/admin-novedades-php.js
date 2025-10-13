// ========================================
// SISTEMA DE ADMINISTRACIÓN DE NOVEDADES - PHP
// Consume API REST
// ========================================

class NovedadesAdminSystemPHP {
  constructor() {
    this.apiUrl = window.API_URL || "api.php";
    this.news = [];
    this.init();
  }

  async init() {
    await this.loadNews();
    this.renderNews();
    this.setupForm();
  }

  // ========================================
  // CARGAR DATOS DESDE API
  // ========================================

  async loadNews() {
    try {
      const response = await fetch(`${this.apiUrl}?action=get_news`);
      const data = await response.json();

      if (data.success) {
        this.news = data.data;
        console.log(`✓ ${this.news.length} noticias cargadas`);
      }
    } catch (error) {
      console.error("Error al cargar noticias:", error);
    }
  }

  // ========================================
  // SETUP FORMULARIO
  // ========================================

  setupForm() {
    const form = document.getElementById("news-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleNewsSubmit();
    });
  }

  // ========================================
  // CREAR NOTICIA
  // ========================================

  async handleNewsSubmit() {
    const title = document.getElementById("news-title").value.trim();
    const author =
      document.getElementById("news-author").value.trim() || "Usuario Invitado";
    const excerpt = document.getElementById("news-excerpt").value.trim();
    const imageUrl =
      document.getElementById("news-image").value.trim() ||
      "assets/img/blog/blogDefault.jpg";

    if (!title || !excerpt) {
      UIkit.notification({
        message: "Por favor completa todos los campos",
        status: "warning",
        pos: "top-center",
      });
      return;
    }

    try {
      const response = await fetch(`${this.apiUrl}?action=create_news`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          excerpt,
          imageUrl,
          avatarUrl: "assets/img/surtienvases/avatars/default.jpg",
        }),
      });

      const data = await response.json();

      if (data.success) {
        UIkit.notification({
          message: "Artículo publicado exitosamente",
          status: "success",
          pos: "top-center",
        });

        // Recargar noticias
        await this.loadNews();
        this.renderNews();

        // Limpiar formulario
        document.getElementById("news-form").reset();
        document.getElementById("news-author").value = "Usuario Invitado";
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
  // RENDERIZAR NOTICIAS
  // ========================================

  renderNews() {
    const container = document.getElementById("news-container");
    if (!container) return;

    if (this.news.length === 0) {
      container.innerHTML = `
        <div class="uk-width-1-1 uk-text-center uk-padding">
          <p class="uk-text-muted">No hay artículos publicados</p>
        </div>
      `;
      return;
    }

    container.innerHTML = this.news
      .map((article) => this.createArticleCard(article))
      .join("");
  }

  createArticleCard(article) {
    return `
      <div>
        <div class="uk-card uk-card-default uk-card-hover contenedor-redondeado texto-negro uk-position-relative">
          
          <button class="boton-eliminar-novedad" 
                  onclick="novedadesAdminPHP.deleteArticle(${article.id})"
                  aria-label="Eliminar artículo">
          </button>
          
          <div class="uk-card-media-top contenedor-imagen-altura-350">
            <img src="${article.imageUrl}" alt="${article.title}">
          </div>
          
          <div class="uk-card-body">
            <h3 class="uk-card-title">${article.title}</h3>
            <p>${article.excerpt}</p>
            
            <div class="uk-flex uk-flex-middle uk-margin-small-top">
              <img src="${article.avatarUrl}" alt="${article.author}"
                   class="uk-border-circle" width="40" height="40">
              <span class="uk-margin-small-left">${article.author}</span>
            </div>
            
            <p class="uk-text-meta uk-margin-small-top">
              Publicado: ${this.formatDate(article.created_at)}
            </p>
          </div>
        </div>
      </div>
    `;
  }

  // ========================================
  // ELIMINAR NOTICIA
  // ========================================

  async deleteArticle(articleId) {
    const confirmed = await UIkit.modal.confirm(
      "¿Estás seguro de eliminar este artículo? También se eliminarán todos sus comentarios."
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${this.apiUrl}?action=delete_news&id=${articleId}`
      );
      const data = await response.json();

      if (data.success) {
        UIkit.notification({
          message: "Artículo eliminado exitosamente",
          status: "success",
          pos: "top-center",
        });

        await this.loadNews();
        this.renderNews();
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
  // UTILIDADES
  // ========================================

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}

// Inicialización
window.novedadesAdminPHP = new NovedadesAdminSystemPHP();
console.log("✓ Sistema de administración de novedades PHP inicializado");
