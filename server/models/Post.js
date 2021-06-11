import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  name: String,
  tags: [String], 
  selectedFile: String,

  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String], 
    default: []
  },

});

const Post = mongoose.model("Post", postSchema);
export default Post;
