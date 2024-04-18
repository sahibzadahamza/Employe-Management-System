import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobListing = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
      
                const response = await axios.get('http://localhost:4000/api/jobs', 
                  );
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []); // Run once on component mount

    return (
        <div className='p-20'>
           <div className='flex justify-between px-32'>
           <h2>Job Listings</h2>
            <a href='/addJob'>CreateJobs</a>
           </div>
           
           

            <div className='grid grid-cols-3 gap-4'>
                {jobs.map(job => (
                    <div key={job._id} className='border p-4'>
                        <h3>{job.title}</h3>
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
