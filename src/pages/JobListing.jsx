import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobListing = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
      const fetchEmployees = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.get('http://localhost:4000/api/employe', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setEmployees(response.data);
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
      };
  
      fetchEmployees();
    }, []); // Run once on component mount
  
  return (
    <div>
    
    </div>
  )
}

export default JobListing