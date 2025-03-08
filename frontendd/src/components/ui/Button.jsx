import React from "react";

export const Button = ({ children, variant = "primary", size = "md", className = "", ...props }) => {
  const baseStyles =
    "relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 overflow-hidden";

  const variants = {
    primary: 
      "relative border-2 border-transparent bg-black text-white p-[2px] " +
      "before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-transparent " +
      "before:bg-gradient-to-r before:from-green-500 before:via-purple-500 before:to-green-500 " +
      "before:-z-10 before:blur-[3px] hover:before:blur-md hover:border-green-500", 
    secondary: 
      "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: 
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    custom: "",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-2.5 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};
