const { Transaction } = require("../../models");

const getByPeriod = async (req, res) => {
  const { _id: owner } = req.user;
  const { month, year } = req.query; // Assuming month and year are passed as query parameters

  // Check if year and month are not provided
  const isYearMonthNotProvided = !year && !month;

  const matchQuery = { owner };

  if (!isYearMonthNotProvided) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);
    matchQuery.date = { $gte: startDate, $lt: endDate };
  }

  try {
    const result = await Transaction.aggregate([
      {
        $match: matchQuery,
      },
      {
        $group: {
          _id: "$category.label",
          color: { $addToSet: "$category.color" },
          type: { $addToSet: "$category.type" },

          summ: { $sum: { $multiply: ["$sum"] } },
        },
      },
    ]);

    console.log("result", result);
    res.json(result);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = getByPeriod;
