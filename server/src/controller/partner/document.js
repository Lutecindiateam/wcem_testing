const upload = require("../../models/partner/upload");

exports.uploadDocument = async (req, res) => {
  try {
    const response = await upload.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          [`documents.${req.body.name}`]: req.body.file,
        },
      },
      { new: true }
    );
    // console.log(response);
    if (response) {
      return res.status(200).json({
        status: "success",
        data: response.documents,
        message: "uploaded successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: "something wrong" });
  }
};

exports.getDocument = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await upload.findById(id);
    if (response) {
      return res.status(200).json({
        status: "success",
        data: response,
        message: "document get successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: "something wrong" });
  }
};

exports.editRequiredDoc = async (req, res) => {
  try {
    const { data } = req.body;
    const response = await upload.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          required: data,
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
}