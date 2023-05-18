const mongoose = require("mongoose");

const countriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },

  imagePath: {
    type: String,
  },
});

const countries = mongoose.model("countries", countriesSchema);
module.exports = countries;
