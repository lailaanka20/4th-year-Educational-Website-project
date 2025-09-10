import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa6";

const Footer = () => {
  const location = useLocation();
  const inHome = location.pathname === "/";
  return (
    <div className="h-[200px] relative text-center Footergradient">
      {inHome && (
        <div className=" absolute top-10 mr-[30%]  flex -justify-between items-center border-1 rounded-xl border-gray-200 p-2 bg-second-color ">
          <p className="font-semibold">
            هل أنت جاهز لتبدأ رحلتك التعليمية معنا؟
          </p>
          <button className="btn px-5 py-1 ml-1 mr-50">
            <Link to="/SignUp">إنشاء حساب</Link>
          </button>
        </div>
      )}
      <p className="absolute bottom-3 mr-5">
        جميع الحقوق محفوظة لدى موقعنا © 2025
      </p>
      <div className="absolute left-2 bottom-3 ml-5 w-30">
        للتواصل معنا
        <div className="flex justify-between items-center mt-5 text-3xl">
          <Link to="/www.facebook.com">
            <FaFacebook />
          </Link>
          <Link to="/instagram.com">
            <FaInstagram />
          </Link>
          <Link to="/telegram.com">
            <FaTelegram />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
