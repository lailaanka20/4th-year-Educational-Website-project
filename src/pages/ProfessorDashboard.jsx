import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { db, auth } from "../firebase/firebase";
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import Container from "../components/Containers";
import Loading from "../components/Loading";
import { FaRegFilePdf } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";

const ProfessorDashboard = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      const user = auth.currentUser;
      if (!user) return;
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
        }

        const q = query(
          collection(db, "exams"),
          where("uploadedBy", "==", user.uid)
        );

        const snaphot = await getDocs(q);
        const examsList = snaphot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setExams(examsList);
      } catch (error) {
        setExams([]);
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, []);
  if (loading) return <Loading>جاري تحميل البيانات</Loading>;

  return (
    <Container className="flex-col items-start justify-between p-10 h-[100vh]">
      <div className="w-full border-1 rounded border-amber-200 px-10 py-20">
        <h2 className="w-50 text-center rounded-xl mb-100 mr-30 text-2xl text-purple-900 shadow-xl py-2">
          مرحبا {userName}
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

            {loading ? (
              <ClipLoader />
            ) : exams.length === 0 ? (
              "لا يوجد اختبارات مرفوعة حتى الآن"
            ) : (
              <ul>
                {exams.map((exam) => (
                  <li
                    key={exam.id}
                    className="mb-5 text-xl text-main-color hover:underline"
                  >
                    <a
                      href={exam.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="hover:text-purple-900 hover:no-underline"
                    >
                      اضغط هنا
                      <span className="text-second-color font-bold mx-1">
                        {exam.title}
                      </span>
                      لعرض الاختبار
                    </a>
                    <p>
                      تم الرفع في: {exam.createdAt.toDate().toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProfessorDashboard;
