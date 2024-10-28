import React from "react";
import { useParams } from "react-router-dom";
import ManageStudent from "./ManageStudent";
import ManageTeacher from "./ManageTeacher";

const ManageDetails = () => {
  const params = useParams();
  const { role } = params;

  console.log("params: ", params);

  if (role === 0) {
    return (
      <div>
        <ManageStudent />
      </div>
    );
  } else if (role === 1) {
    return (
      <div>
        <ManageTeacher />
      </div>
    );
  }
};

export default ManageDetails;
