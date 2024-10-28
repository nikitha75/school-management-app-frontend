import React, { useState } from "react";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../features/context";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    feesPaid: false,
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
      navigate("/dashboard");
    } else {
      toast.error(data.message, {
        theme: "colored",
        style: { width: "240px", marginLeft: "70px" },
      });
    }
  };

  return (
    <div>
      <h1>Enter Student Details</h1>
      <form method="post" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="studentName">Name</label>
          <input
            type="text"
            id="studentName"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="studentGender">Gender</label>
          <select
            id="studentGender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
        </div>
        <div>
          <label htmlFor="studentDOB">DOB</label>
          <input
            type="date"
            id="studentDOB"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="studentFeesPaid">Fees Paid</label>
          <input
            type="Number"
            id="studentFeesPaid"
            name="feesPaid"
            value={formData.feesPaid}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="studentPhone">Phone</label>
          <input
            type="text"
            id="studentPhone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="studentAddress">Address</label>
          <input
            type="text"
            id="studentAddress"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="px-6 py-1 bg-blue-700 text-white rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
