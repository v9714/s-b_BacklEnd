const mongoose = require("mongoose");
const { Schema } = mongoose;

class CartModel {
  constructor() {
    this.cartSchema = new mongoose.Schema(
      {
        quantity: { type: Number, required: true },
        product: {
          type: Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
        user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
        color: { type: Schema.Types.Mixed },
        size: { type: Schema.Types.Mixed },
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
    this.cartSchema.virtual("id").get(function () {
      return this._id.toHexString();
    });

    this.cartModel = mongoose.model("Carts", this.cartSchema);
  }
  add(data) {
    return this.cartModel.create(data);
  }
}

const cartModel = new CartModel();
module.exports = cartModel;
