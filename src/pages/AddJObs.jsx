import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const CreateJob = () => {
    const [redirectToJobListing, setRedirectToJobListing] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: 0,
        jobType: 'Remote'
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
            const response = await axios.post('http://localhost:4000/api/addJobs', {
                title: formData.title,
                description:formData.description,
                requirements: formData.requirements,
                salary:formData.salary,
                jobType:formData.jobType 
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });// Adjust the URL as per your backend endpoint
          console.log(response.data); // Handle success response
          setRedirectToJobListing(true); // Redirect to login page after successful signup
        } catch (error) {
          setError(error.response.data.message); // Handle error response
        }finally {
          setIsSubmitting(false); // Set submitting status back to false
        }
      };
    
      if (redirectToJobListing) {
        return <Navigate to="/joblisting" />;
      }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create A New Job
                </h2>
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <input type="hidden" name="remember" value="true" />
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required
                         className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"/>
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} required 
                         className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"/>
                    </div>
                    <div>
                        <label htmlFor="requirements">Requirements:</label>
                        <textarea id="requirements" name="requirements" value={formData.requirements} onChange={handleChange} required 
                         className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"/>
                    </div>
                    <div>
                        <label htmlFor="salary">Salary:</label>
                        <input type="number" id="salary" name="salary" value={formData.salary} onChange={handleChange} required 
                         className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"/>
                    </div>
                    <div>
                        <label htmlFor="jobType">Job Type:</label>
                        <select id="jobType" name="jobType" value={formData.jobType} onChange={handleChange} required
                         className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"> 
                        <option name="remote">Remote</option>
                        <option name="onsite">Onsite</option>
                        <option name="hybrid">Hybrid</option>
                        </select>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div>
                        <button
                        disabled={isSubmitting}
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                        Create New
                        </button>
                        <p>
                        Do you want to return Job Listing page? please click on...  <Link
                        to="/joblisting"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                        Back to Job Listing
                        </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateJob;