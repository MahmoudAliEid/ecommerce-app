const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
    maxLength: [100, "product name cannot exceed 100 character"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    trim: true,
    maxLength: [5, "product price cannot exceed 5 character"],
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
    img: "",
    preview: "",
  },

  category: {
    type: String,
    required: [true, "Please select product category"],
    enum: {
      values: [
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
      ],
      message: "Please select correct category for product",
    },
  },
  seller: {
    type: String,
    required: [true, "Please enter product seller"],
  },
  stock: {
    type: Number,
    require: [true, "Please enter product stock"],
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
      Comment: {
        type: String,
        required: [true, "Please enter product comment"],
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Export the model
module.exports = mongoose.model("Product", ProductSchema);
