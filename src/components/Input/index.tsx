import React from "react";
import { InputProps } from "../../types";

function Input(props: InputProps) {
  const { label, name, type, placeholder, className, onChange, validationObj, register, error, multiple, value, readOnly, maxLength } = props;
  console.log("error = ", error);
  return (
    <>
      <label className="form-label">{label}</label>
      <input
        type={type}
        name={name}
        className={className}
        placeholder={placeholder}
        onChange={onChange}
        {...register(name, { ...validationObj, onChange })}
        multiple={multiple}
        value={value}
        readOnly={readOnly ? readOnly : false}
        maxLength={maxLength || undefined}
      />
      {error && <p style={{ color: "red" }}>{error?.message || ""}</p>}
    </>
  );
}

export default Input;
