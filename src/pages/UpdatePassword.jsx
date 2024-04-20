import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UpdatePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [emailID, setEmailID] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmail = async () => {
      const email = await localStorage.getItem('email');
      setEmailID(email);
    };

    fetchEmail();
  }, []);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      return console.log(
        'Error',
        'The passwords do not match. Please try again.',
      );
    }
    if (newPassword?.length < 5) {
      return console.log(
        'Error',
        'Please enter a valid password. The length should be at least 6 characters.',
      );
    }

    try {
      setLoading(true);

      const response = await axios.post(
        'http://localhost:4000/api/resetPassword',
        {
          email: emailID,
          newPassword: confirmPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 200) {
        console.log('Success', response.data.message || 'Successfully updated');
        navigate('/login');
      } else {
        const errorMessage = response.data.message || 'Something went wrong.';
        console.log('Error', errorMessage);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response
        ? error.response.data.message
        : 'Something went wrong.';
      console.log('Error', errorMessage);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <div className="min-h-screen bg-purple-900 text-white flex flex-col justify-center items-center p-8">
      <button className="absolute top-0 left-0 p-4" onClick={() => navigation.goBack()}>Back</button>
      <img src="../../assets/pngImage.png" alt="logo" className="w-64 h-64 mb-8" />

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Change Password</h1>
        <p>Enter a different password than the previous one</p>
      </div>

      <div className="mb-8 w-full">
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full py-2 px-4 bg-transparent border-b border-white text-white placeholder-gray-300 focus:outline-none"
          />
          <button onClick={togglePasswordVisibility} className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-4">
            <img src={showPassword ? '../../assets/opened1.png' : '../../assets/closed1.png'} alt="toggle visibility" className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="mb-8 w-full">
        <div className="relative">
          <input
            type={showPassword2 ? 'text' : 'password'}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full py-2 px-4 bg-transparent border-b border-white text-white placeholder-gray-300 focus:outline-none"
          />
          <button onClick={togglePasswordVisibility2} className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-4">
            <img src={showPassword2 ? '../../assets/opened1.png' : '../../assets/closed1.png'} alt="toggle visibility" className="h-6 w-6" />
          </button>
        </div>
      </div>

      <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-bold text-lg rounded-lg shadow-md focus:outline-none mb-8" onClick={handleChangePassword} disabled={loading}>
        Submit
      </button>
    </div>
  );
}

export default UpdatePassword;
