import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PatientReport = () => {
  const { uuid } = useParams();
  const [patient, setPatient] = useState(null);
  const [report, setReport] = useState(null);

  useEffect(() => {
    // Fetch patient data and report based on UUID
    const fetchPatientData = async () => {
      try {
        // Fetch patient information 192.168.0.105
        const patientResponse = await axios.get(
          `http://localhost:5000/api/patients/uuid/${uuid}`
        );
        setPatient(patientResponse.data);
        var patientId = patientResponse.data.ID;

        // Fetch report (doctor's comments and related images)
        const reportResponse = await axios.get(
          `http://localhost:5000/api/upload/${patientId}`
        );
        setReport(reportResponse.data);
      } catch (error) {
        console.error("Error fetching patient data or report:", error);
      }
    };

    fetchPatientData();
  }, [uuid]);

  if (!patient || !report) {
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
      {/* Patient information */}
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Clinical Report</h2>
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

      {/* Doctor's comments */}
      <div className="card mb-4">
        <div className="card-body">
          <h4>Doctor's Comments</h4>
          <p>{report.comments}</p>
        </div>
      </div>

      {/* Images related to the patient */}
      <div className="card mb-4">
        <div className="card-body">
          <h4>Related Images</h4>
          <div className="row">
            <div className="col-md-4">
              <img
                src={`http://localhost:5000/api/upload/${patient.ID}`}
                className="img-fluid mb-3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientReport;
