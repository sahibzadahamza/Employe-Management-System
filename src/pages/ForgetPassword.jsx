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

  const handleContactSupport = () => { };

  return (

    <div className="p-20 space-y-6 text-center bg-gray-100">
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
      <p>Didn't receive email? <button disabled={loading} className="underline text-purple-300">Resend</button></p>
      <button className="group relative py-2 px-20 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleSubmit} disabled={loading}>
        Submit
      </button>
      <p>Still not working? <button onClick={handleContactSupport} className="underline text-purple-300">Contact Support</button></p>
    </div>
  );
}

export default ForgetPassword;
