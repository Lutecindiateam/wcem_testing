import React from "react";
import Layout from "./Layout";
import { PlusOutlined } from "@ant-design/icons";
import {
  CheckCircleTwoTone,
  HeartTwoTone,
  SmileTwoTone,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Typography,
  Upload,
  Radio,
  Spin
} from "antd";
import { toast } from "react-toastify";
import { Fragment, useEffect, useState } from "react";
import styles from "./AddProd.module.css";
import { bindActionCreators } from "redux";
import {
  requestAddResume,
  requestEmpProfile,
  requestAdminGetProfile,
  requestJobDetails,
  requestGetEmp,
  requestCandidateResume
} from "../Redux/actions";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import { useParams } from "react-router-dom";
import { CloseCircleTwoTone } from "@ant-design/icons";
import { EyeOutlined } from "@ant-design/icons";
import { ImageViewModal } from "./OtpRegister";
import { generatePublicUrl } from "./urlConfig";
import { Storage } from 'aws-amplify';

/**
 * @author
 * @function DocView
 **/

const DocView = (props) => {
  const params = useParams();
  // console.log(params);
  const { Title } = Typography;
  const [fileList, setFileList] = useState([]);
  const [loader, setLoader] = useState(false);
  // const [csvFile, setCsvFile] = useState(null);
  const [user, setUser] = useState({});
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [showOtherInput, setShowOtherInput] = useState(false);

  const [adharFile, setAdharFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [signFile, setSignFile] = useState(null);
  const [tcFile, setTcFile] = useState(null);
  const [tenthFile, setTenthFile] = useState(null);
  const [twelfthFile, setTwelfthFile] = useState(null);
  const [casteFile, setCasteFile] = useState(null);
  const [nclFile, setNclFile] = useState(null);
  const [domicileFile, setDomicileFile] = useState(null);
  const [csvFile, setCsvFile] = useState(null);
  const [cetFile, setCetFile] = useState(null);
  const [otherFile, setOtherFile] = useState(null);
  const [other2File, setOther2File] = useState(null);
  const [other3File, setOther3File] = useState(null);
  const [migrationFile, setMigrationFile] = useState(null);
  const [deplomaFile, setDeplomaFile] = useState(null);
  const [allotmentFile, setAllotmentFile] = useState(null);

  const [document, setDocument] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [branch, setBranch] = useState();
  const [course, setCourse] = useState();
  // const handleSubmit = () => {};
  const [radioValue, setRadioValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const onFinish = async () => {
    if (radioValue === null) {
      // If the user hasn't selected any option, don't proceed
      return;
    }
    setLoading(true);
    try {
      props.requestCandidateResume({
        id: params.id,
        data: radioValue
      })
    } catch (error) {
      console.error('API Error:', error);
      // Handle API error as needed
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    let resumeData = props.candidate.resumeData;
    if (resumeData !== undefined) {
      if (resumeData?.data?.status == "success") {
        Swal.fire("Complete!", "Admission Completed.", "success");
        navigate("/upload")
        // setLoader(false);
        // form.resetFields();
        props.candidate.resumeData = undefined;
      } else {
        Swal.fire("Alert!", "Something Went Wrong.", "error");
        // setLoader(false);
        props.candidate.resumeData = undefined;
      }
    }
  }, [props.candidate.resumeData]);


  const onRadioChange = (e) => {
    setRadioValue(e.target.value);
  };



  useEffect(() => {
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status === "success") {
        setUser(loginData.data.data);
      }
    }
  }, [props.candidate.loginData]);

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
        }
      }
    }
  }, [props.data.loginData]);

  // const handleSubmit = async (values) => {
  //   // console.log(values);
  //   try {
  //     // setLoader(true);
  //     let formData = new FormData();
  //     formData.append("id", params.id);
  //     formData.append("branch", params.branch);
  //     formData.append("course", params.course)
  //     if (adharFile) {
  //       formData.append("file", adharFile.file);
  //       formData.append("name", adharFile.name);
  //     }
  //     if (photoFile) {
  //       formData.append("file", photoFile.file);
  //       formData.append("name", photoFile.name);
  //     }
  //     if (signFile) {
  //       formData.append("file", signFile.file);
  //       formData.append("name", signFile.name);
  //     }
  //     if (tcFile) {
  //       formData.append("file", tcFile.file);
  //       formData.append("name", tcFile.name);
  //     }
  //     if (tenthFile) {
  //       formData.append("file", tenthFile.file);
  //       formData.append("name", tenthFile.name);
  //     }
  //     if (twelfthFile) {
  //       formData.append("file", twelfthFile.file);
  //       formData.append("name", twelfthFile.name);
  //     }
  //     if (casteFile) {
  //       formData.append("file", casteFile.file);
  //       formData.append("name", casteFile.name);
  //     }
  //     if (nclFile) {
  //       formData.append("file", nclFile.file);
  //       formData.append("name", nclFile.name);
  //     }
  //     if (domicileFile) {
  //       formData.append("file", domicileFile.file);
  //       formData.append("name", domicileFile.name);
  //     }
  //     if (csvFile) {
  //       formData.append("file", csvFile.file);
  //       formData.append("name", csvFile.name);
  //     }
  //     if (cetFile) {
  //       formData.append("file", cetFile.file);
  //       formData.append("name", cetFile.name);
  //     }
  //     if (otherFile) {
  //       formData.append("file", otherFile.file);
  //       formData.append("name", otherFile.name);
  //     }
  //     if (other2File) {
  //       formData.append("file", other2File.file);
  //       formData.append("name", other2File.name);
  //     }
  //     if (other3File) {
  //       formData.append("file", other3File.file);
  //       formData.append("name", other3File.name);
  //     }
  //     if (migrationFile) {
  //       formData.append("file", migrationFile.file);
  //       formData.append("name", migrationFile.name);
  //     }
  //     if (deplomaFile) {
  //       formData.append("file", deplomaFile.file);
  //       formData.append("name", deplomaFile.name);
  //     }
  //     if (allotmentFile) {
  //       formData.append("file", allotmentFile.file);
  //       formData.append("name", allotmentFile.name);
  //     }

  //     // formData.forEach((value, key) => {
  //     //   console.log(key, value);
  //     // });
  //     props.requestEmpProfile({
  //       token: user.token,
  //       data: {
  //         formData,
  //       },
  //     });
  //     setAdharFile(null);
  //     setPhotoFile(null);
  //     setSignFile(null);
  //     setTcFile(null);
  //     setTenthFile(null);
  //     setTwelfthFile(null);
  //     setCasteFile(null);
  //     setNclFile(null);
  //     setDomicileFile(null);
  //     setCsvFile(null);
  //     setCetFile(null);
  //     setOtherFile(null);
  //     setOther2File(null);
  //     setOther3File(null);
  //     setMigrationFile(null);
  //     setDeplomaFile(null);
  //     setAllotmentFile(null);
  //     // setLoader(true);
  //   } catch (error) {
  //     console.log(error.message);
  //     toast.error("error at creating");
  //     setLoader(false);
  //   }
  // };

  const handleSubmit = async (values) => {
    // console.log(values);
    try {
      // setLoader(true);
      setSpinning(true);

      let formData = new FormData();
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9) + "-" + `${params.id}`;
      const key = `${params.course}/${params.branch}/${uniqueSuffix}`;
      formData.append("id", params.id);
      // formData.append("branch", params.branch);
      // formData.append("course", params.course)
      if (adharFile) {
        const result = await Storage.put(key, adharFile.file, {
          contentType: adharFile.file.type, // Provide the content type if known
        });
        // console.log('Uploaded file key:', result.key);
        formData.append("file", result.key);
        formData.append("name", adharFile.name);
      }
      if (photoFile) {
        const result = await Storage.put(key, photoFile.file, {
          contentType: photoFile.file.type, // Provide the content type if known
        });
        formData.append("file", result.key);
        formData.append("name", photoFile.name);
      }
      if (signFile) {
        const result = await Storage.put(key, signFile.file, {
          contentType: signFile.file.type, // Provide the content type if known
        });
        formData.append("file", result.key);
        formData.append("name", signFile.name);
      }
      if (tcFile) {
        const result = await Storage.put(key, tcFile.file, {
          contentType: tcFile.file.type, // Provide the content type if known
        });
        formData.append("file", result.key);
        formData.append("name", tcFile.name);
      }
      if (tenthFile) {
        const result = await Storage.put(key, tenthFile.file, {
          contentType: tenthFile.file.type, // Provide the content type if known
        });
        formData.append("file", result.key);
        formData.append("name", tenthFile.name);
      }
      if (twelfthFile) {
        const result = await Storage.put(key, twelfthFile.file, {
          contentType: twelfthFile.file.type, // Provide the content type if known
        });
        formData.append("file", result.key);
        formData.append("name", twelfthFile.name);
      }
      if (casteFile) {
        const result = await Storage.put(key, casteFile.file, {
          contentType: casteFile.file.type, // Provide the content type if known
        });
        formData.append("file", result.key);
        formData.append("name", casteFile.name);
      }
      if (nclFile) {
        const result = await Storage.put(key, nclFile.file, {
          contentType: nclFile.file.type, // Provide the content type if known
        });
        formData.append("file", result.key);
        formData.append("name", nclFile.name);
      }
      if (domicileFile) {
        const result = await Storage.put(key, domicileFile.file, {
          contentType: domicileFile.file.type, // Provide the content type if known
        });
        formData.append("file", result.key);
        formData.append("name", domicileFile.name);
      }
      if (csvFile) {
        const result = await Storage.put(key, csvFile.file, {
          contentType: csvFile.file.type, // Provide the content type if known
        });
        formData.append("file", result.key);
        formData.append("name", csvFile.name);
      }
      if (cetFile) {
        const result = await Storage.put(key, cetFile.file, {
          contentType: cetFile.file.type, // Provide the content type if known
        });
        formData.append("file", result.key);
        formData.append("name", cetFile.name);
      }
      if (otherFile) {
        const result = await Storage.put(key, otherFile.file, {
          contentType: otherFile.file.type, // Provide the content type if known
        });
        formData.append("file", result.key);
        formData.append("name", otherFile.name);
      }
      if (other2File) {
        const result = await Storage.put(key, other2File.file, {
          contentType: other2File.file.type, // Provide the content type if known
        });
        formData.append("file", result.key);
        formData.append("name", other2File.name);
      }
      if (other3File) {
        const result = await Storage.put(key, other3File.file, {
          contentType: other3File.file.type, // Provide the content type if known
        });
        formData.append("file", result.key);
        formData.append("name", other3File.name);
      }
      if (migrationFile) {
        const result = await Storage.put(key, migrationFile.file, {
          contentType: migrationFile.file.type, // Provide the content type if known
        });
        formData.append("file", result.key);
        formData.append("name", migrationFile.name);
      }
      if (deplomaFile) {
        const result = await Storage.put(key, deplomaFile.file, {
          contentType: deplomaFile.file.type, // Provide the content type if known
        });
        formData.append("file", result.key);
        formData.append("name", deplomaFile.name);
      }
      if (allotmentFile) {
        const result = await Storage.put(key, allotmentFile.file, {
          contentType: allotmentFile.file.type, // Provide the content type if known
        });
        formData.append("file", result.key);
        formData.append("name", allotmentFile.name);
      }

      // console.log(formData.file);
      // formData.forEach(async (value, key) => {
      //   console.log("key ::", key);
      //   console.log("value ::", value);

      //   const result = await Storage.put(value.name, value, {
      //     contentType: value.type, // Provide the content type if known
      //   });
      //   console.log("result ::", result);
      //   console.log("key ::", result.key);
      // });

      // for (const [key, value] of formData.entries()) {
      //   console.log(key, value);

      //   console.log('Uploaded file key:', result.key);
      //   // Proceed with additional logic if needed
      // }
      props.requestEmpProfile({
        token: user.token,
        data: {
          formData,
        },
      });
      setAdharFile(null);
      setPhotoFile(null);
      setSignFile(null);
      setTcFile(null);
      setTenthFile(null);
      setTwelfthFile(null);
      setCasteFile(null);
      setNclFile(null);
      setDomicileFile(null);
      setCsvFile(null);
      setCetFile(null);
      setOtherFile(null);
      setOther2File(null);
      setOther3File(null);
      setMigrationFile(null);
      setDeplomaFile(null);
      setAllotmentFile(null);
      // setLoader(true);
      
    } catch (error) {
      console.log(error.message);
      toast.error("error at creating");
      // setLoader(false);
      setSpinning(false);

    }
  };

  const onFinishFailed = (errorInfo) => {
    // setLoader(false);
    setSpinning(false);
    toast.error("Something went wrong !");
    console.log("Failed:", errorInfo);
  };

  const handleDocument = (e, setFile) => {
    const placeholder = e.target.getAttribute("placeholder"); // Get the placeholder value
    {
      if (user.role === "clerk") {
        setFile({
          file: e.target.files[0],
          name: placeholder,
        });
      }
    }
  };

  const onClickLoading = () => {
    setLoader(true);
  };

  useEffect(() => {
    let empProfileData = props.employee.empProfileData;
    if (empProfileData !== undefined) {
      if (empProfileData?.data?.status == "success") {
        Swal.fire("Success!", "Document Uploaded successfully.", "success");
        // setLoader(false);
        setSpinning(false);
        form.resetFields();
        props.employee.empProfileData = undefined;
      } else {
        Swal.fire("Alert!", "Something Went Wrong.", "error");
        // setLoader(false);
        setSpinning(false);
        props.employee.empProfileData = undefined;
      }
    }
  }, [props.employee.empProfileData]);

  useEffect(() => {
    props.requestGetEmp({
      token: user.token,
      id: params.id,
    });
  }, [props.employee.empProfileData]);

  useEffect(() => {
    let empData = props.employee.empData;
    if (empData !== undefined) {
      if (empData?.data?.status == "success") {
        setDocument(empData.data.data.documents);
        setCourse(empData.data.data.course);
        setBranch(empData.data.data.branch);
        setRadioValue(empData.data.data.required);
      } else {
        Swal.fire("Alert!", "Something Went Wrong.", "error");
        // setLoader(false);
        // props.employee.empData = undefined;
      }
    }
  }, [props.employee.empData]);

  let uploadedCount = 0;

  for (let key in document) {
    if (document[key] !== null) {
      uploadedCount++;
    }
  }
  const handleToggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  // const handleViewImage = (imageUrl) => {
  //   window.open(imageUrl, "_blank");
  // };


  return (
    <Layout>
      <Fragment>
        <Card bordered={false}>
          <Title level={4} className="m-2 text-center">
            Upload Candidate Documents
          </Title>
          <Typography
            style={{ fontSize: "18px", color: "green", marginLeft: "17%" }}
          >
            * {uploadedCount}/17 Uploaded
          </Typography>
          <br />
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 4,
            }}
            labelWrap
            wrapperCol={{
              span: 12,
            }}
            initialValues={{
              remember: true,
            }}
            // onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="adhar"
              label="Aadhar Card"
            >
              <div style={{ display: "flex" }}>
                <Input
                  type="file"
                  placeholder="adhar"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handleDocument(e, setAdharFile)}
                />
                <Button
                  type="primary"
                  shape="round"
                  loading={loader}
                  onClick={handleSubmit}
                  disabled={!adharFile}
                  style={{
                    marginLeft: "20px",
                  }}
                >
                  Upload
                </Button>
                {document.adhar !== null ? (
                  <div style={{ display: "flex" }}>
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                    />
                    <EyeOutlined
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                      onClick={() =>
                        // handleViewImage(
                        generatePublicUrl(`${document.adhar}`)
                        // )
                      }
                    />
                  </div>
                ) : (
                  <CloseCircleTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: "30px", marginLeft: "40px" }}
                  />
                )}
              </div>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="photo"
              label="Photo"
            >
              <div style={{ display: "flex" }}>
                <Input
                  type="file"
                  placeholder="photo"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handleDocument(e, setPhotoFile)}
                />
                <Button
                  type="primary"
                  shape="round"
                  loading={loader}
                  onClick={handleSubmit}
                  disabled={!photoFile}
                  style={{
                    marginLeft: "20px",
                  }}
                >
                  Upload
                </Button>
                {document.photo !== null ? (
                  <div style={{ display: "flex" }}>
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                    />
                    <EyeOutlined
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                      onClick={() =>
                        // handleViewImage(
                        generatePublicUrl(`${document.photo}`)
                        // )
                      }
                    />
                  </div>
                ) : (
                  <CloseCircleTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: "30px", marginLeft: "40px" }}
                  />
                )}
              </div>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="sign"
              label="Signature"
            >
              <div style={{ display: "flex" }}>
                <Input
                  type="file"
                  placeholder="sign"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handleDocument(e, setSignFile)}
                />
                <Button
                  type="primary"
                  shape="round"
                  loading={loader}
                  onClick={handleSubmit}
                  disabled={!signFile}
                  style={{
                    // backgroundColor: "#2c3e50",
                    marginLeft: "20px",
                  }}
                >
                  Upload
                </Button>
                {document.sign !== null ? (
                  <div style={{ display: "flex" }}>
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                    />
                    <EyeOutlined
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                      onClick={() =>
                        // handleViewImage(
                        generatePublicUrl(`${document.sign}`)
                        // )
                      }
                    />
                  </div>
                ) : (
                  <CloseCircleTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: "30px", marginLeft: "40px" }}
                  />
                )}
              </div>
            </Form.Item>
            <Form.Item style={{ marginBottom: "15px" }} name="tc" label="Leaving Certificate">
              <div style={{ display: "flex" }}>
                <Input
                  type="file"
                  placeholder="tc"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handleDocument(e, setTcFile)}
                />
                <Button
                  type="primary"
                  shape="round"
                  loading={loader}
                  onClick={handleSubmit}
                  disabled={!tcFile}
                  style={{
                    marginLeft: "20px",
                  }}
                >
                  Upload
                </Button>
                {document.tc !== null ? (
                  <div style={{ display: "flex" }}>
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                    />
                    <EyeOutlined
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                      onClick={() =>
                        // handleViewImage(
                        generatePublicUrl(`${document.tc}`)
                        // )
                      }
                    />
                  </div>
                ) : (
                  <CloseCircleTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: "30px", marginLeft: "40px" }}
                  />
                )}
              </div>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="10th"
              label="10th marksheet"
            >
              <div style={{ display: "flex" }}>
                <Input
                  type="file"
                  placeholder="tenth"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handleDocument(e, setTenthFile)}
                />
                <Button
                  type="primary"
                  shape="round"
                  loading={loader}
                  onClick={handleSubmit}
                  disabled={!tenthFile}
                  style={{
                    // backgroundColor: "#2c3e50",
                    marginLeft: "20px",
                  }}
                >
                  Upload
                </Button>
                {document.tenth !== null ? (
                  <div style={{ display: "flex" }}>
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                    />
                    <EyeOutlined
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                      onClick={() =>
                        // handleViewImage(
                        generatePublicUrl(`${document.tenth}`)
                        // )
                      }
                    />
                  </div>
                ) : (
                  <CloseCircleTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: "30px", marginLeft: "40px" }}
                  />
                )}
              </div>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="12th"
              label="12th marksheet"
            >
              <div style={{ display: "flex" }}>
                <Input
                  type="file"
                  placeholder="twelfth"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handleDocument(e, setTwelfthFile)}
                />
                <Button
                  type="primary"
                  shape="round"
                  loading={loader}
                  onClick={handleSubmit}
                  disabled={!twelfthFile}
                  style={{
                    // backgroundColor: "#2c3e50",
                    marginLeft: "20px",
                  }}
                >
                  Upload
                </Button>
                {document.twelfth !== null ? (
                  <div style={{ display: "flex" }}>
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                    />
                    <EyeOutlined
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                      onClick={() =>
                        // handleViewImage(
                        generatePublicUrl(`${document.twelfth}`)
                        // )
                      }
                    />
                  </div>
                ) : (
                  <CloseCircleTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: "30px", marginLeft: "40px" }}
                  />
                )}
              </div>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="caste"
              label="Caste Certificate"
            >
              <div style={{ display: "flex" }}>
                <Input
                  type="file"
                  placeholder="caste"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handleDocument(e, setCasteFile)}
                />
                <Button
                  type="primary"
                  shape="round"
                  loading={loader}
                  onClick={handleSubmit}
                  disabled={!casteFile}
                  style={{
                    // backgroundColor: "#2c3e50",
                    marginLeft: "20px",
                  }}
                >
                  Upload
                </Button>
                {document.caste !== null ? (
                  <div style={{ display: "flex" }}>
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                    />
                    <EyeOutlined
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                      onClick={() =>
                        // handleViewImage(
                        generatePublicUrl(`${document.caste}`)
                        // )
                      }
                    />
                  </div>
                ) : (
                  <CloseCircleTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: "30px", marginLeft: "40px" }}
                  />
                )}
              </div>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="non"
              label="Non-Creamy Layer"
            >
              <div style={{ display: "flex" }}>
                <Input
                  type="file"
                  placeholder="ncl"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handleDocument(e, setNclFile)}
                />
                <Button
                  type="primary"
                  shape="round"
                  loading={loader}
                  onClick={handleSubmit}
                  disabled={!nclFile}
                  style={{
                    // backgroundColor: "#2c3e50",
                    marginLeft: "20px",
                  }}
                >
                  Upload
                </Button>
                {document.ncl !== null ? (
                  <div style={{ display: "flex" }}>
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                    />
                    <EyeOutlined
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                      onClick={() =>
                        // handleViewImage(
                        generatePublicUrl(`${document.ncl}`)
                        // )
                      }
                    />
                  </div>
                ) : (
                  <CloseCircleTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: "30px", marginLeft: "40px" }}
                  />
                )}
              </div>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="domicile"
              label="Domicile"
            >
              <div style={{ display: "flex" }}>
                <Input
                  type="file"
                  placeholder="domicile"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handleDocument(e, setDomicileFile)}
                />
                <Button
                  type="primary"
                  shape="round"
                  loading={loader}
                  onClick={handleSubmit}
                  disabled={!domicileFile}
                  style={{
                    // backgroundColor: "#2c3e50",
                    marginLeft: "20px",
                  }}
                >
                  Upload
                </Button>
                {document.domicile !== null ? (
                  <div style={{ display: "flex" }}>
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                    />
                    <EyeOutlined
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                      onClick={() =>
                        // handleViewImage(
                        generatePublicUrl(`${document.domicile}`)
                        // )
                      }
                    />
                  </div>
                ) : (
                  <CloseCircleTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: "30px", marginLeft: "40px" }}
                  />
                )}
              </div>
            </Form.Item>
            <Form.Item style={{ marginBottom: "15px" }} name="csv" label="Caste Validity">
              <div style={{ display: "flex" }}>
                <Input
                  type="file"
                  placeholder="csv"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handleDocument(e, setCsvFile)}
                />
                <Button
                  type="primary"
                  shape="round"
                  loading={loader}
                  onClick={handleSubmit}
                  disabled={!csvFile}
                  style={{
                    // backgroundColor: "#2c3e50",
                    marginLeft: "20px",
                  }}
                >
                  Upload
                </Button>
                {document.csv !== null ? (
                  <div style={{ display: "flex" }}>
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                    />
                    <EyeOutlined
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                      onClick={() =>
                        // handleViewImage(
                        generatePublicUrl(`${document.csv}`)
                        // )
                      }
                    />
                  </div>
                ) : (
                  <CloseCircleTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: "30px", marginLeft: "40px" }}
                  />
                )}
              </div>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="cet"
              label="CET Score"
            >
              <div style={{ display: "flex" }}>
                <Input
                  type="file"
                  placeholder="cet"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handleDocument(e, setCetFile)}
                />
                <Button
                  type="primary"
                  shape="round"
                  loading={loader}
                  onClick={handleSubmit}
                  disabled={!cetFile}
                  style={{
                    // backgroundColor: "#2c3e50",
                    marginLeft: "20px",
                  }}
                >
                  Upload
                </Button>
                {document.cet !== null ? (
                  <div style={{ display: "flex" }}>
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                    />
                    <EyeOutlined
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                      onClick={() =>
                        // handleViewImage(
                        generatePublicUrl(`${document.cet}`)
                        // )
                      }
                    />
                  </div>
                ) : (
                  <CloseCircleTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: "30px", marginLeft: "40px" }}
                  />
                )}
              </div>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="migration"
              label="Migration Document"
            >
              <div style={{ display: "flex" }}>
                <Input
                  type="file"
                  placeholder="migration"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handleDocument(e, setMigrationFile)}
                />
                <Button
                  type="primary"
                  shape="round"
                  loading={loader}
                  onClick={handleSubmit}
                  disabled={!migrationFile}
                  style={{
                    // backgroundColor: "#2c3e50",
                    marginLeft: "20px",
                  }}
                >
                  Upload
                </Button>
                {document.migration !== null ? (
                  <div style={{ display: "flex" }}>
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                    />
                    <EyeOutlined
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                      onClick={() =>
                        // handleViewImage(
                        generatePublicUrl(`${document.migration}`)
                        // )
                      }
                    />
                  </div>
                ) : (
                  <CloseCircleTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: "30px", marginLeft: "40px" }}
                  />
                )}
              </div>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="deploma"
              label="Diploma"
            >
              <div style={{ display: "flex" }}>
                <Input
                  type="file"
                  placeholder="deploma"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handleDocument(e, setDeplomaFile)}
                />
                <Button
                  type="primary"
                  shape="round"
                  loading={loader}
                  onClick={handleSubmit}
                  disabled={!deplomaFile}
                  style={{
                    // backgroundColor: "#2c3e50",
                    marginLeft: "20px",
                  }}
                >
                  Upload
                </Button>
                {document.deploma !== null ? (
                  <div style={{ display: "flex" }}>
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                    />
                    <EyeOutlined
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                      onClick={() =>
                        // handleViewImage(
                        generatePublicUrl(`${document.deploma}`)
                        // )
                      }
                    />
                  </div>
                ) : (
                  <CloseCircleTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: "30px", marginLeft: "40px" }}
                  />
                )}
              </div>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="allotment"
              label="Allotment"
            >
              <div style={{ display: "flex" }}>
                <Input
                  type="file"
                  placeholder="allotment"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handleDocument(e, setAllotmentFile)}
                />
                <Button
                  type="primary"
                  shape="round"
                  loading={loader}
                  onClick={handleSubmit}
                  disabled={!allotmentFile}
                  style={{
                    // backgroundColor: "#2c3e50",
                    marginLeft: "20px",
                  }}
                >
                  Upload
                </Button>
                {document.allotment !== null ? (
                  <div style={{ display: "flex" }}>
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                    />
                    <EyeOutlined
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                      onClick={() =>
                        // handleViewImage(
                        generatePublicUrl(`${document.allotment}`)
                        // )
                      }
                    />
                  </div>
                ) : (
                  <CloseCircleTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: "30px", marginLeft: "40px" }}
                  />
                )}
              </div>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="other_doc"
              label="Other"
            >
              <div style={{ display: "flex" }}>
                <Input
                  type="file"
                  placeholder="other"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handleDocument(e, setOtherFile)}
                />
                <Button
                  type="primary"
                  shape="round"
                  loading={loader}
                  onClick={handleSubmit}
                  disabled={!otherFile}
                  style={{
                    // backgroundColor: "#2c3e50",
                    marginLeft: "20px",
                  }}
                >
                  Upload
                </Button>
                {document.other !== null ? (
                  <div style={{ display: "flex" }}>
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                    />
                    <EyeOutlined
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                      onClick={() =>
                        // handleViewImage(
                        generatePublicUrl(`${document.other}`)
                        // )
                      }
                    />
                  </div>
                ) : (
                  <CloseCircleTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: "30px", marginLeft: "40px" }}
                  />
                )}
              </div>
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "15px" }}
              name="other2_doc"
              label="Other2"
            >
              <div style={{ display: "flex" }}>
                <Input
                  type="file"
                  placeholder="other2"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handleDocument(e, setOther2File)}
                />
                <Button
                  type="primary"
                  shape="round"
                  loading={loader}
                  onClick={handleSubmit}
                  disabled={!other2File}
                  style={{
                    // backgroundColor: "#2c3e50",
                    marginLeft: "20px",
                  }}
                >
                  Upload
                </Button>
                {document.other2 !== null ? (
                  <div style={{ display: "flex" }}>
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                    />
                    <EyeOutlined
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                      onClick={() =>
                        // handleViewImage(
                        generatePublicUrl(`${document.other2}`)
                        // )
                      }
                    />
                  </div>
                ) : (
                  <CloseCircleTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: "30px", marginLeft: "40px" }}
                  />
                )}
              </div>
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "15px" }}
              name="other3_doc"
              label="Other3"
            >
              <div style={{ display: "flex" }}>
                <Input
                  type="file"
                  placeholder="other3"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handleDocument(e, setOther3File)}
                />
                <Button
                  type="primary"
                  shape="round"
                  loading={loader}
                  onClick={handleSubmit}
                  disabled={!other3File}
                  style={{
                    // backgroundColor: "#2c3e50",
                    marginLeft: "20px",
                  }}
                >
                  Upload
                </Button>
                {document.other3 !== null ? (
                  <div style={{ display: "flex" }}>
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                    />
                    <EyeOutlined
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                      onClick={() =>
                        // handleViewImage(
                        generatePublicUrl(`${document.other3}`)
                        // )
                      }
                    />
                  </div>
                ) : (
                  <CloseCircleTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: "30px", marginLeft: "40px" }}
                  />
                )}
              </div>
            </Form.Item>
            {/* <Form.Item
              style={{ marginBottom: "15px" }}
              name="required_doc"
              label="Are the required documents submitted?"
            >
              <Radio.Group >
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item> */}
          </Form>
          {user.role === "clerk" ? (
            <Form
              form={form}
              onFinish={onFinish}
            >
              <div style={{ paddingLeft: "10%" }}>
                <Form.Item
                  name="required_doc"
                  label="Are the required documents submitted?"
                  rules={[{ required: true, message: 'Please select an option' }]}
                >
                  <Radio.Group onChange={onRadioChange} value={radioValue}>
                    <Radio value={"Yes"}>Yes</Radio>
                    <Radio value={"No"}>No</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div style={{ paddingLeft: "30%" }}>

                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Continue
                  </Button>
                </Form.Item>
              </div>
            </Form>
          ) :
            null}
          <Spin spinning={spinning} fullscreen />
        </Card>
      </Fragment>
    </Layout>
  );
};

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
      requestEmpProfile,
      requestAdminGetProfile,
      requestJobDetails,
      requestGetEmp,
      requestCandidateResume
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DocView);
