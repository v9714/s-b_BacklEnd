const express = require("express");
const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter
  .patch("/update", userController.updateUser)
  .get("/get", userController.fetchUserById);

module.exports = userRouter;
