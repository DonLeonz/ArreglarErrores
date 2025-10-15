// ========================================
// SISTEMA DE ADMINISTRACIÓN DE NOVEDADES - PHP
// ✅ CORRECCIÓN FINAL - AVATAR + SUBIDA IMÁGENES
// ========================================

class NovedadesAdminSystemPHP {
  constructor() {
    this.apiUrl = window.API_URL || "api.php";
    this.themeUrl = this.getThemeUrl();
    this.news = [];
    this.comments = {};
    this.visibleComments = {};
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

  // ✅ CORREGIDO: Manejo más estricto de valores vacíos
  getAvatarUrl(avatarUrl) {
    // Verificar si es NULL, vacío, o string 'NULL'
    if (
      !avatarUrl ||
      avatarUrl === "" ||
      avatarUrl === "NULL" ||
      avatarUrl === "null"
    ) {
      return `${this.themeUrl}/assets/img/surtienvases/avatars/default.jpg`;
    }

    // Si ya tiene protocolo http/https, retornar tal cual
    if (avatarUrl.startsWith("http://") || avatarUrl.startsWith("https://")) {
      return avatarUrl;
    }

    // Si empieza con /, es ruta absoluta desde el dominio
    if (avatarUrl.startsWith("/")) {
      return window.location.origin + avatarUrl;
    }

    // Si es ruta relativa (assets/img/...), construir URL completa
    if (avatarUrl.startsWith("assets/")) {
      return `${this.themeUrl}/${avatarUrl}`;
    }

    // Por defecto
    return `${this.themeUrl}/assets/img/surtienvases/avatars/default.jpg`;
  }

  async init() {
    console.log("🎯 Theme URL:", this.themeUrl);
    await this.loadNews();
    await this.loadAllComments();
    this.renderNews();
    this.setupForm();
    this.setupImageUploader();
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

  setupImageUploader() {
    const uploadBtn = document.getElementById("upload-news-image-btn");
    if (!uploadBtn) {
      console.warn("⚠️ Botón upload-news-image-btn no encontrado");
      return;
    }

    console.log("✓ Configurando uploader de imágenes...");

    uploadBtn.addEventListener("click", () => {
      console.log("🖼️ Click en botón subir imagen");
      this.openMediaUploader();
    });

    console.log("✓ Uploader de imágenes configurado");
  }

  openMediaUploader() {
    console.log("📂 Abriendo selector de archivos...");

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) {
        console.log("⚠️ No se seleccionó archivo");
        return;
      }

      console.log("📁 Archivo seleccionado:", file.name);

      if (!file.type.startsWith("image/")) {
        console.error("❌ No es una imagen");
        UIkit.notification({
          message: "Por favor selecciona un archivo de imagen válido",
          status: "warning",
          pos: "top-center",
        });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        console.error("❌ Archivo muy grande");
        UIkit.notification({
          message: "La imagen no debe superar 5MB",
          status: "warning",
          pos: "top-center",
        });
        return;
      }

      UIkit.notification({
        message: "⏳ Subiendo imagen...",
        status: "primary",
        pos: "top-center",
        timeout: 2000,
      });

      try {
        console.log("⬆️ Iniciando subida...");
        const uploadedPath = await this.uploadImage(file);
        console.log("✅ Imagen subida:", uploadedPath);

        const imageInput = document.getElementById("news-image");
        if (imageInput) {
          imageInput.value = uploadedPath;
          console.log("✓ Input actualizado");
        }

        this.showImagePreview(uploadedPath);

        UIkit.notification({
          message: "✅ Imagen subida exitosamente",
          status: "success",
          pos: "top-center",
        });
      } catch (error) {
        console.error("❌ Error al subir:", error);
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

  // ✅ CORREGIDO: Mejor manejo de errores
  async uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("action", "surtienvases_upload_news_image");
    formData.append("nonce", this.getNonce());

    try {
      const ajaxUrl =
        typeof surtienvases_vars !== "undefined"
          ? surtienvases_vars.ajax_url
          : "/wp-admin/admin-ajax.php";

      console.log("🌐 Enviando a:", ajaxUrl);

      const response = await fetch(ajaxUrl, {
        method: "POST",
        body: formData,
      });

      console.log("📥 Respuesta HTTP status:", response.status);

      // ✅ CORREGIDO: Verificar si la respuesta es JSON válido
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const textResponse = await response.text();
        console.error("❌ Respuesta no es JSON:", textResponse);
        throw new Error(
          "El servidor no devolvió JSON válido. Verifica los logs del servidor."
        );
      }

      const data = await response.json();
      console.log("📊 Datos:", data);

      if (data.success) {
        return data.data.url;
      } else {
        const errorMsg =
          data.data?.message || data.message || "Error desconocido";
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.error("❌ Error en uploadImage:", error);
      throw error;
    }
  }

  showImagePreview(imagePath) {
    const preview = document.getElementById("news-image-preview");
    const previewImg = document.getElementById("news-image-preview-img");

    if (preview && previewImg) {
      previewImg.src = imagePath;
      preview.classList.remove("uk-hidden");
      console.log("✓ Preview mostrado");
    }
  }

  async handleNewsSubmit() {
    const title = document.getElementById("news-title").value.trim();
    const author =
      document.getElementById("news-author").value.trim() || "Usuario Invitado";
    const excerpt = document.getElementById("news-excerpt").value.trim();
    const imageUrl =
      document.getElementById("news-image").value.trim() ||
      `${this.themeUrl}/assets/img/blog/blogDefault.jpg`;

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
          avatarUrl: `${this.themeUrl}/assets/img/surtienvases/avatars/default.jpg`,
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
    const avatarUrl = this.getAvatarUrl(article.avatarUrl); // ✅ CORREGIDO

    console.log(`📸 Avatar para artículo ${article.id}:`, {
      original: article.avatarUrl,
      computed: avatarUrl,
    });

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
              <img src="${avatarUrl}" alt="${article.author}"
                   class="uk-border-circle" width="40" height="40"
                   onerror="this.src='${
                     this.themeUrl
                   }/assets/img/surtienvases/avatars/default.jpg'">
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
    const avatarUrl = this.getAvatarUrl(null);

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
                   src="${avatarUrl}"
                   width="40" height="40" alt="${comment.author}"
                   onerror="this.src='${
                     this.themeUrl
                   }/assets/img/surtienvases/avatars/default.jpg'">
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
