<?php
/**
 * SurtiEnvases Theme Functions
 * Version: 1.0.0
 */

// Cargar estilos y scripts
function surtienvases_enqueue_assets()
{
    // UIkit CSS
    wp_enqueue_style('uikit', 'https://cdn.jsdelivr.net/npm/uikit@3.23.1/dist/css/uikit.min.css', array(), '3.23.1');

    // IMPORTANTE: Estilos personalizados CON RUTA ABSOLUTA
    $theme_uri = get_template_directory_uri();
    wp_enqueue_style('surtienvases-main', $theme_uri . '/assets/surtienvases-styles.css', array('uikit'), '1.0.0');

    // UIkit JS
    wp_enqueue_script('uikit-js', 'https://cdn.jsdelivr.net/npm/uikit@3.21.13/dist/js/uikit.min.js', array(), '3.21.13', true);
    wp_enqueue_script('uikit-icons', 'https://cdn.jsdelivr.net/npm/uikit@3.21.13/dist/js/uikit-icons.min.js', array('uikit-js'), '3.21.13', true);

    // Scripts comunes (TODAS las páginas)
    wp_enqueue_script('surtienvases-cart', $theme_uri . '/js-php/surtienvases-cart.js', array('uikit-js'), '1.0.0', true);
    wp_enqueue_script('navbar-init', $theme_uri . '/js-php/navbar-init.js', array('surtienvases-cart'), '1.0.0', true);

    // Pasar URL de la API a JavaScript
    wp_localize_script('surtienvases-cart', 'surtienvases_vars', array(
        'api_url' => $theme_uri . '/api.php',
        'theme_url' => $theme_uri
    ));

    // Scripts condicionales por página
    $page_slug = get_post_field('post_name', get_post());

    if ($page_slug === 'productos') {
        wp_enqueue_script('productos-php', $theme_uri . '/js-php/productos-php.js', array('surtienvases-cart'), '1.0.0', true);
    }

    if ($page_slug === 'catalogo') {
        wp_enqueue_script('catalogo-php', $theme_uri . '/js-php/catalogo-php.js', array('surtienvases-cart'), '1.0.0', true);
    }

    if ($page_slug === 'novedades') {
        wp_enqueue_script('novedades-php', $theme_uri . '/js-php/novedades-php.js', array('surtienvases-cart'), '1.0.0', true);
    }

    if ($page_slug === 'admin') {
        wp_enqueue_script('admin-productos-php', $theme_uri . '/js-php/admin-productos-php.js', array('surtienvases-cart'), '1.0.0', true);
        wp_enqueue_script('admin-categorias-php', $theme_uri . '/js-php/admin-categorias-php.js', array('admin-productos-php'), '1.0.0', true);
        wp_enqueue_script('admin-novedades-php', $theme_uri . '/js-php/admin-novedades-php.js', array('admin-categorias-php'), '1.0.0', true);
    }
}
add_action('wp_enqueue_scripts', 'surtienvases_enqueue_assets');

// Soporte para características de WordPress
add_theme_support('title-tag');
add_theme_support('post-thumbnails');
add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));

// Ocultar barra de admin
add_filter('show_admin_bar', '__return_false');

// Remover información innecesaria
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'rsd_link');

// IMPORTANTE: Deshabilitar el editor de bloques para que use nuestras plantillas
add_filter('use_block_editor_for_post', '__return_false', 10);

// Agregar clases body personalizadas
function surtienvases_body_classes($classes)
{
    if (is_page()) {
        global $post;
        $classes[] = 'page-' . $post->post_name;
    }
    return $classes;
}
add_filter('body_class', 'surtienvases_body_classes');
?>