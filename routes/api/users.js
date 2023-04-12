const express = require("express");
const { validation, ctrlWrapper, auth, upload } = require("../../middlewares");
const { joiEditInfoSchema } = require("../../models/users");
const { usersCtrls: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getCurrent));

router.delete("/", auth, ctrlWrapper(ctrl.deleteUser));

router.patch(
  "/",
  auth,
  validation(joiEditInfoSchema),
  ctrlWrapper(ctrl.editUserInfo)
);

router.put("/", auth, upload.single("image"), ctrlWrapper(ctrl.updateAvatar));
module.exports = router;
