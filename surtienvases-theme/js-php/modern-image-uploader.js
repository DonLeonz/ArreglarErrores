// ========================================
// MODERN IMAGE UPLOADER - VERSIÓN CORREGIDA
// ========================================

class ModernImageUploader {
  constructor(options = {}) {
    // ✅ CORREGIDO: Obtener URL correcta
    this.uploadUrl = this.getUploadUrl(options.uploadUrl);

    this.entityType = options.entityType || "otro";
    this.entityId = options.entityId || null;
    this.maxFiles = options.maxFiles || 1;
    this.acceptedTypes = options.acceptedTypes || [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    this.autoCompress = options.autoCompress !== false;
    this.compressionQuality = options.compressionQuality || 0.8;
    this.maxWidth = options.maxWidth || 1920;
    this.maxHeight = options.maxHeight || 1920;

    this.onUploadStart = options.onUploadStart || (() => {});
    this.onUploadProgress = options.onUploadProgress || (() => {});
    this.onUploadSuccess = options.onUploadSuccess || (() => {});
    this.onUploadError = options.onUploadError || (() => {});

    this.uploading = false;
    this.uploadedFiles = [];

    console.log("✅ ModernImageUploader inicializado");
    console.log("🔗 Upload URL:", this.uploadUrl);
  }

  // ✅ NUEVO: Método para obtener la URL correcta
  getUploadUrl(customUrl) {
    // 1. Si se pasó una URL personalizada, usarla
    if (customUrl) {
      console.log("📌 Usando URL personalizada:", customUrl);
      return customUrl;
    }

    // 2. Intentar usar la variable de WordPress
    if (
      typeof surtienvases_vars !== "undefined" &&
      surtienvases_vars.upload_url
    ) {
      console.log("📌 Usando URL de WordPress:", surtienvases_vars.upload_url);
      return surtienvases_vars.upload_url;
    }

    // 3. Construir URL usando la ubicación actual (sin parámetros extra)
    const origin = window.location.origin;
    const pathname = window.location.pathname;

    // Detectar si estamos en wp-admin o en frontend
    let basePath = "/wp-content/themes/surtienvases-theme";

    // Si la URL contiene wp-content, extraer la ruta base
    if (pathname.includes("/wp-content/")) {
      const parts = pathname.split("/wp-content/");
      basePath = parts[0] + "/wp-content/themes/surtienvases-theme";
    }

    const fallbackUrl = origin + basePath + "/upload-handler.php";
    console.log("📌 Usando URL fallback:", fallbackUrl);

    return fallbackUrl;
  }

  init(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`❌ Container #${containerId} no encontrado`);
      return;
    }

