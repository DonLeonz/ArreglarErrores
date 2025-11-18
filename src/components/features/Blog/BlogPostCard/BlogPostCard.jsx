import ImageModal from "../../../common/ImageModal/ImageModal";
import "./BlogPostCard.css";

const BlogPostCard = ({ blog, onToggleBlogInfo }) => {
  return (
    <div className="uk-card uk-card-default uk-card-hover blog-container-round blog-card">
      <div className="uk-card-media-top blog-image-wrapper">
        <ImageModal
          imageUrl={blog.imageUrl}
          alt={blog.title}
          modalId={`modal-media-image-${blog.id}`}
          containerStyle={{ height: "300px" }}
        />
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
        <div className="uk-child-width-1-1 blog-author-section">
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
  );
};

export default BlogPostCard;
