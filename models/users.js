const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const nameRegexp =
  /^[a-zA-Zа-яА-ЯіІїЇґҐщЩьЬЄє'\s]*[a-zA-Zа-яА-ЯіІїЇґҐщЩьЬЄє'][a-zA-Zа-яА-ЯіІїЇґҐщЩьЬЄє'\s]*$/;

const passwordRegexp = /^\S+$/;
const phoneRegexp = /^\+380\d{9}$/;
const emailRegexp = /^[^а-яА-ЯёЁ!#$%*/?^`+&{|}~]+@[a-z0-9.-]+\.[a-z]{2,}$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: [true, "Email is required"],
      match: [emailRegexp],
      minLength: 5,
      maxLength: 63,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      match: [passwordRegexp, "Password can't contain white spaces"],
      minLength: 7,
      // maxLength: 32,
    },

    name: {
      type: String,
      required: [true, "Name is required"],
      match: [nameRegexp, "Name must be only Arabic letters"],
      minLength: 2,
      maxLength: 16,
    },

    balance: {
      type: Number,
      default: null,
    },

    phone: {
      type: String,
      required: [true, "PhoneNumber is required"],
      match: [phoneRegexp, "Please enter a valid phone number"],
    },

    image: {
      type: String,
      default: null,
    },

    accessToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },

    transactions: [{ type: Schema.Types.ObjectId, ref: "transactions" }],
  },

  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiRegisterSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { deny: ["ru"] } })
    .error(
      (errors) =>
        new Error(
          "enter valid email: min 5, max 63 characters, except .ru. Don't use cyrillic, special symbols, besides '-', '_', '.' "
        )
    )
    .min(5)
    .max(63)
    .pattern(emailRegexp)
    .required(),
  // email: Joi.string().min(12).max(50).pattern(emailRegexp).required(),
  password: Joi.string().min(7).pattern(passwordRegexp).required(),
  name: Joi.string().min(2).max(16).pattern(nameRegexp).required(),
  balance: Joi.number(),
  phone: Joi.string().pattern(phoneRegexp).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { deny: ["ru"] } })
    .error(
      (errors) =>
        new Error("enter valid email: min 6, max 63 characters, except .ru")
    )
    .min(12)
    .max(50)
    .required(),
  password: Joi.string().pattern(passwordRegexp).required(),
});

const joiEditInfoSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { deny: ["ru"] } })
    .error(
      (errors) =>
        new Error("enter valid email: min 6, max 63 characters, except .ru")
    )
    .min(12)
    .max(50),
  name: Joi.string().min(2).max(16).pattern(nameRegexp),
  phone: Joi.string().pattern(phoneRegexp),
});

const joiRefreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
  joiEditInfoSchema,
  joiRefreshTokenSchema,
};
