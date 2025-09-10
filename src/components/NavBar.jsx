import React from "react";
import { Link } from "react-router-dom";
import HomepageContainer from "./HomepageContainers";
import logo from "../assets/images/logo.png";
import "../index.css";

const NavBar = () => {
  return (
    <nav className="px-15 w-full z-2 my-5 h-[50px]">
      <HomepageContainer className="relative container py-0 mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex">
          <img className="w-[65px]" src={logo} alt="not found"></img>
          <ul className="flex justify-between items-center text-[22px] text-main-color">
            <li className="">
              <Link
                to="/#about"
                className="hover:opacity-75 my-0 mr-25 no-underline"
              >
                من نحن؟
              </Link>
            </li>
            <li>
              <Link
                to="/#services"
                className="hover:opacity-75 my-0 mr-25 no-underline"
              >
                الخدمات
              </Link>
            </li>
            <li>
              <Link
                to="/#universities"
                className="hover:opacity-75 my-0 mr-25 no-underline"
              >
                الجامعات المتعاونة
              </Link>
            </li>
          </ul>
        </div>
        <div className="login">
          <button className="btn px-5 py-1 ml-1">
            <Link to="/SignUp">إنشاء حساب</Link>
          </button>
          <button className="btn px-5 py-1">
            <Link to="/LogInPage">تسجيل دخول</Link>
          </button>
        </div>
      </HomepageContainer>
    </nav>
  );
};

export default NavBar;

//another trying
// import React from "react";
// import { a } from "react-router-dom";
// import logo from "../assets/images/logo.png";
// import "../index.css";

// const NavBar = () => {
//   return (
//     <nav className="hrefp-10 w-full mx-auhref mt-5 p-4">
//       {" "}
//       <div className="container flex justify-between items-center mx-auhref">
//         <div className="flex items-center">
//           <img className="w-12 h-12 mr-4" src={logo} alt="Logo" />{" "}
//           {/* حجم الشعار وهوامش */}
//           <ul className="flex space-x-6 text-xl text-blue-700">
//             {" "}
//             {/* مساحة بين العناصر وتغيير اللون */}
//             <li>
//               <a href="/" className="hover:text-blue-900 no-underline">
//                 من نحن؟
//               </a>
//             </li>
//             <li>
//               <a href="/services" className="hover:text-blue-900 no-underline">
//                 الخدمات
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/universities"
//                 className="hover:text-blue-900 no-underline"
//               >
//                 الجامعات المتعاونة
//               </a>
//             </li>
//             <li>
//               <a href="/reviews" className="hover:text-blue-900 no-underline">
//                 آراء
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div className="flex space-x-2">
//           <buthrefn className="btn px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
//             إنشاء حساب
//           </buthrefn>
//           <buthrefn className="btn px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
//             تسجيل دخول
//           </buthrefn>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;
