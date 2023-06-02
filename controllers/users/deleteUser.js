const { User } = require("../../models");

const deleteUser = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndDelete(
    { _id },
    { accessToken: null, refreshToken: null }
  );
  res.status(204).json();
};

module.exports = deleteUser;
