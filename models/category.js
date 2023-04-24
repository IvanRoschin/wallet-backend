const { model, Schema } = require("mongoose");
const Joi = require("joi");

const categorySchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
  }
);

const categoryJoiSchema = Joi.object({
  name: Joi.string().required(),
});

const Category = model("category", categorySchema);

module.exports = {
  Category,
  categoryJoiSchema,
};
