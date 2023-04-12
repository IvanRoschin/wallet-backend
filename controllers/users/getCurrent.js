const { Transaction } = require("../../models");
// const { User } = require("../../models");

const getCurrent = async (req, res) => {
  const { _id, name, email, phone, balance, image } = req.user;

  const userTransactions = await Transaction.find(
    { owner: _id },
    "-createdAt -updatedAt"
  ).populate("owner", "_id date, type, category, comment, sum");

  res.json({
    _id,
    name,
    email,
    phone,
    balance,
    image,
    userTransactions,
  });
};

module.exports = getCurrent;
