import {
  CREATE,
  DELETE,
  FETCH_BY_SEARCH,
  FETCH_POSTS,
  UPDATE,
} from "../Constants/actionTypes.js";

const postReducer = (posts = [], action) => {
  switch (action.type) {
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
    case CREATE:
      return [...posts, action.payload];
    case UPDATE:
      return posts.map((post) => {
        return post._id === action.payload._id ? action.payload : post;
      });
    case DELETE:
      return posts.filter((post) => {
        return post._id !== action.payload;
      });

    default:
      return posts;
  }
};
export default postReducer;
