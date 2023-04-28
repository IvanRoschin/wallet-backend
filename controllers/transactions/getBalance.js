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
    if (result.length === 0) {
      res.json(null);
    }
    res.json(result);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = getBalance;
