<?php
/**
 * ========================================
 * UPLOAD HANDLER ULTRA SIMPLIFICADO
 * Versión que SÍ O SÍ funciona
 * ========================================
 */

// CRÍTICO: Limpiar CUALQUIER output previo
while (ob_get_level()) {
    ob_end_clean();
}
ob_start();

// Evitar warnings y notices
error_reporting(E_ERROR | E_PARSE);
ini_set('display_errors', 0);

// Headers ANTES de cualquier output
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    ob_end_clean();
    http_response_code(200);
    exit();
}

/**
 * Función para devolver JSON limpio
 */
function sendJSON($data, $status = 200)
{
    ob_end_clean(); // Limpiar buffer
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit();
}

/**
 * ========================================
 * MANEJO DEL UPLOAD
 * ========================================
 */
try {
    // Validar método
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Método no permitido');
    }

    // Validar archivo
    if (!isset($_FILES['file'])) {
        throw new Exception('No se recibió archivo');
    }

    $file = $_FILES['file'];

    // Validar error de upload
    if ($file['error'] !== UPLOAD_ERR_OK) {
        $errors = [
            UPLOAD_ERR_INI_SIZE => 'Archivo muy grande (servidor)',
            UPLOAD_ERR_FORM_SIZE => 'Archivo muy grande (formulario)',
            UPLOAD_ERR_PARTIAL => 'Archivo subido parcialmente',
            UPLOAD_ERR_NO_FILE => 'No se subió archivo',
            UPLOAD_ERR_NO_TMP_DIR => 'Falta carpeta temporal',
            UPLOAD_ERR_CANT_WRITE => 'Error al escribir',
            UPLOAD_ERR_EXTENSION => 'Extensión bloqueó la subida'
        ];
        $errorMsg = isset($errors[$file['error']]) ? $errors[$file['error']] : 'Error desconocido';
        throw new Exception($errorMsg);
    }

    // Obtener entity_type
    $entityType = isset($_POST['entity_type']) ? $_POST['entity_type'] : 'otro';

    // Validar tipo MIME
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mimeType = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);

    $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!in_array($mimeType, $allowedTypes)) {
        throw new Exception('Tipo de archivo no permitido: ' . $mimeType);
    }

    // Obtener dimensiones
    $imageInfo = @getimagesize($file['tmp_name']);
    $width = $imageInfo ? $imageInfo[0] : 0;
    $height = $imageInfo ? $imageInfo[1] : 0;

    // Generar nombre único
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    if (!$extension) {
        $extension = ($mimeType === 'image/jpeg' || $mimeType === 'image/jpg') ? 'jpg' : 'png';
    }

    $prefix = substr($entityType, 0, 4);
    $timestamp = time();
    $random = bin2hex(random_bytes(4));
    $filename = "{$prefix}_{$timestamp}_{$random}.{$extension}";

    // Determinar subdirectorio
    $subdir = 'otros';
    if ($entityType === 'producto') {
        $subdir = 'productos';
    } elseif ($entityType === 'noticia') {
        $subdir = 'novedades';
    }

    // Rutas
    $baseDir = __DIR__ . '/uploads';
    $targetDir = $baseDir . '/' . $subdir;

    // Crear directorio si no existe
    if (!file_exists($targetDir)) {
        @mkdir($targetDir, 0755, true);
    }

    $targetPath = $targetDir . '/' . $filename;

    // Mover archivo
    if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
        throw new Exception('Error al guardar archivo');
    }

    // Construir URL
    $protocol = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'];
    $baseUrl = $protocol . '://' . $host . '/wp-content/themes/surtienvases-theme/uploads';
    $fullUrl = $baseUrl . '/' . $subdir . '/' . $filename;

    // Intentar guardar en BD (opcional, no rompe si falla)
    $imageId = null;
    try {
        // Cargar config y BD
        if (file_exists(__DIR__ . '/config.php')) {
            require_once __DIR__ . '/config.php';
            $db = getDB();

            $stmt = $db->prepare("
                INSERT INTO imagenes (
                    filename, original_filename, filepath, url,
                    filesize, width, height, mime_type,
                    entity_type, entity_id
                ) VALUES (
                    :filename, :original_filename, :filepath, :url,
                    :filesize, :width, :height, :mime_type,
                    :entity_type, :entity_id
                )
            ");

            $stmt->execute([
                'filename' => $filename,
                'original_filename' => htmlspecialchars($file['name']),
                'filepath' => $subdir . '/' . $filename,
                'url' => $fullUrl,
                'filesize' => $file['size'],
                'width' => $width,
                'height' => $height,
                'mime_type' => $mimeType,
                'entity_type' => $entityType,
                'entity_id' => isset($_POST['entity_id']) ? intval($_POST['entity_id']) : null
            ]);

            $imageId = $db->lastInsertId();
        }
    } catch (Exception $e) {
        // BD es opcional, continuar
        error_log('Error BD (no crítico): ' . $e->getMessage());
    }

    // Respuesta exitosa
    sendJSON([
        'success' => true,
        'data' => [
            'id' => $imageId ? intval($imageId) : null,
            'filename' => $filename,
            'url' => $fullUrl,
            'thumbnail' => null,
            'width' => $width,
            'height' => $height,
            'size' => $file['size'],
            'mime_type' => $mimeType
        ],
        'message' => 'Imagen subida exitosamente'
    ]);

} catch (Exception $e) {
    sendJSON([
        'success' => false,
        'error' => $e->getMessage()
    ], 400);
}
?>