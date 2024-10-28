import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../features/context";
import SchoolWave from "../assets/images/schoolwave_logo.svg";
import landingImg from "../assets/images/landing_img.svg";
import Button from "../components/Button";

const Landing = () => {
  const { userId } = useGlobalContext();
  return (
    <div className="p-4 h-[100vh] bg-[#eeffed]">
      <div className="mt-4">
        <img src={SchoolWave} alt="logo" className="w-52" />
      </div>

      <div className="mt-8 flex justify-around items-center">
        <div className="mt-20">
          <h1 className="text-green-700 text-2xl">School Management App</h1>
          <p className="mt-4 w-[400px] text-gray-500 ">
            Welcome to SchoolWave, your all-in-one solution for efficient school
            management. SchoolWave transforms school operations, helping
            educators focus on what truly matters: enriching student
            experiences. With an intuitive, user-friendly interface, SchoolWave
            streamlines administrative tasks, strengthens communication, and
            brings students, teachers, and parents together like never before.
          </p>
          <div className="mt-8 flex gap-x-4">
            <Link to={`${userId ? "/dashboard" : "/signup"}`}>
              <Button
                btnText="Signup"
                type="button"
                className="py-1 px-6 bg-green-700 hover:bg-green-500 text-white rounded"
              />
            </Link>

            <Link to={`${userId ? "/dashboard" : "/login"}`}>
              <Button
                btnText="Login"
                type="button"
                className="py-1 px-6 bg-blue-700 hover:bg-blue-500 text-white rounded"
              />
            </Link>
          </div>
        </div>
        <div>
          <img src={landingImg} alt="cover" className="w-[600px]" />
        </div>
      </div>
    </div>
  );
};

export default Landing;
