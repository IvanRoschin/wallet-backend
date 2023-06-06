const { User } = require("../../models/users");

const { defaultCategories: categories } = require("../../helpers");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");

const signup = async (req, res) => {
  const { name, email, password, phone } = req.body;
  const userEmail = await User.findOne({ email });
  if (userEmail) {
    throw new Conflict(`${email} in use`);
  }
  const userPhone = await User.findOne({ phone });
  if (userPhone) {
    throw new Conflict(`${phone} in use`);
  }

  const photoURL = gravatar.url(email);
  const newUser = new User({
    name,
    email,
    phone,
    photoURL,
    categories,
  });
  newUser.setPassword(password);
  await newUser.save();

  res.status(201).json(newUser);
};

module.exports = signup;
