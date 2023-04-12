const { User } = require("../../models/users");
const { uploadAvatarImage } = require("../../middlewares/cloudinary");
const fs = require("fs/promises");

const updateAvatar = async (req, res) => {
  const { path: upload } = req.file;
  console.log("upload", upload);
  const { _id } = req.user;

  const imageUrl = await uploadAvatarImage(upload);

  const updatedUser = await User.findByIdAndUpdate(
    { _id },
    {
      image: imageUrl,
    },
    { new: true }
  );

  res.json({ image: updatedUser.imageUrl });
  fs.unlink(upload);
};

module.exports = updateAvatar;
