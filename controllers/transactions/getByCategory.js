const { Transaction } = require("../../models");

const getByCategory = async (req, res) => {
  const { _id: owner } = req.user;
  try {
    const result = await Transaction.aggregate([
      { $match: { owner } },
      {
        $group: {
          _id: "$category.label",
          color: { $addToSet: "$category.color" },
          type: { $addToSet: "$category.type" },
          balance: {
            $sum: { $multiply: ["$sum"] },
          },
          count: { $sum: 1 },
        },
      },
    ]);
    console.log("result", result);
    res.json(result);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = getByCategory;
