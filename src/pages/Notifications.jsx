import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Container from "../components/Containers";
import { MdNotificationsActive } from "react-icons/md";
import Loading from "../components/Loading";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, "notifications"),
        where("forRole", "==", "student")
      );
      const snaphot = await getDocs(q);
      const notes = snaphot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotifications(notes);
      setLoading(false);
    };
    fetchNotifications();
  }, []);

  return (
    <Container className="relative h-screen items-start pt-20">
      <ul className="text-xl w-full pr-5">
        {loading ? (
          <Loading />
        ) : notifications.length === 0 ? (
          <p className="text-4xl font-bold text-second-color mr-[35%] mt-[20%]">
            لايوجد إشعارات حالياً
          </p>
        ) : (
          notifications.map((note) => (
            <li className="relative flex w-full h-20 shadow-lg p-4 my-8">
              <MdNotificationsActive className="text-4xl mx-5 border-2 rounded-full w-12 h-12 p-1" />
              {note.message}
              <span className="absolute my-2 bottom-0 left-5 font-bold">
                {note.time?.toDate().toLocaleString()}
              </span>
            </li>
          ))
        )}
      </ul>
    </Container>
  );
};

export default Notifications;
