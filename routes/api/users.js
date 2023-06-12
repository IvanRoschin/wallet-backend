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

router.put(
  "/",
  auth,
  upload.single("photoURL"),
  ctrlWrapper(ctrl.updateAvatar)
);

router.post("/", (req, res, next) => {
  const formidable = require("formidable");

  const form = new formidable.IncomingForm();
  form.uploadDir = "__dirname../../tmp";
  form.keepExtentions = true;
  form.maxFieldsSize = 10 * 1024 * 1024;
  form.multiples = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.json({
        result: "failed",
        data: {},
        message: `Can not upload image. Error is : ${err}`,
      });
    }
    const arrayOfFiles = [""];
    if (arrayOfFiles.length > 0) {
      const fileNames = [];
      arrayOfFiles.forEach((eachFile) => {
        fileNames.push(eachFile.path);
      });
      res.json({
        result: "ok",
        data: fileNames,
        message: "upload succesfully",
      });
    } else {
      res.json({
        result: "failed",
        data: {},
        message: `No images to upload`,
      });
    }
  });
});
module.exports = router;
