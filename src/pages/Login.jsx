import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../firebase'
const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

const handleSubmit = async(e) => {
  e.preventDefault();
  console.log("=== LOGIN ATTEMPT ===");
  console.log("Email:", values.email);
  
  try {
    // Step 1: Authenticate with Firebase
    console.log("Step 1: Authenticating with Firebase...");
    const userCredential = await signInWithEmailAndPassword(
      auth, 
      values.email, 
      values.password
    );
    console.log("✓ Firebase auth successful!");
    console.log("User:", userCredential.user.uid);
    
    // Step 2: Get the ID token from Firebase
    console.log("Step 2: Getting ID token...");
    const idToken = await userCredential.user.getIdToken();
    console.log("✓ Token received!");
    console.log("Token length:", idToken.length);
    console.log("Token preview:", idToken.substring(0, 50));
    
    // Step 3: Send the token to your backend
    console.log("Step 3: Sending token to backend...");
    const response = await axios.post("http://localhost:5000/auth/login", {
      idToken: idToken
    });
    console.log("✓ Backend responded!");
    console.log("Response:", response.data);
    
    // Step 4: Save everything to localStorage
    console.log("Step 4: Saving to localStorage...");
    localStorage.setItem("userId", response.data.userDetails.userId);
    localStorage.setItem("email", response.data.userDetails.email);
    localStorage.setItem("userType", response.data.userDetails.userType);
    localStorage.setItem("gender", response.data.userDetails.gender);
    localStorage.setItem("fullName", response.data.userDetails.fullName);
    localStorage.setItem("idToken", idToken);
    console.log("✓ Token saved to localStorage!");
    console.log("Verify token in storage:", localStorage.getItem("idToken")?.substring(0, 50));
    
    toast.success("تم تسجيل الدخول بنجاح!");
    
    // REMOVED location.reload() - let React Router handle navigation
    if(response.data.userDetails.userType === 'Doctor') {
      navigate('/dashboard')
    } else {
      navigate('/')
    }
  } catch (error) {
    console.error("=== LOGIN FAILED ===");
    console.error("Error:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    
    if (error.code) {
      toast.error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    } else {
      toast.error(error.response?.data?.message || "حدث خطأ");
    }
  }
}

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>
          مرحباً <span className='text-primaryColor'>أهلاً بعودتك</span> 🙋
        </h3>
        
        <form className='py-4 md:py-0' onSubmit={e => handleSubmit(e)}> 
          <div className="mb-5">
            <input 
              type="email" 
              placeholder='أدخل بريدك الإلكتروني' 
              name='email' 
              className='w-full py-3 border-b bprder-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer' 
              required 
              onChange={(e) => setValues({...values, [e.target.name]: e.target.value})}
            />
          </div>

          <div className="mb-5">
            <input 
              type="password" 
              placeholder='كلمة المرور' 
              name='password' 
              className='w-full py-3 border-b bprder-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer' 
              required 
              onChange={(e) => setValues({...values, [e.target.name]: e.target.value})}
            />
          </div>

          <div className="mt-7">
            <button 
              type='submit' 
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 flex items-center justify-center"
            >
              تسجيل الدخول
            </button>
          </div>

          <p className="mt-5 text-textColor text-center">
            ليس لديك حساب؟ 
            <Link to='/signup' className='text-primaryColor font-medium mr-1'>
              سجل الآن
            </Link>
          </p>

        </form>
      </div>
    </section>
  )
}

export default Login