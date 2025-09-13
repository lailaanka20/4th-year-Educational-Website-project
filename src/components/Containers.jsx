import React from "react";
import "../index.css";

const Containers = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`flex justify-between items-center w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8
      ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Containers;
