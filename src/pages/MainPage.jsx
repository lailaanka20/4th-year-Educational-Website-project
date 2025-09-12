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
    <Container className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-10 px-4 py-10">
      {/* النصوص وزر التنقل */}
      <div className="w-full max-w-xl text-center lg:text-start">
        <span className="text-gray-500 mb-5 text-xl block">
          لنبدأ بكورسك المفضل
        </span>
        <p className="font-bold text-2xl my-2 leading-relaxed">
          الآن تعلم أينما كنت واكتسب المعرفة لاجتياز امتحاناتك
          <span className="text-gray-500 mr-1">بامتياز و تفوق </span>
        </p>
        <p className="mt-3 text-xl leading-relaxed">
          إنه ليس فقط للمحاضرات، موقعنا يقدم لك فيديوهات و شروحات و اختبارات لأي
          مادة تريد ولجميع السنوات الجامعية
        </p>

        <button className="btn w-40 py-3 text-xl my-7 rounded-lg hover:text-2xl transition-all duration-200">
          <Link to="/CoursesPage">لنتعلم معاً</Link>
        </button>
      </div>

      <div className="w-full max-w-md">
        <img
          src={photo}
          alt="Loading"
          className="w-full h-auto border-8 border-blue-800 rounded-full p-3 shadow-md"
        />
      </div>
    </Container>

    //origin
    // <Container className="h-screen px-50">
    //   <div className="flex flex-col flex-wrap w-125">
    //     <span className="text-gray-500 mb-5 text-xl">لنبدأ بكورسك المفضل</span>
    //     <p className="font-bold text-2xl my-2">
    //       الآن تعلم أينما كنت واكتسب المعرفة لاجتياز امتحاناتك
    //       <span className="text-gray-500 mr-1">بامتياز و تفوق </span>
    //     </p>
    //     <p className="mt-3 text-xl">
    //       إنه ليس فقط للمحاضرات, موقعنا يقدم لك فيديوهات و شروحات و اختبارات لأي
    //       مادة تريد ولجميع السنوات الجامعية
    //     </p>

    //     {userData === null ? (
    //       <span className="text-gray-400">جاري تحميل...</span>
    //     ) : userData.role === "teacher" ? (
    //       <button className="btn px-5 py-5 w-50 text-xl my-7 hover:text-2xl transition-all">
    //         <Link to="/ProfessorDashboard">لوحة الأستاذ</Link>
    //       </button>
    //     ) : (
    //       <button className="btn px-5 py-5 w-50 text-xl my-7 hover:text-2xl transition-all">
    //         <Link to="/CoursesPage">لنتعلم معاً</Link>
    //       </button>
    //     )}
    //   </div>
    //   <div>
    //     <img
    //       src={photo}
    //       alt="Loading"
    //       className="border-15 border-blue-800 rounded-full p-3"
    //     />
    //   </div>
    // </Container>
  );
};

export default MainPage;
