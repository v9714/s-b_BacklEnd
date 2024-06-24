const express = require("express");
const categoryController = require("../controllers/categoryController");
const cartController = require("../controllers/cartController");

const CartRouter = express.Router();

CartRouter
  //   .post("/add", categoryController.add)
  .get("/get", cartController.getCart)
  .post("/add", cartController.addCart)
  .patch("/update/:id", cartController.updateCart)
  .delete("/delete/:id",cartController.deleteCart);

module.exports = CartRouter;
