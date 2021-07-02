import Post from "../models/Post.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const { page } = req.query;
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await Post.countDocuments({});
    console.log("total man", total, "limit", LIMIT);

    const posts = await Post.find({})
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    res.status(200).json({
      data: posts,
      currentPage: +page,
      numberOfPage: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  
  console.log("this is searched queyr", searchQuery, "And this is tags", tags);
  try {
    const title = new RegExp(searchQuery, "i");
    if (title || tags.length) {
      const posts = await Post.find({
        $or: [{ title }, { tags: { $in: tags.split(",") } }],
      });
      console.log("this is the post", posts);
      res.json({ data: posts });
    }
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
};
export const createPost = async (req, res) => {
  const post = req.body;
  try {
    const newPost = new Post({
      ...post,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });
    await newPost.save();
    console.log(newPost);

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const editPost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with the id");

  try {
    const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true });
    res.json(updatedPost);
  } catch (error) {
    res.status(409);
  }
};
export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with the id");

  try {
    await Post.findByIdAndRemove(id);
    res.json({ id });
  } catch (error) {
    res.status(409);
  }
};
export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  try {
    if (!req.userId)
      return res
        .status(404)
        .json({ message: "Not authorized to like the post" });

    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No post with the id");

    const post = await Post.findById(_id);

    // The string in post.likes are totally different from req.userId string // It cannot find the string
    const index = post.likes.findIndex((id) => id === String(req.userId));
    console.log(index);

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true });
    console.log(updatedPost.likes);
    res.json(updatedPost);
  } catch (error) {
    res.status(409).send("AN ERROR");
  }
};
