import React from "react";
import img1 from "../../assets/images/uniBG.jpg";
import img2 from "../../assets/images/damas.jpg";
import img3 from "../../assets/images/homs-university-logo-1.webp";
import img4 from "../../assets/images/latakia.jpeg";
import img5 from "../../assets/images/kalamoon.jpg";
import "../../index.css";

const imagStyle = {
  width: "200px",
  borderRadius: "50%",
};

const Universities = ({ id }) => {
  return (
    <div className="universities  Pagegradient min-h-screen" id={id}>
      <img className="w-[30%] mx-auto" src={img1} alt="خلفية الجامعة" />
      <div className="container flex items-end justify-between py-15 w-[70%] mx-auto">
        <div className="uni flex flex-col justify-between items-center">
          <img style={imagStyle} src={img2} alt="جامعة دمشق" />
          <button className="bg-main-color text-white btn py-2 mt-5">
            جامعة دمشق
          </button>
        </div>
        <div className="uni flex flex-col justify-between items-center">
          <img style={imagStyle} src={img3} alt="جامعة حمص" />
          <button className="bg-main-color text-white btn py-2 mt-5">
            جامعة حمص
          </button>
        </div>
        <div className="uni flex flex-col justify-between items-center">
          <img style={imagStyle} src={img4} alt="جامعة اللاذقية" />
          <button className="bg-main-color text-white btn py-2 mt-5">
            جامعة اللاذقية
          </button>
        </div>
        <div className="uni flex flex-col justify-between items-center">
          <img style={imagStyle} src={img5} alt="جامعة القلمون" />
          <button className="bg-main-color text-white btn py-2 mt-5">
            جامعة القلمون
          </button>
        </div>
      </div>
    </div>
  );
};

export default Universities;
