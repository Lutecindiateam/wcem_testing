const upload = require("../../models/partner/upload");

exports.getRejectedApp = async (req, res) => {
  try {
    const response = await upload.find({ rejection: { $ne: null } });
    // console.log(response);
    if (response) {
      return res.status(200).json({
        data: { response },
        status: "success",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal problem" });
  }
};

exports.editReSubmission = async (req, res) => {
  // console.log(req.params);
  try {
    const response = await upload.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          rejection: null,
        },
      },
      { new: true }
    );
    if (response) {
      return res.status(200).json({
        // data: { response },
        status: "success",
        message: "Status Change Successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something Wrong",
    });
  }
};

exports.editEditorRejection = async (req, res) => {
  try {
    const { name, remark } = req.body;
    const response = await upload.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          rejection: "editor",
          rej_name: name,
          rej_remark: remark,
        },
      },
      { new: true }
    );
    if (response) {
      return res.status(200).json({
        // data: { response },
        status: "success",
        message: "Status Change Successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something Wrong",
    });
  }
};

exports.editSecondEditorRejection = async (req, res) => {
  try {
    const { name, remark } = req.body;
    const response = await upload.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          rejection: "admin",
          rej_name: name,
          rej_remark: remark,
        },
      },
      { new: true }
    );
    if (response) {
      return res.status(200).json({
        // data: { response },
        status: "success",
        message: "Status Change Successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something Wrong",
    });
  }
};

exports.editAdminRejection = async (req, res) => {
  try {
    const { name, remark } = req.body;
    const response = await upload.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          rejection: "verify",
          rej_name: name,
          rej_remark: remark,
        },
      },
      { new: true }
    );
    if (response) {
      return res.status(200).json({
        // data: { response },
        status: "success",
        message: "Status Change Successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something Wrong",
    });
  }
};

exports.editAdminVerifyRejection = async (req, res) => {
  try {
    const { name, remark } = req.body;
    const response = await upload.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          rejection: "super",
          rej_name: name,
          rej_remark: remark,
        },
      },
      { new: true }
    );
    if (response) {
      return res.status(200).json({
        // data: { response },
        status: "success",
        message: "Status Change Successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something Wrong",
    });
  }
};

exports.editSuperAdminRejection = async (req, res) => {
  try {
    const { name, remark } = req.body;
    const response = await upload.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          rejection: "true",
          rej_name: name,
          rej_remark: remark,
        },
      },
      { new: true }
    );
    if (response) {
      return res.status(200).json({
        // data: { response },
        status: "success",
        message: "Status Change Successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something Wrong",
    });
  }
};
