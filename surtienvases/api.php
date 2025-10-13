<?php
// ========================================
// API REST COMPLETA - SURTIENVASES
// Maneja: Productos, Categorías, Industrias, Noticias, Comentarios
// ========================================

require_once 'config.php';

// Obtener el método HTTP y la acción
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
    $db = getDB();

    $stmt = $db->query("
        SELECT p.*, 
               GROUP_CONCAT(DISTINCT e.specification) as specifications,
               GROUP_CONCAT(DISTINCT b.benefit) as benefits
        FROM productos p
        LEFT JOIN especificaciones e ON p.id = e.producto_id
        LEFT JOIN beneficios b ON p.id = b.producto_id
        GROUP BY p.id
        ORDER BY p.created_at DESC
    ");

    $products = $stmt->fetchAll();

    // Convertir strings separados por comas en arrays
    foreach ($products as &$product) {
        $product['specifications'] = $product['specifications'] ? explode(',', $product['specifications']) : [];
        $product['benefits'] = $product['benefits'] ? explode(',', $product['benefits']) : [];
        $product['isPopular'] = (bool) $product['isPopular'];
    }

    successResponse($products);
}

function getProduct()
{
    $id = $_GET['id'] ?? null;

    if (!$id) {
        errorResponse('ID de producto requerido');
    }

    $db = getDB();

    $stmt = $db->prepare("SELECT * FROM productos WHERE id = ?");
    $stmt->execute([$id]);
    $product = $stmt->fetch();

    if (!$product) {
        errorResponse('Producto no encontrado', 404);
    }

    // Obtener especificaciones
    $stmt = $db->prepare("SELECT specification FROM especificaciones WHERE producto_id = ?");
    $stmt->execute([$id]);
    $product['specifications'] = $stmt->fetchAll(PDO::FETCH_COLUMN);

    // Obtener beneficios
    $stmt = $db->prepare("SELECT benefit FROM beneficios WHERE producto_id = ?");
    $stmt->execute([$id]);
    $product['benefits'] = $stmt->fetchAll(PDO::FETCH_COLUMN);

    $product['isPopular'] = (bool) $product['isPopular'];

    successResponse($product);
}

