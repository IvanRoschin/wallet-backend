const { User } = require("../models/users");
const { uploadAvatarImage } = require("./cloudinary");
const fs = require("fs/promises");

const updateAvatar = async (req, res) => {
  if (!req.file) {
    res.send("File was not found");
    return;
  }
  const { path: upload } = req.file;

  const { _id } = req.user;

  const avatarURL = await uploadAvatarImage(upload);
  console.log("avatarURL", avatarURL);

  const updatedUser = await User.findByIdAndUpdate(
    { _id },
    {
      photoURL: avatarURL,
    },
    { new: true }
  );

  res.json({ photoURL: updatedUser.photoURL });
  fs.unlink(upload);
};

module.exports = updateAvatar;
