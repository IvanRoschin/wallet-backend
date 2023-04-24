const { Transaction } = require("../../models");

const date = new Date();
date.setYear(date.getYear() - 1);

const getTransactionsPerYear = async (req, res) => {
  const { _id: owner } = req.user;
  try {
    const result = await Transaction.find({
      $and: [
        { owner },
        {
          date: {
            $gte: new Date(new Date().getFullYear() - 1, 0, 1),
            $lt: new Date(new Date().getFullYear(), 0, 1),
          },
        },
      ],
    }).populate("owner", "_id name email");
    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = getTransactionsPerYear;
