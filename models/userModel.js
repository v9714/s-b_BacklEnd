const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Import Schema from mongoose

class UserModel {
  constructor() {
    this.UserSchema = new Schema( // Use Schema here
      {
        email: { type: String, required: true, unique: true },
        password: { type: Buffer, required: true },
        role: { type: String, required: true, default: "user" },
        addresses: { type: [Schema.Types.Mixed] },
        name: { type: String },
        orders: { type: [Schema.Types.Mixed] },
        salt: { type: Buffer },
        resetPasswordToken: { type: String, default: null },
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
    this.UserSchema.virtual("id").get(function () {
      return this._id.toHexString();
    });

    this.userModel = mongoose.model("Users", this.UserSchema);
  }
  PatchUpdate(id, data) {
    return this.userModel.findByIdAndUpdate(id, data, { new: true });
  }
}

const userModel = new UserModel();
module.exports = userModel;
