const bcrypt = require("bcryptjs");
const HttpError = require("../models/errorModel.js");
const User = require("../models/userModel.js");

// ============== Register a new user ==============
// POST: api/users/register

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, password2 } = req.body;

    const newEmail = email.toLowerCase();

    const emailExists = await User.findOne({ email: newEmail }); //if database has same email, this code will return true

    if (emailExists) {
      return next(new HttpError("Email Already exists.", 422));
    }

    if (!name || !email || !password) {
      return next(new HttpError("Fill in all fields", 422));
    }

    if (password.trim().length < 6) {
      // trim deletes all space etc.
      return next(
        new HttpError("Password should be at least 6 characters.", 422)
      );
    }

    if (password != password2) {
      return next(new HttpError("Password do not match", 422));
    }

    const salt = await bcrypt.genSalt(10); // Create random thing for the hash
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json(`New user ${newUser.email} registered.`);
  } catch (error) {
    return next(new HttpError("User registration failed.", 422));
  }
};

// ============== Login a registered user ==============
// POST: api/users/login
const loginUser = async (req, res, next) => {
  res.json("Login User");
};

// ============== User Profile ==============
// POST: api/users/:id
const getUser = async (req, res, next) => {
  res.json("User Profile");
};

// ============== Change User Avatar (Profile Pictures) ==============
// POST: api/users/change-avatar
const changeAvatar = async (req, res, next) => {
  res.json("Change Avatar");
};

// ============== Change User Details (Profile Details) ==============
// POST: api/users/edit-user
const editUser = async (req, res, next) => {
  res.json("Edit User");
};

// ============== Get Author ==============
// POST: api/users/authors
const getAuthor = async (req, res, next) => {
  res.json("Authors");
};

module.exports = {
  registerUser,
  changeAvatar,
  editUser,
  getAuthor,
  getUser,
  loginUser,
};