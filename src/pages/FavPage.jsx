import React, { useEffect, useState } from "react";
import Container from "../components/Containers";
import Loading from "../components/Loading";
import { FaHeart } from "react-icons/fa";
import { db, auth } from "../firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const FavPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleRemove = async (favId) => {
    try {
      await deleteDoc(doc(db, "favorites", favId));
      setFavorites((prev) => prev.filter((fav) => fav.id !== favId));
    } catch (err) {
      toast.error("حدث خطأ أثناء الحذف");
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, "favorites"),
        where("userId", "==", user.uid)
      );

      const snaphot = await getDocs(q);
      const favs = snaphot.docs.map((doc) => ({
        id: doc.id,
        videoId: doc.data().videoId,
        title: doc.data().title,
        time: doc.data().addedAt?.toDate().toLocaleString(),

        // ...doc.data(),
      }));

      setFavorites(favs);
      setLoading(false);
    };
    fetchFavorites();
  }, []);

  return (
    <Container className="h-fit mt-10 mr-5">
      <div className="w-full">
        {loading ? (
          <Loading text="جاري تحميل المفضلة..." />
        ) : favorites.length === 0 ? (
          <p className="text-4xl font-bold text-second-color mr-[35%] mt-[20%]">
            لا توجد مقاطع فيديو مفضلة
          </p>
        ) : (
          <ul>
            {favorites.map((fav) => (
              <li
                key={fav.id}
                className="relative flex justify-start items-end w-full h-50 bg-gray-200 p-3 my-3 rounded-xl"
              >
                <iframe
                  src={`https://www.youtube.com/embed/${fav.videoId}`}
                  frameBorder="0"
                  allowFullScreen
                  className="mx-5 w-[300px] h-[180px] rounded-xl"
                  title={fav.videoId}
                ></iframe>
                <p className="mr-5 text-2xl text-wrap w-100">{fav.title}</p>

                <button onClick={() => handleRemove(fav.id)}>
                  <FaHeart className="absolute left-5 top-5 text-red-600 text-xl" />
                  <span className="sr-only">إزالة من المفضلة</span>
                </button>

                <span className="absolute left-5 bottom-5 text-xl">
                  {fav.time}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
};

export default FavPage;
