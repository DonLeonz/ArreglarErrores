<?php
/**
 * Template Name: Contacto
 */
require_once get_template_directory() . '/config.php';

get_header();
?>

<!-- HERO SECTION -->
<section class="seccion-fondo-blanco navbar-ajuste-primer-hijo">
    <div class="uk-container">
        <div class="uk-text-center">
            <h1 class="titulo-seccion uk-heading-large">Contáctanos</h1>
            <p class="uk-text-lead texto-gris uk-margin-medium-top">
                Estamos aquí para ayudarte con tus necesidades de empaque
            </p>
        </div>

        <!-- Imagen de equipo/oficina -->
        <div class="uk-margin-large-top contenedor-redondeado" style="overflow: hidden">
            <img src="<?php echo get_template_directory_uri(); ?>/assets/img/surtienvases/imagenes/SurtiImagen (7).jpg"
                alt="Equipo SurtiEnvases" class="uk-width-1-1" style="height: 400px; object-fit: cover" uk-img />
        </div>
    </div>
</section>

<!-- INFORMACIÓN Y FORMULARIO -->
<section class="seccion-fondo-gris">
    <div class="uk-container">
        <div class="uk-grid-medium uk-child-width-1-2@m" uk-grid>
            <!-- Información de contacto -->
            <div>
                <div class="uk-card uk-card-default uk-card-body card-borde-naranja">
                    <h3 class="titulo-profesional">
                        <span uk-icon="icon: info; ratio: 1.2" class="icono-verde"></span>
                        Información de Contacto
                    </h3>

                    <div class="uk-margin-medium-top">
                        <h4 class="texto-morado">
                            <span uk-icon="icon: location" class="icono-verde"></span>
                            Sede 1
                        </h4>
                        <p class="texto-negro">
                            Calle 10 #2-58, Centro<br />
                            Neiva, Huila, Colombia<br />
                            <strong>Teléfonos:</strong> 3163209967 | 8672555
                        </p>
                    </div>

                    <div class="uk-margin">
                        <h4 class="texto-morado">
                            <span uk-icon="icon: location" class="icono-verde"></span>
                            Sede 2
                        </h4>
                        <p class="texto-negro">
                            Calle 10 #1G-41, Centro<br />
                            Neiva, Huila, Colombia<br />
                            <strong>Teléfonos:</strong> 3153957275 | 8673132
                        </p>
                    </div>

                    <div class="uk-margin">
                        <h4 class="texto-morado">
                            <span uk-icon="icon: mail" class="icono-verde"></span>
                            Correo Electrónico
                        </h4>
                        <p class="texto-negro">
                            <a href="mailto:surtienvasesn@gmail.com">surtienvasesn@gmail.com</a>
                        </p>
                    </div>

                    <div class="uk-margin">
                        <h4 class="texto-morado">
                            <span uk-icon="icon: clock" class="icono-verde"></span>
                            Horario de Atención
                        </h4>
                        <p class="texto-negro">
                            <strong>Lunes a Viernes:</strong> 8:00 AM - 12:00 PM & 2:00 PM
                            - 6:00 PM<br />
                            <strong>Sábados:</strong> 8:30 AM - 2:30 PM (Jornada
                            continua)<br />
                            <em class="texto-gris">Ambas sedes</em>
                        </p>
                    </div>

                    <!-- Redes sociales -->
                    <div class="uk-margin-top">
                        <h4 class="texto-morado">Síguenos en Redes</h4>
                        <div class="uk-margin-small-top">
                            <a href="https://www.facebook.com/surtienvasesneiva" class="uk-icon-button"
                                uk-icon="icon: facebook" target="_blank" rel="noopener noreferrer"
                                aria-label="Facebook"></a>
                            <a href="https://www.instagram.com/envases_surtienvases"
                                class="uk-icon-button uk-margin-small-left" uk-icon="icon: instagram" target="_blank"
                                rel="noopener noreferrer" aria-label="Instagram"></a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Formulario de contacto -->
            <div>
                <div class="uk-card uk-card-default uk-card-body card-borde-verde">
                    <h3 class="titulo-profesional">
                        <span uk-icon="icon: mail; ratio: 1.2" class="icono-verde"></span>
                        Envíanos un Mensaje
                    </h3>

                    <form class="uk-form-stacked uk-margin-medium-top" id="contact-form">
                        <div class="uk-margin">
                            <label class="uk-form-label texto-morado uk-text-bold">Nombre Completo *</label>
                            <input class="uk-input" type="text" id="contact-name" placeholder="Tu nombre" required />
                        </div>

                        <div class="uk-margin">
                            <label class="uk-form-label texto-morado uk-text-bold">Empresa</label>
                            <input class="uk-input" type="text" id="contact-company"
                                placeholder="Nombre de tu empresa" />
                        </div>

                        <div class="uk-margin">
                            <label class="uk-form-label texto-morado uk-text-bold">Correo Electrónico *</label>
                            <input class="uk-input" type="email" id="contact-email" placeholder="tu@email.com"
                                required />
                        </div>

                        <div class="uk-margin">
                            <label class="uk-form-label texto-morado uk-text-bold">Teléfono *</label>
                            <input class="uk-input" type="tel" id="contact-phone" placeholder="+57 300 000 0000"
                                required />
                        </div>

                        <div class="uk-margin">
                            <label class="uk-form-label texto-morado uk-text-bold">Asunto *</label>
                            <select class="uk-select" id="contact-subject" required>
                                <option value="">Selecciona una opción</option>
                                <option value="Cotización">Cotización</option>
                                <option value="Información">
                                    Información de productos
                                </option>
                                <option value="Distribución">Distribución</option>
                                <option value="Reclamos">Reclamos</option>
                                <option value="Sugerencias">Sugerencias</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>

                        <div class="uk-margin">
                            <label class="uk-form-label texto-morado uk-text-bold">Mensaje *</label>
                            <textarea class="uk-textarea" rows="5" id="contact-message"
                                placeholder="Cuéntanos cómo podemos ayudarte..." required></textarea>
                        </div>

                        <button class="uk-button uk-button-secondary uk-width-1-1" type="submit">
                            <span uk-icon="mail"></span> Enviar Mensaje
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- CONTACTO DIRECTO POR WHATSAPP -->
<section class="seccion-fondo-blanco">
    <div class="uk-container">
        <div class="uk-card uk-card-default uk-card-body card-borde-morado uk-text-center">
            <h3 class="texto-morado uk-heading-small">
                <span uk-icon="icon: whatsapp; ratio: 2" class="icono-verde"></span>
                ¿Prefieres WhatsApp?
            </h3>
            <p class="texto-gris uk-text-lead uk-margin-medium-top">
                Contáctanos directamente para una respuesta más rápida
            </p>
            <div class="uk-grid-small uk-child-width-1-2@s uk-flex-center uk-margin-medium-top" uk-grid>
                <div>
                    <a href="https://wa.me/573163209967" target="_blank" rel="noopener noreferrer"
                        class="uk-button uk-button-primary boton-whatsapp uk-width-1-1">
                        <span uk-icon="whatsapp"></span> WhatsApp Sede 1
                    </a>
                </div>
                <div>
                    <a href="https://wa.me/573153957275" target="_blank" rel="noopener noreferrer"
                        class="uk-button uk-button-primary boton-whatsapp uk-width-1-1">
                        <span uk-icon="whatsapp"></span> WhatsApp Sede 2
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- UBICACIONES CON MAPAS -->
<section class="seccion-fondo-gris">
    <div class="uk-container">
        <h2 class="titulo-seccion uk-heading-medium">Encuéntranos</h2>

        <div class="uk-grid-medium uk-child-width-1-2@m" uk-grid>
            <!-- Mapa Sede 1 -->
            <div>
                <div class="uk-card uk-card-default uk-card-body uk-card-hover">
                    <h4 class="texto-morado uk-text-bold">
                        <span uk-icon="location" class="icono-verde"></span> Sede 1
                    </h4>
                    <p class="texto-gris">Calle 10 #2-58, Centro, Neiva</p>
                    <div class="contenedor-redondeado uk-margin-top">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.6089238735094!2d-75.29420742520472!3d2.9282087970481196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3b747cd603db89%3A0x6796a582d7ca17b9!2sSurtienvases%20Neiva!5e0!3m2!1ses!2sco!4v1759768371240!5m2!1ses!2sco"
                            width="100%" height="300" style="border: 0" allowfullscreen="" loading="lazy"
                            class="iframe-sin-borde"></iframe>
                    </div>
                </div>
            </div>

            <!-- Mapa Sede 2 -->
            <div>
                <div class="uk-card uk-card-default uk-card-body uk-card-hover">
                    <h4 class="texto-morado uk-text-bold">
                        <span uk-icon="location" class="icono-verde"></span> Sede 2
                    </h4>
                    <p class="texto-gris">Calle 10 #1G-41, Centro, Neiva</p>
                    <div class="contenedor-redondeado uk-margin-top">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.610088469363!2d-75.29626692520469!3d2.9278813970484383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3b747d450d93df%3A0x5edad13a86d48b0!2sCl.%2010%20%23%201G-41%2C%20Neiva%2C%20Huila!5e0!3m2!1ses!2sco!4v1759768474758!5m2!1ses!2sco"
                            width="100%" height="300" style="border: 0" allowfullscreen="" loading="lazy"
                            class="iframe-sin-borde"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ✅ SCRIPT PARA FORMULARIO FUNCIONAL -->
