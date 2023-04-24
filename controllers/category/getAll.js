const { Category } = require("../../models");

const getCategories = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Category.find({ owner }).populate("owner", "_id name");

  res.json(result);
};

module.exports = getCategories;
