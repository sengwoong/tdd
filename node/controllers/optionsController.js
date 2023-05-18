const optionsModel = require("../models/options");

exports.getOptions = async (req, res, next) => {
  try {
    const allOptions = await optionsModel.find({});
    res.status(200).json(allOptions);
  } catch (error) {
    next(error);
  }
};