<script>
    document.addEventListener('DOMContentLoaded', function () {
        const contactForm = document.getElementById('contact-form');

        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();

                // Obtener valores del formulario
                const nombre = document.getElementById('contact-name').value.trim();
                const empresa = document.getElementById('contact-company').value.trim();
                const email = document.getElementById('contact-email').value.trim();
                const telefono = document.getElementById('contact-phone').value.trim();
                const asunto = document.getElementById('contact-subject').value;
                const mensaje = document.getElementById('contact-message').value.trim();

                // Validar campos requeridos
                if (!nombre || !email || !telefono || !asunto || !mensaje) {
                    UIkit.notification({
                        message: '⚠️ Por favor completa todos los campos requeridos',
                        status: 'warning',
                        pos: 'top-center'
                    });
                    return;
                }

                // Construir mensaje para WhatsApp
                let whatsappMessage = `*NUEVO MENSAJE DE CONTACTO*\n\n`;
                whatsappMessage += `*Nombre:* ${nombre}\n`;
                if (empresa) whatsappMessage += `*Empresa:* ${empresa}\n`;
                whatsappMessage += `*Email:* ${email}\n`;
                whatsappMessage += `*Teléfono:* ${telefono}\n`;
                whatsappMessage += `*Asunto:* ${asunto}\n\n`;
                whatsappMessage += `*Mensaje:*\n${mensaje}`;

                // Codificar el mensaje
                const encodedMessage = encodeURIComponent(whatsappMessage);

                // Número de WhatsApp principal
                const whatsappNumber = '573153957275';
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

                // Abrir WhatsApp
                window.open(whatsappUrl, '_blank');

                // Notificación de éxito
                UIkit.notification({
                    message: '✅ Redirigiendo a WhatsApp...',
                    status: 'success',
                    pos: 'top-center',
                    timeout: 3000
                });

                // Limpiar formulario después de 2 segundos
                setTimeout(() => {
                    contactForm.reset();
                }, 2000);
            });
        }
    });
</script>

<?php get_footer(); ?>