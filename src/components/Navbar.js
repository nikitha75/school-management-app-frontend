import React from "react";
import { useGlobalContext } from "../features/context";
import { capitalize } from "../utils";
import Button from "./Button";

const Navbar = () => {
  const { personDetails } = useGlobalContext();

  const handleLogout = () => {
    localStorage.removeItem("smJwtToken");
    localStorage.removeItem("smUser");
    localStorage.removeItem("smUserId");
    localStorage.removeItem("smUserRole");
    localStorage.removeItem("smEmail");
    localStorage.removeItem("smPersonDetails");
    window.location.href = "/";
  };

  return (
    <div className="p-4 w-full flex justify-between items-center">
      <div></div>
      <h1 className="font-semibold text-gray-500">Dashboard</h1>
      <div className="flex gap-x-4 items-center">
        <div className="text-gray-500 font-semibold">
          <span className="text-[#3b9838]">Hi </span>{" "}
          {personDetails && capitalize(personDetails.name)}
        </div>
        <div>
          <Button
            btnText="Logout"
            handleClick={handleLogout}
            className="py-1 px-6 bg-blue-500 hover:bg-blue-700 text-white rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
