import React, { useState } from "react";
import "../index.css";

const ValidateInput = ({
  label,
  type = "text",
  value,
  onChange,
  validate,
  errmessage = "القيمة غير صالحة",
  placeholder = "",
  className = "",
}) => {
  const [err, setErr] = useState("");
  const handleChange = (e) => {
    const val = e.target.value;
    onChange(val);

    if (validate && !validate(val)) {
      setErr(errmessage);
    } else setErr("");
  };
  return (
    <div className={`${className}`}>
      <input
        id={label}
        name={label}
        required
        inputMode={type === "email" ? "email" : "text"}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`input input-x my-1 w-full ${err ? "border-red-500" : ""}`}
      />
      {err && <p className="text-red-500 text-sm mt-1 text-start h-5">{err}</p>}
    </div>
  );
};
export default ValidateInput;
