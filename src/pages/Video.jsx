import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { db, auth } from "../firebase/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import Container from "../components/Containers";
import Loading from "../components/Loading";
import { BsArrowReturnLeft } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const Video = () => {
  const { videoId } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [favLoading, setFavLoading] = useState(false);

  const location = useLocation();
  const videoTitle = location.state?.title || "عنوان غير معروف";

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [videoId]);

  const handleAddToFav = async () => {
    const user = auth.currentUser;
    if (!user) return;
    setFavLoading(true);

    try {
      await addDoc(collection(db, "favorites"), {
        userId: user.uid,
        videoId,
        title: videoTitle,
        addedAt: Timestamp.now(),
      });
      toast.success("تمت الإضافة إلى المفضلة");
    } catch (err) {
      toast.error("حدث خطأ أثناء الإضافة للمفضلة.");
    } finally {
      setFavLoading(false);
    }
  };

  return (
    <Container className="h-screen relative">
      <div className="w-[80%] h-fit">
        {loading ? (
          <Loading text="جاري تحميل الفيديو..." />
        ) : (
          <>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              frameBorder="0"
              allowFullScreen
              className="w-full h-[500px] rounded-xl"
            ></iframe>
            <button
              onClick={handleAddToFav}
              disabled={favLoading}
              className="flex items-center border-1 rounded-xl
                px-4 py-2 my-2 text-red-600"
            >
              <FaHeart className="text-4xl ml-3" />
              {favLoading ? (
                <ClipLoader size={20} color="text-red-600" />
              ) : (
                "إضافة إلى المفضلة"
              )}
            </button>
          </>
        )}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 h-[50px] text-xl items-center justify-between flex cursor-pointer"
        >
          رجوع
          <BsArrowReturnLeft className="border-1 rounded-full p-1 mr-2 mt-2 w-[30px] h-[30px]" />
        </button>
      </div>
    </Container>
  );
};
export default Video;
