const mongoose = require("mongoose");

const applySchema = new mongoose.Schema(
    {
        mobile: {
            type: String,
            trim: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("otpverify", applySchema);
