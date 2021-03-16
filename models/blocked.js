const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const deliveryInfo = {
  street: String,
  locality: String,
  aptName: String,
  zip: String,
  phoneNo: Number,
  lat: Number,
  lng: Number,
};

const blockedSchema = new Schema(
  {
    userInfo: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
      unique: false,
    },
    sellerInfo: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Seller",
      unique: false,
    },
    address: deliveryInfo,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blocked", blockedSchema);
