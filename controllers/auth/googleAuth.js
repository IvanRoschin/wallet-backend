const jwt = require("jsonwebtoken");
const { User } = require("../../models");
require("dotenv").config();

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY, FRONTEND_URL } = process.env;

const googleAuth = async (req, res) => {
  const { _id: id } = req.user;
  const payload = {
    id,
  };
  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
    expiresIn: "1d",
  });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });
  console.log("accessToken", accessToken);
  console.log("refreshToken", refreshToken);

  await User.findByIdAndUpdate(id, {
    accessToken,
    refreshToken,
  });

  res.redirect(
    `${FRONTEND_URL}/home?accessToken=${accessToken}&refreshToken=${refreshToken}`
  );
};

module.exports = googleAuth;
