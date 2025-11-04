import axiosInstance from "../axios.instance"

export const createCommentRequest = async (comment) => axiosInstance.post("/comments/create", comment);

export const getAllCommentsRequest = async () => axiosInstance.get("/comments/search");

export const getCommentsByBlogRequest = async (blogId) => axiosInstance.get(`/comments/blog/${blogId}`);

export const updateCommentRequest = async (commentId, comment) => axiosInstance.put(`/comments/update/${commentId}`, comment);

export const deleteCommentRequest = async (commentId) => axiosInstance.delete(`/comments/delete/${commentId}`);
