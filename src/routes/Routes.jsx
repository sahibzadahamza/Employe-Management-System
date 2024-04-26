import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/Signup';
import EmployeeGrid from '../pages/EmployeesGrid';
import JobListing from '../pages/JobListing';
import CreateJob from '../pages/CreateJob';
import UpdateJob from '../pages/UpdateJob';
import AddEmployee from '../pages/AddEmployee';
import UpdateEmployee from '../pages/UpdateEmployee';
import ForgetPassword from '../pages/ForgetPassword';
import SendPassword from '../pages/SendPassword';
import UpdatePassword from '../pages/UpdatePassword';
import UserEntry from '../pages/UserEntry';
import ApplyJobForm from '../pages/ApplyJobForm';
// import UserEntry from '../pages/UserEntry';

const Routers = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  const getUserStatusAndRole = () => {
    const roleFromServer = localStorage.getItem('data')?.toString();
    if (roleFromServer) {
      setIsLoggedIn(true);
      setUserRole(roleFromServer);
    } 
    else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    getUserStatusAndRole();
  }, []);

  return (
    <>
      <Router>
        {!isLoggedIn && (
          <Routes>
            <Route path='/forgetPassword' element={<ForgetPassword />} />
            <Route path='/updatePassword' element={<UpdatePassword />} />
            <Route path='/sendPassword' element={<SendPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
        {isLoggedIn && userRole === 'employer' && (
          <Routes>
            <Route path="/employee" element={<EmployeeGrid />} />
            <Route path="/joblisting" element={<JobListing />} />
            <Route path="/createJob" element={<CreateJob />} />
            <Route path="/updateJob/:id" element={<UpdateJob />} />
            <Route path="/addEmployee" element={<AddEmployee />} />
            <Route path="/updateEmployee/:id" element={<UpdateEmployee />} />
            <Route path="*" element={<Navigate to="/employee" />} />
          </Routes>
        )}
        {isLoggedIn && userRole !== 'employer' && (
          <Routes>
            <Route path="/user" element={<UserEntry />} />
            <Route path="/apply/:id" element={<ApplyJobForm />} />
            <Route path="*" element={<Navigate to="/user" />} />
          </Routes>
        )}
      </Router>
    </>
  );
};

export default Routers;


