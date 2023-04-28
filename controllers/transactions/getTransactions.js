const { Transaction } = require("../../models");

const getTransactions = async (req, res) => {
  const { _id: owner } = req.user;

  try {
    const result = await Transaction.find({ owner }).populate(
      "owner",
      "_id name email balance"
    );
    res.json(result);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = getTransactions;
