// Declare the important variables
const mongoose = require("mongoose");
const validators = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

// Declare the Schema of the Mongoose model
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
  images: {
    picture: {
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
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.jwt_expires,
  });
};

//Hashing the password before saving of the User
userSchema.pre("save", async function (next) {
  //user=userSchema
  const user = this;

  //check is there is modify in password
  if (user.isModified("password")) {
    //hashing the password
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

// Here generate password reset token
userSchema.methods.getPasswordResetToken = function () {
  //create the token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //hash the set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // set the expire time for the token
  this.resetPasswordExpires = Date.now() + 30 * 60 * 1000;

  //will send this token to the user when asking the route of forget password
  //and use this to compare by the stored hashToken(resetPasswordToken) in database
  return resetToken;
};
//Export the model
const User = mongoose.model("User", userSchema);
module.exports = { User };
