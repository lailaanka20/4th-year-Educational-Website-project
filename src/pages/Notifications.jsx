import React, { useEffect } from "react";
import Container from "../components/Containers";
import { MdNotificationsActive } from "react-icons/md";

const Notifications = () => {
  const notifications = [
    { id: 1, message: "تمت إضافة فيديو جديد من مادة تخصصية1", time: "23s" },
    { id: 2, message: "تمت إضافة فيديو جديد من مادة بنيان", time: "1h" },
    {
      id: 3,
      message: "تمت إضافة فيديو جديد من مادة هندسة البرمجيات",
      time: "5d",
    },
  ];
  return (
    <Container className="relative h-screen items-start pt-20">
      <ul className="text-xl w-full pr-5">
        {notifications.map((note) => (
          <li className="relative flex w-full h-20 shadow-lg p-4 my-8">
            <MdNotificationsActive className="text-4xl mx-5 border-2 rounded-full w-12 h-12 p-1" />
            {note.message}
            <span className="absolute my-2 bottom-0 left-5 font-bold">
              {note.time}
            </span>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Notifications;
