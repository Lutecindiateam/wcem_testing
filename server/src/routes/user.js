const express = require("express");
const {
  create_user_account,
  authenticate_user,
  UserForgetPass,
} = require("../controller/user");
const {
  create_admin_account,
  authenticate_admin,
  getallmandals,
  user_management,
  update,
  forgetPass,
  getprofile,
} = require("../controller/admin");
const {
  submit_form,
  getallusers,
  getsingleusers,
  getallinfo,
} = require("../controller/receipt");
const {
  uploadProductsFromCSV,
  uploadShopData,
  getEditorAdmission,
  getaAgentSource,
} = require("../controller/partner/partnerupload");
const multer = require("multer");
const path = require("path");
const {
  authenticate_partner,
  forget_partner,
  create_partner_account,
  admin_action,
  adminupdate,
  getPartnerProfile,
  authenticate_agent,
  agentProfile,
  getAgentStudent,
  getAgent,
  editResetPass,
} = require("../controller/partner/partner");
const {
  getShopsData,
  getSpecShopData,
  partnerAdminLogin,
  getPartnerAdminProfile,
  addIntensive,
  editEditorStatus,
  editForAdminStatus,
  editVerifyAdmin,
  editSuperAdmin,
  editAdminVerify,
  getfinancial,
  getSourceWiseAdm,
  addStages,
  getStaffdata,
  getStagegraph,
  getTotalPaidAmount,
  getDashboardData,
  getBranchWiseData,
} = require("../controller/partner/admin");
const { requireSignin } = require("../common-middleware");
const {
  uploadDocument,
  getDocument,
  editRequiredDoc,
} = require("../controller/partner/document");
const {
  getRejectedApp,
  editEditorRejection,
  editSecondEditorRejection,
  editAdminRejection,
  editAdminVerifyRejection,
  editSuperAdminRejection,
  editReSubmission,
} = require("../controller/partner/reject");
const { AddAmount, getBranchData } = require("../controller/partner/amount");
const { sendOtp, verifyOtp, resendCandidateOtp, resendParentOtp } = require("../controller/partner/otp");

const router = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const {branch, course} = req.body;
//     // if (file.fieldname === "files") {
//     // console.log(req.body);
//     cb(
//       null,
//       path.join(
//         path.dirname(__dirname),
//         `WCEM-2024-2025/${course}/${branch}`
//         // "wcem_document/department/year/document"
//       )
//     );
//     //   } else {
//     //     cb(null, path.join(path.dirname(__dirname), "uploads"));
//     //   }
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

//Temporary Update

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/create_user_account", create_user_account);
router.post("/authenticate_user", authenticate_user);
router.post("/create_admin_account", create_admin_account);
router.post("/authenticate_admin", authenticate_admin);
router.post("/user_management", user_management);
router.post("/submit", submit_form);
router.get("/getallusers/:id", getallusers);
router.get("/getsingleusers/:id", getsingleusers);
router.patch("/update/:id", update);
// router.put('/update_user_metadata',  update_user_metadata);
router.get("/getallmandals", getallmandals);
router.get("/getallinfo", getallinfo);
router.patch("/forget_pass", forgetPass);
router.patch("/user/forget_pass", UserForgetPass);
router.post("/getprofile", getprofile);
// router.get("/getrecords",getRecords)
// http://localhost:5000/api/getallinfo/userData
router.post("/authenticate_partner", authenticate_partner);
router.post("/create_partner_account", create_partner_account);
router.patch("/forget_partner", forget_partner);
//API for partner
router.post("/partner/admin/login", partnerAdminLogin);
router.get("/adminaction", admin_action);
router.post(
  "/shopData",
  requireSignin,
  upload.array("allDocument"),
  uploadShopData
);
router.post(
  "/upload-csv/:id",
  requireSignin,
  upload.single("csvFile"),
  uploadProductsFromCSV
);
router.patch("/adminupdate/:id", adminupdate);
router.get("/admin/allShops", getShopsData);
router.get("/specific/shopData/:id", getSpecShopData);
router.get("/partner/admin/profile/:id", getPartnerAdminProfile);
router.get("/profile/:id", getPartnerProfile);

// router.post("/upload", upload.single("files"), uploadDocument);
router.patch("/employer/:id", upload.single("file"), uploadDocument);
router.get("/employer/:id", getDocument);
router.get("/editor/getadmission/:id", getEditorAdmission);
// router.patch("/admin/addincentive/:id", upload.none(), addIntensive);
router.post("/add/amount", upload.none(), addIntensive);
router.patch("/admin/editEditorStatus/:id", editEditorStatus);
router.patch("/admin/forAdminEdit/:id", editForAdminStatus);
router.patch("/admin/editVerifyAdmin/:id", editVerifyAdmin);
router.patch("/admin/editSecondLast/:id", editAdminVerify);
router.patch("/admin/editSuperAdmin/:id", editSuperAdmin);
router.patch("/admin/editEditor1Rejection/:id", editEditorRejection);
router.patch("/admin/editEditorRejection/:id", editSecondEditorRejection);
router.patch("/admin/editAdminRejection/:id", editAdminRejection);
router.patch("/admin/editAdminVerifyRejection/:id", editAdminVerifyRejection);
router.patch("/admin/editSuperRejection/:id", editSuperAdminRejection);
router.patch("/admin/editResubmission/:id", editReSubmission);
router.patch("/edit/reSubmission/:id", editReSubmission)
router.get("/clerk/rejApplication", getRejectedApp)
router.get("/upload/getSource/:id", getaAgentSource);
router.post("/agent/login", authenticate_agent);
router.get("/agent/profile/:id", agentProfile);
router.get("/agent/getstudent/:id", getAgentStudent);
router.get("/admin/reject", getRejectedApp);
router.get("/pass/reset", getAgent);
router.patch("/reset/:id", upload.none(), editResetPass);
router.post("/add/amount", AddAmount);
router.get("/branch/data/", getBranchData);
router.get("/get/financial/:id", getfinancial);
router.get("/admin/sourcewiseadm", getSourceWiseAdm);
router.patch("/clerk/required/:id", editRequiredDoc);
router.post("/add/stages/:id", addStages);
router.get("/staff/amount/:id", getfinancial);
router.get("/staff/applications/:id", getStaffdata);
router.get("/stage/graph/:id", getStagegraph);
router.get("/amoun/graph/:id", getTotalPaidAmount);
router.get("/dashboard/data", getDashboardData)
router.get("/admin/branch/data", getBranchWiseData);

router.post("/send/otp/", sendOtp);
router.post("/verify/otp/", verifyOtp);
router.post("/resend", resendCandidateOtp);

module.exports = router;  
