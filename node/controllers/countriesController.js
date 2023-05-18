const countriesModel = require("../models/countries");

exports.getCountries = async (req, res, next) => {
  try {
    const allCountries = await countriesModel.find({});
    res.status(200).json(allCountries);
  } catch (error) {
    next(error);
  }
};
