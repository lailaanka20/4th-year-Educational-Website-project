import React from "react";
import { useParams } from "react-router-dom";
import Container from "../components/Containers";
import CourseVideo from "./CourseVideo";
import courses from "../utils/CourseData";

const CoursePage = () => {
  const { courseId } = useParams();

  function getPlayListId(courseId) {
    for (const year in courses) {
      const course = courses[year].find((c) => c.id === courseId);
      if (course && course.playlistID) {
        return course.playlistID;
      }
    }
  }

  const playList = getPlayListId(courseId);

  return (
    <Container className="h-fit pt-10">
      <CourseVideo playlistId={playList}></CourseVideo>
    </Container>
  );
};

export default CoursePage;
