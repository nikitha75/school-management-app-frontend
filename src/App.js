import React from "react";
import AddTeacher from "./pages/AddTeacher";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Error } from "./pages/Error";
import DashboardLayout from "./pages/DashboardLayout";
import HomeLayout from "./pages/HomeLayout";
import Landing from "./pages/Landing";
import RegisterLayout from "./pages/RegisterLayout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Teacher from "./pages/Teacher";
import Student from "./pages/Student";
import ManageStudent from "./pages/ManageStudent";
import ManageTeacher from "./pages/ManageTeacher";
import SetupProfile from "./pages/SetupProfile";
import ManageDetails from "./pages/ManageDetails";
import AddClassDetails from "./pages/AddClassDetails";
import AddStudent from "./pages/AddStudent";
import AddDetails from "./pages/AddDetails";
import ProtectedRoute from "./pages/ProtectedRoute";
import Analytics from "./pages/Analytics";
import AllStudents from "./pages/AllStudents";
import Dashboard from "./pages/Dashboard";
import AssignedTeacher from "./pages/AssignedTeacher";

const getAccessToken = () => {
  return localStorage.getItem("smJwtToken");
};

const isAuthenticated = () => {
  const tkn = getAccessToken();
  if (tkn == null || tkn != undefined || tkn != "") {
    return true;
  } else {
    return false;
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "signup",
        element: <RegisterLayout />,
        children: [
          {
            index: true,
            element: <Signup />,
          },
          {
            path: "setup-profile",
            element: <AddDetails />,
            children: [
              {
                index: true,
                element: <SetupProfile />,
              },
              {
                path: "add-student",
                element: <AddStudent />,
              },
              {
                path: "add-teacher",
                element: <AddTeacher />,
              },
              {
                path: "add-class-details",
                element: <AddClassDetails />,
              },
            ],
          },
        ],
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        element: <ProtectedRoute isAuthenticated={isAuthenticated} />,
        children: [
          {
            path: "dashboard",
            element: <DashboardLayout />,
            children: [
              {
                index: true,
                element: <Dashboard />,
              },
              {
                index: "profile/teacher",
                element: <Teacher />,
              },
              {
                path: "all-students",
                element: <AllStudents />,
              },
              {
                path: "edit-details/:role",
                element: <ManageDetails />,
              },
              {
                path: "edit/teacher",
                element: <ManageTeacher />,
              },
              {
                path: "profile/student",
                element: <Student />,
              },
              {
                path: "edit/student",
                element: <ManageStudent />,
              },
              {
                path: "teacher",
                element: <AssignedTeacher />,
              },
              {
                path: "analytics",
                element: <Analytics />,
              },
              {
                path: "add-classes",
                element: <AddClassDetails />,
              },
            ],
          },
        ],
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
