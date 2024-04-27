import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserHeader from './userHeader';
import { useNavigate } from 'react-router-dom';
const UserEntry = () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${apiUrl}/api/jobs`, {
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

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>

      <UserHeader />
      <div className='px-20 py-10 bg-gray-100'>
        <div className='flex justify-between gap-96 mb-6'>
          <h2 className="text-3xl font-extrabold text-gray-900">All Jobs</h2>
          <input
            type='text'
            placeholder='Search by job title'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='flex-grow ml-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
          />
        </div>

        <div className='grid grid-cols-3 gap-4 '>
          {filteredJobs.map(job => (

            <div key={job._id} className='border p-4 bg-white'>
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
              <div className=''>

                {/* <a className='group relative mr-5  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' ></a> */}
                <button onClick={() => navigate(`/apply/${job._id}`)} className='group relative  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' >Apply</button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </>

  );
};

export default UserEntry;