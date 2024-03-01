import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  requestAdminCandidateDetails,
  requestAdminCareer,
  requestAdminJobDetails,
  requestAdminSixJobs,
  requestAdminCompanyJob,

  // requestAdminAllCount,
  // requestAdminSixCompanies,
  // requestAdminMonthAppliedJob,
  // requestAdminMonthJob,
  // requestAdminCategoryJob,
  // requestAdminFunctionalCandidate,
} from "../Redux/actions";
// import image from "../images/extraLogo.png";
// import image1 from "../images/extraLogo.png";
import CanvasJSReact from "./canvasjs.react";
import { Spin } from 'antd';
import { Link } from "react-scroll"
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button } from "@mui/material";
// import './bar.css'
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


function Bar(props) {

  const [lastSixJobData, setlastSixJobData] = useState([]);
  const [lastSixEmpData, setlastSixEmpData] = useState([]);
  const [monthjob, setmonthjob] = useState({});
  const [monthjobdata, setmonthjobdata] = useState([]);
  const [monthWiseAppliedjobData, setmonthWiseAppliedjobData] = useState({});
  const [monthWiseAppliedjobDatadata, setmonthWiseAppliedjobDatadata] = useState([]);
  const [categoryJobData, setcategoryJobData] = useState([]);
  const [categoryJobDatadata, setcategoryJobDatadata] = useState([]);
  const [companyJobData, setcompanyJobData] = useState([]);
  const [companyJobDatadata, setcompanyJobDatadata] = useState([]);

  const [companyJobDatadatass, setcompanyJobDatadatass] = useState([]);

  const [functionalCanditateData, setfunctionalCanditateData] = useState([]);
  const [functionalCanditateDatadata, setfunctionalCanditateDatadata] = useState([]);
  const [amount, setAmount] = useState([]);
  const [staffId, setStaffId] = useState(null);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    let loginData = props.data.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        const { role } = loginData?.data?.data;
        if (
          role === "admin" || role === "editor" || role === "superadmin"
        ) {
          props.requestAdminCompanyJob();
          props.requestAdminSixJobs();
          props.requestAdminCandidateDetails();
        }
      }
    }
  }, [props?.data?.loginData]);

  const [allCountData, setallCountData] = useState({})


  const handleStaff = (id) => {
    setSpinning(true);
    setStaffId(id);
    props.requestAdminCareer({
      id: id
    })
    props.requestAdminJobDetails({
      id: id
    })
  }
  // useEffect(() => {
  //   let counts = props.data.allCountData
  //   if (counts !== undefined) {
  //     if (counts.data) {
  //       setallCountData(counts.data.data)
  //     }
  //   }
  // }, [props.data.allCountData])

  useEffect(() => {
    let lastSixJobData = props.data.lastSixJobData;
    if (lastSixJobData !== undefined) {
      if (lastSixJobData?.data?.status == "success") {
        setlastSixJobData(lastSixJobData.data.data.response);
      }
    }
  }, [props.data.lastSixJobData]);


  // useEffect(() => {
  //   let lastSixEmpData = props.data.lastSixEmpData;
  //   if (lastSixEmpData !== undefined) {
  //     if (lastSixEmpData?.data?.status == "sucess") {
  //       setlastSixEmpData(lastSixEmpData.data.data);
  //     }
  //   }
  // }, [props.data.lastSixEmpData]);

  // useEffect(() => {
  //   let monthjob = props.data.monthjob;
  //   if (monthjob !== undefined) {
  //     if (monthjob?.data?.status == "sucess") {
  //       setmonthjob(monthjob.data.data);
  //       monthJobfun();
  //     }
  //   }
  // }, [props.data.monthjob]);

  // useEffect(() => {
  //   let monthWiseAppliedjobData = props.data.monthWiseAppliedjobData;
  //   if (monthWiseAppliedjobData !== undefined) {
  //     if (monthWiseAppliedjobData?.data?.status == "sucess") {
  //       setmonthWiseAppliedjobData(monthWiseAppliedjobData.data.data);
  //       monthAppliedJobfun();
  //     }
  //   }
  // }, [props.data.monthWiseAppliedjobData]);

  useEffect(() => {
    let careerData = props.data.careerData;
    if (careerData !== undefined) {
      if (careerData?.data?.status == "success") {
        setmonthWiseAppliedjobData(careerData.data.data);
        monthAppliedJobfun();
        setSpinning(false);
      }
    }
    setSpinning(false);
  }, [props.data.careerData]);

  // function monthJobfun() {
  //   Object.keys(monthjob).map((key) => {
  //     monthjobdata.push({
  //       y: monthjob[key][0],
  //       label: key,
  //     });
  //   });
  // }

  function monthAppliedJobfun() {
    Object.keys(monthWiseAppliedjobData).map((key) => {
      monthWiseAppliedjobDatadata.push({
        y: monthWiseAppliedjobData[key][0],
        label: key,
      });
    });
  }

  // const options = {
  //   exportEnabled: true,
  //   zoomEnabled: true,
  //   animationEnabled: true,
  //   axisY: {
  //     title: "Number of Jobs",
  //   },
  //   toolTip: {
  //     shared: true,
  //   },
  //   data: [
  //     {
  //       type: "spline",
  //       name: "Posted Job",
  //       showInLegend: true,
  //       dataPoints: monthjobdata,
  //     },
  //     {
  //       type: "spline",
  //       name: "Applied Job",
  //       showInLegend: true,
  //       dataPoints: monthWiseAppliedjobDatadata,
  //     },
  //   ],
  // };

  // useEffect(() => {
  //   let categoryJobData = props.data.categoryJobData;
  //   if (categoryJobData !== undefined) {
  //     if (categoryJobData?.data?.status == "sucess") {
  //       setcategoryJobData(categoryJobData.data.data);
  //       categoryJobfun();
  //     }
  //   }
  // }, [props.data.categoryJobData]);
  useEffect(() => {
    let candidateDeatilsData = props.data.candidateDeatilsData;
    if (candidateDeatilsData !== undefined) {
      if (candidateDeatilsData?.data?.status == "success") {
        setcategoryJobData(candidateDeatilsData.data.data);
        categoryJobfun();
      }
    }
  }, [props.data.candidateDeatilsData]);

  function categoryJobfun() {
    if (categoryJobData && categoryJobData.length > 0) {

    categoryJobData.map((i, index) => {
      categoryJobDatadata.push({
        name: i.name,
        y: i.total_branchwiseadm,
      });
    });
  }
  }
  
  // useEffect(() => {
  //   categoryJobfun();
  // }, [categoryJobData]);


  useEffect(() => {
    let companyJobData = props.data.companyJobData;
    if (companyJobData !== undefined) {
      if (companyJobData?.data?.status == "success") {
        setcompanyJobData(companyJobData.data.data);
        companyJobData = companyJobData.data.data
        let companyJobDatadata = [];
        companyJobData.map((i, index) => {
          companyJobDatadata.push({
            label: i.source,
            y: i.total_sourcewiseadm,
          });
        });
        setcompanyJobDatadata(companyJobDatadata)
      }
    }
  }, [props.data.companyJobData]);

  // useEffect(() => {
  //   let jobDeatilsData = props.data.jobDeatilsData;
  //   console.log(jobDeatilsData);
  //   if (jobDeatilsData !== undefined) {
  //     if (jobDeatilsData?.data?.status == "success") {
  //       setfunctionalCanditateData(jobDeatilsData.data.data);
  //       jobDeatilsData = jobDeatilsData.data.data
  //       let functionalCanditateDatadata = [];
  //       functionalCanditateData.map((i, index) => {
  //         functionalCanditateDatadata.push({
  //           name: i.totalAmount,
  //           y: i.totalPaid,
  //         });
  //       });
  //       setfunctionalCanditateDatadata(functionalCanditateDatadata)
  //     }
  //   }
  // }, [props.data.jobDeatilsData]);
  // useEffect(() => {
  //   let functionalCanditateData = props.data.functionalCanditateData;
  //   if (functionalCanditateData !== undefined) {
  //     if (functionalCanditateData?.data?.status == "sucess") {
  //       setfunctionalCanditateData(functionalCanditateData.data.data);
  //       functionalCanditateData = functionalCanditateData.data.data
  //       let functionalCanditateDatadata = [];
  //       functionalCanditateData.map((i, index) => {
  //         functionalCanditateDatadata.push({
  //           name: i.name,
  //           y: i.total_companywisejob,
  //         });
  //       });
  //       setfunctionalCanditateDatadata(functionalCanditateDatadata)
  //     }
  //   }
  // }, [props.data.functionalCanditateData]);

  // function todayCount(count) {
  //   return (count ?
  //     (<p class="text-success d-flex">
  //       <i class="mdi mdi-menu-up"></i>
  //       <span>{count}</span>
  //     </p>) :
  //     (<p style={{ visibility: 'hidden' }}>0</p>)
  //   )
  // }
  const options1 = {
    exportEnabled: true,
    zoomEnabled: true,
    animationEnabled: true,
    subtitles: [
      {
        verticalAlign: "center",
        fontSize: 24,
        dockInsidePlotArea: true,
      },
    ],
    data: [
      {
        type: "doughnut",
        showInLegend: true,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###",
        dataPoints: categoryJobDatadata,
      },
    ],
  };
  // const functionalCanditateDataoptions = {
  //   exportEnabled: true,
  //   responsive: true,
  //   zoomEnabled: true,
  //   animationEnabled: true,
  //   subtitles: [
  //     {
  //       verticalAlign: "center",
  //       fontSize: 24,
  //       dockInsidePlotArea: true,
  //     },
  //   ],
  //   data: [
  //     {
  //       type: "doughnut",
  //       showInLegend: true,
  //       indexLabel: "{name}: {y}",
  //       yValueFormatString: "#,###",
  //       dataPoints: functionalCanditateDatadata,
  //     },
  //   ],
  // };
  const companyJobDataoptions = {
    data: [
      {
        type: "column",
        dataPoints: companyJobDatadata,
      }
    ]
  }



  useEffect(() => {
    let careerData = props.data.careerData;
    if (careerData !== undefined) {
      if (careerData?.data?.status == "success") {
        setcompanyJobData(careerData.data.data);
        careerData = careerData.data.data
        let companyJobDatadatass = [];
        careerData.map((i, index) => {
          companyJobDatadatass.push({
            label: i.stage,
            y: i.total_stagewise,
          });
        });
        setcompanyJobDatadatass(companyJobDatadatass)
      }
    }
    // setSpinning(false);
  }, [props.data.careerData]);

  const companyJobDataoptionss = {
    data: [
      {
        type: "column",
        dataPoints: companyJobDatadatass,
      }
    ]
  }


  useEffect(() => {
    let jobDeatilsData = props.data.jobDeatilsData;
    if (jobDeatilsData !== undefined) {
      if (jobDeatilsData?.data?.status == "success") {
        setcompanyJobData(jobDeatilsData.data.data);
        jobDeatilsData = jobDeatilsData.data.data;
        let amount = jobDeatilsData.map((i, index) => ({
          // label: `Entry ${index + 1}`,
          totalAmount: i.totalAmount,
          totalPaid: i.totalPaid
        }));
        setAmount(amount);
      }
    }
    // setSpinning(false);
  }, [props.data.jobDeatilsData]);

  const amountoptions = {
    data: [
      {
        type: "column",
        dataPoints: amount.map(item => ({
          label: "Total Payable Amount",
          y: item.totalAmount
        })),
        name: "Total Amount"
      },
      {
        type: "column",
        dataPoints: amount.map(item => ({
          label: "Paid Amount",
          y: item.totalPaid
        })),
        name: "Total Paid"
      }
    ]
  };

  const columns = [
    { field: "id", headerName: "Sr.No.", width: 100 },
    { field: "name", headerName: "Name", flex: 1 },
    // { field: "documents", headerName: "Documets", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "view",
      headerName: "View",
      flex: 1,
      renderCell: (params) => (
        <Link to="graph" spy={true} smooth={true}>
          <Button onClick={() => handleStaff(params.row.view)}>
            View
          </Button>
        </Link>
      ),
    },
  ];
  const rows = lastSixJobData.map((item, index) => ({
    id: index + 1,
    name: item.name,
    email: item.email,
    view: item._id,
  }));

  return (
    <>
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-sm-12">
              <div class="home-tab">
                <div class="tab-content tab-content-basic">
                  <div
                    class="tab-pane fade show active"
                    id="overview"
                    role="tabpanel"
                    aria-labelledby="overview"
                  >
                    {/* <div class="row" style={{ marginTop: "-20px" }}>
                      <div class="col-sm-12">
                        <div class="statistics-details d-flex align-items-center justify-content-between">
                          <div>
                            <p class="statistics-title">Jobs</p>
                            <h3 class="rate-percentage">{allCountData?.alljobsCount || 0}</h3>
                            {todayCount(allCountData?.todayjobsCount)}
                          </div>
                          <div>
                            <p class="statistics-title">Candidates</p>
                            <h3 class="rate-percentage">{allCountData?.allcandidatesCount || 0}</h3>
                            {todayCount(allCountData?.todaycandidatesCount)}
                          </div>
                          <div>
                            <p class="statistics-title">Companies</p>
                            <h3 class="rate-percentage">{allCountData?.empcount || 0}</h3>
                            {todayCount(allCountData?.todayempCount)}
                          </div>
                          <div class="d-none d-md-block">
                            <p class="statistics-title">Applied Jobs</p>
                            <h3 class="rate-percentage">{allCountData?.allappliedjobsCount || 0}</h3>
                            {todayCount(allCountData?.todayappliedjobsCount)}
                          </div>
                          <div class="d-none d-md-block">
                            <p class="statistics-title">Contact Us</p>
                            <h3 class="rate-percentage">{allCountData?.replynullcountcontect || 0}</h3>
                            {todayCount(allCountData?.todaycontactcount)}
                          </div>
                          <div class="d-none d-md-block">
                            <p class="statistics-title">Subscribers</p>
                            <h3 class="rate-percentage">{allCountData?.allsubscribersCount || 0}</h3>
                            {todayCount(allCountData?.todaysubscribersCount)}
                          </div>
                        </div>
                      </div>
                    </div> */}
                    <div class="row">
                      <div class="col-lg-8 d-flex flex-column">
                        <div class="row flex-grow">
                          <div class="col-12 col-lg-4 col-lg-12 grid-margin stretch-card">
                            <div class="card card-rounded">
                              <div
                                class="card-body"
                                style={{ padding: "30px" }}
                              >
                                <div class="d-sm-flex justify-content-between align-items-start">
                                  <div>
                                    <h4 class="card-title card-title-dash">
                                      Staff Wise Candidate
                                    </h4>
                                  </div>
                                </div>
                                <div
                                  class="chartContainer"
                                  style={{
                                    position: "relative",
                                  }}
                                >
                                  <br />
                                  <CanvasJSChart options={companyJobDataoptions} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div class="col-lg-8 d-flex flex-column">
                        <div class="row flex-grow">
                          <div class="col-12 col-lg-4 col-lg-12 grid-margin stretch-card">
                            <div class="card card-rounded">
                              <div
                                class="card-body"
                                style={{ padding: "30px" }}
                              >
                                <div class="d-sm-flex justify-content-between align-items-start">
                                  <div>
                                    <h4 class="card-title card-title-dash">
                                      Performance Line Chart
                                    </h4>
                                  </div>
                                </div>
                                <div
                                  class="chartContainer"
                                  style={{
                                    position: "relative",
                                  }}
                                >
                                  <br />
                                  <CanvasJSChart options={options} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                      <div class="col-lg-4 d-flex flex-column">
                        <div class="row flex-grow">
                          <div class="col-12 grid-margin stretch-card">
                            <div class="card card-rounded">
                              <div class="card-body">
                                <div class="row">
                                  <div class="col-lg-12">
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                      <h4 class="card-title card-title-dash">
                                        Course Wise Candidate
                                      </h4>
                                    </div>
                                    <CanvasJSChart options={options1} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
                    </div>
                    {/* <div class="row">
                      <div class="col-12 d-flex flex-column">
                        <div class="row flex-grow">
                          <div class="col-12 col-lg-4 col-lg-12 grid-margin stretch-card">
                            <div class="card card-rounded">
                              <div class="card-body">
                                <div class="d-sm-flex justify-content-between align-items-start">
                                  <div>
                                    <h4 class="card-title card-title-dash">
                                      Staff
                                    </h4>
                                  </div>
                                </div>
                                <div class="table-responsive  mt-1">
                                  <table class="table select-table">
                                    <thead>
                                      <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>View</th>
                                        <th>View</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {lastSixJobData.map((item, index) => {
                                        const img = item.employee_logo
                                          ? process.env.REACT_APP_API_HOST +
                                          item.employee_logo
                                          : image;
                                        return (
                                          <tr key={index}>
                                            <td>
                                              <div class="d-flex ">

                                                <div>

                                                  <h6>
                                                    {item.name}
                                                  </h6>

                                                </div>
                                              </div>
                                            </td>
                                            <td>

                                              <h6>{item.email}</h6>

                                            </td>

                                            <td>
                                              <Link to="graph" spy={true} smooth={true}>
                                                <button
                                                  class="badge badge-opacity-primary"
                                                  style={{ border: "0px" }}
                                                  onClick={() => handleStaff(item._id)}
                                                >
                                                  <i class="fa fa-eye">View</i>
                                                </button>
                                              </Link>
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    {staffId ? (
                      <div class="row" id="graph">
                        <div class="col-lg-8 d-flex flex-column">
                          <div class="row flex-grow">
                            <div class="col-12 col-lg-4 col-lg-12 grid-margin stretch-card">
                              <div class="card card-rounded">
                                <div
                                  class="card-body"
                                  style={{ padding: "30px" }}
                                >
                                  <div class="d-sm-flex justify-content-between align-items-start">
                                    <div>
                                      <h4 class="card-title card-title-dash">
                                        Staff Performance Stage Wise
                                      </h4>
                                    </div>
                                  </div>
                                  <div
                                    class="chartContainer"
                                    style={{
                                      position: "relative",
                                    }}
                                  >
                                    <br />
                                    <CanvasJSChart options={companyJobDataoptionss} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div class="col-lg-8 d-flex flex-column">
                        <div class="row flex-grow">
                          <div class="col-12 col-lg-4 col-lg-12 grid-margin stretch-card">
                            <div class="card card-rounded">
                              <div
                                class="card-body"
                                style={{ padding: "30px" }}
                              >
                                <div class="d-sm-flex justify-content-between align-items-start">
                                  <div>
                                    <h4 class="card-title card-title-dash">
                                      Performance Line Chart
                                    </h4>
                                  </div>
                                </div>
                                <div
                                  class="chartContainer"
                                  style={{
                                    position: "relative",
                                  }}
                                >
                                  <br />
                                  <CanvasJSChart options={options} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                        {/* <div class="col-lg-8 d-flex flex-column">
                        <div class="row flex-grow">
                          <div class="col-12 col-lg-4 col-lg-12 grid-margin stretch-card">
                            <div class="card card-rounded">
                              <div
                                class="card-body"
                                style={{ padding: "30px" }}
                              >
                                <div class="d-sm-flex justify-content-between align-items-start">
                                  <div>
                                    <h4 class="card-title card-title-dash">
                                      Company Wise Jobs
                                    </h4>
                                  </div>
                                </div>
                                <div
                                  class="chartContainer"
                                  style={{
                                    position: "relative",
                                  }}
                                >
                                  <br />
                                  <CanvasJSChart options={companyJobDataoptions} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                        <div class="col-lg-4 d-flex flex-column">
                          <div class="row flex-grow">
                            <div class="col-12 grid-margin stretch-card">
                              <div class="card card-rounded">
                                <div class="card-body">
                                  <div class="row">
                                    <div class="col-lg-12">
                                      <div class="d-flex justify-content-between align-items-center mb-3">
                                        <h4 class="card-title card-title-dash">
                                          Total Incentive/Total Paid
                                        </h4>
                                      </div>
                                      <CanvasJSChart options={amountoptions} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div class="col-lg-4 d-flex flex-column">
                        <div class="row flex-grow">
                          <div class="col-12 grid-margin stretch-card">
                            <div class="card card-rounded">
                              <div class="card-body">
                                <div class="row">
                                  <div class="col-lg-12">
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                      <h4 class="card-title card-title-dash">
                                        Functional Area Wise Candidates
                                      </h4>
                                    </div>
                                    <CanvasJSChart options={functionalCanditateDataoptions} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                      </div>

                    ) : null}
                    {/* <div class="row">
                      <div class="col-12 d-flex flex-column">
                        <div class="row flex-grow">
                          <div class="col-12 col-lg-4 col-lg-12 grid-margin stretch-card">
                            <div class="card card-rounded">
                              <div class="card-body">
                                <div class="d-sm-flex justify-content-between align-items-start">
                                  <div>
                                    <h4 class="card-title card-title-dash">
                                      Recently Registered Companies
                                    </h4>
                                  </div>
                                </div>
                                <div
                                  class="table-responsive  mt-1"
                                  id="printme"
                                >
                                  <table class="table select-table">
                                    <thead>
                                      <tr>
                                        <th>Company</th>
                                        <th>Contact</th>
                                        <th>Type</th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {lastSixEmpData.map((item, index) => {
                                        const img = item.logo
                                          ? process.env.REACT_APP_API_HOST +
                                          item.logo
                                          : image1;
                                        return (
                                          <tr key={index}>
                                            <td>
                                              <div class="d-flex ">
                                                <a
                                                  href={`/admin/viewCompany/${item.id}`}
                                                >
                                                  {" "}
                                                  <img src={img} alt="" />
                                                </a>
                                                <div>
                                                  <a
                                                    href={`/admin/viewCompany/${item.id}`}
                                                  >
                                                    {" "}
                                                    <h6>{item.name}</h6>
                                                  </a>
                                                  <p>
                                                    <i class="fa fa-map-marker"></i>{" "}
                                                    {item.city_name},{" "}
                                                    {item.state_name},{" "}
                                                    {item.country_name}
                                                  </p>
                                                </div>
                                              </div>
                                            </td>
                                            <td>
                                              <h6>
                                                <a
                                                  href={`mailto:${item.email}`}
                                                >
                                                  {item.email}
                                                </a>
                                              </h6>
                                              <p>
                                                <a
                                                  href={`${item.website}`}
                                                  target="_blank"
                                                >
                                                  {item.website}
                                                </a>
                                              </p>
                                              {item.fax && (
                                                <p>
                                                  <a
                                                    href={`callto:${item.fax}`}
                                                  >
                                                    {item.fax}
                                                  </a>
                                                </p>
                                              )}
                                            </td>
                                            <td>
                                              <h6>
                                                {item.ownership_type_name}
                                              </h6>
                                              <p>{item.industries_name}</p>
                                            </td>
                                            <td>
                                              <a
                                                href={`/admin/viewCompany/${item.id}`}
                                              >
                                                <button
                                                  class="badge badge-opacity-primary"
                                                  style={{ border: "0px" }}
                                                >
                                                  <i class="fa fa-eye"></i>
                                                </button>
                                              </a>
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Spin spinning={spinning} fullscreen />

        </div>
      </div>

    </>
  );
}
const mapStateToProps = (state) => {
  return { data: state.data };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      requestAdminSixJobs,
      requestAdminCompanyJob,
      requestAdminCandidateDetails,
      requestAdminCareer,
      requestAdminJobDetails
      // requestAdminAllCount,
      // requestAdminSixCompanies,
      // requestAdminFunctionalCandidate,
      // requestAdminMonthAppliedJob,
      // requestAdminMonthJob,
      // requestAdminCategoryJob,

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Bar);
