const partnerAdmin = require("../../models/partner/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const upload = require("../../models/partner/upload");
const financial = require("../../models/partner/amount");

exports.getPartnerAdminProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await partnerAdmin.findById(id).exec();
    if (response) {
      return res.status(200).json({
        status: "success",
        data: response,
        message: "Admin profile get succesfully",
      });
    }
    // console.log(response);
  } catch (err) {
    return res.status(500).json({ message: "Internal problem" });
  }
};

exports.partnerAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if user exists

    await partnerAdmin.findOne({ email }).then((user) => {
      // console.log(req.body);
      // console.log("EMAIL :: ", user)
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      } else if (user.active == "pending") {
        return res.status(400).json({
          error:
            "Your request is currently pending. Please contact our support team.",
        });
      }

      bcrypt.compare(password, user.password, function (error, isMatch) {
        // console.log("MATCH :: ", isMatch)
        if (isMatch) {
          const payload = {
            id: user.id,
            email: user.email,
          };
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 31556926 },
            (err, token) => {
              return res.status(200).json({
                data: { id: user.id, token: token, role: user.role, value: user.value, name: user.name },
                message: "Sign In success",
                status: "success",
              });
            }
          );
        } else {
          console.error(error);
          return res.status(400).json({ error: "Invalid password" });
        }
      });
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal problem" });
  }
};

