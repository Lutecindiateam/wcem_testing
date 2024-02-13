const mongoose = require("mongoose");

const applySchema = new mongoose.Schema(
  {
    candidateName: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    parent_mobile: {
      type: String,

      // required: true,
      // trim: true,
    },
    f_mobile: {
      type: String,
    },
    gender: {
      type: String,

      required: true,
      trim: true,
    },
    course: {
      type: String,

      required: true,
      trim: true,
    },
    branch: {
      type: String,

      // required: true,
      // trim: true,
      // default: "NA",
    },
    // amount: {
    //   type: String,
    //   trim: true
    // },
    // fees: {
    //   type: String,
    //   trim: true
    // },
    date_docSubmision: {
      type: String,

      required: true,
      trim: true,
    },
    lastExam_passingYear: {
      type: String,

      required: true,
      trim: true,
    },
    team: {
      type: String,

      required: true,
      trim: true,
    },
    source: {
      type: String,
      // required: true,
      default: "NA",
    },
    entrance_exam: {
      type: String,
      // required: true,
    },
    dtenumber: {
      type: String,
      // required: true,
    },
    capround: {
      type: String,
      // required: true,
    },
    university: {
      type: String,
      // required:true
    },
    erpid: {
      type: String,
      // required: true,
    },
    // otherUniversity: {
    //   type: String,
    //   // required: true,
    // },
    admission_date: {
      type: Date,
      // required: true,
    },
    tution_fees: {
      type: Number,
      // required: true,
    },
    deve_fees: {
      type: Number,
      // required: true,
    },
    category: {
      type: String,
      required: true,
    },
    doc_cap_lett: {
      type: String,
      // required: true,
    },
    stu_rec_fees: {
      type: Number,
      // required: true,
    },
    balance_fees: {
      type: Number,
      // required: true,
    },
    paid_fees: {
      type: Number,
      // required: true,
    },
    total_fees: {
      type: Number,
      // required: true,
    },
    govt_fees: {
      type: Number,
      // required: true,
    },
    discount: {
      type: Number,
      // required: true,
    },
    student_fees: {
      type: Number,
      // required: true,
    },
    p_id: {
      type: String,
      // required: true,
    },
    documents: {
      adhar: { type: String, default: null },
      photo: { type: String, default: null },
      sign: { type: String, default: null },
      tc: { type: String, default: null },
      tenth: { type: String, default: null },
      twelfth: { type: String, default: null },
      caste: { type: String, default: null },
      ncl: { type: String, default: null },
      domicile: { type: String, default: null },

      csv: {
        type: String,
        default: null,
      },

      cet: { type: String, default: null },
      other: { type: String, default: null },
      other2: { type: String, default: null },
      other3: { type: String, default: null },
      migration: { type: String, default: null },
      deploma: { type: String, default: null },
      allotment: { type: String, default: null },
    },
    adv_payble_amt: {
      type: String,
      // required: true,
    },
    cheque_date: {
      type: String,
    },
    cheque_no: {
      type: String,
      trim: true
    },
    paid_amount: {
      type: String,
      trim: true
      // required: true,
    },
    balance: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      default: false,
    },
    source_id: {
      type: String,
    },
    rejection: {
      type: String,
      default: null,
    },
    rej_name: {
      type: String,
      default: null,
    },
    rej_remark: {
      type: String,
    },
    required: {
      type: String,
      default: "Not Present"
    }
  },

  { timestamps: true }
);

module.exports = mongoose.model("upload", applySchema);
