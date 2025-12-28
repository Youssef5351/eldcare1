import React from 'react'
import { Link } from 'react-router-dom'
import heroImg01 from '../assets/images/hero-img01.png'
import icon01 from '../assets/images/icon01.png'
import icon02 from '../assets/images/icon02.png'
import icon03 from '../assets/images/icon03.png'
import { BsArrowRight } from 'react-icons/bs'
import DoctorList from '../components/Hospitals/HospitalList'

const Home = () => {
  return (
    <>
      <section className='hero__section pt-[60px] 2xl:h-[800px]'>
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            {/* محتوى البطل */}
            <div>
              <div className='lg:w-[570px]'>
                <h1 className='text-[36px] leading-[46px] text-headingColor font-[800] md:text-[40px] md:leading-[70px]'>مرحباً!</h1>
                <h1 className='text-[36px] leading-[46px] text-headingColor font-[800] md:text-[40px] md:leading-[70px]'>نساعد كبار السن على عيش حياة صحية وأطول.</h1>
                <p className='text__para'>
                  تأسست رعاية المسنين على نموذج أفضل للرعاية مصمم حول احتياجات المرضى يوفر مستوى أعلى من الجودة والخدمة بأسعار معقولة. نحن نفعل ذلك من خلال التصميم المبتكر وخدمة العملاء الممتازة والاستخدام الفعال للتكنولوجيا.</p>
              </div>

              {/* عداد البطل */}
              <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
                <div>
                  <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>30+</h2>
                  <span className='w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]'></span>
                  <p className='text__para'>خدمة</p>
                </div>
                <div>
                  <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>15+</h2>
                  <span className='w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px]'></span>
                  <p className='text__para'>موقع مستشفى</p>
                </div>
                <div>
                  <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>100%</h2>
                  <span className='w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]'></span>
                  <p className='text__para'>رضا كبار السن</p>
                </div>
              </div>

            </div>
            {/* محتوى البطل */}
            <div className="flex gap-[30px] justify-end">
              <div>
                <img className='w-full' src={heroImg01} alt="" />
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* نهاية محتوى البطل */}
      
      <section>
        <div className="container">
          <div className="lg:w-[470px] mx-auto">
            <h2 className='heading text-center'>نقدم أفضل خدمات الحجز</h2>
            <p className='text__para text-center'>رعاية عالمية المستوى لكبار السن. تقدم خدماتنا الصحية رعاية صحية خبيرة لا مثيل لها.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">

            <div className='py-[30px] px-5'>
              <div className="flex items-center justify-center">
                <img src={icon01} alt="" />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">ابحث عن خدمة</h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">تقدم خدماتنا الصحية رعاية صحية خبيرة لا مثيل لها بطريقة مؤهلة ومنظمة على أعلى مستوى</p>

                <Link to='/services' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                  <BsArrowRight className='group-hover:text-white w-6 h-5' />
                </Link>
            
              </div>
            </div>
            
            <div className='py-[30px] px-5'>
              <div className="flex items-center justify-center">
                <img src={icon02} alt="" />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">ابحث عن مستشفى</h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">خدمة طبية منظمة تقدم خدمات تشخيصية أو علاجية أو وقائية للمرضى الخارجيين.</p>

                <Link to='/hospital' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                  <BsArrowRight className='group-hover:text-white w-6 h-5' />
                </Link>

              </div>
            </div>
            
            <div className='py-[30px] px-5'>
              <div className="flex items-center justify-center">
                <img src={icon03} alt="" />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">احجز موعد</h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">احجز المواعيد بسهولة في أقرب العيادات/المستشفيات الممكنة.</p>

                <Link to='/appointment' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                  <BsArrowRight className='group-hover:text-white w-6 h-5' />
                </Link>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* المستشفيات الرائعة */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">أفضل مستشفياتنا لأفضل الخدمات</h2>
            <p className="text__para text-center">جميع المستشفيات معروفة بخدماتها ومعترف بها جيداً.</p>
          </div>
          <DoctorList/>

        </div>
      </section>
      {/* نهاية المستشفيات الرائعة */}

    </>
  )
}

export default Home