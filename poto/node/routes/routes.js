const express = require("express");
const router = express.Router();

const optionsController = require("../controllers/optionsController.js");
const countriesController = require("../controllers/countriesController.js");
const orderMenuController = require("../controllers/orderMenuController.js");

router.get("/products", countriesController.getCountries);
router.get("/options", optionsController.getOptions);
router.get("/order", orderMenuController.getOrderMenus);
router.post("/order", orderMenuController.orderMenuCreate);
router.delete("/order/:productId", orderMenuController.deleteOrderMenuForId);

module.exports = router;
