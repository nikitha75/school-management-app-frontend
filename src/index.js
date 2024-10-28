import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import AppContext from "./features/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AppContext>
    <App />
    <ToastContainer position="top-right" className="custom-toast-container" />
  </AppContext>
  // </React.StrictMode>
);
