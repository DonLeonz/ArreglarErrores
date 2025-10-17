const BlogForm = ({ newBlog, setNewBlog, onSubmit }) => {
  return (
    <div className="uk-card uk-card-default uk-card-body uk-margin-bottom blog-container-round color-text-black blog-form-spacing">
      <h3 className="uk-card-title">Agregar nuevo blog</h3>
      <div className="uk-grid-small" data-uk-grid>
        <div className="uk-width-1-2@s">
          <input
            className="uk-input"
            type="text"
            placeholder="Título del blog"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            required
          />
        </div>
        <div className="uk-width-1-2@s">
          <input
            className="uk-input"
            type="text"
            placeholder="Autor"
            value={newBlog.author}
            onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
            required
          />
        </div>
        <div className="uk-width-1-1">
          <textarea
            className="uk-textarea"
            rows="3"
            placeholder="Resumen o introducción"
            value={newBlog.excerpt}
            onChange={(e) =>
              setNewBlog({ ...newBlog, excerpt: e.target.value })
            }
            required
          ></textarea>
        </div>
        <div className="uk-width-1-1">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setNewBlog({
                  ...newBlog,
                  image: URL.createObjectURL(e.target.files[0]),
                });
              }
            }}
          />
        </div>
        <div className="uk-width-1-1">
          <button
            type="button"
            className="uk-button uk-button-secondary blog-container-round"
            onClick={onSubmit}
          >
            Publicar blog
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
