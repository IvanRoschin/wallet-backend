const express = require("express");
const { validation, ctrlWrapper, auth, upload } = require("../../middlewares");
const { joiEditInfoSchema } = require("../../models/users");
const { usersCtrls: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/edit",
  auth,
  validation(joiEditInfoSchema),
  ctrlWrapper(ctrl.editUserInfo)
);

router.put(
  "/avatars",
  auth,
  upload.single("image"),
  ctrlWrapper(ctrl.updateAvatar)
);
module.exports = router;
