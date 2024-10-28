import React, { useEffect, useState } from "react";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { useGlobalContext } from "../features/context";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import Button from "../components/Button";

const ManageTeacher = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    salary: "",
    phone: "",
    address: "",
  });

  const { jwtToken, personDetails } = useGlobalContext();
  const { _id: teacherId, userId } = personDetails;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
        const { teacher } = data;
        const { name, gender, dob, contactDetails } = teacher;
        const { phone, address } = contactDetails;
        const dobFormatted = dob
          ? new Date(dob).toISOString().split("T")[0]
          : "";
        setFormData({
          name,
          gender,
          dob: dobFormatted,
          phone,
          address,
        });
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await customFetch.put(
        `/teacher/${teacherId}/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      const { data } = response;
      if (data.success) {
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

  return (
    <div className="p-4 h-[88vh]">
      <div className="h-full p-4 bg-[#eeffed] rounded-xl">
        <div className="w-full">
          <h1 className="text-gray-500 font-bold">Edit Details</h1>
          <div className="w-[40%] h-[70vh] p-6 mx-auto border border-[#a3c2a3] rounded-md shadow-lg">
            <form method="put" onSubmit={handleSubmit}>
              <div className="w-full h-full flex flex-col gap-y-6 text-gray-700">
                <FormInput
                  labelText="Name"
                  type="text"
                  id="updateTeacherName"
                  name="name"
                  value={formData.name}
                  handleChange={handleChange}
                  containerClass="flex justify-between"
                  className="w-[240px] px-1 h-[40px] rounded text-gray-700 focus:outline-[#457c54]"
                />
                <FormSelect
                  labelText="Gender"
                  id="updateTeacherGender"
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
                  id="updateTeacherDOB"
                  name="dob"
                  value={formData.dob}
                  handleChange={handleChange}
                  containerClass="flex justify-between"
                  className="w-[240px] px-1 h-[40px] rounded text-gray-700 focus:outline-[#457c54]"
                />
                <FormInput
                  labelText="Phone"
                  type="text"
                  id="updateTeacherPhone"
                  name="phone"
                  value={formData.phone}
                  handleChange={handleChange}
                  containerClass="flex justify-between"
                  className="w-[240px] px-1 h-[40px] rounded text-gray-700 focus:outline-[#457c54]"
                />
                <div className="flex justify-between">
                  <label htmlFor="updateTeacherAddress">Address</label>
                  <textarea
                    id="updateTeacherAddress"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-[240px] h-[58px] resize-none px-1 rounded text-gray-700 focus:outline-[#457c54]"
                  ></textarea>
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <Button
                  btnText="Save"
                  type="submit"
                  className="px-6 py-1 bg-[#07bc0d] hover:bg-[#378d3a] text-white rounded"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTeacher;
