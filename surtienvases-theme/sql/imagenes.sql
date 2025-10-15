-- ========================================
-- TABLA DE IMÁGENES - SURTIENVASES
-- Sistema moderno de gestión de archivos
-- ========================================

USE surtienvases;

CREATE TABLE IF NOT EXISTS imagenes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    
    -- Información del archivo
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    filepath VARCHAR(500) NOT NULL,
    url VARCHAR(500) NOT NULL,
    
    -- Metadatos
    filesize INT NOT NULL COMMENT 'Tamaño en bytes',
    width INT,
    height INT,
    mime_type VARCHAR(50) NOT NULL,
    
    -- Thumbnail (opcional)
    thumbnail_path VARCHAR(500),
    thumbnail_url VARCHAR(500),
    
    -- Relación (opcional)
    entity_type ENUM('producto', 'noticia', 'categoria', 'otro') DEFAULT 'otro',
    entity_id INT DEFAULT NULL,
    
    -- Auditoría
    uploaded_by VARCHAR(100) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Índices
    INDEX idx_entity (entity_type, entity_id),
    INDEX idx_filename (filename),
    INDEX idx_created (created_at)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- LIMPIEZA DE IMÁGENES HUÉRFANAS
-- ========================================

-- Procedimiento para limpiar imágenes sin referencia
DELIMITER $$

CREATE PROCEDURE IF NOT EXISTS limpiar_imagenes_huerfanas()
BEGIN
    -- Eliminar registros de imágenes de productos que ya no existen
    DELETE i FROM imagenes i
    LEFT JOIN productos p ON i.entity_type = 'producto' AND i.entity_id = p.id
    WHERE i.entity_type = 'producto' AND p.id IS NULL;
    
    -- Eliminar registros de imágenes de noticias que ya no existen
    DELETE i FROM imagenes i
    LEFT JOIN noticias n ON i.entity_type = 'noticia' AND i.entity_id = n.id
    WHERE i.entity_type = 'noticia' AND n.id IS NULL;
END$$

DELIMITER ;

-- ========================================
-- DATOS DE EJEMPLO (Opcional)
-- ========================================

-- Puedes descomentar esto para testing
/*
INSERT INTO imagenes (
    filename, 
    original_filename, 
    filepath, 
    url, 
    filesize, 
    width, 
    height, 
    mime_type, 
    entity_type
) VALUES (
    'producto-1234567890.jpg',
    'frasco-vidrio.jpg',
    'uploads/productos/producto-1234567890.jpg',
    'https://tudominio.com/uploads/productos/producto-1234567890.jpg',
    245800,
    800,
    600,
    'image/jpeg',
    'producto'
);
*/