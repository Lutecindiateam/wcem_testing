import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  requestAdminEditCareer,
  requestAdminMonthAppliedJob,
} from "../../Redux/actions";
import Layout from "../Layout";
import { Button } from "@material-ui/core";

/**
 * @author
 * @function createRole
 **/

const CreateRole = (props) => {
  console.log(props);
  return (
    <Layout>
      <Button
        type="primary"
        htmlType="submit"
        shape="round"
        // onClick={onClickLoading}
        style={{ backgroundColor: "#2c3e50", color: "white" }}
      >
        Create Role
      </Button> 
    </Layout>
  );
};
const mapStateToProps = (state) => {
  return { data: state.data };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { requestAdminEditCareer, requestAdminMonthAppliedJob },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CreateRole);
