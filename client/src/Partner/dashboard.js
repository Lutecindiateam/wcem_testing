import React, { Fragment, useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import Layout from "./Layout";
import "./style.css";
import QuickLinks from "./quick";
import { bindActionCreators } from "redux";
import {
  requestAddResume,
  requestApplyJob,
  requestAdminGetProfile,
  requestJobDetails,
  requestAdminMonthJob,
  requestGetCandidate,
  requestGetApplyJob,
  requestCandidateForJob,
  requestAdminCategoryJob,
  requestJobs,
  requestEmpJoblist,
  requestGetJobAlert,
  requestAdminSixCompanies,
} from "../Redux/actions";
import { connect } from "react-redux";
import Pie from "./pie";
import Bar from "./bar";
import DemoBar from "./calender";
import { Navigate } from "react-router-dom";
import Graph from "./Graph";
import AgentGraph from "./AgentGraph";

const Dashboard = ({ information, ...props }) => {
  const [user, setUser] = useState({});
  const [list, setList] = useState([]);
  const [rejList, setRejList] = useState([]);
  const [source, setSource] = useState([])
  const [stages, setStages] = useState()
  // console.log(user);
  // useEffect(() => {
  //   let loginData = props.candidate.loginData;
  //   if (loginData !== undefined) {
  //     if (loginData?.data?.status === "success") {
  //       setUser(loginData.data.data);
  //     }
  //   }
  // }, [props?.candidate?.loginData]);

  // useEffect(() => {
  //   let loginData = props.data.loginData;
  //   if (loginData !== undefined) {
  //     if (loginData?.data?.status == "success") {
  //       if (loginData?.data?.data.role === "admin") {
  //         setUser(loginData.data.data);
  //       }
  //     }
  //   }
  // }, [props?.data?.loginData]);

  // useEffect(() => {
  //   if (user.role === "admin") {
  //     props.requestAdminGetProfile({
  //       id: user.id,
  //     });
  //   } else {
  //     props.requestJobDetails({
  //       id: user.id,
  //     });
  //   }
  // }, [user]);

  //for proxy & employee  registration
  // useEffect(() => {
  //   let loginData = props.data.loginData;
  //   if (loginData !== undefined) {
  //     if (loginData?.data?.status == "success") {
  //       if (
  //         loginData?.data?.data.role === "admin" ||
  //         loginData?.data?.data.role === "editor" ||
  //         loginData?.data?.data.role === "superadmin"
  //       ) {
  //         props.requestGetJobAlert({
  //           // id: loginData.data.data.id,
  //           // role: loginData.data.data.role,
  //           token: loginData.data.data.token,
  //         });
  //       }
  //     }
  //   }
  // }, [props?.data?.loginData, props.candidate.candidatePictureData]);

  useEffect(() => {
    let jobAlertData = props.candidate.jobAlertData;
    if (jobAlertData !== undefined) {
      if (jobAlertData?.data?.status === "success") {
        setSource(jobAlertData.data.data.response);
      }
    }
  }, [props.candidate.jobAlertData]);

  useEffect(() => {
    let lastSixEmpData = props.data.lastSixEmpData;
    if (lastSixEmpData !== undefined) {
      if (lastSixEmpData?.data?.status === "success") {
        setStages(lastSixEmpData.data.data);
      }
    }
  }, [props.data.lastSixEmpData]);

  useEffect(() => {
    // console.log("hello");
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        setUser(loginData.data.data);
        // if (loginData.data.data.role === "editor") {
        //   props.requestGetApplyJob({
        //     id: loginData.data.data.id,
        //     role: loginData.data.data.role,
        //     token: loginData.data.data.token,
        //   });
        // }
        props.requestGetCandidate({
          id: loginData.data.data.id,
          role: loginData.data.data.role,
          token: loginData.data.data.token,
        });
        props.requestCandidateForJob({
          id: loginData.data.data.id,
        });
      }
    }
  }, [props.candidate.loginData, props.candidate.applyJobData]);

  useEffect(() => {
    // console.log("hello");
    let empLoginData = props.employee.empLoginData;
    if (empLoginData !== undefined) {
      if (empLoginData?.data?.status == "success") {
        setUser(empLoginData.data.data);
        props.requestEmpJoblist({
          id: empLoginData.data.data.id,
          token: empLoginData.data.data.token,
        });
        // props.requestCandidateForJob({
        //   id: empLoginData.data.data.id,
        // });
      }
    }
  }, [props.employee.empLoginData]);

  useEffect(() => {
    let empJobListData = props.employee.empJobListData;
    // console.log(empJobListData);
    if (empJobListData !== undefined) {
      if (empJobListData?.data?.status === "success") {
        setList(empJobListData.data.data.response);
      }
    }
  }, [props?.employee?.empJobListData]);


  useEffect(() => {
    let getCandidateData = props.candidate.getCandidateData;
    // console.log(getCandidateData);
    if (getCandidateData !== undefined) {
      if (getCandidateData?.data?.status === "success") {
        setList(getCandidateData.data.data.response);
      }
    }
  }, [props?.candidate?.getCandidateData]);

  // //for editor all admission
  // useEffect(() => {
  //   let getApplyJobData = props.candidate.getApplyJobData;
  //   // console.log(getCandidateData);
  //   if (getApplyJobData !== undefined) {
  //     if (getApplyJobData?.data?.status === "success") {
  //       setList(getApplyJobData.data.data.response);
  //     }
  //   }
  // }, [props?.candidate?.getApplyJobData]);

  //for admin total registration data
  useEffect(() => {
    let loginData = props.data.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        if (
          loginData?.data?.data.role === "admin" ||
          loginData?.data?.data.role === "editor" ||
          loginData?.data?.data.role === "superadmin"
        ) {
          setUser(loginData.data.data);
          props.requestAdminMonthJob({
            token: loginData.data.data.token,
          });
          props.requestGetJobAlert({
            token: loginData.data.data.token,
          });
          props.requestAdminSixCompanies();
        }
      }
    }
  }, [props?.data?.loginData]);

  // console.log(user);
  useEffect(() => {
    let monthWiseJobData = props.data.monthWiseJobData;
    if (monthWiseJobData !== undefined) {
      if (monthWiseJobData?.data?.status == "success") {
        setList(monthWiseJobData.data.data.response);
      }
    }
  }, [props?.data?.monthWiseJobData]);

  useEffect(() => {
    let loginData = props.data.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        const { role } = loginData?.data?.data;
        if (
          role === "admin" || role === "editor" || role === "superadmin"
        ) {
          setUser(loginData.data.data);
          props.requestAdminCategoryJob({
            token: loginData.data.data.token,
          });
        }
      }
    }
  }, [
    props.data.loginData,
    props.data.editSizeData,
    props.data.editPeriodData,
  ]);

  useEffect(() => {
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        if (loginData?.data?.data.role === "clerk") {
          props.requestJobs({
            token: loginData.data.data.token,
          });
        }
      }
    }
  }, [props.candidate.loginData, props.candidate.candidateProfileData]);

  useEffect(() => {
    let jobsData = props.candidate.jobsData;
    if (jobsData !== undefined) {
      if (jobsData?.data?.status === "success") {
        setRejList(jobsData.data.data.response);
      }
    }
  }, [props.candidate.jobsData]);


  //Admin api
  useEffect(() => {
    let categoryJobData = props.data.categoryJobData;
    if (categoryJobData !== undefined) {
      if (categoryJobData?.data?.status == "success") {
        setRejList(categoryJobData.data.data.response);
      }
    }
  }, [
    props.data.categoryJobData,
    props.data.loginData,
    props.candidate.loginData,
  ]);


  return (
    <Layout>
      <Fragment>
        <br />
        <div>
          <QuickLinks />
          <br />
          <div className="row">
            <div className="col-xl-3 col-sm-6 col-12 feature-card">
              <div className="card dashboard-card">
                <div className="card-content">
                  <div
                    className="card-body dashboard-card-body"
                    style={{
                      borderRadius: "10px",
                      background:
                        "linear-gradient(90deg, hsla(211, 87%, 65%, 1) 0%, hsla(211, 33%, 30%, 1) 100%)",
                    }}
                  >
                    <div className="media d-flex">
                      <div className="media-body text-left">
                        <h3 className="">{list?.length ? list?.length + rejList.length : 0}</h3>
                        <span className="">Total Admission Entries</span>
                      </div>
                      <div className="align-self-center">
                        <i
                          className="icon-cloud-download font-large-2 float-right"
                          style={{ color: "#fff	" }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 feature-card">
              <div className="card dashboard-card">
                <div className="card-content">
                  <div
                    className="card-body dashboard-card-body"
                    style={{
                      borderRadius: "10px",
                      background:
                        "linear-gradient(90deg, hsla(161, 68%, 73%, 1) 0%, hsla(161, 100%, 27%, 1) 100%)",
                    }}
                  >
                    <div className="media d-flex">
                      <div className="media-body text-left">
                        <h3 className="">
                          {list
                            ? list.filter(
                              (user) => user.status === "true"
                            ).length
                            : 0}
                        </h3>
                        <span className="">Complete Admissions</span>
                      </div>
                      <div className="align-self-center">
                        <i
                          className="icon-rocket font-large-2 float-right"
                          style={{ color: "#fff	" }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 col-12 feature-card">
              <div className="card dashboard-card">
                <div className="card-content">
                  <div
                    className="card-body dashboard-card-body"
                    style={{
                      borderRadius: "10px",
                      background:
                        "linear-gradient(90deg, hsla(223, 28%, 73%, 1) 0%, hsla(222, 22%, 48%, 1) 100%)",
                    }}
                  >
                    <div className="media d-flex">
                      <div className="media-body text-left">
                        <h3 className="">
                          {user.role === "agent" ? (

                            list.filter(post => post.rejection !== null)
                              .length
                          ) :
                            (
                              rejList
                                ? rejList.length
                                : 0)
                          }
                        </h3>
                        <span className="">Rejected Application</span>
                      </div>
                      <div className="align-self-center">
                        <i
                          className="icon-wallet font-large-2 float-right"
                          style={{ color: "#fff	" }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 feature-card">
              <div className="card dashboard-card">
                <div className="card-content">
                  <div
                    className="card-body dashboard-card-body"
                    style={{
                      borderRadius: "10px",
                      background:
                        "linear-gradient(90deg, hsla(287, 46%, 75%, 1) 2%, hsla(287, 24%, 44%, 1) 100%)",
                    }}
                  >
                    <div className="media d-flex">
                      <div className="media-body text-left">
                        <h3 className="">
                          {information?.sale_count
                            ? information?.sale_count
                            : 0}
                        </h3>
                        <span className="">Other </span>
                      </div>
                      <div className="align-self-center">
                        <i
                          className="icon-wallet font-large-2 float-right"
                          style={{ color: "#fff	" }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {user.role === "editor" || user.role === "admin" || user.role === "superadmin" ?
              <>
                <div className="col-xl-3 col-sm-6 col-12 feature-card">
                  <div className="card dashboard-card">
                    <div className="card-content">
                      <div
                        className="card-body dashboard-card-body"
                        style={{
                          borderRadius: "10px",
                          background:
                            "linear-gradient(90deg, hsla(287, 46%, 75%, 1) 2%, hsla(287, 24%, 44%, 1) 100%)",
                        }}
                      >
                        <div className="media d-flex">
                          <div className="media-body text-left">
                            <h3 className="">
                              {stages ? stages.stage1
                                : 0}
                            </h3>
                            <span className="">Stage 1 </span>
                          </div>
                          <div className="align-self-center">
                            <i
                              className="icon-wallet font-large-2 float-right"
                              style={{ color: "#fff	" }}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12 feature-card">
                  <div className="card dashboard-card">
                    <div className="card-content">
                      <div
                        className="card-body dashboard-card-body"
                        style={{
                          borderRadius: "10px",
                          background:
                            "linear-gradient(90deg, hsla(223, 28%, 73%, 1) 0%, hsla(222, 22%, 48%, 1) 100%)",
                        }}
                      >
                        <div className="media d-flex">
                          <div className="media-body text-left">
                            <h3 className="">
                              {stages ? stages.stage2
                                : 0}
                            </h3>
                            <span className=""> Stage 2</span>
                          </div>
                          <div className="align-self-center">
                            <i
                              className="icon-wallet font-large-2 float-right"
                              style={{ color: "#fff	" }}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12 feature-card">
                  <div className="card dashboard-card">
                    <div className="card-content">
                      <div
                        className="card-body dashboard-card-body"
                        style={{
                          borderRadius: "10px",
                          background:
                            "linear-gradient(90deg, hsla(161, 68%, 73%, 1) 0%, hsla(161, 100%, 27%, 1) 100%)",
                        }}
                      >
                        <div className="media d-flex">
                          <div className="media-body text-left">
                            <h3 className="">
                              {stages ? stages.stage3
                                : 0}
                            </h3>
                            <span className="">Stage 3</span>
                          </div>
                          <div className="align-self-center">
                            <i
                              className="icon-rocket font-large-2 float-right"
                              style={{ color: "#fff	" }}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12 feature-card">
                  <div className="card dashboard-card">
                    <div className="card-content">
                      <div
                        className="card-body dashboard-card-body"
                        style={{
                          borderRadius: "10px",
                          background:
                            "linear-gradient(90deg, hsla(211, 87%, 65%, 1) 0%, hsla(211, 33%, 30%, 1) 100%)",
                        }}
                      >
                        <div className="media d-flex">
                          <div className="media-body text-left">
                            <h3 className="">{source ? source?.length : 0}</h3>
                            <span className="">Total Staff</span>
                          </div>
                          <div className="align-self-center">
                            <i
                              className="icon-cloud-download font-large-2 float-right"
                              style={{ color: "#fff	" }}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
              : null
            }

          </div>
          {
            // console.log(user.role === "editor" || user.role === "admin" || user.role === "superadmin") &&
            user.role === "editor" || user.role === "admin" || user.role === "superadmin" ?
              <Bar />
              : null
          }
          {
            user.role === "agent" ? (
              <AgentGraph
                id={user.id}
              />
            ) : null
          }
          {/* <br /> */}
          {/* {user.role === "superadmin" ? (
            <Graph />
          ) : null} */}

          {/* <div>
            <Graph />
            
          </div> */}

        </div>
      </Fragment>
    </Layout>
  );
};

// export default Dashboard;
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
      requestAddResume,
      requestApplyJob,
      requestAdminGetProfile,
      requestJobDetails,
      requestAdminMonthJob,
      requestGetCandidate,
      requestGetApplyJob,
      requestCandidateForJob,
      requestAdminCategoryJob,
      requestJobs,
      requestEmpJoblist,
      requestGetJobAlert,
      requestAdminSixCompanies,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