function createProduct()
{
    $data = json_decode(file_get_contents('php://input'), true);

    validateRequired($data, ['title', 'description']);

    $db = getDB();
    $db->beginTransaction();

    try {
        // Insertar producto
        $stmt = $db->prepare("
            INSERT INTO productos (title, price, origin, material, category, industry, 
                                   description, img, isPopular, recommendation, 
                                   minimumOrder, certification, stock)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");

        $stmt->execute([
            sanitize($data['title']),
            sanitize($data['price'] ?? ''),
            sanitize($data['origin'] ?? ''),
            sanitize($data['material'] ?? ''),
            sanitize($data['category'] ?? ''),
            sanitize($data['industry'] ?? ''),
            sanitize($data['description']),
            sanitize($data['img'] ?? 'assets/img/productos/default-product.jpg'),
            isset($data['isPopular']) ? (bool) $data['isPopular'] : false,
            sanitize($data['recommendation'] ?? ''),
            sanitize($data['minimumOrder'] ?? ''),
            sanitize($data['certification'] ?? ''),
            sanitize($data['stock'] ?? 'Disponible')
        ]);

        $productId = $db->lastInsertId();

        // Insertar especificaciones
        if (!empty($data['specifications'])) {
            $stmt = $db->prepare("INSERT INTO especificaciones (producto_id, specification) VALUES (?, ?)");
            foreach ($data['specifications'] as $spec) {
                $stmt->execute([$productId, sanitize($spec)]);
            }
        }

        // Insertar beneficios
        if (!empty($data['benefits'])) {
            $stmt = $db->prepare("INSERT INTO beneficios (producto_id, benefit) VALUES (?, ?)");
            foreach ($data['benefits'] as $benefit) {
                $stmt->execute([$productId, sanitize($benefit)]);
            }
        }

        $db->commit();

        successResponse(['id' => $productId], 'Producto creado exitosamente');
    } catch (Exception $e) {
        $db->rollBack();
        throw $e;
    }
}

function updateProduct()
{
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['id'])) {
        errorResponse('ID de producto requerido');
    }

    $db = getDB();
    $db->beginTransaction();

    try {
        // Actualizar producto
        $stmt = $db->prepare("
            UPDATE productos 
            SET title = ?, price = ?, origin = ?, material = ?, category = ?, 
                industry = ?, description = ?, img = ?, isPopular = ?, 
                recommendation = ?, minimumOrder = ?, certification = ?, stock = ?
            WHERE id = ?
        ");

        $stmt->execute([
            sanitize($data['title']),
            sanitize($data['price'] ?? ''),
            sanitize($data['origin'] ?? ''),
            sanitize($data['material'] ?? ''),
            sanitize($data['category'] ?? ''),
            sanitize($data['industry'] ?? ''),
            sanitize($data['description']),
            sanitize($data['img'] ?? ''),
            isset($data['isPopular']) ? (bool) $data['isPopular'] : false,
            sanitize($data['recommendation'] ?? ''),
            sanitize($data['minimumOrder'] ?? ''),
            sanitize($data['certification'] ?? ''),
            sanitize($data['stock'] ?? 'Disponible'),
            $data['id']
        ]);

        // Actualizar especificaciones (eliminar y reinsertar)
        $db->prepare("DELETE FROM especificaciones WHERE producto_id = ?")->execute([$data['id']]);
        if (!empty($data['specifications'])) {
            $stmt = $db->prepare("INSERT INTO especificaciones (producto_id, specification) VALUES (?, ?)");
            foreach ($data['specifications'] as $spec) {
                $stmt->execute([$data['id'], sanitize($spec)]);
            }
        }

        // Actualizar beneficios
        $db->prepare("DELETE FROM beneficios WHERE producto_id = ?")->execute([$data['id']]);
        if (!empty($data['benefits'])) {
            $stmt = $db->prepare("INSERT INTO beneficios (producto_id, benefit) VALUES (?, ?)");
            foreach ($data['benefits'] as $benefit) {
                $stmt->execute([$data['id'], sanitize($benefit)]);
            }
        }

        $db->commit();

        successResponse(['id' => $data['id']], 'Producto actualizado exitosamente');
    } catch (Exception $e) {
        $db->rollBack();
        throw $e;
    }
}

function deleteProduct()
{
    $id = $_GET['id'] ?? null;

    if (!$id) {
        errorResponse('ID de producto requerido');
    }

    $db = getDB();

    $stmt = $db->prepare("DELETE FROM productos WHERE id = ?");
    $stmt->execute([$id]);

    if ($stmt->rowCount() === 0) {
        errorResponse('Producto no encontrado', 404);
    }

    successResponse(null, 'Producto eliminado exitosamente');
}

// ========================================
// FUNCIONES DE CATEGORÍAS
// ========================================

function getCategories()
{
    $db = getDB();

    $stmt = $db->query("SELECT * FROM categorias ORDER BY name");
    $categories = $stmt->fetchAll();

    successResponse($categories);
}

function createCategory()
{
    $data = json_decode(file_get_contents('php://input'), true);

    validateRequired($data, ['name', 'key']);

    $db = getDB();

    $stmt = $db->prepare("INSERT INTO categorias (name, `key`, icon) VALUES (?, ?, ?)");
    $stmt->execute([
        sanitize($data['name']),
        sanitize($data['key']),
        sanitize($data['icon'] ?? '📦')
    ]);

    successResponse(['id' => $db->lastInsertId()], 'Categoría creada exitosamente');
}

function deleteCategory()
{
    $id = $_GET['id'] ?? null;

    if (!$id) {
        errorResponse('ID de categoría requerido');
    }

    $db = getDB();

    $stmt = $db->prepare("DELETE FROM categorias WHERE id = ?");
    $stmt->execute([$id]);

    if ($stmt->rowCount() === 0) {
        errorResponse('Categoría no encontrada', 404);
    }

    successResponse(null, 'Categoría eliminada exitosamente');
}

// ========================================
// FUNCIONES DE INDUSTRIAS
// ========================================

