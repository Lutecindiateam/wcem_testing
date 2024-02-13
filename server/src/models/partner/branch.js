const mongoose = require("mongoose");

const applySchema = new mongoose.Schema(
  {
    course: {
      type: String,
      //   required: true,
      trim: true,
    },
    caste: {
      type: String,
      trim: true
    },
    branch: {
      type: Array,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("branch", applySchema);
