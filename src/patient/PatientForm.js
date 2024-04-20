import React, { useState } from 'react';
import savePatientData from './dep.js';
import { useNavigate } from 'react-router-dom';

const PatientForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    uuid: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data to backend for saving
    console.log(formData);
    savePatientData(formData);
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
        <h2 className="text-center mb-4">Register Patient</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name:</label>
              <input required type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Age:</label>
              <input required type="number" className="form-control" name="age" value={formData.age} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Gender:</label>
              <select required className="form-select" name="gender" value={formData.gender} onChange={handleChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">UUID:</label>
              <input required type="text" className="form-control" name="uuid" value={formData.uuid} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientForm;
