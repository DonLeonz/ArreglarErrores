<?php
/**
 * Template Name: Novedades
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
            <h1 class="titulo-seccion uk-heading-large">Novedades y Blog</h1>
            <p class="uk-text-lead texto-gris uk-margin-medium-top">
                Artículos, noticias y consejos sobre envases y empaque
            </p>
        </div>

        <div class="uk-margin-large-top contenedor-redondeado" style="overflow: hidden">
            <img src="<?php echo get_template_directory_uri(); ?>/assets/img/surtienvases/imagenes/SurtiImagen (26).jpg"
                alt="Banner de novedades" class="uk-width-1-1" style="height: 400px; object-fit: cover" uk-img />
        </div>
    </div>
</section>

<!-- CONTENEDOR DE ARTÍCULOS -->
<section class="seccion-fondo-gris">
    <div class="uk-container">
        <h2 class="titulo-seccion uk-heading-medium">Artículos Recientes</h2>

        <div class="uk-child-width-1-2@s uk-grid-match" uk-grid="masonry: pack" id="news-container">
            <!-- Los artículos se cargan dinámicamente con JavaScript -->
        </div>
    </div>
</section>

<?php get_footer(); ?>