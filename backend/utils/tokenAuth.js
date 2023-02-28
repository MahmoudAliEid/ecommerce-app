const sendingToken = (user, statusCode, res) => {
  const token = user.getAuthentication();
  const options = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.cookies_expires * 24 * 60 * 60 * 1000
    ),
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};
module.exports = sendingToken;
