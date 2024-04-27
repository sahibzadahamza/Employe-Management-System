import React, { useState, useEffect } from 'react';
import AdminHeader from './AdminHeader';
import axios from 'axios';

const RetrievedJobs = () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [job, setJob] = useState([]);

  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/applied-users`);
        if (response.status === 200) {
          setJob(response.data);
        }
      } catch (error) {
        console.error('Error fetching job applications:', error);
      }
    };

    fetchJobApplications();
  }, []);

  useEffect(() => {
    console.log('Updated job:', job);
  }, [job]); // Log the updated state when 'job' changes

  console.log('Initial job:', job); // Log the initial state


  return (
    <div>
      <AdminHeader />
      <div className="mt-8">
        <h2 className="text-3xl font-bold mb-4">Job Applications</h2>
        {Array.isArray(job) && job.map(application => (
          <div key={application._id} className="bg-white shadow-md p-6 mb-4 rounded-md">
            <p><span className="font-semibold">Name:</span> {application.name}</p>
            <p><span className="font-semibold">Email:</span> {application.email}</p>
            <p><span className="font-semibold">Job Title:</span> {application.jobTitle}</p>
            <p><span className="font-semibold">Applied At:</span> {new Date(application.appliedAt).toLocaleString()}</p>
            {/* Add additional fields as needed */}
            <p className="mt-4"><span className="font-semibold">Resume:</span> <a href={`/${application.resume}`} target="_blank" rel="noopener noreferrer">View Resume</a></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RetrievedJobs;
