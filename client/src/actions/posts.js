import {
  CREATE,
  DELETE,
  FETCH_POSTS,
  FETCH_BY_SEARCH,
  UPDATE,
  START_LOADING,
  END_LOADING,
  FETCH_POST
} from "../Constants/actionTypes.js";
import * as api from "../api";

//Actions Creators
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);
    console.log(data);
    dispatch({ type: FETCH_POSTS, payload: data });
    dispatch({ type: END_LOADING });

  } catch (error) {
    console.log(error);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    
    const { data } = await api.fetchPost(id);
    console.log(data);
    dispatch({ type: FETCH_POST, payload: data });

    dispatch({ type: END_LOADING });

  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const {
      data: { data },
    } = await api.fetchPostBySearch(searchQuery);
    console.log("this is the searched post", data);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.createPost(post);

     dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.deletePost(id);

    dispatch({ type: DELETE, payload: data.id });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
