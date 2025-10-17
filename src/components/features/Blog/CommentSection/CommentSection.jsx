import avatarDefault from "../../../../assets/img/avatars/default.jpg";

const CommentSection = ({
  currentUser,
  commentInput,
  onCommentChange,
  onCommentSubmit,
  comments = [],
}) => {
  return (
    <div className="uk-margin-top">
      <div className="uk-flex uk-flex-middle uk-margin">
        <img
          src={avatarDefault}
          width="40"
          height="40"
          className="uk-border-circle"
          alt="Usuario"
        />
        <span className="uk-margin-left">{currentUser || "Invitado"}</span>
      </div>
      <textarea
        className="uk-textarea uk-placeholder blog-login-input"
        rows="3"
        placeholder="Escribe tu comentario..."
        value={commentInput || ""}
        onChange={(e) => onCommentChange(e.target.value)}
      ></textarea>
      <button
        className="uk-button uk-button-primary uk-margin-top blog-container-round"
        onClick={onCommentSubmit}
      >
        Comentar
      </button>
      {comments.map((comment, index) => (
        <article className="uk-comment uk-margin-top" key={index}>
          <header className="uk-comment-header uk-flex uk-flex-middle">
            <img
              className="uk-comment-avatar uk-border-circle"
              src={avatarDefault}
              width="40"
              height="40"
              alt={comment.author}
            />
            <div className="uk-margin-small-left">
              <h4 className="uk-comment-title uk-margin-remove color-text-black">
                {comment.author}
              </h4>
              <ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                <li>
                  <span className="color-text-black">Hace un momento</span>
                </li>
              </ul>
            </div>
          </header>
          <div className="uk-comment-body">
            <p>{comment.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default CommentSection;
