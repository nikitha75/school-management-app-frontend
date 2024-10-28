import React from "react";

const FormSelect = ({
  labelText,
  id,
  name,
  selectValue,
  handleChange,
  options,
  className,
  containerClass,
}) => {
  return (
    <div className={containerClass}>
      <label htmlFor={id}>{labelText}</label>
      <select
        id={id}
        name={name}
        value={selectValue}
        onChange={handleChange}
        className={`w-[240px] px-1 h-[40px] rounded text-gray-700 focus:outline-[#457c54] ${className}`}
      >
        {Object.entries(options).map(([optionText, optionValue]) => (
          <option key={optionValue} value={optionValue}>
            {optionText}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
