const bcrypt = require("bcryptjs");
const HttpError = require("../models/errorModel.js");
const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

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
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new HttpError("Fill the all fields", 422));
    }

    const newEmail = email.toLowerCase();
    const user = await User.findOne({ email: newEmail });
    if (!user) {
      return next(new HttpError("Invalid credentials", 422));
    }

    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      return next(
        new HttpError("Your password or email address is incorrect", 422)
      );
    }

    const { _id: id, name } = user;

    const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    res.status(200).json({ token, id, name });
  } catch (error) {
    return next(
      new HttpError("Login failed. Please check your credentials.", 422)
    );
  }
};

// ============== User Profile ==============
// POST: api/users/:id
const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return next(new HttpError("User not found", 422));
    }
    res.status(200).json(user);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ============== Change User Avatar (Profile Pictures) ==============
// POST: api/users/change-avatar
const changeAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new HttpError("Please choose an image", 422));
    }

    const user = await User.findById(req.user.id);

    // Delete old avatar if exists
    if (user.avatar) {
      const oldFilePath = path.join(__dirname, "..", "uploads", user.avatar);
      fs.access(oldFilePath, fs.constants.F_OK, (err) => {
        if (err) {
          console.log(`File ${oldFilePath} does not exist.`);
          // Proceed without error if the file does not exist
        } else {
          fs.unlink(oldFilePath, (err) => {
            if (err) {
              return next(new HttpError(err));
            }
          });
        }
      });
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

      const updatedAvatar = await User.findByIdAndUpdate(
        req.user.id,
        { avatar: newFileName },
        { new: true }
      );

      if (!updatedAvatar) {
        return next(new HttpError("Avatar couldn't be changed.", 422));
      }

      res.status(200).json(updatedAvatar);
    });
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ============== Change User Details (Profile Details) ==============
// POST: api/users/edit-user
const editUser = async (req, res, next) => {
  try {
    const { name, email, currentPassword, newPassword, confirmNewPassword } =
      req.body;

    if (!name || !email || !currentPassword || !newPassword) {
      return next(new HttpError("Fill in all fields", 422));
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new HttpError("User not found.", 403));
    }

    //make sure new email doesn't already exist
    const emailExists = await User.findOne({ email });
    if (emailExists && emailExists._id != req.user.id) {
      return next(new HttpError("Email already exist.", 422));
    }
    //compare current password to db password
    const validateUserPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );

    //compare new password

    if (newPassword !== confirmNewPassword) {
      return next(new HttpError("New password  do not match", 422));
    }

    if (!validateUserPassword) {
      return next(new HttpError("Invalid current password", 422));
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const Hash = await bcrypt.hash(newPassword, salt);

    // update user infor in database
    const newInfo = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, password: Hash },
      { new: true }
    );

    res.status(200).json(newInfo);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ============== Get Author ==============
// POST: api/users/authors
const getAuthor = async (req, res, next) => {
  try {
    const authors = await User.find({}).select("-password");
    res.status(200).json(authors);
  } catch (error) {
    return next(new HttpError(error));
  }
};

module.exports = {
  registerUser,
  changeAvatar,
  editUser,
  getAuthor,
  getUser,
  loginUser,
};
