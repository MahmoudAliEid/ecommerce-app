const express = require("express");
var router = express.Router();
const {
  getProducts,
  NewProduct,
  getSingleProducts,
  UpdateSingleProduct,
  deleteSingleProduct,
} = require("../controller/products");

router.route("/products").get(getProducts);
router.route("/products/:id").get(getSingleProducts);
router
  .route("/admin/products/:id")
  .put(UpdateSingleProduct)
  .delete(deleteSingleProduct);
router.route("/admin/products/new").post(NewProduct);

module.exports = router;