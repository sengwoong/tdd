const mongoose = require("mongoose");

const optionsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const options = mongoose.model("options", optionsSchema);
module.exports = options;
