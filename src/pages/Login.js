import React, { useState } from "react";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../features/context";
import loginImg from "../assets/images/login_img.svg";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

const Login = () => {
  const navigate = useNavigate();
  const { setUserId, setUser, setPersonDetails, setJwtToken } =
    useGlobalContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const response = await customFetch.post("/auth/login", formData);
      const { data } = response;
      if (data.success) {
        toast.success(data.message, {
          theme: "colored",
          style: { width: "200px", marginLeft: "120px" },
        });
        const { jwtToken, user, personDetails } = data;
        localStorage.setItem("smUser", JSON.stringify(user));
        localStorage.setItem("smJwtToken", jwtToken);
        localStorage.setItem("smPersonDetails", JSON.stringify(personDetails));
        setUserId(user._id);
        setUser(user);
        setJwtToken(jwtToken);
        setPersonDetails(personDetails);
        navigate("/dashboard");
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
            Login to your account
          </h1>
          <div className="mt-8 w-[400px]  p-6 mx-auto border border-[#a3c2a3] rounded-md shadow-lg">
            <form method="post" onSubmit={handleSubmit}>
              <div className="w-full h-full flex flex-col gap-y-6 text-gray-700">
                <FormInput
                  labelText="Email"
                  type="email"
                  id="loginEmail"
                  name="email"
                  value={formData.email}
                  handleChange={handleChange}
                  containerClass="flex justify-between"
                  className="w-[240px] px-1 h-[40px] rounded text-gray-700 focus:outline-[#457c54]"
                />
                <FormInput
                  labelText="Password"
                  type="password"
                  id="loginPassword"
                  name="password"
                  value={formData.password}
                  handleChange={handleChange}
                  containerClass="flex justify-between"
                  className="w-[240px] px-1 h-[40px] rounded text-gray-700 focus:outline-[#457c54]"
                />
              </div>
              <div className="mt-8 flex justify-center">
                <Button
                  btnText="Login"
                  type="submit"
                  className="px-6 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded"
                />
              </div>
            </form>
            <div className="mt-4 text-xs text-gray-500 flex gap-x-2 justify-center">
              <p>Don't have an account? </p>
              <Link
                to="/signup"
                className="font-semibold text-blue-500 hover:text-blue-700"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
        <div>
          <img src={loginImg} alt="login" className="w-[400px]" />
        </div>
      </div>
    </div>
  );
};

export default Login;
