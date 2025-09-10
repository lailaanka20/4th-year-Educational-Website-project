import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth } from "../firebase/firebase";
import Container from "../components/Containers";
import Loading from "../components/Loading";
import { FaRegFilePdf } from "react-icons/fa6";

const ProfessorDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    const user = auth.currentUser;
    if (!user) {
      toast.error("يرجى تسجيل الدخول أولاً");
      navigate("/logInPage");
      return;
    }

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      if (userData.role !== "teacher") {
        toast.error("غير مسموح لك بالوصول إلى هذه الصفحة عزيزي الطالب");
      } else {
        setUserData(userData);
      }
    } else {
      navigate("logInPage");
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <Loading>جاري تحميل البيانات</Loading>;

  return (
    <Container className="flex-col items-start justify-between p-10 h-[100vh]">
      <div className="w-full border-1 rounded border-amber-200 px-10 py-20">
        <h2 className="w-50 text-center rounded-xl mb-100 mr-30 text-2xl text-purple-900 shadow-xl py-2">
          مرحبا {userData?.name}
        </h2>

        <div className="flex w-full justify-between px-40">
          <div className="w-50 h-60 border-2 rounded-xl border-amber-200 p-10 text-center">
            <button className="flex flex-col text-main-color hover:underline">
              <Link to="/UploadExam">
                <FaRegFilePdf size={100} className="block mb-2" />
                <p>يمكنك رفع الاختبارات هنا</p>
              </Link>
            </button>
          </div>
          <div className="h-fit border-r-1 p-10">
            <h3 className="font-bold text-main-color mb-10 -mt-10 text-xl">
              الاختبارات المرفوعة
            </h3>

            <div>
              <ul>
                <li className="flex justify-between items-center bg-white p-3 rounded shadow">
                  <h3> اختبار الوحدة الأولى</h3>
                  <a
                    href="https://example.com/exam.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-second-color decoration-0"
                  >
                    تحميل
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProfessorDashboard;
