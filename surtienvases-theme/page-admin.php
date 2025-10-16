<?php
/**
 * Template Name: Admin
 */
require_once get_template_directory() . '/config.php';
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Panel de Administración - SurtiEnvases" />
    <link rel="icon" type="image/png"
        href="<?php echo get_template_directory_uri(); ?>/assets/img/surtienvases/logo/surtienvases.png" />
    <?php wp_head(); ?>
</head>

<body>
    <!-- NAVBAR ADMIN -->
    <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
        <nav class="uk-navbar-container uk-navbar-transparent">
            <div class="uk-container uk-width-1-1 navbar-fondo-degradado">
                <div uk-navbar="mode: click" class="uk-flex">
                    <div class="uk-navbar-left">
                        <div class="uk-navbar-item uk-light">
                            <a class="uk-flex uk-link-heading" href="<?php echo home_url(); ?>">
                                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/surtienvases/logo/SurtiLogo.PNG"
                                    alt="Logo" class="imagen-logo-300" />
                            </a>
                        </div>
                    </div>

                    <div class="uk-navbar-right">
                        <div class="uk-navbar-item uk-dark">
                            <button class="uk-button uk-button-secondary uk-border-rounded position-relative"
                                id="navbar-quote-btn">
                                <span uk-icon="cart"></span> Cotizar
                                <span class="carrito-badge-contador uk-hidden" id="cart-count-navbar">0</span>
                            </button>
                        </div>
                        <div class="uk-navbar-item">
                            <a href="<?php echo home_url(); ?>" class="uk-button uk-button-secondary uk-border-rounded">
                                <span uk-icon="home"></span> Volver al Sitio
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>

    <!-- API Config -->
    <script>
        window.API_URL = '<?php echo get_template_directory_uri(); ?>/api.php';
    </script>

    <!-- CONTENIDO -->
    <div class="navbar-ajuste-primer-hijo uk-section">
        <div class="uk-container uk-container-large">

            <!-- Header -->
            <div
                class="uk-text-center uk-padding uk-margin-bottom seccion-fondo-degradado-morado contenedor-redondeado">
                <h1 class="uk-heading-medium uk-margin-remove-bottom titulo-blanco-sombra">
                    Panel de Administración
                </h1>
                <p class="uk-text-lead uk-margin-small-top titulo-verde-sombra">
                    Gestiona productos, novedades y categorías
                </p>
            </div>

            <!-- Tabs -->
            <ul uk-tab class="uk-flex-center">
                <li class="uk-active"><a href="#">📦 Productos</a></li>
                <li><a href="#">📰 Novedades</a></li>
                <li><a href="#">🏷️ Categorías</a></li>
            </ul>

            <!-- Tab Content -->
            <ul class="uk-switcher uk-margin">

                <!-- ========================================
                     TAB 1: PRODUCTOS
                     ======================================== -->
                <li>
                    <div class="uk-card uk-card-default uk-card-body contenedor-redondeado">
                        <h2 class="uk-heading-line"><span>Agregar Nuevo Producto</span></h2>

                        <form id="admin-product-form"
                            class="uk-padding uk-background-muted contenedor-redondeado uk-margin">
                            <div class="uk-grid-small" uk-grid>

                                <!-- Información Básica -->
                                <div class="uk-width-1-1">
                                    <h3 class="uk-h4">Información Básica</h3>
                                </div>

                                <div class="uk-width-1-2@s">
                                    <label class="uk-form-label">Título *</label>
                                    <input class="uk-input" type="text" id="product-title"
                                        placeholder="Ej: Frasco de Vidrio 250ml" required />
                                </div>

                                <div class="uk-width-1-4@s">
                                    <label class="uk-form-label">Precio</label>
                                    <input class="uk-input" type="text" id="product-price" placeholder="Ej: $2.500" />
                                </div>

                                <div class="uk-width-1-4@s">
                                    <label class="uk-form-label">Stock</label>
                                    <select class="uk-select" id="product-stock">
                                        <option value="Disponible">Disponible</option>
                                        <option value="Por encargo">Por encargo</option>
                                        <option value="Agotado">Agotado</option>
                                    </select>
                                </div>

                                <div class="uk-width-1-1">
                                    <label class="uk-form-label">Descripción *</label>
                                    <textarea class="uk-textarea" id="product-description" rows="3"
                                        placeholder="Descripción del producto" required></textarea>
                                </div>

                                <!-- Clasificación -->
                                <div class="uk-width-1-1 uk-margin-top">
                                    <h3 class="uk-h4">Clasificación</h3>
                                </div>

                                <div class="uk-width-1-3@s">
                                    <label class="uk-form-label">Categoría</label>
                                    <select class="uk-select" id="product-category"></select>
                                </div>

                                <div class="uk-width-1-3@s">
                                    <label class="uk-form-label">Industria</label>
                                    <select class="uk-select" id="product-industry"></select>
                                </div>

                                <div class="uk-width-1-3@s">
                                    <label class="uk-form-label">Origen</label>
                                    <select class="uk-select" id="product-origin">
                                        <option value="Nacional">Nacional</option>
                                        <option value="Importado">Importado</option>
                                    </select>
                                </div>

                                <!-- Detalles Técnicos -->
                                <div class="uk-width-1-1 uk-margin-top">
                                    <h3 class="uk-h4">Detalles Técnicos</h3>
                                </div>

                                <div class="uk-width-1-3@s">
                                    <label class="uk-form-label">Material</label>
                                    <input class="uk-input" type="text" id="product-material"
                                        placeholder="Ej: Vidrio Tipo III" />
                                </div>

                                <div class="uk-width-1-3@s">
                                    <label class="uk-form-label">Certificación</label>
                                    <input class="uk-input" type="text" id="product-certification"
                                        placeholder="Ej: FDA Approved" />
                                </div>

                                <div class="uk-width-1-3@s">
                                    <label class="uk-form-label">Pedido Mínimo</label>
                                    <input class="uk-input" type="text" id="product-minimum-order"
                                        placeholder="Ej: Caja x 24" />
                                </div>

                                <div class="uk-width-1-1">
                                    <label class="uk-form-label">Recomendación</label>
                                    <textarea class="uk-textarea" id="product-recommendation" rows="2"
                                        placeholder="Texto de recomendación"></textarea>
                                </div>

                                <!-- Especificaciones -->
                                <div class="uk-width-1-1 uk-margin-top">
                                    <div class="uk-flex uk-flex-between uk-flex-middle">
                                        <h3 class="uk-h4 uk-margin-remove">Especificaciones</h3>
                                        <button type="button" class="uk-button uk-button-small uk-button-secondary"
                                            id="add-specification">
                                            <span uk-icon="plus"></span> Agregar
                                        </button>
                                    </div>
                                    <div id="specifications-container" class="uk-margin-small-top"></div>
                                </div>

                                <!-- Beneficios -->
                                <div class="uk-width-1-1 uk-margin-top">
                                    <div class="uk-flex uk-flex-between uk-flex-middle">
                                        <h3 class="uk-h4 uk-margin-remove">Beneficios</h3>
                                        <button type="button" class="uk-button uk-button-small uk-button-secondary"
                                            id="add-benefit">
                                            <span uk-icon="plus"></span> Agregar
                                        </button>
                                    </div>
                                    <div id="benefits-container" class="uk-margin-small-top"></div>
                                </div>

                                <!-- ✅ IMAGEN DEL PRODUCTO -->
                                <div class="uk-width-1-1 uk-margin-top">
                                    <h3 class="uk-h4">Imagen del Producto</h3>
                                    <div id="product-image-uploader"></div>
                                </div>

                                <!-- Popular -->
                                <div class="uk-width-1-1 uk-margin-top">
                                    <label>
                                        <input class="uk-checkbox" type="checkbox" id="product-popular" />
                                        Marcar como producto popular
                                    </label>
                                </div>

                                <!-- Submit -->
                                <div class="uk-width-1-1 uk-margin-top">
                                    <button type="submit" class="uk-button uk-button-primary uk-button-large">
                                        <span uk-icon="plus-circle"></span> Crear Producto
                                    </button>
                                </div>
                            </div>
                        </form>

                        <!-- Lista de Productos -->
                        <h2 class="uk-heading-line uk-margin-large-top"><span>Productos Registrados</span></h2>
                        <div id="products-list"></div>
                    </div>
                </li>

                <!-- ========================================
                     TAB 2: NOVEDADES
                     ======================================== -->
                <li>
                    <div class="uk-card uk-card-default uk-card-body contenedor-redondeado">
                        <h2 class="uk-heading-line"><span>Publicar Artículo</span></h2>

                        <form class="uk-padding uk-background-muted contenedor-redondeado uk-margin" uk-grid
                            id="news-form">
                            <div class="uk-width-1-2@s">
                                <label class="uk-form-label">Título del artículo *</label>
                                <input class="uk-input" type="text" placeholder="Título del artículo" id="news-title"
                                    required />
                            </div>
                            <div class="uk-width-1-2@s">
                                <label class="uk-form-label">Autor</label>
                                <input class="uk-input" type="text" placeholder="Autor" id="news-author"
                                    value="Usuario Invitado" required />
                            </div>
                            <div class="uk-width-1-1">
                                <label class="uk-form-label">Resumen o introducción *</label>
                                <textarea class="uk-textarea" rows="3" placeholder="Resumen o introducción"
                                    id="news-excerpt" required></textarea>
                            </div>

                            <!-- ✅ IMAGEN DEL ARTÍCULO -->
                            <div class="uk-width-1-1">
                                <label class="uk-form-label">Imagen del Artículo</label>
                                <div id="news-image-uploader"></div>
                            </div>

                            <div class="uk-width-1-1">
                                <button type="submit" class="uk-button uk-button-primary">
                                    <span uk-icon="file-edit"></span> Publicar artículo
                                </button>
                            </div>
                        </form>

                        <!-- Lista de Novedades -->
                        <h2 class="uk-heading-line uk-margin-top"><span>Artículos Publicados</span></h2>
                        <div class="uk-child-width-1-2@s" uk-grid id="news-container"></div>
                    </div>
                </li>

                <!-- ========================================
                     TAB 3: CATEGORÍAS E INDUSTRIAS
                     ======================================== -->
                <li>
                    <div class="uk-card uk-card-default uk-card-body contenedor-redondeado">

                        <!-- Categorías -->
                        <h2 class="uk-heading-line"><span>Gestionar Categorías</span></h2>

                        <form id="admin-category-form"
                            class="uk-padding uk-background-muted contenedor-redondeado uk-margin">
                            <div class="uk-grid-small" uk-grid>
                                <div class="uk-width-2-3@s">
                                    <label class="uk-form-label">Nombre de la Categoría</label>
                                    <input class="uk-input" type="text" id="category-name"
                                        placeholder="Ej: Envases Ecológicos" required />
                                </div>

                                <div class="uk-width-1-6@s">
                                    <label class="uk-form-label">Icono</label>
                                    <input class="uk-input" type="text" id="category-icon" placeholder="🌿"
                                        maxlength="2" />
                                </div>

                                <div class="uk-width-1-6@s">
                                    <label class="uk-form-label">&nbsp;</label>
                                    <button type="submit" class="uk-button uk-button-primary uk-width-1-1">
                                        <span uk-icon="plus"></span> Agregar
                                    </button>
                                </div>
                            </div>
                        </form>

                        <h3 class="uk-h4 uk-margin-top">Categorías Existentes</h3>
                        <div id="categories-list"></div>

                        <!-- Industrias -->
                        <h2 class="uk-heading-line uk-margin-large-top"><span>Gestionar Industrias</span></h2>

                        <form id="admin-industry-form"
                            class="uk-padding uk-background-muted contenedor-redondeado uk-margin">
                            <div class="uk-grid-small" uk-grid>
                                <div class="uk-width-2-3@s">
                                    <label class="uk-form-label">Nombre de la Industria</label>
                                    <input class="uk-input" type="text" id="industry-name"
                                        placeholder="Ej: Construcción" required />
                                </div>

                                <div class="uk-width-1-6@s">
                                    <label class="uk-form-label">Icono</label>
                                    <input class="uk-input" type="text" id="industry-icon" placeholder="🏗️"
                                        maxlength="2" />
                                </div>

                                <div class="uk-width-1-6@s">
                                    <label class="uk-form-label">&nbsp;</label>
                                    <button type="submit" class="uk-button uk-button-primary uk-width-1-1">
                                        <span uk-icon="plus"></span> Agregar
                                    </button>
                                </div>
                            </div>
                        </form>

                        <h3 class="uk-h4 uk-margin-top">Industrias Existentes</h3>
                        <div id="industries-list"></div>
                    </div>
                </li>
            </ul>
        </div>
    </div>

    <!-- ✅ CARRITO FLOTANTE (Inyectado manualmente) -->
    <div class="carrito-flotante">
        <button class="carrito-boton-circular" id="floating-cart-btn" aria-label="Ver carrito de cotización">
            <span uk-icon="icon: cart; ratio: 1.5" class="texto-blanco"></span>
            <span class="carrito-badge-contador uk-hidden" id="cart-count-floating">0</span>
        </button>
    </div>

    <!-- ✅ WHATSAPP FLOTANTE (Inyectado manualmente) -->
    <a href="https://wa.me/573153957275" class="whatsapp-flotante" target="_blank" rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp">
        <div class="whatsapp-boton-circular">
            <span uk-icon="icon: whatsapp; ratio: 1.5" class="texto-blanco"></span>
        </div>
    </a>

    <!-- FOOTER -->
    <?php get_template_part('includes/footer'); ?>
</body>

</html>