function getIndustries()
{
    $db = getDB();

    $stmt = $db->query("SELECT * FROM industrias ORDER BY name");
    $industries = $stmt->fetchAll();

    successResponse($industries);
}

function createIndustry()
{
    $data = json_decode(file_get_contents('php://input'), true);

    validateRequired($data, ['name', 'key']);

    $db = getDB();

    $stmt = $db->prepare("INSERT INTO industrias (name, `key`, icon) VALUES (?, ?, ?)");
    $stmt->execute([
        sanitize($data['name']),
        sanitize($data['key']),
        sanitize($data['icon'] ?? '🏭')
    ]);

    successResponse(['id' => $db->lastInsertId()], 'Industria creada exitosamente');
}

function deleteIndustry()
{
    $id = $_GET['id'] ?? null;

    if (!$id) {
        errorResponse('ID de industria requerido');
    }

    $db = getDB();

    $stmt = $db->prepare("DELETE FROM industrias WHERE id = ?");
    $stmt->execute([$id]);

    if ($stmt->rowCount() === 0) {
        errorResponse('Industria no encontrada', 404);
    }

    successResponse(null, 'Industria eliminada exitosamente');
}

// ========================================
// FUNCIONES DE NOTICIAS
// ========================================

function getNews()
{
    $db = getDB();

    $stmt = $db->query("SELECT * FROM noticias ORDER BY created_at DESC");
    $news = $stmt->fetchAll();

    successResponse($news);
}

function createNews()
{
    $data = json_decode(file_get_contents('php://input'), true);

    validateRequired($data, ['title', 'excerpt']);

    $db = getDB();

    $stmt = $db->prepare("
        INSERT INTO noticias (title, author, excerpt, imageUrl, avatarUrl)
        VALUES (?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        sanitize($data['title']),
        sanitize($data['author'] ?? 'Usuario Invitado'),
        sanitize($data['excerpt']),
        sanitize($data['imageUrl'] ?? 'assets/img/blog/blogDefault.jpg'),
        sanitize($data['avatarUrl'] ?? 'assets/img/surtienvases/avatars/default.jpg')
    ]);

    successResponse(['id' => $db->lastInsertId()], 'Noticia creada exitosamente');
}

function deleteNews()
{
    $id = $_GET['id'] ?? null;

    if (!$id) {
        errorResponse('ID de noticia requerido');
    }

    $db = getDB();

    $stmt = $db->prepare("DELETE FROM noticias WHERE id = ?");
    $stmt->execute([$id]);

    if ($stmt->rowCount() === 0) {
        errorResponse('Noticia no encontrada', 404);
    }

    successResponse(null, 'Noticia eliminada exitosamente');
}

// ========================================
// FUNCIONES DE COMENTARIOS
// ========================================

function getComments()
{
    $newsId = $_GET['news_id'] ?? null;

    if (!$newsId) {
        errorResponse('ID de noticia requerido');
    }

    $db = getDB();

    $stmt = $db->prepare("SELECT * FROM comentarios WHERE noticia_id = ? ORDER BY created_at ASC");
    $stmt->execute([$newsId]);
    $comments = $stmt->fetchAll();

    successResponse($comments);
}

function createComment()
{
    $data = json_decode(file_get_contents('php://input'), true);

    validateRequired($data, ['noticia_id', 'text']);

    $db = getDB();

    $stmt = $db->prepare("
        INSERT INTO comentarios (noticia_id, author, text)
        VALUES (?, ?, ?)
    ");

    $stmt->execute([
        $data['noticia_id'],
        sanitize($data['author'] ?? 'Usuario Invitado'),
        sanitize($data['text'])
    ]);

    successResponse(['id' => $db->lastInsertId()], 'Comentario creado exitosamente');
}

function deleteComment()
{
    $id = $_GET['id'] ?? null;

    if (!$id) {
        errorResponse('ID de comentario requerido');
    }

    $db = getDB();

    $stmt = $db->prepare("DELETE FROM comentarios WHERE id = ?");
    $stmt->execute([$id]);

    if ($stmt->rowCount() === 0) {
        errorResponse('Comentario no encontrado', 404);
    }

    successResponse(null, 'Comentario eliminado exitosamente');
}
?>