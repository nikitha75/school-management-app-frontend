import React, { useEffect, useState } from "react";
import { capitalize, customFetch, formatDate, trimNum } from "../utils";
import { toast } from "react-toastify";
import { useGlobalContext } from "../features/context";
import teacherStudentsImg from "../assets/images/teacher_students_img.svg";

const AssignedTeacher = () => {
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
        <div className="h-full flex justify-between items-center">
          <div className="mt-4 w-full h-[350px] bg-[#f9fff6] border border-[#f6fff2] rounded-md shadow-md">
            <div className="px-4 py-2 bg-[#3e8c3d] text-[#ffffff] rounded-t-md">
              Teacher Details
            </div>
            <table className="w-full h-full table-auto">
              {Object.keys(teacher).length > 0 ? (
                <tbody className="divide-y divide-gray-200">
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
                      Class
                    </td>
                    <td className="w-full text-gray-500 font-medium">
                      {teacher && teacher._id
                        ? "C" + trimNum(teacher.assignedClass, 0, 4)
                        : null}
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody className="h-full flex justify-center items-center">
                  <tr>
                    <td>Teacher yet to be assigned!</td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
          <div>
            <img src={teacherStudentsImg} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignedTeacher;
