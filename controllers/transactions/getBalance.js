const { Transaction } = require("../../models");

const getBalance = async (req, res) => {
  const { _id: owner } = req.user;
  const { month, year } = req.query; // Assuming month, year, and fieldToCheck are passed as query parameters

  const isYearMonthNotProvided = !year && !month;

  const matchQuery = { owner };

  if (!isYearMonthNotProvided) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);
    matchQuery.date = { $gte: startDate, $lt: endDate };
  }

  try {
    const result = await Transaction.aggregate([
      { $match: matchQuery },
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
          income: {
            $sum: { $cond: [{ $eq: ["$type", "income"] }, "$sum", 0] },
          },
          expense: {
            $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$sum", 0] },
          },
        },
      },
    ]);

    res.json(result);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = getBalance;
