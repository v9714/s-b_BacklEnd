const mongoose = require("mongoose");

class BrandModel {
  constructor() {
    this.brandSchema = new mongoose.Schema(
      {
        label: { type: String, required: true, unique: true },
        value: { type: String, required: true, unique: true },
      },
      {
        toJSON: {
          virtuals: true,
          versionKey: false,
          transform: function (doc, ret) {
            delete ret._id;
          },
        },
      }
    );

    // Define virtual field 'id'
    this.brandSchema.virtual("id").get(function () {
      return this._id.toHexString();
    });

    this.brandModel = mongoose.model("Brands", this.brandSchema);
  }
}

const brandModel = new BrandModel();
module.exports = brandModel;
