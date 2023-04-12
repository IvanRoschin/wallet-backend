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
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
    },
    summ: {
      type: Number,
      default: null,
      required: true,
    },
    ballance: {
      type: Number,
      default: null,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

const transactionJoiSchema = Joi.object({
  date: Joi.date().required(),
  type: Joi.string().valid("income", "expense").required(),
  category: Joi.string().required(),
  comment: Joi.string(),
  summ: Joi.number().required(),
  ballance: Joi.number().required(),
});

const Transaction = model("transaction", transactionSchema);

module.exports = {
  Transaction,
  transactionJoiSchema,
};
