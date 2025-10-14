<?php
// ========================================
// API REST - SURTIENVASES
// Usa la BD surtienvases directamente
// ========================================

// Cargar WordPress
$wp_load = dirname(__FILE__) . '/../../../wp-load.php';

if (file_exists($wp_load)) {
    require_once($wp_load);
} else {
    http_response_code(500);
    die(json_encode([
        'success' => false,
        'error' => 'No se pudo cargar WordPress'
    ], JSON_UNESCAPED_UNICODE));
}

// Headers
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// IMPORTANTE: Conectar a la base de datos surtienvases
global $wpdb;

// Crear una nueva conexión a la base de datos surtienvases
$surtidb = new wpdb(DB_USER, DB_PASSWORD, 'surtienvases', DB_HOST);

// Verificar conexión
if ($surtidb->error) {
    errorResponse('Error de conexión a base de datos surtienvases: ' . $surtidb->error);
}

// NO usar prefijo porque las tablas no tienen prefijo
$surtidb->prefix = '';

// Funciones helper
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

// Obtener método y acción
$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

// Enrutador principal
try {
    switch ($action) {
        // ========== PRODUCTOS ==========
        case 'get_products':
            getProducts();
            break;

        case 'get_product':
            getProduct();
            break;

        case 'create_product':
            createProduct();
            break;

        case 'update_product':
            updateProduct();
            break;

        case 'delete_product':
            deleteProduct();
            break;

        // ========== CATEGORÍAS ==========
        case 'get_categories':
            getCategories();
            break;

        case 'create_category':
            createCategory();
            break;

        case 'delete_category':
            deleteCategory();
            break;

        // ========== INDUSTRIAS ==========
        case 'get_industries':
            getIndustries();
            break;

        case 'create_industry':
            createIndustry();
            break;

        case 'delete_industry':
            deleteIndustry();
            break;

        // ========== NOTICIAS ==========
        case 'get_news':
            getNews();
            break;

        case 'create_news':
            createNews();
            break;

        case 'delete_news':
            deleteNews();
            break;

        // ========== COMENTARIOS ==========
        case 'get_comments':
            getComments();
            break;

        case 'create_comment':
            createComment();
            break;

        case 'delete_comment':
            deleteComment();
            break;

        default:
            errorResponse('Acción no válida', 404);
    }
} catch (Exception $e) {
    errorResponse($e->getMessage(), 500);
}

// ========================================
// FUNCIONES DE PRODUCTOS
// ========================================

function getProducts()
{
    global $surtidb;

    $query = "
        SELECT p.*, 
               GROUP_CONCAT(DISTINCT e.specification) as specifications,
               GROUP_CONCAT(DISTINCT b.benefit) as benefits
        FROM productos p
        LEFT JOIN especificaciones e ON p.id = e.producto_id
        LEFT JOIN beneficios b ON p.id = b.producto_id
        GROUP BY p.id
        ORDER BY p.created_at DESC
    ";

    $products = $surtidb->get_results($query, ARRAY_A);

    foreach ($products as &$product) {
        $product['specifications'] = $product['specifications'] ? explode(',', $product['specifications']) : [];
        $product['benefits'] = $product['benefits'] ? explode(',', $product['benefits']) : [];
        $product['isPopular'] = (bool) $product['isPopular'];
    }

    successResponse($products);
}

function getProduct()
{
    global $surtidb;

    $id = $_GET['id'] ?? null;

    if (!$id) {
        errorResponse('ID de producto requerido');
    }

    $product = $surtidb->get_row(
        $surtidb->prepare("SELECT * FROM productos WHERE id = %d", $id),
        ARRAY_A
    );

    if (!$product) {
        errorResponse('Producto no encontrado', 404);
    }

    // Obtener especificaciones
    $specs = $surtidb->get_col(
        $surtidb->prepare("SELECT specification FROM especificaciones WHERE producto_id = %d", $id)
    );
    $product['specifications'] = $specs;

    // Obtener beneficios
    $benefits = $surtidb->get_col(
        $surtidb->prepare("SELECT benefit FROM beneficios WHERE producto_id = %d", $id)
    );
    $product['benefits'] = $benefits;

    $product['isPopular'] = (bool) $product['isPopular'];

    successResponse($product);
}

