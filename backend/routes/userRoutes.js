const express = require("express");
const {
  registerUser,
  changeAvatar,
  editUser,
  getAuthor,
  getUser,
  loginUser,
} = require("../controllers/userController.js");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/:id", getUser);
router.post("/change-avatar", changeAvatar);
router.post("/", getAuthor);
router.post("/edit-user", editUser);

module.exports = router;
