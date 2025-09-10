import React, { useState } from "react";

const ProfilePageBTN = ({ children, onClick, className }) => {
  const [activeSec, setActiveSec] = useState("");

  return (
    <div>
      <button
        onClick={onClick}
        className={`flex justify-start items-center py-4 px-8 w-80
            ${className}`}
      >
        {children}
      </button>
    </div>
  );
};

export default ProfilePageBTN;
