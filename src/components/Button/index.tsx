import React from "react";

const Button: React.FC<any> = ({ type, label, onClick, className, disabled }) => {
  console.log("className = ", className);
  return (
    <button type={type} onClick={onClick} className={`btn ${className}`} disabled={disabled ? true : false}>
      {label}
    </button>
  );
};

export default Button;
