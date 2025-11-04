import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useBlogs } from "../../context/BlogsContext";
import LoginModal from "../../components/modals/CreationModals/LoginModal";
import BlogForm from "../../components/features/Blog/BlogForm/BlogForm";
import BlogPostCard from "../../components/features/Blog/BlogPostCard/BlogPostCard";
import CommentSection from "../../components/features/Blog/CommentSection/CommentSection";
import avatarDefault from "../../assets/img/avatars/default.jpg";
import blogDefault from "../../assets/img/blog/blogDefault.jpg";
import "./Blog.css";

const Blog = () => {
  const { currentUser, login, isAuth, user } = useAuth();
  const { blogs, createBlog, createComment, fetchCommentsByBlog } = useBlogs();
  const [modalOpen, setModalOpen] = useState(false);
  const [visibleComments, setVisibleComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [commentsByBlog, setCommentsByBlog] = useState({});
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    excerpt: "",
    image: null,
  });

  const handleLogin = (username) => {
    login(username);
    setModalOpen(false);
  };

  const toggleComments = async (blogId) => {
    const isVisible = !visibleComments[blogId];
    setVisibleComments((prev) => ({ ...prev, [blogId]: isVisible }));

    if (isVisible && !commentsByBlog[blogId]) {
      const comments = await fetchCommentsByBlog(blogId);
      if (comments) {
        setCommentsByBlog((prev) => ({ ...prev, [blogId]: comments }));
      }
    }
  };

  const handleCommentChange = (id, value) => {
    setCommentInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleCommentSubmit = async (blogId) => {
    if (!isAuth) {
      if (window.UIkit)
        window.UIkit.notification({
          message: "Debes iniciar sesión para comentar.",
          status: "warning",
          pos: "top-center",
        });
      setModalOpen(true);
      return;
    }

    const commentData = {
      text: commentInputs[blogId],
      author: user?.username || currentUser || "Usuario",
      blogId: blogId
    };

    const success = await createComment(commentData);
    if (success) {
      const updatedComments = await fetchCommentsByBlog(blogId);
      setCommentsByBlog((prev) => ({ ...prev, [blogId]: updatedComments }));
      setCommentInputs((prev) => ({ ...prev, [blogId]: "" }));
      if (window.UIkit)
        window.UIkit.notification({
          message: "Comentario publicado.",
          status: "success",
          pos: "top-center",
        });
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    if (!isAuth) {
      if (window.UIkit)
        window.UIkit.notification({
          message: "Debes iniciar sesión para publicar un blog.",
          status: "warning",
          pos: "top-center",
        });
      setModalOpen(true);
      return;
    }

    const blogData = {
      title: newBlog.title,
      author: user?.username || currentUser || "Usuario",
      excerpt: newBlog.excerpt,
      imageUrl: newBlog.image || blogDefault,
    };

    const success = await createBlog(blogData);
    if (success) {
      setNewBlog({ title: "", author: "", excerpt: "", image: null });
      if (window.UIkit)
        window.UIkit.notification({
          message: "Blog publicado exitosamente.",
          status: "success",
          pos: "top-center",
        });
    }
  };

  return (
    <div className="uk-section first-child-adjustment uk-dark blog-background">
      <div className="uk-container uk-text-default">
        <div className="blog-form-wrapper">
          {isAuth ? (
            <BlogForm
              newBlog={newBlog}
              setNewBlog={setNewBlog}
              onSubmit={handleBlogSubmit}
            />
          ) : (
            <div className="blog-login-message">
              <p>
                Inicia sesión para publicar tu propio blog
              </p>
            </div>
          )}
        </div>

        {Array.isArray(blogs) && blogs.length > 0 ? (
          <div className="uk-child-width-1-2@s" data-uk-grid="masonry: pack" data-uk-scrollspy="cls: uk-animation-scale-up; target: > div; delay: 200; repeat: true">
            {blogs.map((blog) => (
              <div key={blog._id || blog.id}>
                <BlogPostCard
                  blog={{
                    ...blog,
                    id: blog._id || blog.id,
                    imageUrl: blog.imageUrl || blog.image || blogDefault,
                    avatarUrl: avatarDefault
                  }}
                  onToggleComments={() => toggleComments(blog._id || blog.id)}
                  isCommentsVisible={visibleComments[blog._id || blog.id] || false}
                >
                  <CommentSection
                    currentUser={user?.username || currentUser}
                    commentInput={commentInputs[blog._id || blog.id] || ""}
                    onCommentChange={(value) =>
                      handleCommentChange(blog._id || blog.id, value)
                    }
                    onCommentSubmit={() => handleCommentSubmit(blog._id || blog.id)}
                    comments={commentsByBlog[blog._id || blog.id] || []}
                  />
                </BlogPostCard>
              </div>
            ))}
          </div>
        ) : (
          <div className="uk-text-center uk-margin-large-top uk-margin-large-bottom">
            <div className="blog-empty-state">
              <div className="blog-empty-icon">
                <span data-uk-icon="icon: file-text; ratio: 3.5"></span>
              </div>
              <h3 className="blog-empty-title">
                No hay blogs para mostrar
              </h3>
              <p className="blog-empty-message">
                {isAuth
                  ? "¡Sé el primero en publicar un blog!"
                  : "Inicia sesión para ser el primero en publicar"}
              </p>
            </div>
          </div>
        )}
      </div>
      <LoginModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Blog;
