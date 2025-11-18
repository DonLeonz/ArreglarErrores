import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useBlogs } from "../../context/BlogsContext";
import BlogForm from "../../components/features/Blog/BlogForm/BlogForm";
import BlogPostCard from "../../components/features/Blog/BlogPostCard/BlogPostCard";
import BlogSection from "../../components/modals/BlogSection/BlogSection";
import { showNotification } from "../../utils/notifications";
import avatarDefault from "../../assets/img/avatars/default.jpg";
import blogDefault from "../../assets/img/blog/blogDefault.jpg";
import "./Blog.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchema } from "../../schemas/blog.schema";

const Blog = () => {
  const { user, isAuth } = useAuth();
  const {
    blogs,
    errors: serverErrors,
    setErrors: setServerErrors,
    createBlog,
  } = useBlogs();

  const [newImage, setNewImage] = useState({
    source: null,
  });

  const [showBlogSection, setShowBlogSection] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleOpenInfoBlog = (blog) => {
    setSelectedBlog(blog);
    setShowBlogSection(true);
    const offcanvas = document.getElementById("burger-menu");
    if (offcanvas && window.UIkit) window.UIkit.offcanvas(offcanvas).hide();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(blogSchema),
  });

  useEffect(() => {
    reset({
      title: "",
      content: "",
      enabled: true,
    });
  }, [reset]);

  useEffect(() => {
    if (serverErrors && serverErrors.length > 0) {
      serverErrors.forEach((error) => {
        showNotification({
          message: "Error en el Servidor: " + error,
          status: "danger",
        });
      });
      setServerErrors([]);
    }
  }, [serverErrors, setServerErrors]);

  const handleBlogSubmit = async (data) => {
    try {
      const parsedData = {
        title: data.title,
        content: data.content,
        userId: user._id,
      };

      if (newImage.source) {
        parsedData.image = {
          source: newImage.source,
        };
      }

      const success = await createBlog(parsedData);
      if (success) {
        reset();
        setNewImage({ source: null });
        showNotification({
          message: "Blog publicado exitosamente.",
          status: "success",
        });
      }
    } catch (error) {
      console.error("Error al validar los datos del blog:", error);
    }
  };

  return (
    <div className="uk-section first-child-adjustment uk-dark blog-background">
      <div className="uk-container uk-text-default">
        {Array.isArray(blogs) && blogs.length > 0 ? (
          <div
            className="uk-child-width-1-2@s uk-grid-match uk-margin-top"
            uk-grid="true"
            data-uk-grid="masonry: pack"
            data-uk-scrollspy="cls: uk-animation-scale-up; target: > div; delay: 200; repeat: true"
          >
            {blogs.map((blog) => (
              <div key={blog._id}>
                <BlogPostCard
                  blog={{
                    ...blog,
                    id: blog._id,
                    imageUrl: blog.image ? blog.image.source : blogDefault,
                    avatarUrl: avatarDefault,
                  }}
                  onToggleBlogInfo={() => handleOpenInfoBlog(blog)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="uk-text-center uk-margin-large-top uk-margin-large-bottom">
            <div className="blog-empty-state">
              <div className="blog-empty-icon">
                <span data-uk-icon="icon: file-text; ratio: 3.5"></span>
              </div>
              <h3 className="blog-empty-title">No hay blogs para mostrar</h3>
              <p className="blog-empty-message">
                {isAuth
                  ? "¡Sé el primero en publicar un blog!"
                  : "Inicia sesión para ser el primero en publicar"}
              </p>
            </div>
          </div>
        )}

        <div className="blog-form-wrapper">
          {isAuth ? (
            <BlogForm
              newImage={newImage}
              setNewImage={setNewImage}
              errors={errors}
              register={register}
              onSubmit={handleSubmit(handleBlogSubmit)}
            />
          ) : (
            <div className="blog-login-message">
              <p>Inicia sesión para publicar tu propio blog</p>
            </div>
          )}
        </div>
      </div>
      {selectedBlog && (
        <BlogSection
          blog={selectedBlog}
          isOpen={showBlogSection}
          onClose={() => {
            setSelectedBlog(null);
            setShowBlogSection(false);
          }}
        />
      )}
    </div>
  );
};

export default Blog;
