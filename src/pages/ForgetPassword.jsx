import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgetPassword() {
    const navigation = useNavigate();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailID, setEmailID] = useState(null);

  useEffect(() => {
    const fetchEmail = async () => {
      const email = await localStorage.getItem('email');
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
        'http://localhost:4000/api/confirmOtp',
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
   
        // navigation.navigate('confirmpass');
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

  // const handlePasswordReset = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.post(
  //       '/api/v1/auth/sendOtp',
  //       JSON.stringify({
  //         email: emailID,
  //       }),
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     );

  //     if (response?.status === 200) {
  //       const responseData = response.data;
  //       console.log(response);
  //       console.log('Success', responseData.message || 'OTP sent to your email');
  //     } else {
  //       const errorMessage = response.data.message || 'Something went wrong.';
  //       console.log('Error', errorMessage);
  //     }
  //   } catch (error) {
  //     const errorMessage = error.response
  //       ? error.response.data.message
  //       : 'Something went wrong.';
  //       console.log('Error', errorMessage);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleContactSupport = () => {};

  return (
    <div className="min-h-screen bg-purple-900 text-white flex flex-col justify-center items-center p-8">
      <button className="absolute top-0 left-0 p-4" onClick={() => window.history.back()}>Back</button>
      <img src="../../assets/pngImage.png" alt="logo" className="w-64 h-64 mb-8" />

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Forgot Password</h1>
        <p>Password recovery email sent to {hiddenPart}</p>
      </div>

      <div className="mb-8 w-full">
        <input
          type="text"
          placeholder="Enter Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full py-2 px-4 bg-transparent border-b border-white text-white placeholder-gray-300 focus:outline-none"
        />
      </div>

      <div className="mb-8 flex justify-between w-full">
        <div className="flex items-center">
          <img src="../../assets/succ.png" alt="success icon" className="h-6 w-6" />
          <p className="ml-2">Success!</p>
        </div>
        <div>
          <p>Didn't receive email? <button disabled={loading} className="underline text-purple-300">Resend</button></p>
        </div>
      </div>

      <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-bold text-lg rounded-lg shadow-md focus:outline-none mb-8" onClick={handleSubmit} disabled={loading}>
        Submit
      </button>

      <div className="mb-8 text-center">
        <p>Still not working? <button onClick={handleContactSupport} className="underline text-purple-300">Contact Support</button></p>
      </div>
    </div>
  );
}

export default ForgetPassword;
