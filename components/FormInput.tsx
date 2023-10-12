import React from "react";
import PasswordInput from "./PasswordInput";
interface Props {
  children: React.ReactNode;
  placeholder?: string;
  type?: "email" | "password" | "text" | "tel" | "textarea";
  errorMessage?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = ({
  children,
  placeholder,
  type = "text",
  errorMessage,
  required = false,
  onChange,
}: Props) => {
  placeholder =
    placeholder ?? (typeof children === "string" ? children : placeholder);

  const inputClasses = "input input-bordered input-success bg-";

  return (
    <>
      <label className="mt-6 lg:mt-10 label">
        <span className="font-semibold lg:text-lg label-text lg:font-bold">
          {children}
        </span>
      </label>
      {type === "textarea" ? (
        <textarea className="h-24 textarea textarea-bordered textarea-success"></textarea>
      ) : type === "password" ? (
        <PasswordInput placeholder={placeholder} onChange={onChange}>
          {children}
        </PasswordInput>
      ) : (
        <input
          type={type ?? "text"}
          placeholder={placeholder}
          className="input input-bordered input-success"
          onChange={onChange}
          required={required}
        />
      )}
      <div className="text-error">{errorMessage}</div>
    </>
  );
};

export default FormInput;
