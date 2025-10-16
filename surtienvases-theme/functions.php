<?php
/**
 * SurtiEnvases Theme Functions
 * Version: 2.0.0 - CON MODERN IMAGE UPLOADER
 */

// Evitar acceso directo
if (!defined('ABSPATH')) {
    exit;
}

// Cargar estilos y scripts
function surtienvases_enqueue_assets()
{
    $theme_uri = get_template_directory_uri();
    $theme_version = '2.0.0';

    // UIkit CSS
    wp_enqueue_style(
        'uikit',
        'https://cdn.jsdelivr.net/npm/uikit@3.23.1/dist/css/uikit.min.css',
        array(),
        '3.23.1'
    );

    // CSS personalizado del tema
    wp_enqueue_style(
        'surtienvases-main',
        $theme_uri . '/assets/surtienvases-styles.css',
        array('uikit'),
        $theme_version
    );

    // UIkit JavaScript
    wp_enqueue_script(
        'uikit-js',
        'https://cdn.jsdelivr.net/npm/uikit@3.21.13/dist/js/uikit.min.js',
        array(),
        '3.21.13',
        true
    );

    wp_enqueue_script(
        'uikit-icons',
        'https://cdn.jsdelivr.net/npm/uikit@3.21.13/dist/js/uikit-icons.min.js',
        array('uikit-js'),
        '3.21.13',
        true
    );

    // ========================================
    // SCRIPTS CORE - SIEMPRE CARGAR
    // ========================================

    // ✅ NUEVO: Modern Image Uploader (cargar primero)
    wp_enqueue_script(
        'modern-image-uploader',
        $theme_uri . '/js-php/modern-image-uploader.js',
        array('uikit-js'),
        $theme_version,
        true
    );

    wp_enqueue_script(
        'surtienvases-cart',
        $theme_uri . '/js-php/surtienvases-cart.js',
        array('modern-image-uploader'),
        $theme_version,
        true
    );

    wp_enqueue_script(
        'navbar-init',
        $theme_uri . '/js-php/navbar-init.js',
        array('surtienvases-cart'),
        $theme_version,
        true
    );

    // Pasar variables PHP a JavaScript
    wp_localize_script('modern-image-uploader', 'surtienvases_vars', array(
        'api_url' => $theme_uri . '/api.php',
        'upload_url' => $theme_uri . '/upload-handler.php',
        'theme_url' => $theme_uri,
        'ajax_url' => admin_url('admin-ajax.php')
    ));

    // Scripts condicionales según la página
    if (is_page()) {
        global $post;
        $page_slug = $post->post_name;

        switch ($page_slug) {
            case 'productos':
                wp_enqueue_script(
                    'productos-php',
                    $theme_uri . '/js-php/productos-php.js',
                    array('surtienvases-cart'),
                    $theme_version,
                    true
                );
                break;

            case 'catalogo':
                wp_enqueue_script(
                    'catalogo-php',
                    $theme_uri . '/js-php/catalogo-php.js',
                    array('surtienvases-cart'),
                    $theme_version,
                    true
                );
                break;

            case 'novedades':
                wp_enqueue_script(
                    'novedades-php',
                    $theme_uri . '/js-php/novedades-php.js',
                    array('surtienvases-cart'),
                    $theme_version,
                    true
                );
                break;

            case 'admin':
                // ✅ NUEVOS SCRIPTS DE ADMIN CON UPLOADER MODERNO
                wp_enqueue_script(
                    'admin-productos-php',
                    $theme_uri . '/js-php/admin-productos-php.js',
                    array('modern-image-uploader'),
                    $theme_version,
                    true
                );
                wp_enqueue_script(
                    'admin-categorias-php',
                    $theme_uri . '/js-php/admin-categorias-php.js',
                    array('admin-productos-php'),
                    $theme_version,
                    true
                );
                wp_enqueue_script(
                    'admin-novedades-php',
                    $theme_uri . '/js-php/admin-novedades-php.js',
                    array('modern-image-uploader'),
                    $theme_version,
                    true
                );
                break;
        }
    }
}
add_action('wp_enqueue_scripts', 'surtienvases_enqueue_assets');

// Soporte para características de WordPress
function surtienvases_theme_setup()
{
    // Soporte para título dinámico
    add_theme_support('title-tag');

    // Soporte para imágenes destacadas
    add_theme_support('post-thumbnails');

    // Soporte para HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'script',
        'style'
    ));

    // Soporte para logo personalizado
    add_theme_support('custom-logo', array(
        'height' => 100,
        'width' => 400,
        'flex-height' => true,
        'flex-width' => true,
    ));
}
add_action('after_setup_theme', 'surtienvases_theme_setup');

// Ocultar barra de administración en frontend
add_filter('show_admin_bar', '__return_false');

// Limpiar head de WordPress
function surtienvases_clean_head()
{
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wp_shortlink_wp_head');
    remove_action('wp_head', 'rest_output_link_wp_head');
    remove_action('wp_head', 'wp_oembed_add_discovery_links');
}
add_action('init', 'surtienvases_clean_head');

// Deshabilitar el editor de bloques (Gutenberg)
add_filter('use_block_editor_for_post', '__return_false', 10);
add_filter('use_block_editor_for_page', '__return_false', 10);

// Agregar clases personalizadas al body
function surtienvases_body_classes($classes)
{
    if (is_page()) {
        global $post;
        $classes[] = 'page-' . $post->post_name;
    }
    return $classes;
}
add_filter('body_class', 'surtienvases_body_classes');

// Función helper para debugging
function surtienvases_debug($data)
{
    if (WP_DEBUG === true) {
        error_log(print_r($data, true));
    }
}

// ========================================
// AUMENTAR LÍMITE DE UPLOAD EN PHP.INI
// ========================================
@ini_set('upload_max_filesize', '50M');
@ini_set('post_max_size', '50M');
@ini_set('max_execution_time', '300');
@ini_set('max_input_time', '300');

// ========================================
// NOTA: Las antiguas funciones AJAX de upload
// han sido removidas. Ahora se usa upload-handler.php
// ========================================