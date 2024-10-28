import React, { useState } from "react";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../features/context";
import signupImg from "../assets/images/signup_img.svg";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import Button from "../components/Button";

const Signup = () => {
  const navigate = useNavigate();
  const { setUserId, setJwtToken } = useGlobalContext();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

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
      const response = await customFetch.post("/auth/signup", formData);
      const { data } = response;
      if (data.success) {
        toast.success(data.message, {
          theme: "colored",
          style: { width: "200px", marginLeft: "120px" },
        });
        const { email, userId, role, jwtToken } = data;
        localStorage.setItem("smUserId", userId);
        localStorage.setItem("smEmail", email);
        localStorage.setItem("smUserRole", role);
        localStorage.setItem("smJwtToken", jwtToken);
        setUserId(userId);
        setJwtToken(jwtToken);
        navigate(`/signup/setup-profile`);
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
            Signup here!
          </h1>
          <div className="mt-8 w-[400px]  p-6 mx-auto border border-[#a3c2a3] rounded-md shadow-lg">
            <form method="post" onSubmit={handleSubmit}>
              <div className="w-full h-full flex flex-col gap-y-6 text-gray-700">
                <FormInput
                  labelText="Username"
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  handleChange={handleChange}
                  containerClass="flex justify-between"
                  className="w-[240px] px-1 h-[40px] rounded text-gray-700 focus:outline-[#457c54]"
                />

                <FormInput
                  labelText="Email"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  handleChange={handleChange}
                  containerClass="flex justify-between"
                  className="w-[240px] px-1 h-[40px] rounded text-gray-700 focus:outline-[#457c54]"
                />
                <FormInput
                  labelText="Password"
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  handleChange={handleChange}
                  containerClass="flex justify-between"
                  className="w-[240px] px-1 h-[40px] rounded text-gray-700 focus:outline-[#457c54]"
                />
                <FormSelect
                  labelText="Role"
                  id="role"
                  name="role"
                  selectValue={formData.role}
                  handleChange={handleChange}
                  options={{
                    "Select role": "",
                    Student: 0,
                    Teacher: 1,
                  }}
                  containerClass="flex justify-between"
                  className="w-[240px] px-1 h-[40px] rounded text-gray-700 focus:outline-[#457c54]"
                />
              </div>
              <div className="mt-8 flex justify-center">
                <Button
                  btnText="Signup"
                  type="submit"
                  className="px-6 py-1 bg-[#07bc0d] hover:bg-[#378d3a] text-white rounded"
                />
              </div>
            </form>
            <div className="mt-4 text-xs text-gray-500 flex gap-x-2 justify-center">
              <p> Already a member? </p>
              <Link
                to="/login"
                className="font-semibold text-blue-500 hover:text-blue-700"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
        <div>
          <img src={signupImg} alt="signup" className="w-[400px]" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
