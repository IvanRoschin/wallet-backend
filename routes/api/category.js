const express = require("express");
const { ctrlWrapper, auth, validation } = require("../../middlewares");
const { joiCategorySchema } = require("../../models/users");
const { categoryCtrls: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));
router.post("/", auth, validation(joiCategorySchema), ctrlWrapper(ctrl.add));
router.delete("/:categoryId", auth, ctrlWrapper(ctrl.deleteByName));

module.exports = router;
