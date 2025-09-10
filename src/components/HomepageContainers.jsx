import React from "react";
import Containers from "./Containers";
import "../index.css";
// import { DiVim } from "react-icons/di";

const HomepageContainers = ({ children, className = "", ...props }) => {
  return <Containers className={`${className}`}>{children}</Containers>;
};

export default HomepageContainers;
