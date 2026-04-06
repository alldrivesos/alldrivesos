import axios from "axios";
import * as ENDPOINT from "../constant";
import { getToken } from "../helpers";

axios.defaults.baseURL = ENDPOINT.BASE_URL;
axios.defaults.headers.common["Authorization"] = getToken();
axios.interceptors.request.use(
  function (config) {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = getToken();
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      return (window.location.href = "/auth/login");
    }
    return Promise.reject(error);
  },
);

export const createBlogCategory = async (payload: any) => {
  return axios
    .post(`${ENDPOINT.CREATE_BLOG_CATEGORY}`, payload)
    .then((response) => response.data);
};

export const getBlogCategory = async () => {
  return axios
    .get(`${ENDPOINT.GET_BLOG_CATEGORY}`)
    .then((response) => response.data);
};

export const getBlogComments = async (payload: any) => {
  return axios
    .get(`${ENDPOINT.GET_BLOG_COMMENTS}/${payload}`)
    .then((response) => response.data);
};

export const createBlogComments = async (payload: any) => {
  return axios
    .post(`${ENDPOINT.CREATE_BLOG_COMMENTS}`, payload)
    .then((response) => response.data);
};

export const editBlogComments = async (id: any, payload: any) => {
  return axios
    .patch(`${ENDPOINT.UPDATE_BLOG_COMMENTS}/${id}`, payload)
    .then((response) => response.data);
};

export const deleteBlogComments = async (payload: string) => {
  return axios
    .delete(`${ENDPOINT.DELETE_BLOG_COMMENTS}/${payload}`)
    .then((response) => response.data);
};

export const editBlogCategory = async (payload: any) => {
  return axios
    .patch(`${ENDPOINT.UPDATE_BLOG_CATEGORY}/${payload.id}`, payload)
    .then((response) => response.data);
};

export const deleteBlogCategory = async (payload: string) => {
  return axios
    .delete(`${ENDPOINT.DELETE_BLOG_CATEGORY}/${payload}`)
    .then((response) => response.data);
};

export const createBlog = async (payload: any) => {
  return axios
    .post(`${ENDPOINT.CREATE_BLOG}`, payload)
    .then((response) => response.data);
};

export const getBlog = async () => {
  return axios.get(`${ENDPOINT.GET_BLOG}`).then((response) => response.data);
};

export const getSingleBlog = async (id: string) => {
  return axios
    .get(`${ENDPOINT.GET_BLOG_SINGLE}/${id}`)
    .then((response) => response.data);
};

export const editBlog = async (payload: any) => {
  return axios
    .patch(`${ENDPOINT.UPDATE_BLOG}/${payload.id}`, payload)
    .then((response) => response.data);
};

export const deleteBlog = async (payload: string) => {
  return axios
    .delete(`${ENDPOINT.DELETE_BLOG}/${payload}`)
    .then((response) => response.data);
};

export const getBlogTags = async () => {
  return axios
    .get(`${ENDPOINT.GET_BLOG_TAGS}`)
    .then((response) => response.data);
};

export const getBlogPosts = async (payload: number, activeId: string) => {
  if (activeId) {
    return axios
      .get(`${ENDPOINT.GET_BLOG_BY_CATEGORY}/${activeId}?page=${payload}`)
      .then((response) => response.data);
  } else {
    return axios
      .get(`${ENDPOINT.GET_BLOGS}?page=${payload}`)
      .then((response) => response.data);
  }
};

export const getSingleBlogPost = async (id: string) => {
  return axios
    .get(`${ENDPOINT.GET_SINGLE_BLOG}/${id}`)
    .then((response) => response.data);
};

export const getPostsByCategory = async (id: string) => {
  return axios
    .get(`${ENDPOINT.GET_BLOG_BY_CATEGORY}/${id}?page=${1}`)
    .then((response) => response.data);
};
