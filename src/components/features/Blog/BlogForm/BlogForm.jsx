import { useState } from "react";

const BlogForm = ({ newBlog, setNewBlog, onSubmit }) => {
  const [dragOver, setDragOver] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageFile(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageFile(file);
    }
  };

  const handleImageFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      setImagePreview(imageUrl);
      setNewBlog({ ...newBlog, image: imageUrl });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setNewBlog({ ...newBlog, image: null });
    // Reset file input
    const fileInput = document.getElementById("blog-file-input");
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="uk-card uk-card-default uk-card-body blog-container-round blog-form-card blog-form-spacing">
      <h3 className="uk-card-title">Agregar nuevo blog</h3>
      <form onSubmit={onSubmit}>
        <div className="uk-grid-small" data-uk-grid>
          <div className="uk-width-1-2@s">
            <label className="uk-form-label" style={{ color: "#d4a762" }}>
              Título del blog
            </label>
            <input
              className="uk-input blog-login-input"
              type="text"
              placeholder="Título del blog"
              value={newBlog.title}
              onChange={(e) =>
                setNewBlog({ ...newBlog, title: e.target.value })
              }
              required
            />
          </div>
          <div className="uk-width-1-2@s">
            <label className="uk-form-label" style={{ color: "#d4a762" }}>
              Autor
            </label>
            <input
              className="uk-input blog-login-input"
              type="text"
              placeholder="Autor"
              value={newBlog.author}
              onChange={(e) =>
                setNewBlog({ ...newBlog, author: e.target.value })
              }
              required
            />
          </div>
          <div className="uk-width-1-1">
            <label className="uk-form-label" style={{ color: "#d4a762" }}>
              Resumen o introducción
            </label>
            <textarea
              className="uk-textarea blog-login-input"
              rows="3"
              placeholder="Resumen o introducción"
              value={newBlog.excerpt}
              onChange={(e) =>
                setNewBlog({ ...newBlog, excerpt: e.target.value })
              }
              required
            ></textarea>
          </div>

          {/* Modern Image Uploader */}
          <div className="uk-width-1-1">
            <label className="uk-form-label" style={{ color: "#d4a762" }}>
              Imagen del Artículo
            </label>
            <div className="blog-uploader">
              {!imagePreview ? (
                <div
                  className={`blog-upload-zone ${dragOver ? "drag-over" : ""}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() =>
                    document.getElementById("blog-file-input").click()
                  }
                >
                  <div>
                    <span
                      uk-icon="icon: cloud-upload; ratio: 3"
                      className="blog-upload-icon"
                    ></span>
                    <h4 className="blog-upload-title">Subir Imagen</h4>
                    <p className="blog-upload-subtitle">
                      Arrastra y suelta tu imagen aquí
                    </p>
                    <p className="blog-upload-info">o</p>
                    <button
                      type="button"
                      className="uk-button uk-button-secondary blog-button-secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById("blog-file-input").click();
                      }}
                    >
                      Seleccionar Archivo
                    </button>
                    <p className="blog-upload-info uk-margin-small-top">
                      Formatos: JPG, PNG, GIF (máx. 5MB)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="blog-preview-image-container">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="blog-preview-img"
                  />
                  <button
                    type="button"
                    className="blog-preview-remove"
                    onClick={removeImage}
                    aria-label="Eliminar imagen"
                  />
                </div>
              )}
              <input
                id="blog-file-input"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: "none" }}
              />
            </div>
          </div>

          <div className="uk-width-1-1">
            <button
              type="submit"
              className="uk-button blog-button-primary uk-width-1-1"
            >
              <span uk-icon="icon: file-edit"></span> Publicar blog
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
