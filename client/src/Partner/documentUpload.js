import React, { useState } from "react";
import "./DocumentUploader.css"; // Import your CSS file

export const DocumentUploader = (props) => {
  const [files, setFiles] = useState();

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("files", files); // Replace with the actual student identifier
    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div className="document-uploader">
      <h2>Upload Documents</h2>
      &nbsp;
      <div className="document-input">
        <label>10th Marksheet</label>
        &nbsp;      &nbsp;

        <input type="file" onChange={(e) => setFiles(e.target.files[0])} />
        <button type="button" onClick={handleSubmit}>
          Upload
        </button>
      </div>
      <br />
      <div className="document-input">
        <label>12th Marksheet</label>
        &nbsp;
        &nbsp;
        <input type="file" onChange={(e) => setFiles(e.target.files[0])} />
        <button type="button" onClick={handleSubmit}>
          Upload
        </button>
      </div>
      <br />
      <div className="document-input">
        <label>Adhar Card &nbsp;&nbsp;</label>
        &nbsp;
        &nbsp;
        <input type="file" onChange={(e) => setFiles(e.target.files[0])} />
        <button type="button" onClick={handleSubmit}>
          Upload
        </button>
      </div>
      <br />
      <div className="document-input">
        <label>Cast Validity</label>
        &nbsp;
        &nbsp;
        <input type="file" onChange={(e) => setFiles(e.target.files[0])} />
        <button type="button" onClick={handleSubmit}>
          Upload
        </button>
      </div>
      <br />
      <div className="document-input">
        <label>Cast Certificate</label>
        &nbsp;
        &nbsp;
        <input type="file" onChange={(e) => setFiles(e.target.files[0])} />
        <button type="button" onClick={handleSubmit}>
          Upload
        </button>
      </div>
      <br />
      <div className="document-input">
        <label>Non-Creamy layer</label>
        &nbsp;
        &nbsp;
        <input type="file" onChange={(e) => setFiles(e.target.files[0])} />
        <button type="button" onClick={handleSubmit}>
          Upload
        </button>
      </div>
      

    </div>
  );
};
