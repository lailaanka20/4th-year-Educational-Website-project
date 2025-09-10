import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { signInWithPhoneNumber } from "firebase/auth";
// import { RecaptchaVerifier } from "firebase/auth";
// import { auth } from "../firebase/firebase";
import Containers from "../components/Containers";
import InfoSide from "../components/InfoSide";
import ValidateInput from "../components/ValidateInput";
import Submitbtn from "../components/Submitbtn";
import { isValidPhone } from "../utils/navigation";
import { toast } from "react-toastify";
import photo from "../assets/images/ForgotPassword.png";
import { ClipLoader } from "react-spinners";
import { auth } from "../firebase/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    num: "",
  });
  const [loading, setLoading] = useState(false);
  //

  useEffect(() => {
    const initRecaptcha = async () => {
      try {
        if (!window.recaptchaVerifier) {
          const container = document.getElementById("recaptcha-container");
          if (!container) {
            console.warn("عنصر reCAPTCHA غير موجود في DOM");
            return;
          }

          window.recaptchaVerifier = new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {
              size: "invisible",
              callback: () => {},
            }
          );

          await window.recaptchaVerifier.render();
        }
      } catch (err) {
        console.error("reCAPTCHA init error:", err);
        toast.error("تعذر تحميل reCAPTCHA، يرجى إعادة المحاولة لاحقًا");
      }
    };
    initRecaptcha();

    return () => {
      if (window.recaptchaVerifier?.clear) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  //

  // useEffect(() => {
  //   const initRecaptcha = async () => {
  //     try {
  //       await auth._initializationPromise; // تأكد من اكتمال التهيئة

  //       if (typeof window !== "undefined" && typeof document !== "undefined") {
  //         window.recaptchaVerifier = new RecaptchaVerifier(
  //           "recaptcha-container",
  //           {
  //             size: "invisible",
  //             callback: () => {},
  //           },
  //           auth
  //         );
  //         await window.recaptchaVerifier.render();
  //       }
  //     } catch (err) {
  //       console.error("reCAPTCHA init error:", err);
  //       toast.error("تعذر تحميل reCAPTCHA، يرجى إعادة المحاولة لاحقًا");
  //     }
  //   };

  //   initRecaptcha();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isValidPhone(data.num)) {
      toast.error("يرجى إدخال رقم هاتف صالح");
      return;
    }
    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        data.num,
        appVerifier
      );
      window.confirmationResult = confirmationResult;

      toast.success("تم إرسال رمز التحقق عبر SMS");
      navigate("/VerificationPage");
    } catch (err) {
      toast.error("حدث خطأ يرجى إعادة المحاولة");
    }
    setLoading(false);
  };
  return (
    <Containers className="h-screen">
      <InfoSide>
        <div className="data-header"> التحقق من الحساب</div>
        <form action="" className="block mt-70 w-100" onSubmit={handleSubmit}>
          <label htmlFor="mail" className="block font-bold text-xl pl-18 mb-3">
            هل نسيت كلمة المرور ؟
          </label>
          <ValidateInput
            lable="رقم الهاتف"
            type="text"
            value={data.num}
            onChange={(val) => setData({ ...data, num: val })}
            validate={isValidPhone}
            errmessage="يرجى إدخال رقم هاتف صالح"
            placeholder="رقم الهاتف"
            required
            className="w-f"
          />
          <div id="recaptcha-container"></div>

          <Submitbtn>
            {loading ? <ClipLoader color="whit" size={30} /> : " إرسال"}
          </Submitbtn>
        </form>
      </InfoSide>{" "}
      <img src={photo} className="img" alt="password" />
    </Containers>
  );
};

export default ForgotPassword;
