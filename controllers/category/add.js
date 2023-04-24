const { Category } = require("../../models");

const add = async (req, res) => {
  const { name } = req.body;
  const { _id: owner } = req.user;

  const result = await Category.create({
    name,
    owner,
  });

  res.status(201).json(result);
};

module.exports = add;
