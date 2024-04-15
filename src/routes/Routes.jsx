import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/Signup';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check for a stored authentication token (if applicable)
    const storedToken = localStorage.getItem('authToken'); // Adjust based on your storage mechanism
    return storedToken ? true : false;
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        {/* Login route: Always accessible */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes (redirect to login if not logged in) */}
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />}
        />
      </Routes>
      {isLoggedIn && <NavBar />} {/* Conditionally render NavBar only when logged in */}
    </Router>
  );
};

export default App;


