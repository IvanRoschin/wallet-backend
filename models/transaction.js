const { model, Schema } = require("mongoose");
const Joi = require("joi");

const transactionSchema = Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      default: "income",
      required: true,
    },
    category: {
      type: Object,
      required: true,
    },

    comment: {
      type: String,
    },
    sum: {
      type: Number,
      default: null,
      required: true,
    },
    balance: {
      type: Number,
      default: null,
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

const transactionJoiSchema = Joi.object({
  date: Joi.date().required(),
  type: Joi.string().valid("income", "expense").required(),
  category: Joi.object().required(),
  comment: Joi.string(),
  sum: Joi.number().required(),
  balance: Joi.string(),
});

const Transaction = model("transaction", transactionSchema);

module.exports = {
  Transaction,
  transactionJoiSchema,
};
