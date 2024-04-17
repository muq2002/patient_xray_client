import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientTable = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  return (
    <div>
      <h2>Patients List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>UUID</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.ID}>
              <td>{patient.ID}</td>
              <td>{patient.Name}</td>
              <td>{patient.Age}</td>
              <td>{patient.Gender}</td>
              <td>{patient.UUID}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;
