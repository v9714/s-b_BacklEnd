const express = require("express");
const {
  createUser,
  loginUser,
  checkAuth,
  resetPasswordRequest,
  resetPassword,
  logout
} = require("./../controllers/Auth");
const passport = require("passport");

const Auth = express.Router();

Auth.post("/signup", createUser)
  .post("/forgot_passwordrequst", resetPasswordRequest)
  .post("/forgot_resetpassword", resetPassword)
  .get("/logout", logout)
  .post("/login", passport.authenticate("local"), loginUser)
  .get("/check", passport.authenticate("jwt"), checkAuth)

module.exports = Auth;
