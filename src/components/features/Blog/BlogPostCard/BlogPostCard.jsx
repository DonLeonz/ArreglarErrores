import "./BlogPostCard.css";

const BlogPostCard = ({
  blog,
  onToggleComments,
  isCommentsVisible,
  children,
}) => {
  const handleImageClick = () => {
    const modal = window.UIkit?.modal(
      document.getElementById(`modal-media-image-${blog.id}`)
    );
    if (modal) modal.show();
  };

  // FIX: Usar data-uk-toggle para cerrar el modal correctamente
  return (
    <div className="uk-card uk-card-default uk-card-hover blog-container-round blog-card">
      {/* Imagen clickeable */}
      <div
        className="uk-card-media-top blog-image-container"
        onClick={handleImageClick}
        style={{ cursor: "pointer" }}
      >
        <img src={blog.imageUrl} alt={blog.title} />
      </div>

      {/* Modal con botón de cerrar funcional */}
      <div
        id={`modal-media-image-${blog.id}`}
        className="uk-modal uk-flex-top"
        data-uk-modal="true"
      >
        <div
          className="uk-modal-dialog uk-width-auto uk-margin-auto-vertical"
          style={{ position: "relative" }}
        >
          {/* FIX: Botón cerrar con data-uk-toggle en lugar de onClick */}
          <button
            className="blog-image-modal-close"
            type="button"
            data-uk-toggle={`target: #modal-media-image-${blog.id}`}
            aria-label="Cerrar"
          />
          <img
            src={blog.imageUrl}
            alt={blog.title}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              borderRadius: "12px",
              display: "block",
            }}
          />
        </div>
      </div>

      <div className="uk-card-body">
        <h3 className="uk-card-title">{blog.title}</h3>
        <p>{blog.excerpt}</p>
        <div className="uk-flex uk-flex-middle uk-margin-small-top">
          <img
            src={blog.avatarUrl}
            alt={blog.author}
            className="uk-border-circle"
            width="40"
            height="40"
          />
          <span className="uk-margin-small-left">{blog.author}</span>
        </div>
        <button
          className="uk-button blog-button-secondary uk-margin-small-top blog-container-round"
          onClick={onToggleComments}
        >
          {isCommentsVisible ? "Cerrar comentarios" : "Ver comentarios"}
        </button>
        {isCommentsVisible && children}
      </div>
    </div>
  );
};

export default BlogPostCard;
