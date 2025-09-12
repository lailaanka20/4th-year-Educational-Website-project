import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Container from "../components/Containers";
import Loading from "../components/Loading";

const CourseVideo = ({ playlistId }) => {
  const [loading, setLoading] = useState(true);
  const [vid, setVid] = useState([]);

  useEffect(() => {
    const fetchVids = async () => {
      setLoading(true);
      const apiKey = import.meta.env.VITE_API_KEY;
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=${playlistId}&key=${apiKey}`;

      const res = await fetch(url);
      const data = await res.json();

      const vidItems = data.items.map((item, index) => ({
        title: item.snippet.title,
        videoId: item.snippet.resourceId.videoId,
        thumbnail: item.snippet.thumbnails?.medium?.url,
      }));
      setVid(vidItems);
      setLoading(false);
    };
    fetchVids();

    //notifi
    const addNotification = async (video) => {
      try {
        await addDoc(collection(db, "notifications"), {
          videoId: video.videoId,
          title: video.title,
          courseId: video.courseId,
          timestamp: new Date().toISOString(),
          type: "video",
        });
      } catch (err) {
        console.log(err);
      }
    };
  }, [playlistId]);

  return (
    // <div className="w-full text-center">
    //   {playlistId ? (
    //     <div className="w-full border-1 rounded border-amber-200 p-10 grid grid-cols-4 grid-rows-4 gap-x-5 gap-y-10">
    //       {loading ? (
    //         <Loading />
    //       ) : (
    //         vid.map((video) => (
    //           <div key={video.videoId}>
    //             <div>
    //               <Link
    //                 to={`/Video/${video.videoId}`}
    //                 state={{ title: video.title }}
    //               >
    //                 <img
    //                   src={video.thumbnail}
    //                   alt={video.title}
    //                   className="rounded-xl cursor-pointer hover:opacity-80"
    //                 />
    //               </Link>
    //               <h2 className="m-1">{video.title}</h2>
    //             </div>
    //           </div>
    //         ))
    //       )}
    //     </div>
    //   ) : (
    //     <p className="text-3xl h-100 mt-50 font-semibold text-amber-600 ">
    //       لايوجد فيديوهات لهذه المادة حالياً
    //     </p>
    //   )}
    // </div>
    //origin

    <div className="w-full text-center">
      {playlistId ? (
        <div className="w-full border border-amber-200 rounded-lg p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <Loading className="text-2xl font-semibold text-amber-600">
              جاري تحميل الفيديوهات...
            </Loading>
          ) : (
            vid.map((video) => (
              <div key={video.videoId} className="flex flex-col items-center">
                <div>
                  <Link to={`/Video/${video.videoId}`}>
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="rounded-xl cursor-pointer hover:opacity-80 w-full h-auto"
                    />
                  </Link>
                  <h2 className="mt-2 text-sm sm:text-base font-medium text-main-color px-2 break-words">
                    {video.title}
                  </h2>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <p className="text-2xl mt-12 font-semibold text-amber-600">
          لايوجد فيديوهات لهذه المادة حالياً
        </p>
      )}
    </div>
  );
};

export default CourseVideo;
