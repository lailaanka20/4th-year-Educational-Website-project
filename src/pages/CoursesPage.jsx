import { React, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Containers";
import { FaBook } from "react-icons/fa";
import courses from "../utils/CourseData";
import "../index.css";

const CoursesPage = () => {
  const [selectedYear, setSelectedYear] = useState(1);
  return (
    <Container className="h-screen flex-col justify-center items-center py-3">
      <div className="text-main-color">
        {[1, 2, 3, 4, 5].map((year, index) => (
          <button
            key={index}
            onClick={(e) => setSelectedYear(year)}
            className={`bg-blue-300 rounded-3xl text-xl px-13 py-1 mx-3
             hover:bg-orange-200 
             ${year === selectedYear && "bg-orange-200"}
             `}
          >
            السنة {year}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 grid-rows-2 gap-5 text-main-color text-[18px] mt-30">
        {courses[selectedYear]?.map((course, index) => (
          <Link to={`/courses/${course.id}`} key={index}>
            <div
              className="relative flex flex-col justify-around group w-40 h-50 bg-blue-200 text-wrap mx-3 p-5 rounded-xl
            hover:bg-blue-100
             before:absolute before:text-main-color before:border-b-1
              before:content-[''] before:w-[80%]
              before:bottom-5 before:right-4
              "
            >
              <FaBook className="text-3xl text-white group-hover:text-blue-300" />
              {course.name}
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default CoursesPage;
