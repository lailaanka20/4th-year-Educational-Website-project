import React from "react";
import { FaCheck } from "react-icons/fa";
import HomepageContainers from "../HomepageContainers";
import img from "../../assets/images/BG2.jpg";
import "../../index.css";

const Services = ({ id }) => {
  return (
    <div className="services section-padding min-h-screen" id={id}>
      <HomepageContainers className="h-screen">
        <div className="">
          <img className="landing-img" src={img} alt=""></img>
        </div>
        <div className="p-10 shadow-amber-500 shadow-2xl">
          <h2 className="font-bold text-2xl mb-10">
            يقدم لنا هذا الموقع الخدمات التالية
          </h2>
          <ul className="max-w-[500px] p-[15px] list-none text-xl">
            <li className="relative p-[10px] mt-1">
              <FaCheck className="text-second-color absolute -right-5 top-3.5 " />
              خدمات تعليمية متكاملة:تقدم خدمات تعليمية شاملة للطلاب في جميع
              جامعات سوريا
            </li>
            <li className="relative p-[10px] mt-1">
              <FaCheck className="text-second-color absolute -right-5 top-3.5" />
              خدمات تعليمية متكاملة:تقدم خدمات تعليمية شاملة للطلاب في جميع
              جامعات سوريا
            </li>
            <li className="relative p-[10px] mt-1">
              <FaCheck className="text-second-color absolute -right-5 top-3.5" />
              خدمات تعليمية متكاملة:تقدم خدمات تعليمية شاملة للطلاب في جميع
              جامعات سوريا
            </li>
            <li className="relative p-[10px] mt-1">
              <FaCheck className="text-second-color absolute -right-5 top-3.5" />
              خدمات تعليمية متكاملة:تقدم خدمات تعليمية شاملة للطلاب في جميع
              جامعات سوريا
            </li>
            <li className="relative p-[10px] mt-1">
              <FaCheck className="text-second-color absolute -right-5 top-3.5" />
              خدمات تعليمية متكاملة:تقدم خدمات تعليمية شاملة للطلاب في جميع
              جامعات سوريا
            </li>
          </ul>
        </div>
      </HomepageContainers>
    </div>
  );
};

export default Services;
