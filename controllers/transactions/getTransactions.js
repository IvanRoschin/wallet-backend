const { Transaction } = require("../../models");

const getTransactions = async (req, res) => {
  const { _id: owner } = req.user;
  try {
    const result = await Transaction.find(
      { owner },
      "-createdAt -updatedAt"
    ).populate("owner", "_id name email");
    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getTransactions;
