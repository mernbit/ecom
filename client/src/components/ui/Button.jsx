import React from "react";

const Button = ({
  children,
  className,
  onClick,
  type = "button",
  disabled,
  variant,
}) => {
  const color = {
    red: "bg-red-500 hover:bg-red-600 text-white",
  };
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${color[variant]} py-3 transition-all cursor-pointer duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
