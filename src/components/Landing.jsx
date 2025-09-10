import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import About from "./landing/About";
import Services from "./landing/Services";
import Universities from "./landing/Universities";
import "../index.css";

const Landing = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <>
      {/* <NavBar /> */}
      <About id="about" />
      <Services id="services" />
      <Universities id="universities" />
    </>
  );
};

export default Landing;
