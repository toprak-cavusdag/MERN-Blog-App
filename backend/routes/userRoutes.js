const express = require("express");
const {
  registerUser,
  changeAvatar,
  editUser,
  getAuthor,
  getUser,
  loginUser,
} = require("../controllers/userController.js");
const authMiddleware = require("../middleware/authMiddleware.js")
const router = express.Router();
const multer = require("multer");
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 1024 * 1024 }, // 1MB sınırı örneği
});


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUser);
router.post("/change-avatar", authMiddleware, upload.single("avatar"), changeAvatar); //avatar name must be the same as the name in the input or it will not accept it!
router.get("/", getAuthor);
router.patch("/edit-user", authMiddleware, editUser);

module.exports = router;
