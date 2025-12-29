import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import PatientCard from '../../Dashboard/PatientList/PatientCard';

const EldersList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // جلب رمز التعريف (Token) من التخزين المحلي
        const idToken = localStorage.getItem('idToken');
        
        if (!idToken) {
          setError('لم يتم التحقق من الهوية. يرجى تسجيل الدخول مرة أخرى.');
          setLoading(false);
          return;
        }

        // إرسال الطلب مع ترويسة المصادقة
        const res = await axios.get(
          'https://young-innovator-backend.vercel.app/getElders',
          {
            headers: {
              'Authorization': idToken
            }
          }
        );
        
        console.log('الاستجابة:', res.data);
        
        // التحقق من وجود بيانات لكبار السن
        if (!res.data.relatives || Object.keys(res.data.relatives).length === 0) {
          setPatients([]);
        } else {
          // تحويل الكائن (Object) إلى مصفوفة (Array)
          const patientsArray = Object.keys(res.data.relatives).map(key => ({
            id: key,
            data: res.data.relatives[key]
          }));
          console.log('مصفوفة كبار السن:', patientsArray);
          setPatients(patientsArray);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('خطأ في جلب بيانات كبار السن:', error);
        setError(error.response?.data?.message || 'فشل في تحميل قائمة كبار السن');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // عرض حالة التحميل
  if (loading) {
    return (
      <section className="flex justify-center items-center min-h-screen" dir="rtl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600">جاري التحميل...</h2>
        </div>
      </section>
    );
  }

  // عرض حالة الخطأ
  if (error) {
    return (
      <section className="flex justify-center items-center min-h-screen" dir="rtl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">{error}</h2>
          <Link to="/login" className="text-blue-500 underline mt-4 block">العودة لتسجيل الدخول</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="" dir="rtl">
      <div className="px-4 mx-auto max-w-screen-xl lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="heading">قائمة كبار السن</h2>
          <p className="font-light text-gray-500 lg:mb-16 sm:text-xl">
            ستظهر قائمة كبار السن الذين ترعاهم بالأسفل
          </p>
        </div>
        
        <div className={`${patients.length !== 0 ? 'grid md:grid-cols-2' : 'flex'} gap-8 mb-6 lg:mb-16`}>
          {patients.length === 0 ? (
            <div className="flex justify-center items-center w-full">
              <h1 className="text-center font-extrabold text-gray-600 text-4xl">
                لم تقم بإضافة أي شخص حتى الآن
              </h1>
            </div>
          ) : (
            patients.map((patient) => (
              <PatientCard key={patient.id} id={patient.data} />
            ))
          )}
        </div>
        
        <div className="w-full flex justify-start">
          <Link to="/addelder">
            <button className="bg-blue-500 text-white px-8 py-4 rounded-xl font-bold shadow-sm shadow-black hover:bg-blue-700 transition duration-300">
              + إضافة شخص جديد
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EldersList;
