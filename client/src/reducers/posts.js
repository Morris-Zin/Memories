import {
  CREATE,
  DELETE,
  FETCH_BY_SEARCH,
  FETCH_POSTS,
  UPDATE,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
} from "../Constants/actionTypes.js";

const postReducer = (posts = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...posts, isLoading: true };
    case END_LOADING:
      return { ...posts, isLoading: false };

    case FETCH_POSTS:
      return {
        ...posts,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPage: action.payload.numberOfPage,
      };
    case FETCH_BY_SEARCH:
      return {
        ...posts,
        posts: action.payload,
      };

    case FETCH_POST:
      return {
        ...posts,
        post: action.payload,
      };

    case CREATE:
      return { ...posts, posts: [...posts.posts, action.payload] };
    case UPDATE:
      return {
        ...posts,
        posts: posts.posts.map((post) => {
          return post._id === action.payload._id ? action.payload : post;
        }),
      };
    case DELETE:
      return {
        ...posts,
        posts: posts.posts.filter((post) => {
          return post._id !== action.payload;
        }),
      };

    default:
      return posts;
  }
};
export default postReducer;
