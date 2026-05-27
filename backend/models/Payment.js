const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paypayLink: {
      type: String,
      required: false,
    },

    phoneNumber: {
      type: String,
      required: false,
    },

    transactionId: {
      type: String,
      required: true,
    },

    paypayQrCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Payment",
  paymentSchema
);