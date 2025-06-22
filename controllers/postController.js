const Post = require("../models/Post");

// Create post
exports.createPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const post = await Post.create({
      title,
      body,
      userId: req.user.id,
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Error creating post", error: err.message });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts", error: err.message });
  }
};

// Get single post
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "Error fetching post", error: err.message });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post || post.userId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }
    await post.destroy();
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting post", error: err.message });
  }
};

// Update post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post || post.userId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { title, body } = req.body;
    post.title = title || post.title;
    post.body = body || post.body;
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "Error updating post", error: err.message });
  }
};
