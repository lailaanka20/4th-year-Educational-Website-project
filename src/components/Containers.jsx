import React from "react";
import "../index.css";

const Containers = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`flex justify-between items-center mx-auto px-4 sm:px-6 lg:px-25
      ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Containers;
