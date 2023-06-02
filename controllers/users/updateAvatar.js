const { User } = require("../../models/users");
const { uploadAvatarImage } = require("../../middlewares/cloudinary");
const fs = require("fs/promises");

const updateAvatar = async (req, res) => {
  if (!req.file) {
    res.send("File was not found");
    return;
  }
  const { path: upload } = req.file;

  const { _id: owner } = req.user;

  const avatarURL = await uploadAvatarImage(upload);

  const updatedUser = await User.findByIdAndUpdate(
    { owner },
    {
      photoURL: avatarURL,
    },
    { new: true }
  );

  res.json({ photoURL: updatedUser.photoURL });
  fs.unlink(upload);
};

module.exports = updateAvatar;
