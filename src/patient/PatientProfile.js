import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import QRCode from 'qrcode.react';

const PatientProfile = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/patients/${id}`);
        setPatient(response.data);
      } catch (error) {
        console.error('Error fetching patient:', error);
      }
    };

    fetchPatient();
  }, [id]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert('Please select an image file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post(`http://localhost:5000/api/upload/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadStatus(`File uploaded successfully: ${response.data.fileName}`);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Error uploading file. Please try again.');
    }
  };

  if (!patient) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
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
              <p className="card-text">ID: <b>{patient.ID}</b></p>
              <p className="card-text">Name: <b>{patient.Name}</b></p>
              <p className="card-text">Age: <b>{patient.Age}</b></p>
              <p className="card-text">Gender: <b>{patient.Gender}</b></p>
              <p className="card-text">UUID: <b>{patient.UUID}</b></p>
            </div>
          </div>

          {/* Image upload form */}
          <div className="mt-3">
            <div className="card-body">
              <h4>Upload an Image</h4>
              <form onSubmit={handleUpload}>
                <div>
                  <label htmlFor="fileInput">Choose an image:</label>
                  <input
                    type="file"
                    id="fileInput"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-2">Upload</button>
              </form>
              {uploadStatus && <p>{uploadStatus}</p>}
            </div>
          </div>
        </div>

        {/* Right side: QR code */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <QRCode value={`http://192.168.0.105:3000/report/${patient.UUID}`} size={200} />
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
