const express = require("express");
const {
  createProduct,
  imany,
  getProudct,
  getById,
  UpdateByPatch,
  search,
} = require("../controllers/productController");

const productRouter = express.Router();

productRouter
  .post("/add", createProduct)
  .get("/get", getProudct)
  .get("/getbyid/:id", getById)
  .get("/search", search)
  .patch("/pupdate/:id", UpdateByPatch);
// productRouter.post("/mn", uimany);

module.exports = productRouter;
