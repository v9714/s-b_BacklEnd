const brandModel = require("../models/brandModel");

const brands = [
  {
    value: "Apple",
    label: "Apple",
    checked: false,
  },
  {
    value: "Samsung",
    label: "Samsung",
    checked: false,
  },
  {
    value: "OPPO",
    label: "OPPO",
    checked: false,
  },
  {
    value: "Huawei",
    label: "Huawei",
    checked: false,
  },
  {
    value: "Microsoft Surface",
    label: "Microsoft Surface",
    checked: false,
  },
  {
    value: "Infinix",
    label: "Infinix",
    checked: false,
  },
  {
    value: "HP Pavilion",
    label: "HP Pavilion",
    checked: false,
  },
  {
    value: "Impression of Acqua Di Gio",
    label: "Impression of Acqua Di Gio",
    checked: false,
  },
  {
    value: "Royal_Mirage",
    label: "Royal_Mirage",
    checked: false,
  },
  {
    value: "Fog Scent Xpressio",
    label: "Fog Scent Xpressio",
    checked: false,
  },
  {
    value: "Al Munakh",
    label: "Al Munakh",
    checked: false,
  },
  {
    value: "Lord - Al-Rehab",
    label: "Lord   Al Rehab",
    checked: false,
  },
  {
    value: "L'Oreal Paris",
    label: "L'Oreal Paris",
    checked: false,
  },
  {
    value: "Hemani Tea",
    label: "Hemani Tea",
    checked: false,
  },
  {
    value: "Dermive",
    label: "Dermive",
    checked: false,
  },
  {
    value: "ROREC White Rice",
    label: "ROREC White Rice",
    checked: false,
  },
  {
    value: "Fair & Clear",
    label: "Fair & Clear",
    checked: false,
  },
  {
    value: "Saaf & Khaas",
    label: "Saaf & Khaas",
    checked: false,
  },
  {
    value: "Bake Parlor Big",
    label: "Bake Parlor Big",
    checked: false,
  },
  {
    value: "Baking Food Items",
    label: "Baking Food Items",
    checked: false,
  },
  {
    value: "fauji",
    label: "fauji",
    checked: false,
  },
  {
    value: "Dry Rose",
    label: "Dry Rose",
    checked: false,
  },
  {
    value: "Boho Decor",
    label: "Boho Decor",
    checked: false,
  },
  {
    value: "Flying Wooden",
    label: "Flying Wooden",
    checked: false,
  },
  {
    value: "LED Lights",
    label: "LED Lights",
    checked: false,
  },
  {
    value: "luxury palace",
    label: "luxury palace",
    checked: false,
  },
  {
    value: "Golden",
    label: "Golden",
    checked: false,
  },
  {
    value: "Furniture Bed Set",
    label: "Furniture Bed Set",
    checked: false,
  },
  {
    value: "Ratttan Outdoor",
    label: "Ratttan Outdoor",
    checked: false,
  },
  {
    value: "Kitchen Shelf",
    label: "Kitchen Shelf",
    checked: false,
  },
  {
    value: "Multi Purpose",
    label: "Multi Purpose",
    checked: false,
  },
  {
    value: "AmnaMart",
    label: "AmnaMart",
    checked: false,
  },
  {
    value: "Professional Wear",
    label: "Professional Wear",
    checked: false,
  },
  {
    value: "Soft Cotton",
    label: "Soft Cotton",
    checked: false,
  },
  {
    value: "Top Sweater",
    label: "Top Sweater",
    checked: false,
  },
  {
    value: "RED MICKY MOUSE..",
    label: "RED MICKY MOUSE..",
    checked: false,
  },
  {
    value: "Digital Printed",
    label: "Digital Printed",
    checked: false,
  },
  {
    value: "Ghazi Fabric",
    label: "Ghazi Fabric",
    checked: false,
  },
  {
    value: "IELGY",
    label: "IELGY",
    checked: false,
  },
  {
    value: "IELGY fashion",
    label: "IELGY fashion",
    checked: false,
  },
  {
    value: "Synthetic Leather",
    label: "Synthetic Leather",
    checked: false,
  },
  {
    value: "Sandals Flip Flops",
    label: "Sandals Flip Flops",
    checked: false,
  },
  {
    value: "Maasai Sandals",
    label: "Maasai Sandals",
    checked: false,
  },
  {
    value: "Arrivals Genuine",
    label: "Arrivals Genuine",
    checked: false,
  },
  {
    value: "Vintage Apparel",
    label: "Vintage Apparel",
    checked: false,
  },
  {
    value: "FREE FIRE",
    label: "FREE FIRE",
    checked: false,
  },
  {
    value: "The Warehouse",
    label: "The Warehouse",
    checked: false,
  },
  {
    value: "Sneakers",
    label: "Sneakers",
    checked: false,
  },
  {
    value: "Rubber",
    label: "Rubber",
    checked: false,
  },
  {
    value: "Naviforce",
    label: "Naviforce",
    checked: false,
  },
  {
    value: "SKMEI 9117",
    label: "SKMEI 9117",
    checked: false,
  },
  {
    value: "Strap Skeleton",
    label: "Strap Skeleton",
    checked: false,
  },
  {
    value: "Stainless",
    label: "Stainless",
    checked: false,
  },
  {
    value: "Eastern Watches",
    label: "Eastern Watches",
    checked: false,
  },
  {
    value: "Luxury Digital",
    label: "Luxury Digital",
    checked: false,
  },
  {
    value: "Watch Pearls",
    label: "Watch Pearls",
    checked: false,
  },
  {
    value: "Bracelet",
    label: "Bracelet",
    checked: false,
  },
  {
    value: "LouisWill",
    label: "LouisWill",
    checked: false,
  },
  {
    value: "Copenhagen Luxe",
    label: "Copenhagen Luxe",
    checked: false,
  },
  {
    value: "Steal Frame",
    label: "Steal Frame",
    checked: false,
  },
  {
    value: "Darojay",
    label: "Darojay",
    checked: false,
  },
  {
    value: "Fashion Jewellery",
    label: "Fashion Jewellery",
    checked: false,
  },
  {
    value: "Cuff Butterfly",
    label: "Cuff Butterfly",
    checked: false,
  },
  {
    value: "Designer Sun Glasses",
    label: "Designer Sun Glasses",
    checked: false,
  },
  {
    value: "mastar watch",
    label: "mastar watch",
    checked: false,
  },
  {
    value: "Car Aux",
    label: "Car Aux",
    checked: false,
  },
  {
    value: "W1209 DC12V",
    label: "W1209 DC12V",
    checked: false,
  },
  {
    value: "TC Reusable",
    label: "TC Reusable",
    checked: false,
  },
  {
    value: "Neon LED Light",
    label: "Neon LED Light",
    checked: false,
  },
  {
    value: "METRO 70cc Motorcycle - MR70",
    label: "METRO 70cc Motorcycle   MR70",
    checked: false,
  },
  {
    value: "BRAVE BULL",
    label: "BRAVE BULL",
    checked: false,
  },
  {
    value: "shock absorber",
    label: "shock absorber",
    checked: false,
  },
  {
    value: "JIEPOLLY",
    label: "JIEPOLLY",
    checked: false,
  },
  {
    value: "Xiangle",
    label: "Xiangle",
    checked: false,
  },
  {
    value: "lightingbrilliance",
    label: "lightingbrilliance",
    checked: false,
  },
  {
    value: "Ifei Home",
    label: "Ifei Home",
    checked: false,
  },
  {
    value: "DADAWU",
    label: "DADAWU",
    checked: false,
  },
  {
    value: "YIOSI",
    label: "YIOSI",
    checked: false,
  },
];
class BrandController {
  async get(req, res) {
    try {
      const brands = await brandModel.brandModel.find({}).exec();

      if (brands && brands.length > 0) {
        return res.status(200).json(brands);
      }
      return res.status(404).json({ message: "No brands found" });
    } catch (error) {
      console.error("Error fetching brands:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async add(req, res) {
    try {
      const { value, label } = req.body;
      if (!value || !label) {
        return res.status(400).json({ message: "Brand Missing fields" });
      }

      const newBrand = new brandModel.brandModel(req.body);
      const savedBrand = await newBrand.save();
      if (savedBrand) {
        return res.status(201).json(savedBrand);
      }
      return res.status(500).json({ message: "Failed to save brand" });
    } catch (error) {
      // Check if the error is a Mongoose validation error
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((err) => err.message);
        return res
          .status(400)
          .send({ message: "Brand Validation Error", errors });
      }

      // Check if the error is a duplicate key error
      if (error.code === 11000 && error.keyPattern && error.keyValue) {
        return res
          .status(400)
          .send({ message: "Brand Duplicate Key Error", key: error.keyValue });
      }

      console.error("Error adding brand:", error);
      res.status(400).json({ message: "Error adding brand", error });
    }
  }

  async imany(req, res) {
    try {
      const result = await brandModel.brandModel.insertMany(brands);
      if (result) {
        return res.status(200).send({ message: "success", data: result });
      }
      return res.status(500).send({ message: "Something went wrong" });
    } catch (error) {
      console.log(error);
    }
  }
}

const brandController = new BrandController();
module.exports = brandController;