    container.innerHTML = this.createHTML();
    this.setupEventListeners(container);
    console.log(`✅ Uploader inicializado en #${containerId}`);
  }

  createHTML() {
    return `
      <div class="modern-uploader">
        <div class="upload-zone" id="upload-zone">
          <div class="upload-zone-content">
            <span uk-icon="icon: cloud-upload; ratio: 3" class="upload-icon"></span>
            <h4 class="upload-title">Arrastra una imagen aquí</h4>
            <p class="upload-subtitle">o haz clic para seleccionar</p>
            <p class="upload-info">
              Formatos: JPG, PNG, GIF, WEBP<br>
              ${
                this.autoCompress
                  ? "Auto-compresión activada"
                  : "Sin límite de tamaño"
              }
            </p>
            <button type="button" class="uk-button uk-button-secondary uk-border-rounded" id="select-file-btn">
              <span uk-icon="image"></span> Seleccionar Imagen
            </button>
          </div>
          <input type="file" id="file-input" accept="image/*" style="display: none;">
        </div>

        <div class="upload-preview" id="upload-preview" style="display: none;">
          <div class="preview-image-container">
            <img id="preview-img" src="" alt="Preview" class="preview-img">
            <button type="button" class="preview-remove" id="preview-remove" title="Eliminar">
              <span uk-icon="close"></span>
            </button>
          </div>
          
          <div class="upload-progress" id="upload-progress" style="display: none;">
            <div class="progress-bar">
              <div class="progress-fill" id="progress-fill" style="width: 0%"></div>
            </div>
            <p class="progress-text" id="progress-text">Subiendo... 0%</p>
          </div>
          
          <div class="image-info" id="image-info" style="display: none;">
            <p class="info-item">
              <span uk-icon="icon: image; ratio: 0.8"></span>
              <span id="info-filename">imagen.jpg</span>
            </p>
            <p class="info-item">
              <span uk-icon="icon: expand; ratio: 0.8"></span>
              <span id="info-dimensions">800 x 600 px</span>
            </p>
            <p class="info-item">
              <span uk-icon="icon: database; ratio: 0.8"></span>
              <span id="info-size">245 KB</span>
            </p>
          </div>
        </div>

        <input type="hidden" id="uploaded-image-url" name="image_url">
        <input type="hidden" id="uploaded-image-id" name="image_id">
      </div>
    `;
  }

  setupEventListeners(container) {
    const uploadZone = container.querySelector("#upload-zone");
    const fileInput = container.querySelector("#file-input");
    const selectBtn = container.querySelector("#select-file-btn");
    const removeBtn = container.querySelector("#preview-remove");

    uploadZone.addEventListener("click", (e) => {
      if (e.target.id !== "select-file-btn") return;
      fileInput.click();
    });

    selectBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      fileInput.click();
    });

    uploadZone.addEventListener("dragover", (e) => {
      e.preventDefault();
      uploadZone.classList.add("drag-over");
    });

    uploadZone.addEventListener("dragleave", () => {
      uploadZone.classList.remove("drag-over");
    });

    uploadZone.addEventListener("drop", (e) => {
      e.preventDefault();
      uploadZone.classList.remove("drag-over");

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        this.handleFiles(files, container);
      }
    });

    fileInput.addEventListener("change", (e) => {
      const files = e.target.files;
      if (files.length > 0) {
        this.handleFiles(files, container);
      }
    });

    removeBtn.addEventListener("click", () => {
      this.clearPreview(container);
    });
  }

  async handleFiles(files, container) {
    if (files.length === 0) return;

    const file = files[0];

    if (!this.acceptedTypes.includes(file.type)) {
      this.showError("Tipo de archivo no permitido");
      return;
    }

    console.log("📁 Archivo seleccionado:", file.name);

    try {
      await this.showPreview(file, container);

      let processedFile = file;
      if (this.autoCompress) {
        console.log("🔄 Comprimiendo imagen...");
        processedFile = await this.compressImage(file);
        console.log(
          `✅ Compresión: ${this.formatBytes(file.size)} → ${this.formatBytes(
            processedFile.size
          )}`
        );
      }

      await this.uploadFile(processedFile, container);
    } catch (error) {
      console.error("❌ Error:", error);
      this.showError(error.message);
    }
  }

  showPreview(file, container) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      const uploadZone = container.querySelector("#upload-zone");
      const preview = container.querySelector("#upload-preview");
      const previewImg = container.querySelector("#preview-img");

      reader.onload = (e) => {
        previewImg.src = e.target.result;
        uploadZone.style.display = "none";
        preview.style.display = "block";

        const img = new Image();
        img.onload = () => {
          const infoFilename = container.querySelector("#info-filename");
          const infoDimensions = container.querySelector("#info-dimensions");
          const infoSize = container.querySelector("#info-size");

          if (infoFilename) infoFilename.textContent = file.name;
          if (infoDimensions)
            infoDimensions.textContent = `${img.width} x ${img.height} px`;
          if (infoSize) infoSize.textContent = this.formatBytes(file.size);

          resolve();
        };
        img.src = e.target.result;
      };

      reader.readAsDataURL(file);
    });
  }

  compressImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();

        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          if (width > this.maxWidth || height > this.maxHeight) {
            if (width > height) {
              if (width > this.maxWidth) {
                height *= this.maxWidth / width;
                width = this.maxWidth;
              }
            } else {
              if (height > this.maxHeight) {
                width *= this.maxHeight / height;
                height = this.maxHeight;
              }
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            },
            "image/jpeg",
            this.compressionQuality
          );
        };

        img.onerror = reject;
        img.src = e.target.result;
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async uploadFile(file, container) {
    if (this.uploading) {
      console.warn("⚠️ Ya hay una subida en progreso");
      return;
    }

    this.uploading = true;
    this.onUploadStart(file);

    const progressBar = container.querySelector("#upload-progress");
    const progressFill = container.querySelector("#progress-fill");
    const progressText = container.querySelector("#progress-text");
    const imageInfo = container.querySelector("#image-info");

    progressBar.style.display = "block";
    imageInfo.style.display = "none";

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("entity_type", this.entityType);
      if (this.entityId) {
        formData.append("entity_id", this.entityId);
      }

      console.log("📤 Subiendo a:", this.uploadUrl);
      console.log("📦 Datos:", {
        file: file.name,
        entity_type: this.entityType,
        entity_id: this.entityId,
      });

      const result = await this.uploadWithProgress(formData, (progress) => {
        progressFill.style.width = progress + "%";
        progressText.textContent = `Subiendo... ${progress}%`;
        this.onUploadProgress(progress);
      });

      console.log("✅ Upload exitoso:", result);

      progressBar.style.display = "none";
      imageInfo.style.display = "block";

      const urlInput = container.querySelector("#uploaded-image-url");
      const idInput = container.querySelector("#uploaded-image-id");

      if (urlInput) urlInput.value = result.url;
      if (idInput) idInput.value = result.id;

      const infoFilename = container.querySelector("#info-filename");
      const infoDimensions = container.querySelector("#info-dimensions");
      const infoSize = container.querySelector("#info-size");

      if (infoFilename) infoFilename.textContent = result.filename;
      if (infoDimensions)
        infoDimensions.textContent = `${result.width} x ${result.height} px`;
      if (infoSize) infoSize.textContent = this.formatBytes(result.size);

      this.uploadedFiles.push(result);
      this.onUploadSuccess(result);

      this.showSuccess("Imagen subida exitosamente");
    } catch (error) {
      console.error("❌ Error al subir:", error);
      progressBar.style.display = "none";
      this.onUploadError(error);
      this.showError(error.message || "Error al subir la imagen");
      this.clearPreview(container);
    } finally {
      this.uploading = false;
    }
  }

  uploadWithProgress(formData, onProgress) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100);
          onProgress(progress);
        }
      });

      xhr.addEventListener("load", () => {
        console.log("📥 HTTP Status:", xhr.status);
        console.log("📥 Response:", xhr.responseText.substring(0, 500));

        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            console.log("✅ JSON parseado:", response);

            if (response.success) {
              resolve(response.data);
            } else {
              reject(new Error(response.error || "Error desconocido"));
            }
          } catch (e) {
            console.error("❌ ERROR AL PARSEAR JSON");
            console.error("Response:", xhr.responseText);
            reject(new Error("El servidor no devolvió JSON válido"));
          }
        } else {
          reject(new Error(`Error del servidor: ${xhr.status}`));
        }
      });

      xhr.addEventListener("error", () => {
        reject(new Error("Error de red"));
      });

      xhr.addEventListener("abort", () => {
        reject(new Error("Upload cancelado"));
      });

      // ✅ CORREGIDO: URL limpia, sin parámetros extra
      xhr.open("POST", this.uploadUrl);
      xhr.send(formData);
    });
  }

  clearPreview(container) {
    const uploadZone = container.querySelector("#upload-zone");
    const preview = container.querySelector("#upload-preview");
    const fileInput = container.querySelector("#file-input");
    const urlInput = container.querySelector("#uploaded-image-url");
    const idInput = container.querySelector("#uploaded-image-id");

    uploadZone.style.display = "flex";
    preview.style.display = "none";
    fileInput.value = "";
    if (urlInput) urlInput.value = "";
    if (idInput) idInput.value = "";

    this.uploadedFiles = [];
  }

  formatBytes(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  }

  showSuccess(message) {
    if (typeof UIkit !== "undefined") {
      UIkit.notification({
        message: "✅ " + message,
        status: "success",
        pos: "top-center",
        timeout: 3000,
      });
    }
  }

  showError(message) {
    if (typeof UIkit !== "undefined") {
      UIkit.notification({
        message: "❌ " + message,
        status: "danger",
        pos: "top-center",
        timeout: 4000,
      });
    }
  }

  getUploadedFiles() {
    return this.uploadedFiles;
  }

  getLastUploadedFile() {
    return this.uploadedFiles[this.uploadedFiles.length - 1];
  }

  reset(container) {
    if (container) {
      this.clearPreview(container);
    }
    this.uploadedFiles = [];
  }
}

window.ModernImageUploader = ModernImageUploader;
console.log("✅ ModernImageUploader CORREGIDO cargado");
