const express = require("express");
var router = express.Router();
const {getProducts, NewProduct} = require("../controller/products");

router.route("/products").get(getProducts);
router.route("/products/:id").get(getSingleProducts);
router.route("/products/new").post(NewProduct);

module.exports = router;
