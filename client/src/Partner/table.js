import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Menu, Segmented, Table, Input } from "antd";
import { useEffect } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  requestAdminMonthJob,
  requestAdminCompanyDetails,
  requestAdminEditSize,
  requestGetCandidate,
  requestGetApplyJob,
  requestAdminEditDegree,
  requestAdminEditFunctional,
  requestAdminEditIndustry,
  requestAdminEditCategory,
  requestAdminEditTag,
  requestGetInterview,
  requestAdminEditShift,
  requestAdminEditOwner,
  requestAdminEditType,
  requestAdminEditCurrency,
  requestAdminEditSkill,
  requestAdminAddDegree,
  requestAdminCompanyJob,
  requestAdminFunctionalCandidate
} from "../Redux/actions";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import Layout from "./Layout";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Amt_Table from "./AmountTable";
// import { Input } from "@material-ui/core";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxHeight: "90vh", // Set maximum height to 90% of the viewport height
  overflowY: "auto", // Enable vertical scrolling if content exceeds the height
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DetailsModal = ({
  id,
  open,
  handleClose,
  data,
  onChangeData,
  list,
  setData,
  user,
  onSubmit,
  balance_money
}) => {
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    // Check if all three input values are present
    const areAllInputsFilled =
      data.adv_payble_amt !== undefined &&
      data.paid_amount !== undefined &&
      data.cheque_no !== undefined &&
      data.cheque_date !== undefined;
    // data.balance !== undefined;

    // Update the state based on the condition
    setSubmitDisabled(!areAllInputsFilled);
  }, [data.adv_payble_amt, data.paid_amount, data.cheque_no, data.cheque_date]);

  useEffect(() => {
    if (id) {
      const selectedItem = list.find((item) => item._id === id);
      setData(selectedItem || {});
    }
  }, [id, list]);

  const submitProductForm = () => {
    onSubmit(data);
    data.paid_amount = undefined;
    data.cheque_no = undefined;
    data.cheque_date = undefined;
    // handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onSubmit={submitProductForm}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Student Admission Details
        </Typography>
        <div>
          <label htmlFor="candidateName">Name:</label>
          <Input
            id="candidateName"
            name="candidateName"
            value={data.candidateName}
            placeholder={`Product Name`}
          // onChange={onChangeData}
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <Input
            label="NA"
            id="category"
            name="category"
            value={data.category}
            placeholder={`NA`}
          // onChange={onChangeData}
          />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <Input
            label="NA"
            id="gender"
            name="gender"
            value={data.gender}
            placeholder={`NA`}
          // onChange={onChangeData}
          />
        </div>
        <div>
          <label htmlFor="course">Course:</label>
          <Input
            label="NA"
            id="course"
            name="course"
            value={data.course}
            placeholder={`NA`}
          // onChange={onChangeData}
          />
        </div>
        <div>
          <label htmlFor="branch">Branch:</label>
          <Input
            label="NA"
            id="branch"
            name="branch"
            value={data.branch}
            placeholder={`NA`}
          // onChange={onChangeData}
          />
        </div>
        <div>
          <label htmlFor="mobile">Mobile:</label>
          <Input
            label="NA"
            id="mobile"
            name="mobile"
            value={data.mobile}
            placeholder="Mobile"
          // onChange={onChangeData}
          />
        </div>
        <div>
          <label htmlFor="parent_mobile">Parent Mobile:</label>
          <Input
            label="NA"
            id="parent_mobile"
            name="parent_mobile"
            value={data.parent_mobile}
            placeholder="Not Present"
          // onChange={onChangeData}
          />
        </div>
        <div>
          <label htmlFor="f_mobile">Family Mobile:</label>
          <Input
            label="NA"
            id="f_mobile"
            name="f_mobile"
            value={data.f_mobile}
            placeholder="Not Present"
          // onChange={onChangeData}
          />
        </div>
        <div>
          <label htmlFor="date_docSubmision">
            Date of Document Submission:
          </label>
          <Input
            label="NA"
            id="date_docSubmision"
            name="date_docSubmision"
            value={data.date_docSubmision}
            placeholder={`NA`}
          // onChange={onChangeData}
          />
        </div>
        <div>
          <label htmlFor="lastExam_passingYear">Last Exam Passing Year:</label>
          <Input
            label="NA"
            id="lastExam_passingYear"
            name="lastExam_passingYear"
            value={data.lastExam_passingYear}
            placeholder={`NA`}
          // onChange={onChangeData}
          />
        </div>
        <div>
          <label htmlFor="team">Team/Staff:</label>
          <Input
            label="NA"
            id="team"
            name="team"
            value={data.team}
            placeholder={`NA`}
          // onChange={onChangeData}
          />
        </div>
        <div>
          <label htmlFor="source">Source:</label>
          <Input
            label="NA"
            id="source"
            name="source"
            value={data.source}
            placeholder={`NA`}
          // onChange={onChangeData}
          />
        </div>
        <div>
          <label htmlFor="required">Required Document:</label>
          <Input
            label="NA"
            id="required"
            name="required"
            value={data.required}
            placeholder={`NA`}
          // onChange={onChangeData}
          />
        </div>
        <br />
        {user.role === "editor" && user.value === true
          // || user.role === "admin" || user.role === "superadmin"
          ? (
            <>
              <div>
                <Typography variant="h5" component="h2" style={{ display: "flex", justifyContent: "center" }}>
                  Add Incentive
                </Typography>
                <div>
                  <label htmlFor="source">Advance Payable Amount:</label>
                  <Input
                    label="NA"
                    id="adv_payble_amt"
                    name="adv_payble_amt"
                    value={data.adv_payble_amt}
                    placeholder="Enter Advance Payable Amountt"
                  // onChange={onChangeData}
                  />
                </div>
                <div>
                  <label htmlFor="source">Paid Amount:</label>
                  <Input
                    label="NA"
                    type="number"
                    id="paid_amount"
                    name="paid_amount"
                    value={data.paid_amount}
                    placeholder="Enter Paid Amount"
                    onChange={user.role === "editor" ? onChangeData : undefined}
                  />
                </div>
                <div>
                  <label htmlFor="source">Cheque Number:</label>
                  <Input
                    label="NA"
                    id="cheque_no"
                    name="cheque_no"
                    value={data?.cheque_no?.toUpperCase() || ''}
                    placeholder="Enter Cheque Number"
                    onChange={user.role === "editor" ? onChangeData : undefined}
                  />
                </div>
                <div>
                  <label htmlFor="source">Cheque Date:</label>
                  <Input
                    label="NA"
                    type="date"
                    id="cheque_date"
                    name="cheque_date"
                    value={data.cheque_date}
                    placeholder="Enter Cheque Date"
                    onChange={user.role === "editor" ? onChangeData : undefined}
                  />
                </div>
                {/* <br />
                <h6>*Current Balance :  ₹ {balance_money ? (balance_money) : (data.adv_payble_amt)} /-</h6> */}
                <br />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    onClick={submitProductForm}
                    disabled={isSubmitDisabled}

                  >
                    Save Incentive
                  </Button>
                </div>
              </div>
              <br />
            </>
          ) : null}
        {user.role === "editor" || user.role === "admin" || user.role === "superadmin" ? (
          <div>
            <h6>*Current Balance :  ₹ {balance_money || balance_money === 0 ? (balance_money) : (data.adv_payble_amt)} /-</h6>
            <br />
            <Amt_Table id={id} />
          </div>
        ) : (null)
        }
      </Box>
    </Modal>
  );
};
const TableData = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [id, setId] = useState(null);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState({});
  const [list, setList] = useState([]);
  const [status, setStatus] = useState("true");
  const [open, setOpen] = React.useState(false);
  const [editorStatus, setEditorStatus] = useState(null);
  const [amount, setAmount] = useState([]);
  const newArray = list.filter((item) => item.status === "editor");

  const balance_money = amount.length > 0 && parseInt(amount[amount.length - 1]?.balance);
  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setId(null);
    setOpen(false);
    props.data.functionalCanditateData = undefined;
  };

  useEffect(() => {
    let functionalCanditateData = props.data.functionalCanditateData;
    if (functionalCanditateData !== undefined) {
      if (functionalCanditateData?.data?.status === "success") {
        setAmount(functionalCanditateData.data.data);
      }
    }
  }, [props.data.functionalCanditateData])


  function onChangeData(e) {

    if (parseFloat(e.target.value) < 0) {
      // Display an error message to the user
      alert("Please enter a positive number.");
      return; // Exit the function early
    }

    if (e.target.type === "radio") {
      setData((data) => ({
        ...data,
        [e.target.name]: parseInt(e.target.value),
      }));
    } else {
      setData((data) => ({
        ...data,
        [e.target.name]: e.target.value,
      }));
    }
  }
  const handleApproval = (AdmId) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to proceed with the approval?"
    );
    if (userConfirmed) {
      props.requestAdminEditDegree({
        id: AdmId,
        token: user.token,
      });
    } else {
      console.log("User canceled the action.");
    }
  };

  const handleEditorApproval = (EditID) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to proceed with the approval?"
    );
    if (userConfirmed) {
      props.requestAdminEditFunctional({
        id: EditID,
        token: user.token,
      });
    } else {
      console.log("User canceled the action.");
    }
  };

  const handleEditVerify = (verifyId) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to proceed with the approval?"
    );
    if (userConfirmed) {
      props.requestAdminEditIndustry({
        id: verifyId,
        token: user.token,
      });
    } else {
      console.log("User canceled the action.");
    }
  };

  const handleFinalEdit = (FinalId) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to proceed with the approval?"
    );
    if (userConfirmed) {
      props.requestAdminEditCategory({
        id: FinalId,
        token: user.token,
      });
    } else {
      console.log("User canceled the action.");
    }
  };

  const handleSuperAdminEdit = (sid) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to proceed with the approval?"
    );
    if (userConfirmed) {
      props.requestAdminEditTag({
        id: sid,
        token: user.token,
      });
    } else {
      console.log("User canceled the action.");
    }
  };

  // console.log(user);
  const handleRejection = (id) => {
    const remark = window.prompt("Enter a remark for rejection:");

    // Check if the user clicked "OK" and provided a remark
    if (remark !== null) {
      const userConfirmed = window.confirm(
        "Are you sure you want to proceed with the rejection?"
      );

      if (userConfirmed) {
        props.requestAdminEditShift({
          id: id,
          token: user.token,
          name: user.name,
          remark: remark, // Include the remark in the request
        });
      } else {
        console.log("User canceled the action.");
      }
    } else {
      console.log("User canceled or did not provide a remark.");
    }
  };

  const handleEditorRejection = (id) => {
    const remark = window.prompt("Enter a remark for rejection:");

    // Check if the user clicked "OK" and provided a remark
    if (remark !== null) {
      const userConfirmed = window.confirm(
        "Are you sure you want to proceed with the rejection?"
      );

      if (userConfirmed) {
        props.requestAdminEditOwner({
          id: id,
          token: user.token,
          name: user.name,
          remark: remark, // Include the remark in the request
        });
      } else {
        console.log("User canceled the action.");
      }
    } else {
      console.log("User canceled or did not provide a remark.");
    }
  };

  const handleAdminRejection = (id) => {
    const remark = window.prompt("Enter a remark for rejection:");

    // Check if the user clicked "OK" and provided a remark
    if (remark !== null) {
      const userConfirmed = window.confirm(
        "Are you sure you want to proceed with the rejection?"
      );

      if (userConfirmed) {
        props.requestAdminEditType({
          id: id,
          token: user.token,
          name: user.name,
          remark: remark, // Include the remark in the request
        });
      } else {
        console.log("User canceled the action.");
      }
    } else {
      console.log("User canceled or did not provide a remark.");
    }
  };

  const handleAdminVerifyRejection = (id) => {
    const remark = window.prompt("Enter a remark for rejection:");

    // Check if the user clicked "OK" and provided a remark
    if (remark !== null) {
      const userConfirmed = window.confirm(
        "Are you sure you want to proceed with the rejection?"
      );

      if (userConfirmed) {
        props.requestAdminEditCurrency({
          id: id,
          token: user.token,
          name: user.name,
          remark: remark, // Include the remark in the request
        });
      } else {
        console.log("User canceled the action.");
      }
    } else {
      console.log("User canceled or did not provide a remark.");
    }
  };

  const handleSuperRejection = (id) => {
    const remark = window.prompt("Enter a remark for rejection:");

    // Check if the user clicked "OK" and provided a remark
    if (remark !== null) {
      const userConfirmed = window.confirm(
        "Are you sure you want to proceed with the rejection?"
      );

      if (userConfirmed) {
        props.requestAdminEditSkill({
          id: id,
          token: user.token,
          name: user.name,
          remark: remark, // Include the remark in the request
        });
      } else {
        console.log("User canceled the action.");
      }
    } else {
      console.log("User canceled or did not provide a remark.");
    }
  };

  //Edit Rejection data for super admin
  useEffect(() => {
    let editSkillData = props.data.editSkillData;
    if (editSkillData !== undefined) {
      if (editSkillData?.data?.status == "success") {
        Swal.fire("Successful!", "Rejection Successfull.", "success");
        props.data.editSkillData = undefined;
      }
    }
  }, [props.data.editSkillData]);

  //Edit Rejection data for second admin
  useEffect(() => {
    let editCurrencyData = props.data.editCurrencyData;
    if (editCurrencyData !== undefined) {
      if (editCurrencyData?.data?.status == "success") {
        Swal.fire("Successful!", "Rejection Successfull.", "success");
        props.data.editCurrencyData = undefined;
      }
    }
  }, [props.data.editCurrencyData]);

  //Edit Rejction data for first admin
  useEffect(() => {
    let editTypeData = props.data.editTypeData;
    if (editTypeData !== undefined) {
      if (editTypeData?.data?.status == "success") {
        Swal.fire("Successful!", "Rejection Successfull.", "success");
        props.data.editTypeData = undefined;
      }
    }
  }, [props.data.editTypeData]);

  useEffect(() => {
    let editOwnerData = props.data.editOwnerData;
    if (editOwnerData !== undefined) {
      if (editOwnerData?.data?.status == "success") {
        Swal.fire("Successful!", "Rejection Successfull.", "success");
        props.data.editOwnerData = undefined;
      }
    }
  }, [props.data.editOwnerData]);

  useEffect(() => {
    let editShiftData = props.data.editShiftData;
    if (editShiftData !== undefined) {
      if (editShiftData?.data?.status == "success") {
        Swal.fire("Successful!", "Rejection Successfull.", "success");
        props.data.editShiftData = undefined;
      }
    }
  }, [props.data.editShiftData]);

  useEffect(() => {
    let editDegreeData = props.data.editDegreeData;
    if (editDegreeData !== undefined) {
      if (editDegreeData?.data?.status == "success") {
        Swal.fire("Successful!", "Approved Successfully.", "success");
        props.data.editDegreeData = undefined;
      } else {
        alert(editDegreeData?.data?.message)
      }
    }
  }, [props.data.editDegreeData]);

  useEffect(() => {
    let editIndustryData = props.data.editIndustryData;
    if (editIndustryData !== undefined) {
      if (editIndustryData?.data?.status == "success") {
        Swal.fire("Successful!", "Approved Successfully.", "success");
        props.data.editIndustryData = undefined;
      }
    }
  }, [props.data.editIndustryData]);

  useEffect(() => {
    let editCategoryData = props.data.editCategoryData;
    if (editCategoryData !== undefined) {
      if (editCategoryData?.data?.status == "success") {
        Swal.fire("Successful!", "Approved Successfully.", "success");
        props.data.editCategoryData = undefined;
      }
    }
  }, [props.data.editCategoryData]);

  useEffect(() => {
    let editTagData = props.data.editTagData;
    if (editTagData !== undefined) {
      if (editTagData?.data?.status == "success") {
        Swal.fire("Successful!", "Approved Successfully.", "success");
        props.data.editTagData = undefined;
      }
    }
  }, [props.data.editTagData]);

  useEffect(() => {
    let editFunctionalData = props.data.editFunctionalData;
    if (editFunctionalData !== undefined) {
      if (editFunctionalData?.data?.status == "success") {
        Swal.fire("Successful!", "Approved Successfully.", "success");
        props.data.editFunctionalData = undefined;
      }
    }
  }, [props.data.editFunctionalData]);

  const onSubmit = (values) => {
    // Handle form submission here
    let form = new FormData();
    form.append("adv_payble_amt", values.adv_payble_amt);

    if (balance_money === 0) {
      alert("Account balance is zero.")
      return;
    } else if (balance_money >= parseInt(values.paid_amount)) {
      form.append("paid_amount", values.paid_amount);
    } else if (amount.length === 0 && parseInt(values.adv_payble_amt) >= parseInt(values.paid_amount)) {
      form.append("paid_amount", values.paid_amount);
    } else {
      alert("Paid amount should not exceed total incentive/balance incentive.")
      // Swal.fire("Error!", "Paid Amount Should not be more than Total incentive/Balance incentive.", "error");
      return;
    }
    // form.append("balance", values.balance || values.adv_payble_amt - values.paid_amount);
    form.append("cheque_date", values.cheque_date);
    form.append("cheque_no", values.cheque_no);
    form.append("adm_id", id);
    // console.log("Form submitted with data:", formData);
    // You can dispatch an action or perform any other logic
    // console.log(id);
    props.requestAdminAddDegree({
      data: form
      // id: id,
    });

    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
  };

  useEffect(() => {
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        props.requestGetCandidate({
          id: loginData.data.data.id,
          role: loginData.data.data.role,
          token: loginData.data.data.token,
        });
      }
    }
  }, []);

  useEffect(() => {
    let addDegreeData = props.data.addDegreeData;
    if (addDegreeData !== undefined) {
      if (addDegreeData?.data?.status == "success") {
        alert("Incentive Added Successfully.")
        props.requestAdminFunctionalCandidate({
          id: addDegreeData.data.data.response.adm_id,
          // token: loginData.data.data.token,
        });
        // Swal.fire("Good job!", "Incentive Added Successfully.", "success");
        props.data.addDegreeData = undefined;
        // handleClose();
      }
    }
  }, [props.data.addDegreeData]);

  useEffect(() => {
    let empLoginData = props.employee.empLoginData;
    if (empLoginData !== undefined) {
      if (empLoginData?.data?.status == "success") {
        setUser(empLoginData.data.data);
        props.requestGetInterview({
          id: empLoginData.data.data.id,
          role: empLoginData.data.data.role,
          token: empLoginData.data.data.token,
        });
      }
    }
  }, []);

  useEffect(() => {
    let loginData = props.data.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        if (
          loginData?.data?.data.role === "admin" ||
          loginData.data.data.role === "editor" ||
          loginData.data.data.role === "superadmin"
        ) {
          setUser(loginData.data.data);
          props.requestAdminMonthJob({
            token: loginData.data.data.token,
          });
        }
      }
    }
  }, [
    props.data.loginData,
    props.data.editSizeData,
    props.data.editDegreeData,
    props.data.editIndustryData,
    props.data.editCategoryData,
    props.data.editTagData,
    props.data.editFunctionalData,
    props.data.editShiftData,
    props.data.editOwnerData,
    props.data.editTypeData,
    props.data.editCurrencyData,
    props.data.editSkillData,
  ]);

  useEffect(() => {
    let getInterviewData = props.employee.getInterviewData;
    // console.log(getCandidateData);
    if (getInterviewData !== undefined) {
      if (getInterviewData?.data?.status === "success") {
        setList(getInterviewData.data.data.response);
      }
    }
  }, [props.employee.getInterviewData, props.data.loginData]);

  useEffect(() => {
    let getCandidateData = props.candidate.getCandidateData;
    // console.log(getCandidateData);
    if (getCandidateData !== undefined) {
      if (getCandidateData?.data?.status === "success") {
        setList(getCandidateData.data.data.response);
      }
    }
  }, [props.candidate.getCandidateData, props.data.loginData]);

  //Admin api
  useEffect(() => {
    let monthWiseJobData = props.data.monthWiseJobData;
    if (monthWiseJobData !== undefined) {
      if (monthWiseJobData?.data?.status == "success") {
        setList(monthWiseJobData.data.data.response);
      }
    }
  }, [props.data.monthWiseJobData, props.data.loginData]);

  // //for editor all admission
  //   useEffect(() => {
  //     let getApplyJobData = props.candidate.getApplyJobData;
  //     // console.log(getCandidateData);
  //     if (getApplyJobData !== undefined) {
  //       if (getApplyJobData?.data?.status === "success") {
  //         setList(getApplyJobData.data.data.response);
  //       }
  //     }
  //   }, [props?.candidate?.getApplyJobData]);

  // console.log(list);
  useEffect(() => {
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status === "success") {
        setUser(loginData.data.data);
      }
    }
  }, [props.candidate.loginData]);
  // console.log(user);
  // const columns = [
  //   { field: "id", headerName: "Sr.No.", width: 100 },
  //   { field: "candidateName", headerName: "Candidate Name", flex: 1 },
  //   { field: "source", headerName: "Source", flex: 1 },
  //   // { field: "documents", headerName: "Documets", flex: 1 },
  //   { field: "branch", headerName: "Branch", flex: 1 },
  //   {
  //     field: "documentView",
  //     headerName: "Document View",
  //     flex: 1,
  //     renderCell: (params) => (
  //       <Link
  //         to={`/doc/${params.row.document.branch}/${params.row.document.id}`}
  //         style={{ textDecoration: "none" }}
  //       >
  //         {/* You can use any icon component for document view */}
  //         <span role="img" aria-label="View Documents">
  //           📄 View
  //         </span>
  //       </Link>
  //     ),
  //   },
  //   {
  //     field: "more",
  //     headerName: "Details",
  //     flex: 1,
  //     renderCell: (params) => (
  //       <Button onClick={() => handleOpen(params.row.document.id)}>
  //         More Details..
  //       </Button>
  //     ),
  //   },
  //   user.role === "editor" &&
  //     user.value === true && {
  //       field: "approval",
  //       headerName: "Approval",
  //       flex: 1,
  //       renderCell: (params) =>
  //         params.row.approval.status === "false" ? (
  //           <Button
  //             variant="contained"
  //             onClick={() => handleApproval(params.row.approval.id)}
  //           >
  //             Approve
  //           </Button>
  //         ) : (
  //           <Button
  //             variant="contained"
  //             color="primary" // or "success" depending on your theme
  //             disabled={true}
  //           >
  //             Approved
  //           </Button>
  //         ),
  //     },
  // user.role === "editor" &&
  //   user.value === false && {
  //     field: "approve",
  //     headerName: "Approval",
  //     flex: 1,
  //     renderCell: (params) =>
  //       params.row.approval.status === "false" ? (
  //         <Button
  //           variant="contained"
  //           color="info" // or "success" depending on your theme
  //           disabled={true}
  //         >
  //           Waiting
  //         </Button>
  //       ) : params.row.approval.status === "editor" ? (
  //         <Button
  //           variant="contained"
  //           onClick={() => handleEditorApproval(params.row.approval.id)}
  //         >
  //           Approve
  //         </Button>
  //       ) : (
  //         <Button
  //           variant="contained"
  //           disabled={true}
  //           // onClick={() => handleApproval(params.row.approval.id)}
  //         >
  //           Approved
  //         </Button>
  //       ),
  //   },
  // user.role === "admin" &&
  //   user.value === true && {
  //     field: "adminapproval",
  //     headerName: "Approval",
  //     flex: 1,
  //     renderCell: (params) =>
  //       params.row.approval.status === "false" ? (
  //         <Button
  //           variant="contained"
  //           color="info" // or "success" depending on your theme
  //           disabled={true}
  //         >
  //           Waiting
  //         </Button>
  //       ) : params.row.approval.status === "editor" ? (
  //         <Button
  //           variant="contained"
  //           disabled={true}
  //           // onClick={() => handleApproval(params.row.approval.id)}
  //         >
  //           Waiting
  //         </Button>
  //       ) : params.row.approval.status === "admin" ? (
  //         <Button
  //           variant="contained"
  //           onClick={() => handleEditVerify(params.row.adminapproval.id)}
  //         >
  //           Approve
  //         </Button>
  //       ) : (
  //         <Button
  //           variant="contained"
  //           disabled={true}
  //           // onClick={() => handleEditorApproval(params.row.adminapproval.id)}
  //         >
  //           Approved
  //         </Button>
  //       ),
  //   },
  //   user.role === "admin" &&
  //     user.value === false && {
  //       field: "adminverify",
  //       headerName: "Approval",
  //       flex: 1,
  //       renderCell: (params) =>
  //         params.row.approval.status === "false" ? (
  //           <Button
  //             variant="contained"
  //             color="info" // or "success" depending on your theme
  //             disabled={true}
  //           >
  //             Waiting
  //           </Button>
  //         ) : params.row.approval.status === "editor" ? (
  //           <Button
  //             variant="contained"
  //             disabled={true}
  //             // onClick={() => handleApproval(params.row.approval.id)}
  //           >
  //             Waiting
  //           </Button>
  //         ) : params.row.approval.status === "admin" ? (
  //           <Button
  //             variant="contained"
  //             disabled={true}
  //             // onClick={() => handleEditorApproval(params.row.adminapproval.id)}
  //           >
  //             Waiting
  //           </Button>
  //         ) : params.row.approval.status === "verify" ? (
  //           <Button
  //             variant="contained"
  //             onClick={() => handleFinalEdit(params.row.adminverify.id)}
  //           >
  //             Approve
  //           </Button>
  //         ) : (
  //           <Button variant="contained" disabled={true}>
  //             Approved
  //           </Button>
  //         ),
  //     },

  // user.role === "superadmin" &&
  //   user.value === true && {
  //     field: "superadmin",
  //     headerName: "Approval",
  //     flex: 1,
  //     renderCell: (params) =>
  //       params.row.approval.status === "false" ? (
  //         <Button
  //           variant="contained"
  //           color="info" // or "success" depending on your theme
  //           disabled={true}
  //         >
  //           Waiting
  //         </Button>
  //       ) : params.row.approval.status === "editor" ? (
  //         <Button
  //           variant="contained"
  //           disabled={true}
  //           // onClick={() => handleApproval(params.row.approval.id)}
  //         >
  //           Waiting
  //         </Button>
  //       ) : params.row.approval.status === "admin" ? (
  //         <Button
  //           variant="contained"
  //           disabled={true}
  //           // onClick={() => handleEditorApproval(params.row.adminapproval.id)}
  //         >
  //           Waiting
  //         </Button>
  //       ) : params.row.approval.status === "verify" ? (
  //         <Button
  //           variant="contained"
  //           disabled={true}
  //           // onClick={() => handleFinalEdit(params.row.adminverify.id)}
  //         >
  //           Waiting
  //         </Button>
  //       ) : params.row.approval.status === "super" ? (
  //         <Button
  //           variant="contained"
  //           onClick={() => handleSuperAdminEdit(params.row.superadmin.id)}
  //         >
  //           Approve
  //         </Button>
  //       ) : (
  //         <Button variant="contained" disabled={true}>
  //           Approved
  //         </Button>
  //       ),
  //   },
  // ];

  // const rows = list.map((item, index) => ({
  //   id: index + 1,
  //   candidateName: item.candidateName,
  //   source: item.source,
  //   branch: item.branch,
  //   document: {
  //     id: item._id, // Replace with the actual field in your response
  //     branch: item.branch, // Replace with the actual field in your response
  //   },
  //   more: {
  //     id: item._id,
  //   },
  //   approval: {
  //     id: item._id,
  //     status: item.status,
  //   },

  //   approve: {
  //     id: item._id,
  //     status: item.status,
  //   },
  //   adminapproval: {
  //     id: item._id,
  //     status: item.status,
  //   },
  //   adminverify: {
  //     id: item._id,
  //     status: item.status,
  //   },
  //   superadmin: {
  //     id: item._id,
  //     status: item.status,
  //   },
  // }));

  const generateColumns = (user) => {
    const commonColumns = [
      { field: "id", headerName: "Sr.No.", width: 100 },
      { field: "candidateName", headerName: "Candidate Name", flex: 1 },
      { field: "source", headerName: "Source", flex: 1 },
      { field: "branch", headerName: "Branch", flex: 1 },
      // {
      //   field: "documentView",
      //   headerName: "Document View",
      //   flex: 1,
      //   renderCell: (params) => (
      //     <Link
      //       to={`/doc/${params.row.document.branch}/${params.row.document.id}`}
      //       style={{ textDecoration: "none" }}
      //     >
      //       <span role="img" aria-label="View Documents">
      //         📄 View
      //       </span>
      //     </Link>
      //   ),
      // },
      {
        field: "documentView",
        headerName: "Document View",
        flex: 1,
        renderCell: (params) => {
          let uploadedCount = 0;

          // Assuming that the document object is available in params.row.document
          const document = params.row.document.documents;

          for (let key in document) {
            if (document[key] !== null) {
              uploadedCount++;
            }
          }

          return (
            <Link
              to={`/doc/${params.row.document.course}/${params.row.document.branch}/${params.row.document.id}`}
              style={{ textDecoration: "none" }}
            >
              <span role="img" aria-label="View Documents">
                📄 View ({uploadedCount}/ 17)
              </span>
            </Link>
          );
        },
      },

      {
        field: "more",
        headerName: "Details",
        flex: 1,
        renderCell: (params) => (
          <Button onClick={() => handleOpen(params.row.document.id)}>
            More Details..
          </Button>
        ),
      },
    ];

    const roleSpecificColumns = [];

    if (user.role === "editor" && user.value === true) {
      roleSpecificColumns.push({
        field: "approval",
        headerName: "Approval",
        flex: 1,
        renderCell: (params) =>
          params.row.approval.status === "false" ? (
            <Button
              variant="contained"
              onClick={() => handleApproval(params.row.approval.id)}
            >
              Approve
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              disabled={true}
              style={{ backgroundColor: "green", color: "white" }}
            >
              Approved
            </Button>
          ),
      });

      roleSpecificColumns.push({
        field: "rejection",
        headerName: "Rejection",
        flex: 1,
        renderCell: (params) =>
          params.row.approval.status === "false" ? (
            <Button
              variant="contained"
              onClick={() => handleRejection(params.row.approval.id)}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Reject
            </Button>
          ) : (
            ""
          ),
      });
    } else if (user.role === "editor" && user.value === false) {
      roleSpecificColumns.push({
        field: "approve",
        headerName: "Approval",
        flex: 1,
        renderCell: (params) =>
          params.row.approval.status === "false" ? (
            <Button
              variant="contained"
              style={{ backgroundColor: "yellow" }} // or "success" depending on your theme
              disabled={true}
            >
              Pending
            </Button>
          ) : params.row.approval.status === "editor" ? (
            <Button
              variant="contained"
              onClick={() => handleEditorApproval(params.row.approval.id)}
            >
              Approve
            </Button>
          ) : (
            <Button
              variant="contained"
              style={{ backgroundColor: "green", color: "white" }}
              color="primary"
            // onClick={() => handleApproval(params.row.approval.id)}
            >
              Approved
            </Button>
          ),
      });
      roleSpecificColumns.push({
        field: "secondRej",
        headerName: "Rejection",
        flex: 1,
        renderCell: (params) =>
          params.row.approval.status === "editor" ? (
            <Button
              variant="contained"
              onClick={() => handleEditorRejection(params.row.approval.id)}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Reject
            </Button>
          ) : (
            ""
          ),
      });
    } else if (user.role === "admin" && user.value === true) {
      roleSpecificColumns.push({
        field: "adminapproval",
        headerName: "Approval",
        flex: 1,
        renderCell: (params) =>
          params.row.approval.status === "false" ? (
            <Button
              variant="contained"
              style={{ backgroundColor: "yellow" }} // or "success" depending on your theme
              disabled={true}
            >
              Pending
            </Button>
          ) : params.row.approval.status === "editor" ? (
            <Button
              variant="contained"
              style={{ backgroundColor: "yellow" }}
              disabled={true}
            // onClick={() => handleApproval(params.row.approval.id)}
            >
              Pending
            </Button>
          ) : params.row.approval.status === "admin" ? (
            <Button
              variant="contained"
              onClick={() => handleEditVerify(params.row.adminapproval.id)}
            >
              Approve
            </Button>
          ) : (
            <Button
              variant="contained"
              disabled={true}
              // onClick={() => handleEditorApproval(params.row.adminapproval.id)}
              style={{ backgroundColor: "green", color: "white" }}
            >
              Approved
            </Button>
          ),
      });
      roleSpecificColumns.push({
        field: "adminRej",
        headerName: "Rejection",
        flex: 1,
        renderCell: (params) =>
          params.row.approval.status === "admin" ? (
            <Button
              variant="contained"
              onClick={() => handleAdminRejection(params.row.approval.id)}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Reject
            </Button>
          ) : (
            ""
          ),
      });
    } else if (user.role === "admin" && user.value === false) {
      roleSpecificColumns.push({
        field: "adminverify",
        headerName: "Approval",
        flex: 1,
        renderCell: (params) =>
          params.row.approval.status === "false" ? (
            <Button
              variant="contained"
              style={{ backgroundColor: "yellow" }} // or "success" depending on your theme
              disabled={true}
            >
              Pending
            </Button>
          ) : params.row.approval.status === "editor" ? (
            <Button
              variant="contained"
              style={{ backgroundColor: "yellow" }}
              disabled={true}
            // onClick={() => handleApproval(params.row.approval.id)}
            >
              Pending
            </Button>
          ) : params.row.approval.status === "admin" ? (
            <Button
              variant="contained"
              style={{ backgroundColor: "yellow" }}
              disabled={true}
            // onClick={() => handleEditorApproval(params.row.adminapproval.id)}
            >
              Pending
            </Button>
          ) : params.row.approval.status === "verify" ? (
            <Button
              variant="contained"
              onClick={() => handleFinalEdit(params.row.adminverify.id)}
            >
              Approve
            </Button>
          ) : (
            <Button
              variant="contained"
              disabled={true}
              style={{ backgroundColor: "green", color: "white" }}
            >
              Approved
            </Button>
          ),
      });
      roleSpecificColumns.push({
        field: "verifyRej",
        headerName: "Rejection",
        flex: 1,
        renderCell: (params) =>
          params.row.approval.status === "verify" ? (
            <Button
              variant="contained"
              onClick={() => handleAdminVerifyRejection(params.row.approval.id)}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Reject
            </Button>
          ) : (
            ""
          ),
      });
    } else if (user.role === "superadmin" && user.value === true) {
      roleSpecificColumns.push({
        field: "superadmin",
        headerName: "Approval",
        flex: 1,
        renderCell: (params) =>
          params.row.approval.status === "false" ? (
            <Button
              variant="contained"
              style={{ backgroundColor: "yellow" }}
              disabled={true}
            >
              Pending
            </Button>
          ) : params.row.approval.status === "editor" ? (
            <Button variant="contained"
              style={{ backgroundColor: "yellow" }}

              disabled={true}>
              Pending
            </Button>
          ) : params.row.approval.status === "admin" ? (
            <Button variant="contained" disabled={true}
              style={{ backgroundColor: "yellow" }}
            >
              Pending
            </Button>
          ) : params.row.approval.status === "verify" ? (
            <Button variant="contained" disabled={true}>
              Pending
            </Button>
          ) : params.row.approval.status === "super" ? (
            <Button
              variant="contained"
              onClick={() => handleSuperAdminEdit(params.row.superadmin.id)}
            >
              Approve
            </Button>
          ) : (
            <Button
              variant="contained"
              disabled={true}
              style={{ backgroundColor: "green", color: "white" }}
            >
              Approved
            </Button>
          ),
      });
      roleSpecificColumns.push({
        field: "superRej",
        headerName: "Rejection",
        flex: 1,
        renderCell: (params) =>
          params.row.approval.status === "super" ? (
            <Button
              variant="contained"
              onClick={() => handleSuperRejection(params.row.approval.id)}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Reject
            </Button>
          ) : (
            ""
          ),
      });
    } else if (user.role === "agent") {
      roleSpecificColumns.push({
        field: "agent",
        headerName: "Status",
        flex: 1,
        renderCell: (params) =>
          params.row.agent.status === "true" ? (
            <Button
              variant="contained"
              style={{ backgroundColor: "green", color: "white" }}
            >
              Successful
            </Button>
          ) : params.row.agent.rejection !== null ? (
            <Button
              variant="contained"
              style={{ backgroundColor: "red", color: "white" }}
            >
              Rejected
            </Button>
          ) : (
            <Button variant="contained" disabled={true}>
              Processing
            </Button>
          )

      });
    }

    return [...commonColumns, ...roleSpecificColumns];
  };

  const columns = generateColumns(user);
  const rows = list.map((item, index) => {
    const total = {
      id: index + 1,
      candidateName: item.candidateName,
      source: item.source,
      branch: item.branch,
      document: {
        id: item._id,
        branch: item.branch,
        course: item.course,
        documents: item.documents
      },
      more: {
        id: item._id,
      },
      approval: {
        id: item._id,
        status: item.status,
      },
    };

    const limited =
      user.role !== "agent"
        ? {
          approve: {
            id: item._id,
            status: item.status,
          },
          adminapproval: {
            id: item._id,
            status: item.status,
          },
          adminverify: {
            id: item._id,
            status: item.status,
          },
          superadmin: {
            id: item._id,
            status: item.status,
          },
          rejection: {
            id: item._id,
            rejection: item.rejection,
          },
          secondRej: {
            id: item._id,
            rejection: item.rejection,
          },
          adminRej: {
            id: item._id,
            rejection: item.rejection,
          },
          verifyRej: {
            id: item._id,
            rejection: item.rejection,
          },
          superRej: {
            id: item._id,
            rejection: item.rejection,
          },

        }
        : {
          agent: {
            id: item._id,
            status: item.status,
            rejection: item.rejection,
          }
        };

    return { ...total, ...limited };
  });

  return (
    <Layout>
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
      <DetailsModal
        id={id}
        open={open}
        handleClose={handleClose}
        data={data}
        onChangeData={onChangeData}
        list={list}
        setData={setData}
        user={user}
        onSubmit={onSubmit}
        balance_money={balance_money}
      />{" "}
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    candidate: state.candidate,
    employee: state.employee,
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      requestAdminMonthJob,
      requestGetCandidate,
      requestGetApplyJob,
      requestAdminCompanyDetails,
      requestAdminEditSize,
      requestAdminEditDegree,
      requestAdminEditFunctional,
      requestAdminEditIndustry,
      requestAdminEditCategory,
      requestAdminEditTag,
      requestGetInterview,
      requestAdminEditShift,
      requestAdminEditOwner,
      requestAdminEditType,
      requestAdminEditCurrency,
      requestAdminEditSkill,
      requestAdminAddDegree,
      requestAdminCompanyJob,
      requestAdminFunctionalCandidate
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TableData);
