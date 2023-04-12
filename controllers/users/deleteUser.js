const { User } = require("../../models");

const deleteUser = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndDelete(
    { _id },
    {
      new: true,
    }
  );
  res.status(204).json();
};

module.exports = deleteUser;
