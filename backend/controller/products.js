const product_model = require("../model/productModel");
Api_feature = require("../utils/api_feature");
const ErrorHandler = require("../utils/ErrorHandle");
const CatchError = require("../middleware/catchAsyncError");

NewProduct = CatchError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await product_model.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

getProducts = CatchError(async (req, res, next) => {
  // return next(new ErrorHandler("This is Error test", 404));
  const resPage = 8;
  const prodCount = await product_model.countDocuments();
  const api_feature = new Api_feature(product_model.find(), req.query)
    .search()
    .filter()
    .pagination(resPage);
  const products = await api_feature.query;

  res.status(200).json({
    success: true,
    count: products.length,
    prodCount,
    products,
  });
});
getSingleProducts = CatchError(async (req, res, next) => {
  const products = await product_model.findById(req.params.id);
  if (!products) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(201).json({
    success: true,
    products,
  });
});
UpdateSingleProduct = CatchError(async (req, res, next) => {
  let products = await product_model.findById(req.params.id);
  if (!products) {
    return next(new ErrorHandler("Product not found", 404));
  }
  products = await product_model.findByIdAndUpdate(req.params.id, req.body);
  res.status(201).json({
    success: true,
    products,
  });
});
deleteSingleProduct = CatchError(async (req, res, next) => {
  let products = await product_model.findById(req.params.id);
  if (!products) {
    return next(new ErrorHandler("Product not found", 404));
  }
  await products.remove();
  res.status(201).json({
    success: true,
    message: "product is deleted",
  });
});
//create new review
createProductReview = CatchError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  //check if the current user added a Review before
  const product = await product_model.findById(productId);
  const isReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    //update the review
    product.reviews.array.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  //then after update or add new one update the rating
  product.ratings =
    product.reviews.reduce((acc, review) => review.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
//get Product Reviews
getProductReviews = CatchError(async (req, res, next) => {
  const product = await product_model.findById(req.params.id);
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
//Delete a Review of Product
deleteReview = CatchError(async (req, res, next) => {
  const product = await product_model.findById(req.query.productId);
  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.reviewId
  );
  const numOfReviews = reviews.length();
  //update the Ratings
  const ratings =
    product.reviews.reduce((acc, review) => review.rating + acc, 0) /
    reviews.length;

  //update the product
  await product_model.findByIdAndUpdate(
    req.params.id,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

module.exports = {
  getProducts,
  NewProduct,
  getSingleProducts,
  UpdateSingleProduct,
  deleteSingleProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
};
