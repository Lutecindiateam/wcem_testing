const receipt = require("../models/receipt");

exports.submit_form = async (req, res) => {
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  try {
    const save = await receipt.findOne({
      name: req.body.name,
      group_id: req.body.group_id,
    });
    if (save)
      return res.status(400).json({
        message: "User name receipt already present",
      });
    const { name, address, amount, phone, group_id, receiver } = req.body;

    const candidate = new receipt({
      date,
      name,
      address,
      phone,
      amount,
      group_id,
      receiver,
    });

    const saved = await candidate.save();
    return res.status(201).json({
      data: saved,
      status: "success",
      message: "Receipt Saved Successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getallusers = async (req, res) => {
  // console.log(req.params);
  try {
    const allusers = await receipt
      .find({ group_id: req.params.id })
      .sort({ createdAt: -1 });
    return res.status(201).json({
      data: allusers,
      status: "success",
      message: "candidate get successfully",
      count: allusers.length,
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.getsingleusers = async (req, res) => {
  // console.log(req.params);
  try {
    const singleusers = await receipt.findById(req.params.id);
    //  console.log(singleusers);
    return res.status(201).json({
      data: singleusers,
      status: "success",
      message: "candidate get successfully",
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.getallinfo = async (req, res) => {
  // console.log(req.params);
  try {
    const allinfo = await receipt.find();
    // console.log(allinfo);
    return res.status(201).json({
      allinfo,
      // status:"success",
      // message:"candidate get successfully",
      // count: allusers.length
    });
  } catch (err) {
    console.log(err.message);
  }
};
