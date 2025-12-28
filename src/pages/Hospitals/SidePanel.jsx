import React from 'react'
import { Link } from 'react-router-dom'

const SidePanel = () => {
  return (
    <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'>
        <div className="flex items-center justify-between">
            <p className="text__para mt-0 font-semibold">سعر التذكرة</p>
            <span className='text-[16px] leading-7 lg:text-22px] lg:leading-8 text-headingColor font-bold'>500 جنيه</span>
        </div>

        <div className="mt-[30px]">
            <p className="text__para mt-0 font-semibold text-headingColor">
                المواعيد المتاحة:
            </p>

            <ul className="mt-3">
                <li className="flex items-center justify-between mb-2">
                    <p className='text-[15px] leading-6 text-textColor font-semibold'>الأحد</p>
                    <p className='text-[15px] leading-6 text-textColor font-semibold'>
                        من 9:00 صباحًا لـ 1:30 ظهرًا
                    </p>
                </li>

                <li className="flex items-center justify-between mb-2">
                    <p className='text-[15px] leading-6 text-textColor font-semibold'>الثلاثاء</p>
                    <p className='text-[15px] leading-6 text-textColor font-semibold'>
                        من 4:00 عصرًا لـ 9:30 مساءً
                    </p>
                </li>

                <li className="flex items-center justify-between mb-2">
                    <p className='text-[15px] leading-6 text-textColor font-semibold'>الجمعة</p>
                    <p className='text-[15px] leading-6 text-textColor font-semibold'>
                        من 1:30 ظهرًا لـ 6:30 مساءً
                    </p>
                </li>
            </ul>
        </div>

        <Link to='/appointment'>
            <button className="btn px-2 w-full rounded-md">
                احجز معاد
            </button>
        </Link>
    </div>
  )
}

export default SidePanel
