const CatchError = require("../middleware/catchAsyncError");
class ReviewController {
  constructor(reviewService) {
    this.reviewService = reviewService;
  }

  createProductReview = CatchError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const user = req.user._id;
    const name = req.user.name;
    // const reviewData = req.body.reviewData;
    const newReview = await this.reviewService.createProductReview(
      productId,
      comment,
      rating,
      user,
      name
    );
    res.status(201).json({ success: true, newReview });
  });

  getProductReviews = CatchError(async (req, res, next) => {
    const productId = req.params.id;
    const reviews = await this.reviewService.getProductReviews(productId);
    res.status(200).json({ success: true, reviews });
  });

  deleteReview = CatchError(async (req, res, next) => {
    const productId = req.query.id;
    const reviewId = req.query.reviewId;
    await this.reviewService.deleteReview(productId, reviewId);
    res.sendStatus(204).json("The Review has been deleted!");
  });
}

module.exports = ReviewController;
