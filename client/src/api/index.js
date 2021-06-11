import axios from "axios";

let API;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // dev code
  API = axios.create({ baseURL: "http://localhost:5000" });
} else {
  // production code
  API = axios.create({ baseURL: "https://memories-api-myanmar.herokuapp.com" });
}

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, newPost) => API.patch(`/posts/${id}`, newPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id, post) => API.patch(`/posts/${id}/likePost`, post);

export const signin = (formData) => API.post("/users/signin", formData);
export const signup = (formData) => API.post("/users/signup", formData);
