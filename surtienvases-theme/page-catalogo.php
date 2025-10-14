<?php
/**
 * Template Name: Catálogo
 */
require_once get_template_directory() . '/config.php';

get_header();
?>

<!-- API Config -->
<script>
    window.API_URL = '<?php echo get_template_directory_uri(); ?>/api.php';
</script>

<!-- CONTENIDO PRINCIPAL -->
<section class="seccion-fondo-blanco navbar-ajuste-primer-hijo">
    <div class="uk-container">
        <div class="uk-text-center">
            <h1 class="titulo-seccion uk-heading-large">Catálogo Digital</h1>
            <p class="uk-text-lead texto-gris uk-margin-medium-top">
                Encuentra el envase perfecto para tu negocio
            </p>
        </div>

        <div class="uk-margin-large-top contenedor-redondeado" style="overflow: hidden">
            <img src="<?php echo get_template_directory_uri(); ?>/assets/img/surtienvases/imagenes/SurtiImagen (9).jpg"
                alt="Banner de catálogo" class="uk-width-1-1" style="height: 400px; object-fit: cover" uk-img />
        </div>
    </div>
</section>

<section class="seccion-fondo-gris">
    <div class="uk-container uk-section">
        <!-- Acordeón de Búsquedas -->
        <ul uk-accordion="multiple: true">
            <!-- Buscador General -->
            <li
                class="uk-card uk-card-default uk-card-body uk-box-shadow-medium uk-border-rounded catalog-accordion-item uk-open">
                <a class="uk-accordion-title uk-text-lead uk-text-bold">
                    <span uk-icon="icon: search; ratio: 2"></span> Buscar Productos
                </a>
                <div class="uk-accordion-content uk-padding-small">
                    <p>Encuentra el envase perfecto para tu negocio</p>

                    <form class="uk-grid-small" uk-grid id="product-search-form">
                        <div class="uk-width-1-2@s">
                            <input type="text" placeholder="Buscar por nombre..." class="uk-input"
                                id="product-search-input" />
                        </div>
                        <div class="uk-width-1-4@s">
                            <select class="uk-select" id="category-filter">
                                <option value="">Todas las categorías</option>
                                <!-- Se cargan dinámicamente desde la API -->
                            </select>
                        </div>
                        <div class="uk-width-1-4@s">
                            <button type="submit" class="uk-button uk-button-primary uk-width-1-1">
                                <span uk-icon="search"></span> Buscar
                            </button>
                        </div>
                    </form>

                    <div id="product-loading" class="uk-hidden">
                        <div class="uk-text-center uk-margin-top">
                            <div uk-spinner></div>
                            <p>Buscando productos...</p>
                        </div>
                    </div>

                    <div id="product-results" class="uk-margin-top"></div>
                </div>
            </li>

            <!-- Filtros por Industria -->
            <li
                class="uk-card uk-card-default uk-card-body uk-box-shadow-medium uk-border-rounded catalog-accordion-item">
                <a class="uk-accordion-title uk-text-lead uk-text-bold">
                    🏭 Buscar por Industria
                </a>
                <div class="uk-accordion-content">
                    <p>Selecciona tu industria para ver productos recomendados</p>
                    <div class="uk-child-width-1-4@m uk-child-width-1-2@s uk-grid-small" uk-grid
                        id="industry-buttons-container">
                        <!-- Se cargan dinámicamente desde la API -->
                    </div>
                    <div id="industry-results" class="uk-margin-top"></div>
                </div>
            </li>

            <!-- Carrito de Cotización -->
            <li
                class="uk-card uk-card-default uk-card-body uk-box-shadow-medium uk-border-rounded catalog-accordion-item">
                <a class="uk-accordion-title uk-text-lead uk-text-bold">
                    🛒 Mi Carrito de Cotización
                </a>
                <div class="uk-accordion-content">
                    <p>Revisa los productos que has agregado y solicita tu cotización</p>
                    <div id="catalog-cart-items"></div>
                    <div class="uk-text-center uk-margin-top" id="catalog-cart-actions">
                        <button class="uk-button uk-button-primary boton-whatsapp uk-width-1-1"
                            onclick="sendCatalogQuote()">
                            <span uk-icon="whatsapp"></span> Enviar Cotización por WhatsApp
                        </button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</section>

<?php get_footer(); ?>