import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { db, auth, googleProvider } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { isValidEmail } from "../utils/navigation";
import Container from "../components/Containers";
import InfoSide from "../components/InfoSide";
import Submitbtn from "../components/Submitbtn";
import ValidateInput from "../components/ValidateInput";
import photo from "../assets/images/login.png";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const LogInPage = () => {
  const navigate = useNavigate();
  const [errmessage, setErrMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogIn = async (e) => {
    localStorage.clear();
    e.preventDefault();

    setErrMessage(null);
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();

        const welcomeMessage =
          userData.role === "teacher"
            ? `🧑‍🏫 أهلاً بعودتك، أستاذ ${userData.name}!`
            : `🎓 أهلاً بك ${userData.name}، هيا نبدأ رحلتك التعليمية!`;

        localStorage.setItem("welcomeMessage", welcomeMessage);

        setTimeout(() => {
          navigate(userData.role === "teacher" ? "/MainPage" : "/ProfilePage");
        }, 1000);
      } else {
        setErrMessage("لم يتم العثور على بيانات المستخدم");
      }
    } catch (error) {
      // setErrMessage(
      //   "فشل تسجيل الدخول !  تحقق من البريد الإلكتروني و كلمة السر"
      // );

      console.error("Login error:", error.code, error.message);
      switch (error.code) {
        case "auth/user-not-found":
          setErrMessage("المستخدم غير موجود");
          break;
        case "auth/wrong-password":
          setErrMessage("كلمة المرور غير صحيحة");
          break;
        case "auth/invalid-email":
          setErrMessage("البريد الإلكتروني غير صالح");
          break;
        default:
          setErrMessage("حدث خطأ أثناء تسجيل الدخول");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async (e) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        await setDoc(userDocRef, {
          name: user.displayName || "",
          email: user.email,
          role: user.role || "student",
          createdAt: new Date(),
        });
      }
      navigate("/ProfilePage");

      toast.success("أهلاً بعودتك, هيا لندرس معاً", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      setErrMessage("فشل تسجيل الدخول عبر غوغل");
    } finally {
    }
  };
  return (
    <Container className="h-screen">
      <InfoSide>
        <div className="data-header">تسجيل الدخول</div>
        <div className="box relative flex items-center justify-center mt-20 mb-10 section-padding">
          <div className="btn p-5 ml-5">
            <button
              onClick={handleGoogleSignIn}
              className="no-underline text-white "
            >
              عن طريق غوغل
            </button>
          </div>
        </div>
        <div className="mr-10">
          <form action="" className="block" onSubmit={handleLogIn}>
            <div>
              <ValidateInput
                label="البريد الإلكتروني"
                type="email"
                value={data.email}
                onChange={(val) => setData((prev) => ({ ...prev, email: val }))}
                validate={isValidEmail}
                errmessage="يرجى إدخال بريد إلكتروني صالح"
                placeholder="البريد الإلكتروني"
                className="w-f"
              />
              <ValidateInput
                label="كلمة السر"
                type="password"
                value={data.password}
                onChange={(val) =>
                  setData((prev) => ({ ...prev, password: val }))
                }
                validate={(val) => val.length > 0}
                errmessage="يرجى إدخال كلمة المرور"
                placeholder="كلمة المرور"
                className="w-f"
              />
            </div>
            {errmessage && (
              <div className="text-red-500 text-sm">
                <p>{errmessage}</p>
              </div>
            )}
            <label id="my-password" className="block mt-3">
              هل نسيت كلمة المرور؟
              <Link to="/ForgotPasswordPage" className="text-second-color pr-3">
                انقر هنا
              </Link>
            </label>
            <Submitbtn>
              {loading ? (
                <ClipLoader size={30} color="white" />
              ) : (
                "تسجيل الدخول"
              )}
            </Submitbtn>

            <label className="block mt-5">
              أول مرة على موقعنا؟
              <Link to="/SignUp" className="text-second-color pr-3">
                انشئ حسابك الان
              </Link>
            </label>
          </form>
        </div>
      </InfoSide>
      <img src={photo} className="img" alt="NotFound" />
    </Container>
  );
};

export default LogInPage;
