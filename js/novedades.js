// js/novedades.js
// Sistema de Novedades (antes Blog)
class NovedadesSystem {
    constructor() {
        this.news = JSON.parse(localStorage.getItem('news')) || this.getInitialNews();
        this.comments = JSON.parse(localStorage.getItem('newsComments')) || {};
        this.visibleComments = {};
        this.init();
    }

    getInitialNews() {
        return [
            {
                id: 1,
                title: "Nueva Línea de Envases Biodegradables",
                author: "Equipo SurtiEnvases",
                imageUrl: "assets/img/blog/blog-example1.jpg",
                avatarUrl: "assets/img/avatars/default.jpg",
                excerpt: "Presentamos nuestra nueva línea eco-friendly: envases 100% biodegradables y compostables para la industria alimentaria."
            },
            {
                id: 2,
                title: "Tendencias 2025 en Packaging Sostenible",
                author: "María González",
                imageUrl: "assets/img/blog/blog-example2.jpg",
                avatarUrl: "assets/img/avatars/default.jpg",
                excerpt: "Descubre las últimas innovaciones en empaques sostenibles y cómo están transformando la industria."
            },
            {
                id: 3,
                title: "Apertura Nueva Bodega en Cartagena",
                author: "Carlos Mendoza",
                imageUrl: "assets/img/blog/blog-example3.jpg",
                avatarUrl: "assets/img/avatars/default.jpg",
                excerpt: "Ampliamos nuestra cobertura nacional con una nueva bodega en la costa caribe para entregas más rápidas."
            }
        ];
    }

    init() {
        this.renderNews();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const newsForm = document.getElementById('news-form');
        if (newsForm) {
            newsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsSubmit();
            });
        }
    }

    handleNewsSubmit() {
        if (!authSystem.isLoggedIn()) {
            UIkit.notification({
                message: "Debes iniciar sesión para publicar noticias.",
                status: "warning",
                pos: "top-center"
            });
            authSystem.showLoginModal();
            return;
        }

        const title = document.getElementById('news-title').value;
        const author = document.getElementById('news-author').value;
        const excerpt = document.getElementById('news-excerpt').value;
        const imageInput = document.getElementById('news-image');
        
        let imageUrl = "assets/img/blog/blogDefault.jpg";
        if (imageInput.files && imageInput.files[0]) {
            imageUrl = URL.createObjectURL(imageInput.files[0]);
        }

        const newArticle = {
            id: Date.now(),
            title: title,
            author: authSystem.getCurrentUser() || author,
            excerpt: excerpt,
            imageUrl: imageUrl,
            avatarUrl: "assets/img/avatars/default.jpg"
        };

        this.news.unshift(newArticle);
        this.saveNews();
        this.renderNews();
        
        // Limpiar formulario
        document.getElementById('news-form').reset();
        
        UIkit.notification({
            message: "Noticia publicada exitosamente.",
            status: "success",
            pos: "top-center"
        });
    }

    toggleComments(newsId) {
        this.visibleComments[newsId] = !this.visibleComments[newsId];
        this.renderNews();
    }

    handleCommentSubmit(newsId) {
        if (!authSystem.isLoggedIn()) {
            UIkit.notification({
                message: "Debes iniciar sesión para comentar.",
                status: "warning",
                pos: "top-center"
            });
            authSystem.showLoginModal();
            return;
        }

        const commentInput = document.getElementById(`comment-input-${newsId}`);
        if (!commentInput || !commentInput.value.trim()) return;

        const newComment = {
            text: commentInput.value,
            author: authSystem.getCurrentUser(),
            timestamp: Date.now()
        };

        if (!this.comments[newsId]) {
            this.comments[newsId] = [];
        }
        
        this.comments[newsId].push(newComment);
        this.saveComments();
        
        commentInput.value = '';
        this.renderNews();
        
        UIkit.notification({
            message: "Comentario publicado.",
            status: "success",
            pos: "top-center"
        });
    }

    saveNews() {
        localStorage.setItem('news', JSON.stringify(this.news));
    }

    saveComments() {
        localStorage.setItem('newsComments', JSON.stringify(this.comments));
    }

    renderNews() {
        const container = document.getElementById('news-container');
        if (!container) return;

        container.innerHTML = this.news.map(article => `
            <div>
                <div class="uk-card uk-card-default uk-card-hover blog-container-round color-text-black">
                    <div class="uk-card-media-top blog-image-container">
                        <button type="button" onclick="novedadesSystem.showImageModal(${article.id})"
                            style="border: none; background: transparent; padding: 0; cursor: pointer;">
                            <img src="${article.imageUrl}" alt="${article.title}">
                        </button>
                        
                        <div id="modal-media-image-${article.id}" class="uk-flex-top" uk-modal="true">
                            <div class="uk-modal-dialog uk-width-auto uk-margin-auto-vertical">
                                <button class="uk-modal-close-outside" type="button" uk-close="true"></button>
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
                        
                        <button class="uk-button uk-button-secondary uk-margin-small-top blog-container-round"
                            onclick="novedadesSystem.toggleComments(${article.id})">
                            ${this.visibleComments[article.id] ? 'Cerrar comentarios' : 'Ver comentarios'}
                        </button>
                        
                        ${this.visibleComments[article.id] ? this.renderCommentsSection(article.id) : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderCommentsSection(newsId) {
        const newsComments = this.comments[newsId] || [];
        const currentUser = authSystem.getCurrentUser() || "Invitado";
        
        return `
            <div class="uk-margin-top">
                <div class="uk-flex uk-flex-middle uk-margin">
                    <img src="assets/img/avatars/default.jpg" width="40" height="40"
                        class="uk-border-circle" alt="Usuario">
                    <span class="uk-margin-left">${currentUser}</span>
                </div>
                
                <textarea class="uk-textarea uk-placeholder blog-login-input" rows="3"
                    placeholder="Escribe tu comentario..." id="comment-input-${newsId}"></textarea>
                
                <button class="uk-button uk-button-primary uk-margin-top blog-container-round"
                    onclick="novedadesSystem.handleCommentSubmit(${newsId})">
                    Comentar
                </button>
                
                ${newsComments.map(comment => `
                    <article class="uk-comment uk-margin-top">
                        <header class="uk-comment-header uk-flex uk-flex-middle">
                            <img class="uk-comment-avatar uk-border-circle"
                                src="assets/img/avatars/default.jpg"
                                width="40" height="40" alt="${comment.author}">
                            <div class="uk-margin-small-left">
                                <h4 class="uk-comment-title uk-margin-remove color-text-black">
                                    ${comment.author}
                                </h4>
                                <ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                                    <li><span class="color-text-black">Hace un momento</span></li>
                                </ul>
                            </div>
                        </header>
                        <div class="uk-comment-body">
                            <p>${comment.text}</p>
                        </div>
                    </article>
                `).join('')}
            </div>
        `;
    }

    showImageModal(newsId) {
        const modal = UIkit.modal(document.getElementById(`modal-media-image-${newsId}`));
        if (modal) modal.show();
    }
}

// Inicializar el sistema de novedades
const novedadesSystem = new NovedadesSystem();