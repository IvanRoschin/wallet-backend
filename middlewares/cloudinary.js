const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadAvatarImage = async (pathFile) => {
  const options = {
    folder: "userAvatars",
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    transformation: [
      { gravity: "face", height: 233, width: 233, crop: "fill" },
    ],
  };
  try {
    const result = await cloudinary.uploader.upload(pathFile, options);
    return result.url;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { uploadAvatarImage };
