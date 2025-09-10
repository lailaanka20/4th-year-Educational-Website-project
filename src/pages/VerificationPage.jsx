import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import Submitbtn from "../components/Submitbtn";
import Containers from "../components/Containers";
import InfoSide from "../components/InfoSide";
import { toast } from "react-toastify";
import photo from "../assets/images/Authentication.png";

const VerificationPage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", ""]);

  const handleCodeComplite = async (e, codeArray, navigateTo, navigate) => {
    e.preventDefault();
    const isComplite = codeArray.every((digit) => digit.trim() !== "");
    if (!isComplite) {
      toast.error("يرجى إدخال الرمز الكامل");
      return;
    }
    const code = codeArray.join("");
    try {
      const result = await window.confirmationResult.confirm(code);
      const user = result.user;
      toast.success("تم التحقق بنجاح!");
      navigate(navigateTo);
    } catch (err) {
      toast.error("الرمز غير صحيح");
    }
  };

  return (
    <Containers className="h-screen">
      <InfoSide>
        <div className="data-header">التحقق من الحساب</div>
        <form action="" className="block absolute top-50 text-center">
          <label className="block font-bold text-xl mb-10">ادخل الرمز</label>
          <div className="code mb-10">
            {code.map((digit, index) => (
              <input
                inputMode="numeric"
                pattern="\d*"
                id={`code-${index}`}
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d?$/.test(val)) {
                    const newCode = [...code];
                    newCode[index] = e.target.value;
                    setCode(newCode);

                    if (val && index < code.length - 1) {
                      const nextInput = document.getElementById(
                        `code-${index + 1}`
                      );
                      nextInput?.focus();
                    }
                  }
                }}
                placeholder="0"
                className="input py-5 px-3 m-5 w-[70px] h-[50px] text-center font-bold"
              />
            ))}
          </div>
          <Submitbtn
            onClick={(e) =>
              handleCodeComplite(e, code, "/ResetPasswordPage", navigate)
            }
          >
            إرسال
          </Submitbtn>
        </form>
      </InfoSide>{" "}
      <img src={photo} className="img" alt="typing code" />
    </Containers>
  );
};
export default VerificationPage;
