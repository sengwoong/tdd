const express = require("express");
const mongoose = require("mongoose");
const PORT = 5000;
const bodyParser = require("body-parser");
require("dotenv").config();

mongoose.connect(process.env.mongoose, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const productsRoutes = require("../node/routes/routes.js");

// 미들웨어로 등록
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/products", productsRoutes);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
module.exports = app;
