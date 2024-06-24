const orderModel = require("../models/OrderModel");
const Product = require("../models/productModel");

class OrderController {
  async getOrder(req, res) {
    try {
      const { id } = req.user;

      console.log(id);
      const order = await orderModel.orderModel.find({ user: id });
      res.status(200).json(order);
    } catch (error) {
      console.error("Internal Server Error:", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }
  async addOrder(req, res) {
    try {
      const { items } = req.body;
      console.log(req.body, "add To Orderf");

      for (let item of items) {
        let product = await Product.findById({ _id: item.product.id });
        product.$inc("stock", -1 * item.quantity);
        await product.save();
      }

      const doc = await orderModel.orderModel.create(req.body);
      if (doc) {
        return res.status(201).json(doc);
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
      console.log(error);
      console.error("Internal Server Error:", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }

  // async addOrder(req, res) {
  //   try {
  //     const { items } = req.body; // Corrected from req.res to req.body
  //     console.log(req.body, "add To Order");

  //     for (let item of items) {
  //       let product = await productModel.findOne({ _id: item.product.id });
  //       product.$inc("stock", -1 * item.quantity); // Adjust stock directly
  //       await product.save();
  //     }

  //     const doc = await orderModel.orderModel.create(req.body);
  //     if (doc) {
  //       return res.status(201).json(doc);
  //     }
  //     return res.status(500).send({ message: "Something went wrong" });
  //   } catch (error) {
  //     if (error.name === "ValidationError") {
  //       const errors = Object.values(error.errors).map((err) => err.message);
  //       return res.status(400).send({ message: "Validation Error", errors });
  //     }

  //     // Check if the error is a duplicate key error
  //     if (error.code === 11000 && error.keyPattern && error.keyValue) {
  //       return res
  //         .status(400)
  //         .send({ message: "Duplicate Key Error", key: error.keyValue });
  //     }
  //     console.error("Internal Server Error:", error);
  //     return res.status(500).send({ message: "Internal Server Error" });
  //   }
  // }

  async deleteOrder(req, res) {
    try {
      const { id } = req.params;
      const result = await orderModel.orderModel.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).json({ message: "Order not found" });
      }
      console.log("Order deleted successfully:", result);
      res.status(200).json(result);
    } catch (error) {
      console.error("Internal Server Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateCart(req, res) {
    try {
      const { id } = req.params;
      const order = await orderModel.orderModel.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        }
      );
      if (!order) {
        return res.status(404).json({ message: "order not found" });
      }
      res.status(200).json(order);
    } catch (error) {
      console.error("Internal Server Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Admin API Order
  async fetchAllOrders(req, res) {
    try {
      const { _sort, _order, _page, _limit } = req.query;

      let query = orderModel.orderModel.find({ deleted: { $ne: true } });

      if (_sort && _order) {
        query = query.sort({ [_sort]: _order });
      }

      const totalDocsQuery = orderModel.orderModel.countDocuments({
        deleted: { $ne: true },
      });

      const totalDocs = await totalDocsQuery.exec();

      if (_page && _limit) {
        const pageSize = parseInt(_limit);
        const page = parseInt(_page);
        query = query.skip(pageSize * (page - 1)).limit(pageSize);
      }

      const docs = await query.exec();
      res.set("X-Total-Count", totalDocs);
      res.status(200).json(docs);
    } catch (error) {
      console.error("Internal Server Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
const orderController = new OrderController();
module.exports = orderController;
