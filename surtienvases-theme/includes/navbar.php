<!-- ========================================
     NAVBAR REUTILIZABLE
     ✅ BOTÓN CARRITO HAMBURGUESA CORREGIDO
     ======================================== -->
<div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
    <nav class="uk-navbar-container uk-navbar-transparent">
        <div class="uk-container uk-width-1-1 navbar-fondo-degradado">
            <div uk-navbar="mode: click" class="uk-flex">
                <!-- Logo -->
                <div class="uk-navbar-left">
                    <div class="uk-navbar-item uk-light">
                        <a class="uk-flex uk-link-heading" href="<?php echo home_url(); ?>">
                            <img src="<?php echo get_template_directory_uri(); ?>/assets/img/surtienvases/logo/SurtiLogo.PNG"
                                alt="Logo SurtiEnvases" class="imagen-logo-300" />
                        </a>
                    </div>
                </div>

                <!-- Menú Desktop -->
                <div class="uk-navbar-center uk-visible@l">
                    <div class="uk-navbar-item uk-dark">
                        <a class="uk-button uk-button-secondary uk-border-rounded"
                            href="<?php echo home_url('/catalogo'); ?>">
                            Catálogo
                        </a>
                    </div>
                    <div class="uk-navbar-item uk-light">
                        <a class="uk-text-capitalize uk-button uk-button-text uk-light"
                            href="<?php echo home_url('/productos'); ?>">
                            Productos
                        </a>
                    </div>
                    <div class="uk-navbar-item uk-light">
                        <a class="uk-text-capitalize uk-button uk-button-text uk-light"
                            href="<?php echo home_url('/novedades'); ?>">
                            Novedades
                        </a>
                    </div>
                    <div class="uk-navbar-item uk-light">
                        <a class="uk-text-capitalize uk-button uk-button-text uk-light"
                            href="<?php echo home_url('/nosotros'); ?>">
                            Nosotros
                        </a>
                    </div>
                    <div class="uk-navbar-item uk-light">
                        <a class="uk-text-capitalize uk-button uk-button-text uk-light"
                            href="<?php echo home_url('/contacto'); ?>">
                            Contacto
                        </a>
                    </div>
                    <div class="uk-navbar-item uk-light">
                        <a class="uk-text-capitalize uk-button uk-button-text uk-light"
                            href="<?php echo home_url('/preguntas-frecuentes'); ?>">
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
                                        href="<?php echo home_url('/catalogo'); ?>">
                                        <strong>Catálogo</strong>
                                    </a>
                                </div>

                                <div class="uk-margin-small">
                                    <a class="uk-button uk-button-text uk-width-1-1"
                                        href="<?php echo home_url('/productos'); ?>">
                                        Productos
                                    </a>
                                </div>

                                <div class="uk-margin-small">
                                    <a class="uk-button uk-button-text uk-width-1-1"
                                        href="<?php echo home_url('/novedades'); ?>">
                                        Novedades
                                    </a>
                                </div>

                                <div class="uk-margin-small">
                                    <a class="uk-button uk-button-text uk-width-1-1"
                                        href="<?php echo home_url('/nosotros'); ?>">
                                        Nosotros
                                    </a>
                                </div>

                                <div class="uk-margin-small">
                                    <a class="uk-button uk-button-text uk-width-1-1"
                                        href="<?php echo home_url('/contacto'); ?>">
                                        Contacto
                                    </a>
                                </div>

                                <div class="uk-margin-small">
                                    <a class="uk-button uk-button-text uk-width-1-1"
                                        href="<?php echo home_url('/preguntas-frecuentes'); ?>">
                                        FAQ
                                    </a>
                                </div>

                                <hr class="uk-divider-icon" />

                                <!-- ✅ CORREGIDO: Botón que SÍ abre el modal del carrito -->
                                <div class="uk-margin">
                                    <button
                                        class="uk-button uk-button-secondary uk-border-rounded uk-width-1-1 position-relative"
                                        onclick="window.surtienvases.cart.toggleCart(); UIkit.offcanvas('#burger-menu').hide();">
                                        <span uk-icon="cart"></span> Ver Carrito
                                        <span class="carrito-badge-contador uk-hidden" id="cart-count-mobile">0</span>
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