import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeGrid = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:4000/api/employees', {
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
    <div className='p-20'>
    <a href='/joblisting'>JobListing</a>
    <h1 className='text-center text-3xl font-sans font-semibold mb-10'>Employe List</h1>
    <div className="grid grid-cols-3 gap-4">
      {employees.map(employee => (
        <div key={employee._id} className="bg-white overflow-hidden shadow rounded-lg">
          <img className="h-48 w-full object-cover" src={employee.image} alt={`${employee.firstname} ${employee.lastname}`} />
          <div className="px-4 py-4">
            <h2 className="text-xl font-semibold text-gray-800">{`${employee.firstname} ${employee.lastname}`}</h2>
            <p className="text-sm text-gray-600">{employee.job}</p>
            <p className="text-sm text-gray-600">{employee.email}</p>
            <p className="text-sm text-gray-600">{employee.phone}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default EmployeeGrid;
