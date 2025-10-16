// ========================================
// NOVEDADES-PHP.JS (FRONTEND - SIMPLE)
// ========================================

class NovedadesSystemPHP {
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

  async init() {
    await this.loadNews();
    await this.loadAllComments();
    this.renderNews();
  }

  async loadNews() {
    try {
      const response = await fetch(`${this.apiUrl}?action=get_news`);
      const data = await response.json();
      if (data.success) {
        this.news = data.data;
        console.log(`✓ ${this.news.length} artículos cargados`);
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

    return `
      <div>
        <div class="uk-card uk-card-default uk-card-hover contenedor-redondeado texto-negro">
          <div class="uk-card-media-top contenedor-imagen-altura-350">
            <button type="button" 
                    onclick="novedadesSystemPHP.showImageModal(${article.id})"
                    class="boton-imagen-transparente">
              <img src="${article.imageUrl}" alt="${article.title}">
            </button>
            
            <div id="modal-media-image-${
              article.id
            }" class="uk-flex-top" uk-modal>
              <div class="uk-modal-dialog uk-width-auto uk-margin-auto-vertical" style="position: relative;">
                <button class="boton-cerrar-modal-imagen" type="button" 
                        onclick="UIkit.modal('#modal-media-image-${
                          article.id
                        }').hide()"
                        aria-label="Cerrar imagen"></button>
                <img src="${article.imageUrl}" alt="${article.title}">
              </div>
            </div>
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
            
            <button class="uk-button uk-button-secondary uk-margin-small-top uk-border-rounded"
                    onclick="novedadesSystemPHP.toggleComments(${article.id})">
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
          <img src="${
            this.themeUrl
          }/assets/img/surtienvases/avatars/default.jpg" 
               width="40" height="40" class="uk-border-circle" alt="Usuario">
          <span class="uk-margin-left">Usuario Invitado</span>
        </div>
        
        <textarea class="uk-textarea input-fondo-gris-claro" rows="3"
                  placeholder="Escribe tu comentario..." 
                  id="comment-input-${newsId}"></textarea>
        
        <button class="uk-button uk-button-primary uk-margin-top uk-border-rounded"
                onclick="novedadesSystemPHP.handleCommentSubmit(${newsId})">
          Comentar
        </button>
        
        ${
          newsComments.length > 0
            ? `
          <div class="uk-margin-top">
            <h4 class="uk-heading-line"><span>Comentarios</span></h4>
          </div>
        `
            : ""
        }
        
        ${newsComments
          .map(
            (comment) => `
          <article class="uk-comment uk-margin-top">
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
                  <li><span class="texto-negro">${this.formatDate(
                    comment.created_at
                  )}</span></li>
                </ul>
              </div>
            </header>
            <div class="uk-comment-body">
              <p>${comment.text}</p>
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

  async handleCommentSubmit(newsId) {
    const commentInput = document.getElementById(`comment-input-${newsId}`);
    if (!commentInput || !commentInput.value.trim()) {
      UIkit.notification({
        message: "Escribe un comentario",
        status: "warning",
        pos: "top-center",
      });
      return;
    }

    try {
      const response = await fetch(`${this.apiUrl}?action=create_comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          noticia_id: newsId,
          text: commentInput.value.trim(),
          author: "Usuario Invitado",
        }),
      });

      const data = await response.json();

      if (data.success) {
        UIkit.notification({
          message: "Comentario publicado",
          status: "success",
          pos: "top-center",
        });
        await this.loadAllComments();
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

  showImageModal(newsId) {
    const modal = UIkit.modal(
      document.getElementById(`modal-media-image-${newsId}`)
    );
    if (modal) modal.show();
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

window.novedadesSystemPHP = new NovedadesSystemPHP();
console.log("✓ Sistema de novedades PHP inicializado");
