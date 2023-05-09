const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error ";
  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    //Wrong Mongoose O ec ID Error
    if (err.name === "CastError") {
      const message = `Resource not found Invalid access to Resource :${err.path}`;
      error = new ErrorHandler(message, 400);
    }
    //Handling Mongoose key Errors
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    }

    // Handling Mongoose Validation Error
    if (err.name == "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      const error = new ErrorHandler(message, 400);
    }
    //Handling wrong JWT error
    if (err.name == "JsonWebTokenError") {
      const message = `JSON Web Token is invalid please try agian..!!`;
      const error = new ErrorHandler(message, 400);
    }
    //Handling Expired JWT error
    if (err.name == "TokenExpiredError") {
      const message = `JSON Web Token is expired please try agian..!!`;
      const error = new ErrorHandler(message, 400);
    }

    error.message = err.message;
    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
