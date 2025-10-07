// ========================================
// SISTEMA DE NOVEDADES - VERSIÓN CON ADMINISTRACIÓN
// Con funciones de eliminación de artículos y comentarios
// ========================================

class NovedadesSystem {
  constructor() {
    this.news = this.loadNews();
    this.comments = this.loadComments();
    this.visibleComments = {};
    this.init();
  }

  loadNews() {
    try {
      const stored = localStorage.getItem("news");
      return stored ? JSON.parse(stored) : this.getInitialNews();
    } catch (e) {
      console.error("Error al cargar noticias:", e);
      return this.getInitialNews();
    }
  }

  getInitialNews() {
    return [
      {
        id: 1,
        title: "Cómo Reutilizar Envases Plásticos de Forma Segura",
        author: "Equipo SurtiEnvases",
        imageUrl: "assets/img/blog/blog-example1.jpg",
        avatarUrl: "assets/img/avatars/default.jpg",
        excerpt:
          "Aprende las mejores prácticas para darle una segunda vida a tus envases plásticos sin comprometer la seguridad alimentaria.",
        isDeletable: false
      },
      {
        id: 2,
        title: "Ventajas de los Envases de Vidrio para Alimentos",
        author: "Usuario Invitado",
        imageUrl: "assets/img/blog/blog-example2.jpg",
        avatarUrl: "assets/img/avatars/default.jpg",
        excerpt:
          "Descubre por qué el vidrio sigue siendo la mejor opción para conservar alimentos y bebidas manteniendo su calidad.",
        isDeletable: false
      },
      {
        id: 3,
        title: "Guía Completa: Elegir el Envase Correcto para tu Producto",
        author: "Usuario Invitado",
        imageUrl: "assets/img/blog/blog-example3.jpg",
        avatarUrl: "assets/img/avatars/default.jpg",
        excerpt:
          "Factores clave a considerar al seleccionar envases: material, tamaño, certificaciones y compatibilidad con tu producto.",
        isDeletable: false
      },
    ];
  }

  loadComments() {
    try {
      const stored = localStorage.getItem("newsComments");
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      console.error("Error al cargar comentarios:", e);
      return {};
    }
  }

  saveNews() {
    try {
      localStorage.setItem("news", JSON.stringify(this.news));
    } catch (e) {
      console.error("Error al guardar noticias:", e);
    }
  }

  saveComments() {
    try {
      localStorage.setItem("newsComments", JSON.stringify(this.comments));
    } catch (e) {
      console.error("Error al guardar comentarios:", e);
    }
  }

  init() {
    this.renderNews();
    this.setupForm();
  }

