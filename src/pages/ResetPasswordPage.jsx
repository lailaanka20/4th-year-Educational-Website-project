import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { toast } from "react-toastify";
import { isStrongPassword } from "../utils/navigation";
import Submitbtn from "../components/Submitbtn";
import photo from "../assets/images/ResetPassword.png";
import Containers from "../components/Containers";
import InfoSide from "../components/InfoSide";
import ValidateInput from "../components/ValidateInput";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    password: "",
    passwordconfirm: "",
  });
  const confirmPass = (val) => {
    return val === data.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isStrongPassword(data.password)) {
      toast.error("كلمة المرور غير قوية بما يكفي");
      return;
    }
    if (data.password !== data.passwordconfirm) {
      toast.error("كلمة المرور و تاكيدها غير متطابفين");
      return;
    }
    try {
      const user = auth.currentUser;
      await updatePassword(user, data.password);
      toast.success("تم تغيير كلمة المرور بنجاح");
      navigate("/logInPage");
    } catch (err) {
      toast.error("حدث خطأ أثناء تعيين كلمة المرور");
    }
  };
  return (
    <Containers className="h-screen">
      <InfoSide>
        <div className="data-header"> إعادة تعيين كلمة المرور</div>
        <form
          action=""
          className="block absolute top-40 mr-15"
          onSubmit={handleSubmit}
        >
          <label htmlFor="new" className="block font-bold text-xl mb-2">
            أدخل كلمة المرور الجديدة
          </label>
          <ValidateInput
            type="password"
            value={data.password}
            onChange={(val) => setData({ ...data, password: val })}
            validate={isStrongPassword}
            errmessage="يجب أن تكون كلمة المرور من 8 محارف و تحوي على أحرف كبيرة و صغيرة وأرقام"
            placeholder="كلمة المرور"
            required
            className="w-f"
          />
          <ValidateInput
            type="password"
            value={data.passwordconfirm}
            onChange={(val) => setData({ ...data, passwordconfirm: val })}
            validate={confirmPass}
            errmessage="كلمة المرور وتأكيدها غير متطابقين"
            placeholder="تأكيد كلمة المرور"
            required
            className="w-f"
          />

          <Submitbtn>تم</Submitbtn>
        </form>
      </InfoSide>
      <img src={photo} className="img" alt="reset-password" />
    </Containers>
  );
};

export default ResetPasswordPage;
