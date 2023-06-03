const { User } = require("../../models");

const getCategories = async (req, res) => {
  const { _id: owner } = req.user;

  const user = await User.find(owner);
  const categories = user[0].categories;
  res.json(categories);
};

module.exports = getCategories;
