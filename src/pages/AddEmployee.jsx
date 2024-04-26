import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import AdminHeader from './AdminHeader';

const AddEmployee = () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [redirectToEmployeeDetail, setRedirectTomEployeeDetail] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    job: '',
    dateOfJoining: '',
    image: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`${apiUrl}/api/employee`, {
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        job: formData.job,
        dateOfJoining: formData.dateOfJoining,
        image: formData.image
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });// Adjust the URL as per your backend endpoint
      console.log(response.data); // Handle success response
      setRedirectTomEployeeDetail(true); // Redirect to login page after successful signup
    } catch (error) {
      setError(error.response.data.message); // Handle error response
    }finally {
      setIsSubmitting(false); // Set submitting status back to false
    }
  };

  if (redirectToEmployeeDetail) {
    return <Navigate to="/employeesDetail" />;
  }

  return (
    <>
      <AdminHeader/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add A New Employee
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm space-y-6">
            <div>
              <label htmlFor="firstName" className="">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Last Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="phone" className="">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className=" rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Phone Number"
              />
            </div>
            <div>
              <label htmlFor="job" className="">
                Job
              </label>
              <input
                id="job"
                name="job"
                type="text"
                autoComplete="job"
                required
                value={formData.job}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Job"
              />
            </div>
            <div>
              <label htmlFor="dateOfJoining" className="">
                Date of Joining
              </label>
              <input
                id="dateOfJoining"
                name="dateOfJoining"
                type="date"
                autoComplete="dateOfJoining"
                required
                value={formData.dateOfJoining}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Phone"
              />
            </div>
            <div>
              <label htmlFor="image" className="">
                Image
              </label>
              <input
                id="image"
                name="image"
                type="text"
                autoComplete="image"
                required
                value={formData.image}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Image"
              />
            </div>
          </div>
          {/* Error message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button
            disabled={isSubmitting}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add New
            </button>
            <p>
            Do you want to return Eployees Detail page? please click on...  <Link
              to="/employeesDetail"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
               Back to Employees Details
            </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddEmployee;
