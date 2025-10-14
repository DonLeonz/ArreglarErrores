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
    // Crear input file temporal
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Validar que sea imagen
      if (!file.type.startsWith("image/")) {
        UIkit.notification({
          message: "Por favor selecciona un archivo de imagen válido",
          status: "warning",
          pos: "top-center",
        });
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        UIkit.notification({
          message: "La imagen no debe superar 5MB",
          status: "warning",
          pos: "top-center",
        });
        return;
      }

      // Mostrar loading
      UIkit.notification({
        message: "Subiendo imagen...",
        status: "primary",
        pos: "top-center",
        timeout: 2000,
      });

      try {
        const uploadedPath = await this.uploadImage(file);

        // Actualizar input con la ruta
        const imageInput = document.getElementById("news-image");
        if (imageInput) {
          imageInput.value = uploadedPath;
        }

        // Mostrar preview
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

        // Recargar noticias
        await this.loadNews();
        this.renderNews();

        // Limpiar formulario
        document.getElementById("news-form").reset();
        document.getElementById("news-author").value = "Usuario Invitado";

        // Ocultar preview de imagen
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
            this.renderNews();
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
