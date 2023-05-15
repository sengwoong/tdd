const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController.js");

router.post("/", productsController.createProduct);
router.get("/", productsController.getProducts);
router.get("/:productId", productsController.getProductById);
router.put("/:productId", productsController.updateProduct);
router.delete("/:productId", productsController.deleteProduct);

module.exports = router;
