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
import RetrievedJobs from '../pages/retrievedJobs';
import ShowAppliedJobs from '../pages/ShowAppliedJobs';

const Routers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const roleFromServer = localStorage.getItem('data')?.toString();

    if (loggedIn && roleFromServer) {
      setIsLoggedIn(true);
      setUserRole(roleFromServer);
    } else {
      setIsLoggedIn(false);
    }

    setIsLoading(false); // Mark data loading as complete
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading indicator until data is loaded
  }

  return (
    <Router>
      <Routes>
        {!isLoggedIn && (
          <>
            <Route path='/forgetPassword' element={<ForgetPassword />} />
            <Route path='/updatePassword' element={<UpdatePassword />} />
            <Route path='/sendPassword' element={<SendPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}

        {isLoggedIn && userRole === 'employer' && (
          <>
            <Route path="/employee" element={<EmployeeGrid />} />
            <Route path="/joblisting" element={<JobListing />} />
            <Route path="/createJob" element={<CreateJob />} />
            <Route path="/updateJob/:id" element={<UpdateJob />} />
            <Route path="/addEmployee" element={<AddEmployee />} />
            <Route path="/updateEmployee/:id" element={<UpdateEmployee />} />
            <Route path="/showapply" element={<RetrievedJobs/>} />
            <Route path="*" element={<Navigate to="/employee" />} />  
          </>
        )}

        {isLoggedIn && userRole !== 'employer' && (
          <>
            <Route path="/user" element={<UserEntry />} />
            <Route path="/apply/:id" element={<ApplyJobForm />} />
            <Route path="/user-apply" element={<ShowAppliedJobs/>} />
            <Route path="*" element={<Navigate to="/user" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default Routers;
