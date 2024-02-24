import React, { Component, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "@mui/material";
import TextField from "@mui/material/TextField";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestLogin, userLogout } from "../Redux/actions";
import Swal from "sweetalert2";
import "./signup.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const PartnerLogin = (props) => {
  // export default function PartnerLogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorpassword, seterrorpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle show/hide password
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

    props.requestLogin({
      data: {
        email: email,
        password: password,
      },
    });
  }

  useEffect(() => {
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        Swal.fire("Log In!", "Login successfully.", "success");
        // if(loginData?.data?.data?.role === "editor"){
        //   navigate("/all-data")
        // }else{
        navigate("/dashboard");
        // }
      } else {
        Swal.fire("Sorry!", loginData.data.error, "error");
        seterrorpassword("Invalid Credentials");
        setError(true);
      }
    }
  }, [props.candidate.loginData]);

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
            Login
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
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              // style={{background: "white", borderRadius: "10px"}}
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

            {/* <Typography
              variant="body2"
              align="right"
              style={{ color: "white", fontSize: "16px" }}
            >
              <a
                href="/partnerforget"
                className="font-size-3 text-dodger line-height-reset"
                style={{ color: "white" }}
              >
                Forgot Password
              </a>
            </Typography> */}
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="body2"
                align="right"
                style={{ color: "white", fontSize: "20px" }}
              >
                For Staff{" "}
                <a href="/login" style={{ color: "white" }}>
                  Login
                </a>
              </Typography>

              <Typography
                variant="body2"
                align="right"
                style={{ color: "white", fontSize: "20px" }}
              >
                For Admin{" "}
                <a href="/partner/admin" style={{ color: "white" }}>
                  Login
                </a>
              </Typography>
            </div>
            {/* <Typography
              variant="body2"
              align="right"
              style={{ color: "white", fontSize: "16px" }}
            >
              Don't have an account?{" "}
              <a href="/partnersignup" style={{ color: "white" }}>
                Sign up
              </a>
            </Typography> */}
          </form>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { candidate: state.candidate };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ requestLogin, userLogout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PartnerLogin);
