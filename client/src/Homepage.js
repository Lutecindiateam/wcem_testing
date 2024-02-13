import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userLogout } from "./Redux/actions";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function App(props) {
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  const handleOptionChange = (event) => {
    const selectedRoute = event.target.value;
    setSelectedOption(selectedRoute);

    if (selectedRoute) {
      navigate(selectedRoute); // Navigate to the selected route
    }
  };

  useEffect(() => {
    props.userLogout();
  }, []);

  return (
    <>
      <div className="container">
        <nav
          style={{
            position: "absolute",
            top: 0,
            right: "20px",
            padding: "10px",
            zIndex: 1,
          }}
        >
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            style={{ backgroundColor: "white", borderRadius:"10px" }}
          >
            <option value="" disabled>
              Sales Portal
            </option>
            {/* <optgroup label="Activities"> */}
            <option value="/partnerlogin">Clerk</option>
            <option value="/partnerlogin">Editor</option>
            <option value="/partner/admin">Admin</option>
            <option>SuperAdmin</option>
            <option>Agent</option>

            {/* </optgroup> */}
          </select>
        </nav>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return { candidate: state.candidate };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ userLogout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
