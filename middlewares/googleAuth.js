const passport = require("passport");
const { Strategy } = require("passport-google-oauth2");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { v4 } = require("uuid");
const { defaultCategories: categories } = require("../helpers");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BACKEND_URL } = process.env;

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${BACKEND_URL}/api/auth/google/callback`,
  passReqToCallback: true,
};

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const { email, picture, displayName } = profile;

    const user = await User.findOne({ email });
    if (user) {
      return done(null, user); // req.user = user
    }
    const password = await bcrypt.hash(v4(), 10);
    const newUser = await User.create({
      email,
      password,
      photoURL: picture,
      name: displayName,
      phone: "+380999999999",
      categories,
    });
    done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use("google", googleStrategy);

module.exports = passport;
