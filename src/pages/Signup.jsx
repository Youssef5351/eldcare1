import React, { useState } from 'react'
import signupImg from '../assets/images/signup.jpg'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const Signup = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    password: "",
    userType: "",
    gender: "",
  });
  
  const [cpassword, setCpassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if(cpassword !== values.password) {
      toast.error("يجب أن تكون كلمتا المرور متطابقتين")
      return;
    }
    
    try {
      console.log("=== SIGNUP ATTEMPT ===");
      
      // Step 1: Create user in Firebase Authentication
      console.log("Step 1: Creating Firebase user...");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log("✓ Firebase user created!");
      console.log("User ID:", userCredential.user.uid);
      
      // Step 2: Get the ID token
      console.log("Step 2: Getting ID token...");
      const idToken = await userCredential.user.getIdToken();
      console.log("✓ Token received!");
      
      // Step 3: Send user details to backend
      console.log("Step 3: Sending to backend...");
      const response = await axios.post("http://localhost:5000/auth/register", {
        ...values,
        idToken: idToken // Include the token
      });
      console.log("✓ Backend responded!");
      console.log("Response:", response.data);
      
      // Step 4: Save to localStorage
      console.log("Step 4: Saving to localStorage...");
      localStorage.setItem("userId", response.data.userDetails.userId);
      localStorage.setItem("email", response.data.userDetails.email);
      localStorage.setItem("userType", response.data.userDetails.userType);
      localStorage.setItem("gender", response.data.userDetails.gender);
      localStorage.setItem("fullName", response.data.userDetails.fullName);
      localStorage.setItem("idToken", idToken); // Save the token!
      console.log("✓ All data saved!");
      
      toast.success("تم التسجيل بنجاح!")
      
      if(values.userType === 'Doctor') {
        navigate('/dashboard')
      } else {
        navigate('/')
      }
    } catch (error) {
      console.error("=== SIGNUP FAILED ===");
      console.error("Error:", error);
      
      if (error.code) {
        // Firebase error
        if (error.code === 'auth/email-already-in-use') {
          toast.error("البريد الإلكتروني مستخدم بالفعل");
        } else if (error.code === 'auth/weak-password') {
          toast.error("كلمة المرور ضعيفة. يجب أن تكون 6 أحرف على الأقل");
        } else {
          toast.error("حدث خطأ أثناء التسجيل");
        }
      } else {
        // Backend error
        toast.error(error.response?.data?.message || "حدث خطأ");
      }
    }
  }

  return <section className='px-5 xl:px-0'>
    <div className="max-w-[1170px] mx-auto">
      <div className="rounded-xl bg-white flex flex-row lg:grid-cols-2 border border-gray-400 shadow-xl shadow-gray-400">
        {/* صندوق الصورة */}
        <div className="bg-primaryColor h-100 w-7/12 rounded-l-xl">
          <img src={signupImg} alt="" className='w-full h-full object-cover rounded-l-xl' />
        </div>

        {/* نموذج التسجيل */}
        <div className="py-10 px-9 w-5/12">
          <h3 className='text-headingColor text-3xl leading-9 font-bold mb-10'>
            إنشاء <span className='text-primaryColor'>حساب</span>
          </h3>

          <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col'>
            <div className="relative z-0 w-full mb-5 group">
              <input 
                type="text" 
                name="fullName" 
                id="fullName" 
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                placeholder=" " 
                required  
                onChange={(e) => setValues({...values, [e.target.name]: e.target.value})}
              />
              <label 
                htmlFor="fullName" 
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                الاسم الكامل
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input 
                type="email" 
                name="email" 
                id="email" 
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                placeholder=" " 
                required  
                onChange={(e) => setValues({...values, [e.target.name]: e.target.value})}
              />
              <label 
                htmlFor="email" 
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                البريد الإلكتروني
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input 
                type="password" 
                name="password" 
                id="password" 
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                placeholder=" " 
                required  
                onChange={(e) => setValues({...values, [e.target.name]: e.target.value})}
              />
              <label 
                htmlFor="password" 
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                كلمة المرور
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input 
                type="password" 
                name="repeat_password" 
                id="floating_repeat_password" 
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                placeholder=" " 
                required 
                onChange={(e) => setCpassword(e.target.value)}
              />
              <label 
                htmlFor="floating_repeat_password" 
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                تأكيد كلمة المرور
              </label>
            </div>

            <div className="my-5 mb-8 flex items-center justify-between flex-row">
              <label className='text-headingColor font-bold text-[16px] leading-7'> 
                أنت:
                <select 
                  name="userType" 
                  className='text-textColor bg-white font-semibold text-[15px] leading-7 px-4 py-1 focus:outline-none border-b border-gray-400 mx-2' 
                  required
                  onChange={(e) => setValues({...values, [e.target.name]: e.target.value})}
                >
                  <option value="">اختر</option>
                  <option value="Doctor">طبيب</option>
                  <option value="Relative">قريب</option>
                </select>
              </label>

              <label className='text-headingColor font-bold text-[16px] leading-7'> 
                الجنس:
                <select 
                  name="gender" 
                  className='text-textColor bg-white font-semibold text-[15px] leading-7 px-4 py-1 focus:outline-none border-b border-gray-400 mx-2' 
                  required  
                  onChange={(e) => setValues({...values, [e.target.name]: e.target.value})}
                >
                  <option value="">اختر</option>
                  <option value="Male">ذكر</option>
                  <option value="Female">أنثى</option>
                </select>
              </label>
            </div>

            <div className="mt-7">
              <button 
                type='submit' 
                className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 hover:bg-blue-600 flex items-center justify-center font-bold"
              >
                سجل الآن
              </button>
            </div>

            <p className="mt-5 text-textColor text-center">
              لديك حساب بالفعل؟ 
              <Link to='/login' className='text-primaryColor font-medium mr-1'>
                تسجيل الدخول
              </Link>
            </p>
          </form>
          <Toaster/>
        </div>
        
      </div>
    </div>
  </section>

}

export default Signup