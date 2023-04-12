const { Transaction } = require("../../models");

const date = new Date();
date.setYear(date.getYear() - 1);

const getTransactionsPerYear = async (req, res) => {
  const { _id: owner } = req.user;
  try {
    const result = await Transaction.find({
      $and: [{ owner }, { date: { $gte: date } }],
    }).populate("owner", "_id name email");
    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = getTransactionsPerYear;
