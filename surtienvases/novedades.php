<?php
// novedades.php - Página de Novedades
require_once 'config.php';
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Novedades y noticias de SurtiEnvases" />
    <link rel="icon" type="image/png" href="assets/img/surtienvases/logo/surtienvases.png" />

    <!-- UIkit CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.23.1/dist/css/uikit.min.css" />
    <link rel="stylesheet" href="assets/surtienvases-styles.css" />

    <title>Novedades - SurtiEnvases</title>

    <!-- API Config -->
    <script>
        window.API_URL = '<?php echo dirname($_SERVER['PHP_SELF']); ?>/api.php';
    </script>
</head>

<body>
    <!-- NAVBAR -->
    <?php include 'includes/navbar.php'; ?>

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
                <img src="assets/img/surtienvases/imagenes/SurtiImagen (26).jpg" alt="Banner de novedades"
                    class="uk-width-1-1" style="height: 400px; object-fit: cover" uk-img />
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

    <!-- FOOTER -->
    <?php include 'includes/footer.php'; ?>

    <!-- Carrito Flotante -->
    <div class="carrito-flotante">
        <button class="carrito-boton-circular" id="floating-cart-btn" aria-label="Ver carrito">
            <span uk-icon="icon: cart; ratio: 1.5" class="texto-blanco"></span>
            <span class="carrito-badge-contador uk-hidden" id="cart-count-floating">0</span>
        </button>
    </div>

    <!-- WhatsApp Flotante -->
    <a href="https://wa.me/573153957275" class="whatsapp-flotante" target="_blank" rel="noopener noreferrer">
        <div class="whatsapp-boton-circular">
            <span uk-icon="icon: whatsapp; ratio: 1.5" class="texto-blanco"></span>
        </div>
    </a>

    <!-- SCRIPTS -->
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.21.13/dist/js/uikit.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.21.13/dist/js/uikit-icons.min.js"></script>

    <script src="js-php/surtienvases-cart.js"></script>
    <script src="js-php/navbar-init.js"></script>
    <script src="js-php/novedades-php.js"></script>
</body>

</html>