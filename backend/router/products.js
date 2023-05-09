const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();
const ProductController = require("../controller/products");
const ReviewController = require("../controller/reviews");

const { auth, Roles } = require("../middleware/auth");

const { ProductService } = require("../services/ProductService"); // Create and configure your product service instance
const { ReviewService } = require("../services/reviewService"); // Create and configure your review service instance
const productService = new ProductService();
const reviewService = new ReviewService();
const productController = new ProductController(productService);
const reviewController = new ReviewController(reviewService);

// Wrap the route handler functions with a try-catch block to handle errors
router.route("/products").get(async (req, res, next) => {
  try {
    await productController.getProducts(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.route("/product/:id").get(async (req, res, next) => {
  try {
    await productController.getSingleProduct(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.route("/product/review").put(auth, async (req, res, next) => {
  try {
    await reviewController.createProductReview(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.route("/product/reviews/:id").get(auth, async (req, res, next) => {
  try {
    await reviewController.getProductReviews(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.route("/product/reviews/delete").delete(auth, async (req, res, next) => {
  try {
    await reviewController.deleteReview(req, res, next);
  } catch (error) {
    next(error);
  }
});

router
  .route("/admin/products/:id")
  .put(auth, Roles("Admin"), async (req, res, next) => {
    try {
      await productController.updateSingleProduct(req, res, next);
    } catch (error) {
      next(error);
    }
  })
  .delete(auth, Roles("Admin"), async (req, res, next) => {
    try {
      await productController.deleteSingleProduct(req, res, next);
    } catch (error) {
      next(error);
    }
  });

router
  .route("/admin/products/new")
  .post(auth, Roles("Admin"), upload.single("img"), async (req, res, next) => {
    try {
      await productController.newProduct(req, res, next);
    } catch (error) {
      next(error);
    }
  });

module.exports = {
  router, // Export the router instead of only the router code
};
