const branch = require("../../models/partner/branch");

exports.AddAmount = async (req, res) => {
    try {
        const response = await branch.create(req.body);
        return res.status(200).json({ response })
    } catch (err) {
        return res.status(500).json({ message: "Internal Problem" })
    }
}

exports.getBranchData = async(req, res) => {
    try {
        const response = await branch.find();
        // console.log(response);
        if (response) {
            return res.status(200).json({
                data: { response },
                status: "success",
            });
        }
        // console.log(req.params);
    } catch (err) {
        return res.status(500).json({
            message: "Something Wrong",
        });
    }
}