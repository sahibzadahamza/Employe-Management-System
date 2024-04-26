import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SendPassword = ()=> {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [email, setEmail] = useState('');
const navigate = useNavigate();
  const handlePasswordReset = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/sendOtp`,
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
    <div className="min-h-screen flex flex-col justify-center items-center px-20 bg-gray-100">
      <button className="pr-[12.5rem] my-6 underline text-slate-600" onClick={() => window.history.back()}>Back</button>

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
          className="appearance-none rounded-none relative block w-full px-5  py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        />
      </div>

      <button className="group relative flex justify-center py-2 px-20 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
       onClick={handlePasswordReset}>
        Submit
      </button>

      <div className="mt-8 break-words">
        <p>Remember the password? <a href="/login" className="text-slate-600 underline">Sign In</a></p>
        
      </div>
    </div>
  );
}

export default SendPassword;
