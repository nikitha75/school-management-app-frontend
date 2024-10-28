import React, { useEffect, useState } from "react";
import { capitalize, customFetch, formatDate, trimNum } from "../utils";
import { toast } from "react-toastify";
import { useGlobalContext } from "../features/context";
import { FaUserGraduate } from "react-icons/fa6";

const Student = () => {
  const { jwtToken, personDetails, user } = useGlobalContext();
  const { _id: studentId, userId } = personDetails;
  const [student, setStudent] = useState({});

  const fetchStudentDetails = async () => {
    try {
      const response = await customFetch.get(
        `/student/${studentId}/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      const { data } = response;
      if (data.success) {
        setStudent(data.student);
        toast.success(data.message, {
          theme: "colored",
          style: { width: "200px", marginLeft: "120px" },
        });
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: "colored",
        style: { width: "240px", marginLeft: "70px" },
      });
    }
  };

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  return (
    <div className="p-4 h-[88vh]">
      <div className="h-full p-4 bg-[#eeffed] rounded-xl">
        <div className="">
          <h1 className="text-gray-500 font-bold">Profile</h1>
          <div className="flex gap-x-4">
            <div className="w-[40%] mt-4 h-[400px] flex flex-col items-center">
              <div className="mt-14">
                <FaUserGraduate size="150" />
              </div>
              <div className="mt-6 flex flex-col gap-y-2 text-center">
                <h2 className="text-gray-600 font-semibold">{user.username}</h2>
                <h3 className="text-[#2dd22a] text-sm font-medium">
                  ID{" "}
                  {student && student._id ? trimNum(student._id, 2, 3) : null}
                </h3>
              </div>
            </div>
            <div className="mt-4 w-full h-[400px]  bg-[#f9fff6] border border-[#f6fff2] rounded-md shadow-md">
              <div className="px-4 py-2 bg-[#a1fd9f] text-gray-500 rounded-t-md">
                Personal Details
              </div>
              <table className="w-full table-auto">
                <tbody>
                  <tr className="h-12">
                    <td className="px-4 w-[50%] text-gray-400 font-medium">
                      Name
                    </td>
                    <td className="w-full text-gray-500 font-medium">
                      {student && capitalize(student.name)}
                    </td>
                  </tr>
                  <tr className="h-12">
                    <td className="px-4 w-[50%] text-gray-400 font-medium">
                      Gender
                    </td>
                    <td className="w-full text-gray-500 font-medium">
                      {student && capitalize(student.gender)}
                    </td>
                  </tr>
                  <tr className="h-12">
                    <td className="px-4 w-[50%] text-gray-400 font-medium">
                      Date Of Birth
                    </td>
                    <td className="w-full text-gray-500 font-medium">
                      {student && formatDate(student.dob)}
                    </td>
                  </tr>
                  <tr className="h-12">
                    <td className="px-4 w-[50%] text-gray-400 font-medium">
                      Phone
                    </td>
                    <td className="w-full text-gray-500 font-medium">
                      {student?.contactDetails?.phone}
                    </td>
                  </tr>
                  <tr className="h-12">
                    <td className="px-4 w-[50%] text-gray-400 font-medium">
                      Address
                    </td>
                    <td className="w-full text-gray-500 font-medium">
                      {student?.contactDetails?.address}
                    </td>
                  </tr>
                  <tr className="h-12">
                    <td className="px-4 w-[50%] text-gray-400 font-medium">
                      Fees Paid
                    </td>
                    <td className="w-full text-gray-500 font-medium">
                      {student.feesPaid ? "Yes" : "No"}
                    </td>
                  </tr>
                  <tr className="h-12">
                    <td className="px-4 w-[50%] text-gray-400 font-medium">
                      Class
                    </td>
                    <td className="w-full text-gray-500 font-medium">
                      {student && student._id
                        ? "C" + trimNum(student.class, 0, 4)
                        : null}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
