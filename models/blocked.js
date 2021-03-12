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
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    address: deliveryInfo,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blocked", blockedSchema);
