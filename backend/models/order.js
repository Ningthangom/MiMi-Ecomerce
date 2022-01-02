const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        count: Number,
        color: String,
      },
    ],
    paymentIntent: {},
    orderType: {
        type: String,
        default: "pay and deliver",
        enum: [
        "pickup order",
         "Cash On Delivery",
         "pay and deliver",
        ],
    },
    orderStatus: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "processing",
      /*   "Cash On Delivery",
        "pickup order", */
        "Dispatched",
        "Cancelled",
        "Completed",  
      ],
    },
    orderdBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);