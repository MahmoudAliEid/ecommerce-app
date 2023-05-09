const { User } = require("../model/user");
const sendingToken = require("../utils/tokenAuth");
const CatchError = require("../middleware/catchAsyncError");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const ErrorHandler = require("../utils/errorHandler");
const { sendEmail } = require("../utils/sendEmail");
const upload = require("../middleware/multer");
const path = require("path");
//this function for Resigtration
resigteration = CatchError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const picture = path.relative(process.cwd(), req.file.path);
  const user = await User.create({
    name,
    email,
    password,
    images: {
      picture,
    },
  });
  sendingToken(user, 200, res);
});

login = CatchError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Unable to login", 404));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new ErrorHandler("Unable to login", 404));
  }
  sendingToken(user, 200, res);
});

Update_Password = CatchError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
  if (!isMatch) {
    return next(new ErrorHandler("Old password is incorrect", 404));
  }
  user.password = req.body.newPassword;
  await user.save({ runValidators: false, useFindAndModify: false });
  sendingToken(user, 200, res);
});

Update_profile = CatchError(async (req, res, next) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
  };
  await User.findByIdAndUpdate(req.user.id, newUser, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Your Profile has been updated successfully!",
  });
});
//for Admin
Update_User = CatchError(async (req, res, next) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.user.id, newUser, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "The User has been updated successfully!",
  });
});

logout = CatchError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(201).json({
    success: true,
    message: "Logged out ",
  });
});

getUserProfile = CatchError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});
//for Admin
getAllUsers = CatchError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

getUserById = CatchError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User Does not found ", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});
//for Admin
DeleteUserById = CatchError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User Does not found ", 404));
  }
  await user.delete();

  res.status(200).json({
    success: true,
    massagge: "The User has been deleted successfully!",
  });
});
//forget Password controller
forgetPassword = CatchError(async (req, res, next) => {
  try {
    //get the user
    const email = req.body.email;
    const user = await User.findOne({ email });

    //check if this user exist in the Database
    if (!user) {
      return next(new ErrorHandler("This Email isn't exist !!", 404));
    }

    //Here get the reset Token
    const resetToken = user.getPasswordResetToken();

    //then save the user into database after add the token
    user.save({ validateBeforeSave: false });

    //then create reset password url
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetToken}`;

    //create the message that will sent to the user
    const message = `Your Password reset Token is as following:\n\n${resetUrl}\n\n
    If you didn't request this Email, just ignore it. `;

    //send email
    await sendEmail({
      email: user.email,
      subject: "ShopIT Password Recovery",
      message,
    });

    //send the response
    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    //Handle Errors
    return next(error);
  }
});

//forget Password controller
resetPassword = CatchError(async (req, res, next) => {
  try {
    //hash the token to compare it with anthor one in Databse
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    //get the User form Database
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    //check
    if (!user) {
      return new ErrorHandler(
        "The Token isn't valid or it has been expired!",
        400
      );
    }
    //then after check if user is exist then compare the password and confiremPassword
    if (req.body.password != req.body.confiremPassword) {
      return next(new ErrorHandler("Confirem Password doesn't match!", 400));
    } else {
      //setup new password
      user.password = req.body.password;
      //set the token to undefined after reset
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      //then save the user
      await user.save();
      sendingToken(user, 200, res);
    }
  } catch (error) {
    return next(new ErrorHandler(error, 403));
  }
});

module.exports = {
  resigteration,
  login,
  logout,
  getUserProfile,
  Update_Password,
  Update_profile,
  getAllUsers,
  getUserById,
  Update_User,
  DeleteUserById,
  forgetPassword,
  resetPassword,
};
