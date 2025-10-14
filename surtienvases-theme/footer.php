<!-- FOOTER -->
<?php get_template_part('includes/footer'); ?>

<!-- Carrito Flotante -->
<div class="carrito-flotante">
    <button class="carrito-boton-circular" id="floating-cart-btn" aria-label="Ver carrito de cotización">
        <span uk-icon="icon: cart; ratio: 1.5" class="texto-blanco"></span>
        <span class="carrito-badge-contador uk-hidden" id="cart-count-floating">0</span>
    </button>
</div>

<!-- WhatsApp Flotante -->
<a href="https://wa.me/573153957275" class="whatsapp-flotante" target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp">
    <div class="whatsapp-boton-circular">
        <span uk-icon="icon: whatsapp; ratio: 1.5" class="texto-blanco"></span>
    </div>
</a>

<?php wp_footer(); ?>
</body>
</html>