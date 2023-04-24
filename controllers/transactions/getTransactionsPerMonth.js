const { Transaction } = require("../../models");

const getTransactionsPerMonth = async (req, res) => {
  const { _id: owner } = req.user;
  try {
    const result = await Transaction.find({
      $and: [
        { owner },
        {
          date: {
            $gte: new Date(
              new Date().getFullYear(),
              new Date().getMonth() - 1,
              1
            ),
            $lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      ],
    }).populate("owner", "_id name email balance");
    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = getTransactionsPerMonth;
