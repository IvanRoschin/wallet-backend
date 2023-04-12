const jwt = require("jsonwebtoken");
const { User } = require("../../models");
require("dotenv").config();

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;
// , FRONTEND_URL

const googleAuth = async (req, res) => {
  const { _id: id } = req.user;
  const payload = {
    id,
  };
  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
    expiresIn: "1d",
  });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    // const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
    //   expiresIn: "2m",
    // });
    // const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });
  await User.findByIdAndUpdate(id, {
    accessToken,
    refreshToken,
  });
  res
    .redirect
    // `https://IvanRoschin.github.io/petly-frontend?accessToken=${accessToken}&refreshToken=${refreshToken}`
    ();
};

module.exports = googleAuth;
