const { Transaction } = require("../../models");

const amountIncome = async (req, res) => {
  const { _id: owner } = req.user;
  try {
    const result = await Transaction.aggregate([
      {
        $group: {
          _id: { _id: owner, type: "$type" },
          totalAmount: { $sum: { $multiply: ["$summ"] } },
          count: { $sum: 1 },
        },
      },
    ]);
    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = amountIncome;
