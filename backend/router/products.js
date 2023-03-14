const express = require("express");
var router = express.Router();
const {
  getProducts,
  NewProduct,
  getSingleProducts,
  UpdateSingleProduct,
  deleteSingleProduct,
  createProductReview,
} = require("../controller/products");
const { auth, Roles } = require("../middleware/auth");

router.route("/products").get(getProducts);
router.route("/products/:id").get(getSingleProducts);
router.route("/product/review").put(auth, createProductReview);
router
  .route("/admin/products/:id")
  .put(auth, Roles("Admin"), UpdateSingleProduct)
  .delete(auth, Roles("Admin"), deleteSingleProduct);
router.route("/admin/products/new").post(auth, Roles("Admin"), NewProduct);

module.exports = router;
