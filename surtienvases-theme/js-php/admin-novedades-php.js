// ========================================
// ADMIN NOVEDADES - VERSIÓN CORREGIDA CON IMAGEN_ID
// ========================================

class NovedadesAdminSystemPHP {
  constructor() {
    this.apiUrl = window.API_URL || "api.php";
    this.themeUrl = this.getThemeUrl();
    this.news = [];
    this.comments = {};
    this.visibleComments = {};
    this.imageUploader = null;
    this.init();
  }

  getThemeUrl() {
    if (
      typeof surtienvases_vars !== "undefined" &&
      surtienvases_vars.theme_url
    ) {
      return surtienvases_vars.theme_url;
    }
    const currentUrl = window.location.origin;
    const pathParts = window.location.pathname.split("/");
    const themeIndex = pathParts.indexOf("surtienvases-theme");
    if (themeIndex !== -1) {
      const themePath = pathParts.slice(0, themeIndex + 1).join("/");
      return currentUrl + themePath;
    }
    return currentUrl + "/wp-content/themes/surtienvases-theme";
  }

  async init() {
    await this.loadNews();
    await this.loadAllComments();
    this.renderNews();
    this.setupForm();
    this.setupModernImageUploader();
  }

  setupModernImageUploader() {
    console.log("🖼️ Configurando Modern Image Uploader para novedades...");

    if (typeof ModernImageUploader === "undefined") {
      console.error("❌ ModernImageUploader no está cargado");
      return;
    }

    const container = document.getElementById("news-image-uploader");
    if (!container) {
      console.error("❌ #news-image-uploader no encontrado");
      return;
    }

    this.imageUploader = new ModernImageUploader({
      entityType: "noticia",
      autoCompress: true,
      compressionQuality: 0.85,
      maxWidth: 1200,
      maxHeight: 800,
      onUploadSuccess: (result) => {
        console.log("✅ Imagen de noticia subida:", result);
      },
      onUploadError: (error) => {
        console.error("❌ Error al subir imagen:", error);
      },
    });

    this.imageUploader.init("news-image-uploader");
    console.log("✅ Modern Image Uploader configurado");
  }

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

  async loadAllComments() {
    try {
      for (const article of this.news) {
        const response = await fetch(
          `${this.apiUrl}?action=get_comments&news_id=${article.id}`
        );
        const data = await response.json();
        if (data.success) {
          this.comments[article.id] = data.data;
        }
      }
      console.log("✓ Comentarios cargados");
    } catch (error) {
      console.error("Error al cargar comentarios:", error);
    }
  }

