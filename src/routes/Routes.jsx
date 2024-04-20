import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Dashboard from '../pages/dashboard';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/Signup';
import EmployeeGrid from '../pages/EmployeesGrid';
import JobListing from '../pages/JobListing';
import CreateJob from '../pages/CreateJob';
import AddEmployee from '../pages/AddEmployee';
import UpdateEmployee from '../pages/UpdateEmployee';
import ForgetPassword from '../pages/ForgetPassword'
import SendPassword from '../pages/SendPassword'
import UpdatePassword from '../pages/UpdatePassword';
import UpdateJob from '../pages/UpdateJob';

const Routers = () => {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/employee" element={<EmployeeGrid />} /> 
        <Route path="/joblisting" element={<JobListing />} /> 
        <Route path="/createJob" element={<CreateJob />} />
        <Route path="/updateJob/:id" element={<UpdateJob />} /> 
        <Route path="/employeesDetail" element={<EmployeeGrid />} /> 
        <Route path="/addEmployee" element={<AddEmployee />} />
        <Route path="/updateEmployee/:id" element={<UpdateEmployee />} /> 
         <Route path='/forgetPassword' element= {<ForgetPassword/>}/>    
         <Route path='/updatePassword' element= {<UpdatePassword/>}/>    
         <Route path='/sendPassword' element= {<SendPassword/>}/>    
        <Route path="*" element={<Navigate to="/login" />} />    
      </Routes>    
    </Router>
  );
};

export default Routers;


