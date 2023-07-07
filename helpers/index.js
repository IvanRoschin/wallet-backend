const { createAvatarsDir, createUploadDir } = require("./createFolders");
const { defaultCategories } = require("./defaultCategories.js");
const { generateObjectId } = require("./generateObjectId");

module.exports = {
  createAvatarsDir,
  createUploadDir,
  defaultCategories,
  generateObjectId,
};
