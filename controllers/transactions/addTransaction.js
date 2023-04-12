const { Transaction } = require("../../models");

const addTransaction = async (req, res) => {
  const body = req.body;
  const { _id: owner } = req.user;
  try {
    const result = await Transaction.create({ ...body, owner });
    res.status(201).json(result);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = addTransaction;
