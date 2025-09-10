import React from "react";
import img from "../../assets/images/BG1.jpg";
import HomepageContainers from "../HomepageContainers";
import "../../index.css";

const About = ({ id }) => {
  return (
    <div className="About min-h-screen" id={id}>
      <HomepageContainers className="h-screen">
        {/* <div className="container flex items-center justify-between py-[100px]"> */}

        <div className="leading-[2] w-[60%] p-10 shadow-amber-500 shadow-2xl">
          <h2 className="text-3xl mb-[40px] font-bold">من نحن؟</h2>
          <p className="text-xl leading-11">
            موقع تعليمي مبتكر يدعم طلاب الجامعات في سوريا بتقديم فيديوهات
            تعليمية تفصيلية تشرح مختلف المواد الدراسية بطرق سلسة وشيقة. يساعد
            هذا الموقع الطلاب على استيعاب المفاهيم بشكل أفضل من خلال محتوى مرئي
            جاذب بعد انتهاء الطلاب من حضور الفيديو، يمكنهم خوض اختبارات قصيرة
            لتقييم فهمهم للمادة، مما يعزز التعلم النشط والتفاعل. كما يوفر الموقع
            دورات إضافية وموارد دراسية متنوعة، مما يجعله منصة شاملة تعزز من نجاح
            الطلاب الأكاديمي. إن هذا الابتكار يجعل التعليم أكثر سهولة وتشويقًا
            في عالم اليوم المتغير.
          </p>
        </div>
        <div className="size-100">
          <img
            className="landing-img
"
            src={img}
            alt="not found"
          ></img>
        </div>
      </HomepageContainers>
    </div>
  );
};

export default About;
