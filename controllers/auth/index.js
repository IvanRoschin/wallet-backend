const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const refreshToken = require("./refreshToken");
const googleAuth = require("./googleAuth");
const checkConnection = require("./checkConnetcion");
module.exports = {
  signup,
  login,
  logout,
  refreshToken,
  googleAuth,
  checkConnection,
};
