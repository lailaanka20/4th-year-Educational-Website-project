import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  isStrongPassword,
  isValidEmail,
  isValidPhone,
} from "../utils/navigation";
import Containers from "../components/Containers";
import InfoSide from "../components/InfoSide";
import ValidateInput from "../components/ValidateInput";
import Submitbtn from "../components/Submitbtn";
import photo from "../assets/images/create-account.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    num: "",
    email: "",
    password: "",
    passwordconfirm: "",
    role: "",
  });
  const [errmessage, setErrMessage] = useState("");
  const [Loading, setLoading] = useState(false);
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (data.password != data.passwordconfirm) {
      setErrMessage("كلمة المرور وتأكيدها غير متطابقين");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: data.name,
        num: data.num,
        email: data.email,
        role: data.role,
      });
      toast.success(`أهلاً و سهلاً ${data.name} لقد تم إنشاء حسابك بنجاح!`, {
        position: "top-center",
        autoClose: 3000,
      });
      {
        data?.role === "teacher"
          ? navigate("/MainPage")
          : navigate("/ProfilePage");
      }
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setErrMessage(
          "البريد الإلكتروني مستخدم مسبقًا، يرجى تسجيل الدخول أو استخدام بريد آخر"
        );
      } else {
        setErrMessage("حدث خطأ أثناء إنشاء الحساب، يرجى المحاولة لاحقًا");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Containers className="h-screen">
      <div className="relative flex justify-center items-center flex-col w-125 h-full">
        <div className="data-header">إنشاء حساب</div>
        <InfoSide>
          <form
            action=""
            className="block absolute top-40 text-center"
            onSubmit={handleSignUp}
          >
            <div className="grid grid-cols-2 gap-4 w-full">
              {["name", "num", "email", "password", "passwordconfirm"].map(
                (field, index) => (
                  <ValidateInput
                    key={index}
                    type={
                      field.includes("password")
                        ? "password"
                        : field === "email"
                        ? "email"
                        : "text"
                    }
                    value={data[field]}
                    onChange={(val) => setData({ ...data, [field]: val })}
                    validate={
                      field === "password"
                        ? isStrongPassword
                        : field === "num"
                        ? isValidPhone
                        : field === "email"
                        ? isValidEmail
                        : ""
                    }
                    errmessage={
                      field === "email"
                        ? "البريد الإلكتروني غير صالح"
                        : field === "password"
                        ? "كلمة المرور ضعيفة"
                        : field === "num"
                        ? "الرجاء إدخال رقم هاتف صحيح"
                        : field === "passwordconfirm"
                        ? "كلمة المرور و تأكيدها غير متطابقتين"
                        : ""
                    }
                    placeholder={
                      field === "name"
                        ? "الاسم"
                        : field === "num"
                        ? "رقم الهاتف"
                        : field === "email"
                        ? "البريد الإلكتروني"
                        : field === "password"
                        ? "كلمة المرور"
                        : " تأكيد كلمة المرور"
                    }
                    // className={
                    //   field === "passwordconfirm" ? "w-full mr-35" : ""
                    // }
                  />
                )
              )}

              {errmessage && (
                <p className="text-red-500 text-sm mt-4 text-center col-span-2">
                  {errmessage}
                </p>
              )}
              <select
                value={data.role}
                onChange={(e) => setData({ ...data, role: e.target.value })}
                className="input input-x my-1 "
              >
                <option value="">اختر دورك</option>
                <option value="student">طالب</option>
                <option value="teacher">أستاذ</option>
              </select>
            </div>
            <Submitbtn>
              {Loading ? <ClipLoader size={30} color="white" /> : "إرسال"}
            </Submitbtn>
          </form>
        </InfoSide>
      </div>
      <img src={photo} className="img" alt="Loading" />
      {/* </div> */}
    </Containers>
  );
};

export default SignUp;
