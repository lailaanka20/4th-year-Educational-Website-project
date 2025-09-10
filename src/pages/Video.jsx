import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsArrowReturnLeft } from "react-icons/bs";
import Container from "../components/Containers";
import Loading from "../components/Loading";

const Video = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [videoId]);
  return (
    <Container className="h-screen relative">
      <div className="w-[80%] h-fit">
        {loading ? (
          <Loading className="px-40 py-20 text-2xl font-semibold text-amber-600">
            جاري تحميل الفيديو...
          </Loading>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allowFullScreen
            className="w-full h-[500px] rounded-xl"
          ></iframe>
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
