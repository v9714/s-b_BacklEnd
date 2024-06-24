const categoryModel = require("../models/categoryModel");
const categories = [
  {
    value: "smartphones",
    label: "smartphones",
    checked: false,
  },
  {
    value: "laptops",
    label: "laptops",
    checked: false,
  },
  {
    value: "fragrances",
    label: "fragrances",
    checked: false,
  },
  {
    value: "skincare",
    label: "skincare",
    checked: false,
  },
  {
    value: "groceries",
    label: "groceries",
    checked: false,
  },
  {
    value: "home-decoration",
    label: "home decoration",
    checked: false,
  },
  {
    value: "furniture",
    label: "furniture",
    checked: false,
  },
  {
    value: "tops",
    label: "tops",
    checked: false,
  },
  {
    value: "womens-dresses",
    label: "womens dresses",
    checked: false,
  },
  {
    value: "womens-shoes",
    label: "womens shoes",
    checked: false,
  },
  {
    value: "mens-shirts",
    label: "mens shirts",
    checked: false,
  },
  {
    value: "mens-shoes",
    label: "mens shoes",
    checked: false,
  },
  {
    value: "mens-watches",
    label: "mens watches",
    checked: false,
  },
  {
    value: "womens-watches",
    label: "womens watches",
    checked: false,
  },
  {
    value: "womens-bags",
    label: "womens bags",
    checked: false,
  },
  {
    value: "womens-jewellery",
    label: "womens jewellery",
    checked: false,
  },
  {
    value: "sunglasses",
    label: "sunglasses",
    checked: false,
  },
  {
    value: "automotive",
    label: "automotive",
    checked: false,
  },
  {
    value: "motorcycle",
    label: "motorcycle",
    checked: false,
  },
  {
    value: "lighting",
    label: "lighting",
    checked: false,
  },
];
class CategoryController {
  async get(req, res) {
    try {
      const categories = await categoryModel.categoryModel.find({}).exec();
      if (categories && categories.length > 0) {
        return res.status(200).json(categories);
      }
      return res.status(404).json({ message: "No categories found" });
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async add(req, res) {
    try {
      console.log("req.body", req.body);

      const { value, label } = req.body;
      if (!value || !label) {
        return res.status(400).json({ message: "Missing fields" });
      }

      const savedCategory = await categoryModel.add(req.body);
      if (savedCategory) {
        return res.status(201).json(savedCategory);
      }
      return res.status(500).json({ message: "Failed to save category" });
    } catch (error) {
      // Check if the error is a Mongoose validation error
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((err) => err.message);
        return res
          .status(400)
          .send({ message: "category Validation Error", errors });
      }

      // Check if the error is a duplicate key error
      if (error.code === 11000 && error.keyPattern && error.keyValue) {
        return res.status(400).send({
          message: "category Duplicate Key Error",
          key: error.keyValue,
        });
      }

      console.error("Error adding category:", error);
      res.status(400).json({ message: "Error adding category", error });
    }

    console.error("Error adding category:", error);
    res.status(400).json({ message: "Error adding category", error });
  }

  async imany(req, res) {
    try {
      const result = await categoryModel.categoryModel.insertMany(categories);
      if (result) {
        return res.status(200).send({ message: "success", data: result });
      }
      return res.status(500).send({ message: "Something went wrong" });
    } catch (error) {
      console.log(error);
    }
  }
}

const categoryController = new CategoryController();
module.exports = categoryController;
