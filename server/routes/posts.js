import express from "express";
import {
  getPostsBySearch,
  createPost,
  getPosts,
  editPost,
  deletePost,
  likePost,
  getPost
} from "../controllers/postsController.js";
const router = express.Router();

import auth from "../middleware/auth.js";

router.get("/", getPosts);
router.get("/:id", auth, getPost);

router.get("/search", getPostsBySearch)
router.post("/", auth, createPost);
router.patch("/:id", auth, editPost);

router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost); 

export default router;
