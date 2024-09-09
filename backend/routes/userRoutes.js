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
router.get("/:id", getUser);
router.post("/change-avatar", changeAvatar);
router.get("/", getAuthor);
router.patch("/edit-user", editUser);

module.exports = router;
