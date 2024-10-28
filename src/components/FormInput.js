import React from "react";

const FormInput = ({
  labelText,
  type,
  id,
  name,
  value,
  handleChange,
  containerClass,
  className,
}) => {
  return (
    <div className={containerClass}>
      <label htmlFor={id}>{labelText}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        className={`w-[240px] px-1 h-[40px] rounded text-gray-700 focus:outline-[#457c54] ${className}`}
      />
    </div>
  );
};

export default FormInput;
