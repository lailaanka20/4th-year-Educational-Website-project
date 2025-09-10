import { React, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../index.css";

const NavBarOptions = ({ options, children }) => {
  const [activeitem, setActiveitem] = useState("");
  const location = useLocation();
  return (
    <>
      {options.map((option, index) => (
        <li
          key={index}
          onClick={() => setActiveitem(option.path)}
          className={`cursor-pointer w-30 ml-15 text-center p-1 
        transition-all duration-100
        ${
          location.pathname === option.path
            ? "  bg-second-color rounded-2xl text-2xl"
            : "  hover:bg-second-color hover:rounded-2xl hover:text-2xl"
        }
     `}
        >
          <Link to={option.path}>
            {option.label} {children}
          </Link>
        </li>
      ))}
    </>
  );
};

export default NavBarOptions;