function createProduct()
{
    global $surtidb;

    $data = json_decode(file_get_contents('php://input'), true);

    validateRequired($data, ['title', 'description']);

    $surtidb->query('START TRANSACTION');

    try {
        // Insertar producto
        $result = $surtidb->insert(
            "productos",
            [
                'title' => sanitize($data['title']),
                'price' => sanitize($data['price'] ?? ''),
                'origin' => sanitize($data['origin'] ?? ''),
                'material' => sanitize($data['material'] ?? ''),
                'category' => sanitize($data['category'] ?? ''),
                'industry' => sanitize($data['industry'] ?? ''),
                'description' => sanitize($data['description']),
                'img' => sanitize($data['img'] ?? 'assets/img/productos/default-product.jpg'),
                'isPopular' => isset($data['isPopular']) ? (int) (bool) $data['isPopular'] : 0,
                'recommendation' => sanitize($data['recommendation'] ?? ''),
                'minimumOrder' => sanitize($data['minimumOrder'] ?? ''),
                'certification' => sanitize($data['certification'] ?? ''),
                'stock' => sanitize($data['stock'] ?? 'Disponible')
            ]
        );

        if ($result === false) {
            throw new Exception('Error al insertar producto: ' . $surtidb->last_error);
        }

        $productId = $surtidb->insert_id;

        // Insertar especificaciones
        if (!empty($data['specifications'])) {
            foreach ($data['specifications'] as $spec) {
                $surtidb->insert(
                    "especificaciones",
                    [
                        'producto_id' => $productId,
                        'specification' => sanitize($spec)
                    ]
                );
            }
        }

        // Insertar beneficios
        if (!empty($data['benefits'])) {
            foreach ($data['benefits'] as $benefit) {
                $surtidb->insert(
                    "beneficios",
                    [
                        'producto_id' => $productId,
                        'benefit' => sanitize($benefit)
                    ]
                );
            }
        }

        $surtidb->query('COMMIT');

        successResponse(['id' => $productId], 'Producto creado exitosamente');
    } catch (Exception $e) {
        $surtidb->query('ROLLBACK');
        throw $e;
    }
}

function updateProduct()
{
    global $surtidb;

    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['id'])) {
        errorResponse('ID de producto requerido');
    }

    $surtidb->query('START TRANSACTION');

    try {
        // Actualizar producto
        $surtidb->update(
            "productos",
            [
                'title' => sanitize($data['title']),
                'price' => sanitize($data['price'] ?? ''),
                'origin' => sanitize($data['origin'] ?? ''),
                'material' => sanitize($data['material'] ?? ''),
                'category' => sanitize($data['category'] ?? ''),
                'industry' => sanitize($data['industry'] ?? ''),
                'description' => sanitize($data['description']),
                'img' => sanitize($data['img'] ?? ''),
                'isPopular' => isset($data['isPopular']) ? (int) (bool) $data['isPopular'] : 0,
                'recommendation' => sanitize($data['recommendation'] ?? ''),
                'minimumOrder' => sanitize($data['minimumOrder'] ?? ''),
                'certification' => sanitize($data['certification'] ?? ''),
                'stock' => sanitize($data['stock'] ?? 'Disponible')
            ],
            ['id' => $data['id']]
        );

        // Actualizar especificaciones
        $surtidb->delete("especificaciones", ['producto_id' => $data['id']]);
        if (!empty($data['specifications'])) {
            foreach ($data['specifications'] as $spec) {
                $surtidb->insert(
                    "especificaciones",
                    [
                        'producto_id' => $data['id'],
                        'specification' => sanitize($spec)
                    ]
                );
            }
        }

        // Actualizar beneficios
        $surtidb->delete("beneficios", ['producto_id' => $data['id']]);
        if (!empty($data['benefits'])) {
            foreach ($data['benefits'] as $benefit) {
                $surtidb->insert(
                    "beneficios",
                    [
                        'producto_id' => $data['id'],
                        'benefit' => sanitize($benefit)
                    ]
                );
            }
        }

        $surtidb->query('COMMIT');

        successResponse(['id' => $data['id']], 'Producto actualizado exitosamente');
    } catch (Exception $e) {
        $surtidb->query('ROLLBACK');
        throw $e;
    }
}

function deleteProduct()
{
    global $surtidb;

    $id = $_GET['id'] ?? null;

    if (!$id) {
        errorResponse('ID de producto requerido');
    }

    $result = $surtidb->delete("productos", ['id' => $id]);

    if ($result === 0) {
        errorResponse('Producto no encontrado', 404);
    }

    successResponse(null, 'Producto eliminado exitosamente');
}

// ========================================
// FUNCIONES DE CATEGORÍAS
// ========================================

function getCategories()
{
    global $surtidb;

    $categories = $surtidb->get_results("SELECT * FROM categorias ORDER BY name", ARRAY_A);

    successResponse($categories);
}

function createCategory()
{
    global $surtidb;

    $data = json_decode(file_get_contents('php://input'), true);

    validateRequired($data, ['name', 'key']);

    $result = $surtidb->insert(
        "categorias",
        [
            'name' => sanitize($data['name']),
            'key' => sanitize($data['key']),
            'icon' => sanitize($data['icon'] ?? '📦')
        ]
    );

    if ($result === false) {
        errorResponse('Error al crear categoría: ' . $surtidb->last_error);
    }

    successResponse(['id' => $surtidb->insert_id], 'Categoría creada exitosamente');
}

