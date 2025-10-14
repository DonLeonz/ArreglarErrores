<?php
/**
 * Template Name: Productos
 */
require_once get_template_directory() . '/config.php';

get_header();
?>

<!-- API Config -->
<script>
    window.API_URL = '<?php echo get_template_directory_uri(); ?>/api.php';
</script>

<!-- HERO SECTION -->
<section class="seccion-fondo-blanco navbar-ajuste-primer-hijo">
    <div class="uk-container">
        <div class="uk-text-center">
            <h1 class="titulo-seccion uk-heading-large">Nuestros Productos</h1>
            <p class="uk-text-lead texto-gris uk-margin-medium-top">
                Soluciones de empaque para todas las industrias
            </p>
        </div>

        <div class="uk-margin-large-top contenedor-redondeado" style="overflow: hidden">
            <img src="<?php echo get_template_directory_uri(); ?>/assets/img/surtienvases/imagenes/SurtiImagen (3).jpg"
                alt="Productos SurtiEnvases" class="uk-width-1-1" style="height: 400px; object-fit: cover" uk-img />
        </div>
    </div>
</section>

<!-- FILTROS Y PRODUCTOS -->
<section class="seccion-fondo-gris">
    <div class="uk-container uk-container-xlarge">
        <!-- Filtros de Categoría -->
        <div class="uk-margin-large-bottom">
            <h3 class="texto-morado uk-text-center uk-text-bold uk-margin-bottom">
                Filtrar por categoría
            </h3>
            <div class="uk-child-width-1-5@m uk-child-width-1-3@s uk-grid-small uk-flex-center" uk-grid>
                <div>
                    <button class="uk-button uk-button-default uk-width-1-1 boton-filtro-categoria-industria active"
                        data-category="todos">
                        📦 Todos
                    </button>
                </div>
                <!-- Los demás botones se cargan dinámicamente desde la API -->
            </div>
        </div>

        <!-- Grid de productos -->
        <div class="uk-grid-small uk-child-width-1-3@m uk-child-width-1-2@s uk-child-width-1-1" uk-grid
            uk-height-match="target: > div > .uk-card" id="products-grid">
            <!-- Los productos se cargan dinámicamente -->
        </div>
    </div>
</section>

<?php get_footer(); ?>