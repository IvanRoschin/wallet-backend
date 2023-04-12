const dotenv = require("dotenv");
dotenv.config();

const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../models/users");

const { ACCESS_SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  console.log("TOKEN", token);
  try {
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }

    const { id } = jwt.verify(token, ACCESS_SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.accessToken) {
      throw new Unauthorized("Not authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid signature") {
      error.status = 401;
    }
    next(error);
  }
};
module.exports = auth;
