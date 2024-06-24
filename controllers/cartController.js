const cartModel = require("../models/cartModel");

class CartController {
  async getCart(req, res) {
    try {
      const { id } = req.user;

   
      const cartItems = await cartModel.cartModel
        .find({ user: req.user.id })
        .populate("product");

      res.status(200).json(cartItems);
    } catch (error) {
      console.error("Internal Server Error:", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }

  async addCart(req, res) {
    try {
      const { id } = req.user;
    
      const doc = await cartModel.cartModel.create({ ...req.body, user: id });
      const result = await doc.populate("product");
      if (result) {
        return res.status(201).json(result);
      }
      return res.status(500).send({ message: "Something went wrong" });
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((err) => err.message);
        return res.status(400).send({ message: "Validation Error", errors });
      }

      // Check if the error is a duplicate key error
      if (error.code === 11000 && error.keyPattern && error.keyValue) {
        return res
          .status(400)
          .send({ message: "Duplicate Key Error", key: error.keyValue });
      }
      console.error("Internal Server Error:", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }

  async deleteCart(req, res) {
    try {
      const { id } = req.params;
      const result = await cartModel.cartModel.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).json({ message: "Cart not found" });
      }
      res.status(200).json(result);
    } catch (error) {
      console.error("Internal Server Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateCart(req, res) {
    try {
      const { id } = req.params;
      const cart = await cartModel.cartModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      res.status(200).json(cart);
    } catch (error) {
      console.error("Internal Server Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
const cartController = new CartController();
module.exports = cartController;
