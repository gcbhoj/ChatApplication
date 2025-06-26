import React from "react";

const Button = ({
  label,
  height = "",
  width = "",
  background = "",
  icon = "",
  margin = "m-0",
  border = "",
  hoverBackground = "hover:text-sky-600",
  onClick, // just declare the prop normally
}) => {
  return (
    <button
      onClick={onClick} // attach the click handler here
      className={`
        ${width} ${height} ${background} ${margin}
        rounded-2xl
        border border-stone-500
        ${border}
        active:border-stone-600 active:shadow-gray-600 active:shadow
         font-serif tracking-[.13em] ${hoverBackground}
        capitalize hover:italic active:scale-95 hover:scale-105
        flex items-center justify-center place-items-center
        text-[13px] font-semibold
      `}
    >
      {icon && (
        <span className="text-xl mr-2 items-center flex flex-wrap justify-center">
          {icon}
        </span>
      )}
      {label}
    </button>
  );
};

export default Button;
