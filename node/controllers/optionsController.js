const optionsModel = require("../models/options");

exports.getOptions = async (req, res, next) => {
  try {
    const allOptions = await optionsModel.find({}); // 모든 옵션 검색
    console.log(allOptions);

    res.status(200).json(allOptions);
  } catch (error) {
    next(error);
  }
};

// const newOption = new optionsModel({
//   name: "Some Name",
//   description: "Some Description",
// });

// await newOption.save(); // 새로운 옵션 문서를 저장
