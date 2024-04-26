import React, { useState } from 'react';
import axios from 'axios';
import {  useParams } from 'react-router-dom';

const ApplyJobForm = () => {
    const {id} = useParams();
    console.log('Job ID:', id); 
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: null,
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('resume', formData.resume);

    const { name, email, resume } = formData;

    try {
      const response = await axios.post(`${apiUrl}/apply/${id}`, 
      {
        name,
        email,
        resume
      }, 
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error submitting application. Please try again later.');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Apply for a Job</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="resume">Resume:</label>
          <input
            type="file"
            id="resume"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Submit Application</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ApplyJobForm;
