import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import QRCode from "qrcode.react";

const PatientProfile = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [comments, setComments] = useState(""); // State for comments

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/patients/${id}`
        );
        setPatient(response.data);
      } catch (error) {
        console.error("Error fetching patient:", error);
      }

      try {
        const response = await axios.get(
          `http://192.168.0.108:5000/api/diagnosis/${id}`
        );
        setComments(response.data[0].Comments);
      } catch (error) {
        console.error("Error fetching diagnosis:", error);
      }

    };

    fetchPatient();
  }, [id]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  // Define the handleUpload function
  const handleUpload = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select an image file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/upload/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadStatus(`File uploaded successfully: ${response.data.fileName}`);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Error uploading file. Please try again.");
    }
  };
  const sendPredictionRequest = async () => {
    try {
      const imagePathResponse = await axios.get(
        `http://localhost:5000/api/upload/info/${id}`
      );
      console.log(imagePathResponse.data[0].ImagePath);
      if (imagePathResponse.data && imagePathResponse.data[0].ImagePath) {
        const imagePath = imagePathResponse.data[0].ImagePath;

        const response = await axios.post(
          "http://127.0.0.1:5000/predict",
          {
            image_path: imagePath,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Prediction:", response.data.prediction);
        setComments(response.data.prediction);
      } else {
        console.error("Image path not found in the response.");
      }
    } catch (error) {
      console.error(
        "Error fetching image path or sending prediction request:",
        error
      );
    }
  };
  const handleSave = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5000/api/diagnosis`, {
        PatientID: patient.ID,
        ImageID: 1, // You may need to replace this with the actual ImageID
        Comments: comments,
      });

      setUploadStatus("Diagnosis data saved successfully.");
    } catch (error) {
      console.error("Error saving diagnosis data:", error);
      setUploadStatus("Error saving diagnosis data. Please try again.");
    }
  };

  if (!patient) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="my-card row">
        {/* Left side: Patient information */}
        <div className="col-md-6">
          <div className="">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Patient Profile</h2>
              <p className="card-text">
                UUID: <b>{patient.UUID}</b>
              </p>
              <p className="card-text">
                Name: <b>{patient.Name}</b>
              </p>
              <p className="card-text">
                Age: <b>{patient.Age}</b>
              </p>
              <p className="card-text">
                Gender: <b>{patient.Gender === 0 ? "Male" : "Female"}</b>
              </p>
            </div>
          </div>

          {/* Image upload form */}
          <br />
          <div className="mt-3">
            <div className="card-body">
              <h5>Diagnosis</h5>
              <hr />
              <form>
                <div className="image-input">
                  <div>
                    <p className="card-text">
                      <b>Upload X-ray Image:</b>
                    </p>
                    <label htmlFor="fileInput">Choose an image:</label>
                    <input
                      type="file"
                      id="fileInput"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary mt-2 me-2"
                    onClick={handleUpload}
                  >
                    Upload
                  </button>
                </div>
                <br />

                <div className="mb-3">
                  <label htmlFor="comments" className="form-label">
                    <b>Doctor's Comments:</b>
                  </label>
                  <textarea
                    className="form-control my-input"
                    id="comments"
                    rows="3"
                    value={comments}
                    onChange={handleCommentsChange}
                  ></textarea>
                </div>

                <button
                  type="button"
                  className="btn btn-success mt-2"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-danger mt-2"
                  onClick={sendPredictionRequest}
                >
                  Run
                </button>
              </form>
              {uploadStatus && <p>{uploadStatus}</p>}
            </div>
          </div>
        </div>

        {/* Right side: QR code */}
        <div className="col-md-6 d-flex justify-content-center align-items-top mt-5">
          <div className="row justify-content-between align-items-center">
            <QRCode
              value={`http://192.168.0.108:5000/api/patients/uuid/${patient.UUID}`}
              size={200}
            />
            <br />
            <div>
              <img
                style={{ width: "250px", height: "250px" }}
                src={`http://localhost:5000/api/upload/${patient.ID}`}
                alt="Patient X-ray"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
