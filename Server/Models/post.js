const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  username: { type: String },
});

const Post = mongoose.model("post", PostSchema);

module.exports = Post;
