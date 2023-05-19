const { NotFound } = require("http-errors");
const { Transaction } = require("../../models");

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const deletedTransaction = await Transaction.findOneAndRemove({
    _id: id,
    owner: _id,
  });

  if (!deletedTransaction) {
    throw new NotFound(`Transaction with id=${id} not found`);
  }
  res.json({ result: id });
};

module.exports = deleteById;
