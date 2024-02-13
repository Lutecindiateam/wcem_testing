const mongoose = require("mongoose");

const applySchema = new mongoose.Schema(
    {
        adm_id: {
            type: String,
            //   required: true,
            trim: true,
        },
        adv_payble_amt: {
            type: String,
            trim: true
        },
        paid_amount: {
            type: String,
        },
        cheque_date: {
            type: String
        },
        cheque_no: {
            type: String,
            trim: true
        },
        balance: {
            type: String,
            trim: true
        },
        source_id: {
            type: String,
            trim: true
        },
        system_date:{
            type: String
        }
    },

    { timestamps: true }
);

module.exports = mongoose.model("financial", applySchema);
