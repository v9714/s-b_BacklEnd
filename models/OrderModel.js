const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paymentMethods = {
  values: ["card", "cash"],
  message: "enu validator failde for payment methods",
};

class OrderModel {
  constructor() {
    this.orderSchema = new Schema(
      {
        items: { type: [Schema.Types.Mixed], required: true },
        totalAmount: { type: Number },
        totalItems: { type: Number },
        user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
        paymentMethod: { type: String, required: true, enum: paymentMethods },
        status: { type: String, default: "pending" },
        selectedAddress: { type: Schema.Types.Mixed, required: true },
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

    // Define virtual field 'id'
    this.orderSchema.virtual("id").get(function () {
      return this._id.toHexString();
    });

    this.orderModel = mongoose.model("Orders", this.orderSchema);
  }
}

const orderModel = new OrderModel();
module.exports = orderModel;
