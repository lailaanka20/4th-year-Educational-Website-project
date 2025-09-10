import React from "react";
import "../index.css";

const Submitbtn = ({ children, ...props }) => {
  return (
    <button
      type="submit"
      className="bg-main-color text-white text-[25px] my-5 w-100
      py-3 rounded-[8px] hover:text-3xl transition-all"
      {...props}
    >
      {children}
    </button>
  );
};
export default Submitbtn;
