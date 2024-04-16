import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/Signup';
import EmployeeGrid from '../pages/EmployeesGrid';
import JobListing from '../pages/JobListing';

const Routers = () => {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/employee" element={<EmployeeGrid />} /> 
        <Route path="/joblisting" element={<JobListing />} /> 
             
      </Routes>    
    </Router>
  );
};

export default Routers;


