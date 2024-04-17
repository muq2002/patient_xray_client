// PatientForm.js

import React, { useState } from 'react';
import savePatientData from './dep.js'

const PatientForm = () => {
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Age:
        <input type="number" name="age" value={formData.age} onChange={handleChange} />
      </label>
      <label>
        Gender:
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label>
        UUID:
        <input type="text" name="uuid" value={formData.uuid} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PatientForm;
