const authCtrls = require("./auth");
const usersCtrls = require("./users");
const transactionsCtrls = require("./transactions");
const categoryCtrls = require("./category");
const currencyCtrls = require("./currency/getCurrency");

module.exports = {
  authCtrls,
  usersCtrls,
  transactionsCtrls,
  categoryCtrls,
  currencyCtrls,
};
