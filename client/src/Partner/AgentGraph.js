// import Sidebar from "./sidebar";
// import Header from "./header";
// import Footer from "./footer";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    requestApprove,
    requestInterviewApprove
} from "../Redux/actions";
// import image from "../images/extraLogo.png";
// import image1 from "../images/extraLogo.png";
import CanvasJSReact from "./canvasjs.react";
import Layout from "./Layout";
import { Spin } from 'antd';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const AgentGraph = (props) => {
    const [companyJobData, setcompanyJobData] = useState([]);
    const [companyJobDatadata, setcompanyJobDatadata] = useState([]);
    const [amount, setAmount] = useState([]);
    const [spinning, setSpinning] = useState(false);

    useEffect(() => {
        setSpinning(true);
        props.requestApprove({
            id: props.id
        });
        props.requestInterviewApprove({
            id: props.id
        })
    }, [props.id]);

    const [allCountData, setallCountData] = useState({})


    useEffect(() => {
        let approveData = props.employee.approveData;
        if (approveData !== undefined) {
            if (approveData?.data?.status == "success") {
                setcompanyJobData(approveData.data.data);
                approveData = approveData.data.data
                let companyJobDatadata = [];
                approveData.map((i, index) => {
                    companyJobDatadata.push({
                        label: i.stage,
                        y: i.total_stagewise,
                    });
                });
                setcompanyJobDatadata(companyJobDatadata)
            }
        }
        setSpinning(false);
    }, [props.employee.approveData]);

    const companyJobDataoptions = {
        data: [
            {
                type: "column",
                dataPoints: companyJobDatadata,
            }
        ]
    }

    useEffect(() => {
        let interviewApproveData = props.employee.interviewApproveData;
        if (interviewApproveData !== undefined) {
            if (interviewApproveData?.data?.status == "success") {
                setcompanyJobData(interviewApproveData.data.data);
                interviewApproveData = interviewApproveData.data.data;
                let amount = interviewApproveData.map((i, index) => ({
                    // label: `Entry ${index + 1}`,
                    totalAmount: i.totalAmount,
                    totalPaid: i.totalPaid
                }));
                setAmount(amount);
            }
        }
        setSpinning(false);
    }, [props.employee.interviewApproveData]);

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


    return (
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
                                            Stage Wise Candidate
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
            <Spin spinning={spinning} fullscreen />

        </div>

    );
}
const mapStateToProps = (state) => {
    return {
        employee: state.employee,
        data: state.data
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            requestApprove,
            requestInterviewApprove
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AgentGraph);



{/* <div class="container-scroller">
                <div class="container-fluid page-body-wrapper">
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
                                                        Stage Wise Admission
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
                                                        Total Payable Amount And Paid Amount
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
                                                <CanvasJSChart options={amountoptions} />
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
