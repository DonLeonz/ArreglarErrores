<!-- FOOTER -->
<footer class="uk-section uk-section-small footer-principal">
    <div class="uk-container">
        <div class="uk-grid-medium uk-child-width-1-4@m uk-child-width-1-2@s" uk-grid>
            <!-- Columna 1: Logo y descripción -->
            <div>
                <img src="<?php echo get_template_directory_uri(); ?>/assets/img/surtienvases/logo/LogoFooter.png"
                    alt="Logo" class="imagen-logo-300 uk-margin-small-bottom" />
                <p class="uk-text-small uk-text-muted">
                    Distribuidora de soluciones en empaque con amplia gama de envases
                    en plástico y vidrio.
                </p>
            </div>

            <!-- Columna 2: Enlaces rápidos -->
            <div>
                <h4 class="footer-titulo">Enlaces Rápidos</h4>
                <ul class="uk-list uk-list-divider">
                    <li>
                        <a href="<?php echo home_url('/catalogo'); ?>" class="uk-link-muted">Catálogo</a>
                    </li>
                    <li>
                        <a href="<?php echo home_url('/productos'); ?>" class="uk-link-muted">Productos</a>
                    </li>
                    <li>
                        <a href="<?php echo home_url('/nosotros'); ?>" class="uk-link-muted">Quiénes Somos</a>
                    </li>
                    <li>
                        <a href="<?php echo home_url('/contacto'); ?>" class="uk-link-muted">Contacto</a>
                    </li>
                </ul>
            </div>

            <!-- Columna 3: Información -->
            <div>
                <h4 class="footer-titulo">Información</h4>
                <ul class="uk-list uk-list-divider">
                    <li>
                        <a href="<?php echo home_url('/preguntas-frecuentes'); ?>" class="uk-link-muted">Preguntas
                            Frecuentes</a>
                    </li>
                    <li>
                        <a href="<?php echo home_url('/novedades'); ?>" class="uk-link-muted">Novedades</a>
                    </li>
                </ul>
            </div>

            <!-- Columna 4: Redes y contacto -->
            <div>
                <h4 class="footer-titulo">Síguenos</h4>
                <div class="uk-margin-small-top">
                    <a href="https://www.facebook.com/surtienvasesneiva" class="uk-icon-button" uk-icon="icon: facebook"
                        target="_blank" rel="noopener noreferrer" aria-label="Facebook"></a>
                    <a href="https://www.instagram.com/envases_surtienvases" class="uk-icon-button uk-margin-small-left"
                        uk-icon="icon: instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram"></a>
                </div>

                <div class="uk-margin-top">
                    <h4 class="footer-titulo uk-margin-small-top">Contacto</h4>
                    <p class="uk-text-small uk-text-muted">
                        <span uk-icon="icon: mail"></span> surtienvasesn@gmail.com<br />
                        <span uk-icon="icon: location"></span> Neiva, Huila
                    </p>

                    <div class="uk-grid-small uk-child-width-expand@s" uk-grid>
                        <div>
                            <p class="uk-text-small uk-text-muted">
                                <strong>Sede 1:</strong><br />
                                <span uk-icon="icon: location"></span> Calle 10 #2-58<br />
                                <span uk-icon="icon: phone"></span> 3163209967<br />
                                <span uk-icon="icon: receiver"></span> 8672555
                            </p>
                        </div>
                        <div>
                            <p class="uk-text-small uk-text-muted">
                                <strong>Sede 2:</strong><br />
                                <span uk-icon="icon: location"></span> Calle 10 #1G-41<br />
                                <span uk-icon="icon: phone"></span> 3153957275<br />
                                <span uk-icon="icon: receiver"></span> 8673132
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <hr class="uk-divider-icon footer-divisor" />

        <div class="uk-text-center uk-text-small uk-text-muted">
            <p>© 2025 SurtiEnvases Neiva. Todos los derechos reservados.</p>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>

</html>