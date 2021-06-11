import { CREATE, DELETE, FETCH_POSTS, UPDATE } from "../Constants/actionTypes.js";
import * as api from "../api";

//Actions Creators
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_POSTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    return  dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id , post) => async (dispatch) => {
  try {
    const {  data } = await api.updatePost(id,post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    const {  data } = await api.deletePost(id);

    dispatch({ type: DELETE, payload: data.id });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id , post) => async (dispatch) => {
  try {
    const {  data } = await api.likePost(id, post);
    dispatch({ type: UPDATE, payload: data });
    
  } catch (error) {
    console.log(error.message);
  }
};