import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "@material-ui/core";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import GroupsIcon from '@mui/icons-material/Groups';
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import PreviewIcon from "@mui/icons-material/Preview";
import GamesIcon from '@mui/icons-material/Games';
import { Typography } from "antd";
import "./sidebar.css";
import ob from "../image/Wainganga.jpg";
import { bindActionCreators } from "redux";
import { requestAddResume, requestApplyJob } from "../Redux/actions";
import { connect } from "react-redux";


const Sidebar = ({ handleDrawerToggle, ...props }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    let empLoginData = props.employee.empLoginData;
    if (empLoginData !== undefined) {
      if (empLoginData?.data?.status == "success") {
        setUser(empLoginData.data.data);
      }
    }
  }, [props.employee.empLoginData]);

  useEffect(() => {
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status === "success") {
        setUser(loginData.data.data);
      } else {
        // localStorage.setItem("link", "/addResumeForm");
        // navigate("/login");
      }
    } else {
      // localStorage.setItem("link", "/addResumeForm");
      // navigate("/login");
    }
  }, [props.candidate.loginData]);

  useEffect(() => {
    let loginData = props.data.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        setUser(loginData.data.data);
        // Swal.fire("Good job!", "Login successfully.", "success");
        //  navigate("/upload");
      } else {
        // Swal.fire("Sorry!", loginData.data.error , "error");
        // seterrorpassword("Invalid Credentials");
        // setError(true);
      }
    }
  }, [props.data.loginData]);

  return (
    <div
      style={{
        backgroundColor: "#2c3e50",
        height: "100vh",
        paddingTop: "20px",
        
      }}
    >
      {/* <Toolbar /> */}
      <div
        className="style"
        style={{
          display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          paddingLeft: "15px",
        }}
      >
        <img src={ob} alt="ob" style={{ height: "80%", width: "70px" }} />
        <strong
          style={{
            color: "gold",
            fontWeight: "bold",
            fontSize: "25px",
            paddingLeft: "10px",
            paddingTop: "10px",
          }}
        >
          W.C.E.M.
        </strong>
        {/* <strong style={{ color: "gold", fontWeight: "bold", fontSize: "20px" }}>
          Wain
        </strong> */}
        {/* &nbsp;
        <img src={ob} alt="ob" style={{ height: "90%", width: "70px" }} />
        &nbsp; */}
        {/* <strong style={{ color: "gold	", fontWeight: "bold", fontSize: "20px" }}>
          Ganga
        </strong> */}
      </div>

      <Divider />
      <br />
      <List>
        {/* {user.role !== "agent" ? ( */}
        <ListItem key="dashboard" disablePadding>
          <ListItemButton to="/dashboard">
            <ListItemIcon>
              <HomeIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" style={{ color: "white" }} />
          </ListItemButton>
        </ListItem>
        {/* ) : null} */}
        {user.role === "clerk" && (
          <ListItem key="upload" disablePadding>
            <ListItemButton to="/upload">
              <ListItemIcon>
                <AddIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Upload Data" style={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
        )}
        <ListItem key="allData" disablePadding>
          <ListItemButton to="/all-data">
            <ListItemIcon>
              <PeopleAltIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="All Students" style={{ color: "white" }} />
          </ListItemButton>
        </ListItem>
        {user.role !== "agent" ? (
          <ListItem key="rejection" disablePadding>
            <ListItemButton to="/rejection">
              <ListItemIcon>
                <PreviewIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Rejected" style={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
        ) : null}

        {user.role !== "agent" ? (
          <ListItem key="successful" disablePadding>
            <ListItemButton to="/succadm">
              <ListItemIcon>
                <OfflinePinIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Completed" style={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
        ) : null}

        {user.role === "admin" || user.role === "superadmin" ? (
          <>
            <ListItem key="users" disablePadding>
              <ListItemButton to="/adminaction">
                <ListItemIcon>
                  <ManageAccountsIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Manage Staff"
                  style={{ color: "white" }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem key="handle" disablePadding>
              <ListItemButton to="/reset">
                <ListItemIcon>
                  <GroupsIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Handle Staff" style={{ color: "white" }} />
              </ListItemButton>
            </ListItem>
          </>
        ) : null}
        <ListItem key="Logout" disablePadding>
          <ListItemButton to="/logout">
            <ListItemIcon>
              <LogoutIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Log out" style={{ color: "white" }} />
          </ListItemButton>
        </ListItem>
        {user.role === "reset" ? (


          <ListItem key="amount" disablePadding>
            <ListItemButton to="/amount">
              <ListItemIcon>
                <GamesIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Amount" style={{ color: "white" }} />
            </ListItemButton>
          </ListItem>

        ) : null}
      </List>
      <Divider />
    </div>
  );
};

Sidebar.propTypes = {
  handleDrawerToggle: PropTypes.func.isRequired,
};

// export default Sidebar;
const mapStateToProps = (state) => {
  return {
    candidate: state.candidate,
    employee: state.employee,
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ requestAddResume, requestApplyJob }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
