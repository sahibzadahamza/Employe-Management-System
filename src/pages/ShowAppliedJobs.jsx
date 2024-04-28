import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserHeader from './userHeader';

const ShowAppliedJobs = () => {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/user-apply`
     
    );
        setAppliedJobs(response.data.jobApplications);
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
      }
    };

    fetchAppliedJobs();
  }, []);

  return (
    <>  
        
      <UserHeader/>
    <div>
      <h2>Jobs Applied By You</h2>
      {appliedJobs.length === 0 ? (
        <p>No jobs applied yet.</p>
      ) : (
        <ul>
          {appliedJobs.map(job => (
            <li key={job._id}>
              <h3>{job.jobTitle}</h3>
              <p>Job ID: {job.jobId}</p>
              {/* Add more details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
    </>

  );
};

export default ShowAppliedJobs;
