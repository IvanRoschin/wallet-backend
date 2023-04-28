const { model, Schema } = require("mongoose");
const Joi = require("joi");

const categorySchema = Schema(
  {
    name: {
      uk: {
        type: String,
        required: true,
        unique: true,
        default: ["Їжа", "Авто"],
      },
      en: {
        type: String,
        required: true,
        unique: true,
        default: ["Food", "Auto"],
      },
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
  nameUk: Joi.string().required(),
  nameEn: Joi.string().required(),
});

const Category = model("category", categorySchema);

module.exports = {
  Category,
  categoryJoiSchema,
};
