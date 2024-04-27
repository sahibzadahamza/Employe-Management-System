import React, { useState, useEffect } from 'react';
import {Link, Navigate} from 'react-router-dom';
import axios from 'axios';
import AdminHeader from './AdminHeader';

const EmployeeGrid = () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [redirectToUpdateEmployee, setRedirectToUpdateEmployee] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${apiUrl}/api/employees`, {
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

  const filteredemployee = employees.filter(employees =>
    employees.job.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdate = (id) => {

    // Handle edit functionality here
    console.log(`Updating employee with ID: ${id}`);
    setRedirectToUpdateEmployee(id);
    // Navigate to the UpdateEmployee page while passing the employee ID
  };

  if (redirectToUpdateEmployee) {
    return <Navigate to={`/updateEmployee/${redirectToUpdateEmployee}`} />;
  }

  const handleDelete = async (id) => {
    // Retrieve the authentication token from localStorage 
    try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found!');
          return;
        }
        const response = await axios.delete(`{http://localhost:4000}/api/employees/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(`Employee with ID ${id} deleted successfully.`);
        window.location.reload();
      } catch (error) {
        console.error(`Error deleting employee with ID ${id}:`, error);
      }
  };

  return (
    <>
<AdminHeader/>
    <div className='px-20 py-10 bg-gray-100'>
        <div className='flex justify-between gap-96 mb-6'>
        <h2 className="text-3xl font-extrabold text-gray-900">Employees Details</h2>
          <input
            type='text'
            placeholder='Search by job title'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='flex-grow ml-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {filteredemployee.map(employee => (
            <div key={employee._id} className="bg-white overflow-hidden shadow rounded-lg p-4">
              <img className="h-48 w-full object-cover" src={employee.image} alt={`${employee.firstname} ${employee.lastname}`} />
              <div className="px-4 py-4">
                <h2 className="text-xl font-semibold text-gray-800"> <span className='font-bold '>Employee Name : </span>{`${employee.firstname} ${employee.lastname}`}</h2>
                <p className="text-sm text-gray-600"> <span className='font-bold '>Employee Job :</span>  {employee.job}</p>
                <p className="text-sm text-gray-600"> <span className='font-bold '>Employee Email   : </span>{employee.email}</p>
                <p className="text-sm text-gray-600"> <span className='font-bold '>Employee Phone   :</span> {employee.phone}</p>
                <p className="text-sm text-gray-600"> <span className='font-bold '>Employee Joining Date : </span> {employee.dateOfJoining}</p>
              <div className='flex gap-8 mt-2'>

                <button 
                className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => handleUpdate(employee._id)}>
                Update
                </button>
                <button 
                className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => handleDelete(employee._id)}>
                Delete</button>
              </div>
                
              </div>
            </div>
          ))}
        </div>
    </div>
    </>
  );
};

export default EmployeeGrid;