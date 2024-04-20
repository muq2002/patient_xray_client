import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PatientTable = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/patients");
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Patients List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>UUID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.ID}>
              <td>{patient.UUID}</td>
              <td>{patient.Name}</td>
              <td>{patient.Age}</td>
              <td>{patient.Gender}</td>
              <td>
                <Link
                  to={`/patients/${patient.ID}`}
                  className="btn btn-success"
                >
                  Open Profile
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;
