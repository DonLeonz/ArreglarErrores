<?php
// preguntas-frecuentes.php - Página de Preguntas frecuentes
require_once 'config.php';
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description"
        content="Preguntas Frecuentes - SurtiEnvases. Encuentra respuestas sobre nuestros productos y servicios" />
    <link rel="icon" type="image/png" href="assets/img/surtienvases/logo/surtienvases.png" />

    <!-- UIkit CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.23.1/dist/css/uikit.min.css" />

    <link rel="stylesheet" href="assets/surtienvases-styles.css" />

    <title>Preguntas Frecuentes - SurtiEnvases</title>
</head>

<body>
    <!-- NAVBAR -->
    <?php include 'includes/navbar.php'; ?>

    <!-- HERO SECTION -->
    <section class="seccion-fondo-blanco navbar-ajuste-primer-hijo">
        <div class="uk-container">
            <div class="uk-text-center">
                <h1 class="titulo-seccion uk-heading-large">Preguntas Frecuentes</h1>
                <p class="uk-text-lead texto-gris uk-margin-medium-top">
                    Encuentra respuestas rápidas a tus dudas
                </p>
            </div>

            <!-- Video/Imagen explicativa -->
            <div class="uk-margin-large-top contenedor-redondeado" style="overflow: hidden">
                <img src="assets/img/surtienvases/imagenes/SurtiImagen (25).jpg" alt="FAQ SurtiEnvases"
                    class="uk-width-1-1" style="height: 400px; object-fit: cover" uk-img />
            </div>
        </div>
    </section>

    <!-- CATEGORÍAS DE PREGUNTAS -->
    <section class="seccion-fondo-gris">
        <div class="uk-container">
            <!-- Tabs de categorías -->
            <ul class="uk-subnav uk-subnav-pill uk-flex-center uk-margin-medium-bottom" uk-switcher
                style="flex-wrap: wrap; gap: 10px">
                <li>
                    <a href="#" class="uk-button uk-button-secondary uk-border-rounded">📋 General</a>
                </li>
                <li>
                    <a href="#" class="uk-button uk-button-secondary uk-border-rounded">🚚 Pedidos y Envíos</a>
                </li>
                <li>
                    <a href="#" class="uk-button uk-button-secondary uk-border-rounded">📦 Productos</a>
                </li>
                <li>
                    <a href="#" class="uk-button uk-button-secondary uk-border-rounded">💳 Pagos</a>
                </li>
                <li>
                    <a href="#" class="uk-button uk-button-secondary uk-border-rounded">↩️ Devoluciones</a>
                </li>
            </ul>

            <!-- Contenido de tabs -->
            <ul class="uk-switcher">
                <!-- ========== GENERAL ========== -->
                <li>
                    <ul uk-accordion>
                        <li class="uk-card uk-card-default uk-margin-small">
                            <a class="uk-accordion-title" href>
                                <span uk-icon="icon: question; ratio: 1.2" class="icono-verde"></span>
                                ¿Qué es SurtiEnvases?
                            </a>
                            <div class="uk-accordion-content">
                                <p>
                                    SurtiEnvases es una empresa líder en la distribución de
                                    envases para todas las industrias en Colombia. Contamos con
                                    más de 15 años de experiencia ofreciendo soluciones de
                                    empaque en vidrio, plástico, y complementos para sectores
                                    como alimentos, farmacéutica, cosmética e industrial.
                                </p>
                            </div>
                        </li>

                        <li class="uk-card uk-card-default uk-margin-small">
                            <a class="uk-accordion-title" href>
                                <span uk-icon="icon: users; ratio: 1.2" class="icono-verde"></span>
                                ¿Trabajan con empresas pequeñas?
                            </a>
                            <div class="uk-accordion-content">
                                <p>
                                    ¡Por supuesto! Atendemos desde emprendedores y pequeñas
                                    empresas hasta grandes industrias. Nuestros pedidos mínimos
                                    están diseñados para ser accesibles a todos los tamaños de
                                    negocio.
                                </p>
                            </div>
                        </li>

                        <li class="uk-card uk-card-default uk-margin-small">
                            <a class="uk-accordion-title" href>
                                <span uk-icon="icon: location; ratio: 1.2" class="icono-verde"></span>
                                ¿Dónde están ubicados?
                            </a>
                            <div class="uk-accordion-content">
                                <p>
                                    Tenemos dos sedes en Neiva, Huila: Sede 1 en Calle 10 #2-58
                                    y Sede 2 en Calle 10 #1G-41. Esto nos permite hacer entregas
                                    rápidas en toda la región del Huila.
                                </p>
                            </div>
                        </li>

                        <li class="uk-card uk-card-default uk-margin-small">
                            <a class="uk-accordion-title" href>
                                <span uk-icon="icon: mail; ratio: 1.2" class="icono-verde"></span>
                                ¿Puedo solicitar muestras?
                            </a>
                            <div class="uk-accordion-content">
                                <p>
                                    Sí, ofrecemos muestras de nuestros productos. Para
                                    solicitarlas, contáctanos por WhatsApp o correo electrónico
                                    indicando los productos de tu interés y te enviaremos
                                    información sobre disponibilidad y costos de envío.
                                </p>
                            </div>
                        </li>
                    </ul>
                </li>

                <!-- ========== PEDIDOS Y ENVÍOS ========== -->
                <li>
                    <ul uk-accordion>
                        <li class="uk-card uk-card-default uk-margin-small">
                            <a class="uk-accordion-title" href>
                                <span uk-icon="icon: cart; ratio: 1.2" class="icono-verde"></span>
                                ¿Cuál es el pedido mínimo?
                            </a>
                            <div class="uk-accordion-content">
                                <p>
                                    El pedido mínimo varía según el producto. Generalmente
                                    manejamos cajas completas que pueden contener desde 24 hasta
                                    100 unidades dependiendo del tipo de envase. Consulta cada
                                    producto para conocer su cantidad mínima específica.
                                </p>
                            </div>
                        </li>

                        <li class="uk-card uk-card-default uk-margin-small">
                            <a class="uk-accordion-title" href>
                                <span uk-icon="icon: clock; ratio: 1.2" class="icono-verde"></span>
                                ¿Cuánto tarda la entrega?
                            </a>
                            <div class="uk-accordion-content">
                                <p>
                                    Los tiempos de entrega en Neiva son de 24-48 horas. Para
                                    municipios cercanos del Huila, el tiempo puede extenderse a
                                    2-3 días hábiles. Para productos por encargo o importados,
                                    el tiempo puede extenderse a 15-30 días.
                                </p>
                            </div>
                        </li>

                        <li class="uk-card uk-card-default uk-margin-small">
                            <a class="uk-accordion-title" href>
                                <span uk-icon="icon: credit-card; ratio: 1.2" class="icono-verde"></span>
                                ¿Cuál es el costo del envío?
                            </a>
                            <div class="uk-accordion-content">
                                <p>
                                    El costo de envío depende del peso, volumen y destino.
                                    Ofrecemos envío gratis en pedidos superiores a $500.000
                                    dentro de Neiva. Para otros casos, el costo se calcula al
                                    momento de la cotización.
                                </p>
                            </div>
                        </li>

                        <li class="uk-card uk-card-default uk-margin-small">
                            <a class="uk-accordion-title" href>
                                <span uk-icon="icon: world; ratio: 1.2" class="icono-verde"></span>
                                ¿Hacen envíos fuera del Huila?
                            </a>
                            <div class="uk-accordion-content">
                                <p>
                                    Nuestra cobertura principal es en Neiva y municipios
                                    cercanos del Huila. Para envíos a otras ciudades,
                                    contáctanos para evaluar disponibilidad y costos.
                                </p>
                            </div>
                        </li>
                    </ul>
                </li>

                <!-- ========== PRODUCTOS ========== -->
                <li>
                    <ul uk-accordion>
                        <li class="uk-card uk-card-default uk-margin-small">
                            <a class="uk-accordion-title" href>
                                <span uk-icon="icon: check; ratio: 1.2" class="icono-verde"></span>
                                ¿Los productos son aptos para alimentos?
                            </a>
                            <div class="uk-accordion-content">
                                <p>
                                    Sí, todos nuestros envases destinados a la industria
                                    alimentaria cuentan con certificaciones FDA y cumplen con
                                    las normas sanitarias colombianas. Cada producto indica
                                    claramente su aptitud para contacto con alimentos.
                                </p>
                            </div>
                        </li>

                        <li class="uk-card uk-card-default uk-margin-small">
                            <a class="uk-accordion-title" href>
                                <span uk-icon="icon: paint-bucket; ratio: 1.2" class="icono-verde"></span>
                                ¿Puedo personalizar los envases?
                            </a>
                            <div class="uk-accordion-content">
                                <p>
                                    Ofrecemos servicios de personalización como serigrafía,
                                    etiquetado y tampografía. Los pedidos mínimos para
                                    personalización comienzan desde 1,000 unidades. Contáctanos
                                    para conocer las opciones disponibles.
                                </p>
                            </div>
                        </li>

                        <li class="uk-card uk-card-default uk-margin-small">
                            <a class="uk-accordion-title" href>
                                <span uk-icon="icon: happy; ratio: 1.2" class="icono-verde"></span>
                                ¿Tienen productos ecológicos?
                            </a>
                            <div class="uk-accordion-content">
                                <p>
                                    Sí, contamos con una línea eco-friendly que incluye envases
                                    biodegradables, compostables y fabricados con materiales
                                    reciclados. Busca el sello verde en nuestro catálogo.
                                </p>
                            </div>
                        </li>

                        <li class="uk-card uk-card-default uk-margin-small">
                            <a class="uk-accordion-title" href>
                                <span uk-icon="icon: shield; ratio: 1.2" class="icono-verde"></span>
                                ¿Qué garantía tienen los productos?
                            </a>
                            <div class="uk-accordion-content">
                                <p>
                                    Todos nuestros productos tienen garantía contra defectos de
                                    fabricación. Si recibes un producto defectuoso, tienes 30
                                    días para reportarlo y procederemos con el cambio o
                                    reembolso según corresponda.
                                </p>
                            </div>
                        </li>
                    </ul>
                </li>

                <!-- ========== PAGOS ========== -->
                <li>
                    <ul uk-accordion>
                        <li class="uk-card uk-card-default uk-margin-small">
                            <a class="uk-accordion-title" href>
                                <span uk-icon="icon: credit-card; ratio: 1.2" class="icono-verde"></span>
                                ¿Qué métodos de pago aceptan?
                            </a>
                            <div class="uk-accordion-content">
                                <p>
                                    Aceptamos: Transferencia bancaria, PSE, tarjetas de crédito
                                    y débito, efectivo (contra entrega en Neiva), y crédito
                                    directo para clientes frecuentes (sujeto a aprobación).
                                </p>
                            </div>
                        </li>

                        <li class="uk-card uk-card-default uk-margin-small">
                            <a class="uk-accordion-title" href>
                                <span uk-icon="icon: future; ratio: 1.2" class="icono-verde"></span>
                                ¿Ofrecen crédito?
                            </a>
                            <div class="uk-accordion-content">
                                <p>
                                    Sí, ofrecemos crédito a 30, 60 y 90 días para empresas
                                    establecidas. Requiere documentación empresarial,
                                    referencias comerciales y aprobación crediticia. Contáctanos
                                    para más información.
                                </p>
                            </div>
                        </li>

                        <li class="uk-card uk-card-default uk-margin-small">
                            <a class="uk-accordion-title" href>
                                <span uk-icon="icon: file-text; ratio: 1.2" class="icono-verde"></span>
                                ¿Emiten factura electrónica?
                            </a>
                            <div class="uk-accordion-content">
                                <p>
                                    Sí, emitimos factura electrónica validada por la DIAN. La
                                    recibirás en tu correo electrónico inmediatamente después de
                                    confirmar tu pedido.
                                </p>
                            </div>
                        </li>

                        <li class="uk-card uk-card-default uk-margin-small">
                            <a class="uk-accordion-title" href>
                                <span uk-icon="icon: bolt; ratio: 1.2" class="icono-verde"></span>
                                ¿Hay descuentos por volumen?
                            </a>
                            <div class="uk-accordion-content">
                                <p>
                                    Sí, manejamos precios especiales para compras por volumen.
                                    Los descuentos comienzan desde el 5% para pedidos superiores
                                    a $1,000,000 y pueden llegar hasta el 20% en grandes
                                    volúmenes.
                                </p>
                            </div>
                        </li>
                    </ul>
                </li>

                <!-- ========== DEVOLUCIONES ========== -->
                <li>
                    <ul uk-accordion>
                        <li class="uk-card uk-card-default uk-margin-small">
                            <a class="uk-accordion-title" href>
                                <span uk-icon="icon: refresh; ratio: 1.2" class="icono-verde"></span>
                                ¿Cuál es la política de devoluciones?
                            </a>
                            <div class="uk-accordion-content">
                                <p>
                                    Aceptamos devoluciones dentro de los 30 días posteriores a
                                    la entrega, siempre que los productos estén en su empaque
                                    original y sin usar. Los gastos de envío de la devolución
                                    corren por cuenta del cliente, excepto en caso de error
                                    nuestro.
                                </p>
                            </div>
                        </li>

                        <li class="uk-card uk-card-default uk-margin-small">
                            <a class="uk-accordion-title" href>
                                <span uk-icon="icon: warning; ratio: 1.2" class="icono-verde"></span>
                                ¿Qué hacer si llega un producto dañado?
                            </a>
                            <div class="uk-accordion-content">
                                <p>
                                    Si recibes productos dañados, toma fotografías
                                    inmediatamente y contáctanos dentro de las 48 horas
                                    siguientes. Procederemos con el reemplazo sin costo
                                    adicional o el reembolso según prefieras.
                                </p>
                            </div>
                        </li>

                        <li class="uk-card uk-card-default uk-margin-small">
                            <a class="uk-accordion-title" href>
                                <span uk-icon="icon: close; ratio: 1.2" class="icono-verde"></span>
                                ¿Puedo cancelar mi pedido?
                            </a>
                            <div class="uk-accordion-content">
                                <p>
                                    Puedes cancelar tu pedido sin costo hasta 24 horas después
                                    de realizarlo. Si el pedido ya fue despachado, aplicarán
                                    cargos de envío y reposición del 10% del valor total.
                                </p>
                            </div>
                        </li>

                        <li class="uk-card uk-card-default uk-margin-small">
                            <a class="uk-accordion-title" href>
                                <span uk-icon="icon: lifesaver; ratio: 1.2" class="icono-verde"></span>
                                ¿Cómo se procesan los reembolsos?
                            </a>
                            <div class="uk-accordion-content">
                                <p>
                                    Los reembolsos se procesan en 5-10 días hábiles después de
                                    recibir y verificar los productos devueltos. El dinero se
                                    devuelve por el mismo método de pago utilizado en la compra
                                    original.
                                </p>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </section>

    <!-- CONTACTO DIRECTO -->
    <section class="seccion-fondo-blanco">
        <div class="uk-container">
            <div class="uk-card uk-card-default uk-card-body card-borde-verde uk-text-center">
                <h3 class="texto-morado uk-heading-small">
                    ¿No encontraste lo que buscabas?
                </h3>
                <p class="texto-gris uk-text-lead uk-margin-top">
                    Nuestro equipo está listo para ayudarte
                </p>
                <div class="uk-child-width-1-3@m uk-grid-small uk-flex-center uk-margin-medium-top" uk-grid>
                    <div>
                        <a href="https://wa.me/573163209967" target="_blank"
                            class="uk-button uk-button-primary boton-whatsapp uk-width-1-1">
                            <span uk-icon="whatsapp"></span> WhatsApp Sede 1
                        </a>
                    </div>
                    <div>
                        <a href="https://wa.me/573153957275" target="_blank"
                            class="uk-button uk-button-primary boton-whatsapp uk-width-1-1">
                            <span uk-icon="whatsapp"></span> WhatsApp Sede 2
                        </a>
                    </div>
                    <div>
                        <a href="contacto.php" class="uk-button uk-button-secondary uk-width-1-1">
                            <span uk-icon="mail"></span> Formulario de Contacto
                        </a>
                    </div>
                </div>
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
</body>

</html>