<?php
// ========================================
// CONFIGURACIÓN DE BASE DE DATOS
// SurtiEnvases - config.php
// ========================================

// Configuración para desarrollo local
define('DB_HOST', 'localhost');
define('DB_NAME', 'surtienvases');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

// IMPORTANTE: Para WordPress/Producción, cambia estos valores a:
// define('DB_HOST', 'tu_host_mysql');
// define('DB_NAME', 'tu_base_de_datos');
// define('DB_USER', 'tu_usuario');
// define('DB_PASS', 'tu_contraseña');

// Clase de conexión a la base de datos
class Database
{
    private static $instance = null;
    private $connection;

    private function __construct()
    {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];

            $this->connection = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            die("Error de conexión: " . $e->getMessage());
        }
    }

    // Singleton pattern
    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    // Obtener la conexión
    public function getConnection()
    {
        return $this->connection;
    }

    // Prevenir clonación
    private function __clone()
    {
    }

    // Prevenir deserialización
    public function __wakeup()
    {
        throw new Exception("Cannot unserialize singleton");
    }
}

// Función helper para obtener la conexión
function getDB()
{
    return Database::getInstance()->getConnection();
}

// Configuración de headers CORS (importante para API)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=UTF-8');

// Manejar peticiones OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
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

// Función para sanitizar entrada
function sanitize($data)
{
    if (is_array($data)) {
        return array_map('sanitize', $data);
    }
    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}

// Función para validar entrada requerida
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