<!-- ========================================
     NAVBAR REUTILIZABLE
     ======================================== -->
<div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
    <nav class="uk-navbar-container uk-navbar-transparent">
        <div class="uk-container uk-width-1-1 navbar-fondo-degradado">
            <div uk-navbar="mode: click" class="uk-flex">
                <!-- Logo -->
                <div class="uk-navbar-left">
                    <div class="uk-navbar-item uk-light">
                        <a class="uk-flex uk-link-heading" href="index.php">
                            <img src="assets/img/surtienvases/logo/SurtiLogo.PNG" alt="Logo SurtiEnvases"
                                class="imagen-logo-300" />
                        </a>
                    </div>
                </div>

                <!-- Menú Desktop -->
                <div class="uk-navbar-center uk-visible@l">
                    <div class="uk-navbar-item uk-dark">
                        <a class="uk-button uk-button-secondary uk-border-rounded" href="catalogo.php">
                            Catálogo
                        </a>
                    </div>
                    <div class="uk-navbar-item uk-light">
                        <a class="uk-text-capitalize uk-button uk-button-text uk-light" href="productos.php">
                            Productos
                        </a>
                    </div>
                    <div class="uk-navbar-item uk-light">
                        <a class="uk-text-capitalize uk-button uk-button-text uk-light" href="novedades.php">
                            Novedades
                        </a>
                    </div>
                    <div class="uk-navbar-item uk-light">
                        <a class="uk-text-capitalize uk-button uk-button-text uk-light" href="nosotros.php">
                            Nosotros
                        </a>
                    </div>
                    <div class="uk-navbar-item uk-light">
                        <a class="uk-text-capitalize uk-button uk-button-text uk-light" href="contacto.php">
                            Contacto
                        </a>
                    </div>
                    <div class="uk-navbar-item uk-light">
                        <a class="uk-text-capitalize uk-button uk-button-text uk-light" href="preguntas-frecuentes.php">
                            FAQ
                        </a>
                    </div>
                </div>

                <!-- Botón Cotizar Desktop -->
                <div class="uk-navbar-right uk-visible@l">
                    <div class="uk-navbar-item uk-dark">
                        <button class="uk-button uk-button-secondary uk-border-rounded position-relative"
                            id="navbar-quote-btn">
                            <span uk-icon="cart"></span> Cotizar
                            <span class="carrito-badge-contador uk-hidden" id="cart-count-navbar">0</span>
                        </button>
                    </div>
                </div>

                <!-- Menú Hamburguesa -->
                <div class="uk-hidden@l uk-navbar-right">
                    <a class="uk-navbar-toggle" uk-navbar-toggle-icon uk-toggle="target: #burger-menu"></a>

                    <div id="burger-menu" uk-offcanvas="mode: slide; overlay: true; flip: true">
                        <div class="uk-offcanvas-bar">
                            <button class="boton-cerrar-menu" type="button"
                                onclick="UIkit.offcanvas('#burger-menu').hide()" aria-label="Cerrar menú"></button>

                            <div class="uk-margin-large-top">
                                <div class="uk-margin">
                                    <a class="uk-button uk-button-secondary uk-border-rounded uk-width-1-1"
                                        href="catalogo.php">
                                        <strong>Catálogo</strong>
                                    </a>
                                </div>

                                <div class="uk-margin-small">
                                    <a class="uk-button uk-button-text uk-width-1-1" href="productos.php">
                                        Productos
                                    </a>
                                </div>

                                <div class="uk-margin-small">
                                    <a class="uk-button uk-button-text uk-width-1-1" href="novedades.php">
                                        Novedades
                                    </a>
                                </div>

                                <div class="uk-margin-small">
                                    <a class="uk-button uk-button-text uk-width-1-1" href="nosotros.php">
                                        Nosotros
                                    </a>
                                </div>

                                <div class="uk-margin-small">
                                    <a class="uk-button uk-button-text uk-width-1-1" href="contacto.php">
                                        Contacto
                                    </a>
                                </div>

                                <div class="uk-margin-small">
                                    <a class="uk-button uk-button-text uk-width-1-1" href="preguntas-frecuentes.php">
                                        FAQ
                                    </a>
                                </div>

                                <hr class="uk-divider-icon" />

                                <div class="uk-margin">
                                    <button class="uk-button uk-button-secondary uk-border-rounded uk-width-1-1"
                                        id="mobile-cart-btn">
                                        <span uk-icon="cart"></span> Ver Carrito
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</div>