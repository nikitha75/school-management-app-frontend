import React, { useEffect, useState } from "react";
import { capitalize, customFetch } from "../utils";
import { toast } from "react-toastify";
import { useGlobalContext } from "../features/context";
import { formatDate } from "./../utils/index";

const AllStudents = () => {
  const { user, personDetails, jwtToken } = useGlobalContext();
  const { _id: teacherId } = personDetails;
  const { _id: userId } = user;
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await customFetch.get(
        `/class/students/${teacherId}/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      const { data } = response;
      if (data.success) {
        setStudents(data.studentsData);
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
    fetchStudents();
  }, []);

  return (
    <div className="p-4 h-[89vh]">
      <div className="h-full p-4 bg-[#eeffed] rounded-xl">
        <h1 className="text-gray-500 font-bold">Students</h1>
        <div>
          <div className="w-[84%] h-[72vh] mt-4 mx-auto overflow-auto shadow-md border border-gray-300 rounded-md">
            <table>
              <thead className="w-full bg-[#6dbe69] text-gray-50">
                <tr>
                  <th className="px-2 py-4">Name</th>
                  <th className="px-2 py-4">Gender</th>
                  <th className="px-2 py-4">DOB</th>
                  <th className="px-0 py-2">Fees Paid</th>
                  <th className="px-2 py-4">Phone</th>
                  <th className="px-2 py-4">Address</th>
                </tr>
              </thead>
              <tbody className="p-4 text-center">
                {students.map((student) => {
                  const {
                    _id: studentId,
                    name,
                    gender,
                    dob,
                    feesPaid,
                    contactDetails,
                  } = student;
                  const { phone, address } = contactDetails;
                  return (
                    <tr key={studentId} className="">
                      <td className="p-2 text-left">{capitalize(name)}</td>
                      <td className="p-2">{capitalize(gender)}</td>
                      <td className="p-2">{formatDate(dob)}</td>
                      <td className="p-2">{feesPaid ? "Yes" : "No"}</td>
                      <td className="p-2">{phone}</td>
                      <td className="p-2 text-left">{address}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllStudents;
