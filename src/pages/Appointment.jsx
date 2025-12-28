import React, { useState } from 'react'
import appointmentImg from '../../src/assets/images/appointment.jpg'
import { Link } from 'react-router-dom'

const Appointment = () => {

  const user = JSON.parse(localStorage.getItem('user'));

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    time: '',
    hospital: '',
    service: '',
    gender: '',
    role: 'patient'
  })

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const { name, email, phone, age, time, hospital, service, gender, role } = formData;
      console.log(formData);
      const appointmentRef = doc(db, 'appointments', user.uid + time);
      await setDoc(appointmentRef, {
        name: name,
        email: email,
        phone: phone,
        age: age,
        time: time,
        hospital: hospital,
        service: service,
        gender: gender,
        role: role,
        user: user.uid
      }).then(() => {
        console.log('تم حفظ بيانات الموعد بنجاح!');

        // عرض رسالة نجاح والانتقال للصفحة الرئيسية
        alert('تم حفظ الموعد بنجاح! هل تريد المتابعة للدفع؟');
        setFormData({
          name: '',
          email: '',
          phone: '',
          age: '',
          time: '',
          hospital: '',
          service: '',
          gender: '',
          role: 'patient',
        });
        window.location.href = 'https://buy.stripe.com/9AQ8ycdhNefx8ne9AB';
      });

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className='px-5 xl:px-0'>
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* صندوق الصورة */}
          <div className="hidden lg:block bg-transparent rounded-l-lg">
            <figure className="rounded-l-lg">
              <img src={appointmentImg} alt="" className='w-full rounded-l-lg' />
            </figure>
          </div>

          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>
              احجز <span className='text-primaryColor'>موعد 📝</span>
            </h3>

            <form onSubmit={submitHandler}>
              <div className="mb-5">
                <input 
                  type="text" 
                  placeholder='الاسم الكامل' 
                  name='name' 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor' 
                  required 
                />
              </div>

              <div className="mb-5">
                <input 
                  type="email" 
                  placeholder='أدخل بريدك الإلكتروني' 
                  name='email' 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor' 
                  required 
                />
              </div>

              <div className="mb-5">
                <input 
                  type="phone" 
                  length="10" 
                  placeholder='أدخل رقم هاتفك' 
                  name='phone' 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor' 
                  required 
                />
              </div>

              <div className='mb-3'>
                <label className='text-headingColor font-bold text-[16px] leading-7'> 
                  الجنس:
                  <select 
                    name="gender" 
                    value={formData.gender} 
                    onChange={handleInputChange} 
                    className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none cursor-pointer' 
                    required
                  >
                    <option value="">اختر</option>
                    <option value="male">ذكر</option>
                    <option value="female">أنثى</option>
                  </select>
                </label>

                <label className='text-headingColor font-bold text-[16px] leading-7 ml-5'> العمر:</label>
                <input 
                  type="age" 
                  placeholder='أدخل عمرك' 
                  name='age' 
                  value={formData.age} 
                  onChange={handleInputChange} 
                  className='border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor ml-3' 
                  required 
                />

                {/* اختيار الخدمة */}
                <div className='mb-5 mt-5'>
                  <label className='text-headingColor font-bold text-[16px] leading-7'> 
                    اختر الخدمة العلاجية:
                    <select 
                      name="service" 
                      value={formData.service} 
                      onChange={handleInputChange} 
                      className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none cursor-pointer' 
                      required
                    >
                      <option value="">اختر</option>
                      <option value="cancer">رعاية مرضى السرطان</option>
                      <option value="dialysis">الغسيل الكلوي</option>
                      <option value="heart">القلب والأوعية الدموية</option>
                      <option value="teeth">الأسنان</option>
                      <option value="mental">الصحة النفسية</option>
                      <option value="brain">طب الأعصاب</option>
                      <option value="burn">علاج الحروق</option>
                    </select>
                  </label>
                </div>

                {/* اختيار المستشفى */}
                <label className='text-headingColor font-bold text-[16px] leading-7'> 
                  اختر المستشفى:
                  <select 
                    name="hospital" 
                    value={formData.hospital} 
                    onChange={handleInputChange} 
                    className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none cursor-pointer' 
                    required
                  >
                    <option value="">اختر</option>
                    <option value="darelfouad">مستشفى دار الفؤاد، مدينة نصر</option>
                    <option value="salam">مستشفى السلام الدولي، المعادي</option>
                    <option value="andalusia">مستشفى الأندلسية، الإسكندرية</option>
                    <option value="cleopatra">مستشفى كليوباترا، المهندسين</option>
                    <option value="nozha">مستشفى النزهة الدولي، مصر الجديدة</option>
                    <option value="shorouk">مستشفى الشروق، مدينة الشروق</option>
                  </select>
                </label>

              </div>

              {/* الوقت المتاح */}
              <div className='mb-5'>
                <label className='text-headingColor font-bold text-[16px] leading-7'>
                  اختر الوقت المناسب:
                  <select 
                    name="time" 
                    value={formData.time} 
                    onChange={handleInputChange} 
                    className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none cursor-pointer' 
                    required
                  >
                    <option value="">اختر</option>
                    <option value="sunday">الأحد: 9:00 صباحاً إلى 1:30 ظهراً</option>
                    <option value="tuesday">الثلاثاء: 4:00 مساءً إلى 9:30 مساءً</option>
                    <option value="friday">الجمعة: 1:30 ظهراً إلى 6:30 مساءً</option>
                  </select>
                </label>

                <div className="mt-7">
                  <Link to='https://buy.stripe.com/9AQ8ycdhNefx8ne9AB'>
                    <button 
                      type='submit' 
                      className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                    >
                      المتابعة
                    </button>
                  </Link>
                </div>

              </div>
            </form>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Appointment