// import React, { Component, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { Link } from "@mui/material";
// import TextField from "@mui/material/TextField";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { requestEmpLogin, userLogout } from "../Redux/actions";
// import Swal from "sweetalert2";
// import "./signup.css";

// const AgentLogin = (props) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorpassword, seterrorpassword] = useState("");
//   const [error, setError] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setEmail("");
//     setPassword("");
//   }, []);

//   useEffect(() => {
//     props.userLogout();
//   }, []);

//   async function handleSubmit(e) {
//     e.preventDefault();

//     props.requestEmpLogin({
//       data: {
//         email: email,
//         password: password,
//       },
//     });
//   }

//   useEffect(() => {
//     let empLoginData = props.employee.empLoginData;
//     if (empLoginData !== undefined) {
//       if (empLoginData?.data?.status == "success") {
//         Swal.fire("Log In!", "Login successfully.", "success");
//         navigate("/all-data");
//       } else {
//         Swal.fire("Sorry!", empLoginData.data.error, "error");
//         seterrorpassword("Invalid Credentials");
//         setError(true);
//       }
//     }
//   }, [props.employee.empLoginData]);

//   return (
//     <div className="background">
//       <Container
//         component="main"
//         maxWidth="xs"
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "80vh", // Center vertically
//         }}
//       >
//         <div>
//           <Typography
//             variant="h5"
//             style={{ textAlign: "center", fontSize: "30px", color: "white" }}
//           >
//             Guest Login
//           </Typography>
//           <form onSubmit={handleSubmit}>
//             <TextField
//               fullWidth
//               label="Email address"
//               type="email"
//               placeholder="Enter email"
//               onChange={(e) => setEmail(e.target.value)}
//               margin="normal"
//               variant="outlined"
//               InputProps={{
//                 style: {
//                   borderRadius: "10px", // Set the border radius
//                   color: "white",
//                 },
//                 notched: false, // Remove the notch border
//               }}
//               InputLabelProps={{
//                 style: {
//                   color: "white", // Set the label color to white
//                 },
//               }}
//               sx={{
//                 "& fieldset": {
//                   borderColor: "white", // Set the border color to white
//                 },
//               }}
//             />
//             <TextField
//               fullWidth
//               label="Password"
//               type="password"
//               placeholder="Enter password"
//               onChange={(e) => setPassword(e.target.value)}
//               margin="normal"
//               // style={{background: "white", borderRadius: "10px"}}
//               InputProps={{
//                 style: {
//                   borderRadius: "10px",
//                   color: "white", // Set the border radius
//                 },
//                 notched: false, // Remove the notch border
//               }}
//               InputLabelProps={{
//                 style: {
//                   color: "white", // Set the label color to white
//                 },
//               }}
//               sx={{
//                 "& fieldset": {
//                   borderColor: "white", // Set the border color to white
//                 },
//               }}
//             />
//              <div style={{ paddingTop: "5px", paddingBottom: "5px" }}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 style={{ borderRadius: "10px", height: "50px" }}
//               >
//                 Login
//               </Button>
//             </div>
//           </form>
//         </div>
//       </Container>
//     </div>
//   );
// };
// const mapStateToProps = (state) => {
//   return { candidate: state.candidate, employee: state.employee };
// };

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators({ requestEmpLogin, userLogout }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(AgentLogin);

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestEmpLogin, userLogout } from "../Redux/actions";
import Swal from "sweetalert2";
import "./signup.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const AgentLogin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle show/hide password
  const [errorpassword, seterrorpassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  useEffect(() => {
    props.userLogout();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    props.requestEmpLogin({
      data: {
        email: email,
        password: password,
      },
    });
  }

  useEffect(() => {
    let empLoginData = props.employee.empLoginData;
    if (empLoginData !== undefined) {
      if (empLoginData?.data?.status == "success") {
        Swal.fire("Log In!", "Login successfully.", "success");
        navigate("/dashboard");
      } else {
        Swal.fire("Sorry!", empLoginData.data.error, "error");
        seterrorpassword("Invalid Credentials");
        setError(true);
      }
    }
  }, [props.employee.empLoginData]);

  return (
    <div className="background">
      <Container
        component="main"
        maxWidth="xs"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh", // Center vertically
        }}
      >
        <div>
          <Typography
            variant="h5"
            style={{ textAlign: "center", fontSize: "30px", color: "white" }}
          >
            Staff Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email address"
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              variant="outlined"
              InputProps={{
                style: {
                  borderRadius: "10px", // Set the border radius
                  color: "white",
                },
                notched: false, // Remove the notch border
              }}
              InputLabelProps={{
                style: {
                  color: "white", // Set the label color to white
                },
              }}
              sx={{
                "& fieldset": {
                  borderColor: "white", // Set the border color to white
                },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"} // Show/hide password based on state
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              InputProps={{
                style: {
                  borderRadius: "10px",
                  color: "white", // Set the border radius
                },
                notched: false, // Remove the notch border
                endAdornment: (
                  <Button
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ color: "white" }}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </Button>
                ),
              }}
              InputLabelProps={{
                style: {
                  color: "white", // Set the label color to white
                },
              }}
              sx={{
                "& fieldset": {
                  borderColor: "white", // Set the border color to white
                },
              }}
            />
            <div style={{ paddingTop: "5px", paddingBottom: "5px" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ borderRadius: "10px", height: "50px" }}
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { candidate: state.candidate, employee: state.employee };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ requestEmpLogin, userLogout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AgentLogin);
