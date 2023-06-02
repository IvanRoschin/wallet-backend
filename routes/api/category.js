const express = require("express");
const { ctrlWrapper, auth, validation } = require("../../middlewares");
const { categoryJoiSchema } = require("../../models/category");
const { categoryCtrls: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));
router.post("/", auth, validation(categoryJoiSchema), ctrlWrapper(ctrl.add));
router.delete("/:id", auth, ctrlWrapper(ctrl.deleteById));

module.exports = router;
