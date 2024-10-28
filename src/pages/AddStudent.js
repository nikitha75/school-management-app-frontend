import React, { useState } from "react";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../features/context";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
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
    const response = await customFetch.post(`/student/${userId}`, formData, {
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
    } else {
      toast.error(data.message, {
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
            Setup your student profile
          </h1>
          <div className="mt-8 w-[400px]  p-6 mx-auto border border-[#a3c2a3] rounded-md shadow-lg">
            <form method="post" onSubmit={handleSubmit}>
              <div className="w-full h-full flex flex-col gap-y-6 text-gray-700">
                <FormInput
                  labelText="Name"
                  type="text"
                  id="studentName"
                  name="name"
                  value={formData.name}
                  handleChange={handleChange}
                  containerClass="flex justify-between"
                  className="w-[240px] px-1 h-[40px] rounded text-gray-700 focus:outline-[#457c54]"
                />
                <FormSelect
                  labelText="Gender"
                  id="studentGender"
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
                  id="studentDOB"
                  name="dob"
                  value={formData.dob}
                  handleChange={handleChange}
                  containerClass="flex justify-between"
                  className="w-[240px] px-1 h-[40px] rounded text-gray-700 focus:outline-[#457c54]"
                />
                <FormInput
                  labelText="Phone"
                  type="Number"
                  id="studentPhone"
                  name="phone"
                  value={formData.phone}
                  handleChange={handleChange}
                  containerClass="flex justify-between"
                  className="w-[240px] px-1 h-[40px] rounded text-gray-700 focus:outline-[#457c54]"
                />
                <div className="flex justify-between">
                  <label htmlFor="studentAddress">Address</label>
                  <textarea
                    id="studentAddress"
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

export default AddStudent;

// <h1>Enter Student Details</h1>
//       <form method="post" onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="studentName">Name</label>
//           <input
//             type="text"
//             id="studentName"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="studentGender">Gender</label>
//           <select
//             id="studentGender"
//             name="gender"
//             value={formData.gender}
//             onChange={handleChange}
//           >
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="prefer_not_to_say">Prefer not to say</option>
//           </select>
//         </div>
//         <div>
//           <label htmlFor="studentDOB">DOB</label>
//           <input
//             type="date"
//             id="studentDOB"
//             name="dob"
//             value={formData.dob}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="studentFeesPaid">Fees Paid</label>
//           <input
//             type="Number"
//             id="studentFeesPaid"
//             name="feesPaid"
//             value={formData.feesPaid}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="studentPhone">Phone</label>
//           <input
//             type="text"
//             id="studentPhone"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="studentAddress">Address</label>
//           <input
//             type="text"
//             id="studentAddress"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//           />
//         </div>
//         <button
//           type="submit"
//           className="px-6 py-1 bg-blue-700 text-white rounded"
//         >
//           Save
//         </button>
//       </form>
//     </div>
