import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ApplyJobForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null,
  });
  const [message, setMessage] = useState("");

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
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("resume", formData.resume);
    const { name, email, resume } = formData;

    try {
      const response = await axios.post(
        `${apiUrl}/api/apply/${id}`,
        {
          name,
          email,
          resume,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message);
      alert(response.data.message)
      navigate('/user')
    } catch (error) {
      alert(response.data.message);
      console.error(error);
    }
  };

  return (
    <div className="text-center py-20 bg-gray-100 container-fluid">
      <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900 my-10">Apply for a Job</h1>
      <form onSubmit={handleSubmit}>
        <div className="">
        <div>

          <label htmlFor="name" className="mr-52">Name:</label>
        </div>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="appearance-none rounded-none my-4 px-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
        </div>
        <div>
        <div className="mr-52">

          <label htmlFor="email">Email:</label>
        </div>
          <input
          className="appearance-none rounded-none my-4 px-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
        <div className="mr-48">
          <label htmlFor="resume">Resume:</label>
        </div>
          <input
          className="appearance-none rounded-none my-4 ml-6 pl-2 py-2 border bg-white border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            type="file"
            id="resume"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            required
          />
        </div>
        <button
        className="group relative mt-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
         type="submit">Submit Application</button>
      </form>
      {/* {message && <p>{message}</p>} */}
    </div>
  );
};

export default ApplyJobForm;
