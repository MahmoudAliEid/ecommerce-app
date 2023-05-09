//Interface Segregation Principle (ISP):
// Since you're using Mongoose, which provides an ORM-like interface,
// you don't need to worry much about this principle.
//Mongoose handles the interface implementation,
// and your code can depend on the Mongoose API directly.
const mongoose = require("mongoose");
//Created a separate  constant to store the valid category values. This improves extensibility as you can easily modify or add new categories without modifying the schema directly
//Single Responsibility Principle (SRP)
const productCategoryEnum = [
  "Electronics",
  "Cameras",
  "Laptop",
  "Accessories",
  "HeadPhones",
  "Phones",
  "Books",
  "Clothes/Shoes",
  "Beauty/Health",
  "Sports",
  "Outdoor",
  "Home",
];

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
      trim: true,
      maxLength: [100, "Product name cannot exceed 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      trim: true,
      maxLength: [5, "Product price cannot exceed 5 characters"],
      default: 0.0,
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: {
      img: String,
      preview: String,
    },
    category: {
      type: String,
      required: [true, "Please select product category"],
      enum: {
        values: productCategoryEnum,
        message: "Please select a correct category for the product",
      },
    },
    seller: {
      type: String,
      required: [true, "Please enter product seller"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter product stock"],
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [
      {
        name: {
          type: String,
          required: [true, "Please enter product author"],
        },
        rating: {
          type: Number,
          default: 0,
          min: 0,
          max: 5,
          required: [true, "Please enter product ratings"],
        },
        comment: {
          type: String,
          required: [true, "Please enter product comment"],
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  //Added the toJSON and toObject options to the schema to include virtual properties
  //when converting a document to JSON or an object.
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const productModel = mongoose.model("Product", productSchema);

module.exports = {
  productModel,
  productCategoryEnum,
};
