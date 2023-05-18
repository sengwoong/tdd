const orderMenuModel = require("../models/orderMenu");

exports.getOrderMenus = async (req, res, next) => {
  try {
    const allOptions = await orderMenuModel.find({});
    //console.log(allOptions);
    res.status(200).json(allOptions);
  } catch (error) {
    next(error);
  }
};

exports.orderMenuCreate = async (req, res, next) => {
  try {
    const orderNumber = Math.floor(Math.random() * 1000000);
    const order = { price: req.body.totals.total, orderNumber };

    const createdOrderMenu = await orderMenuModel.create(order);

    res.status(201).json(createdOrderMenu);
  } catch (error) {
    next(error);
  }
};

exports.deleteOrderMenuForId = async (req, res, next) => {
  try {
    let deletedOrderMenu = await orderMenuModel.findByIdAndDelete(
      req.params.productId
    );
    if (deletedOrderMenu) {
      res.status(200).json(deletedOrderMenu);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};
