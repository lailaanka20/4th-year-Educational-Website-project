import React, { useState } from "react";
import { db, auth } from "../firebase/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import Container from "../components/Containers";
import ValidateInput from "../components/ValidateInput";
import photo from "../assets/images/exam.jpg";

const UploadExam = () => {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();

  const handleUpload = async () => {
    const user = auth.currentUser;
    if (!user) return;
    if (!link || !title) {
      toast.error("يرجى إرفاق ملف أو إدخال رابط");
      return;
    }
    setIsUploading(true);

    try {
      await addDoc(collection(db, "exams"), {
        title,
        url: link,
        uploadedBy: user.uid,
        createdAt: Timestamp.now(),
      });

      navigate("/ProfessorDashboard");
    } catch (error) {
      toast.error("حدث خطأ أثناء الرفع. حاول مرة أخرى.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Container className="flex justify- between m-20 border-1 rounded border-amber-200">
      <div>
        <h2 className="text-3xl mb-20 text-main-color ">رفع اختبار جديد</h2>
        <p className="text-xl mb-5">أدخل عنوان الاختبار:</p>

        <ValidateInput
          label="عنوان الاختبار"
          type="text"
          value={title}
          onChange={(val) => setTitle(val)}
          placeholder="عنوان الاختبار"
          className="my-5"
        />
        <p className="text-xl mb-5">أدخل رابط الاختبار:</p>

        <ValidateInput
          label=" رابط الاختبار"
          type="text"
          value={link}
          onChange={(val) => setLink(val)}
          placeholder="رابط الاختبار"
          className="my-5"
        />
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="bg-main-color btn w-30"
        >
          {isUploading ? (
            <ClipLoader size={20} color="white" className="align-middle" />
          ) : (
            "رفع"
          )}
        </button>
      </div>

      <div>
        <img src={photo} alt="Loading.." />
      </div>
    </Container>
  );
};

export default UploadExam;
