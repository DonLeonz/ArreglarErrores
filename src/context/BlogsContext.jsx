import { createContext, useContext, useEffect, useState } from "react";
import {
  createBlogRequest,
  getAllBlogsRequest,
  deleteBlogRequest,
  updateBlogRequest
} from "../api/requests/blogs.request";
import {
  createCommentRequest,
  getCommentsByBlogRequest,
  deleteCommentRequest,
  getAllCommentsRequest
} from "../api/requests/comments.request";

const BlogContext = createContext();

export const useBlogs = () => {
  const context = useContext(BlogContext);
  if (!context) throw new Error("useBlogs must be used within a BlogsProvider");
  return context;
};

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [modifiedBlogs, setModifiedBlogs] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetchAllBlogs();
    fetchAllComments();
    setModifiedBlogs(false);
    setErrors([]);
  }, [modifiedBlogs]);

  const createBlog = async (blogData) => {
    try {
      const res = await createBlogRequest(blogData);
      if (res.status === 201) {
        setModifiedBlogs(true);
        return true;
      }
    } catch (error) {
      console.log(error);
      setErrors([error.response?.data?.message || "Error al crear el blog"]);
      return false;
    }
  };

  const updateBlog = async (blogId, blogData) => {
    try {
      const res = await updateBlogRequest(blogId, blogData);
      if (res.status === 200 || res.status === 204) {
        setModifiedBlogs(true);
        return true;
      }
    } catch (error) {
      console.log(error);
      setErrors([error.response?.data?.message || "Error al actualizar el blog"]);
      return false;
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      const res = await deleteBlogRequest(blogId);
      if (res.status === 200 || res.status === 204) {
        setModifiedBlogs(true);
        return true;
      }
    } catch (error) {
      console.log(error);
      setErrors([error.response?.data?.message || "Error al eliminar el blog"]);
      return false;
    }
  };

  const fetchAllBlogs = async () => {
    try {
      const res = await getAllBlogsRequest();
      if (res.status === 200 && res.data) {
        setBlogs(res.data);
      }
    } catch (error) {
      console.log(error);
      setErrors([error.response?.data?.message || "Error al cargar blogs"]);
      return false;
    }
  };

  const createComment = async (commentData) => {
    try {
      const res = await createCommentRequest(commentData);
      if (res.status === 201) {
        setModifiedBlogs(true);
        return true;
      }
    } catch (error) {
      console.log(error);
      setErrors([error.response?.data?.message || "Error al crear el comentario"]);
      return false;
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const res = await deleteCommentRequest(commentId);
      if (res.status === 200 || res.status === 204) {
        setModifiedBlogs(true);
        return true;
      }
    } catch (error) {
      console.log(error);
      setErrors([error.response?.data?.message || "Error al eliminar el comentario"]);
      return false;
    }
  };

  const fetchCommentsByBlog = async (blogId) => {
    try {
      const res = await getCommentsByBlogRequest(blogId);
      if (res.status === 200 && res.data) {
        return res.data;
      }
    } catch (error) {
      console.log(error);
      setErrors([error.response?.data?.message || "Error al cargar comentarios"]);
      return [];
    }
  };

  const fetchAllComments = async () => {
    try {
      const res = await getAllCommentsRequest();
      if (res.status === 200 && res.data) {
        setComments(res.data);
      }
    } catch (error) {
      console.log(error);
      setErrors([error.response?.data?.message || "Error al cargar comentarios"]);
      return false;
    }
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        comments,
        errors,
        createBlog,
        updateBlog,
        deleteBlog,
        fetchAllBlogs,
        createComment,
        deleteComment,
        fetchCommentsByBlog,
        fetchAllComments,
        setModifiedBlogs
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
