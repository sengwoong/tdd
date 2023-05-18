const express = require("express");
const mongoose = require("mongoose");
const PORT = 4000;
const cors = require("cors");

require("dotenv").config();

mongoose.connect((mongooes = process.env.mongooes), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
console.log("mongooes", process.env.mongooes);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// use middleware to serve static images
app.use(express.static("public"));

const productsRoutes = require("../node/routes/routes.js");

// 미들웨어로 등록
app.use(express.json());

app.use(productsRoutes);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

app.listen(PORT);
console.log(`Server running on port ${PORT}`);
module.exports = app;
