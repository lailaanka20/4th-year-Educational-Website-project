import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomepageContainer from "./HomepageContainers";
import NavBarOption from "./NavBarOptions";
import logo from "../assets/images/logo.png";
import profile from "../assets/images/profile.jpg";

const NavBarUser = () => {
  const navoptions = [
    { label: "الرئيسية", path: "/MainPage" },
    { label: "المواد", path: "/CoursesPage" },
    { label: "الإشعارات", path: "/Notifications" },
    { label: "المفضلة", path: "/FavPage" },
  ];
  return (
    <nav className="w-full z-2 my-5 h-[50px]">
      <HomepageContainer className="relative py-0 mx-auto px-4 sm:px-6 lg:px-20">
        <img className="w-[65px]" src={logo} alt="not found"></img>

        <div className="flex border-1 border-gray-300 rounded w-[90%] pr-3">
          <ul className="flex justify-between items-center text-[22px] text-main-color w-[90%]">
            <NavBarOption options={navoptions}></NavBarOption>
          </ul>
          <div className="login">
            <div className="rounded-full p-[2px] ml-1">
              <Link to="/ProfilePage">
                <img src={profile} className="w-20 h-20" alt="noProfilePhoto" />
              </Link>
            </div>
          </div>
        </div>
      </HomepageContainer>
    </nav>
  );
};

export default NavBarUser;
