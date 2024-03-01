import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Menu, Segmented, Table, Input, Spin } from "antd";
import { useEffect } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  requestAdminCategoryJob,
  requestAdminCompanyDetails,
  requestAdminEditSize,
  requestGetCandidate,
  requestGetApplyJob,
  requestGetInterview,
  requestAdminEditPeriod,
  requestCandidateProfile,
  requestGetJobAlert,
  requestCandidateLogo
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
import AgentGraph from "./AgentGraph";
// import { Input } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

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
}) => {
  useEffect(() => {
    if (id) {
      const selectedItem = list.find((item) => item._id === id);
      setData(selectedItem || {});
    }
  }, [id, list]);

  const submitProductForm = () => {
    // Validate the form data if needed
    // Call the onSubmit function and pass the form data
    onSubmit(data);

    // Close the modal if needed
    handleClose();
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
          <label htmlFor="name">Name:</label>
          <Input
            id="name"
            name="name"
            value={data.name}
            // placeholder={`Product Name`}
            onChange={onChangeData}
          />
        </div>

        <div>
          <label htmlFor="role">Role:</label>
          <Input
            label="Role"
            id="role"
            name="role"
            value={data.role}
          // placeholder={`Quantity`}
          // onChange={onChangeData}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <Input
            label="Email"
            id="email"
            name="email"
            value={data.email}
            // placeholder={`Quantity`}
            onChange={onChangeData}
          />
        </div>
        <div>
          <label htmlFor="password">Set New Password:</label>
          <Input
            label="Password"
            id="password"
            name="password"
            value={data.password}
            onChange={onChangeData}
          />
        </div>
        <br />
        <div>
          <Button variant="contained" onClick={submitProductForm}>
            Submit
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
const Reset = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [id, setId] = useState(null);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [graphId, setGraphId] = useState(null);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState({});
  const [list, setList] = useState([]);
  const [status, setStatus] = useState("true");
  const [open, setOpen] = React.useState(false);
  const [editorStatus, setEditorStatus] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const navigate = useNavigate();

  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setId(null);
    setOpen(false);
  };

  function onChangeData(e) {
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

  // const handleGraph = (id) => {
  //   // setSpinning(true);
  //   setGraphId(id);
  //   // navigate(`/handle/${id}`)
  // }

  const onSubmit = (values) => {
    // Handle form submission here
    let form = new FormData();
    form.append("email", values.email);
    form.append("name", values.name);
    form.append("password", values.password);
    form.append("role", values.role)
    // console.log("Form submitted with data:", formData);
    // You can dispatch an action or perform any other logic
    props.requestCandidateLogo({
      data: form,
      id: values._id,
    });
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
  };
  useEffect(() => {
    let loginData = props.data.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        if (
          loginData?.data?.data.role === "admin" ||
          loginData?.data?.data.role === "editor" ||
          loginData?.data?.data.role === "superadmin"
        ) {
          props.requestGetJobAlert({
            // id: loginData.data.data.id,
            // role: loginData.data.data.role,
            token: loginData.data.data.token,
          });
        }
      }
    }
  }, [props?.data?.loginData, props.candidate.candidatePictureData]);

  useEffect(() => {
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        if (loginData?.data?.data.role === "reset") {
          props.requestGetJobAlert({
            // id: loginData.data.data.id,
            // role: loginData.data.data.role,
            token: loginData.data.data.token,
          });
        }
      }
    }
  }, [props.candidate.loginData, props.candidate.candidatePictureData]);

  useEffect(() => {
    let jobAlertData = props.candidate.jobAlertData;
    if (jobAlertData !== undefined) {
      if (jobAlertData?.data?.status === "success") {
        setList(jobAlertData.data.data.response);
      }
    }
  }, [props.candidate.jobAlertData]);

  useEffect(() => {
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status === "success") {
        setUser(loginData.data.data);
      }
    }
  }, [props.candidate.loginData]);

  const columns = [
    { field: "id", headerName: "Sr.No.", width: 100 },
    { field: "name", headerName: "Name", flex: 1 },
    // { field: "documents", headerName: "Documets", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    {
      field: "more",
      headerName: "Details",
      flex: 1,
      renderCell: (params) => (
        <Button onClick={() => handleOpen(params.row.more.id)}>
          Edit Credential
        </Button>
      ),
    },
    // {
    //   field: "graph",
    //   headerName: "View Graph",
    //   flex: 1,
    //   renderCell: (params) => (
    //     <Button onClick={() => handleGraph(params.row.more.id)}>
    //       View Graph
    //     </Button>
    //   ),
    // },
  ];

  const rows = list.map((item, index) => ({
    id: index + 1,
    name: item.name,
    role: item.role,
    more: {
      id: item._id,
    },
    // graph: {
    //   id: item._id
    // }
  }));

  return (
    <Layout>
      <div style={{ height: "100%", width: "100%" }}>
        <div style={{ marginBottom: "20px" }}> {/* Add margin bottom to create space */}
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>
        {/* {
          graphId ? (
            <AgentGraph
              id={graphId}
            />
          ) : null
        } */}
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
      requestAdminCategoryJob,
      requestGetCandidate,
      requestGetApplyJob,
      requestAdminCompanyDetails,
      requestAdminEditSize,
      requestGetInterview,
      requestAdminEditPeriod,
      requestCandidateProfile,
      requestGetJobAlert,
      requestCandidateLogo
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Reset);
