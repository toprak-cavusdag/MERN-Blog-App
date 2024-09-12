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
const authMiddleware = require("../middleware/authMiddleware.js");
const router = express.Router();
const multer = require("multer");
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 1024 * 1024 * 2 }, // 2MB sınırı
});


router.post("/", authMiddleware,upload.single("thumbnail")  , createPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/categories/:category", getCatPosts);
router.get("/users/:id", getAuthPosts);
router.patch("/:id", authMiddleware, editPost);
router.delete("/:id", authMiddleware, removePost);

module.exports = router;
