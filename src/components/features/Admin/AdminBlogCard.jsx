const AdminBlogCard = ({ blog, comments, onDeleteBlog, onDeleteComment }) => {
  const blogComments = Array.isArray(comments)
    ? comments.filter((c) => c.blog._id === blog._id)
    : [];

  return (
    <div className="admin-blog-card">
      <h4 className="admin-card-title">{blog.title}</h4>
      <p className="admin-card-info">
        <strong>Autor:</strong> {blog.user.username}
      </p>
      <p className="admin-card-info">
        <strong>Fecha:</strong>{" "}
        {blog.createdAt
          ? new Date(blog.createdAt).toLocaleDateString("es-ES")
          : blog.date || "N/A"}
      </p>
      <p className="admin-blog-excerpt">{blog.content}</p>
      <div className="admin-button-column">
        <button
          className="btn-golden-primary"
          onClick={() => {
            window.UIkit.notification({
              message:
                "Funcionalidad de edición lista para conectar con backend",
              status: "primary",
              pos: "top-center",
            });
          }}
        >
          Editar Blog
        </button>
        <button
          className="admin-delete-btn"
          onClick={() => onDeleteBlog(blog._id || blog.id)}
        >
          Eliminar Blog
        </button>
      </div>

      {blogComments.length > 0 && (
        <div className="admin-comments-section">
          <h5 className="admin-comments-title">
            Comentarios ({blogComments.length})
          </h5>
          {blogComments.map((comment) => (
            <div key={comment._id} className="admin-comment-card">
              <div className="admin-comment-container">
                <p className="admin-comment-info">
                  <strong>{comment.user.username}</strong> -{" "}
                  {comment.createdAt
                    ? new Date(comment.createdAt).toLocaleDateString("es-CO")
                    : "N/A"}
                </p>

                <div className="admin-comment-text uk-padding-left">
                  {comment.content}
                </div>

                <button
                  className="admin-delete-btn admin-delete-btn-small"
                  onClick={() => onDeleteComment(comment._id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBlogCard;
