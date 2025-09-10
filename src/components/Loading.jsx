import React from "react";
import { ClipLoader } from "react-spinners";

const Loading = ({ text = "جاري التحميل...", className = "" }) => (
  <div
    className={`h-screen flex justify-center items-center w-full py-20 text-main-color ${className}`}
  >
    <ClipLoader size={50} color="text-main-color" />
    <span className="mx-4 text-xl">{text}</span>
  </div>
);

export default Loading;
