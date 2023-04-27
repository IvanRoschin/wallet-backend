const { User } = require("../../models/users");
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
  const newUser = new User({ name, email, phone, photoURL });
  newUser.setPassword(password);
  await newUser.save();

  res.status(201).json(
    newUser

    // message: "You have been successfully registered",
  );
};

module.exports = signup;
