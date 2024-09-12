const Post = require("../models/postModel.js");
const User = require("../models/userModel.js");
const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");
const HttpError = require("../models/errorModel.js");

//POST:api/posts
const createPost = async (req, res, next) => {
  try {
    const { title, category, description } = req.body;

    if (!title || !category || !description) {
      return next(
        new HttpError("Fill in all fields and choose thumbnail", 422)
      );
    }
    const thumbnail = req.file;

    //check file size

    if (thumbnail.size > 2000000) {
      return next(
        new HttpError("Thumbnail too big. File should be less than 2mb")
      );
    }

    // Get the file extension from the original filename
    const fileExt = path.extname(req.file.originalname); // Get file extension
    const newFileName = uuid() + fileExt; // Create new filename with unique id and extension

    // Move file to the desired location
    const oldPath = path.join(__dirname, "..", "uploads", req.file.filename);
    const newPath = path.join(__dirname, "..", "uploads", newFileName);

    fs.rename(oldPath, newPath, async (err) => {
      if (err) {
        return next(new HttpError(err));
      }

      const newPost = await Post.create({
        title,
        category,
        description,
        thumbnail: newFileName,
        creator: req.user.id,
      });

      const currentUser = await User.findById(req.user.id);
      const userPostCount = currentUser.posts + 1;
      await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });

      if (!newPost) {
        return next(new HttpError("Post couldn't be created.", 422));
      }

      res.status(200).json(newPost);
    });
  } catch (error) {
    return next(new HttpError(error));
  }
};

//GET:api/posts
const getPosts = async (req, res, next) => {
  try {
    const post = await Post.find({}).sort({ updateAt: -1 });
    res.status(200).json(post);
  } catch (error) {
    return next(new HttpError(error));
  }
};

//GET:api/posts/:id
const getPost = async (req, res, next) => {
  try {
    const postID = await req.params.id;
    const post = await Post.findById(postID);

    if (!post) {
      return next(new HttpError("Post not found", 404));
    }
    res.status(200).json(post);
  } catch (error) {
    return next(new HttpError(error));
  }
};

//GET:api/categories/:category
const getCatPosts = async (req, res, next) => {
  const category = req.params;
  const catPost = await Post.find(category).sort({ createdAt: -1 });
  res.status(200).json(catPost);
};

//GET:api/posts/users/:id
const getAuthPosts = async (req, res, next) => {
  res.json("Get post by Author");
};

//PATCH:api/posts/:id
const editPost = async (req, res, next) => {
  res.json("Edit the post");
};

//DELETE:api/posts/:id
const removePost = async (req, res, next) => {
  res.json("remove the post");
};

module.exports = {
  createPost,
  editPost,
  removePost,
  getAuthPosts,
  getCatPosts,
  getPost,
  getPosts,
};
