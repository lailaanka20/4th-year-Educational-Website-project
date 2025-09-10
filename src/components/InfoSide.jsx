import React from "react";

const InfoSide = ({ children }) => {
  return (
    <div className="relative flex justify-start items-center flex-col w-125 h-full">
      {children}
    </div>
  );
};

export default InfoSide;
