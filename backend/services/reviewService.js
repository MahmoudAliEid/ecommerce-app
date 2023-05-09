const { productModel } = require("../model/productModel");

class ReviewService {
  async createProductReview(productId, comment, rating, user, name) {
    // Logic to create a new review for the specified product in the database using the productModel
    const review = {
      user,
      name,
      rating: Number(rating),
      comment,
    };

    //check if the current user added a Review before
    const product = await productModel.findById(productId);
    const isReviewed = product.reviews.find(
      (review) => review.user.toString() === user.toString()
    );

    if (isReviewed) {
      //update the review
      product.reviews.array.forEach((review) => {
        if (review.user.toString() === user.toString()) {
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
    return product;
  }

  async getProductReviews(productId) {
    // Logic to fetch all reviews for the specified product from the database using the productModel
    const product = await productModel.findById(productId);
    return product.reviews;
  }

  async deleteReview(productId, reviewId) {
    // Logic to delete a review with the provided ID for the specified product from the database using the productModel
    const product = await productModel.findById(productId);
    const reviews = product.reviews.filter(
      (review) => review._id.toString() !== req.query.reviewId
    );

    const numOfReviews = reviews.length();
    //update the Ratings
    const ratings =
      product.reviews.reduce((acc, review) => review.rating + acc, 0) /
      reviews.length;
    //update the product
    await productModel.findByIdAndUpdate(
      productId,
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
    await product.save();
    // Perform any necessary cleanup or cascading deletion if applicable
  }
}

module.exports = { ReviewService };
