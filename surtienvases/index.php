<?php
// index.php - Página principal
   require_once 'config.php';
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description"
        content="SurtiEnvases - Tu proveedor de confianza en envases de vidrio, plástico y complementos en Neiva, Huila" />
    <link rel="icon" type="image/png" href="assets/img/surtienvases/logo/surtienvases.png" />

    <!-- UIkit CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.23.1/dist/css/uikit.min.css" />

    <link rel="stylesheet" href="assets/surtienvases-styles.css" />

    <title>SurtiEnvases - Tu Proveedor de Envases de Confianza</title>

    <!-- API Config -->
    <script>
        window.API_URL = '<?php echo dirname($_SERVER['PHP_SELF']); ?>/api.php';
    </script>
</head>

<body>
    <!-- ========================================
         NAVBAR
         ======================================== -->
    <?php include 'includes/navbar.php'; ?>

    <!-- ============================================
        HERO SECTION
        ============================================ -->
    <section class="hero-principal navbar-ajuste-primer-hijo uk-padding-small uk-padding-remove-top">
        <img src="assets/img/surtienvases/imagenes/SurtiImagen (8).jpg" alt="Fondo SurtiEnvases"
            class="hero-imagen-fondo" />

        <div class="hero-overlay"></div>

        <div class="uk-container hero-contenido">
            <div class="uk-grid-medium uk-child-width-1-1 uk-child-width-1-2@m uk-flex-middle" uk-grid>
                <div class="uk-padding-small uk-padding-remove-vertical">
                    <div class="hero-tarjeta-texto" uk-scrollspy="cls: uk-animation-slide-left; delay: 200">
                        <h1 class="uk-margin-remove-bottom">
                            Soluciones Profesionales en Empaque
                        </h1>
                        <p class="uk-text-lead uk-margin-top">
                            La mejor selección de envases para tu negocio
                        </p>
                        <p class="uk-margin-medium-top">
                            Bienvenido a <strong>SurtiEnvases</strong>, tu aliado
                            estratégico en soluciones de empaque. Ofrecemos la más amplia
                            variedad de envases de vidrio, plástico y complementos para
                            todas las industrias.
                        </p>
                        <div class="uk-margin-large-top uk-grid-small uk-child-width-1-1 uk-child-width-auto@s" uk-grid>
                            <div>
                                <a href="catalogo.php"
                                    class="uk-button uk-button-secondary uk-button-large uk-border-rounded uk-width-1-1 uk-width-auto@s">
                                    <span uk-icon="search"></span> Explorar Catálogo
                                </a>
                            </div>
                            <div>
                                <a href="contacto.php"
                                    class="uk-button uk-button-primary uk-button-large uk-border-rounded uk-width-1-1 uk-width-auto@s">
                                    <span uk-icon="mail"></span> Contáctanos
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="uk-padding-small uk-padding-remove-vertical">
                    <div class="hero-video-container" uk-scrollspy="cls: uk-animation-slide-right; delay: 300">
                        <video src="assets/img/surtienvases/videos/SurtiVideo (6).mp4" playsinline loop muted autoplay
                            uk-video="autoplay: inview" class="uk-width-1-1"></video>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CARACTERÍSTICAS -->
    <section class="uk-section uk-section-muted uk-padding-small">
        <div class="uk-container">
            <h2 class="uk-heading-line uk-text-center uk-margin-medium-bottom"
                uk-scrollspy="cls: uk-animation-fade; delay: 100">
                <span>¿Por qué elegir SurtiEnvases?</span>
            </h2>
            <div class="uk-child-width-1-3@m uk-child-width-1-1 uk-grid-match uk-grid-small" uk-grid
                uk-scrollspy="cls: uk-animation-slide-bottom-small; target: > div; delay: 150;">
                <div>
                    <div class="uk-card uk-card-default uk-card-body uk-text-center uk-margin-small">
                        <span uk-icon="icon: cart; ratio: 3" class="icono-verde"></span>
                        <h3 class="uk-card-title">Amplio Catálogo</h3>
                        <p>
                            Más de 5,000 referencias en envases de vidrio, plástico, tapas y
                            complementos para todas las industrias.
                        </p>
                    </div>
                </div>
                <div>
                    <div class="uk-card uk-card-default uk-card-body uk-text-center uk-margin-small">
                        <span uk-icon="icon: location; ratio: 3" class="icono-verde"></span>
                        <h3 class="uk-card-title">Entrega en el Huila</h3>
                        <p>
                            Cobertura en Neiva y municipios cercanos con tiempos de entrega
                            de 24 a 72 horas.
                        </p>
                    </div>
                </div>
                <div>
                    <div class="uk-card uk-card-default uk-card-body uk-text-center uk-margin-small">
                        <span uk-icon="icon: check; ratio: 3" class="icono-verde"></span>
                        <h3 class="uk-card-title">Calidad Certificada</h3>
                        <p>
                            Todos nuestros productos cumplen con las normas técnicas
                            colombianas e internacionales.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- FOOTER -->
    <?php include 'includes/footer.php'; ?>

    <!-- Carrito Flotante -->
    <div class="carrito-flotante">
        <button class="carrito-boton-circular" id="floating-cart-btn" aria-label="Ver carrito de cotización">
            <span uk-icon="icon: cart; ratio: 1.5" class="texto-blanco"></span>
            <span class="carrito-badge-contador uk-hidden" id="cart-count-floating">0</span>
        </button>
    </div>

    <!-- WhatsApp Flotante -->
    <a href="https://wa.me/573153957275" class="whatsapp-flotante" target="_blank" rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp">
        <div class="whatsapp-boton-circular">
            <span uk-icon="icon: whatsapp; ratio: 1.5" class="texto-blanco"></span>
        </div>
    </a>

    <!-- SCRIPTS -->
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.21.13/dist/js/uikit.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.21.13/dist/js/uikit-icons.min.js"></script>

    <!-- Scripts PHP version -->
    <script src="js-php/surtienvases-cart.js"></script>
    <script src="js-php/navbar-init.js"></script>
</body>

</html>