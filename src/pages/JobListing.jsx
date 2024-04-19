import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobListing = () => {
    const [jobs, setJobs] = useState([]);
    const [redirectToUpdateJob, setRedirectToUpdateJob] = useState(false);

    useEffect(() => {
      const fetchJobs = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:4000/api/jobs', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            setJobs(response.data);
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
      };
  
      fetchJobs();
    }, []);

    const handleUpdate = (id) => {

      // Handle edit functionality here
      console.log(`Updating employee with ID: ${id}`);
      setRedirectToUpdateJob(id);
      // Navigate to the UpdateEmployee page while passing the employee ID
    };
  
    if (redirectToUpdateJob) {
      return <Navigate to={`/updateEmployee/${redirectToUpdateJob}`} />;
    }

    return (
        <div className='p-20'>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900" >Job Listings</h2>
          <a href='/createJob' className="text-center font-medium text-indigo-600 hover:text-indigo-500">Create New Job</a>
           
            <div className='grid grid-cols-3 gap-4'>
                {jobs.map(job => (
                    <div key={job._id} className='border p-4'>
                        <h2 className="text-xl font-semibold text-gray-800">Job Title : {`${job.title}`}</h2>
                        <p>Description: {job.description}</p>
                        <p>Job Type: {job.jobType}</p>
                        <p>Salary: ${job.salary}</p>
                        <p>Requirements:</p>
                        <ul>
                            {job.requirements.map((requirement, index) => (
                                <li key={index}>{requirement}</li>
                            ))}
                        </ul>
                        <div className='my-6'>

                        <p>Created By: {job.createdBy}</p>
                        <p>Created At: {new Date(job.createdAt).toLocaleDateString()}</p>
                        <p>Updated At: {new Date(job.updatedAt).toLocaleDateString()}</p>
                        </div>

                        <a href='/' className='bg-blue-300 p-2 mt-5 mr-10'>Delete</a>
                        <a className='bg-blue-300 p-2 mt-5'>update</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobListing;
