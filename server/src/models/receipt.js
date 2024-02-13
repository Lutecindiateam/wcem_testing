const mongoose = require("mongoose");

const applySchema = new mongoose.Schema(
  {
    name: {
      type: String,

      required: true,
      trim: true,
    },

    address: {
      type: String,

      required: true,
      trim: true,
    },
    phone: {
      type: Number,

      required: true,
      trim: true,
    },

    amount: {
      type: Number,

      required: true,
      trim: true,
    },
    date: {
      type: String,

      required: true,
      trim: true,
    },
    group_id: {
      type: String,
      trim: true,
    },
    receiver: {
      type: String,
      trim: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("receipt", applySchema);
