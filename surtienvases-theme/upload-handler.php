<?php
/**
 * ========================================
 * UPLOAD HANDLER - CORREGIDO SIN entity_id
 * Guarda archivo físico + registro en tabla imagenes
 * ========================================
 */

// ✅ PASO 1: Cargar WordPress
$wp_load = dirname(__FILE__) . '/../../../wp-load.php';

if (!file_exists($wp_load)) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'error' => 'No se pudo cargar WordPress. Verifica la ruta de wp-load.php'
    ]);
    exit;
}

require_once($wp_load);

// ✅ PASO 2: Headers
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

/**
 * Función para responder con JSON
 */
function sendJSON($data, $status = 200)
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

// ✅ PASO 3: Validaciones básicas
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJSON(['success' => false, 'error' => 'Método no permitido'], 405);
}

if (!isset($_FILES['file']) || !is_uploaded_file($_FILES['file']['tmp_name'])) {
    sendJSON(['success' => false, 'error' => 'No se recibió archivo válido'], 400);
}

$file = $_FILES['file'];

// Validar errores de upload
if ($file['error'] !== UPLOAD_ERR_OK) {
    $errors = [
        UPLOAD_ERR_INI_SIZE => 'Archivo muy grande (límite del servidor)',
        UPLOAD_ERR_FORM_SIZE => 'Archivo muy grande (límite del formulario)',
        UPLOAD_ERR_PARTIAL => 'Archivo subido parcialmente',
        UPLOAD_ERR_NO_FILE => 'No se subió archivo',
        UPLOAD_ERR_NO_TMP_DIR => 'Falta carpeta temporal',
        UPLOAD_ERR_CANT_WRITE => 'No se pudo escribir el archivo',
        UPLOAD_ERR_EXTENSION => 'Extensión bloqueada'
    ];

    $errorMsg = isset($errors[$file['error']]) ? $errors[$file['error']] : 'Error desconocido';
    sendJSON(['success' => false, 'error' => $errorMsg], 400);
}

// ✅ PASO 4: Validar tipo MIME
$allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mimeType, $allowedTypes)) {
    sendJSON(['success' => false, 'error' => 'Tipo de archivo no permitido: ' . $mimeType], 400);
}

// Validar tamaño (máximo 10MB)
$maxSize = 10 * 1024 * 1024;
if ($file['size'] > $maxSize) {
    sendJSON(['success' => false, 'error' => 'Archivo muy grande (máximo 10MB)'], 400);
}

// ✅ PASO 5: Obtener entity_type (ya NO guardamos entity_id)
$entityType = isset($_POST['entity_type']) ? sanitize_text_field($_POST['entity_type']) : 'otro';

// ✅ PASO 6: Generar nombre único
$extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
if (empty($extension)) {
    $extension = ($mimeType === 'image/jpeg' || $mimeType === 'image/jpg') ? 'jpg' : 'png';
}

$timestamp = time();
$random = bin2hex(random_bytes(4));
$filename = "{$entityType}_{$timestamp}_{$random}.{$extension}";

// ✅ PASO 7: Determinar subdirectorio
$subdir = 'otros';
if ($entityType === 'producto') {
    $subdir = 'productos';
} elseif ($entityType === 'noticia') {
    $subdir = 'novedades';
}

// ✅ PASO 8: Crear estructura de directorios
$baseDir = dirname(__FILE__) . '/uploads';
$targetDir = $baseDir . '/' . $subdir;

if (!file_exists($targetDir)) {
    if (!mkdir($targetDir, 0755, true)) {
        sendJSON(['success' => false, 'error' => 'No se pudo crear el directorio'], 500);
    }
}

// ✅ PASO 9: Mover archivo
$targetPath = $targetDir . '/' . $filename;

if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
    sendJSON(['success' => false, 'error' => 'Error al guardar el archivo en el servidor'], 500);
}

// ✅ PASO 10: Obtener dimensiones
$imageInfo = @getimagesize($targetPath);
$width = $imageInfo ? $imageInfo[0] : 0;
$height = $imageInfo ? $imageInfo[1] : 0;

// ✅ PASO 11: Construir URL pública
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host = $_SERVER['HTTP_HOST'];
$themePath = '/wp-content/themes/surtienvases-theme/uploads';
$fullUrl = $protocol . '://' . $host . $themePath . '/' . $subdir . '/' . $filename;

// Ruta relativa para la BD
$filepath = 'uploads/' . $subdir . '/' . $filename;

// ✅ PASO 12: Guardar en base de datos usando wpdb (SIN entity_id)
global $wpdb;

// Usar la base de datos surtienvases
$surtidb = new wpdb(DB_USER, DB_PASSWORD, 'surtienvases', DB_HOST);

if ($surtidb->error) {
    // Si falla la conexión, eliminar el archivo subido
    @unlink($targetPath);
    sendJSON(['success' => false, 'error' => 'Error de conexión a base de datos: ' . $surtidb->error], 500);
}

// ✅ Insertar en tabla imagenes (SIN entity_id)
$result = $surtidb->insert(
    'imagenes',
    [
        'filename' => $filename,
        'original_filename' => sanitize_text_field($file['name']),
        'filepath' => $filepath,
        'url' => $fullUrl,
        'filesize' => $file['size'],
        'width' => $width,
        'height' => $height,
        'mime_type' => $mimeType,
        'entity_type' => $entityType,
        'uploaded_by' => 'admin'
    ],
    [
        '%s', // filename
        '%s', // original_filename
        '%s', // filepath
        '%s', // url
        '%d', // filesize
        '%d', // width
        '%d', // height
        '%s', // mime_type
        '%s', // entity_type
        '%s'  // uploaded_by
    ]
);

if ($result === false) {
    // Si falla la BD, eliminar el archivo subido
    @unlink($targetPath);
    sendJSON(['success' => false, 'error' => 'Error al guardar en base de datos: ' . $surtidb->last_error], 500);
}

$imageId = $surtidb->insert_id;

// ✅ PASO 13: Respuesta exitosa
sendJSON([
    'success' => true,
    'data' => [
        'id' => $imageId,
        'filename' => $filename,
        'url' => $fullUrl,
        'thumbnail' => null,
        'width' => $width,
        'height' => $height,
        'size' => $file['size'],
        'mime_type' => $mimeType
    ],
    'message' => 'Imagen subida y registrada en base de datos'
], 200);