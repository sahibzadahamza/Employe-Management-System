import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const SignUp = () => {
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'employer',
    cnic: '',
    phone: '',
    password: ''
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
    try {
      const response = await axios.post('http://localhost:4000/api/signup', {
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        cnic: formData.cnic,
        role: formData.role,
        phone: formData.phone,
        password: formData.password
      });// Adjust the URL as per your backend endpoint
      console.log(response); // Handle success response
      setRedirectToLogin(true); // Redirect to login page after successful signup
    } catch (error) {
      setError(error.response.data.message); // Handle error response
    }finally {
      setIsSubmitting(false); // Set submitting status back to false
    }
  };

  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up for an account
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm space-y-6">
            <div>
              <label htmlFor="firstName" className="">
                FirstName
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="fullName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="">
                LastName
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="fullName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Last Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="">
                Email address
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
              <label htmlFor="number" className="">
                CNIC
              </label>
              <input
                id="number"
                name="cnic"
                type="string"
                autoComplete="cnic"
                required
                value={formData.cnic}
                onChange={handleChange}
                className=" rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="CNIC"
              />
            </div>
            <div>
              <label htmlFor="phone" className="">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Phone"
              />
            </div>
            <div>
                <label htmlFor="role">Role:</label>
                <select id="role" name="role" value={formData.role} onChange={handleChange} required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"> 
                <option name="employee" value='employee'>employee</option>
                <option name="employer" value='employer'>employer</option>
                </select>
            </div>
            <div>
              <label htmlFor="password" className="">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
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
              Sign Up
            </button>
            <p>
            Already have an account?   <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                setRedirectToLogin(true);
              }}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
               Log in
            </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
