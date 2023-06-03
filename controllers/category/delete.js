const { NotFound } = require("http-errors");
const { User } = require("../../models");

const deleteByName = async (req, res) => {
  const { _id: owner } = req.user;
  const { categoryId } = req.params;

  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: owner },
      { $pull: { categories: { _id: categoryId } } },
      { new: true }
    );
    if (!updateUser) {
      throw new NotFound(`User not found`);
    }
    res.json(updateUser.categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = deleteByName;
