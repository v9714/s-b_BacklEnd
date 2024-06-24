const mongoose = require("mongoose");

class CategoryModel {
  constructor() {
    this.categorySchema = new mongoose.Schema(
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
    this.categorySchema.virtual("id").get(function () {
      return this._id.toHexString();
    });

    this.categoryModel = mongoose.model("Categorus", this.categorySchema);
  }
  add(data){
    return this.categoryModel.create(data)
  }
}

const categoryModel = new CategoryModel();
module.exports = categoryModel;
