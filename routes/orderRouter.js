const express = require("express");
const orderController = require("../controllers/orderController");

const orderRouter = express.Router();

orderRouter
  .get("/get", orderController.getOrder)
  .get("/admin/get", orderController.fetchAllOrders)
  .post("/add", orderController.addOrder)
  .patch("/update/:id", orderController.updateCart)
  .delete("/delete/:id", orderController.deleteOrder);

module.exports = orderRouter;
