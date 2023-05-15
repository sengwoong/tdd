const express = require("express");
const mongoose = require("mongoose");
const PORT = 5000;
const bodyParser = require("body-parser");

mongoose.connect(
 process.env.MONGODB_URI 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const app = express();
const productsRoutes = require("../node/routes/routes.js");

// 미들웨어로 등록
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/products", productsRoutes);
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
module.exports = app;
