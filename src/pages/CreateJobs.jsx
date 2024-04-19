import React, { useState } from 'react';
import axios from 'axios';

const CreateJob = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: 0,
        jobType: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
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
            });
            console.log(response.data);
            // Reset the form after successful submission
            setFormData({
                title: '',
                description: '',
                requirements: '',
                salary: '',
                jobType: ''
            });
        } catch (error) {
            console.error('Error posting job:', error);
        }
    };

    return (
        <div>
            <h2>Post a Job</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="requirements">Requirements:</label>
                    <textarea id="requirements" name="requirements" value={formData.requirements} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="salary">Salary:</label>
                    <input type="number" id="salary" name="salary" value={formData.salary} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="jobType">Job Type:</label>
                    <input type="text" id="jobType" name="jobType" value={formData.jobType} onChange={handleChange} required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateJob;
