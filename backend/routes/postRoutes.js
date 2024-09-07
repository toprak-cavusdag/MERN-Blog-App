const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("This is the post route");
});

module.exports = router;
