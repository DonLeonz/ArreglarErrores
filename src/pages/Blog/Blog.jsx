import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import LoginModal from "../../components/modals/LoginModal/LoginModal";
import BlogForm from "../../components/features/Blog/BlogForm/BlogForm";
import BlogPostCard from "../../components/features/Blog/BlogPostCard/BlogPostCard";
import CommentSection from "../../components/features/Blog/CommentSection/CommentSection";
import avatarDefault from "../../assets/img/avatars/default.jpg";
import blogDefault from "../../assets/img/blog/blogDefault.jpg";
import blogExample1 from "../../assets/img/blog/blog-example1.jpg";
import blogExample2 from "../../assets/img/blog/blog-example2.jpg";
import "./Blog.css";

const Blog = () => {
  const { currentUser, login } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [visibleComments, setVisibleComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [commentsByBlog, setCommentsByBlog] = useState({});
  const [blogsData, setBlogsData] = useState([
    {
      id: 1,
      title: "5 Consejos para Mejorar tu Café Casero",
      author: "Natalia Ruiz",
      imageUrl: blogExample1,
      avatarUrl: avatarDefault,
      excerpt:
        "Descubre técnicas simples pero efectivas para preparar un mejor café en casa.",
    },
    {
      id: 2,
      title: "Guía Básica de Fotografía para Principiantes",
      author: "Kaleth Narváez",
      imageUrl: blogExample2,
      avatarUrl: avatarDefault,
      excerpt:
        "Aprende a sacar el máximo provecho de tu cámara desde el primer día.",
    },
  ]);
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
  const toggleComments = (id) => {
    setVisibleComments((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const handleCommentChange = (id, value) => {
    setCommentInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleCommentSubmit = (id) => {
    if (!currentUser) {
      if (window.UIkit)
        window.UIkit.notification({
          message: "Debes iniciar sesión para comentar.",
          status: "warning",
          pos: "top-center",
        });
      setModalOpen(true);
      return;
    }
    const newComment = { text: commentInputs[id], author: currentUser };
    setCommentsByBlog((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), newComment],
    }));
    setCommentInputs((prev) => ({ ...prev, [id]: "" }));
    if (window.UIkit)
      window.UIkit.notification({
        message: "Comentario publicado.",
        status: "success",
        pos: "top-center",
      });
  };

  const handleBlogSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      if (window.UIkit)
        window.UIkit.notification({
          message: "Debes iniciar sesión para publicar un blog.",
          status: "warning",
          pos: "top-center",
        });
      setModalOpen(true);
      return;
    }
    const blogToAdd = {
      id: Date.now(),
      title: newBlog.title,
      author: currentUser,
      excerpt: newBlog.excerpt,
      imageUrl: newBlog.image || blogDefault,
      avatarUrl: avatarDefault,
    };
    setBlogsData([blogToAdd, ...blogsData]);
    setNewBlog({ title: "", author: "", excerpt: "", image: null });
    if (window.UIkit)
      window.UIkit.notification({
        message: "Blog publicado exitosamente.",
        status: "success",
        pos: "top-center",
      });
  };

  return (
    <div className="uk-section first-child-adjustment uk-dark blog-background">
      <div className="uk-container uk-text-default">
        <BlogForm
          newBlog={newBlog}
          setNewBlog={setNewBlog}
          onSubmit={handleBlogSubmit}
        />
        <div className="uk-child-width-1-2@s" data-uk-grid="masonry: pack">
          {blogsData.map((blog) => (
            <div key={blog.id}>
              <BlogPostCard
                blog={blog}
                onToggleComments={() => toggleComments(blog.id)}
                isCommentsVisible={visibleComments[blog.id] || false}
              >
                <CommentSection
                  currentUser={currentUser}
                  commentInput={commentInputs[blog.id] || ""}
                  onCommentChange={(value) =>
                    handleCommentChange(blog.id, value)
                  }
                  onCommentSubmit={() => handleCommentSubmit(blog.id)}
                  comments={commentsByBlog[blog.id] || []}
                />
              </BlogPostCard>
            </div>
          ))}
        </div>
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
