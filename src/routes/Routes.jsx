import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Dashboard from '../pages/dashboard';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/Signup';
import EmployeeGrid from '../pages/EmployeesGrid';
import JobListing from '../pages/JobListing';
import Employee from '../pages/Employee';
import CreateJob from '../pages/CreateJobs';
import AddEmployee from '../pages/AddEmployee';
import UpdateEmployee from '../pages/UpdateEmployee';
import CreateJob from '../pages/CreateJob';

const Routers = () => {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/employee" element={<EmployeeGrid />} /> 
        <Route path="/joblisting" element={<JobListing />} /> 
        <Route path="/employeesDetail" element={<EmployeeGrid />} /> 
        <Route path="/addEmployee" element={<AddEmployee />} />
        <Route path="/updateEmployee/:id" element={<UpdateEmployee />} /> 
             
      </Routes>    
    </Router>
  );
};

export default Routers;


