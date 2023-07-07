require("dotenv").config();

const { User } = require("../../models/users");
const { Transaction } = require("../../models");

const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized(`User with email ${email} not found`);
  } else if (!user.comparePassword(password)) {
    throw new Unauthorized(`Password incorrect`);
  }

  const payload = {
    id: user._id,
  };

  // const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "2m" });
  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "1d" });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });

  // await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });
  const updatedUser = await User.findByIdAndUpdate(user._id, {
    accessToken,
    refreshToken,
  });
  const { _id, name, phone, photoURL, categories } = updatedUser;

  const userTransactions = await Transaction.find(
    { owner: _id },
    "-createdAt -updatedAt"
  ).populate("owner", "_id, date, type, category, comment, sum");

  res.status(200).json({
    accessToken,
    refreshToken,
    user: {
      _id,
      email,
      name,
      phone,
      photoURL,
      userTransactions,
      categories,
    },
  });
};

module.exports = login;
