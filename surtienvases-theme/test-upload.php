<?php
/**
 * ========================================
 * TEST Y DEBUG DEL SISTEMA DE UPLOAD
 * Herramienta de diagnóstico
 * ========================================
 * 
 * Acceder en: http://tudominio.com/wp-content/themes/surtienvases-theme/test-upload.php
 */

// Headers
header('Content-Type: text/html; charset=utf-8');

?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Upload System - SurtiEnvases</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 1200px;
            margin: 40px auto;
            padding: 20px;
            background: #f5f5f5;
        }

        .section {
            background: white;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #ee7622;
            border-bottom: 3px solid #b7ce38;
            padding-bottom: 10px;
        }

        h2 {
            color: #904191;
            margin-top: 0;
        }

        .status {
            padding: 10px;
            margin: 10px 0;
            border-radius: 4px;
        }

        .status.ok {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        .status.error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }

        .status.warning {
            background: #fff3cd;
            color: #856404;
            border: 1px solid #ffeaa7;
        }

        code {
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 14px;
        }

        pre {
            background: #2d2d2d;
            color: #f8f8f2;
            padding: 15px;
            border-radius: 4px;
            overflow-x: auto;
        }

        .test-form {
            margin-top: 20px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 4px;
        }

        button {
            background: #ee7622;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }

        button:hover {
            background: #d45a0a;
        }

        .upload-result {
            margin-top: 20px;
            padding: 15px;
            border-radius: 4px;
            display: none;
        }
    </style>
</head>

<body>
    <h1>🔧 Test Sistema de Upload - SurtiEnvases</h1>

    <!-- ========================================
         VERIFICACIÓN DEL SISTEMA
         ======================================== -->
    <div class="section">
        <h2>📋 Verificación del Sistema</h2>

        <?php
        $checks = [];

        // 1. PHP Version
        $phpVersion = phpversion();
        $checks['php'] = version_compare($phpVersion, '7.0', '>=') ? 'ok' : 'error';
        echo "<div class='status {$checks['php']}'>";
        echo "<strong>PHP Version:</strong> {$phpVersion} ";
        echo $checks['php'] == 'ok' ? '✅' : '❌ Requiere PHP 7.0+';
        echo "</div>";

        // 2. GD Library
        $hasGD = extension_loaded('gd');
        $checks['gd'] = $hasGD ? 'ok' : 'error';
        echo "<div class='status {$checks['gd']}'>";
        echo "<strong>GD Library:</strong> ";
        echo $hasGD ? '✅ Habilitado' : '❌ NO habilitado (necesario para thumbnails)';
        echo "</div>";

        // 3. Upload Directory
        $uploadDir = __DIR__ . '/uploads';
        $uploadExists = file_exists($uploadDir);
        $uploadWritable = is_writable($uploadDir);
        $checks['upload_dir'] = ($uploadExists && $uploadWritable) ? 'ok' : 'error';

        echo "<div class='status {$checks['upload_dir']}'>";
        echo "<strong>Directorio /uploads:</strong> ";
        if (!$uploadExists) {
            echo "❌ No existe. Crear con: <code>mkdir " . $uploadDir . "</code>";
        } elseif (!$uploadWritable) {
            echo "❌ No tiene permisos de escritura. Ejecutar: <code>chmod 755 " . $uploadDir . "</code>";
        } else {
            echo "✅ Existe y es escribible";
        }
        echo "</div>";

        // 4. Subdirectorios
        $subdirs = ['productos', 'novedades', 'thumbnails', 'temp'];
        foreach ($subdirs as $subdir) {
            $path = $uploadDir . '/' . $subdir;
            $exists = file_exists($path);
            $writable = is_writable($path);
            $status = ($exists && $writable) ? 'ok' : 'warning';

            echo "<div class='status {$status}'>";
            echo "<strong>/{$subdir}:</strong> ";
            if (!$exists) {
                echo "⚠️ No existe (se creará automáticamente)";
            } elseif (!$writable) {
                echo "❌ Sin permisos. Ejecutar: <code>chmod 755 {$path}</code>";
            } else {
                echo "✅ OK";
            }
            echo "</div>";
        }

        // 5. Database Connection
        try {
            require_once __DIR__ . '/config.php';
            $db = getDB();
            $checks['db'] = 'ok';
            echo "<div class='status ok'>";
            echo "<strong>Base de Datos:</strong> ✅ Conectado";
            echo "</div>";

            // 6. Tabla imagenes
            $stmt = $db->query("SHOW TABLES LIKE 'imagenes'");
            $tableExists = $stmt->rowCount() > 0;
            $checks['table'] = $tableExists ? 'ok' : 'error';

            echo "<div class='status {$checks['table']}'>";
            echo "<strong>Tabla 'imagenes':</strong> ";
            if ($tableExists) {
                $count = $db->query("SELECT COUNT(*) FROM imagenes")->fetchColumn();
                echo "✅ Existe ({$count} imágenes registradas)";
            } else {
                echo "❌ NO existe. Ejecutar: <code>surtienvases-theme/sql/imagenes.sql</code>";
            }
            echo "</div>";

        } catch (Exception $e) {
            $checks['db'] = 'error';
            echo "<div class='status error'>";
            echo "<strong>Base de Datos:</strong> ❌ Error: " . htmlspecialchars($e->getMessage());
            echo "</div>";
        }

        // 7. PHP Upload Settings
        $maxUpload = ini_get('upload_max_filesize');
        $maxPost = ini_get('post_max_size');
        $memoryLimit = ini_get('memory_limit');

        echo "<div class='status ok'>";
        echo "<strong>Configuración PHP:</strong><br>";
        echo "• upload_max_filesize: {$maxUpload}<br>";
        echo "• post_max_size: {$maxPost}<br>";
        echo "• memory_limit: {$memoryLimit}";
        echo "</div>";

        // Resumen
        $allOk = !in_array('error', $checks);
        echo "<div class='status " . ($allOk ? 'ok' : 'warning') . "'>";
        echo "<strong>Estado General:</strong> ";
        echo $allOk ? '✅ Sistema listo para usar' : '⚠️ Hay problemas que corregir';
        echo "</div>";
        ?>
    </div>

    <!-- ========================================
         TEST DE UPLOAD
         ======================================== -->
    <div class="section">
        <h2>🧪 Test de Upload</h2>
        <p>Selecciona una imagen para probar el sistema de subida:</p>

        <div class="test-form">
            <form id="testUploadForm">
                <input type="file" id="testFile" accept="image/*" style="margin-bottom: 10px;">
                <br>
                <select id="entityType" style="padding: 8px; margin-bottom: 10px;">
                    <option value="producto">Producto</option>
                    <option value="noticia">Noticia</option>
                    <option value="otro">Otro</option>
                </select>
                <br>
                <button type="submit">📤 Probar Upload</button>
            </form>

            <div id="uploadProgress" style="display: none; margin-top: 10px;">
                <div style="background: #ddd; height: 20px; border-radius: 10px; overflow: hidden;">
                    <div id="progressBar" style="background: #b7ce38; height: 100%; width: 0%; transition: width 0.3s;">
                    </div>
                </div>
                <p id="progressText" style="margin-top: 5px;">Subiendo... 0%</p>
            </div>

            <div id="uploadResult" class="upload-result"></div>
        </div>
    </div>

    <!-- ========================================
         INFORMACIÓN
         ======================================== -->
    <div class="section">
        <h2>📖 Información del Sistema</h2>

        <h3>URLs Importantes:</h3>
        <ul>
            <li><strong>Upload Handler:</strong>
                <code><?php echo $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . '/wp-content/themes/surtienvases-theme/upload-handler.php?action=upload'; ?></code>
            </li>
            <li><strong>Upload Directory:</strong> <code><?php echo realpath(__DIR__ . '/uploads'); ?></code></li>
            <li><strong>Admin Page:</strong> <code><?php echo home_url('/admin'); ?></code></li>
        </ul>

        <h3>Archivos del Sistema:</h3>
        <pre>surtienvases-theme/
├── upload-handler.php        ✅ Handler principal
├── js-php/
│   └── modern-image-uploader.js  ✅ Frontend uploader
├── sql/
│   └── imagenes.sql          ✅ Script BD
└── uploads/                  📁 Archivos subidos
    ├── productos/
    ├── novedades/
    ├── thumbnails/
    └── temp/</pre>

        <h3>Comandos Útiles:</h3>
        <pre>// Crear directorios
mkdir -p uploads/{productos,novedades,thumbnails,temp}

// Dar permisos
chmod 755 uploads
chmod 755 uploads/*

// Crear tabla
mysql -u root -p surtienvases &lt; sql/imagenes.sql

// Ver imágenes subidas
SELECT * FROM imagenes ORDER BY created_at DESC LIMIT 10;</pre>
    </div>

    <script>
        // Test de upload con JavaScript
        document.getElementById('testUploadForm').addEventListener('submit', async function (e) {
            e.preventDefault();

            const fileInput = document.getElementById('testFile');
            const entityType = document.getElementById('entityType').value;
            const file = fileInput.files[0];

            if (!file) {
                alert('Por favor selecciona un archivo');
                return;
            }

            const formData = new FormData();
            formData.append('file', file);
            formData.append('entity_type', entityType);

            const uploadProgress = document.getElementById('uploadProgress');
            const progressBar = document.getElementById('progressBar');
            const progressText = document.getElementById('progressText');
            const uploadResult = document.getElementById('uploadResult');

            uploadProgress.style.display = 'block';
            uploadResult.style.display = 'none';

            const xhr = new XMLHttpRequest();

            xhr.upload.addEventListener('progress', function (e) {
                if (e.lengthComputable) {
                    const percent = Math.round((e.loaded / e.total) * 100);
                    progressBar.style.width = percent + '%';
                    progressText.textContent = 'Subiendo... ' + percent + '%';
                }
            });

            xhr.addEventListener('load', function () {
                uploadProgress.style.display = 'none';
                uploadResult.style.display = 'block';

                if (xhr.status === 200) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        if (response.success) {
                            uploadResult.className = 'upload-result status ok';
                            uploadResult.innerHTML = `
                                <strong>✅ Upload Exitoso!</strong><br><br>
                                <strong>ID:</strong> ${response.data.id}<br>
                                <strong>Filename:</strong> ${response.data.filename}<br>
                                <strong>URL:</strong> <a href="${response.data.url}" target="_blank">${response.data.url}</a><br>
                                <strong>Size:</strong> ${(response.data.size / 1024).toFixed(2)} KB<br>
                                <strong>Dimensions:</strong> ${response.data.width} x ${response.data.height}px<br>
                                ${response.data.thumbnail ? `<strong>Thumbnail:</strong> <a href="${response.data.thumbnail}" target="_blank">Ver</a><br>` : ''}
                                <br>
                                <img src="${response.data.url}" style="max-width: 300px; border: 2px solid #b7ce38; border-radius: 8px; margin-top: 10px;">
                            `;
                        } else {
                            throw new Error(response.error || 'Error desconocido');
                        }
                    } catch (e) {
                        uploadResult.className = 'upload-result status error';
                        uploadResult.innerHTML = '<strong>❌ Error:</strong> ' + e.message + '<br><br><strong>Respuesta del servidor:</strong><br><pre>' + xhr.responseText + '</pre>';
                    }
                } else {
                    uploadResult.className = 'upload-result status error';
                    uploadResult.innerHTML = '<strong>❌ Error HTTP:</strong> ' + xhr.status + ' ' + xhr.statusText + '<br><br><strong>Respuesta:</strong><br><pre>' + xhr.responseText + '</pre>';
                }
            });

            xhr.addEventListener('error', function () {
                uploadProgress.style.display = 'none';
                uploadResult.style.display = 'block';
                uploadResult.className = 'upload-result status error';
                uploadResult.innerHTML = '<strong>❌ Error de Red:</strong> No se pudo conectar con el servidor';
            });

            xhr.open('POST', '<?php echo $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . '/wp-content/themes/surtienvases-theme/upload-handler.php?action=upload'; ?>');
            xhr.send(formData);
        });
    </script>
</body>

</html>