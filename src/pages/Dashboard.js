import React from "react";
import { useGlobalContext } from "../features/context";
import Student from "./Student";
import Teacher from "./Teacher";
import AddClassDetails from "./AddClassDetails";

const Dashboard = () => {
  const { user } = useGlobalContext();
  const { role } = user;

  if (role === 0) {
    return (
      <div>
        <Student />
      </div>
    );
  } else if (role === 1) {
    return (
      <div>
        <Teacher />
      </div>
    );
  } else if (role === 5) {
    return (
      <div>
        <AddClassDetails />
      </div>
    );
  }
};

export default Dashboard;
