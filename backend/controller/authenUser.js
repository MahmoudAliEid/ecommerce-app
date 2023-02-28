const { User } = require("../model/user");
const sendingToken = require("../utils/tokenAuth");
const CatchError = require("../middleware/catchAsyncError");
const bcrypt = require("bcryptjs"); // Erase
const ErrorHandler = require("../utils/ErrorHandle");

resigteration = CatchError(async(req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "v1677256964",
            url: "https://res.cloudinary.com/dcn2eoa1u/image/upload/v1677256964/samples/people/boy-snow-hoodie.jpg",
        },
    });
    sendingToken(user, 200, res);
});
login = CatchError(async(req, res, next) => {
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

Update_Password = CatchError(async(req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!isMatch) {
        return next(new ErrorHandler("Old password is incorrect", 404));
    }
    user.password = req.body.password;
    await user.save();
    sendingToken(user, 200, res);
});
Update_profile = CatchError(async(req, res, next) => {
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
    });
});
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
DeleteUserById = CatchError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User Does not found ", 404));
  }
  await user.delete();

  res.status(200).json({
    success: true,
  });
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
};