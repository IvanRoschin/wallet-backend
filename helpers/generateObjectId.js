const { v4: uuidv4 } = require("uuid");

function generateObjectId() {
  try {
    const uuid = uuidv4().replace(/-/g, "");
    return uuid.slice(0, 24);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { generateObjectId };
