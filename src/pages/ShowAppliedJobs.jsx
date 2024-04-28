import React, { useState, useEffect } from "react";
import axios from "axios";
import UserHeader from "./userHeader";

const ShowAppliedJobs = () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [email, setEmail] = useState("");
  const fetchAppliedJobs = async () => {
    const response = await axios.get(`${apiUrl}/api/user-apply?email=${email}`);
    setAppliedJobs(response.data.jobApplications);
    console.log(response.data.jobApplications)
    
  };
  console.log(appliedJobs);

  return (
    <>
      <UserHeader />
      <div className="flex">
        <input type="text" onChange={(e) => setEmail(e.target.value)} />
        <button onClick={fetchAppliedJobs}>Get Applied Jobs</button>
      </div>
      <div>
        <h2 className="text-center text-lg">Jobs Applied By You</h2>
        {appliedJobs.length === 0 ? (
          <p className="text-center mt-20">No jobs applied yet.</p>
        ) : (
          <ul>
            {appliedJobs.map((job) => (
              <li key={job._id}>
                <h3>{job.jobTitle}</h3>
                <p>Job ID: {job.jobId}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ShowAppliedJobs;
