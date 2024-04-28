import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgetPassword() {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const navigation = useNavigate();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailID, setEmailID] = useState(null);

  useEffect(() => {
    const fetchEmail = async () => {
      const email = localStorage.getItem('email');
      setEmailID(email);
    };

    fetchEmail();
  }, []);

  const hiddenPart = emailID?.split("@")[0].slice(0, 3) + "****@" + emailID?.split("@")[1];

  const handleSubmit = async () => {
    try {
      if (!code) {
        return alert('Please enter the code!');
      }
      setLoading(true);
      const response = await axios.post(
        `${apiUrl}/api/confirmOtp`,
        {
          email: emailID,
          otp: code,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        navigation('/updatePassword')
      } else {
        const errorMessage = response.data.message || 'Something went wrong.';
        console.log('Error', errorMessage);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error', 'Please enter valid code!');
    }
  };

  const handlePasswordReset = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${apiUrl}/api/sendOtp`,
        JSON.stringify({
          email:emailID,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        alert('otp send again') 
       localStorage.setItem('email',email)
        // navigate('/forgetPassword')
        // Handle success
      } else {
        // Handle error
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // Handle error
    }
  };


  return (

    <div className="p-20 space-y-6 text-center bg-gray-100 min-h-screen">
      <button className="underline" onClick={() => window.history.back()}>Back</button>
      <h1 className="text-3xl font-bold">Forgot Password</h1>
      <p>Password recovery email sent to {hiddenPart}</p>
      <input
        type="text"
        placeholder="Enter Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className=""
      />
      <p>Didn't receive email? <button disabled={loading} onClick={handlePasswordReset} className="underline text-purple-300">Resend</button></p>
      <button className="group relative py-2 px-20 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleSubmit} disabled={loading}>
        Submit
      </button>
    </div>
  );
}

export default ForgetPassword;
