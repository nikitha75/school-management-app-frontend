import React from "react";

const Button = ({ btnText, type, handleClick, className }) => {
  return (
    <button
      type={type ? type : "button"}
      onClick={handleClick ? handleClick : null}
      className={`${
        className
          ? className
          : "py-1 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded"
      }`}
    >
      {btnText}
    </button>
  );
};

export default Button;
