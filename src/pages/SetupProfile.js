import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SetupProfile = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(
    parseInt(localStorage.getItem("smUserRole"))
  );

  useEffect(() => {
    setRole(parseInt(localStorage.getItem("userRole")));
    if (role === 0) {
      navigate("/signup/setup-profile/add-student");
    } else if (role === 1) {
      navigate("/signup/setup-profile/add-teacher");
    } else if (role === 5) {
      navigate("/signup/setup-profile/add-class-details");
    }
  }, [role]);
};

export default SetupProfile;
