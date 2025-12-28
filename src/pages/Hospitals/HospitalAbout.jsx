import React from 'react'

const DoctorAbout = () => {
  return <div>
    <div>
      <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
        حول
        <span className='text-irisBlueColor font-bold text-[24px] leading-9'>مستشفى السلام الدولي</span>
      </h3>
      <p className="text__para">
        مستشفى السلام الدولي بالقاهرة هو أحد المستشفيات الرائدة في مصر، ويقع على بعد 8.3 كم من مطار القاهرة الدولي، ويوفر رعاية صحية متميزة بمعايير عالمية.
      </p>
      <p className="text__para">
        مستشفى السلام هو مستشفى متعدد التخصصات بسعة 153 سريراً مع رعاية طبية من الدرجة الثالثة بمعايير دولية. تأسس المستشفى في ديسمبر 2009 ويعتبر من أكثر مقدمي الرعاية الصحية الموثوق بهم. المستشفى يضم أكثر من 200 استشاري طبي وطاقم من أكثر من 350 محترفاً يعملون على مدار الساعة. يمتلك المستشفى فريقاً من الاستشاريين والأطباء المؤهلين تأهيلاً عالياً مدعومين بممرضات ماهرات وذوي خبرة عالية، وطاقم شبه طبي وفريق من الإداريين.
      </p>
    </div>

    <div className="mt-12">
      <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>للتواصل</h3>
      <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
        <li className="p-4 rounded bg-[#fff9ea]">
          <span className="text-yellowColor text-[15px] leading-6 font-semibold">+201012345678</span>
          <p className='text-[16px] leading-6 font-medium text-textColor'>أ. محمد أحمد</p>
          <p className='text-[14px] leading-6 font-medium text-textColor'>موظف المستشفى</p>
        </li>

        <li className="p-4 rounded bg-[#fff9ea]">
          <span className="text-yellowColor text-[15px] leading-6 font-semibold">+201098765432</span>
          <p className='text-[16px] leading-6 font-medium text-textColor'>أ. سارة علي</p>
          <p className='text-[14px] leading-6 font-medium text-textColor'>دعم المستشفى</p>
        </li>
      </ul>
    </div>

  </div>
}

export default DoctorAbout