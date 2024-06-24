const express = require("express");
const brandController = require("../controllers/brandController");

const brandRouter = express.Router();

brandRouter.post("/add", brandController.add).get("/get", brandController.get);
// .post("/im", brandController.imany);

module.exports = brandRouter;
