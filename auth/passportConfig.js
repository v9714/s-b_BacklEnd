// Import required modules and models
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { sanitizeUser, cookieExtractor } = require("../service/common");
require("dotenv").config();

// Define the secret key for JWT
// const SECRET_KEY = "SECRET_KEY";
const SECRET_KEY = process.env.SECRET_KEY;

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.SECRET_KEY,
};

// Define local strategy
passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (username, password, done) {
      try {
        const user = await userModel.userModel.findOne({ email: username });
        crypto.pbkdf2(
          password,
          user.salt,
          310000,
          32,
          "sha256",
          async function (err, hashedPassword) {
            if (err) {
              return done(err);
            }
            const userPasswordBuffer = Buffer.from(user.password);

            if (!crypto.timingSafeEqual(userPasswordBuffer, hashedPassword)) {
              return done(null, false, { message: "Invalid credentials" });
            }
            console.log(user);
            const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
            return done(null, { id: user.id, role: user.role, token });
          }
        );
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    // console.log({ jwt_payload }, "jwt_payload");
    try {
      const user = await userModel.userModel.findOne({ _id: jwt_payload.id });
      // console.log(user, "jjj");
      if (user) {
        return done(null, sanitizeUser(user));
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

// this creates session variable req.user on being called from callbacks
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, { id: user._id, role: user.role });
  });
});

// this changes session variable req.user when called from authorized request

passport.deserializeUser(function (user, cb) {
  console.log("de-serialize", user);
  console.log(user, "userererer123");
  process.nextTick(function () {
    return cb(null, user);
  });
});

module.exports = passport;
