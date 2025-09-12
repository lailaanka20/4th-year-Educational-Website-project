import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa6";

// const Footer = () => {
//   const location = useLocation();
//   const inHome = location.pathname === "/";
//   return (
//     // <container className="relative">
//     <div className=" h-[200px] text-center Footergradient relative bottom-0">
//       {inHome && (
//         <div className=" absolute top-10 mr-[30%] flex -justify-between items-center border-1 rounded-xl border-gray-200 p-2 bg-second-color ">
//           <p className="font-semibold">
//             هل أنت جاهز لتبدأ رحلتك التعليمية معنا؟
//           </p>
//           <button className="btn px-5 py-1 ml-1 mr-50">
//             <Link to="/SignUp">إنشاء حساب</Link>
//           </button>
//         </div>
//       )}
//       <p className="absolute bottom-3 mr-5">
//         جميع الحقوق محفوظة لدى موقعنا © 2025
//       </p>
//       <div className="absolute left-2 bottom-3 ml-5 w-30">
//         للتواصل معنا
//         <div className="flex justify-between items-center mt-5 text-3xl">
//           <Link to="https://www.facebook.com/EduSite">
//             <FaFacebook />
//           </Link>
//           <Link to="https://www.instagram.com/EduSite">
//             <FaInstagram />
//           </Link>
//           <Link to="https://telegram.com/EduSite">
//             <FaTelegram />
//           </Link>
//         </div>
//       </div>
//     </div>
//     // </container>
//   );
// };

// export default Footer;

const Footer = () => {
  const location = useLocation();
  const inHome = location.pathname === "/";

  return (
    <footer className="bg-second-color  Footergradient py-8 px-4 mt-10">
      {inHome && (
        <div className="border-1 rounded-xl border-gray-200 p-2 bg-second-color mb-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-lg font-semibold mb-2 md:mb-0">
            هل أنت جاهز لتبدأ رحلتك التعليمية معنا؟
          </p>
          <button className="btn px-5 py-1 ml-1  mr-50">
            <Link
              to="/SignUp"
              className="bg-white text-main-color font-bold px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              إنشاء حساب
            </Link>
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-300 pt-4">
        <p className="mr-2 mt-20 text-sm mb-4 md:mb-0">
          جميع الحقوق محفوظة لدى موقعنا © 2025
        </p>

        <div className="text-center mt-5">
          للتواصل معنا
          <div className="flex items-center mt-5 space-x-4 text-3xl">
            <a
              href="https://www.facebook.com/EduSite"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/EduSite"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              <FaInstagram />
            </a>
            <a
              href="https://telegram.com/EduSite"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-500"
            >
              <FaTelegram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
