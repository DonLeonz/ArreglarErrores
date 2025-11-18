import avatarDefault from "../../../assets/img/avatars/default.jpg";
import { useBlogs } from "../../../context/BlogsContext";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "../../../schemas/comment.schema";
import { useAuth } from "../../../context/AuthContext";
import "../modals.css";
import "./BlogSection.css";
import { timeAgo } from "../../../assets/scripts/timeAgo";
import blogDefault from "../../../assets/img/blog/blogDefault.jpg";

const BlogSection = ({ isOpen, blog, onClose }) => {
  const { user, isAuth, roles } = useAuth();
  const {
    comments,
    createComment,
    searchComments,
    modifiedBlogs,
    setModifiedBlogs,
  } = useBlogs();

  const [showScrollTop, setShowScrollTop] = useState(false);
  const modalContentRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(commentSchema),
  });

  useEffect(() => {
    reset({
      content: "",
      enabled: true,
    });
  }, [reset]);

  useEffect(() => {
    searchComments({
      blogId: blog._id,
    });
    setModifiedBlogs(false);
  }, [modifiedBlogs]);

  const handleCommentSubmit = async (data) => {
    try {
      const commentData = {
        content: data.content,
        userId: user._id,
        blogId: blog._id,
      };

      const success = await createComment(commentData);
      if (success) {
        reset();
        if (window.UIkit)
          window.UIkit.notification({
            message: "Comentario publicado exitosamente.",
            status: "success",
            pos: "top-center",
          });
      }
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
    }
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (modalContentRef.current) {
        setShowScrollTop(modalContentRef.current.scrollTop > 300);
      }
    };

    const modalContent = modalContentRef.current;
    if (modalContent) {
      modalContent.addEventListener("scroll", handleScroll);
      return () => modalContent.removeEventListener("scroll", handleScroll);
    }
  }, [isOpen]);

  const scrollToTop = () => {
    if (modalContentRef.current) {
      modalContentRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleClose = () => onClose();

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  return (
    <div
      className={`uk-modal-container uk-modal login-modal-display ${
        isOpen ? "uk-open visible" : "hidden"
      }`}
      onClick={handleBackdropClick}
      uk-modal="true"
    >
      <div
        className="uk-modal-dialog uk-modal-body uk-light coffee-modal-body blog-modal-enhanced"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-golden"
          type="button"
          onClick={handleClose}
        ></button>

        {showScrollTop && (
          <button
            className="blog-scroll-top-btn"
            onClick={scrollToTop}
            aria-label="Volver arriba"
          >
            <span data-uk-icon="icon: chevron-up; ratio: 1.5"></span>
          </button>
        )}

        <div className="modal-scrollable" ref={modalContentRef}>
          <div className="blog-modal-content">
            <div className="blog-modal-header">
              <h2 className="blog-modal-title">
                {blog.title}
              </h2>
              <div className="blog-modal-meta">
                <div className="blog-modal-author">
                  <span data-uk-icon="icon: user; ratio: 0.9"></span>
                  <span>{blog.user.username}</span>
                </div>
                <div className="blog-modal-date">
                  <span data-uk-icon="icon: clock; ratio: 0.9"></span>
                  <span>{timeAgo(blog.updatedAt)}</span>
                </div>
              </div>
            </div>

            <div className="blog-modal-image">
              <img
                src={blog.image ? blog.image.source : blogDefault}
                alt={blog.title}
              />
            </div>

            <div className="blog-modal-text">
              <p>{blog.content}</p>
            </div>

            <div className="blog-modal-divider"></div>
            <div className="blog-comments-section">
              <h3 className="blog-comments-title">
                <span data-uk-icon="icon: comments; ratio: 1.2"></span>
                Comentarios ({comments?.length || 0})
              </h3>
            {isAuth && roles.includes("CUSTOMER") && (
              <form onSubmit={handleSubmit(handleCommentSubmit)}>
                <div className="uk-flex uk-flex-middle">
                  <img
                    src={avatarDefault}
                    width="40"
                    height="40"
                    className="uk-border-circle"
                    alt="Usuario"
                  />
                  <span className="uk-comment-title uk-margin-left blog-user-text">
                    {user.username || "Invitado"}
                  </span>
                </div>
                <textarea
                  className="uk-textarea uk-margin-top blog-login-input"
                  rows="3"
                  {...register("content")}
                  placeholder="Escribe tu comentario..."
                ></textarea>
                {errors.content && (
                  <p className="uk-text-danger">{errors.content.message}</p>
                )}
                <button
                  className="uk-button uk-button-primary blog-button-comment uk-margin-top"
                  type="submit"
                >
                  <span data-uk-icon="icon: comment"></span>
                  Comentar
                </button>
              </form>
            )}
            {Array.isArray(comments) && comments.length > 0 ? (
              <>
                {comments.map((comment, index) => (
                  <article className="uk-comment uk-margin-top" key={index}>
                    <header className="uk-comment-header uk-margin-remove uk-flex uk-flex-middle">
                      <img
                        className="uk-comment-avatar uk-border-circle"
                        src={avatarDefault}
                        width="40"
                        height="40"
                        alt={comment.user.username}
                      />
                      <div className="uk-margin-small-left">
                        <h4 className="uk-comment-title uk-margin-remove">
                          {comment.user.username}
                        </h4>
                        <ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                          <li>
                            <span className="uk-text-capitalize">
                              {timeAgo(comment.updatedAt)}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </header>
                    <div className="uk-comment-body uk-margin-medium-left">
                      <p className="uk-margin-small-left">{comment.content}</p>
                    </div>
                  </article>
                ))}
              </>
            ) : (
              <div className="blog-no-comments">
                <span data-uk-icon="icon: commenting; ratio: 2"></span>
                <p>No hay comentarios aún</p>
                <p className="blog-no-comments-subtitle">¡Sé el primero en comentar!</p>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
