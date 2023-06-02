const { User } = require("../../models");

const getCategories = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await User.find({ owner });

  res.json(result);
};

module.exports = getCategories;
