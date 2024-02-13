// import React, { useEffect, useState } from "react";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import axios from "axios";
// import {
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Button,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import {
//   requestAdminEditCareer,
//   requestAdminMonthAppliedJob,
// } from "../../Redux/actions";
// import Layout from "../Layout";

// const Adminaction = (props) => {
//   const [data, setData] = useState([]);
//   const [user, setUser] = useState({});

//   useEffect(() => {
//     let loginData = props.data.loginData;
//     if (loginData !== undefined) {
//       if (loginData?.data?.status === "success") {
//         setUser(loginData.data.data);
//       }
//     }
//   }, [props.data.loginData]);

//   const handleAccept = (id) => {
//     props.requestAdminEditCareer({
//       id: id,
//     });
//   };
//   useEffect(() => {
//     props.requestAdminMonthAppliedJob();
//   }, [props.data.editCareerData]);

//   useEffect(() => {
//     let monthWiseAppliedjobData = props.data.monthWiseAppliedjobData;
//     if (monthWiseAppliedjobData !== undefined) {
//       if (monthWiseAppliedjobData?.data?.status === "success") {
//         setData(monthWiseAppliedjobData.data.data);
//       }
//     }
//   }, [props.data.monthWiseAppliedjobData]);

//   // useEffect(() => {
//   //   let editCareerData = props.data.editCareerData;
//   //   // console.log(editCareerData);
//   //   if (editCareerData !== undefined) {
//   //     if (editCareerData?.data?.status === "success") {
//   //       // admin_action();
//   //     }
//   //   }
//   // }, [props.data.editCareerData]);

//   const columns = [
//     { field: "id", headerName: "Sr.No.", width: 100 },
//     { field: "name", headerName: "Name", flex: 1 },
//     { field: "role", headerName: "Role", flex: 1 },
//     {
//       field: "active",
//       headerName: "Status",
//       flex: 1,
//       renderCell: (params) => (
//         <span
//           style={{ color: params.row.active === "success" ? "green" : "red" }}
//         >
//           {params.value}
//         </span>
//       ),
//     },
//     {
//       field: "action",
//       headerName: "Action",
//       flex: 1,
//       renderCell: (params) => (
//         <Button
//           variant="contained"
//           onClick={() => handleAccept(params.row._id)}
//           disabled={params.row.active === "success"}
//         >
//           Accept
//         </Button>
//       ),
//     },
//   ];

//   const rows = data.map((item, index) => ({
//     id: index + 1,
//     name: item.name.toUpperCase(),
//     role: item.role.toUpperCase(),
//     active: item.active,
//     status: item.status,
//     _id: item._id,
//   }));

//   return (
//     <Layout>
//       <div style={{ height: "100%", width: "100%" }}>
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           pageSize={10}
//           components={{
//             Toolbar: GridToolbar,
//           }}
//         />
//       </div>
//     </Layout>
//   );
// };

// // export default Adminaction;
// const mapStateToProps = (state) => {
//   return { data: state.data };
// };

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     { requestAdminEditCareer, requestAdminMonthAppliedJob },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(Adminaction);
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "../signup.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  requestRegister,
  userLogout,
} from "../../Redux/actions";
import Swal from "sweetalert2";
import Layout from "../Layout";



const Adminaction = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erroremail, seterroremail] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    seterroremail("");
    setError(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    props.requestRegister({
      data: {
        name,
        email,
        password,
      },
    });
  };

  useEffect(() => {
    let registerdata = props.candidate.registerData;
    if (registerdata !== undefined) {
      if (registerdata?.data?.status === "success") {
        props.candidate.registerData = undefined;
        Swal.fire("Good job!", "User Added successfully.", "success");
   resetForm();
          // navigate("/adminaction");

      } else {
        Swal.fire("Sorry!", "Email is already used.", "error");
        seterroremail("Email is already used.");
        setError(true);
      }
    }
  }, [props.candidate.registerData]);

  return (
    <Layout>
    <div className="background">
      <Container component="main" maxWidth="xs">
        <div>
          <br />
          <br />
          <br />
          <Typography variant="h5">Agent Registration</Typography>
          <br />
          <form onSubmit={handleSubmit}>
             <TextField
              fullWidth
              label=" Full Name"
              type="text"
              required
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              InputProps={{
                style: {
                  border: "1px solid white", // White border
                  borderRadius: "10px", // Border radius
                  color: "white", // Text color
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white", // Label color
                },
              }}
            />
            <TextField
              fullWidth
              label=" Email address"
              type="email"
              required
              placeholder="Enter email"
              
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              InputProps={{
                style: {
                  border: "1px solid white", // White border
                  borderRadius: "10px", // Border radius
                  color: "white", // Text color
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white", // Label color
                },
              }}
            />

            <TextField
              fullWidth
              label="Set Password"
              type="password"
              required
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              InputProps={{
                style: {
                  border: "1px solid white", // White border
                  borderRadius: "10px", // Border radius
                  color: "white", // Text color
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white", // Label color
                },
              }}
            />

            <br />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Agent
            </Button>
          </form>
        </div>
      </Container>
    </div>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return { candidate: state.candidate };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ requestRegister, userLogout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Adminaction);
