import React, { useState } from "react";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../features/context";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";

const AddTeacher = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    salary: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();
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
      const response = await customFetch.post(`/teacher/${userId}`, formData, {
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
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: "colored",
        style: { width: "240px", marginLeft: "70px" },
      });
    }
  };

  return (
    <div className="p-4 h-[100vh] bg-[#eeffed]">
      <div className="h-full flex justify-around items-center">
        <div>
          <h1 className="text-center text-gray-500 text-xl font-semibold">
            Setup your profile
          </h1>

          <div className="mt-8 w-[400px]  p-6 mx-auto border border-[#a3c2a3] rounded-md shadow-lg">
            <form method="post" onSubmit={handleSubmit}>
              <div className="w-full h-full flex flex-col gap-y-6 text-gray-700">
                <FormInput
                  labelText="Name"
                  type="text"
                  id="teacherName"
                  name="name"
                  value={formData.name}
                  handleChange={handleChange}
                  containerClass="flex justify-between"
                  className="w-[240px] px-1 h-[40px] rounded text-gray-700 focus:outline-[#457c54]"
                />
                <FormSelect
                  labelText="Gender"
                  id="teacherGender"
                  name="gender"
                  selectValue={formData.gender}
                  handleChange={handleChange}
                  options={{
                    "Select Gender": "",
                    Male: "male",
                    Female: "female",
                    "Prefer not to say": "prefer_not_to_say",
                  }}
                  containerClass="flex justify-between"
                  className="w-[240px] px-1 h-[40px] rounded text-gray-700 focus:outline-[#457c54]"
                />

                <FormInput
                  labelText="DOB"
                  type="date"
                  id="teacherDOB"
                  name="dob"
                  value={formData.dob}
                  handleChange={handleChange}
                  containerClass="flex justify-between"
                  className="w-[240px] px-1 h-[40px] rounded text-gray-700 focus:outline-[#457c54]"
                />
                <FormInput
                  labelText="Salary"
                  type="Number"
                  id="teacherSalary"
                  name="salary"
                  value={formData.salary}
                  handleChange={handleChange}
                  containerClass="flex justify-between"
                  className="w-[240px] px-1 h-[40px] rounded text-gray-700 focus:outline-[#457c54]"
                />
                <FormInput
                  labelText="Phone"
                  type="Number"
                  id="teacherPhone"
                  name="phone"
                  value={formData.phone}
                  handleChange={handleChange}
                  containerClass="flex justify-between"
                  className="w-[240px] px-1 h-[40px] rounded text-gray-700 focus:outline-[#457c54]"
                />

                <div className="flex justify-between">
                  <label htmlFor="teacherAddress">Address</label>
                  <textarea
                    id="teacherAddress"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-[240px] h-[58px] resize-none px-1 rounded text-gray-700 focus:outline-[#457c54]"
                  ></textarea>
                </div>
                <div className="mt-6 flex justify-center">
                  <button
                    type="submit"
                    className="px-6 py-1 bg-blue-700 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeacher;
