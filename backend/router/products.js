const express = require("express");
const upload = require("../middleware/multer");
const multer = require("multer");
const path = require("path");
var router = express.Router();
const {
  getProducts,
  newProduct,
  getSingleProducts,
  updateSingleProduct,
  deleteSingleProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controller/products");
const { auth, Roles } = require("../middleware/auth");

router.route("/products").get(getProducts);
router.route("/products/:id").get(getSingleProducts);
router.route("/product/review").put(auth, createProductReview);
router.route("/product/reviews/:id").get(auth, getProductReviews);
router.route("/product/reviews/delete").delete(auth, deleteReview);
router
  .route("/admin/products/:id")
  .put(auth, Roles("Admin"), updateSingleProduct)
  .delete(auth, Roles("Admin"), deleteSingleProduct);
router
  .route("/admin/products/new")
  .post(auth, Roles("Admin"), upload.single("img"), newProduct);

module.exports = router;
