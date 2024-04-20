import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SendPassword = ()=> {
  const [email, setEmail] = useState('');
const navigate = useNavigate();
  const handlePasswordReset = async () => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/sendOtp',
        JSON.stringify({
          email,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
       localStorage.setItem('email',email)
        navigate('/forgetPassword')
        // Handle success
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-purple-900 text-white">
      <button className="absolute top-0 left-0 p-4" onClick={() => window.history.back()}>Back</button>
      <img src="../../assets/pngImage.png" alt="logo" className="w-64 h-64 mb-8" />

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Forget Password</h1>
        <p>Enter your registered email below</p>
      </div>

      <div className="mb-8">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full py-2 px-4 bg-transparent border-b border-white text-white placeholder-gray-300 focus:outline-none"
        />
      </div>

      <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-bold text-lg rounded-lg shadow-md focus:outline-none" onClick={handlePasswordReset}>
        Submit
      </button>

      <div className="mt-8">
        <p>Remember the password?</p>
        <a href="/login" className="text-purple-300 underline">Sign In</a>
      </div>
    </div>
  );
}

export default SendPassword;
