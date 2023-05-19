const express = require("express");
const { ctrlWrapper, auth, validation } = require("../../middlewares");
const { transactionJoiSchema } = require("../../models/transaction");
const { transactionsCtrls: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getTransactions));
router.get("/month", auth, ctrlWrapper(ctrl.getTransactionsPerMonth));
router.get("/year", auth, ctrlWrapper(ctrl.getTransactionsPerYear));

router.get("/balance", auth, ctrlWrapper(ctrl.getBalance));
router.get("/category", auth, ctrlWrapper(ctrl.getByCategory));

router.delete("/:id", auth, ctrlWrapper(ctrl.deleteById));

router.post(
  "/",
  auth,
  validation(transactionJoiSchema),
  ctrlWrapper(ctrl.addTransaction)
);

module.exports = router;
