const mongoose = require("mongoose");

const CartSchema = mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    variant: {
      type: String,
    },
  },

  { timestamps: true },
);

const Carts = mongoose.model("Carts", CartSchema);

module.exports = Carts;
