// js/promociones.js
// Sistema de Promociones (antes Recomendado)
class PromocionesSystem {
    constructor() {
        this.imageError = false;
        this.init();
    }

    getPromocionDestacada() {
        // Seleccionar un producto aleatorio como promoción principal
        const randomIndex = Math.floor(Math.random() * productItems.length);
        const producto = productItems[randomIndex];
        
        // Calcular descuento aleatorio entre 15% y 30%
        const descuento = Math.floor(Math.random() * 16) + 15; // 15-30%
        const precioOriginal = parseFloat(producto.price.replace('$', '').replace('.', ''));
        const precioDescuento = precioOriginal * (1 - descuento/100);
        
        return {
            ...producto,
            descuento: descuento,
            precioOriginal: producto.price,
            precioDescuento: `$${Math.floor(precioDescuento).toLocaleString('es-CO')}`
        };
    }

    getOtrasPromociones() {
        // Seleccionar 6 productos aleatorios para promociones adicionales
        const shuffled = [...productItems].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 6).map(producto => {
            const descuento = Math.floor(Math.random() * 11) + 10; // 10-20%
            const precioOriginal = parseFloat(producto.price.replace('$', '').replace('.', ''));
            const precioDescuento = precioOriginal * (1 - descuento/100);
            
            return {
                ...producto,
                descuento: descuento,
                precioOriginal: producto.price,
                precioDescuento: `$${Math.floor(precioDescuento).toLocaleString('es-CO')}`
            };
        });
    }

    init() {
        this.renderPromocionDestacada();
        this.renderOtrasPromociones();
    }

    handleImageError(img) {
        if (!this.imageError) {
            this.imageError = true;
            img.src = 'assets/img/default-product.jpg';
        }
    }

    renderPromocionDestacada() {
        const container = document.getElementById('promocion-destacada-container');
        if (!container) return;

        const producto = this.getPromocionDestacada();

        container.innerHTML = `
            <div class="uk-card uk-card-default uk-card-hover uk-grid-collapse uk-child-width-1-1@s uk-child-width-1-2@m coffee-recommend-container"
                data-uk-grid>
                
                <!-- Imagen -->
                <div class="uk-flex uk-flex-center uk-flex-middle uk-padding uk-position-relative">
                    <!-- Badge de descuento -->
                    <div class="uk-position-top-left uk-position-small">
                        <span class="uk-label uk-label-danger" style="background-color: #ff0000; font-size: 1.2rem; padding: 10px;">
                            -${producto.descuento}%
                        </span>
                    </div>
                    <img src="${producto?.img || 'assets/img/default-product.jpg'}"
                        alt="${producto?.title || 'Promoción del mes'}"
                        onerror="promocionesSystem.handleImageError(this)"
                        class="coffee-image-circle-medium">
                </div>

                <!-- Contenido -->
                <div class="uk-padding uk-flex uk-flex-column uk-flex-between">
                    <div>
                        <h3 class="uk-card-title coffee-title-white uk-margin-small-bottom">
                            ${producto?.title || "Cargando promoción..."}
                        </h3>

                        <div class="uk-margin-small">
                            <span style="text-decoration: line-through; color: #888; font-size: 1.2rem;">
                                ${producto?.precioOriginal || "$ --"}
                            </span>
                            <span class="uk-label coffee-price-badge-large uk-margin-small-left" style="font-size: 1.5rem;">
                                ${producto?.precioDescuento || "$ --"}
                            </span>

                            <span class="uk-label uk-margin-small-left" style="background-color: #ff0000;">
                                ¡OFERTA LIMITADA!
                            </span>
                        </div>

                        <p class="coffee-text-white-description">
                            ${producto?.description || "Seleccionando nuestra mejor promoción para ti..."}
                        </p>

                        <div class="uk-margin-small">
                            <strong class="coffee-recommend-info-label">Categoría:</strong>
                            <span class="coffee-recommend-info-value">${producto?.category || "Envases"}</span>
                        </div>
                        <div class="uk-margin-small">
                            <strong class="coffee-recommend-info-label">Material:</strong>
                            <span class="coffee-recommend-info-value">${producto?.material || "Premium"}</span>
                        </div>
                        <div class="uk-margin-small">
                            <strong class="coffee-recommend-info-label">Pedido Mínimo:</strong>
                            <span class="coffee-recommend-info-value">${producto?.minimumOrder || "Consultar"}</span>
                        </div>
                        <div class="uk-margin-small">
                            <strong class="coffee-recommend-info-label">Disponibilidad:</strong>
                            <span class="coffee-recommend-info-value">${producto?.stock || "En Stock"}</span>
                        </div>

                        <div class="uk-margin-small">
                            <span class="uk-badge coffee-badge-brown">
                                ${producto?.certification || "Certificado"}
                            </span>
                        </div>
                    </div>

                    <div class="uk-margin-top">
                        <p class="coffee-text-italic-gold">
                            💡 Promoción válida hasta agotar existencias o hasta el último día del mes. 
                            ¡Aprovecha este precio especial exclusivo para clientes registrados!
                        </p>
                        
                        <div class="uk-text-center uk-margin-top">
                            <a href="https://wa.me/573001234567?text=Hola,%20me%20interesa%20la%20promoción%20del%20${producto.descuento}%%20en:%20${encodeURIComponent(producto.title)}" 
                               target="_blank" 
                               class="uk-button uk-button-primary uk-button-large">
                                <span uk-icon="whatsapp"></span> Solicitar Ahora
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderOtrasPromociones() {
        const grid = document.getElementById('promociones-grid');
        if (!grid) return;

        const promociones = this.getOtrasPromociones();

        grid.innerHTML = promociones.map(producto => `
            <div>
                <div class="uk-card uk-card-default coffee-card-dark uk-position-relative">
                    <!-- Badge de descuento -->
                    <div class="uk-position-top-left uk-position-small">
                        <span class="uk-label" style="background-color: #ff6600;">
                            -${producto.descuento}%
                        </span>
                    </div>
                    
                    <div class="uk-card-media-top uk-text-center uk-padding-small">
                        <img src="${producto.img}" alt="${producto.title}" 
                             style="height: 150px; object-fit: cover;">
                    </div>
                    
                    <div class="uk-card-body">
                        <h3 class="uk-card-title coffee-title-white uk-text-truncate">
                            ${producto.title}
                        </h3>
                        
                        <div class="uk-margin-small">
                            <span style="text-decoration: line-through; color: #888;">
                                ${producto.precioOriginal}
                            </span>
                            <span class="uk-label coffee-price-badge uk-margin-small-left">
                                ${producto.precioDescuento}
                            </span>
                        </div>
                        
                        <p class="coffee-text-white-muted uk-text-truncate">
                            ${producto.description}
                        </p>
                        
                        <a href="https://wa.me/573001234567?text=Me%20interesa%20la%20promoción%20de:%20${encodeURIComponent(producto.title)}" 
                           target="_blank" 
                           class="uk-button uk-button-default coffee-button-outline uk-width-1-1">
                            Ver Oferta
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Inicializar el sistema de promociones
const promocionesSystem = new PromocionesSystem();