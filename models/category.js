const { model, Schema } = require("mongoose");
const Joi = require("joi");

const categorySchema = Schema(
  {
    nameUk: {
      type: String,
      required: true,
      unique: true,
    },
    nameEn: {
      type: String,
      required: true,
      unique: true,
    },
    color: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

const categoryJoiSchema = Joi.object({
  nameUk: Joi.string().required(),
  nameEn: Joi.string().required(),
  color: Joi.string().required(),
});

const Category = model("category", categorySchema);

module.exports = {
  Category,
  categoryJoiSchema,
};
