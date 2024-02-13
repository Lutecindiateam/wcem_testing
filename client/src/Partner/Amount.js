import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Menu, Segmented, Table, Input, Select, Form } from "antd";
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

// const DetailsModal = ({
//   id,
//   open,
//   handleClose,
//   data,
//   onChangeData,
//   list,
//   setData,
//   user,
//   onSubmit,
//   course
// }) => {
// const [isSubmitDisabled, setSubmitDisabled] = useState(true);

// useEffect(() => {
//   // Check if all three input values are present
//   const areAllInputsFilled =
//     data.adv_payble_amt !== undefined &&
//     data.paid_amount !== undefined &&
//     data.balance !== undefined;

//   // Update the state based on the condition
//   setSubmitDisabled(!areAllInputsFilled);
// }, [data.adv_payble_amt, data.paid_amount, data.balance]);
//   useEffect(() => {
//     if (id) {
//       const selectedItem = list.find((item) => item._id === id);
//       setData(selectedItem || {});
//     }
//   }, [id, list]);

//   const submitProductForm = () => {
//     // Validate the form data if needed
//     // Call the onSubmit function and pass the form data
//     onSubmit(data);

//     // Close the modal if needed
//     handleClose();
//   };

//   const handleChange = (value) => {
//     console.log(value);
//   }
//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//       onSubmit={submitProductForm}
//     >
//       <Box sx={style}>
//         <Typography id="modal-modal-title" variant="h6" component="h2">
//           Student Admission Details
//         </Typography>

// <div>
//   <label htmlFor="candidateName">Name:</label>
//   <Input
//     id="candidateName"
//     name="candidateName"
//     value={data.candidateName}
//     placeholder={`Product Name`}
//     // onChange={onChangeData}
//   />
// </div>

// <div>
//   <label htmlFor="category">Category:</label>
//   <Input
//     label="Quantity"
//     id="category"
//     name="category"
//     value={data.category}
//     placeholder={`Quantity`}
//     // onChange={onChangeData}
//   />
// </div>
// <div>
//   <label htmlFor="gender">Gender:</label>
//   <Input
//     label="Quantity"
//     id="gender"
//     name="gender"
//     value={data.gender}
//     placeholder={`Quantity`}
//     // onChange={onChangeData}
//   />
// </div>
//         <div>
//           <label htmlFor="course">Course:</label>
//           <Input
//             label="Quantity"
//             id="course"
//             name="course"
//             value={data.course}
//             placeholder={`Quantity`}
//             // onChange={onChangeData}
//           />
//         </div>
//         <div>
//           <label htmlFor="branch">Branch:</label>
//           <Input
//             label="Quantity"
//             id="branch"
//             name="branch"
//             value={data.branch}
//             placeholder={`Quantity`}
//             // onChange={onChangeData}
//           />
//         </div>
//         <div>
//           <label htmlFor="mobile">Mobile:</label>
//           <Input
//             label="Quantity"
//             id="mobile"
//             name="mobile"
//             value={data.mobile}
//             placeholder="Mobile"
//             // onChange={onChangeData}
//           />
//         </div>
//         <div>
//           <label htmlFor="parent_mobile">Parent Mobile:</label>
//           <Input
//             label="Quantity"
//             id="parent_mobile"
//             name="parent_mobile"
//             value={data.parent_mobile}
//             placeholder="Not Present"
//             // onChange={onChangeData}
//           />
//         </div>
//         <div>
//           <label htmlFor="date_docSubmision">
//             Date of Document Submission:
//           </label>
//           <Input
//             label="Quantity"
//             id="date_docSubmision"
//             name="date_docSubmision"
//             value={data.date_docSubmision}
//             placeholder={`Quantity`}
//             // onChange={onChangeData}
//           />
//         </div>
//         <div>
//           <label htmlFor="lastExam_passingYear">Last Exam Passing Year:</label>
//           <Input
//             label="Quantity"
//             id="lastExam_passingYear"
//             name="lastExam_passingYear"
//             value={data.lastExam_passingYear}
//             placeholder={`Quantity`}
//             // onChange={onChangeData}
//           />
//         </div>
//         <div>
//           <label htmlFor="team">Team/Staff:</label>
//           <Input
//             label="Quantity"
//             id="team"
//             name="team"
//             value={data.team}
//             placeholder={`Quantity`}
//             // onChange={onChangeData}
//           />
//         </div>
//         <div>
//           <label htmlFor="source">Source:</label>
//           <Input
//             label="Quantity"
//             id="source"
//             name="source"
//             value={data.source}
//             placeholder={`Quantity`}
//             // onChange={onChangeData}
//           />
//         </div>
//         <br />
//         {user.role === "editor" || user.role === "admin" ? (
//           <div>
//             <Typography variant="h6" component="h2">
//               Add Incentive
//             </Typography>
//             <div>
//               <label htmlFor="source">Advance Payble Amount:</label>
//               <Input
//                 label="Quantity"
//                 id="adv_payble_amt"
//                 name="adv_payble_amt"
//                 value={data.adv_payble_amt}
//                 placeholder="Enter Advance Payble Amountt"
//                 onChange={onChangeData}
//               />
//             </div>
//             <div>
//               <label htmlFor="source">Paid Amount:</label>
//               <Input
//                 label="Quantity"
//                 id="paid_amount"
//                 name="paid_amount"
//                 value={data.paid_amount}
//                 placeholder="Enter Paid Amount"
//                 onChange={onChangeData}
//               />
//             </div>
//             <div>
//               <label htmlFor="source">Balance:</label>
//               <Input
//                 label="Quantity"
//                 id="balance"
//                 name="balance"
//                 value={data.balance}
//                 placeholder="Enter Balance Amount"
//                 onChange={onChangeData}
//               />
//             </div>
//             <br />
//             <div>
//               <Button
//                 variant="contained"
//                 onClick={submitProductForm}
//                 disabled={isSubmitDisabled}
//               >
//                 Save Incentive
//               </Button>
//             </div>
//           </div>
//         ) : null}
//       </Box>
//     </Modal>
//   );
// };
const { Option } = Select;

