import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [error, setError] = useState(''); // To store error message
  const navigate = useNavigate();

  const responseMessage = async (response) => {
    try {
      console.log('Success:', response.credential); // Log the token from Google OAuth response
      const { data } = await axios.post('http://localhost:8080/login', {
        token: response.credential, // Send the token to the backend
      });
      console.log('Backend Response:', data); // Log the backend response
      navigate('/home'); // Navigate to the home page on successful login
    } catch (error) {
      console.error('Error:', error);
      setError('Login failed. Please try again.'); // Show error message in the UI
    }
  };
  

  const errorMessage = (error) => {
    console.error('Error:', error);
    setError('Login failed. Please try again.');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-200 via-emerald-100 to-blue-200">
      <div className="bg-white rounded-lg shadow-lg min-h-96 min-w-80 flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-semibold font-mono">PlantPal</h1>
        <h1 className="mb-4 text-m font-semibold mt-5 font-mono">🔐 Log in to your account 🔐</h1>
        {error && <div className="text-red-500 font-semibold mb-4">{error}</div>}
        <GoogleLogin
          onSuccess={responseMessage}
          onError={errorMessage}
        />
      </div>
    </div>
  );
}
