<?php
// nosotros.php
require_once 'config.php';
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description"
        content="Conoce a SurtiEnvases - Más de 15 años de experiencia en envases en Neiva, Huila" />
    <link rel="icon" type="image/png" href="assets/img/surtienvases/logo/surtienvases.png" />

    <!-- UIkit CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.23.1/dist/css/uikit.min.css" />

    <link rel="stylesheet" href="assets/surtienvases-styles.css" />

    <title>Nosotros - SurtiEnvases</title>
</head>

<body>
    <?php include 'includes/navbar.php'; ?>

    <!-- HERO SECTION -->
    <section class="seccion-fondo-blanco navbar-ajuste-primer-hijo">
        <div class="uk-container">
            <div class="uk-text-center">
                <h1 class="titulo-seccion uk-heading-large">Quiénes Somos</h1>
                <p class="uk-text-lead texto-gris uk-margin-medium-top">
                    Tu aliado estratégico en soluciones de empaque desde 2010
                </p>
            </div>

            <!-- Video/Imagen institucional -->
            <div class="uk-margin-large-top contenedor-redondeado" style="overflow: hidden">
                <img src="assets/img/surtienvases/imagenes/SurtiImagen (8).jpg" alt="Instalaciones SurtiEnvases"
                    class="uk-width-1-1" style="height: 400px; object-fit: cover" uk-img />
            </div>
        </div>
    </section>

    <!-- HISTORIA Y MISIÓN -->
    <section class="seccion-fondo-gris">
        <div class="uk-container">
            <div class="uk-grid-medium uk-child-width-1-2@m" uk-grid>
                <div>
                    <div class="uk-card uk-card-default uk-card-body card-borde-naranja">
                        <h3 class="titulo-profesional">Nuestra Historia</h3>
                        <p class="texto-negro">
                            Desde 2010, SurtiEnvases ha sido el socio confiable de miles de
                            empresas en el Huila. Comenzamos como un pequeño almacén en
                            Neiva y hoy somos distribuidores líderes en la región, con
                            presencia en dos puntos estratégicos del centro de la ciudad.
                            Nuestra experiencia de más de 15 años nos respalda.
                        </p>
                    </div>
                </div>

                <div>
                    <div class="uk-card uk-card-default uk-card-body card-borde-verde">
                        <h3 class="titulo-profesional">Nuestra Misión</h3>
                        <p class="texto-negro">
                            Proporcionar soluciones integrales de empaque que impulsen el
                            éxito de nuestros clientes. Nos comprometemos con la calidad,
                            innovación y sostenibilidad, ofreciendo productos certificados y
                            un servicio excepcional que supere las expectativas del mercado
                            huilense.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- NUESTRAS SEDES -->
    <section class="seccion-fondo-blanco">
        <div class="uk-container">
            <h2 class="titulo-seccion uk-heading-medium">Nuestras Sedes</h2>

            <div class="uk-grid-medium uk-child-width-1-2@m" uk-grid>
                <!-- Sede 1 -->
                <div>
                    <div class="uk-card uk-card-default uk-card-body uk-card-hover">
                        <!-- Imagen sede 1 -->
                        <div class="contenedor-redondeado uk-margin-bottom" style="overflow: hidden">
                            <img src="assets/img/surtienvases/imagenes/SurtiImagen (1).jpg" alt="Sede 1 SurtiEnvases"
                                class="uk-width-1-1" style="height: 300px; object-fit: cover" uk-img />
                        </div>

                        <h3 class="titulo-profesional">🏢 Sede 1 - Centro</h3>
                        <div class="uk-margin">
                            <p class="texto-negro">
                                <span uk-icon="location" class="icono-verde"></span>
                                <strong>Dirección:</strong><br />
                                Calle 10 #2-58, Centro, Neiva, Huila
                            </p>
                            <p class="texto-negro">
                                <span uk-icon="phone" class="icono-verde"></span>
                                <strong>Teléfonos:</strong><br />
                                Móvil: 3163209967 | Fijo: 8672555
                            </p>
                            <p class="texto-negro">
                                <span uk-icon="clock" class="icono-verde"></span>
                                <strong>Horario:</strong><br />
                                Lunes a Viernes: 8:00 AM - 12:00 PM & 2:00 PM - 6:00 PM<br />
                                Sábados: 8:30 AM - 2:30 PM
                            </p>
                        </div>

                        <div class="contenedor-redondeado uk-margin-top">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.6089238735094!2d-75.29420742520472!3d2.9282087970481196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3b747cd603db89%3A0x6796a582d7ca17b9!2sSurtienvases%20Neiva!5e0!3m2!1ses!2sco!4v1759768371240!5m2!1ses!2sco"
                                width="100%" height="250" style="border: 0" allowfullscreen="" loading="lazy"></iframe>
                        </div>

                        <a href="https://wa.me/573163209967" target="_blank"
                            class="uk-button uk-button-primary boton-whatsapp uk-width-1-1 uk-margin-top">
                            <span uk-icon="whatsapp"></span> Contactar Sede 1
                        </a>
                    </div>
                </div>

                <!-- Sede 2 -->
                <div>
                    <div class="uk-card uk-card-default uk-card-body uk-card-hover">
                        <!-- Imagen sede 2 -->
                        <div class="contenedor-redondeado uk-margin-bottom" style="overflow: hidden">
                            <img src="assets/img/surtienvases/imagenes/SurtiImagen (19).jpg" alt="Sede 2 SurtiEnvases"
                                class="uk-width-1-1" style="height: 300px; object-fit: cover" uk-img />
                        </div>

                        <h3 class="titulo-profesional">🏪 Sede 2 - Centro</h3>
                        <div class="uk-margin">
                            <p class="texto-negro">
                                <span uk-icon="location" class="icono-verde"></span>
                                <strong>Dirección:</strong><br />
                                Calle 10 #1G-41, Centro, Neiva, Huila
                            </p>
                            <p class="texto-negro">
                                <span uk-icon="phone" class="icono-verde"></span>
                                <strong>Teléfonos:</strong><br />
                                Móvil: 3153957275 | Fijo: 8673132
                            </p>
                            <p class="texto-negro">
                                <span uk-icon="clock" class="icono-verde"></span>
                                <strong>Horario:</strong><br />
                                Lunes a Viernes: 8:00 AM - 12:00 PM & 2:00 PM - 6:00 PM<br />
                                Sábados: 8:30 AM - 2:30 PM
                            </p>
                        </div>

                        <div class="contenedor-redondeado uk-margin-top">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.610088469363!2d-75.29626692520469!3d2.9278813970484383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3b747d450d93df%3A0x5edad13a86d48b0!2sCl.%2010%20%23%201G-41%2C%20Neiva%2C%20Huila!5e0!3m2!1ses!2sco!4v1759768474758!5m2!1ses!2sco"
                                width="100%" height="250" style="border: 0" allowfullscreen="" loading="lazy"></iframe>
                        </div>

                        <a href="https://wa.me/573153957275" target="_blank"
                            class="uk-button uk-button-primary boton-whatsapp uk-width-1-1 uk-margin-top">
                            <span uk-icon="whatsapp"></span> Contactar Sede 2
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- VALORES -->
    <section class="seccion-fondo-gris">
        <div class="uk-container">
            <h2 class="titulo-seccion uk-heading-medium">Nuestros Valores</h2>

            <div class="uk-grid-medium uk-child-width-1-3@m uk-text-center" uk-grid>
                <div>
                    <div class="uk-card uk-card-default uk-card-body uk-card-hover">
                        <span uk-icon="icon: check; ratio: 3" class="icono-verde"></span>
                        <h3 class="texto-morado uk-margin-small-top">Calidad</h3>
                        <p class="texto-gris">
                            Productos certificados y garantizados que cumplen con los más
                            altos estándares
                        </p>
                    </div>
                </div>
                <div>
                    <div class="uk-card uk-card-default uk-card-body uk-card-hover">
                        <span uk-icon="icon: users; ratio: 3" class="icono-verde"></span>
                        <h3 class="texto-morado uk-margin-small-top">Servicio</h3>
                        <p class="texto-gris">
                            Atención personalizada y asesoría experta para cada cliente
                        </p>
                    </div>
                </div>
                <div>
                    <div class="uk-card uk-card-default uk-card-body uk-card-hover">
                        <span uk-icon="icon: world; ratio: 3" class="icono-verde"></span>
                        <h3 class="texto-morado uk-margin-small-top">Sostenibilidad</h3>
                        <p class="texto-gris">
                            Comprometidos con el medio ambiente y el futuro del planeta
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CIFRAS -->
    <section class="seccion-fondo-blanco">
        <div class="uk-container">
            <h2 class="titulo-seccion uk-heading-medium">SurtiEnvases en Cifras</h2>

            <div class="uk-grid-medium uk-child-width-1-4@m uk-child-width-1-2@s uk-text-center" uk-grid>
                <div>
                    <div class="uk-card uk-card-default uk-card-body uk-card-hover">
                        <h2 class="numero-estadistica texto-naranja">15+</h2>
                        <p class="texto-morado uk-text-bold">Años de experiencia</p>
                    </div>
                </div>
                <div>
                    <div class="uk-card uk-card-default uk-card-body uk-card-hover">
                        <h2 class="numero-estadistica texto-verde">3,000+</h2>
                        <p class="texto-morado uk-text-bold">Clientes satisfechos</p>
                    </div>
                </div>
                <div>
                    <div class="uk-card uk-card-default uk-card-body uk-card-hover">
                        <h2 class="numero-estadistica texto-naranja">5,000+</h2>
                        <p class="texto-morado uk-text-bold">Productos en catálogo</p>
                    </div>
                </div>
                <div>
                    <div class="uk-card uk-card-default uk-card-body uk-card-hover">
                        <h2 class="numero-estadistica texto-verde">2</h2>
                        <p class="texto-morado uk-text-bold">Sedes en Neiva</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

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
</body>

</html>