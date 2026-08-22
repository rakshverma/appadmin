import React from "react";
import { SelectProps } from "../../types";

function Select({
  label,
  name,
  className,
  value,
  onChange,
  register,
  validationObj,
  options,
  error,
  disabled,
  multiple,
  selectDisabled,
  defaultValue,
}: SelectProps) {
  return (
    <>
      <label>{label}</label>
      <select
        name={name}
        className={className}
        onChange={onChange}
        {...register(name, { ...validationObj, onChange })}
        disabled={disabled ? disabled : false}
        multiple={multiple ? multiple : false}
      >
        {!multiple && (
          <option value={""} disabled={selectDisabled ? selectDisabled : false}>
            Select
          </option>
        )}
        {options.length &&
          options.map((item, i) => (
            <option value={item.id} selected={value == item.id ? true : false} key={`franchise_status_${i}`}>
              {item.name}
            </option>
          ))}
      </select>
      {error && <p style={{ color: "red" }}>{error?.message || ""}</p>}
    </>
  );
}

export default Select;
