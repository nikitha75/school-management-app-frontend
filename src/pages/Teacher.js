import React, { useEffect, useState } from "react";
import { capitalize, customFetch, formatDate, trimNum } from "../utils";
import { toast } from "react-toastify";
import { useGlobalContext } from "../features/context";
import femaleAvatar from "../assets/images/femaleAvatar.svg";
import maleAvatar from "../assets/images/maleAvatar.svg";

const Teacher = () => {
  const { jwtToken, personDetails, user } = useGlobalContext();
  const { _id: teacherId, userId } = personDetails;
  const [teacher, setTeacher] = useState({});

  const fetchTeacherDetails = async () => {
    try {
      const response = await customFetch.get(
        `/teacher/${teacherId}/${userId}`,
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
        <div className="">
          <h1 className="text-gray-500 font-bold">Profile</h1>
          <div className="flex gap-x-4">
            <div className="w-[40%] mt-4 h-[400px] flex flex-col items-center">
              <div className="mt-8">
                {teacher.gender === "female" ? (
                  <img src={femaleAvatar} alt="teacher" width="250px" />
                ) : (
                  <img src={maleAvatar} alt="teacher" width="200px" />
                )}
              </div>
              <div className="mt-6 flex flex-col gap-y-2 text-center">
                <h2 className="text-gray-600 font-semibold">{user.username}</h2>
                <h3 className="text-[#2dd22a] text-sm font-medium">
                  ID{" "}
                  {teacher && teacher._id ? trimNum(teacher._id, 2, 3) : null}
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
    </div>
  );
};

export default Teacher;
