import React from 'react'
import { useState } from 'react';

const Contact = () => {

  const user = JSON.parse(localStorage.getItem('user'))
  
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  })

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  
  return <section>
    <div className="px-4 mx-auto max-w-screen-md">
      <h2 className='heading text-center'>تواصل معنا</h2>
      <p className="mb-8 lg:mb-16 font-light text-center text__para">
        هل لديك مشكلة تقنية؟ تريد إرسال ملاحظات حول ميزة تجريبية؟ أخبرنا
      </p>
      
      <form action="#" className='space-y-8'>
        <div>
          <label htmlFor="email" className='form__label'>بريدك الإلكتروني</label>
          <input 
            type="email" 
            id='email' 
            placeholder='example@gmail.com' 
            onChange={handleInputChange} 
            className='form__input mt-1' 
          />
        </div>

        <div>
          <label htmlFor="subject" className='form__label'>الموضوع</label>
          <input 
            type="text" 
            id='subject' 
            onChange={handleInputChange} 
            placeholder='أخبرنا كيف يمكننا مساعدتك' 
            className='form__input mt-1' 
          />
        </div>

        <div className='sm:col-span-2'>
          <label htmlFor="message" className='form__label'>رسالتك</label>
          <textarea 
            rows={5} 
            type="text" 
            id='message' 
            onChange={handleInputChange} 
            placeholder='اترك تعليقاً....' 
            className='form__input mt-1' 
          />
        </div>

        <button type='submit' className='btn rounded sm:w-fit'>إرسال</button>
      </form>
    </div>
  </section>
  
}

export default Contact