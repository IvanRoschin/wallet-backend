const { BadRequest } = require("http-errors");
const { User } = require("../../models");
const { generateObjectId } = require("../../helpers");

const add = async (req, res) => {
  try {
    const { nameUk, nameEn, type, color } = req.body;
    const { _id: owner } = req.user;

    const user = await User.findOne({ _id: owner });

    const categoryExists = user.categories.some(
      (category) => category.nameUk === nameUk || category.nameEn === nameEn
    );

    const colorExists = user.categories.some(
      (category) => category.color === color
    );

    if (colorExists) {
      throw new BadRequest("Such color already use, please choose another");
    } else if (categoryExists) {
      throw new BadRequest("Such category already exists");
    }
    {
      user.categories.push({
        _id: generateObjectId(),
        nameUk,
        nameEn,
        type,
        color,
      });
      const updateUser = await user.save();

      res.json(updateUser.categories);
    }
  } catch (error) {
    // Handle the error
    console.error(error);
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = add;
