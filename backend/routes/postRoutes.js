const express = require("express");
const {
  createPost,
  editPost,
  removePost,
  getAuthPosts,
  getCatPosts,
  getPost,
  getPosts,
} = require("../controllers/postController.js");
const router = express.Router();

router.post("/", createPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/categories/:category", getCatPosts);
router.get("/users/:id", getAuthPosts);
router.patch("/:id", editPost);
router.delete("/:id", removePost);



module.exports = router;
