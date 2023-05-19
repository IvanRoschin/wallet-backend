const { Conflict } = require("http-errors");
const { User } = require("../../models");

const add = async (req, res) => {
  const { nameUk, nameEn, color } = req.body;
  const { _id: owner } = req.user;

  const user = User.find({ owner });
  console.log("user", user);

  const inGategories = await user.find({
    owner,
  });

  console.log("inGategories", inGategories);

  if (!inGategories.length) {
    const updateUser = await User.findOneAndUpdate(
      { owner },
      { $push: { category: { nameUk, nameEn, color } } },
      { new: true }
    ).populate("category", "-createdAt -updatedAt");
    console.log("updateUser", updateUser);

    res.json(updateUser);
  } else {
    throw new Conflict(`Category has been already added to categories`);
  }
};

module.exports = add;
