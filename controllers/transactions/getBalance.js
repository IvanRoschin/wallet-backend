const { Transaction } = require("../../models");

const getBalance = async (req, res) => {
  const { _id: owner } = req.user;
  try {
    const result = await Transaction.aggregate([
      { $match: { owner } },
      {
        $group: {
          _id: null,
          balance: {
            $sum: {
              $cond: {
                if: { $eq: ["$type", "income"] },
                then: "$sum",
                else: { $multiply: ["$sum", -1] },
              },
            },
          },
        },
      },
    ]);
    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getBalance;
