import "./BlogPostCard.css";

const BlogPostCard = ({ blog, onToggleBlogInfo }) => {
  const handleImageClick = (e) => {
    e.stopPropagation();
    const modalElement = document.getElementById(
      `modal-media-image-${blog.id}`
    );
    const modal = window.UIkit?.modal(modalElement);

    if (modal && !modalElement.classList.contains("uk-open")) {
      modal.show();
    }
  };

  return (
    <>
      <div className="uk-card uk-card-default uk-card-hover blog-container-round blog-card">
        <div className="uk-card-media-top blog-image-wrapper">
          <div
            className="blog-image-container"
            onClick={handleImageClick}
          >
            <img src={blog.imageUrl} alt={blog.title} />
            <div className="blog-image-overlay">
              <span data-uk-icon="icon: eye; ratio: 2.5"></span>
            </div>
          </div>
        </div>

        <div
          className="uk-card-body uk-child-width-1-1"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3 className="uk-card-title uk-flex-row blog-title">{blog.title}</h3>
          <div className="uk-child-width-1-1 uk-margin-small-top">
            <div className="uk-flex uk-flex-middle">
              <img
                src={blog.avatarUrl}
                alt={blog.author}
                className="uk-border-circle"
                width="40"
                height="40"
              />
              <span className="uk-margin-small-left">{blog.user.username}</span>
            </div>
            <button
              className="uk-button blog-button-secondary uk-margin-small-top blog-container-round"
              onClick={onToggleBlogInfo}
            >
              Ver Blog
            </button>
          </div>
        </div>
      </div>

      <div
        id={`modal-media-image-${blog.id}`}
        className="uk-modal uk-flex-top"
        data-uk-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="uk-modal-dialog uk-width-auto uk-margin-auto-vertical blog-modal-dialog-relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="modal-close-golden"
            type="button"
            data-uk-toggle={`target: #modal-media-image-${blog.id}`}
            aria-label="Cerrar"
          />
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="blog-modal-image"
          />
        </div>
      </div>
    </>
  );
};

export default BlogPostCard;