const TableData = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [id, setId] = useState(null);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState({});
  const [list, setList] = useState([]);
  const [status, setStatus] = useState("true");
  const [open, setOpen] = React.useState(false);
  const [editorStatus, setEditorStatus] = useState(null);
  const [formData, setFormData] = useState({
    course: undefined, // Default value for the course
    branch: undefined,
    amount: undefined,
  });
  const newArray = list.filter((item) => item.status === "editor");
  console.log(formData);
  const courseOptions = ["B.Tech", "B.Tech(DSY)", "MBA", "MCA", "M.Tech", "Diploma"];

  const [isSubmitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    // Check if all three input values are present
    const areAllInputsFilled =
      formData.course !== undefined &&
      formData.branch !== undefined &&
      formData.amount !== undefined;

    // Update the state based on the condition
    setSubmitDisabled(!areAllInputsFilled);
  }, [formData.course, formData.branch, formData.amount])

  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setId(null);
    setOpen(false);
  };

  const onChangeData = (value, option) => {
    console.log(value);
    console.log(option);
    const { name } = option.props;
    setFormData({ ...formData, [name]: value });
  };

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
        Swal.fire("Good job!", "Rejection Successfull.", "success");
        props.data.editSkillData = undefined;
      }
    }
  }, [props.data.editSkillData]);

  //Edit Rejection data for second admin
  useEffect(() => {
    let editCurrencyData = props.data.editCurrencyData;
    if (editCurrencyData !== undefined) {
      if (editCurrencyData?.data?.status == "success") {
        Swal.fire("Good job!", "Rejection Successfull.", "success");
        props.data.editCurrencyData = undefined;
      }
    }
  }, [props.data.editCurrencyData]);

  //Edit Rejction data for first admin
  useEffect(() => {
    let editTypeData = props.data.editTypeData;
    if (editTypeData !== undefined) {
      if (editTypeData?.data?.status == "success") {
        Swal.fire("Good job!", "Rejection Successfull.", "success");
        props.data.editTypeData = undefined;
      }
    }
  }, [props.data.editTypeData]);

  useEffect(() => {
    let editOwnerData = props.data.editOwnerData;
    if (editOwnerData !== undefined) {
      if (editOwnerData?.data?.status == "success") {
        Swal.fire("Good job!", "Rejection Successfull.", "success");
        props.data.editOwnerData = undefined;
      }
    }
  }, [props.data.editOwnerData]);

  useEffect(() => {
    let editShiftData = props.data.editShiftData;
    if (editShiftData !== undefined) {
      if (editShiftData?.data?.status == "success") {
        Swal.fire("Good job!", "Rejection Successfull.", "success");
        props.data.editShiftData = undefined;
      }
    }
  }, [props.data.editShiftData]);
  useEffect(() => {
    let editDegreeData = props.data.editDegreeData;
    if (editDegreeData !== undefined) {
      if (editDegreeData?.data?.status == "success") {
        Swal.fire("Good job!", "Approved Successfully.", "success");
        props.data.editDegreeData = undefined;
      }
    }
  }, [props.data.editDegreeData]);

  useEffect(() => {
    let editIndustryData = props.data.editIndustryData;
    if (editIndustryData !== undefined) {
      if (editIndustryData?.data?.status == "success") {
        Swal.fire("Good job!", "Approved Successfully.", "success");
        props.data.editIndustryData = undefined;
      }
    }
  }, [props.data.editIndustryData]);

  useEffect(() => {
    let editCategoryData = props.data.editCategoryData;
    if (editCategoryData !== undefined) {
      if (editCategoryData?.data?.status == "success") {
        Swal.fire("Good job!", "Approved Successfully.", "success");
        props.data.editCategoryData = undefined;
      }
    }
  }, [props.data.editCategoryData]);

  useEffect(() => {
    let editTagData = props.data.editTagData;
    if (editTagData !== undefined) {
      if (editTagData?.data?.status == "success") {
        Swal.fire("Good job!", "Approved Successfully.", "success");
        props.data.editTagData = undefined;
      }
    }
  }, [props.data.editTagData]);

  useEffect(() => {
    let editFunctionalData = props.data.editFunctionalData;
    if (editFunctionalData !== undefined) {
      if (editFunctionalData?.data?.status == "success") {
        Swal.fire("Good job!", "Approved Successfully.", "success");
        props.data.editFunctionalData = undefined;
      }
    }
  }, [props.data.editFunctionalData]);

  const handleSubmit = () => {
    // Handle form submission here
    props.requestAdminEditSize({
      data: formData,
      id: id,
    });
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
  const columns = [
    { field: "id", headerName: "Sr.No.", width: 100 },
    { field: "candidateName", headerName: "Candidate Name", flex: 1 },
    { field: "source", headerName: "Source", flex: 1 },
    // { field: "documents", headerName: "Documets", flex: 1 },
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
    //       {/* You can use any icon component for document view */}
    //       <span role="img" aria-label="View Documents">
    //         📄 View
    //       </span>
    //     </Link>
    //   ),
    // },
    // {
    //   field: "more",
    //   headerName: "Details",
    //   flex: 1,
    //   renderCell: (params) => (
    //     <Button onClick={() => handleOpen(params.row.document.id)}>
    //       More Details..
    //     </Button>
    //   ),
    // },

  ];

  const rows = list.map((item, index) => ({
    id: index + 1,
    candidateName: item.candidateName,
    source: item.source,
    branch: item.branch,
    // document: {
    //   id: item._id, // Replace with the actual field in your response
    //   branch: item.branch, // Replace with the actual field in your response
    // },
    // more: {
    //   id: item._id,
    // },
  }));


  return (
    <Layout>
      {/* Your button component */}
      <div>
        <Form onFinish={handleSubmit}>
          <div>
            <label htmlFor="course">Course:</label>
            <Select
              id="course"
              name="course"
              value={formData.course}
              placeholder="Select course"
              onChange={onChangeData}
            >
              {courseOptions.map((name) => (
                <Select.Option key={name} value={name} name="course">
                  {name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div>
            <label htmlFor="branch">Branch:</label>
            <Input
              label="Branch"
              id="branch"
              name="branch"
              value={formData.branch}
              placeholder={`Branch`}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="amount">Amount:</label>
            <Input
              label="Amount"
              id="amount"
              name="amount"
              value={formData.amount}
              placeholder={`Amount`}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
          </div>
          <div>
            <Button
              disabled={isSubmitDisabled}
              variant="contained"
              type="primary" 
              htmlType="submit">
              Save Incentive
            </Button>
          </div>
        </Form>

        {/* DataGrid component */}
        <div style={{ display: 'flex', marginBottom: '16px' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            components={{
              Toolbar: GridToolbar,
            }}
            onRowClick={(params) => handleOpen(params.id)}
          />
        </div>

      </div>
      {/* <DetailsModal
        id={id}
        open={open}
        handleClose={handleClose}
        data={data}
        onChangeData={onChangeData}
        list={list}
        setData={setData}
        user={user}
        onSubmit={onSubmit}
        course={course}
      /> */}
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
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TableData);
