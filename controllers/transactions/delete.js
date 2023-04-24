const { NotFound } = require("http-errors");
const { Transaction } = require("../../models");
const { User } = require("../../models");

const deleteById = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;

  await User.findOneAndUpdate(
    { _id: _id },
    { $pull: { categoty: id } },
    {
      new: true,
    }
  );

  const deletedTransaction = await Transaction.findOneAndRemove({
    _id: id,
  });

  if (!deletedTransaction) {
    throw new NotFound(`Transaction with id=${id} not found`);
  }
  res.json({ result: id });
};

module.exports = deleteById;
