// ============== Register a new user ==============
// POST: api/users/register

const registerUser = (req, res, next) => {
  res.json("Register User");
};

// ============== Login a registered user ==============
// POST: api/users/login
const loginUser = (req, res, next) => {
  res.json("Login User");
};

// ============== User Profile ==============
// POST: api/users/:id
const getUser = (req, res, next) => {
  res.json("User Profile");
};

// ============== Change User Avatar (Profile Pictures) ==============
// POST: api/users/change-avatar
const changeAvatar = (req, res, next) => {
  res.json("Change Avatar");
};

// ============== Change User Details (Profile Details) ==============
// POST: api/users/edit-user
const editUser = (req, res, next) => {
  res.json("Edit User");
};

// ============== Get Author ==============
// POST: api/users/authors
const getAuthor = (req, res, next) => {
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
