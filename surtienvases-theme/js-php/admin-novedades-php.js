// ========================================
// SISTEMA DE ADMINISTRACIÓN DE NOVEDADES - PHP
// CON BOTÓN ELIMINAR COMENTARIOS
// ========================================

class NovedadesAdminSystemPHP {
  constructor() {
    this.apiUrl = window.API_URL || "api.php";
    this.news = [];
    this.comments = {};
    this.visibleComments = {};
    this.init();
  }

  async init() {
    await this.loadNews();
    await this.loadAllComments();
    this.renderNews();
    this.setupForm();
    this.setupImageUploader();
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
  // SETUP IMAGE UPLOADER
  // ========================================

  setupImageUploader() {
    const uploadBtn = document.getElementById("upload-news-image-btn");
    if (!uploadBtn) return;

    uploadBtn.addEventListener("click", () => {
      this.openMediaUploader();
    });
  }

  openMediaUploader() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        UIkit.notification({
          message: "Por favor selecciona un archivo de imagen válido",
          status: "warning",
          pos: "top-center",
        });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        UIkit.notification({
          message: "La imagen no debe superar 5MB",
          status: "warning",
          pos: "top-center",
        });
        return;
      }

      UIkit.notification({
        message: "Subiendo imagen...",
        status: "primary",
        pos: "top-center",
        timeout: 2000,
      });

      try {
        const uploadedPath = await this.uploadImage(file);

        const imageInput = document.getElementById("news-image");
        if (imageInput) {
          imageInput.value = uploadedPath;
        }

        this.showImagePreview(uploadedPath);

        UIkit.notification({
          message: "Imagen subida exitosamente",
          status: "success",
          pos: "top-center",
        });
      } catch (error) {
        UIkit.notification({
          message: "Error al subir la imagen: " + error.message,
          status: "danger",
          pos: "top-center",
        });
      }
    };

    input.click();
  }

  getNonce() {
    if (
      typeof surtienvases_vars !== "undefined" &&
      surtienvases_vars.upload_nonce
    ) {
      return surtienvases_vars.upload_nonce;
    }

    const nonceInput = document.querySelector('input[name="_wpnonce"]');
    if (nonceInput) {
      return nonceInput.value;
    }

    const nonceMeta = document.querySelector('meta[name="csrf-token"]');
    if (nonceMeta) {
      return nonceMeta.content;
    }

    console.error("⚠️ No se encontró el nonce de seguridad");
    return "";
  }

  async uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("action", "surtienvases_upload_news_image");
    formData.append("nonce", this.getNonce());

    try {
      const response = await fetch(surtienvases_vars.ajax_url, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        return data.data.url;
      } else {
        throw new Error(data.data.message || "Error al subir imagen");
      }
    } catch (error) {
      console.error("Error en uploadImage:", error);
      throw error;
    }
  }

  showImagePreview(imagePath) {
    const preview = document.getElementById("news-image-preview");
    const previewImg = document.getElementById("news-image-preview-img");

    if (preview && previewImg) {
      previewImg.src = imagePath;
      preview.classList.remove("uk-hidden");
    }
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

        await this.loadNews();
        await this.loadAllComments();
        this.renderNews();

        document.getElementById("news-form").reset();
        document.getElementById("news-author").value = "Usuario Invitado";

        const preview = document.getElementById("news-image-preview");
        if (preview) {
          preview.classList.add("uk-hidden");
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
  // RENDERIZAR NOTICIAS CON COMENTARIOS
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
    const commentsVisible = this.visibleComments[article.id] || false;
    const newsComments = this.comments[article.id] || [];

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

            <!-- BOTÓN PARA VER/OCULTAR COMENTARIOS -->
            <button class="uk-button uk-button-secondary uk-margin-small-top uk-border-rounded"
                    onclick="novedadesAdminPHP.toggleComments(${article.id})">
              ${commentsVisible ? "Ocultar comentarios" : "Ver comentarios"} (${
      newsComments.length
    })
            </button>

            <!-- SECCIÓN DE COMENTARIOS -->
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
            
            <!-- BOTÓN ELIMINAR COMENTARIO -->
            <button class="boton-eliminar-comentario" 
                    onclick="novedadesAdminPHP.deleteComment(${
                      comment.id
                    }, ${newsId})"
                    aria-label="Eliminar comentario">
            </button>
            
            <header class="uk-comment-header uk-flex uk-flex-middle">
              <img class="uk-comment-avatar uk-border-circle"
                   src="assets/img/surtienvases/avatars/default.jpg"
                   width="40" height="40" alt="${comment.author}">
              <div class="uk-margin-small-left">
                <h4 class="uk-comment-title uk-margin-remove texto-negro">
                  ${comment.author}
                </h4>
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

  // ========================================
  // ACCIONES
  // ========================================

  toggleComments(newsId) {
    this.visibleComments[newsId] = !this.visibleComments[newsId];
    this.renderNews();
  }

  deleteArticle(articleId) {
    if (
      !window.confirm(
        "¿Estás seguro de eliminar este artículo? También se eliminarán todos sus comentarios."
      )
    ) {
      return;
    }

    fetch(`${this.apiUrl}?action=delete_news&id=${articleId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          UIkit.notification({
            message: "Artículo eliminado exitosamente",
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
            message: "Error: " + data.error,
            status: "danger",
            pos: "top-center",
          });
        }
      })
      .catch((error) => {
        UIkit.notification({
          message: "Error de red: " + error.message,
          status: "danger",
          pos: "top-center",
        });
      });
  }

  deleteComment(commentId, newsId) {
    if (!window.confirm("¿Estás seguro de eliminar este comentario?")) {
      return;
    }

    fetch(`${this.apiUrl}?action=delete_comment&id=${commentId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          UIkit.notification({
            message: "Comentario eliminado exitosamente",
            status: "success",
            pos: "top-center",
          });

          // Recargar solo los comentarios de esta noticia
          fetch(`${this.apiUrl}?action=get_comments&news_id=${newsId}`)
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                this.comments[newsId] = data.data;
                this.renderNews();
              }
            });
        } else {
          UIkit.notification({
            message: "Error: " + data.error,
            status: "danger",
            pos: "top-center",
          });
        }
      })
      .catch((error) => {
        UIkit.notification({
          message: "Error de red: " + error.message,
          status: "danger",
          pos: "top-center",
        });
      });
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
