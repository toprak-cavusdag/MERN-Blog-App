//POST:api/posts
const createPost = async (req, res, next) => {
  res.json("Create Posts");
};

//GET:api/posts
const getPosts = async (req, res, next) => {
  res.json("Get All Posts");
};

//GET:api/posts/:id
const getPost = async (req, res, next) => {
  res.json("Get Single Post");
};

//GET:api/categories/:category
const getCatPosts = async (req, res, next) => {
  res.json("Get post by category");
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
