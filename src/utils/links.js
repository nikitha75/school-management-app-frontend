import React from "react";
import { GiTeacher } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { TbDeviceAnalytics } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import { MdPeople } from "react-icons/md";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";

export const TeacherNavLinks = [
  { text: "Profile", path: ".", icon: <GiTeacher /> },
  { text: "Students", path: "all-students", icon: <MdPeople /> },
  { text: "Account Settings", path: "edit/teacher", icon: <IoMdSettings /> },
];

export const StudentNavLinks = [
  {
    text: "Profile",
    path: ".",
    icon: <PiStudentFill />,
  },
  {
    text: "Teacher Details",
    path: "teacher",
    icon: <LiaChalkboardTeacherSolid />,
  },
  {
    text: "Account Settings",
    path: "edit/student",
    icon: <IoMdSettings />,
  },
];

export const AdminNavLinks = [
  { text: "Class Details", path: ".", icon: <GiTeacher /> },
  { text: "Students", path: "all-students", icon: <MdPeople /> },
  {
    text: "Analytics",
    path: "analytics",
    icon: <TbDeviceAnalytics />,
  },
];
