const { Transaction } = require("../../models");

const getTransactions = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Transaction.find({ owner }).populate(
    "owner",
    "_id name email balance"
  );

  res.json(result);
};

module.exports = getTransactions;
