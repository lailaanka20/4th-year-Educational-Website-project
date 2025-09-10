import { useState } from "react";

export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
export const isValidPhone = (val) => {
  return /^\+?\d{9,15}$/.test(val);
};
export const handleDatasubmit = (e, data, navigateTo, navigate) => {
  e.preventDefault();
  const allField = Object.keys(data);
  const emptyField = allField.filter(
    (field) => !data[field]?.toString().trim()
  );
  if (emptyField.length > 0) {
    alert("يرجى إدخال جميع البيانات");
    return;
  }
  if (data.password !== undefined && data.passwordconfirm !== undefined) {
    if (data.password != data.passwordconfirm) {
      alert("كلمة المرور وتأكيدها غير متطابقين");
      return;
    }
  }
  navigate(navigateTo);
};
export const isStrongPassword = (password) => {
  return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(password);
};

// labelالكود صحيح ومكتوب بطريقة ديناميكية لكن دعني اضيف عنصر

// ###بعد اجراء تغيير بسيط: `ValidateInput` النسخة المعدّلة من ملفك
// ```jsx
// import React, { useState } from "react";
// import "../index.css";

// const ValidateInput = ({
//   label,
//   type = "text",
//   value,
//   onChange,
//   validate,
//   errmessage = "القيمة غير صالحة",
//   placeholder = "",
// }) => {
//   const [err, setErr] = useState("");

//   // توليد معرف فريد للحقل بناءً على اسم الـ label
//   const id = `input-${label.replace(/\s+/g, "-")}`;

//   const handleChange = (e) => {
//     const val = e.target.value;
//     onChange(val);

//     // التحقق الفوري عند التغيير
//     if (validate && !validate(val)) {
//       setErr(errmessage);
//     } else {
//       setErr("");
//     }
//   };

//   const handleBlur = () => {
//     // التحقق عند الخروج من الحقل
//     if (validate && !validate(value)) {
//       setErr(errmessage);
//     } else {
//       setErr("");
//     }
//   };

//   return (
//     <div className="mb-4">
//       {/* عنصر label مرتبط بالحقل عبر htmlFor */}
//       <label htmlFor={id} className="block mt-2 font-bold text-gray-700">
//         {label}
//       </label>

//       <input
//         id={id} // الربط مع label
//         required
//         inputMode={type === "email" ? "email" : "text"}
//         type={type}
//         value={value}
//         onChange={handleChange}
//         onBlur={handleBlur}
//         placeholder={placeholder}
//         className={`input input-x mt-2 ${err ? "input error" : ""}`}
//       />

//       {/* عرض رسالة الخطأ بشكل واضح */}
//       {err && <p className="text-red-500 text-sm mt-1">{err}</p>}
//     </div>
//   );
// };

// export default ValidateInput;
// ```

// ---

// ### 🎯 ماذا استفدت من هذا التعديل؟

// - أصبح الحقل مرتبطًا بـ `label` بشكل رسمي، مما يحسن تجربة المستخدم.
// - التحقق يتم عند التغيير **وعند الخروج من الحقل**.
// - المعرف `id` يتم توليده تلقائيًا من اسم الحقل، فلا حاجة لتحديده يدويًا.
// - التنسيق أصبح أكثر وضوحًا واحترافية.

// ---

// هل ترغب أن أساعدك في جعل هذا المكون يدعم أيضًا أيقونة نجاح أو خطأ بجانب الحقل؟ أو ننتقل لمكون آخر؟ أنت تبني واجهة ممتازة، وكل تعديل يرفع من مستوى المشروع 💪
