import React, { useEffect, useState } from 'react'
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestAdminFunctionalCandidate, requestAddJob } from "../Redux/actions";

/**
* @author
* @function Amt_Table
**/

const Amt_Table = (props) => {
    const [user, setUser] = useState({});
    const [data, setData] = useState([]);


    useEffect(() => {
        let loginData = props.data.loginData;
        if (loginData !== undefined) {
            if (loginData?.data?.status == "success") {
                if (
                    loginData?.data?.data.role === "admin" ||
                    loginData.data.data.role === "editor" ||
                    loginData.data.data.role === "superadmin"
                ) {
                    setUser(loginData.data.data);
                    props.requestAdminFunctionalCandidate({
                        id: props.id,
                        // token: loginData.data.data.token,
                    });
                }
            }
        }
    }, [props.data.loginData]);

    useEffect(() => {
        let empLoginData = props.employee.empLoginData;
        if (empLoginData !== undefined) {
            if (empLoginData?.data?.status == "success") {
                setUser(empLoginData.data.data);
                props.requestAddJob({
                    id: props.id,
                    // token: loginData.data.data.token,
                });
            }
        }
    }, [props.employee.empLoginData]);

    
    useEffect(() => {
        let empAddJobData = props.employee.empAddJobData;
        if (empAddJobData !== undefined) {
            if (empAddJobData?.data?.status === "success") {
                setData(empAddJobData.data.data);
            }
        }
    }, [props.employee.empAddJobData])

    useEffect(() => {
        let functionalCanditateData = props.data.functionalCanditateData;
        if (functionalCanditateData !== undefined) {
            if (functionalCanditateData?.data?.status === "success") {
                setData(functionalCanditateData.data.data);
            }
        }
    }, [props.data.functionalCanditateData])


    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell><b>S.N</b></TableCell>
                    <TableCell><b>Total Incentive</b></TableCell>
                    <TableCell><b>Paid</b></TableCell>
                    <TableCell><b>Date</b></TableCell>
                    <TableCell><b>Cheque No.</b></TableCell>
                    <TableCell><b>Balance</b></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>

                {data.map((data, index) => {
                    return (
                        <>
                            {/* {data && data.status == "success" ? ( */}
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{data.adv_payble_amt}</TableCell>
                                <TableCell>{data.paid_amount}</TableCell>
                                <TableCell>{data.cheque_date}</TableCell>
                                <TableCell>{data.cheque_no}</TableCell>
                                <TableCell>{data.balance}</TableCell>

                                {/* <TableCell>
                                    <Button variant="contained" disabled>Accept</Button>
                                </TableCell> */}
                            </TableRow>
                            {/* ) : (<TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{data.name}</TableCell>
                                <TableCell style={{ color: "red" }}>{data.status}</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => handleSubmit(data._id)}>Accept</Button>
                                </TableCell>
                            </TableRow>)
                            } */}
                        </>
                    );

                })}
            </TableBody>
        </Table>)

}

const mapStateToProps = (state) => {
    return {
        candidate: state.candidate,
        employee:state.employee,
        data: state.data
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ requestAdminFunctionalCandidate, requestAddJob }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Amt_Table);