exports.getShopsData = async (req, res) => {
  // console.log(req);
  try {
    const response = await upload.find({ rejection: null });
    if (response.length > 0) {
      return res.status(200).json({
        data: { response },
        status: "success",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal problem" });
  }
};

exports.getSpecShopData = async (req, res) => {
  try {
    // const response = await upload.find({ p_id: req.params.id });
    const response = await upload.find({ rejection: null });
    if (response.length > 0) {
      return res.status(200).json({
        data: { response },
        status: "success",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal problem" });
  }
};

exports.getStaffdata = async (req, res) => {
  try {
    const response = await upload.find({ source_id: req.params.id, });
    // const response = await upload.find({ rejection: null });
    if (response.length > 0) {
      return res.status(200).json({
        data: { response },
        status: "success",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal problem" });
  }
};

exports.addIntensive = async (req, res) => {
  try {
    let balance;
    const { adv_payble_amt, paid_amount, cheque_date, cheque_no, adm_id, source_id } = req.body;
    const existing = await financial
      .findOne({ adm_id: adm_id }).limit(1).
      sort({ createdAt: -1 })
      .exec();
    if (existing) {
      balance = existing.balance - paid_amount;
    } else {
      balance = adv_payble_amt - paid_amount;
    }
    const system_date = new Date()
    const student = new financial({
      adv_payble_amt,
      paid_amount,
      cheque_date,
      cheque_no,
      adm_id,
      balance,
      system_date,
      source_id
    });

    const response = await student.save();

    if (response) {
      return res.status(200).json({
        data: { response },
        status: "success",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something Wrong",
    });
  }
};

exports.getfinancial = async (req, res) => {
  // console.log(req.params);
  try {
    const id = req.params.id;
    const response = await financial.find({ adm_id: id });
    if (response) {
      return res.status(200).json({
        status: "success",
        data: response,
        message: "Admin profile get succesfully",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal problem" });
  }
};



//beney paul sir
exports.editEditorStatus = async (req, res) => {
  try {

    const existing = await financial.findOne({ adm_id: req.params.id })
    if (!existing) {
      return res.status(500).json({ message: "Before proceeding with approval, kindly add the incentive. Further actions are currently restricted." })
    }
    const response = await upload.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: "editor"
        },
      },
      { new: true }
    )
    if (response) {
      return res.status(200).json({
        // data: { response },
        status: "success",
        message: "Status Change Successfully"
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something Wrong",
    });
  }
}

//madankar sir
exports.editForAdminStatus = async (req, res) => {
  try {
    const response = await upload.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: "admin"
        },
      },
      { new: true }
    )
    if (response) {
      return res.status(200).json({
        // data: { response },
        status: "success",
        message: "Status Change Successfully"
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something Wrong",
    });
  }
}

//chede sir
exports.editVerifyAdmin = async (req, res) => {
  try {
    const response = await upload.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: "verify"
        },
      },
      { new: true }
    )
    if (response) {
      return res.status(200).json({
        // data: { response },
        status: "success",
        message: "Status Change Successfully"
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something Wrong",
    });
  }
}

//dahikar sir 
exports.editAdminVerify = async (req, res) => {
  try {
    const response = await upload.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: "super"
        },
      },
      { new: true }
    )
    if (response) {
      return res.status(200).json({
        // data: { response },
        status: "success",
        message: "Status Change Successfully"
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something Wrong",
    });
  }
}

//superadmin

exports.editSuperAdmin = async (req, res) => {
  try {
    const response = await upload.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: true
        },
      },
      { new: true }
    )
    if (response) {
      return res.status(200).json({
        // data: { response },
        status: "success",
        message: "Status Change Successfully"
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something Wrong",
    });
  }
}

exports.getSourceWiseAdm = async (req, res) => {
  try {
    const adms = await upload.aggregate([
      {
        $match: { status: "true" } // Filter documents where status is true
      },
      {
        $group: {
          _id: { source_id: '$source_id', source: '$source' },
          total_sourcewiseadm: { $sum: 1 }
        }
      },
      { $sort: { total_sourcewiseadm: -1 } },
      // { $limit: 5 }
    ]);

    const formattedAdms = adms.map(job => ({
      source_id: job._id.source_id,
      source: job._id.source,
      total_sourcewiseadm: job.total_sourcewiseadm
    }));

    return res.json({
      status: 'success',
      message: 'Source Wise Admissions',
      data: formattedAdms
    });
  } catch (err) {
    console.error('Error retrieving data:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}

exports.getStagegraph = async (req, res) => {
  try {
    const id = req.params.id;
    const adms = await upload.aggregate([
      {
        $match: { source_id: id } // Filter documents where status is true
      },
      {
        $group: {
          _id: { source_id: '$source_id', stage: { $ifNull: ['$stage', 'Pending'] } },
          total_stagewise: { $sum: 1 }
        }
      },
      { $sort: { total_stagewise: -1 } },
      // { $limit: 5 }
    ]);

    const formattedAdms = adms.map(job => ({
      source_id: job._id.source_id,
      stage: job._id.stage,
      total_stagewise: job.total_stagewise
    }));

    return res.json({
      status: 'success',
      message: 'Source Wise Admissions',
      data: formattedAdms
    });
  } catch (err) {
    console.error('Error retrieving data:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}

exports.getTotalPaidAmount = async (req, res) => {
  try {
    const id = req.params.id;

    // Get total amount from upload collection
    const total = await upload.aggregate([
      {
        $match: { source_id: id }
      },
      {
        $group: {
          _id: '$source_id',
          totalAmount: { $sum: { $toDouble: '$adv_payble_amt' } }
        }
      }
    ]);

    // Get total paid amount from financial collection
    const adms = await financial.aggregate([
      {
        $match: { source_id: id }
      },
      {
        $group: {
          _id: '$source_id',
          totalPaid: { $sum: { $toDouble: '$paid_amount' } }
        }
      }
    ]);

    // Merge total and adms arrays based on source_id
    const mergedData = total.map(totalItem => {
      const admsItem = adms.find(adm => adm._id === totalItem._id);
      return {
        source_id: totalItem._id,
        totalAmount: totalItem.totalAmount,
        totalPaid: admsItem ? admsItem.totalPaid : 0
      };
    });
    // Send merged data as response
    return res.json({
      status: 'success',
      message: 'Source Wise Admissions',
      data: mergedData
    });
  } catch (err) {
    console.error('Error retrieving data:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};



exports.addStages = async (req, res) => {
  try {
    const { stage } = req.body;
    const response = await upload.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          stage: stage
        },
      },
      { new: true }
    )
    if (response) {
      return res.status(200).json({
        // data: { response },
        status: "success",
        message: "Status Change Successfully"
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something Wrong",
    });
  }
}

exports.getDashboardData = async (req, res) => {
  try {
    // const id = req.params.id;
    const adms = await upload.aggregate([
      {
        $match: { rejection: null } // Filter documents where rejection is not null
      },
      {
        $group: {
          _id: null,
          // count: { $sum: 1 } 
          stage1: { $sum: { $cond: [{ $eq: ["$stage", "Stage1"] }, 1, 0] } },
          stage2: { $sum: { $cond: [{ $eq: ["$stage", "Stage2"] }, 1, 0] } },
          stage3: { $sum: { $cond: [{ $eq: ["$stage", "Stage3"] }, 1, 0] } }
        }
      }
      // { $limit: 5 }
    ]);
    // console.log(adms);
    // return;
    const stages = adms[0];

    return res.json({
      status: 'success',
      message: 'Source Wise Admissions',
      data: stages
    });
  } catch (err) {
    console.error('Error retrieving data:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}

exports.getBranchWiseData = async (req, res) => {
  try {
    const adms = await upload.aggregate([
      {
        $match: { rejection: null } // Filter documents where status is true
      },
      {
        $group: {
          _id: { name: '$course' },
          total_branchwiseadm: { $sum: 1 }
        }
      },
      // { $sort: { total_sourcewiseadm: -1 } },
      // { $limit: 5 }
    ]);
   
    const branches = adms.map(job => ({
      name: job._id.name,
      total_branchwiseadm: job.total_branchwiseadm
    }));

    return res.json({
      status: 'success',
      message: 'Source Wise Admissions',
      data: branches
    });
  } catch (err) {
    console.error('Error retrieving data:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}
