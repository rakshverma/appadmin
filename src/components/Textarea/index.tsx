import React from "react";
import { TextareaProps } from "../../types";

function Textarea({
  label,
  name,
  className,
  rows,
  // value,
  onChange,
  register,
  validationObj,
  error,
}: TextareaProps) {
  return (
    <>
      <label>{label}</label>
      <textarea
        name={name}
        className={className}
        rows={rows}
        {...register(name, validationObj)}
      />
      {error && <p style={{ color: "red" }}>{error?.message || ""}</p>}
    </>
  );
}

export default Textarea;
