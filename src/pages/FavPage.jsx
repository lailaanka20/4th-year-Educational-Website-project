import React from "react";
import Container from "../components/Containers";
import { FaHeart } from "react-icons/fa";

const FavPage = () => {
  return (
    <Container className="h-screen">
      <div className="w-full">
        <ul className="w-full">
          <li className="relative flex justify-start items-center w-full h-50 bg-gray-200 p-5">
            <img src="" alt="vid Cover" className="mx-5" />
            vidname
            <FaHeart className="absolute left-5 top-5 text-red-600" />
          </li>
        </ul>
      </div>
    </Container>
  );
};

export default FavPage;
