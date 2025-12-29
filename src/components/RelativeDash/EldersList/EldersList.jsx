import React, { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import PatientCard from '../../Dashboard/PatientList/PatientCard';

const EldersList = () => {
  const [patients, setPatients] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const res = await axios.get('https://young-innovator-backend.vercel.app/getElders');
          console.log(res);
          if (res.data.relatives == null) {
              setPatients([]);
          } else {
              // تحويل الكائن إلى مصفوفة
              const patientsArray = Object.keys(res.data.relatives).map(key => ({
                  id: key,
                  data: res.data.relatives[key]
              }));
              console.log(patientsArray)
              setPatients(patientsArray);
          }
      } catch (error) {
          console.error('خطأ في جلب بيانات كبار السن:', error);
      }
  };
  fetchData();
  }, [])
    
  return (
    // إضافة dir="rtl" لضبط اتجاه الصفحة للعربية
    <section className="" dir="rtl">
      <div className="px-4 mx-auto max-w-screen-xl lg:px-6 ">
          <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
              <h2 className="heading text-headingColor">قائمة كبار السن</h2>
              <p className="font-light text-gray-500 lg:mb-16 sm:text-xl ">
                سيظهر الأشخاص الذين ترعاهم في القائمة أدناه
              </p>
          </div> 

          <div className={`${patients.length !== 0 ? `grid md:grid-cols-2` : `flex` } gap-8 mb-6 lg:mb-16 `}>
            {patients.length === 0 ? 
                <div className="flex justify-center items-center w-full">
                  <h1 className="text-center font-extrabold text-gray-600 text-4xl">
                    لم تقم بإضافة أي شخص حتى الآن
                  </h1>
                </div> :
                patients.map((patient) => {
                  return <PatientCard key={patient.id} id={patient.data}/>   
                })
            }
          </div>  

          {/* زر الإضافة محاذى لليسار ليتناسب مع التصميم العربي */}
          <div className='w-full flex justify-start'>
            <Link to='/addelder'>
              <button className='bg-primaryColor text-white px-8 py-4 rounded-xl font-bold shadow-sm hover:bg-blue-700 transition duration-300'>
                + إضافة شخص جديد
              </button>
            </Link>
          </div>
      </div>
    </section>
  )
}

export default EldersList
