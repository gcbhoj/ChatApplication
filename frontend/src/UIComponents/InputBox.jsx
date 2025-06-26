import React from "react";

const InputBox = ({
  label = "",
  name = "",
  type = "text",
  width = "w-80",
  height = "h-12",
  onChange = () => {},
}) => {
  return (
    <div className={`relative mt-8 ${width}`}>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={label}
        onChange={onChange}
        className={`peer block w-full appearance-none border border-gray-300 rounded-md px-3 pt-4 pb-2 text-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-gray-500 ${height} text-center shadow-gray-300 shadow-lg font-serif tracking-[.13em] bg-stone-300  flex flex-wrap`}
      />
      <label
        htmlFor={name}
        className="absolute left-3  text-sm transition-all
          peer-placeholder-shown:top-4
          peer-placeholder-shown:text-sm
          peer-placeholder-shown:font-normal
          peer-focus:top-[-20px]
          peer-focus:text-xs
          peer-focus:font-bold
          peer-focus:text-gray-600
          peer-not-placeholder-shown:top-[-20px]
          peer-not-placeholder-shown:text-xs
          peer-not-placeholder-shown:font-bold
          peer-not-placeholder-shown:text-gray-600 font-serif text-[#262322]"
      >
        {label}
      </label>
    </div>
  );
};

export default InputBox;
