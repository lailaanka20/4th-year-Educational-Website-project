import { useState, useEffect } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import ProtectedRoute from "./components/ProtectRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import viteLogo from "/vite.svg";
import Mainlayout from "./layout/Mainlayout";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import VerificationPage from "./pages/VerificationPage";
import MainPage from "./pages/MainPage";
import CoursesPage from "./pages/CoursesPage";
import CoursePage from "./pages/CoursePage";
import Video from "./pages/Video";
import Notifications from "./pages/Notifications";
import FavPage from "./pages/FavPage";
import ProfessorDashboard from "./pages/ProfessorDashboard";
import UploadExam from "./pages/UploadExam";
import ProfilePage from "./pages/ProfilePage";
import Loading from "./components/Loading";

const App = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setUserData(null);
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <Loading>جاري التحميل ...</Loading>;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Mainlayout />}>
        <Route
          path="/"
          element={user ? <Navigate to="/MainPage" replace /> : <HomePage />}
        />

        <Route path="/LogInPage" element={<LogInPage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/ForgotPasswordPage" element={<ForgotPassword />} />
        <Route path="/ResetPasswordPage" element={<ResetPasswordPage />} />
        <Route path="/VerificationPage" element={<VerificationPage />} />
        <Route
          path="/MainPage"
          element={
            <ProtectedRoute user={user}>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Notifications"
          element={
            <ProtectedRoute user={user}>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/FavPage"
          element={
            <ProtectedRoute user={user}>
              <FavPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ProfilePage"
          element={
            <ProtectedRoute user={user}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ProfessorDashboard"
          element={
            <ProtectedRoute user={user} allowedRole="teacher">
              <ProfessorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/UploadExam"
          element={
            <RoleProtectedRoute userData={userData} allowedRole="teacher">
              <UploadExam />
            </RoleProtectedRoute>
          }
        />

        <Route path="/CoursesPage" element={<CoursesPage />} />
        <Route path="/courses/:courseId" element={<CoursePage />} />
        <Route path="/video/:videoId" element={<Video />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