  setupForm() {
    const form = document.getElementById("news-form");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleNewsSubmit();
    });
    console.log("✓ Formulario configurado");
  }

  // ✅ CORREGIDO - Envía imagen_id en lugar de imageUrl
  async handleNewsSubmit() {
    console.log("📝 Procesando formulario de noticia...");

    const title = document.getElementById("news-title").value.trim();
    const author =
      document.getElementById("news-author").value.trim() || "Usuario Invitado";
    const excerpt = document.getElementById("news-excerpt").value.trim();

    // ✅ BUSCAR EL INPUT DENTRO DEL CONTENEDOR ESPECÍFICO DE NOVEDADES
    const newsUploadContainer = document.getElementById("news-image-uploader");
    const imageIdInput = newsUploadContainer
      ? newsUploadContainer.querySelector("#uploaded-image-id")
      : null;
    const imagenId =
      imageIdInput && imageIdInput.value ? parseInt(imageIdInput.value) : null;

    console.log("🖼️ Contenedor encontrado:", newsUploadContainer ? "SÍ" : "NO");
    console.log("🖼️ Input encontrado:", imageIdInput ? "SÍ" : "NO");
    console.log("🖼️ ID de imagen obtenido:", imagenId);

    if (!title || !excerpt) {
      UIkit.notification({
        message: "⚠️ Por favor completa todos los campos",
        status: "warning",
        pos: "top-center",
      });
      return;
    }

    // ✅ Enviar imagen_id (puede ser null si no subió imagen)
    const formData = {
      title: title,
      author: author,
      excerpt: excerpt,
      imagen_id: imagenId, // ✅ Campo correcto
      avatarUrl: `${this.themeUrl}/assets/img/surtienvases/avatars/default.jpg`,
    };

    console.log("📊 Datos de la noticia:", formData);

    try {
      console.log("📤 Enviando noticia a la API...");
      const response = await fetch(`${this.apiUrl}?action=create_news`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("📥 Respuesta de la API:", data);

      if (data.success) {
        UIkit.notification({
          message: "✅ Artículo publicado exitosamente",
          status: "success",
          pos: "top-center",
        });

        await this.loadNews();
        await this.loadAllComments();
        this.renderNews();

        document.getElementById("news-form").reset();
        document.getElementById("news-author").value = "Usuario Invitado";

        // Reset del uploader
        if (this.imageUploader) {
          const container = document.getElementById("news-image-uploader");
          this.imageUploader.reset(container);
        }

        document
          .getElementById("news-container")
          ?.scrollIntoView({ behavior: "smooth" });
      } else {
        UIkit.notification({
          message: "❌ Error: " + data.error,
          status: "danger",
          pos: "top-center",
        });
      }
    } catch (error) {
      console.error("❌ Error al crear noticia:", error);
      UIkit.notification({
        message: "❌ Error de red: " + error.message,
        status: "danger",
        pos: "top-center",
      });
    }
  }

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
    const commentsVisible = this.visibleComments[article.id] || false;
    const newsComments = this.comments[article.id] || [];

    // ✅ Usar imageUrl que viene del JOIN en la API
    const imageUrl =
      article.imageUrl || `${this.themeUrl}/assets/img/blog/blogDefault.jpg`;

    return `
      <div>
        <div class="uk-card uk-card-default uk-card-hover contenedor-redondeado texto-negro uk-position-relative">
          
          <button class="boton-eliminar-novedad" 
                  onclick="novedadesAdminPHP.deleteArticle(${article.id})"
                  aria-label="Eliminar artículo">
          </button>
          
          <div class="uk-card-media-top contenedor-imagen-altura-350">
            <img src="${imageUrl}" alt="${article.title}">
          </div>
          
          <div class="uk-card-body">
            <h3 class="uk-card-title">${article.title}</h3>
            <p>${article.excerpt}</p>
            
            <div class="uk-flex uk-flex-middle uk-margin-small-top">
              <img src="${
                article.avatarUrl ||
                this.themeUrl + "/assets/img/surtienvases/avatars/default.jpg"
              }" 
                   alt="${
                     article.author
                   }" class="uk-border-circle" width="40" height="40">
              <span class="uk-margin-small-left">${article.author}</span>
            </div>
            
            <p class="uk-text-meta uk-margin-small-top">
              Publicado: ${this.formatDate(article.created_at)}
            </p>

            <button class="uk-button uk-button-secondary uk-margin-small-top uk-border-rounded"
                    onclick="novedadesAdminPHP.toggleComments(${article.id})">
              ${commentsVisible ? "Ocultar comentarios" : "Ver comentarios"} (${
      newsComments.length
    })
            </button>

            ${commentsVisible ? this.renderCommentsSection(article.id) : ""}
          </div>
        </div>
      </div>
    `;
  }

  renderCommentsSection(newsId) {
    const newsComments = this.comments[newsId] || [];

    if (newsComments.length === 0) {
      return `
        <div class="uk-margin-top uk-padding uk-background-muted uk-border-rounded">
          <p class="uk-text-center uk-text-muted">No hay comentarios en este artículo</p>
        </div>
      `;
    }

    return `
      <div class="uk-margin-top">
        <h4 class="uk-heading-line"><span>Comentarios (${
          newsComments.length
        })</span></h4>
        
        ${newsComments
          .map(
            (comment) => `
          <article class="uk-comment uk-margin-small uk-padding-small uk-background-muted uk-border-rounded uk-position-relative">
            <button class="boton-eliminar-comentario" 
                    onclick="novedadesAdminPHP.deleteComment(${
                      comment.id
                    }, ${newsId})"
                    aria-label="Eliminar comentario">
            </button>
            
            <header class="uk-comment-header uk-flex uk-flex-middle">
              <img class="uk-comment-avatar uk-border-circle"
                   src="${
                     this.themeUrl
                   }/assets/img/surtienvases/avatars/default.jpg"
                   width="40" height="40" alt="${comment.author}">
              <div class="uk-margin-small-left">
                <h4 class="uk-comment-title uk-margin-remove texto-negro">${
                  comment.author
                }</h4>
                <ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                  <li><span class="texto-gris">${this.formatDate(
                    comment.created_at
                  )}</span></li>
                </ul>
              </div>
            </header>
            <div class="uk-comment-body uk-margin-small-top">
              <p class="texto-negro">${comment.text}</p>
            </div>
          </article>
        `
          )
          .join("")}
      </div>
    `;
  }

  toggleComments(newsId) {
    this.visibleComments[newsId] = !this.visibleComments[newsId];
    this.renderNews();
  }

  deleteArticle(articleId) {
    if (!window.confirm("¿Estás seguro de eliminar este artículo?")) return;

    fetch(`${this.apiUrl}?action=delete_news&id=${articleId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          UIkit.notification({
            message: "✅ Artículo eliminado exitosamente",
            status: "success",
            pos: "top-center",
          });
          this.loadNews().then(() => {
            this.loadAllComments().then(() => {
              this.renderNews();
            });
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
      });
  }

  deleteComment(commentId, newsId) {
    if (!window.confirm("¿Estás seguro de eliminar este comentario?")) return;

    fetch(`${this.apiUrl}?action=delete_comment&id=${commentId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          UIkit.notification({
            message: "✅ Comentario eliminado",
            status: "success",
            pos: "top-center",
          });
          fetch(`${this.apiUrl}?action=get_comments&news_id=${newsId}`)
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                this.comments[newsId] = data.data;
                this.renderNews();
              }
            });
        }
      });
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}

window.novedadesAdminPHP = new NovedadesAdminSystemPHP();
console.log("✓ Sistema de administración de novedades PHP inicializado");
