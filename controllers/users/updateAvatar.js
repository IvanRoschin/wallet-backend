const { User } = require("../../models/users");
const { uploadAvatarImage } = require("../../middlewares/cloudinary");
const fs = require("fs/promises");

const updateAvatar = async (req, res) => {
  console.log("req.file", req.file);
  if (!req.file) {
    res.send("File was not found");
    return;
  }
  const { path: upload } = req.file;

  const { _id } = req.user;

  const avatarURL = await uploadAvatarImage(upload);

  const updatedUser = await User.findByIdAndUpdate(
    { _id },
    {
      image: avatarURL,
    },
    { new: true }
  );

  res.json({ image: updatedUser.image });
  fs.unlink(upload);
};

module.exports = updateAvatar;
