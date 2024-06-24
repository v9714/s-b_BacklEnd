const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: {
      type: Number,
      min: [1, "wrong min price"],
      max: [10000, "wrong max price"],
    },
    discountPercentage: {
      type: Number,
      min: [1, "wrong min discount"],
      max: [99, "wrong max discount"],
    },
    rating: {
      type: Number,
      min: [0, "wrong min rating"],
      max: [5, "wrong max price"],
      default: 0,
    },
    stock: { type: Number, min: [0, "wrong min stock"], default: 0 },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true },
    colors: { type: [mongoose.Schema.Types.Mixed] },
    sizes: { type: [mongoose.Schema.Types.Mixed] },
    highlights: { type: [mongoose.Schema.Types.Mixed] },
    discountPrice: { type: Number },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  }
);

productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

const Product = mongoose.model("Products", productSchema);

function getProduct(data) {
  return Product.find(data);
}

function addProduct(data) {
  return Product.create(data);
}

function findById(id) {
  return Product.findById(id);
}

function PatchUpdate(id, data) {
  return Product.findByIdAndUpdate(id, data, { new: true });
}

module.exports = { getProduct, addProduct, findById, PatchUpdate };
