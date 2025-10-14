<?php
// productos.php - Página de Productos
require_once 'config.php';
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Catálogo completo de productos SurtiEnvases" />
    <link rel="icon" type="image/png" href="assets/img/surtienvases/logo/surtienvases.png" />

    <!-- UIkit CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.23.1/dist/css/uikit.min.css" />
    <link rel="stylesheet" href="assets/surtienvases-styles.css" />

    <title>Productos - SurtiEnvases</title>

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
                <h1 class="titulo-seccion uk-heading-large">Nuestros Productos</h1>
                <p class="uk-text-lead texto-gris uk-margin-medium-top">
                    Soluciones de empaque para todas las industrias
                </p>
            </div>

            <div class="uk-margin-large-top contenedor-redondeado" style="overflow: hidden">
                <img src="assets/img/surtienvases/imagenes/SurtiImagen (3).jpg" alt="Productos SurtiEnvases"
                    class="uk-width-1-1" style="height: 400px; object-fit: cover" uk-img />
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
    <script src="js-php/productos-php.js"></script>
</body>

</html>