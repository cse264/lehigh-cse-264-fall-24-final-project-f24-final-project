import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { Sprout } from 'lucide-react';

export default function Login() {
    const navigate = useNavigate();
    const responseMessage = (response) => {
      console.log('Success',response)
      navigate('/home');
    }
    const errorMessage = (error) => {
      console.log('Error',error)
    }
    return (
      <div className="flex justify-center items-center min-h-screen  bg-gradient-to-br from-pink-200 via-emerald-100 to-blue-200"> 
        <div className="bg-white rounded-lg shadow-lg min-h-96 min-w-80 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold font-mono">PlantPal</h1>
          <Sprout className="h-12 w-12 mt-2 fill-emerald-200" color="#059669"/>
          <h1 className="mb-4 text-m font-semibold mt-5 font-mono">🔐Log in to your account🔐</h1>
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage}/>
        </div>
      </div>
    );
  }