  setupForm() {
    const form = document.getElementById("news-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleNewsSubmit();
    });
  }

  handleNewsSubmit() {
    const title = document.getElementById("news-title").value.trim();
    const author =
      document.getElementById("news-author").value.trim() || "Usuario Invitado";
    const excerpt = document.getElementById("news-excerpt").value.trim();
    const imageInput = document.getElementById("news-image");

    if (!title || !excerpt) {
      UIkit.notification({
        message: "Por favor completa todos los campos requeridos",
        status: "warning",
        pos: "top-center",
      });
      return;
    }

    let imageUrl = "assets/img/blog/blogDefault.jpg";
    if (imageInput.files && imageInput.files[0]) {
      imageUrl = URL.createObjectURL(imageInput.files[0]);
    }

    const newArticle = {
      id: Date.now(),
      title: title,
      author: author,
      excerpt: excerpt,
      imageUrl: imageUrl,
      avatarUrl: "assets/img/avatars/default.jpg",
      isDeletable: true // Los artículos nuevos son eliminables
    };

    this.news.unshift(newArticle);
    this.saveNews();
    this.renderNews();

    document.getElementById("news-form").reset();
    document.getElementById("news-author").value = "Usuario Invitado";

    UIkit.notification({
      message: "Artículo publicado exitosamente",
      status: "success",
      pos: "top-center",
    });
  }

  renderNews() {
    const container = document.getElementById("news-container");
    if (!container) return;

    container.innerHTML = this.news
      .map((article) => this.createArticleCard(article))
      .join("");
  }

  createArticleCard(article) {
    const commentsVisible = this.visibleComments[article.id] || false;

    return `
      <div>
        <div class="uk-card uk-card-default uk-card-hover contenedor-redondeado texto-negro uk-position-relative">
          
          ${article.isDeletable ? `
            <button class="boton-eliminar-novedad" 
                    onclick="novedadesSystem.deleteArticle(${article.id})"
                    aria-label="Eliminar artículo">
            </button>
          ` : ''}
          
          <div class="uk-card-media-top contenedor-imagen-altura-350">
            <button type="button" 
                    onclick="novedadesSystem.showImageModal(${article.id})"
                    class="boton-imagen-transparente">
              <img src="${article.imageUrl}" alt="${article.title}">
            </button>
            
            <div id="modal-media-image-${article.id}" class="uk-flex-top" uk-modal>
              <div class="uk-modal-dialog uk-width-auto uk-margin-auto-vertical" style="position: relative;">
                <button class="boton-cerrar-modal-imagen" type="button" 
                        onclick="UIkit.modal('#modal-media-image-${article.id}').hide()"
                        aria-label="Cerrar imagen"></button>
                <img src="${article.imageUrl}" alt="${article.title}">
              </div>
            </div>
          </div>
          
          <div class="uk-card-body">
            <h3 class="uk-card-title">${article.title}</h3>
            <p>${article.excerpt}</p>
            
            <div class="uk-flex uk-flex-middle uk-margin-small-top">
              <img src="${article.avatarUrl}" alt="${article.author}"
                   class="uk-border-circle" width="40" height="40">
              <span class="uk-margin-small-left">${article.author}</span>
            </div>
            
            <button class="uk-button uk-button-secondary uk-margin-small-top uk-border-rounded"
                    onclick="novedadesSystem.toggleComments(${article.id})">
              ${commentsVisible ? "Cerrar comentarios" : "Ver comentarios"}
            </button>
            
            ${commentsVisible ? this.renderCommentsSection(article.id) : ""}
          </div>
        </div>
      </div>
    `;
  }

  renderCommentsSection(newsId) {
    const newsComments = this.comments[newsId] || [];

    return `
      <div class="uk-margin-top">
        <div class="uk-flex uk-flex-middle uk-margin">
          <img src="assets/img/avatars/default.jpg" width="40" height="40"
               class="uk-border-circle" alt="Usuario">
          <span class="uk-margin-left">Usuario Invitado</span>
        </div>
        
        <textarea class="uk-textarea input-fondo-gris-claro" rows="3"
                  placeholder="Escribe tu comentario..." 
                  id="comment-input-${newsId}"></textarea>
        
        <button class="uk-button uk-button-primary uk-margin-top uk-border-rounded"
                onclick="novedadesSystem.handleCommentSubmit(${newsId})">
          Comentar
        </button>
        
        ${newsComments.length > 0 ? `
          <div class="uk-margin-top">
            <h4 class="uk-heading-line"><span>Comentarios</span></h4>
          </div>
        ` : ''}
        
        ${newsComments
          .map((comment, index) => `
          <article class="uk-comment uk-margin-top uk-position-relative">
            <button class="boton-eliminar-comentario" 
                    onclick="novedadesSystem.deleteComment(${newsId}, ${index})"
                    aria-label="Eliminar comentario">
            </button>
            
            <header class="uk-comment-header uk-flex uk-flex-middle">
              <img class="uk-comment-avatar uk-border-circle"
                   src="assets/img/avatars/default.jpg"
                   width="40" height="40" alt="${comment.author}">
              <div class="uk-margin-small-left">
                <h4 class="uk-comment-title uk-margin-remove texto-negro">
                  ${comment.author}
                </h4>
                <ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                  <li><span class="texto-negro">${this.getTimeAgo(comment.timestamp)}</span></li>
                </ul>
              </div>
            </header>
            <div class="uk-comment-body">
              <p>${comment.text}</p>
            </div>
          </article>
        `)
          .join("")}
      </div>
    `;
  }

  toggleComments(newsId) {
    this.visibleComments[newsId] = !this.visibleComments[newsId];
    this.renderNews();
  }

  handleCommentSubmit(newsId) {
    const commentInput = document.getElementById(`comment-input-${newsId}`);
    if (!commentInput || !commentInput.value.trim()) {
      UIkit.notification({
        message: "Escribe un comentario",
        status: "warning",
        pos: "top-center",
      });
      return;
    }

    const newComment = {
      text: commentInput.value.trim(),
      author: "Usuario Invitado",
      timestamp: Date.now(),
    };

    if (!this.comments[newsId]) {
      this.comments[newsId] = [];
    }

    this.comments[newsId].push(newComment);
    this.saveComments();
    this.renderNews();

    UIkit.notification({
      message: "Comentario publicado",
      status: "success",
      pos: "top-center",
    });
  }

  deleteArticle(articleId) {
    UIkit.modal.confirm("¿Estás seguro de eliminar este artículo? También se eliminarán todos sus comentarios.").then(
      () => {
        this.news = this.news.filter(article => article.id !== articleId);
        
        // Eliminar también los comentarios del artículo
        delete this.comments[articleId];
        
        this.saveNews();
        this.saveComments();
        this.renderNews();

        UIkit.notification({
          message: "Artículo eliminado exitosamente",
          status: "success",
          pos: "top-center",
        });
      },
      () => {
        // Cancelado
      }
    );
  }

  deleteComment(newsId, commentIndex) {
    UIkit.modal.confirm("¿Estás seguro de eliminar este comentario?").then(
      () => {
        if (this.comments[newsId] && this.comments[newsId][commentIndex]) {
          this.comments[newsId].splice(commentIndex, 1);
          
          // Si no quedan comentarios, eliminar el array
          if (this.comments[newsId].length === 0) {
            delete this.comments[newsId];
          }
          
          this.saveComments();
          this.renderNews();

          UIkit.notification({
            message: "Comentario eliminado exitosamente",
            status: "success",
            pos: "top-center",
          });
        }
      },
      () => {
        // Cancelado
      }
    );
  }

  showImageModal(newsId) {
    const modal = UIkit.modal(
      document.getElementById(`modal-media-image-${newsId}`)
    );
    if (modal) modal.show();
  }

  getTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    if (seconds < 60) return "Hace un momento";
    if (seconds < 3600) return `Hace ${Math.floor(seconds / 60)} minutos`;
    if (seconds < 86400) return `Hace ${Math.floor(seconds / 3600)} horas`;
    return `Hace ${Math.floor(seconds / 86400)} días`;
  }
}

// Inicialización
const novedadesSystem = new NovedadesSystem();
console.log("✓ Sistema de novedades con administración inicializado");
