const product_model = require("../model/productModel");
Api_feature = require("../utils/api_feature");
const ErrorHandler = require("../utils/ErrorHandle");
const CatchError = require("../middleware/catchAsyncError");
const upload = require("../middleware/multer");
const path = require("path");
newProduct = CatchError(async (req, res, next) => {
  req.body.user = req.user.id;
  try {
    const {
      name,
      price,
      description,
      ratings,
      category,
      seller,
      stock,
      numOfReviews,
      user,
      reviews,
    } = req.body;
    const img = path.relative(process.cwd(), req.file.path);

    const product = new product_model({
      name,
      price,
      description,
      ratings,
      images: {
        img,
        preview: req.file.filename,
      },
      category,
      seller,
      stock,
      numOfReviews,
      user,
      reviews,
    });

    await product.save();

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
});
getProducts = CatchError(async (req, res, next) => {
  // return next(new ErrorHandler("This is Error test", 404));
  const resPerPage = 4;
  const prodCount = await product_model.countDocuments();
  const api_feature = new Api_feature(product_model.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  const products = await api_feature.query;

  res.status(200).json({
    success: true,
    count: products.length,
    prodCount,
    products,
    resPerPage,
  });
});
getSingleProduct = CatchError(async (req, res, next) => {
  const product = await product_model.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(201).json({
    success: true,
    product,
  });
});

updateSingleProduct = CatchError(async (req, res, next) => {
  let product = await product_model.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Pass the Multer middleware to handle the file upload
  upload.array("img", 12)(req, res, async function (err) {
    if (err) {
      return next(err);
    }

    // Update the product with the new data
    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;
    product.img = req.files;

    await product.save();

    res.status(200).json({
      success: true,
      product,
    });
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
  newProduct,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
};
