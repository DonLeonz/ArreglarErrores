-- ========================================
-- BASE DE DATOS SURTIENVASES - ARQUITECTURA RELACIONAL
-- ✅ CORREGIDO: Foreign Keys, sin campos duplicados
-- ========================================
CREATE DATABASE IF NOT EXISTS surtienvases CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_unicode_ci;

USE surtienvases;

-- ========================================
-- TABLA: imagenes (SIMPLIFICADA)
-- ========================================
CREATE TABLE
    IF NOT EXISTS imagenes (
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
        -- Tipo de imagen (para saber dónde se usa)
        entity_type ENUM ('producto', 'noticia', 'categoria', 'otro') DEFAULT 'otro',
        -- Auditoría
        uploaded_by VARCHAR(100) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        -- Índices
        INDEX idx_filename (filename),
        INDEX idx_entity_type (entity_type),
        INDEX idx_created (created_at)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ========================================
-- TABLA: categorias
-- ========================================
CREATE TABLE
    IF NOT EXISTS categorias (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        `key` VARCHAR(50) NOT NULL UNIQUE,
        icon VARCHAR(10) DEFAULT '📦',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ========================================
-- TABLA: industrias
-- ========================================
CREATE TABLE
    IF NOT EXISTS industrias (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        `key` VARCHAR(50) NOT NULL UNIQUE,
        icon VARCHAR(10) DEFAULT '🏭',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ========================================
-- TABLA: productos (SIN CAMPO img, CON FK)
-- ========================================
CREATE TABLE
    IF NOT EXISTS productos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        price VARCHAR(50),
        origin VARCHAR(50),
        material VARCHAR(100),
        category VARCHAR(100),
        industry VARCHAR(100),
        description TEXT,
        -- ✅ FOREIGN KEY hacia imagenes
        imagen_id INT DEFAULT NULL,
        isPopular BOOLEAN DEFAULT FALSE,
        recommendation TEXT,
        minimumOrder VARCHAR(100),
        certification VARCHAR(100),
        stock VARCHAR(50) DEFAULT 'Disponible',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        -- ✅ Relación con imagenes
        FOREIGN KEY (imagen_id) REFERENCES imagenes (id) ON DELETE SET NULL,
        INDEX idx_category (category),
        INDEX idx_industry (industry),
        INDEX idx_popular (isPopular)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ========================================
-- TABLA: especificaciones
-- ========================================
CREATE TABLE
    IF NOT EXISTS especificaciones (
        id INT PRIMARY KEY AUTO_INCREMENT,
        producto_id INT NOT NULL,
        specification TEXT NOT NULL,
        FOREIGN KEY (producto_id) REFERENCES productos (id) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ========================================
-- TABLA: beneficios
-- ========================================
CREATE TABLE
    IF NOT EXISTS beneficios (
        id INT PRIMARY KEY AUTO_INCREMENT,
        producto_id INT NOT NULL,
        benefit TEXT NOT NULL,
        FOREIGN KEY (producto_id) REFERENCES productos (id) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ========================================
-- TABLA: noticias (SIN CAMPO imageUrl, CON FK)
-- ========================================
CREATE TABLE
    IF NOT EXISTS noticias (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(100) DEFAULT 'Usuario Invitado',
        excerpt TEXT NOT NULL,
        -- ✅ FOREIGN KEY hacia imagenes
        imagen_id INT DEFAULT NULL,
        avatarUrl VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        -- ✅ Relación con imagenes
        FOREIGN KEY (imagen_id) REFERENCES imagenes (id) ON DELETE SET NULL,
        INDEX idx_created (created_at)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ========================================
-- TABLA: comentarios
-- ========================================
CREATE TABLE
    IF NOT EXISTS comentarios (
        id INT PRIMARY KEY AUTO_INCREMENT,
        noticia_id INT NOT NULL,
        author VARCHAR(100) DEFAULT 'Usuario Invitado',
        text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (noticia_id) REFERENCES noticias (id) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ========================================
-- DATOS INICIALES: Categorías
-- ========================================
INSERT INTO
    categorias (name, `key`, icon)
VALUES
    ('Envases de Vidrio', 'vidrio', '🫙'),
    ('Envases Plásticos', 'plastico', '🧴'),
    ('Tapas y Complementos', 'tapas', '🔧'),
    ('Envases Cosméticos', 'cosmetico', '💄'),
    ('Envases Farmacéuticos', 'farmaceutico', '💊'),
    ('Envases Industriales', 'industrial', '🏗️');

-- ========================================
-- DATOS INICIALES: Industrias
-- ========================================
INSERT INTO
    industrias (name, `key`, icon)
VALUES
    ('Alimentos', 'alimentos', '🍽️'),
    ('Bebidas', 'bebidas', '🥤'),
    ('Cosmética', 'cosmetica', '💄'),
    ('Farmacéutica', 'farmaceutica', '💊'),
    ('Químicos', 'quimicos', '⚗️'),
    ('Limpieza', 'limpieza', '🧹'),
    ('Industrial', 'industrial', '🏗️');

-- ========================================
-- DATOS INICIALES: Imágenes predeterminadas
-- ========================================
-- Imágenes para noticias (3 imágenes)
INSERT INTO
    imagenes (
        filename,
        original_filename,
        filepath,
        url,
        filesize,
        width,
        height,
        mime_type,
        entity_type
    )
VALUES
    (
        'surtiNoticia_1.jpg',
        'surtiNoticia (1).jpg',
        'assets/img/surtienvases/noticiasPredeterminadas/surtiNoticia (1).jpg',
        'http://surtienvases.local/wp-content/themes/surtienvases-theme/assets/img/surtienvases/noticiasPredeterminadas/surtiNoticia (1).jpg',
        80000,
        1200,
        800,
        'image/jpeg',
        'noticia'
    ),
    (
        'surtiNoticia_2.jpg',
        'surtiNoticia (2).jpg',
        'assets/img/surtienvases/noticiasPredeterminadas/surtiNoticia (2).jpg',
        'http://surtienvases.local/wp-content/themes/surtienvases-theme/assets/img/surtienvases/noticiasPredeterminadas/surtiNoticia (2).jpg',
        85000,
        1200,
        800,
        'image/jpeg',
        'noticia'
    ),
    (
        'surtiNoticia_3.jpg',
        'surtiNoticia (3).jpg',
        'assets/img/surtienvases/noticiasPredeterminadas/surtiNoticia (3).jpg',
        'http://surtienvases.local/wp-content/themes/surtienvases-theme/assets/img/surtienvases/noticiasPredeterminadas/surtiNoticia (3).jpg',
        90000,
        1200,
        800,
        'image/jpeg',
        'noticia'
    );

-- Imágenes para productos (10 imágenes)
INSERT INTO
    imagenes (
        filename,
        original_filename,
        filepath,
        url,
        filesize,
        width,
        height,
        mime_type,
        entity_type
    )
VALUES
    (
        'surtiProducto_1.jpg',
        'surtiProducto (1).jpg',
        'assets/img/surtienvases/productosPredeterminados/surtiProducto (1).jpg',
        'http://surtienvases.local/wp-content/themes/surtienvases-theme/assets/img/surtienvases/productosPredeterminados/surtiProducto (1).jpg',
        60000,
        800,
        800,
        'image/jpeg',
        'producto'
    ),
    (
        'surtiProducto_2.jpg',
        'surtiProducto (2).jpg',
        'assets/img/surtienvases/productosPredeterminados/surtiProducto (2).jpg',
        'http://surtienvases.local/wp-content/themes/surtienvases-theme/assets/img/surtienvases/productosPredeterminados/surtiProducto (2).jpg',
        65000,
        800,
        800,
        'image/jpeg',
        'producto'
    ),
    (
        'surtiProducto_3.jpg',
        'surtiProducto (3).jpg',
        'assets/img/surtienvases/productosPredeterminados/surtiProducto (3).jpg',
        'http://surtienvases.local/wp-content/themes/surtienvases-theme/assets/img/surtienvases/productosPredeterminados/surtiProducto (3).jpg',
        70000,
        800,
        800,
        'image/jpeg',
        'producto'
    ),
    (
        'surtiProducto_4.jpg',
        'surtiProducto (4).jpg',
        'assets/img/surtienvases/productosPredeterminados/surtiProducto (4).jpg',
        'http://surtienvases.local/wp-content/themes/surtienvases-theme/assets/img/surtienvases/productosPredeterminados/surtiProducto (4).jpg',
        55000,
        800,
        800,
        'image/jpeg',
        'producto'
    ),
    (
        'surtiProducto_5.jpg',
        'surtiProducto (5).jpg',
        'assets/img/surtienvases/productosPredeterminados/surtiProducto (5).jpg',
        'http://surtienvases.local/wp-content/themes/surtienvases-theme/assets/img/surtienvases/productosPredeterminados/surtiProducto (5).jpg',
        62000,
        800,
        800,
        'image/jpeg',
        'producto'
    ),
    (
        'surtiProducto_6.jpg',
        'surtiProducto (6).jpg',
        'assets/img/surtienvases/productosPredeterminados/surtiProducto (6).jpg',
        'http://surtienvases.local/wp-content/themes/surtienvases-theme/assets/img/surtienvases/productosPredeterminados/surtiProducto (6).jpg',
        58000,
        800,
        800,
        'image/jpeg',
        'producto'
    ),
    (
        'surtiProducto_7.jpg',
        'surtiProducto (7).jpg',
        'assets/img/surtienvases/productosPredeterminados/surtiProducto (7).jpg',
        'http://surtienvases.local/wp-content/themes/surtienvases-theme/assets/img/surtienvases/productosPredeterminados/surtiProducto (7).jpg',
        67000,
        800,
        800,
        'image/jpeg',
        'producto'
    ),
    (
        'surtiProducto_8.jpg',
        'surtiProducto (8).jpg',
        'assets/img/surtienvases/productosPredeterminados/surtiProducto (8).jpg',
        'http://surtienvases.local/wp-content/themes/surtienvases-theme/assets/img/surtienvases/productosPredeterminados/surtiProducto (8).jpg',
        63000,
        800,
        800,
        'image/jpeg',
        'producto'
    ),
    (
        'surtiProducto_9.jpg',
        'surtiProducto (9).jpg',
        'assets/img/surtienvases/productosPredeterminados/surtiProducto (9).jpg',
        'http://surtienvases.local/wp-content/themes/surtienvases-theme/assets/img/surtienvases/productosPredeterminados/surtiProducto (9).jpg',
        69000,
        800,
        800,
        'image/jpeg',
        'producto'
    ),
    (
        'surtiProducto_10.jpg',
        'surtiProducto (10).jpg',
        'assets/img/surtienvases/productosPredeterminados/surtiProducto (10).jpg',
        'http://surtienvases.local/wp-content/themes/surtienvases-theme/assets/img/surtienvases/productosPredeterminados/surtiProducto (10).jpg',
        64000,
        800,
        800,
        'image/jpeg',
        'producto'
    );

-- ========================================
-- DATOS INICIALES: Noticias (con avatarUrl completo y vinculadas a imágenes)
-- ========================================
INSERT INTO
    noticias (title, author, excerpt, imagen_id, avatarUrl)
VALUES
    (
        'Cómo Reutilizar Envases Plásticos de Forma Segura',
        'Equipo SurtiEnvases',
        'Aprende las mejores prácticas para darle una segunda vida a tus envases plásticos sin comprometer la seguridad alimentaria.',
        1,
        'http://surtienvases.local/wp-content/themes/surtienvases-theme/assets/img/surtienvases/avatars/default.jpg'
    ),
    (
        'Ventajas de los Envases de Vidrio para Alimentos',
        'Usuario Invitado',
        'Descubre por qué el vidrio sigue siendo la mejor opción para conservar alimentos y bebidas manteniendo su calidad.',
        2,
        'http://surtienvases.local/wp-content/themes/surtienvases-theme/assets/img/surtienvases/avatars/default.jpg'
    ),
    (
        'Guía Completa: Elegir el Envase Correcto para tu Producto',
        'Usuario Invitado',
        'Factores clave a considerar al seleccionar envases: material, tamaño, certificaciones y compatibilidad con tu producto.',
        3,
        'http://surtienvases.local/wp-content/themes/surtienvases-theme/assets/img/surtienvases/avatars/default.jpg'
    );

-- ========================================
-- DATOS INICIALES: Productos (10 productos con imágenes)
-- ========================================
INSERT INTO
    productos (
        title,
        price,
        origin,
        material,
        category,
        industry,
        description,
        imagen_id,
        isPopular,
        recommendation,
        minimumOrder,
        certification,
        stock
    )
VALUES
    (
        'Frasco de Vidrio 250ml',
        '$2.500',
        'Nacional',
        'Vidrio Tipo III',
        'Envases de Vidrio',
        'Alimentos',
        'Frasco de vidrio transparente ideal para conservas, mermeladas y salsas.',
        4,
        TRUE,
        'Perfecto para pequeños emprendimientos de conservas artesanales. Incluye tapa twist-off.',
        'Caja x 24 unidades',
        'FDA Approved',
        'Disponible'
    ),
    (
        'Botella PET 500ml',
        '$850',
        'Nacional',
        'PET Cristal',
        'Envases Plásticos',
        'Bebidas',
        'Botella PET transparente con tapa rosca, ideal para jugos y bebidas.',
        5,
        TRUE,
        'La opción más económica para envasar bebidas. Excelente claridad y resistencia.',
        'Paquete x 50 unidades',
        'ISO 9001',
        'Disponible'
    ),
    (
        'Tarro Cosmético 50g',
        '$3.200',
        'Importado',
        'PP Premium',
        'Envases Cosméticos',
        'Cosmética',
        'Tarro de alta calidad con doble pared para cremas y productos cosméticos.',
        6,
        FALSE,
        'Diseño elegante que realza la presentación de productos premium.',
        'Caja x 100 unidades',
        'INVIMA',
        'Disponible'
    ),
    (
        'Galón Industrial 4L',
        '$4.800',
        'Nacional',
        'HDPE Alta Densidad',
        'Envases Industriales',
        'Químicos',
        'Galón resistente para productos químicos y de limpieza industrial.',
        7,
        FALSE,
        'Resistente a químicos, ideal para productos de limpieza y desinfectantes.',
        'Paquete x 25 unidades',
        'UN Approved',
        'Disponible'
    ),
    (
        'Frasco Farmacéutico Ámbar 100ml',
        '$1.800',
        'Importado',
        'Vidrio Ámbar Tipo I',
        'Envases Farmacéuticos',
        'Farmacéutica',
        'Frasco ámbar que protege de la luz UV, ideal para medicamentos.',
        8,
        TRUE,
        'Cumple todas las normas farmacéuticas. Protección UV garantizada.',
        'Caja x 48 unidades',
        'USP Standards',
        'Disponible'
    ),
    (
        'Tapa Twist-Off 63mm',
        '$180',
        'Nacional',
        'Hojalata',
        'Tapas y Complementos',
        'Alimentos',
        'Tapa metálica con botón de seguridad para frascos de conserva.',
        9,
        FALSE,
        'Compatible con todos nuestros frascos de boca 63mm. Sellado al vacío garantizado.',
        'Bolsa x 100 unidades',
        'FDA Approved',
        'Disponible'
    ),
    (
        'Botella Spray 250ml',
        '$2.100',
        'Nacional',
        'PET + Atomizador',
        'Envases Plásticos',
        'Limpieza',
        'Botella con atomizador ajustable para productos de limpieza y jardinería.',
        10,
        TRUE,
        'Atomizador de alta calidad con múltiples configuraciones de spray.',
        'Paquete x 24 unidades',
        'ISO 9001',
        'Disponible'
    ),
    (
        'Frasco Gotero 30ml',
        '$1.500',
        'Importado',
        'Vidrio + Gotero',
        'Envases Farmacéuticos',
        'Farmacéutica',
        'Frasco con gotero de precisión para aceites esenciales y medicamentos.',
        11,
        FALSE,
        'Ideal para aceites esenciales, tinturas y medicamentos líquidos.',
        'Caja x 100 unidades',
        'INVIMA',
        'Disponible'
    ),
    (
        'Contenedor 1000ml Hermético',
        '$3.500',
        'Nacional',
        'PP + Silicona',
        'Envases Plásticos',
        'Alimentos',
        'Contenedor hermético con cierre de seguridad para alimentos.',
        12,
        TRUE,
        'Sistema de cierre hermético con 4 pestañas. Apto para microondas y congelador.',
        'Caja x 36 unidades',
        'FDA Approved',
        'Disponible'
    ),
    (
        'Bolsa Stand-Up 500g',
        '$450',
        'Nacional',
        'Laminado Kraft',
        'Envases Plásticos',
        'Alimentos',
        'Bolsa tipo doypack con zipper y ventana transparente.',
        13,
        TRUE,
        'Perfecta para café, snacks y productos gourmet. Excelente presentación en góndola.',
        'Paquete x 100 unidades',
        'ISO 22000',
        'Por encargo'
    );

-- ========================================
-- ESPECIFICACIONES (10 productos completos)
-- ========================================
INSERT INTO
    especificaciones (producto_id, specification)
VALUES
    -- Producto 1: Frasco de Vidrio 250ml
    (1, 'Capacidad: 250ml'),
    (1, 'Boca: 63mm'),
    (1, 'Altura: 110mm'),
    -- Producto 2: Botella PET 500ml
    (2, 'Capacidad: 500ml'),
    (2, 'Rosca: 28mm'),
    (2, 'Peso: 25g'),
    -- Producto 3: Tarro Cosmético 50g
    (3, 'Capacidad: 50g'),
    (3, 'Diámetro: 65mm'),
    (3, 'Color: Transparente/Negro'),
    -- Producto 4: Galón Industrial 4L
    (4, 'Capacidad: 4 Litros'),
    (4, 'Boca: 38mm'),
    (4, 'Color: Natural/Blanco'),
    -- Producto 5: Frasco Farmacéutico Ámbar 100ml
    (5, 'Capacidad: 100ml'),
    (5, 'Rosca: DIN18'),
    (5, 'Color: Ámbar'),
    -- Producto 6: Tapa Twist-Off 63mm
    (6, 'Diámetro: 63mm'),
    (6, 'Color: Dorado/Plateado'),
    (6, 'Con pasteurización'),
    -- Producto 7: Botella Spray 250ml
    (7, 'Capacidad: 250ml'),
    (7, 'Trigger spray'),
    (7, 'Colores variados'),
    -- Producto 8: Frasco Gotero 30ml
    (8, 'Capacidad: 30ml'),
    (8, 'Pipeta de vidrio'),
    (8, 'Color: Transparente/Ámbar'),
    -- Producto 9: Contenedor 1000ml Hermético
    (9, 'Capacidad: 1000ml'),
    (9, 'Rectangular'),
    (9, 'Apilable'),
    -- Producto 10: Bolsa Stand-Up 500g
    (10, 'Capacidad: 500g'),
    (10, 'Con ventana'),
    (10, 'Válvula opcional');

-- ========================================
-- BENEFICIOS (10 productos completos)
-- ========================================
INSERT INTO
    beneficios (producto_id, benefit)
VALUES
    -- Producto 1: Frasco de Vidrio 250ml
    (1, 'Apto para alimentos'),
    (1, 'Esterilizable'),
    (1, 'Reutilizable'),
    -- Producto 2: Botella PET 500ml
    (2, 'Ligero'),
    (2, 'Irrompible'),
    (2, '100% Reciclable'),
    -- Producto 3: Tarro Cosmético 50g
    (3, 'Doble pared'),
    (3, 'Sellado hermético'),
    (3, 'Diseño premium'),
    -- Producto 4: Galón Industrial 4L
    (4, 'Alta resistencia química'),
    (4, 'Manija ergonómica'),
    (4, 'Graduado'),
    -- Producto 5: Frasco Farmacéutico Ámbar 100ml
    (5, 'Protección UV'),
    (5, 'Grado farmacéutico'),
    (5, 'Hermético'),
    -- Producto 6: Tapa Twist-Off 63mm
    (6, 'Botón de seguridad'),
    (6, 'Recubrimiento interno'),
    (6, 'Reutilizable'),
    -- Producto 7: Botella Spray 250ml
    (7, 'Atomizador ajustable'),
    (7, 'Resistente a químicos'),
    (7, 'Ergonómico'),
    -- Producto 8: Frasco Gotero 30ml
    (8, 'Gotero de precisión'),
    (8, 'Vidrio resistente'),
    (8, 'Tapa de seguridad'),
    -- Producto 9: Contenedor 1000ml Hermético
    (9, 'Hermético 100%'),
    (9, 'Apto microondas'),
    (9, 'Libre de BPA'),
    -- Producto 10: Bolsa Stand-Up 500g
    (10, 'Barrera de oxígeno'),
    (10, 'Zipper resellable'),
    (10, 'Base estable');

-- ========================================
-- FIN DEL SCRIPT
-- ========================================