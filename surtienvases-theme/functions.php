<?php
/**
 * SurtiEnvases Theme Functions
 * Version: 1.0.0
 */

// Evitar acceso directo
if (!defined('ABSPATH')) {
    exit;
}

// Cargar estilos y scripts
function surtienvases_enqueue_assets()
{
    $theme_uri = get_template_directory_uri();
    $theme_version = '1.0.0';
    
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

    // Scripts del tema - SIEMPRE cargar
    wp_enqueue_script(
        'surtienvases-cart', 
        $theme_uri . '/js-php/surtienvases-cart.js', 
        array('uikit-js'), 
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
    wp_localize_script('surtienvases-cart', 'surtienvases_vars', array(
        'api_url' => $theme_uri . '/api.php',
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
                // Cargar scripts del media uploader de WordPress
                wp_enqueue_media();
                
                wp_enqueue_script(
                    'admin-productos-php', 
                    $theme_uri . '/js-php/admin-productos-php.js', 
                    array('surtienvases-cart', 'jquery'), 
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
                    array('admin-categorias-php'), 
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
        'height'      => 100,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
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
// AJAX: SUBIR IMAGEN DE PRODUCTO
// ========================================
add_action('wp_ajax_surtienvases_upload_product_image', 'surtienvases_upload_product_image');
add_action('wp_ajax_nopriv_surtienvases_upload_product_image', 'surtienvases_upload_product_image');

function surtienvases_upload_product_image()
{
    // Verificar que el archivo fue enviado
    if (!isset($_FILES['file'])) {
        wp_send_json_error(array('message' => 'No se recibió ningún archivo'));
        return;
    }
    
    // Cargar funciones de WordPress necesarias
    if (!function_exists('wp_handle_upload')) {
        require_once(ABSPATH . 'wp-admin/includes/file.php');
    }
    
    // Configurar directorio de uploads
    $upload_dir = wp_upload_dir();
    $surtienvases_dir = $upload_dir['basedir'] . '/surtienvases/productos';
    
    // Crear directorio si no existe
    if (!file_exists($surtienvases_dir)) {
        wp_mkdir_p($surtienvases_dir);
    }
    
    // Obtener información del archivo
    $uploaded_file = $_FILES['file'];
    $filename = sanitize_file_name($uploaded_file['name']);
    
    // Generar nombre único si ya existe
    $target_file = $surtienvases_dir . '/' . $filename;
    $counter = 1;
    $file_info = pathinfo($filename);
    $base_name = $file_info['filename'];
    $extension = isset($file_info['extension']) ? '.' . $file_info['extension'] : '';
    
    while (file_exists($target_file)) {
        $filename = $base_name . '-' . $counter . $extension;
        $target_file = $surtienvases_dir . '/' . $filename;
        $counter++;
    }
    
    // Validar tipo de archivo
    $allowed_types = array('image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp');
    if (!in_array($uploaded_file['type'], $allowed_types)) {
        wp_send_json_error(array('message' => 'Tipo de archivo no permitido. Solo se permiten imágenes.'));
        return;
    }
    
    // Validar tamaño (máximo 5MB)
    if ($uploaded_file['size'] > 5 * 1024 * 1024) {
        wp_send_json_error(array('message' => 'El archivo es demasiado grande. Máximo 5MB.'));
        return;
    }
    
    // Mover archivo
    if (move_uploaded_file($uploaded_file['tmp_name'], $target_file)) {
        // Retornar ruta relativa desde la raíz del sitio
        $relative_path = 'wp-content/uploads/surtienvases/productos/' . $filename;
        wp_send_json_success(array('url' => $relative_path));
    } else {
        wp_send_json_error(array('message' => 'Error al subir la imagen'));
    }
}

// ========================================
// AJAX: SUBIR IMAGEN DE NOTICIA
// ========================================
add_action('wp_ajax_surtienvases_upload_news_image', 'surtienvases_upload_news_image');
add_action('wp_ajax_nopriv_surtienvases_upload_news_image', 'surtienvases_upload_news_image');

function surtienvases_upload_news_image()
{
    // Verificar que el archivo fue enviado
    if (!isset($_FILES['file'])) {
        wp_send_json_error(array('message' => 'No se recibió ningún archivo'));
        return;
    }
    
    // Cargar funciones de WordPress necesarias
    if (!function_exists('wp_handle_upload')) {
        require_once(ABSPATH . 'wp-admin/includes/file.php');
    }
    
    // Configurar directorio de uploads
    $upload_dir = wp_upload_dir();
    $surtienvases_dir = $upload_dir['basedir'] . '/surtienvases/novedades';
    
    // Crear directorio si no existe
    if (!file_exists($surtienvases_dir)) {
        wp_mkdir_p($surtienvases_dir);
    }
    
    // Obtener información del archivo
    $uploaded_file = $_FILES['file'];
    $filename = sanitize_file_name($uploaded_file['name']);
    
    // Generar nombre único si ya existe
    $target_file = $surtienvases_dir . '/' . $filename;
    $counter = 1;
    $file_info = pathinfo($filename);
    $base_name = $file_info['filename'];
    $extension = isset($file_info['extension']) ? '.' . $file_info['extension'] : '';
    
    while (file_exists($target_file)) {
        $filename = $base_name . '-' . $counter . $extension;
        $target_file = $surtienvases_dir . '/' . $filename;
        $counter++;
    }
    
    // Validar tipo de archivo
    $allowed_types = array('image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp');
    if (!in_array($uploaded_file['type'], $allowed_types)) {
        wp_send_json_error(array('message' => 'Tipo de archivo no permitido. Solo se permiten imágenes.'));
        return;
    }
    
    // Validar tamaño (máximo 5MB)
    if ($uploaded_file['size'] > 5 * 1024 * 1024) {
        wp_send_json_error(array('message' => 'El archivo es demasiado grande. Máximo 5MB.'));
        return;
    }
    
    // Mover archivo
    if (move_uploaded_file($uploaded_file['tmp_name'], $target_file)) {
        // Retornar ruta relativa desde la raíz del sitio
        $relative_path = 'wp-content/uploads/surtienvases/novedades/' . $filename;
        wp_send_json_success(array('url' => $relative_path));
    } else {
        wp_send_json_error(array('message' => 'Error al subir la imagen'));
    }
}