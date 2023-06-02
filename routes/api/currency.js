const express = require("express");
const { ctrlWrapper, auth } = require("../../middlewares");
const { currencyCtrls } = require("../../controllers");
const router = express.Router();

router.get("/", auth, ctrlWrapper(currencyCtrls));

module.exports = router;
