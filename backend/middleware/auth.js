const CatchError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const { User } = require("../model/user");
const jwt = require("jsonwebtoken");

const auth = CatchError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please Login First", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});

const Roles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler("You Can not access the resource ", 403));
    }
    next();
  };
};

module.exports = { auth, Roles };
