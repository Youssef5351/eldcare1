import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import {AiFillLinkedin} from 'react-icons/ai'
import {AiFillYoutube, AiFillGithub, AiOutlineInstagram} from 'react-icons/ai'

const socialLinks = [
  {
    path: "",
    icon: <AiFillGithub className='group-hover:text-white w-4 h-5'/>
  },
  {
    path: "",
    icon: <AiFillYoutube className='group-hover:text-white w-4 h-5'/>
  },
  {
    path: "",
    icon: <AiOutlineInstagram className='group-hover:text-white w-4 h-5'/>
  },
  {
    path: "",
    icon: <AiFillLinkedin className='group-hover:text-white w-4 h-5'/>
  },
]

const quickLinks01 = [
  {
    path: "/home",
    display: "الرئيسية"
  },
  {
    path: "/services",
    display: "الخدمات"
  },
]

const quickLinks02 = [
  {
    path: "/doctors",
    display: "ابحث عن مستشفى"
  },
  {
    path: "/appointment",
    display: "احجز موعد"
  },
]

const quickLinks03 = [
  {
    path: "/contact",
    display: "تواصل معنا",
  },
]

const Footer = () => {

  const year = new Date().getFullYear()

  return (
    <footer className='pb-16 pt-10'>
      <div className="container">
        <div className="flex justify-between flex-col md:flex-row flex--wrap gap-[30px]">
          <div>
            <img src={logo} alt="" />
            <p className='text-[16px] leading-7 font-[400] text-textColor mt-4'>
              جميع الحقوق محفوظة © {year} تم التطوير بواسطة يوسف عبدالوهاب الكومي
            </p>
            <div className='flex items-center gap-3 mt-4'>
              {socialLinks.map((link, index) => 
                <Link 
                  to={link.path} 
                  key={index} 
                  className='w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none'
                >
                  {link.icon}
                </Link>
              )}
            </div>
          </div>

          <div>
            <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>
              روابط سريعة
            </h2>
            <ul>
              {quickLinks01.map((item, index) => (
                <li key={index} className='mb-4'>
                  <Link to={item.path} className='text-[16px] leading-7 font-[400] text-textColor'>
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>
              أريد أن:
            </h2>
            <ul>
              {quickLinks02.map((item, index) => (
                <li key={index} className='mb-4'>
                  <Link to={item.path} className='text-[16px] leading-7 font-[400] text-textColor'>
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>
              الدعم
            </h2>
            <ul>
              {quickLinks03.map((item, index) => (
                <li key={index} className='mb-4'>
                  <Link to={item.path} className='text-[16px] leading-7 font-[400] text-textColor'>
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer