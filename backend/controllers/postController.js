const Post = require("../models/postModel.js");
const User = require("../models/userModel.js");
const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");
const HttpError = require("../models/errorModel.js");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

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
  try {
    const { id } = req.params;
    const posts = await Post.find({ creator: id }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError(error));
  }
};

//PATCH:api/posts/:id
const editPost = async (req, res, next) => {
  try {
    let updatedPost;

    const postID = req.params.id;
    let { title, category, description } = req.body;

    const post = await Post.findById(postID);
    if (!title || !category || !description) {
      return next(new HttpError("Fill in all fields.", 422));
    }

    if (!req.file) {
      updatedPost = await Post.findByIdAndUpdate(
        postID,
        { title, description, category },
        { new: true }
      );
    } else {
      const oldThumbnail = post.thumbnail;

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

        if (oldThumbnail) {
          const oldThumbnailPath = path.join(
            __dirname,
            "..",
            "uploads",
            oldThumbnail
          );
          fs.unlink(oldThumbnailPath, (unlinkErr) => {
            if (unlinkErr) {
              console.error("Failed to delete old thumbnail:", unlinkErr);
            }
          });
        }

        updatedPost = await Post.findByIdAndUpdate(
          postID,
          { title, category, description, thumbnail: newFileName },
          { new: true }
        );

        res.status(200).json(updatedPost);
      });
    }
  } catch (error) {
    return next(new HttpError(error));
  }
};

//DELETE:api/posts/:id
const removePost = async (req, res, next) => {
  const postID = req.params.id;
  if (!postID) {
    return next(new HttpError("Post unavailable", 400));
  }

  try {
    const post = await Post.findById(postID);
    if (!post) {
      return next(new HttpError("Post not found", 404));
    }

    const oldThumbnail = post.thumbnail;

    if (oldThumbnail) {
      const oldThumbnailPath = path.join(__dirname, "..", "uploads", oldThumbnail);
      // Thumbnail'ı silmek için unlink'i promisify ederek await ile kullanıyoruz
      await unlinkAsync(oldThumbnailPath);
    }

    // Postu silme işlemi
    await Post.findByIdAndDelete(postID);

    // Kullanıcının post sayısını azaltma
    const currentUser = await User.findById(req.user.id);
    if (currentUser) {
      const userPostCount = currentUser.posts - 1;
      await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });
    }

    return res.status(200).json({ message: `Post ${postID} deleted successfully` });
  } catch (err) {
    console.error("Error deleting post or thumbnail:", err);
    return next(new HttpError("Failed to delete post", 500));
  }
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
