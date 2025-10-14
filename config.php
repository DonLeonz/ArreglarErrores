<?php
// ========================================
// CONFIGURACIÓN DE BASE DE DATOS
// SurtiEnvases - WordPress Edition
// ========================================

// Detectar si estamos en WordPress
if (defined('DB_NAME')) {
    // Usar credenciales de WordPress
    define('SURTIENVASES_DB_HOST', DB_HOST);
    define('SURTIENVASES_DB_NAME', DB_NAME);
    define('SURTIENVASES_DB_USER', DB_USER);
    define('SURTIENVASES_DB_PASS', DB_PASSWORD);
} else {
    // Fallback para pruebas standalone
    define('SURTIENVASES_DB_HOST', 'localhost');
    define('SURTIENVASES_DB_NAME', 'local');
    define('SURTIENVASES_DB_USER', 'root');
    define('SURTIENVASES_DB_PASS', 'root');
}
define('SURTIENVASES_DB_CHARSET', 'utf8mb4');

// Clase de conexión a la base de datos
class Database
{
    private static $instance = null;
    private $connection;

    private function __construct()
    {
        try {
            $dsn = "mysql:host=" . SURTIENVASES_DB_HOST . ";dbname=" . SURTIENVASES_DB_NAME . ";charset=" . SURTIENVASES_DB_CHARSET;
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];

            $this->connection = new PDO($dsn, SURTIENVASES_DB_USER, SURTIENVASES_DB_PASS, $options);
        } catch (PDOException $e) {
            die("Error de conexión: " . $e->getMessage());
        }
    }

    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getConnection()
    {
        return $this->connection;
    }

    private function __clone()
    {
    }

    public function __wakeup()
    {
        throw new Exception("Cannot unserialize singleton");
    }
}

function getDB()
{
    return Database::getInstance()->getConnection();
}

// Configuración de zona horaria
date_default_timezone_set('America/Bogota');

// Funciones de utilidad
function jsonResponse($data, $status = 200)
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit();
}

function errorResponse($message, $status = 400)
{
    jsonResponse([
        'success' => false,
        'error' => $message
    ], $status);
}

function successResponse($data, $message = null)
{
    $response = [
        'success' => true,
        'data' => $data
    ];

    if ($message) {
        $response['message'] = $message;
    }

    jsonResponse($response);
}

function sanitize($data)
{
    if (is_array($data)) {
        return array_map('sanitize', $data);
    }
    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}

function validateRequired($data, $fields)
{
    $missing = [];
    foreach ($fields as $field) {
        if (!isset($data[$field]) || empty(trim($data[$field]))) {
            $missing[] = $field;
        }
    }

    if (!empty($missing)) {
        errorResponse("Campos requeridos faltantes: " . implode(', ', $missing), 422);
    }
}
?>