import React, { useState } from "react";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { useGlobalContext } from "../features/context";
import FormInput from "../components/FormInput";

const AddClassDetails = () => {
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    studentFees: 0,
    student: "",
  });

  const { userId, jwtToken } = useGlobalContext();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await customFetch.post(`/class/${userId}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const { data } = response;

      if (data.success) {
        toast.success(data.message, {
          theme: "colored",
          style: { width: "200px", marginLeft: "120px" },
        });

        setFormData({
          name: "",
          year: "",
          studentFees: 0,
          student: "",
        });
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: "colored",
        style: { width: "240px", marginLeft: "70px" },
      });
    }
  };

  return (
    <div className="p-4 h-[88vh]">
      <div className="h-full p-4 bg-[#eeffed] rounded-xl">
        <div className="w-full">
          <h1 className="text-gray-500 font-bold">Class Details</h1>
          <div className="w-[40%] h-[60vh] p-6 mx-auto border border-[#a3c2a3] rounded-md shadow-lg">
            <form method="post" onSubmit={handleSubmit}>
              <div className="w-full h-full flex flex-col gap-y-6 text-gray-700">
                <FormInput
                  labelText="Name"
                  type="text"
                  id="classroomName"
                  name="name"
                  value={formData.name}
                  handleChange={handleChange}
                  containerClass="flex justify-between"
                  className="w-[240px] px-1 h-[40px] rounded text-gray-700 focus:outline-[#457c54]"
                />
                <FormInput
                  labelText="Year"
                  type="text"
                  id="classroomYear"
                  name="year"
                  value={formData.year}
                  handleChange={handleChange}
                  containerClass="flex justify-between"
                  className="w-[240px] px-1 h-[40px] rounded text-gray-700 focus:outline-[#457c54]"
                />
                <FormInput
                  labelText="Student Fees"
                  type="Number"
                  id="classroomStudentFees"
                  name="studentFees"
                  value={formData.studentFees}
                  handleChange={handleChange}
                  containerClass="flex justify-between"
                  className="w-[240px] px-1 h-[40px] rounded text-gray-700 focus:outline-[#457c54]"
                />
                <FormInput
                  labelText="Student ID"
                  type="text"
                  id="classroomStudentID"
                  name="student"
                  value={formData.student}
                  handleChange={handleChange}
                  containerClass="flex justify-between"
                  className="w-[240px] px-1 h-[40px] rounded text-gray-700 focus:outline-[#457c54]"
                />
              </div>
              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  className="px-6 py-1 bg-green-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClassDetails;
