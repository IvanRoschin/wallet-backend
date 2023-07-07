const { createAvatarsDir, createUploadDir } = require("./createFolders");
const { defaultCategories } = require("./defaultCategories");
const { generateObjectId } = require("./defaultCategories");
module.exports = {
  createAvatarsDir,
  createUploadDir,
  defaultCategories,
  generateObjectId,
};
