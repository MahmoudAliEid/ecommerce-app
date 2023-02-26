const mongoose = require("mongoose"); // Erase if already required
const validators = require("validator");
const jwt = require("jsonwebtoken"); // Erase if already required
const bcrypt = require("bcryptjs"); // Erase
const ErrorHandler = require("../utils/ErrorHandle");
const CatchError = require("../middleware/catchAsyncError");

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validators.isEmail(value)) {
        throw new Error("Email is not valid");
      }
    },
  },

  password: {
    type: String,
    required: true,
    minlength: [6, "Your password must be longer than 6 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});
userSchema.methods.getAuthentication = function () {
  return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.jwt_expires,
  });
};

const findByCredentials = async function (req, res, next) {
  const {email, password} = req.body;
  const user = await User.findOne({email: email}).select("+password");
  if (!user) {
    return next(new ErrorHandler("Unable to login", 404));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new ErrorHandler("Unable to login", 404));
  }
  const token = user.getAuthentication();
  res.status(200).json({
    success: true,
    token,
  });
};
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
//Export the model
const User = mongoose.model("User", userSchema);
module.exports = {User, findByCredentials};