const mongoose = require("mongoose");

const applySchema = new mongoose.Schema(
  {
    mandalname: {
      type: String,

      required: true,
      trim: true,
    },

    name: {
      type: String,

      required: true,
      trim: true,
    },

    registration: {
      type: Number,
      trim: true,
    },
    phone: {
      type: Number,
      trim: true,
    },
    address: {
      type: String,

      required: true,
      trim: true,
    },
    pincode: {
      type: Number,

      required: true,
      trim: true,
    },
    email: {
      type: String,

      required: true,
      trim: true,
    },
    password: {
      type: String,

      required: true,
      trim: true,
    },
    active: {
      type: String,

      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("admin", applySchema);
