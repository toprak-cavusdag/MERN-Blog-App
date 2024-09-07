const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes.js");
const postRoutes = require("./routes/postRoutes.js");

const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

//Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

connect(process.env.MONGO_URL)
  .then(
    app.listen(process.env.PORT, () => console.log("App running on port 8000"))
  )
  .catch((err) => console.log(err));
