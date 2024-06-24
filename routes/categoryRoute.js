const express = require("express");
const categoryController = require("../controllers/categoryController");

const categoryRouter = express.Router();

categoryRouter
  .post("/add", categoryController.add)
  .get("/get", categoryController.get);
// .post("/im", categoryController.imany);

module.exports = categoryRouter;
