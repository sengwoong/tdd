const mongoose = require("mongoose");

const orderMenuSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  orderNumber: {
    type: Number,
    required: true,
  },
});

const orderMenus = mongoose.model("orderMenus", orderMenuSchema);
module.exports = orderMenus;
