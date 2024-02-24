// import Sidebar from "./sidebar";
// import Header from "./header";
// import Footer from "./footer";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    requestAdminCompanyJob
} from "../Redux/actions";
// import image from "../images/extraLogo.png";
// import image1 from "../images/extraLogo.png";
import CanvasJSReact from "./canvasjs.react";
import Layout from "./Layout";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Graph = (props) => {

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
    const [functionalCanditateData, setfunctionalCanditateData] = useState([]);
    const [functionalCanditateDatadata, setfunctionalCanditateDatadata] = useState([]);

    useEffect(() => {
        props.requestAdminCompanyJob();
    }, []);

    const [allCountData, setallCountData] = useState({})


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

    const companyJobDataoptions = {
        data: [
            {
                type: "column",
                dataPoints: companyJobDatadata,
            }
        ]
    }
    return (
        <Layout>

            <div class="container-scroller">
                {/* <Header name="Home" /> */}
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
                                                       Source Wise Admission
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

                    </div>
                </div>
            </div>
        </Layout>
    );
}
const mapStateToProps = (state) => {
    return { data: state.data };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            requestAdminCompanyJob
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
