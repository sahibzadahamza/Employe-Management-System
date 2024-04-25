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
    <div className="bg-gray-100 text-center p-8">
      <button className="" onClick={() => navigation.goBack()}>Back</button>
   

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
            className="appearance-none rounded-none px-5  py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          <button onClick={togglePasswordVisibility} className="ml-2">
            show
          </button>
        </div>
      </div>

      <div className="mb-8 w-full ">
        <div className="relative">
          <input
            type={showPassword2 ? 'text' : 'password'}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="appearance-none rounded-none px-5  py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          <button onClick={togglePasswordVisibility2} className="ml-2">
            show
          </button>
        </div>
      </div>

      <button className="group relative py-2 px-20 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={handleChangePassword}>
        Submit
      </button>
    </div>
  );
}

export default UpdatePassword;
