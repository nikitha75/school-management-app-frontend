import React, { useEffect, useState } from "react";
import { capitalize, customFetch, formatDate, trimNum } from "../utils";
import { toast } from "react-toastify";
import { useGlobalContext } from "../features/context";

const TeacherDetails = () => {
  const { jwtToken, personDetails } = useGlobalContext();
  const { _id: studentId, userId } = personDetails;
  const [teacher, setTeacher] = useState({});

  const fetchTeacherDetails = async () => {
    try {
      const response = await customFetch.get(
        `/class/teacher/${studentId}/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      const { data } = response;
      if (data.success) {
        setTeacher(data.teacher);
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
    fetchTeacherDetails();
  }, []);

  return (
    <div className="p-4 h-[88vh]">
      <div className="h-full p-4 bg-[#eeffed] rounded-xl">
        <div>
          <div className="mt-4 w-full h-[400px]  bg-[#f9fff6] border border-[#f6fff2] rounded-md shadow-md">
            <div className="px-4 py-2 bg-[#a1fd9f] text-gray-500 rounded-t-md">
              Teacher Details
            </div>
            <table className="w-full table-auto">
              <tbody>
                <tr className="h-12">
                  <td className="px-4 w-[50%] text-gray-400 font-medium">
                    Name
                  </td>
                  <td className="w-full text-gray-500 font-medium">
                    {teacher && capitalize(teacher.name)}
                  </td>
                </tr>
                <tr className="h-12">
                  <td className="px-4 w-[50%] text-gray-400 font-medium">
                    Gender
                  </td>
                  <td className="w-full text-gray-500 font-medium">
                    {teacher && capitalize(teacher.gender)}
                  </td>
                </tr>
                <tr className="h-12">
                  <td className="px-4 w-[50%] text-gray-400 font-medium">
                    Date Of Birth
                  </td>
                  <td className="w-full text-gray-500 font-medium">
                    {teacher && formatDate(teacher.dob)}
                  </td>
                </tr>
                <tr className="h-12">
                  <td className="px-4 w-[50%] text-gray-400 font-medium">
                    Phone
                  </td>
                  <td className="w-full text-gray-500 font-medium">
                    {teacher?.contactDetails?.phone}
                  </td>
                </tr>
                <tr className="h-12">
                  <td className="px-4 w-[50%] text-gray-400 font-medium">
                    Address
                  </td>
                  <td className="w-full text-gray-500 font-medium">
                    {teacher?.contactDetails?.address}
                  </td>
                </tr>
                <tr className="h-12">
                  <td className="px-4 w-[50%] text-gray-400 font-medium">
                    Salary
                  </td>
                  <td className="w-full text-gray-500 font-medium">
                    ₹ {teacher.salary} PM
                  </td>
                </tr>
                <tr className="h-12">
                  <td className="px-4 w-[50%] text-gray-400 font-medium">
                    Assigned Class
                  </td>
                  <td className="w-full text-gray-500 font-medium">
                    {teacher && teacher._id
                      ? "C" + trimNum(teacher.assignedClass, 0, 4)
                      : null}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;
