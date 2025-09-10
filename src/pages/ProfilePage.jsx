import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import ValidateInput from "../components/ValidateInput";
import Submitbtn from "../components/Submitbtn";
import Container from "../components/Containers";
import ProfilePageBTN from "../components/ProfilePageBTN";
import Loading from "../components/Loading";
import profile from "../assets/images/profile.jpg";
import { isValidPhone } from "../utils/navigation";
import { isValidEmail } from "../utils/navigation";
import { IoMdContacts } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { FaEdit } from "react-icons/fa";

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState("edit");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    name: "",
    num: "",
    email: "",
    year: "",
    major: "",
  });

  //ChangePass
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [passErr, setPassErr] = useState();
  const [changing, setChanging] = useState(false);

  const handleChangePassWord = async (e) => {
    e.preventDefault();
    setPassErr("");
    if (newPassword != confirmPassword) {
      setPassErr("كلمة المرور و تأكيدها غير متطابقين");
      return;
    }
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, oldPassword);

    try {
      setChanging(true);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      toast.success("تم تغيير كلمة المرور بنجاح");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPassErr("حدث خطأ , تأكد من أنك مسجل دخول مؤخراً");
    } finally {
      setChanging(false);
    }
  };
  //EditProfile
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const currentUser = auth.currentUser;
    if (currentUser) {
      const docRef = doc(db, "users", currentUser.uid);
      await setDoc(docRef, data, { merge: true });
      // setData(data);

      toast.success("تم حفظ التعديلات");
    }
    setSaving(false);
  };

  //fetchUserData
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/LogInPage");
        return;
      } else {
        const fetchUserData = async (uid) => {
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setData(docSnap.data());
          } else {
            toast.error("لم يكتمل التحميل");
            setData({ name: "", num: "", email: "", year: "", major: "" });
          }
          setLoading(false);
        };
        fetchUserData(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  //welcoming
  useEffect(() => {
    const message = localStorage.getItem("welcomeMessage");
    if (message) {
      toast.success(message, {
        position: "top-center",
        autoClose: 3000,
      });
      localStorage.removeItem("welcomeMessage");
    }
  }, []);

  //logOut
  const navigate = useNavigate();
  const [err, setErr] = useState("");

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
      toast.success("تم تسجيل الخروج بنجاح");
    } catch (err) {
      setErr("حدث خطأ اثناء تسجيل الخروج, يرجى المحاولة لاحقاً");
    }
  };
  return (
    <Container className="h-screen">
      <div className="userInofo flex flex-col justify-between items-baseline w-[70%]">
        <div className=" w-[60%]">
          <div className="w-100">
            {activeSection === "edit" &&
              (loading ? (
                <Loading className="text-2xl font-semibold text-amber-600">
                  <ClipLoader size={50} className="mr-30" />
                </Loading>
              ) : (
                <>
                  {["name", "num", "email", "year", "major"].map(
                    (field, index) => (
                      <form>
                        <div className="flex justify-between items-center ">
                          <label>
                            {field === "name"
                              ? "الاسم"
                              : field === "num"
                              ? "رقم الهاتف"
                              : field === "email"
                              ? "البريد الإلكتروني"
                              : field === "year"
                              ? "السنة الجامعية"
                              : "الاختصاص"}
                          </label>
                          {field === "year" ? (
                            <select
                              key={field}
                              value={data.year}
                              onChange={(e) =>
                                setData({ ...data, year: e.target.value })
                              }
                              className="input input-x my-1 w-65 mb-5"
                            >
                              <option value="one">الأولى</option>
                              <option value="two">الثانية</option>
                              <option value="three">الثالثة</option>
                              <option value="four">الرابعة</option>
                              <option value="five">الخامسة</option>
                            </select>
                          ) : field === "major" ? (
                            <select
                              key={field}
                              value={data.major}
                              onChange={(e) =>
                                setData({ ...data, major: e.target.value })
                              }
                              className="input input-x my-7 w-65 mb-5"
                            >
                              <option value="AI">ذكاء صنعي</option>
                              <option value="SE">هندسة برمجيات</option>
                              <option value="NE">هندسة شبكات</option>
                            </select>
                          ) : (
                            <ValidateInput
                              key={field}
                              type="text"
                              value={
                                field === "name"
                                  ? data.name
                                  : field === "num"
                                  ? data.num
                                  : field === "email"
                                  ? data.email
                                  : ""
                              }
                              onChange={(e) => {
                                setData({ ...data, [field]: e.target.value });
                              }}
                              validate={
                                field === "name"
                                  ? ""
                                  : field === "num"
                                  ? isValidPhone
                                  : field === "email"
                                  ? isValidEmail
                                  : (val) => val.trim().length > 0
                              }
                              errmessage="القيمة غير صالحة"
                              placeholder={
                                field === "name"
                                  ? "الاسم"
                                  : field === "num"
                                  ? "رقم الهاتف"
                                  : field === "email"
                                  ? "البريد الإلكتروني"
                                  : field === "year"
                                  ? "السنة الجامعية"
                                  : "الاختصاص"
                              }
                              className="mb-5"
                            />
                          )}
                        </div>
                      </form>
                    )
                  )}
                  <Submitbtn onClick={handleSave}>
                    {saving ? (
                      <p className="text-gray-400">جاري الحفظ ...</p>
                    ) : (
                      "حفظ"
                    )}
                  </Submitbtn>
                  <p>
                    هل تريد تغيير كلمة المرور؟
                    <button
                      onClick={() => setActiveSection("ChangePassword")}
                      className="text-second-color text-cenetr mr-1"
                    >
                      انقر هنا
                    </button>
                  </p>
                </>
              ))}
          </div>
          {activeSection === "ChangePassword" && (
            <div className="flex flex-col justify-between items-center ">
              {["oldPassword", "newPassword", "confirmPassword"].map(
                (field, index) => (
                  <form action="">
                    <div className="flex justify-between items-start ">
                      <label className="ml-5">
                        {field === "oldPassword"
                          ? "كلمة المرور الحالية"
                          : field === "newPassword"
                          ? "كلمة المرور الجديدة"
                          : "تأكيد كلمة المرور"}
                      </label>
                      <ValidateInput
                        type="password"
                        value={
                          field === "oldPassword"
                            ? oldPassword
                            : field === "newPassword"
                            ? newPassword
                            : confirmPassword
                        }
                        onChange={
                          field === "oldPassword"
                            ? (val) => setOldPassword(val)
                            : field === "newPassword"
                            ? (val) => setNewPassword(val)
                            : (val) => setConfirmPassword(val)
                        }
                        validate={
                          field === "oldPassword"
                            ? (val) => val.length >= 6
                            : field === "newPassword"
                            ? (val) => val.length >= 6
                            : (val) => val === newPassword
                        }
                        errmessage={
                          field === "oldPassword"
                            ? "كلمة المرور غير صحيحة"
                            : field === "newPassword"
                            ? "كلمة المرور غير صالحة"
                            : "كلمة المرور و تأكيدها غير متطابقين"
                        }
                        placeholder={
                          field === "oldPassword"
                            ? "كلمة المرور الحالية"
                            : field === "newPassword"
                            ? "كلمة المرور الجديدة"
                            : "تأكيد كلمة المرور"
                        }
                        className="mb-10 w-fit"
                      />
                    </div>
                  </form>
                )
              )}
            </div>
          )}

          <div className="w-full">
            {activeSection === "contact" && (
              <div className="flex flex-col justify-between items-center text-main-color text-2xl w-[100%]">
                <a
                  href="mailto:yourname@example.com"
                  className="mx-[20px] my-10 shadow-purple-500 shadow-2xl px-15 py-5"
                >
                  Email:contact@us.com
                </a>
                <a
                  href="https://www.instagram.com/Edu-Page/"
                  target="_blank"
                  className="mx-[20px] my-10 shadow-purple-500 shadow-2xl px-15 py-5"
                >
                  Instagram:@Edu-Page
                </a>
                <a
                  href="https://wa.me/+123 56 67 89"
                  target="_blank"
                  className="mx-[20px] my-10 shadow-purple-500 shadow-2xl px-15 py-5"
                >
                  WhatsApp: +123 56 67 89{" "}
                </a>
              </div>
            )}
          </div>
          <div className="text-center">
            {activeSection === "logout" && (
              <div>
                <p className="m-10 text-xl">
                  هل أنت متأكد انك تريد تسجيل الخروج؟
                </p>
                <Submitbtn onClick={handleLogOut}>تأكيد</Submitbtn>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bef relative flex flex-col justify-evenly items-center h-full w-[40%]">
        <div className="flex flex-col justify-between items-center">
          <img src={profile} className="w-30 h-30 " alt="profile photo" />
          <p>{data.name || " الاسم غير متوفر"}</p>
          <p>{data.email || "البريد غير متوفر"}</p>
        </div>
        <div className="flex flex-col justify-between items-center w-full">
          <ProfilePageBTN
            onClick={() => setActiveSection("edit")}
            className={`${
              activeSection === "edit" &&
              "shadow-2xl shadow-purple-500 text-[18px] border-1 rounded-xl border-gray-300"
            }`}
          >
            <FaEdit className="text-3xl ml-3 text-main-color" />
            تعديل الملف الشخصي
          </ProfilePageBTN>

          <ProfilePageBTN
            onClick={() => setActiveSection("contact")}
            className={`${
              activeSection === "contact" &&
              "shadow-2xl shadow-purple-500 text-[18px] border-1 rounded-xl border-gray-300"
            }`}
          >
            <IoMdContacts className="text-3xl ml-3 text-main-color" />
            تواصل معنا
          </ProfilePageBTN>

          <ProfilePageBTN
            onClick={() => setActiveSection("logout")}
            className={`${
              activeSection === "logout" &&
              "shadow-2xl shadow-purple-500 text-[18px] border-1 rounded-xl border-gray-300"
            }`}
          >
            <LuLogOut className="text-3xl ml-3 text-main-color" />
            تسجيل الخروج
          </ProfilePageBTN>
        </div>
      </div>
    </Container>
  );
};

export default ProfilePage;