function deleteCategory()
{
    global $surtidb;

    $id = $_GET['id'] ?? null;

    if (!$id) {
        errorResponse('ID de categoría requerido');
    }

    $result = $surtidb->delete("categorias", ['id' => $id]);

    if ($result === 0) {
        errorResponse('Categoría no encontrada', 404);
    }

    successResponse(null, 'Categoría eliminada exitosamente');
}

// ========================================
// FUNCIONES DE INDUSTRIAS
// ========================================

function getIndustries()
{
    global $surtidb;

    $industries = $surtidb->get_results("SELECT * FROM industrias ORDER BY name", ARRAY_A);

    successResponse($industries);
}

function createIndustry()
{
    global $surtidb;

    $data = json_decode(file_get_contents('php://input'), true);

    validateRequired($data, ['name', 'key']);

    $result = $surtidb->insert(
        "industrias",
        [
            'name' => sanitize($data['name']),
            'key' => sanitize($data['key']),
            'icon' => sanitize($data['icon'] ?? '🏭')
        ]
    );

    if ($result === false) {
        errorResponse('Error al crear industria: ' . $surtidb->last_error);
    }

    successResponse(['id' => $surtidb->insert_id], 'Industria creada exitosamente');
}

function deleteIndustry()
{
    global $surtidb;

    $id = $_GET['id'] ?? null;

    if (!$id) {
        errorResponse('ID de industria requerido');
    }

    $result = $surtidb->delete("industrias", ['id' => $id]);

    if ($result === 0) {
        errorResponse('Industria no encontrada', 404);
    }

    successResponse(null, 'Industria eliminada exitosamente');
}

// ========================================
// FUNCIONES DE NOTICIAS
// ========================================

function getNews()
{
    global $surtidb;

    $news = $surtidb->get_results("SELECT * FROM noticias ORDER BY created_at DESC", ARRAY_A);

    successResponse($news);
}

function createNews()
{
    global $surtidb;

    $data = json_decode(file_get_contents('php://input'), true);

    validateRequired($data, ['title', 'excerpt']);

    $result = $surtidb->insert(
        "noticias",
        [
            'title' => sanitize($data['title']),
            'author' => sanitize($data['author'] ?? 'Usuario Invitado'),
            'excerpt' => sanitize($data['excerpt']),
            'imageUrl' => sanitize($data['imageUrl'] ?? 'assets/img/blog/blogDefault.jpg'),
            'avatarUrl' => sanitize($data['avatarUrl'] ?? 'assets/img/surtienvases/avatars/default.jpg')
        ]
    );

    if ($result === false) {
        errorResponse('Error al crear noticia: ' . $surtidb->last_error);
    }

    successResponse(['id' => $surtidb->insert_id], 'Noticia creada exitosamente');
}

function deleteNews()
{
    global $surtidb;

    $id = $_GET['id'] ?? null;

    if (!$id) {
        errorResponse('ID de noticia requerido');
    }

    $result = $surtidb->delete("noticias", ['id' => $id]);

    if ($result === 0) {
        errorResponse('Noticia no encontrada', 404);
    }

    successResponse(null, 'Noticia eliminada exitosamente');
}

// ========================================
// FUNCIONES DE COMENTARIOS
// ========================================

function getComments()
{
    global $surtidb;

    $newsId = $_GET['news_id'] ?? null;

    if (!$newsId) {
        errorResponse('ID de noticia requerido');
    }

    $comments = $surtidb->get_results(
        $surtidb->prepare("SELECT * FROM comentarios WHERE noticia_id = %d ORDER BY created_at ASC", $newsId),
        ARRAY_A
    );

    successResponse($comments);
}

function createComment()
{
    global $surtidb;

    $data = json_decode(file_get_contents('php://input'), true);

    validateRequired($data, ['noticia_id', 'text']);

    $result = $surtidb->insert(
        "comentarios",
        [
            'noticia_id' => $data['noticia_id'],
            'author' => sanitize($data['author'] ?? 'Usuario Invitado'),
            'text' => sanitize($data['text'])
        ]
    );

    if ($result === false) {
        errorResponse('Error al crear comentario: ' . $surtidb->last_error);
    }

    successResponse(['id' => $surtidb->insert_id], 'Comentario creado exitosamente');
}

function deleteComment()
{
    global $surtidb;

    $id = $_GET['id'] ?? null;

    if (!$id) {
        errorResponse('ID de comentario requerido');
    }

    $result = $surtidb->delete("comentarios", ['id' => $id]);

    if ($result === 0) {
        errorResponse('Comentario no encontrado', 404);
    }

    successResponse(null, 'Comentario eliminado exitosamente');
}
?>