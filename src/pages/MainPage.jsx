import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import Container from "../components/Containers";
import Submitbtn from "../components/Submitbtn";
import { toast } from "react-toastify";
import photo from "../assets/images/mainpage.jpg";

const MainPage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const uid = auth.currentUser.uid;
      if (!uid) return;

      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const message = localStorage.getItem("welcomeMessage");
    if (message) {
      toast.success(message, {
        position: "top-center",
        autoClose: 3000,
      });
      localStorage.removeItem("welcomeMessage");
    }
  }, []);

  return (
    <Container className="h-screen px-50">
      <div className="flex flex-col flex-wrap w-125">
        <span className="text-gray-500 mb-5 text-xl">لنبدأ بكورسك المفضل</span>
        <p className="font-bold text-2xl my-2">
          الآن تعلم أينما كنت واكتسب المعرفة لاجتياز امتحاناتك
          <span className="text-gray-500 mr-1">بامتياز و تفوق </span>
        </p>
        <p className="mt-3 text-xl">
          إنه ليس فقط للمحاضرات, موقعنا يقدم لك فيديوهات و شروحات و اختبارات لأي
          مادة تريد ولجميع السنوات الجامعية
        </p>

        {userData === null ? (
          <span className="text-gray-400">جاري تحميل...</span>
        ) : userData.role === "teacher" ? (
          <button className="btn px-5 py-5 w-50 text-xl my-7 hover:text-2xl transition-all">
            <Link to="/ProfessorDashboard">لوحة الأستاذ</Link>
          </button>
        ) : (
          <button className="btn px-5 py-5 w-50 text-xl my-7 hover:text-2xl transition-all">
            <Link to="/CoursesPage">لنتعلم معاً</Link>
          </button>
        )}
      </div>
      <div>
        <img
          src={photo}
          alt="Loading"
          className="border-15 border-blue-800 rounded-full p-3"
        />
      </div>
    </Container>
  );
};

export default MainPage;
