import axiosInstance from "../axios.instance"

export const createBlogRequest = async (blog) => axiosInstance.post("/blogs/create", blog);

export const getAllBlogsRequest = async () => axiosInstance.get("/blogs/search");

export const getBlogRequest = async (blogId) => axiosInstance.get(`/blogs/${blogId}`);

export const updateBlogRequest = async (blogId, blog) => axiosInstance.put(`/blogs/update/${blogId}`, blog);

export const deleteBlogRequest = async (blogId) => axiosInstance.delete(`/blogs/delete/${blogId}`);
