import React from "react";
import NavLinks from "../components/NavLinks";
import SchoolWave from "../assets/images/schoolwave_logo.svg";

const Sidebar = () => {
  return (
    <div className="h-[100vh] bg-[#caffc9] p-2">
      <div className="mt-4">
        <img src={SchoolWave} alt="logo" />
      </div>
      <div className="mt-10">
        <NavLinks />
      </div>
    </div>
  );
};

export default Sidebar;
