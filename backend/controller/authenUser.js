const User = require("../model/user");

resigteration = async (req, res, next) => {
  const {name, email, password} = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "v1677256964",
      url: "https://res.cloudinary.com/dcn2eoa1u/image/upload/v1677256964/samples/people/boy-snow-hoodie.jpg",
    },
  });
  const token = user.getAuthentication();
  res.status(200).json({
    success: true,
    token,
  });
};
login = async (req, res, next) => {
  // const {email, password} = req.body;
  await User.findByCredentials(req, res, next);
};

module.exports = {resigteration, login};