-- ========================================
-- BASE DE DATOS SURTIENVASES
-- Estructura completa para migración
-- ========================================
CREATE DATABASE IF NOT EXISTS surtienvases CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_unicode_ci;

USE surtienvases;

-- ========================================
-- TABLA: categorias
-- ========================================
CREATE TABLE
    categorias (
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
    industrias (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        `key` VARCHAR(50) NOT NULL UNIQUE,
        icon VARCHAR(10) DEFAULT '🏭',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ========================================
-- TABLA: productos
-- ========================================
CREATE TABLE
    productos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        price VARCHAR(50),
        origin VARCHAR(50),
        material VARCHAR(100),
        category VARCHAR(100),
        industry VARCHAR(100),
        description TEXT,
        img VARCHAR(500),
        isPopular BOOLEAN DEFAULT FALSE,
        recommendation TEXT,
        minimumOrder VARCHAR(100),
        certification VARCHAR(100),
        stock VARCHAR(50) DEFAULT 'Disponible',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ========================================
-- TABLA: especificaciones (relación 1:N con productos)
-- ========================================
CREATE TABLE
    especificaciones (
        id INT PRIMARY KEY AUTO_INCREMENT,
        producto_id INT NOT NULL,
        specification TEXT NOT NULL,
        FOREIGN KEY (producto_id) REFERENCES productos (id) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ========================================
-- TABLA: beneficios (relación 1:N con productos)
-- ========================================
CREATE TABLE
    beneficios (
        id INT PRIMARY KEY AUTO_INCREMENT,
        producto_id INT NOT NULL,
        benefit TEXT NOT NULL,
        FOREIGN KEY (producto_id) REFERENCES productos (id) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ========================================
-- TABLA: noticias
-- ========================================
CREATE TABLE
    noticias (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(100) DEFAULT 'Usuario Invitado',
        excerpt TEXT NOT NULL,
        imageUrl VARCHAR(500),
        avatarUrl VARCHAR(500) DEFAULT 'assets/img/surtienvases/avatars/default.jpg',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- ========================================
-- TABLA: comentarios (relación 1:N con noticias)
-- ========================================
CREATE TABLE
    comentarios (
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
-- DATOS INICIALES: Productos
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
        img,
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
        'assets/img/productos/frasco-vidrio-250.jpg',
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
        'assets/img/productos/botella-pet-500.jpg',
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
        'assets/img/productos/tarro-cosmetico-50.jpg',
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
        'assets/img/productos/galon-industrial-4l.jpg',
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
        'assets/img/productos/frasco-ambar-100.jpg',
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
        'assets/img/productos/tapa-twist-63.jpg',
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
        'Envases con Dispensador',
        'Limpieza',
        'Botella con atomizador ajustable para productos de limpieza y jardinería.',
        'assets/img/productos/botella-spray-250.jpg',
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
        'Envases Especializados',
        'Farmacéutica',
        'Frasco con gotero de precisión para aceites esenciales y medicamentos.',
        'assets/img/productos/frasco-gotero-30.jpg',
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
        'Contenedores',
        'Alimentos',
        'Contenedor hermético con cierre de seguridad para alimentos.',
        'assets/img/productos/contenedor-1000.jpg',
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
        'Empaques Flexibles',
        'Alimentos',
        'Bolsa tipo doypack con zipper y ventana transparente.',
        'assets/img/productos/bolsa-standup-500.jpg',
        TRUE,
        'Perfecta para café, snacks y productos gourmet. Excelente presentación en góndola.',
        'Paquete x 100 unidades',
        'ISO 22000',
        'Por encargo'
    );

-- Especificaciones y beneficios para todos los productos (se continúa en siguiente comentario...)