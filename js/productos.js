// Sistema de Productos (antes Menu)
class ProductsSystem {
    constructor() {
        this.init();
    }

    init() {
        this.renderProducts();
    }

    renderProducts() {
        const productsGrid = document.getElementById('products-grid');
        if (!productsGrid) return;

        productsGrid.innerHTML = productItems.map((item, index) => `
            <div>
                <!-- Card del producto -->
                <div class="uk-card uk-card-default uk-card-hover uk-flex uk-flex-column uk-height-1-1 coffee-card-dark">
                    
                    <div class="uk-flex uk-flex-middle uk-flex-wrap uk-child-width-expand@m uk-grid-small" data-uk-grid>
                        <!-- Imagen -->
                        <div class="uk-flex uk-flex-center uk-width-1-3@s uk-width-1-4@m">
                            <div class="uk-border-circle uk-overflow-hidden coffee-image-circle">
                                <img src="${item.img}" alt="${item.title}" class="uk-cover coffee-image-cover">
                            </div>
                        </div>
                        
                        <!-- Información básica -->
                        <div class="coffee-flex-grow">
                            <div class="uk-flex uk-flex-between uk-flex-middle">
                                <h3 class="uk-card-title uk-margin-remove-bottom coffee-title-white">
                                    ${item.title}
                                </h3>
                                <span class="uk-label coffee-price-badge">
                                    ${item.price}
                                </span>
                            </div>
                            
                            <div class="coffee-margin-small-top">
                                <span class="coffee-menu-origin">
                                    ${item.industry}
                                </span>
                                ${item.isPopular ? `
                                    <span class="uk-badge coffee-badge-popular">
                                        ★ Más Vendido
                                    </span>
                                ` : ''}
                                ${item.stock === 'Por encargo' ? `
                                    <span class="uk-badge coffee-badge-origin">
                                        Por Encargo
                                    </span>
                                ` : ''}
                            </div>
                            
                            <p class="coffee-margin-small-top coffee-text-white-muted">
                                ${item.description}
                            </p>
                        </div>
                    </div>
                    
                    <!-- Botón para abrir modal -->
                    <div class="uk-text-center uk-padding-small">
                        <button class="uk-button uk-button-default coffee-button-outline"
                            onclick="productsSystem.showModal(${index})">
                            Ver especificaciones
                        </button>
                    </div>
                </div>
                
                <!-- Modal para este producto -->
                <div id="modal-${index}" class="uk-modal-container uk-modal" data-uk-modal>
                    <div class="uk-modal-dialog uk-modal-body uk-light coffee-modal-dark">
                        
                        <button class="uk-modal-close-default" type="button" data-uk-close></button>
                        
                        <div class="uk-grid-collapse" data-uk-grid>
                            <!-- Columna de imagen en modal -->
                            <div class="uk-width-1-3@m uk-width-1-1@s">
                                <div class="uk-padding uk-flex uk-flex-center">
                                    <div class="uk-border-circle uk-overflow-hidden coffee-image-circle-large">
                                        <img src="${item.img}" alt="${item.title}" class="uk-cover coffee-image-cover">
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Columna de contenido en modal -->
                            <div class="uk-width-2-3@m uk-width-1-1@s coffee-padding-large">
                                <h2 class="uk-modal-title coffee-title-gold-border">
                                    ${item.title}
                                </h2>
                                
                                <div class="uk-margin-medium-top">
                                    <h3 class="coffee-modal-ingredients-title">
                                        Especificaciones:
                                    </h3>
                                    <ul class="uk-list uk-list-bullet coffee-modal-ingredients-list">
                                        ${(item.specifications || []).map(spec => `<li>${spec}</li>`).join('')}
                                    </ul>
                                </div>
                                
                                <div class="uk-margin-medium-top">
                                    <h3 class="coffee-modal-ingredients-title">
                                        Características:
                                    </h3>
                                    <p class="coffee-modal-preparation-text">
                                        ${item.recommendation || "Información no disponible."}
                                    </p>
                                </div>

                                <div class="uk-margin-medium-top">
                                    <h3 class="coffee-modal-ingredients-title">
                                        Pedido Mínimo:
                                    </h3>
                                    <p class="coffee-modal-preparation-text">
                                        ${item.minimumOrder || "Consultar disponibilidad"}
                                    </p>
                                </div>
                                
                                <div class="uk-margin-medium-top">
                                    <div class="uk-grid-small" data-uk-grid>
                                        <div>
                                            <span class="uk-label coffee-label-transparent">
                                                Material: ${item.material}
                                            </span>
                                        </div>
                                        <div>
                                            <span class="uk-label coffee-label-transparent">
                                                ${item.certification}
                                            </span>
                                        </div>
                                        ${item.stock === 'Disponible' ? `
                                            <div>
                                                <span class="uk-label coffee-label-transparent" style="background-color: rgba(183, 206, 56, 0.2);">
                                                    ✓ En Stock
                                                </span>
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>

                                <div class="uk-margin-large-top uk-text-center">
                                    <a href="https://wa.me/5738711599?text=Hola,%20me%20interesa%20el%20producto:%20${encodeURIComponent(item.title)}" 
                                       target="_blank" 
                                       class="uk-button uk-button-primary uk-width-1-2@s whatsapp-button">
                                        <span uk-icon="whatsapp"></span> Solicitar Cotización
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    showModal(index) {
        const modal = UIkit.modal(document.getElementById(`modal-${index}`));
        if (modal) modal.show();
    }
}

// Inicializar el sistema de productos
const productsSystem = new ProductsSystem();